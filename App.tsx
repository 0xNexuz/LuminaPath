
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
  
  // Theme state
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
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [topic]);

  return (
    <Layout isDark={isDark} onToggleTheme={toggleTheme}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Forge Your Learning <span className="text-indigo-600 dark:text-indigo-400">Roadmap</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Transform any topic into a structured 4-week mastery plan. Powered by AI and real-world web research.
          </p>
        </div>

        {/* Input Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
            <div className="relative flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <i className="fas fa-search"></i>
                </div>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Digital Marketing, Quantum Physics, Figma Design..."
                  className="block w-full pl-11 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !topic.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/20 flex items-center justify-center gap-2 shrink-0"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Generating...
                  </>
                ) : (
                  <>
                    Build Path
                    <i className="fas fa-arrow-right"></i>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Suggested Topics */}
          {!roadmap && !loading && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">Try:</span>
              {['Prompt Engineering', 'Classical Piano', 'UI Design', 'Blockchain'].map((t) => (
                <button
                  key={t}
                  onClick={() => { setTopic(t); }}
                  className="text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 px-6 py-4 rounded-2xl flex items-center gap-3 mb-8">
            <i className="fas fa-exclamation-circle text-xl"></i>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <Skeleton />
        ) : (
          roadmap && <RoadmapView roadmap={roadmap} topic={currentTopic} />
        )}

        {/* Empty State Illustration */}
        {!roadmap && !loading && !error && (
            <div className="text-center py-20 opacity-40">
                <div className="text-8xl text-slate-200 dark:text-slate-800 mb-6">
                    <i className="fas fa-mountain"></i>
                </div>
                <h3 className="text-xl font-medium text-slate-400 dark:text-slate-500">Enter a topic to begin your journey</h3>
            </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
