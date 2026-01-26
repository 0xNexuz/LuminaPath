
import React, { useState } from 'react';
import { FeedbackModal } from './FeedbackModal';

interface LayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, isDark, onToggleTheme }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDark ? 'dark bg-[#0d0d0d]' : 'bg-[#fdfbf7]'}`}>
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/40 dark:bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tighter dark:text-white">Lumina<span className="text-indigo-600">Path</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-slate-800 dark:text-slate-200">
            <a href="#" className="hover:opacity-60 transition-opacity">Vision</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Solution</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Safety</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Community</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onToggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black transition-all hover:scale-105"
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-xs`}></i>
            </button>
            <button className="bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-[13px] font-bold hover:opacity-80 transition-all">
              Join Labs
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow pt-24">
        {children}
      </main>
      
      <footer className="mt-20">
        <div className="max-w-5xl mx-auto px-4 mb-20">
          <div className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-300 p-12 md:p-20 rounded-[40px] text-center shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                Level up your skills & knowledge <br/> to expand the power of curiosity
              </h2>
              <button 
                onClick={() => setIsFeedbackOpen(true)}
                className="bg-white text-black px-10 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform"
              >
                Send Feedback
              </button>
            </div>
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-200 dark:border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[12px] font-medium text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} LuminaPath Learning Labs.
            </div>
            <div className="flex gap-8 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Safety Board</a>
            </div>
          </div>
        </div>
      </footer>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
    </div>
  );
};
