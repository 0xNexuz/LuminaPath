
import React, { useState } from 'react';
import { RoadmapResult } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';

interface RoadmapViewProps {
  roadmap: RoadmapResult;
  topic: string;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmap, topic }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roadmap.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="animate-fade-in space-y-12 pb-24">
      {/* Header Info Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-8 py-10 text-white relative">
          <div className="relative z-10">
            <div className="flex justify-between items-start gap-4">
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm mb-4">
                <i className="fas fa-rocket"></i>
                Accelerator Path
              </div>
              
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all backdrop-blur-md border ${
                  copied 
                    ? 'bg-emerald-500/30 border-emerald-400 text-emerald-100' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                {copied ? 'Copied!' : 'Copy Roadmap'}
              </button>
            </div>
            
            <h2 className="text-4xl font-black mb-3">Mastering {topic}</h2>
            <p className="text-indigo-100 opacity-90 max-w-2xl text-lg leading-relaxed">
              This curriculum combines daily intentionality with broad weekly objectives. 
              Follow the daily goals to ensure consistent progress.
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-32 -mb-32 blur-2xl"></div>
        </div>

        <div className="p-8 md:p-12">
          <MarkdownRenderer content={roadmap.content} />
        </div>
      </div>

      {/* Resources Sidebar-style Grid */}
      {roadmap.sources.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <i className="fas fa-bookmark"></i>
              </div>
              Curated Study Material
            </h3>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{roadmap.sources.length} Resources Linked</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roadmap.sources.map((source, index) => (
              <a
                key={index}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/40 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors shrink-0">
                  <i className="fas fa-link text-xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                    {source.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">
                    {new URL(source.uri).hostname}
                  </p>
                </div>
                <div className="text-slate-300 dark:text-slate-700 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                  <i className="fas fa-chevron-right text-xs"></i>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
