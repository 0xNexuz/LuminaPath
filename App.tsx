
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
        <div className="blob blob-green top-[30%] -right-20" style={{ animationDelay: '-5s' }}></div>
        <div className="blob blob-orange top-[60%] left-[10%]" style={{ animationDelay: '-12s' }}></div>

        {/* Hero Section */}
        <section className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-32 text-center">
          <h1 className="text-6xl md:text-8xl font-[900] tracking-tighter leading-[0.9] mb-8 text-[#1a1a1a] dark:text-white animate-fade-in">
            Let AI lead and <br/> shape your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">learning</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-16 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            LuminaPath’s conversational engine creates a fully interactive roadmap 
            from any topic, bringing your curiosity to life.
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative mb-24 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white dark:bg-white/5 rounded-[40px] shadow-2xl border border-white/20">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What curiosity are we building today?"
                className="flex-1 bg-transparent px-8 py-5 text-xl focus:outline-none dark:text-white font-medium"
              />
              <button
                type="submit"
                disabled={loading || !topic.trim()}
                className="bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-12 py-5 rounded-[32px] font-black text-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 whitespace-nowrap"
              >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Generate Path'}
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {['Quantum Physics', 'Digital Marketing', 'Piano Mastery', 'Astrobiology'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </form>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto pt-16 border-t border-slate-200 dark:border-white/10">
            {[
              { label: 'Understands topic', icon: 'fa-brain', color: 'bg-pink-100 text-pink-500' },
              { label: 'Fun & exciting', icon: 'fa-wand-magic-sparkles', color: 'bg-yellow-100 text-yellow-500' },
              { label: 'Personalized & adaptive', icon: 'fa-dna', color: 'bg-green-100 text-green-500' },
              { label: 'Impactful growth', icon: 'fa-star', color: 'bg-blue-100 text-blue-500' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-5 animate-fade-in" style={{ animationDelay: `${0.3 + i*0.1}s` }}>
                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-2xl shadow-lg transition-transform hover:rotate-6 ${item.color}`}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <span className="text-[13px] font-black tracking-tight text-[#1a1a1a] dark:text-white/80">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Section - The Future of Learning */}
        <section className="bg-[#1a1a1a] text-white py-32 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl md:text-6xl font-[900] mb-8 tracking-tighter leading-[0.95]">The future of <br/> learning</h2>
                <p className="text-slate-400 text-xl font-medium mb-12">
                  We create a new category for personal growth that learners love. With our generative engine, we transform passive searching into a deep relationship with knowledge.
                </p>
                <div className="space-y-10">
                  {[
                    { left: 'Active, goal-led learning', right: 'Passive content consumption', active: true },
                    { left: 'Personalized per learner', right: 'One-size-fits-all', active: true },
                    { left: 'Conversational, reactive', right: 'Scripted textbooks', active: true }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6">
                      <div className="flex-1 border-b border-white/10 pb-4">
                        <span className={`text-lg font-bold ${item.active ? 'text-indigo-400' : 'text-slate-600 line-through'}`}>{item.left}</span>
                      </div>
                      <div className="flex-1 border-b border-white/5 pb-4 opacity-30">
                        <span className="text-lg font-medium text-slate-400">{item.right}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[60px] relative">
                  <div className="text-8xl mb-8 opacity-20"><i className="fas fa-quote-left"></i></div>
                  <p className="text-3xl font-bold leading-tight mb-8">
                    "This engine is my new favorite! I told all my friends about it and we can't wait to build together."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full"></div>
                    <div>
                      <div className="font-black text-lg">Alex Chen</div>
                      <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Lifelong Learner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Blob */}
          <div className="blob blob-pink bottom-0 right-0 opacity-20 scale-150 blur-[150px]"></div>
        </section>

        {/* Roadmap Result Section */}
        <div id="roadmap-result" className="relative z-10 max-w-6xl mx-auto px-6 py-32 min-h-[600px]">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-10 rounded-[40px] border border-red-100 dark:border-red-900/40 text-center font-black text-xl mb-20">
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
