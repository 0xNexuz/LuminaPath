
import React from 'react';

export const Skeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden h-96">
        <div className="bg-slate-200 dark:bg-slate-800 h-32 w-full"></div>
        <div className="p-8 space-y-4">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-100 dark:bg-slate-800/50 rounded w-full"></div>
            <div className="h-4 bg-slate-100 dark:bg-slate-800/50 rounded w-5/6"></div>
            <div className="h-4 bg-slate-100 dark:bg-slate-800/50 rounded w-4/6"></div>
          </div>
          <div className="h-24 bg-slate-50 dark:bg-slate-800/30 rounded-xl mt-8"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>
    </div>
  );
};
