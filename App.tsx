
import React, { useState, useCallback, useEffect } from 'react';
import { Layout } from './components/Layout';
import { geminiService } from './services/geminiService';
import { RoadmapResult } from './types';
import { RoadmapView } from './components/RoadmapView';
import { Skeleton } from './components/Skeleton';

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapResult | null>(null);
  
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentTopic(topic);
    
    try {
      const result = await geminiService.generateRoadmap(topic);
      setRoadmap(result);
      // Scroll to result
      setTimeout(() => {
        document.getElementById('roadmap-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [topic]);

  return (
    <Layout isDark={isDark} onToggleTheme={toggleTheme}>
      <div className="relative">
        {/* Animated Blobs */}
        <div className="blob blob-pink top-20 -left-20"></div>
        <div className="blob blob-green top-60 -right-20" style={{ animationDelay: '-5s' }}></div>
        <div className="blob blob-orange bottom-20 left-1/2" style={{ animationDelay: '-10s' }}></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-[800] tracking-tight leading-[1.1] mb-8 text-[#1a1a1a] dark:text-white animate-fade-in">
            Let AI lead and shape <br/> your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">learning path</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            LuminaPath’s generative engine creates a fully structured learning blueprint, 
            transforming any curiosity into a 4-week mastery roadmap.
          </p>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto relative mb-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What do you want to learn?"
                className="flex-1 bg-white dark:bg-white/10 border-2 border-slate-200 dark:border-white/10 px-8 py-4 rounded-full text-lg focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all dark:text-white shadow-sm"
              />
              <button
                type="submit"
                disabled={loading || !topic.trim()}
                className="bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Build Path'}
              </button>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {['Digital Art', 'Python', 'Game Theory', 'Astronomy'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </form>

          {/* Quick Stats / Icons matching UG Labs design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-10 border-t border-slate-200 dark:border-white/10">
            {[
              { label: 'Understands topic', icon: 'fa-brain', color: 'bg-pink-100 text-pink-500' },
              { label: 'Fun & exciting', icon: 'fa-wand-magic-sparkles', color: 'bg-yellow-100 text-yellow-500' },
              { label: 'Personalized plan', icon: 'fa-sliders', color: 'bg-green-100 text-green-500' },
              { label: 'Verified resources', icon: 'fa-check-circle', color: 'bg-blue-100 text-blue-500' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: `${0.3 + i*0.1}s` }}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-inner ${item.color}`}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <span className="text-[13px] font-bold text-slate-500 dark:text-slate-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div id="roadmap-result" className="relative z-10 max-w-5xl mx-auto px-6 py-20">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-[30px] border border-red-100 dark:border-red-900/40 text-center font-bold mb-10">
              {error}
            </div>
          )}

          {loading ? (
            <Skeleton />
          ) : (
            roadmap && <RoadmapView roadmap={roadmap} topic={currentTopic} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
