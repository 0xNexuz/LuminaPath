
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

interface DayBlock {
  label: string;
  goal: string;
  description: string[];
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  
  let currentDayBlock: DayBlock | null = null;

  const flushDayBlock = (key: number) => {
    if (!currentDayBlock) return;
    
    const colors = [
      'from-pink-400 to-purple-500',
      'from-emerald-400 to-teal-500',
      'from-orange-400 to-amber-500',
      'from-blue-400 to-indigo-500',
      'from-fuchsia-400 to-rose-500'
    ];
    const icons = ['fa-shapes', 'fa-dna', 'fa-atom', 'fa-brain', 'fa-sparkles'];
    const colorIndex = Math.floor(key / 2) % colors.length;
    const colorClass = colors[colorIndex];
    const iconClass = icons[colorIndex];

    renderedElements.push(
      <div key={`day-${key}`} className="bg-[#1a1a1a] rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden group mb-10 transition-all hover:scale-[1.01] hover:shadow-2xl">
        <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
          <div className={`w-24 h-24 md:w-32 md:h-32 rounded-[30px] bg-gradient-to-br ${colorClass} shrink-0 flex items-center justify-center text-4xl shadow-2xl transition-transform group-hover:rotate-6`}>
            <i className={`fas ${iconClass} opacity-90 text-white`}></i>
          </div>
          <div className="flex-1">
            <h4 className="text-2xl font-extrabold mb-4 tracking-tight">
              <span className="text-indigo-400 opacity-80 mr-2">{currentDayBlock.label}:</span> 
              {currentDayBlock.goal}
            </h4>
            <div className="space-y-4">
              {currentDayBlock.description.map((p, pIdx) => (
                <p key={pIdx} className="text-slate-400 font-medium leading-relaxed text-lg">
                  {p.replace(/\*\*/g, '')}
                </p>
              ))}
            </div>
          </div>
        </div>
        {/* Decorative Glassy Blob */}
        <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${colorClass} opacity-[0.07] blur-[100px] -mr-40 -mt-40 transition-opacity group-hover:opacity-20`}></div>
      </div>
    );
    currentDayBlock = null;
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed === '## Resources' || trimmed.toLowerCase().includes('roadmap title')) return;

    if (trimmed.startsWith('# ')) return;

    if (trimmed.startsWith('## Week')) {
      flushDayBlock(idx);
      const [label, title] = trimmed.replace('## ', '').split(':');
      renderedElements.push(
        <div key={`week-${idx}`} className="mt-24 first:mt-0 mb-12 animate-fade-in">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400 mb-3 block">Timeline • {label}</span>
          <h2 className="text-4xl md:text-5xl font-[900] text-[#1a1a1a] dark:text-white tracking-tighter leading-none">{title?.trim() || 'Focus Session'}</h2>
        </div>
      );
      return;
    }

    if (trimmed.startsWith('### Day')) {
      flushDayBlock(idx);
      const dayTitle = trimmed.replace('### ', '');
      const [dayLabel, ...goalParts] = dayTitle.split(':');
      const goal = goalParts.join(':').replace(/Goal:?/i, '').trim();
      currentDayBlock = { label: dayLabel.trim(), goal, description: [] };
      return;
    }

    if (currentDayBlock) {
      currentDayBlock.description.push(trimmed);
    } else {
      renderedElements.push(
        <p key={idx} className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium text-lg max-w-3xl">
          {trimmed.replace(/\*\*/g, '')}
        </p>
      );
    }
  });

  flushDayBlock(999); // Final flush

  return <div className="roadmap-container">{renderedElements}</div>;
};
