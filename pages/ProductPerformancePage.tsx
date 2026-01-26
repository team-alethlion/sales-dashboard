
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  TrendingUp, 
  Package, 
  ArrowUpRight, 
  ChevronRight, 
  Calendar, 
  History, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  Clock,
  ArrowRight,
  PieChart as PieIcon,
  Activity,
  CheckCircle2, 
  Loader2, 
  AlertTriangle, 
  ExternalLink, 
  Target, 
  BarChart3,
  Info
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// --- MOCK DATA GENERATORS ---
const GENERATE_HISTORY = (multiplier: number) => [
  { month: 'Jan', revenue: 8400 * multiplier },
  { month: 'Feb', revenue: 12000 * multiplier },
  { month: 'Mar', revenue: 9500 * multiplier },
  { month: 'Apr', revenue: 15400 * multiplier },
  { month: 'May', revenue: 21200 * multiplier },
  { month: 'Jun', revenue: 19800 * multiplier },
];

const RECENT_LEDGER = [
  { id: 'SL-9021', date: '2024-06-20', branch: 'Downtown', qty: 2, price: 599.98, status: 'Completed' },
  { id: 'SL-9015', date: '2024-06-18', branch: 'Airport', qty: 1, price: 299.99, status: 'Completed' },
  { id: 'SL-8990', date: '2024-06-15', branch: 'Commercial', qty: 4, price: 1199.96, status: 'Completed' },
  { id: 'SL-8920', date: '2024-06-12', branch: 'Downtown', qty: 1, price: 299.99, status: 'Refunded' },
];

interface ProductPerformancePageProps {
  productId: string | null;
  onBack: () => void;
  onViewLedger: () => void;
}

const ProductPerformancePage: React.FC<ProductPerformancePageProps> = ({ productId, onBack, onViewLedger }) => {
  // --- STATE ---
  const [selectedBranch, setSelectedBranch] = useState('Global Network');
  const [isRestocking, setIsRestocking] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [currentStock, setCurrentStock] = useState(12);

  // --- DERIVED DATA ---
  const chartData = useMemo(() => {
    return selectedBranch === 'Global Network' ? GENERATE_HISTORY(1) : GENERATE_HISTORY(0.4);
  }, [selectedBranch]);

  // Mock product details (usually fetched via productId)
  const product = useMemo(() => ({
    id: productId || 'ELE-MON-01',
    name: 'UltraHD Curved Monitor 32"',
    category: 'Electronics',
    brand: 'Samsung',
    price: 299.99,
    cost: 185.00,
    margin: '38.4%',
    threshold: 5,
    ltSales: 1240,
    ltRevenue: 371987.60,
    turnover: '12.4x',
    velocity: 'High'
  }), [productId]);

  // --- HANDLERS ---
  const handleRestock = () => {
    setIsRestocking(true);
    setTimeout(() => {
      setIsRestocking(false);
      setCurrentStock(prev => prev + 25);
      triggerFeedback("Supply Protocol Initialized: +25 Units allocated to Downtown Hub.");
    }, 2000);
  };

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Action Toast */}
      {actionFeedback && (
        <div className="fixed bottom-8 right-8 z-[150] animate-in slide-in-from-bottom-8 duration-300">
           <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 max-w-sm">
              <CheckCircle2 size={18} className="text-teal-400 shrink-0" />
              <span className="text-[11px] font-black uppercase tracking-widest">{actionFeedback}</span>
           </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl text-gray-500 hover:text-teal-600 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Performance <span className="text-teal-600 italic">Audit</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Registry Record #{product.id}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl flex items-center gap-2 border border-emerald-100 dark:border-emerald-800">
             <ShieldCheck size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest">Stock Validated</span>
           </div>
           <button className="p-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-gray-400 hover:text-teal-600 transition-all shadow-sm">
             <ExternalLink size={18} />
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Metrics & Charts */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Top Metric Strip */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:scale-110 transition-transform">
                   <Package size={40} />
                 </div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Available Stock</p>
                 <h4 className={`text-3xl font-black ${currentStock <= product.threshold ? 'text-rose-500' : 'text-slate-800 dark:text-slate-100'}`}>
                   {currentStock} <span className="text-sm text-gray-400 font-bold">Units</span>
                 </h4>
                 <div className="mt-4 h-1.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${currentStock <= product.threshold ? 'bg-rose-500' : 'bg-teal-500'}`} 
                      style={{ width: `${Math.min(100, (currentStock / 50) * 100)}%` }} 
                    />
                 </div>
                 <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase">Safety Threshold: {product.threshold} Units</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm group">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Stock Turn Rate</p>
                 <h4 className="text-3xl font-black text-teal-600">{product.turnover}</h4>
                 <div className="flex items-center gap-1 text-emerald-500 mt-2">
                    <TrendingUp size={14} />
                    <span className="text-[10px] font-black uppercase">Elite Velocity</span>
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">GMV Allocation</p>
                 <h4 className="text-3xl font-black text-blue-600">38.4%</h4>
                 <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase">Net Margin Weighted</p>
              </div>
           </div>

           {/* Trend Chart */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-gray-50 dark:border-slate-800 shadow-sm relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-50 dark:bg-teal-900/30 text-teal-600 rounded-xl">
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">12-Month Revenue Heat Map</h3>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Aggregated Branch Data</p>
                    </div>
                 </div>
                 <div className="relative">
                    <select 
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest px-5 py-3 focus:ring-2 focus:ring-teal-500/50 appearance-none pr-10 cursor-pointer"
                    >
                        <option>Global Network</option>
                        <option>Downtown Nairobi</option>
                        <option>Airport Hub</option>
                        <option>Commercial Center</option>
                    </select>
                    <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                 </div>
              </div>
              <div className="h-[300px] animate-in fade-in duration-500">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                       <defs>
                          <linearGradient id="skuColor" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} tickFormatter={(val) => `$${val/1000}k`} />
                       <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', background: '#0f172a', color: '#fff', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }} />
                       <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#0d9488" 
                        strokeWidth={4} 
                        fillOpacity={1} 
                        fill="url(#skuColor)" 
                        dot={{ r: 4, fill: '#0d9488', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Recent Ledger */}
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 dark:border-slate-800 bg-gray-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                      <History size={20} />
                    </div>
                    <h3 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">Recent SKU Transactions</h3>
                 </div>
                 <button 
                  onClick={onViewLedger}
                  className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1.5"
                 >
                   Audit Full Ledger <ChevronRight size={14} />
                 </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                      <tr className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-50 dark:border-slate-800">
                        <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                        <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Units</th>
                        <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Value</th>
                        <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                        <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                      {RECENT_LEDGER.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50/30 transition-colors group">
                          <td className="px-8 py-5 text-xs font-black text-teal-600">#{log.id}</td>
                          <td className="px-8 py-5">
                            <p className="text-[11px] font-bold text-slate-500 uppercase">{log.date}</p>
                            <p className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">{log.branch} Node</p>
                          </td>
                          <td className="px-8 py-5 text-center text-xs font-black text-slate-800 dark:text-slate-100">{log.qty}</td>
                          <td className="px-8 py-5 text-right text-xs font-black text-slate-800 dark:text-slate-100">${log.price.toLocaleString()}</td>
                          <td className="px-8 py-5 text-center">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${log.status === 'Refunded' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'}`}>{log.status}</span>
                          </td>
                          <td className="px-8 py-5 text-center">
                             <button className="p-2 text-gray-300 hover:text-teal-600 transition-all">
                               <ExternalLink size={14} />
                             </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
           </div>
        </div>

        {/* Right: SKU Context Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-gray-50 dark:border-slate-800 shadow-sm group">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Metadata & Identity</h3>
              <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-teal-600 shadow-inner group-hover:scale-110 transition-transform">
                       <Package size={28} />
                    </div>
                    <div>
                       <p className="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">{product.name}</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5">{product.brand} • {product.category}</p>
                       <div className="mt-2 flex gap-2">
                         <span className="text-[8px] font-black text-teal-600 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded uppercase tracking-tighter">SKU Master</span>
                         <span className="text-[8px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded uppercase tracking-tighter">Bestseller</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 border-t border-gray-50 dark:border-slate-800 pt-6">
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cost Price</p>
                       <p className="text-sm font-black text-slate-700 dark:text-slate-300">${product.cost.toFixed(2)}</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selling Price</p>
                       <p className="text-sm font-black text-teal-600">${product.price.toFixed(2)}</p>
                    </div>
                 </div>

                 <div className="p-6 bg-gray-50 dark:bg-slate-800/40 rounded-[2rem] border border-dashed border-gray-200 dark:border-slate-700 relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 opacity-5 rotate-12">
                      <Target size={60} />
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Lifetime Revenue</p>
                    <div className="flex justify-between items-end">
                       <span className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tighter">${(product.ltRevenue / 1000).toFixed(1)}k</span>
                       <div className="text-right">
                         <p className="text-xs font-black text-teal-600">{product.ltSales.toLocaleString()}</p>
                         <p className="text-[8px] font-bold text-gray-400 uppercase">Units Sold</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
              <Activity size={120} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-500 text-teal-400" />
              <h4 className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em] mb-8">Supply Integrity HUD</h4>
              
              <div className="space-y-6 relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-teal-400 shadow-xl border border-white/5"><Layers size={20}/></div>
                    <div>
                       <p className="text-xs font-black uppercase tracking-tight">Lead Time Velocity</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase">Avg. 4.2 days from origin</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-teal-400 shadow-xl border border-white/5"><DollarSign size={20}/></div>
                    <div>
                       <p className="text-xs font-black uppercase tracking-tight">Price Volatility Index</p>
                       <p className="text-[10px] text-emerald-400 font-bold uppercase">Stable (0.2% variance)</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-teal-400 shadow-xl border border-white/5"><AlertTriangle size={20}/></div>
                    <div>
                       <p className="text-xs font-black uppercase tracking-tight">Projected Stock-out</p>
                       <p className={`text-[10px] font-bold uppercase ${currentStock <= 5 ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`}>
                         {currentStock <= 5 ? 'CRITICAL: Under 48 hours' : '14 Days remaining'}
                       </p>
                    </div>
                 </div>
              </div>

              <button 
                onClick={handleRestock}
                disabled={isRestocking}
                className="w-full mt-10 py-5 bg-white text-slate-900 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-teal-50 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                 {isRestocking ? (
                   <Loader2 size={16} className="animate-spin" />
                 ) : (
                   <>Restock Protocol <ArrowRight size={16} /></>
                 )}
              </button>
           </div>

           <div className="p-6 bg-teal-50 dark:bg-teal-950/20 rounded-[2.5rem] border border-teal-100 dark:border-teal-900/30 flex gap-4">
              <Info size={24} className="text-teal-600 shrink-0 mt-0.5" />
              <p className="text-[10px] font-bold text-teal-700 dark:text-teal-300 leading-relaxed uppercase tracking-wider">
                Auditor Note: Inventory movements are synchronized across the global registry every 120 seconds. Manual overrides are flagged for supervisor review.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPerformancePage;
