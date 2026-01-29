
import React from 'react';

export const Skeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-16">
      <div className="flex items-end justify-between border-b border-slate-200 dark:border-white/10 pb-16">
        <div className="space-y-4">
          <div className="h-16 bg-slate-200 dark:bg-white/10 rounded-full w-[400px]"></div>
          <div className="h-6 bg-slate-100 dark:bg-white/5 rounded-full w-[250px]"></div>
        </div>
        <div className="flex gap-4">
          <div className="h-20 w-24 bg-slate-100 dark:bg-white/5 rounded-3xl"></div>
          <div className="h-20 w-24 bg-slate-100 dark:bg-white/5 rounded-3xl"></div>
        </div>
      </div>
      
      <div className="h-10 bg-slate-200 dark:bg-white/10 rounded-full w-48"></div>
      
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-[#1a1a1a] rounded-[50px] p-12 flex flex-col md:flex-row gap-10">
          <div className="w-32 h-32 bg-white/5 rounded-[30px] shrink-0"></div>
          <div className="flex-1 space-y-6">
            <div className="h-8 bg-white/10 rounded-full w-1/2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-white/5 rounded-full w-full"></div>
              <div className="h-4 bg-white/5 rounded-full w-11/12"></div>
              <div className="h-4 bg-white/5 rounded-full w-4/5"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
