
import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  DollarSign, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  MoreVertical,
  ChevronDown,
  X,
  FileText,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Trash2,
  ExternalLink,
  ArrowRight,
  Info,
  Layers,
  FileCode,
  Clock,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import DateRangePicker from '../components/DateRangePicker';

// --- MOCK DATA ---
const MOCK_EXPENSES = [
  { id: 'EXP-4012', date: '2024-06-20', vendor: 'Google Workspace', category: 'Software', amount: 145, method: 'Card', status: 'Cleared', description: 'Monthly business productivity suite' },
  { id: 'EXP-4011', date: '2024-06-19', vendor: 'Utility Grid Co.', category: 'Utilities', amount: 890, method: 'Bank', status: 'Cleared', description: 'Downtown Branch Electricity Bill' },
  { id: 'EXP-4010', date: '2024-06-18', vendor: 'Aria Properties', category: 'Rent', amount: 4500, method: 'Bank', status: 'Pending', description: 'June Main Office Rental' },
  { id: 'EXP-4009', date: '2024-06-15', vendor: 'Petty Cash', category: 'Supplies', amount: 45, method: 'Cash', status: 'Cleared', description: 'Stationery and ink' },
  { id: 'EXP-4008', date: '2024-06-12', vendor: 'AWS Cloud', category: 'Software', amount: 230, method: 'Card', status: 'Cleared', description: 'Server hosting' },
  { id: 'EXP-4007', date: '2024-06-10', vendor: 'LogiLink', category: 'Logistics', amount: 1200, method: 'M-Pesa', status: 'Cleared', description: 'Batch #40 shipment delivery' },
];

const CATEGORY_STATS = [
  { name: 'Rent', value: 4500, color: '#0d9488' },
  { name: 'Salary', value: 12000, color: '#14b8a6' },
  { name: 'Utilities', value: 1800, color: '#5eead4' },
  { name: 'Logistics', value: 3400, color: '#99f6e4' },
  { name: 'Software', value: 950, color: '#ccfbf1' },
];

const TREND_DATA = [
  { month: 'Jan', amount: 18000 },
  { month: 'Feb', amount: 16500 },
  { month: 'Mar', amount: 21000 },
  { month: 'Apr', amount: 19200 },
  { month: 'May', amount: 24500 },
  { month: 'Jun', amount: 22800 },
];

const ExpensesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'analytics' | 'categories'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: '2024-06-01',
    end: '2024-06-30'
  });

  // --- DERIVED DATA ---
  const filteredExpenses = useMemo(() => {
    return MOCK_EXPENSES.filter(exp => {
      const matchesSearch = 
        exp.vendor.toLowerCase().includes(searchQuery.toLowerCase()) || 
        exp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const expDate = new Date(exp.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      
      const matchesDate = expDate >= startDate && expDate <= endDate;

      return matchesSearch && matchesDate;
    });
  }, [searchQuery, dateRange]);

  const totalSpentMonth = 22800;
  const pendingAmount = 4500;

  // --- HANDLERS ---
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowAddModal(false);
    }, 1200);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
            Business <span className="text-teal-600">Expenses</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
            Monitor, categorize, and control corporate spending
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
          >
            <Upload size={18} />
            <span className="hidden sm:inline">Bulk Entry</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all"
          >
            <Plus size={18} />
            <span>Add Expense</span>
          </button>
        </div>
      </header>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Monthly Spend', value: `$${totalSpentMonth.toLocaleString()}`, sub: '+4.2% from May', icon: <TrendingUp size={18} />, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
          { label: 'Pending Approvals', value: `$${pendingAmount.toLocaleString()}`, sub: '3 transactions', icon: <Clock size={18} />, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Top Category', value: 'Salary', sub: '54% of total budget', icon: <Briefcase size={18} />, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
          { label: 'Avg Daily Burn', value: '$760', sub: 'Calculated this week', icon: <DollarSign size={18} />, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-all hover:scale-[1.02]">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className={`text-xl font-black text-slate-800 dark:text-slate-100`}>{stat.value}</h3>
            <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tight">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 p-1 bg-gray-100/50 dark:bg-slate-800/50 rounded-2xl mb-8 w-fit border border-gray-100 dark:border-slate-800">
        {[
          { id: 'all', name: 'Transactions', icon: <Layers size={14} /> },
          { id: 'analytics', name: 'Spending Trends', icon: <PieChartIcon size={14} /> },
          { id: 'categories', name: 'Budget Categories', icon: <Filter size={14} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
              ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' 
              : 'text-gray-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content: ALL TRANSACTIONS */}
      {activeTab === 'all' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/30 dark:bg-slate-800/20">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Filter by vendor, category, or note..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm shadow-sm"
                  />
                </div>
                <DateRangePicker range={dateRange} onChange={setDateRange} />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-teal-600 transition-colors">
                  <Download size={14} /> Export CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-teal-600 transition-colors">
                  <FileText size={14} /> Audit PDF
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-slate-800/50">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Entry ID</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Vendor & Desc</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Category</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Method</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((exp) => (
                      <tr key={exp.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-5">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">#{exp.id}</span>
                          <p className="text-[10px] text-gray-300 mt-0.5">{exp.date}</p>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-black text-slate-800 dark:text-slate-100">{exp.vendor}</p>
                          <p className="text-[10px] text-gray-400 font-medium truncate max-w-[200px]">{exp.description}</p>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="px-2 py-0.5 bg-gray-50 dark:bg-slate-800 text-gray-500 rounded text-[10px] font-black uppercase tracking-tighter">
                            {exp.category}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right font-black text-slate-800 dark:text-slate-100">
                          ${exp.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <CreditCard size={12} className="text-gray-300" />
                            <span className="text-[9px] font-bold text-gray-400 uppercase">{exp.method}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            exp.status === 'Cleared' ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {exp.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button className="p-2 text-gray-300 hover:text-slate-600 transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No transactions found for the selected range</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 text-center border-t border-gray-50 dark:border-slate-800">
              <button className="text-[10px] font-black text-gray-400 hover:text-teal-600 uppercase tracking-widest transition-all">Load More Transactions</button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Spending Velocity (6 Months)</h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-teal-600" /><span className="text-[10px] font-bold text-gray-400 uppercase">Cash Outflow</span></div>
              </div>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND_DATA}>
                  <defs>
                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', background: '#0f172a', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#0d9488" strokeWidth={4} fillOpacity={1} fill="url(#colorAmt)" dot={{ r: 4, fill: '#0d9488' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm flex-1">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Budget Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CATEGORY_STATS}
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {CATEGORY_STATS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-4">
                {CATEGORY_STATS.map((seg, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{seg.name}</span>
                    </div>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">${seg.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORY_STATS.map((cat, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm group hover:border-teal-200 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-teal-600 shadow-sm group-hover:scale-110 transition-transform">
                       <Layers size={24} />
                    </div>
                    <button className="p-2 text-gray-300 hover:text-slate-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">{cat.name}</h4>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Allocation</p>
                      <p className="text-xl font-black text-teal-600">${cat.value.toLocaleString()}</p>
                    </div>
                    <button className="text-[10px] font-black text-gray-400 hover:text-teal-600 uppercase tracking-[0.2em] flex items-center gap-1 transition-colors">
                      Ledger <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <button className="bg-gray-50 dark:bg-slate-800/30 p-6 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3 hover:border-teal-300 transition-all group">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm text-gray-400 group-hover:text-teal-600 transition-colors">
                  <Plus size={24} />
                </div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">New Budget Code</span>
              </button>
           </div>
        </div>
      )}

      {/* ADD EXPENSE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowAddModal(false)} />
          <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-900/20">
                  <DollarSign size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Record Business Spend</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Single Entry Protocol</p>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2.5 text-gray-300 hover:text-rose-500 transition-all hover:rotate-90">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddExpense} className="p-8 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Vendor / Recipient</label>
                  <input type="text" placeholder="e.g. Utility Grid Co." className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" required />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Category</label>
                  <select className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none cursor-pointer">
                    <option>Rent</option>
                    <option>Salary</option>
                    <option>Utilities</option>
                    <option>Logistics</option>
                    <option>Software</option>
                    <option>Supplies</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Amount ($)</label>
                  <div className="relative">
                    <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" />
                    <input type="number" step="0.01" placeholder="0.00" className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black text-teal-600" required />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Payment Method</label>
                  <div className="relative">
                    <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none cursor-pointer">
                      <option>Bank Transfer</option>
                      <option>Company Card</option>
                      <option>Petty Cash</option>
                      <option>M-Pesa Business</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Internal Memo / Details</label>
                <textarea rows={3} placeholder="Provide specific context for this expense..." className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none" />
              </div>

              <div className="flex gap-4 pt-4 sticky bottom-0 bg-white dark:bg-slate-900 pb-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-teal-900/20 hover:bg-teal-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Post Transaction <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK IMPORT MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowBulkModal(false)} />
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 overflow-hidden">
             <div className="p-6 md:p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 md:w-12 md:h-12 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/20">
                  <Upload size={20} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Bulk Ledger Import</h3>
                  <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">High-Volume Data Injection</p>
                </div>
              </div>
              <button onClick={() => setShowBulkModal(false)} className="p-2.5 text-gray-300 hover:text-rose-500 transition-all hover:rotate-90">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6 md:space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800">
              {/* Template Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gray-50 dark:bg-slate-800 p-5 md:p-6 rounded-3xl border border-gray-100 dark:border-slate-700 flex flex-col items-center text-center group hover:border-teal-300 transition-all cursor-pointer">
                  <FileCode size={36} className="text-teal-600 mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs md:text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">Excel Template</h4>
                  <p className="text-[9px] md:text-[10px] text-gray-400 font-bold mt-2 leading-relaxed">Download our pre-structured .XLSX file for clean imports</p>
                  <button className="mt-4 md:mt-6 flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-teal-600 shadow-sm">
                    <Download size={14} /> Download
                  </button>
                </div>
                <div className="bg-gray-50 dark:bg-slate-800 p-5 md:p-6 rounded-3xl border border-gray-100 dark:border-slate-700 flex flex-col items-center text-center group hover:border-teal-300 transition-all cursor-pointer">
                  <FileText size={36} className="text-blue-600 mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs md:text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">CSV Protocol</h4>
                  <p className="text-[9px] md:text-[10px] text-gray-400 font-bold mt-2 leading-relaxed">Simple comma-separated format for legacy systems</p>
                  <button className="mt-4 md:mt-6 flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="border-4 border-dashed border-gray-100 dark:border-slate-800 rounded-[2rem] p-8 md:p-12 text-center bg-gray-50/20 hover:border-teal-200 transition-all cursor-pointer flex flex-col items-center group">
                 <div className="w-14 h-14 md:w-16 md:h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                   <Upload size={28} className="text-teal-600" />
                 </div>
                 <h4 className="text-base md:text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">Drag file to process</h4>
                 <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">Maximum file size: 25MB</p>
              </div>

              <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-2xl border border-teal-100 dark:border-teal-900/30 flex gap-4">
                 <Info size={20} className="text-teal-600 shrink-0 mt-0.5" />
                 <p className="text-[9px] md:text-[10px] font-bold text-teal-700 dark:text-teal-300 leading-relaxed uppercase tracking-wider">
                   Pro Tip: Ensure all dates follow the YYYY-MM-DD format and categories exactly match your existing budget codes to prevent validation errors during the processing phase.
                 </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
