
import React from 'react';
import { RoadmapResult } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';

interface RoadmapViewProps {
  roadmap: RoadmapResult;
  topic: string;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmap, topic }) => {
  return (
    <div className="animate-fade-in space-y-24">
      <div className="text-left mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-[#1a1a1a] dark:text-white">
          Our engine’s <br/> learning blueprint
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg font-medium">
          We've taken the core concepts of {topic} and structured them into an intuitive, 
          non-linear roadmap for your learning journey.
        </p>
      </div>

      <div className="space-y-10">
        <MarkdownRenderer content={roadmap.content} />
      </div>

      {roadmap.sources.length > 0 && (
        <div className="pt-20 border-t border-slate-200 dark:border-white/10">
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-4">Curated Resources</h3>
            <p className="text-slate-500 font-medium">Verified sources to help you master the material.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmap.sources.map((source, index) => (
              <a
                key={index}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 bg-[#1a1a1a] rounded-[40px] flex items-center justify-between transition-all hover:translate-y-[-5px] hover:shadow-2xl"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl">
                    <i className="fas fa-link"></i>
                  </div>
                  <div className="max-w-[200px] md:max-w-[300px]">
                    <h4 className="text-white font-bold text-lg mb-1 truncate">{source.title}</h4>
                    <p className="text-slate-400 text-sm font-medium">{new URL(source.uri).hostname}</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
