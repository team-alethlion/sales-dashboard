
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Filter, 
  Search, 
  TrendingUp, 
  ChevronRight, 
  Calendar, 
  Layers,
  ArrowUpRight,
  Target,
  BarChart3,
  CheckCircle2,
  Loader2,
  Zap,
  ShoppingBag,
  Activity,
  X
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';

const REPORT_DATA = [
  { id: 'ELE-MON-01', name: 'UltraHD Curved Monitor', category: 'Electronics', sales: 124, revenue: 43400, stock: 12, growth: '+14%', delta: 5400 },
  { id: 'F&B-BEA-05', name: 'Premium Coffee Beans', category: 'Food & Bev', sales: 540, revenue: 13230, stock: 85, growth: '+22%', delta: 2400 },
  { id: 'HOM-CHR-09', name: 'Ergonomic Office Chair', category: 'Home & Living', sales: 82, revenue: 20500, stock: 4, growth: '+5%', delta: 1100 },
  { id: 'APP-MSK-02', name: 'Silk Sleep Mask', category: 'Apparel', sales: 210, revenue: 7350, stock: 110, growth: '+18%', delta: 1300 },
  { id: 'ELE-HUB-U1', name: 'USB-C Multi-port Hub', category: 'Electronics', sales: 185, revenue: 10175, stock: 42, growth: '+12%', delta: 1200 },
  { id: 'F&B-TEA-G1', name: 'Organic Green Tea', category: 'Food & Bev', sales: 320, revenue: 5760, stock: 64, growth: '+9%', delta: 600 },
];

const PERFORMANCE_TREND = [
  { label: 'Wk 1', value: 12000 },
  { label: 'Wk 2', value: 18500 },
  { label: 'Wk 3', value: 15200 },
  { label: 'Wk 4', value: 24500 },
];

interface TopSellingReportPageProps {
  onBack: () => void;
  onViewProduct: (id: string) => void;
}

const TopSellingReportPage: React.FC<TopSellingReportPageProps> = ({ onBack, onViewProduct }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Categories derived from data
  const categories = ['All Categories', 'Electronics', 'Apparel', 'Home & Living', 'Food & Bev'];

  // Filter Logic
  const filtered = useMemo(() => {
    return REPORT_DATA.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'All Categories' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  // Dynamic Statistics
  const stats = useMemo(() => {
    const totalRev = filtered.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalUnits = filtered.reduce((acc, curr) => acc + curr.sales, 0);
    return { totalRev, totalUnits };
  }, [filtered]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Toast Feedback */}
      {exportSuccess && (
        <div className="fixed bottom-8 right-8 z-[150] animate-in slide-in-from-bottom-8 duration-300">
           <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
              <CheckCircle2 size={18} className="text-teal-400" />
              <span className="text-[11px] font-black uppercase tracking-widest">Report Binary Dispatched to Downloads</span>
           </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl text-gray-500 hover:text-teal-600 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Top Selling <span className="text-teal-600">Product Analysis</span>
            </h1>
            <p className="text-sm text-gray-400 font-medium">30-Day Velocity & Revenue Distribution</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-teal-200 transition-all disabled:opacity-50"
          >
            {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            <span>Export Report</span>
          </button>
        </div>
      </header>

      {/* Advanced KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm transition-all hover:scale-[1.02]">
           <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/20 text-teal-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp size={20} />
           </div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly GMV</p>
           <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">${stats.totalRev.toLocaleString()}</h3>
           <p className="text-[10px] text-emerald-500 font-bold mt-1 uppercase tracking-tight flex items-center gap-1">
             <ArrowUpRight size={12} /> +18.4% Efficiency
           </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm transition-all hover:scale-[1.02]">
           <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <ShoppingBag size={20} />
           </div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Unit Velocity</p>
           <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">{stats.totalUnits.toLocaleString()} Pcs</h3>
           <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">Across {categoryFilter}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm transition-all hover:scale-[1.02]">
           <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl flex items-center justify-center mb-4">
              <Zap size={20} />
           </div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Market Cap Delta</p>
           <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">+$12,400</h3>
           <p className="text-[10px] text-emerald-500 font-bold mt-1 uppercase tracking-tight">Net Positive Flow</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm transition-all hover:scale-[1.02]">
           <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-xl flex items-center justify-center mb-4">
              <Activity size={20} />
           </div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">SKU Churn Rate</p>
           <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">2.4%</h3>
           <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">Low Risk Level</p>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <TrendingUp size={16} className="text-teal-600" /> Weekly Aggregate Velocity
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-[9px] font-black text-teal-600 uppercase">Live Pulse</span>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', background: '#1e293b', color: '#fff' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={60}>
                  {PERFORMANCE_TREND.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#0d9488' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group flex-1">
             <Target size={150} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700 text-teal-400" />
             <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em] mb-4">Market Share Leader</p>
             <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
               {categoryFilter === 'All Categories' ? 'Electronics' : categoryFilter}
             </h3>
             <h4 className="text-xl font-black text-white/90">Dominating Segment</h4>
             <p className="text-xs text-slate-400 mt-6 leading-relaxed">
               Contributing <span className="text-teal-400 font-bold">48.2%</span> of total gross revenue this month. High velocity observed in SKU groups.
             </p>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/30 dark:bg-slate-800/30 relative">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter list by product or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium shadow-sm transition-all"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                categoryFilter !== 'All Categories' 
                ? 'bg-teal-50 border-teal-200 text-teal-600 dark:bg-teal-900/30' 
                : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-500'
              }`}
            >
              <Filter size={14} /> {categoryFilter}
            </button>
            
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setCategoryFilter(cat); setIsFilterOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${
                        categoryFilter === cat ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/40' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product / SKU</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Units Sold</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Revenue</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Growth</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {filtered.length > 0 ? filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-gray-50/30 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">{prod.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">SKU: {prod.id}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-2 py-0.5 bg-gray-50 dark:bg-slate-800 text-gray-500 rounded text-[9px] font-black uppercase tracking-widest">{prod.category}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <p className="text-sm font-black text-slate-700 dark:text-slate-300">{prod.sales}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <p className="text-sm font-black text-teal-600">${prod.revenue.toLocaleString()}</p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex items-center justify-center gap-1 text-emerald-500">
                       <ArrowUpRight size={14} />
                       <span className="text-[11px] font-black">{prod.growth}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button 
                      onClick={() => onViewProduct(prod.id)}
                      className="p-3 bg-gray-50 dark:bg-slate-800 text-gray-300 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-xl transition-all group-hover:scale-105"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={6} className="px-8 py-24 text-center">
                      <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-gray-200 dark:text-slate-700 mx-auto mb-6">
                        <ShoppingBag size={40} />
                      </div>
                      <h4 className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight">Zero Registry Matches</h4>
                      <p className="text-xs text-gray-400 mt-2 font-medium">Try broadening your category filter or search query.</p>
                      <button 
                        onClick={() => { setSearch(''); setCategoryFilter('All Categories'); }}
                        className="mt-8 px-8 py-3 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl"
                      >
                        Reset Analysis Grid
                      </button>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopSellingReportPage;
