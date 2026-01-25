
import React, { useState } from 'react';
import { ArrowLeft, Search, Book, Bookmark, Clock, ChevronRight, Filter, Star, Info, FileText } from 'lucide-react';

const CATEGORIES = [
  { id: 'cat1', name: 'Getting Started', count: 12, color: 'bg-teal-500' },
  { id: 'cat2', name: 'Sales & POS', count: 28, color: 'bg-emerald-500' },
  { id: 'cat3', name: 'Inventory', count: 18, color: 'bg-blue-500' },
  { id: 'cat4', name: 'Finance', count: 15, color: 'bg-rose-500' },
  { id: 'cat5', name: 'System Settings', count: 9, color: 'bg-slate-500' },
];

const ARTICLES = [
  { id: 'art1', category: 'Getting Started', title: 'Setting up your first branch', excerpt: 'Learn how to configure branch settings, timezones, and currency.', readTime: '5 min', isPopular: true },
  { id: 'art2', category: 'Getting Started', title: 'Managing user permissions', excerpt: 'Assign roles like Cashier, Manager, or Admin with granular control.', readTime: '8 min', isPopular: false },
  { id: 'art3', category: 'Sales & POS', title: 'Processing inter-branch returns', excerpt: 'How to handle returns from items bought at a different location.', readTime: '4 min', isPopular: true },
  { id: 'art4', category: 'Inventory', title: 'Carriage Inwards explained', excerpt: 'Properly logging transport costs to calculate true item margins.', readTime: '12 min', isPopular: false },
  { id: 'art5', category: 'Finance', title: 'Understanding your P&L statement', excerpt: 'A deep dive into how Code8 calculates net profit and margins.', readTime: '15 min', isPopular: true },
  { id: 'art6', category: 'Sales & POS', title: 'Printer pairing and troubleshooting', excerpt: 'Common fixes for thermal printers and Bluetooth drops.', readTime: '6 min', isPopular: false },
];

interface SupportAllArticlesPageProps {
  onBack: () => void;
  onViewArticle: (id: string) => void;
}

const SupportAllArticlesPage: React.FC<SupportAllArticlesPageProps> = ({ onBack, onViewArticle }) => {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const filteredArticles = ARTICLES.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = !activeCat || art.category === activeCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-gray-500 hover:text-teal-600 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Knowledge <span className="text-teal-600">Base</span></h1>
            <p className="text-sm text-gray-500 font-medium">Browse our complete collection of user guides</p>
          </div>
        </div>

        <div className="relative flex-1 max-w-lg group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search all documentation..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border-none focus:ring-4 focus:ring-teal-500/20 text-sm font-medium shadow-sm transition-all"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Filter */}
        <aside className="lg:col-span-3 space-y-8">
          <div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
              <Filter size={14} /> Categories
            </h3>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveCat(null)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${!activeCat ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/10' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
              >
                All Articles
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCat(cat.name)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${activeCat === cat.name ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/10' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                >
                  {cat.name}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-lg ${activeCat === cat.name ? 'bg-white/20' : 'bg-gray-100 dark:bg-slate-700'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-teal-50 dark:bg-teal-950/20 rounded-[2rem] border border-teal-100 dark:border-teal-900/30">
            <h4 className="text-xs font-black text-teal-800 dark:text-teal-400 uppercase tracking-widest mb-2">Need a demo?</h4>
            <p className="text-[11px] text-teal-700 dark:text-teal-300 font-medium leading-relaxed">Schedule a live training session with our product experts to master the advanced features.</p>
            <button className="mt-4 text-[10px] font-black text-teal-600 uppercase underline">Book Session</button>
          </div>
        </aside>

        {/* Article Grid */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map(art => (
              <div 
                key={art.id} 
                onClick={() => onViewArticle(art.id)}
                className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm hover:border-teal-200 transition-all cursor-pointer group flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[9px] font-black text-teal-600 uppercase tracking-[0.2em] bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded-lg">
                    {art.category}
                  </span>
                  {art.isPopular && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[9px] font-black uppercase">Popular</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight group-hover:text-teal-600 transition-colors mb-3">
                  {art.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium leading-relaxed mb-8 flex-1">
                  {art.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Clock size={14} /> {art.readTime} Read
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-300 group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-gray-300 mx-auto mb-6">
                <FileText size={40} />
              </div>
              <h4 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">No articles found</h4>
              <p className="text-sm text-gray-400 mt-2">Try adjusting your search or category filters.</p>
              <button 
                onClick={() => { setSearch(''); setActiveCat(null); }}
                className="mt-8 px-6 py-2 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-900/10"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportAllArticlesPage;
