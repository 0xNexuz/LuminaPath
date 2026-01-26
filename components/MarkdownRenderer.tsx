
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  
  // Custom logic to group weeks into cards
  return (
    <div className="space-y-12">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        // Main Title - ignored as we have hero
        if (trimmed.startsWith('# ')) return null;

        // Weekly Section - styled as a section header
        if (trimmed.startsWith('## Week')) {
          const [label, title] = trimmed.replace('## ', '').split(':');
          return (
            <div key={idx} className="mt-20 first:mt-0 mb-10">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-2 block">{label}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] dark:text-white">{title?.trim()}</h2>
            </div>
          );
        }

        // Daily Cards - styled like the "Engine building blocks"
        if (trimmed.startsWith('### Day')) {
          const dayTitle = trimmed.replace('### ', '');
          const [dayLabel, ...goalParts] = dayTitle.split(':');
          const goal = goalParts.join(':').replace(/Goal:?/i, '').trim();

          const colors = [
            'from-pink-400 to-purple-500',
            'from-green-400 to-blue-500',
            'from-orange-400 to-yellow-500',
            'from-purple-400 to-blue-500'
          ];
          const colorClass = colors[idx % colors.length];

          return (
            <div key={idx} className="bg-[#1a1a1a] rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden group mb-8">
              <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-[20px] bg-gradient-to-br ${colorClass} shrink-0 flex items-center justify-center text-4xl shadow-2xl`}>
                  <i className={`fas ${idx % 2 === 0 ? 'fa-shapes' : 'fa-dna'} opacity-80`}></i>
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold mb-4">{dayLabel}: {goal}</h4>
                  <div className="text-slate-400 font-medium leading-relaxed max-w-2xl text-lg">
                    {/* The following paragraphs will be handled by the next lines logic */}
                  </div>
                </div>
              </div>
              {/* Decorative Blob */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${colorClass} opacity-10 blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-125`}></div>
            </div>
          );
        }

        if (trimmed === '' || trimmed === '## Resources' || trimmed.toLowerCase().includes('roadmap title')) return null;

        return (
          <p key={idx} className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium text-lg">
            {trimmed.replace(/\*\*/g, '')}
          </p>
        );
      })}
    </div>
  );
};
