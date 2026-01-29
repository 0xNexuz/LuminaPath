
import React from 'react';
import { RoadmapResult } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';

interface RoadmapViewProps {
  roadmap: RoadmapResult;
  topic: string;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmap, topic }) => {
  return (
    <div className="animate-fade-in space-y-32 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 dark:border-white/10 pb-16">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-[900] mb-8 tracking-tighter text-[#1a1a1a] dark:text-white leading-[0.95]">
            Our engine’s <br/> learning blueprint
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed">
            We've decoded the core foundations of <span className="text-indigo-600 dark:text-indigo-400 font-bold">{topic}</span> and 
            generated a sequence of high-impact building blocks for your journey.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-center px-6 py-4 bg-white dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/10">
            <div className="text-2xl font-black text-indigo-600">4</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Weeks</div>
          </div>
          <div className="text-center px-6 py-4 bg-white dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/10">
            <div className="text-2xl font-black text-indigo-600">28</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Modules</div>
          </div>
        </div>
      </div>

      <div>
        <MarkdownRenderer content={roadmap.content} />
      </div>

      {roadmap.sources.length > 0 && (
        <div className="pt-24">
          <div className="mb-16">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400 mb-3 block">External Intelligence</span>
            <h3 className="text-4xl font-[900] tracking-tighter text-[#1a1a1a] dark:text-white mb-4">Curated Assets</h3>
            <p className="text-slate-500 font-medium text-lg">Hand-picked references from the global knowledge network.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roadmap.sources.map((source, index) => (
              <a
                key={index}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-10 bg-[#1a1a1a] rounded-[50px] flex items-center justify-between transition-all hover:translate-y-[-8px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              >
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-xl group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                    <i className="fas fa-arrow-up-right-from-square text-sm"></i>
                  </div>
                  <div className="max-w-[180px] md:max-w-[280px]">
                    <h4 className="text-white font-bold text-xl mb-1 truncate group-hover:text-indigo-300 transition-colors">{source.title}</h4>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{new URL(source.uri).hostname}</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-all">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
