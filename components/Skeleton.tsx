
import React from 'react';

export const Skeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-10">
      <div className="h-10 bg-slate-200 dark:bg-white/10 rounded-full w-1/3 mb-10"></div>
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-[#1a1a1a] rounded-[40px] p-12 flex gap-10">
          <div className="w-32 h-32 bg-white/10 rounded-[20px]"></div>
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-white/10 rounded-full w-2/3"></div>
            <div className="h-4 bg-white/5 rounded-full w-full"></div>
            <div className="h-4 bg-white/5 rounded-full w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
