
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  
  return (
    <div className="space-y-4">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        // Main Title
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={idx} className="text-3xl font-black text-slate-900 dark:text-white mb-8 border-b-4 border-indigo-500 pb-2 inline-block">
              {trimmed.replace('# ', '')}
            </h1>
          );
        }

        // Weekly Section
        if (trimmed.startsWith('## Week')) {
          return (
            <div key={idx} className="mt-12 mb-6 sticky top-[65px] z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md py-2 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-3">
                <span className="bg-indigo-600 dark:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm font-black uppercase tracking-widest">
                  {trimmed.split(':')[0].replace('## ', '')}
                </span>
                <span className="text-slate-800 dark:text-slate-100">{trimmed.split(':')[1]?.trim()}</span>
              </h2>
            </div>
          );
        }

        // Daily Cards
        if (trimmed.startsWith('### Day')) {
          const dayTitle = trimmed.replace('### ', '');
          const [dayLabel, ...goalParts] = dayTitle.split(':');
          const goal = goalParts.join(':').replace(/Goal:?/i, '').trim();

          return (
            <div key={idx} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md dark:hover:border-slate-700 transition-all mb-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase text-xs tracking-widest">
                  {dayLabel}
                </span>
                {goal && (
                  <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800/50 flex items-center gap-2">
                    <i className="fas fa-bullseye text-[10px]"></i>
                    Goal: {goal}
                  </span>
                )}
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {/* Content text will follow from paragraphs logic */}
              </div>
            </div>
          );
        }

        // Normal text or bullets
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <li key={idx} className="ml-6 text-slate-600 dark:text-slate-400 list-disc mb-2 marker:text-indigo-400 dark:marker:text-indigo-500">
              {trimmed.replace(/^[-*]\s/, '')}
            </li>
          );
        }

        if (trimmed === '' || trimmed === '## Resources' || trimmed.toLowerCase().includes('roadmap title')) return null;

        // Bold parsing for standard paragraphs
        const formattedLine = trimmed.split(/(\*\*.*?\*\*)/).map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-slate-800 dark:text-slate-200">{part.slice(2, -2)}</strong>;
          }
          return part;
        });

        return (
          <p key={idx} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {formattedLine}
          </p>
        );
      })}
    </div>
  );
};
