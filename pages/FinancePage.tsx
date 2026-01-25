import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  Plus, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart as PieChartIcon, 
  Calendar, 
  Download, 
  FileText, 
  ChevronRight, 
  MoreVertical, 
  X, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3, 
  Info,
  Layers,
  Banknote,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  Percent,
  FileSpreadsheet
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import DateRangePicker from '../components/DateRangePicker';

// --- MOCK DATA ---
const CASH_ACCOUNTS = [
  { id: 'ACC-001', name: 'Main Petty Cash', description: 'Daily operational float for Downtown', balance: 12450.50, isDefault: true },
  { id: 'ACC-002', name: 'M-Pesa Business', description: 'Till No. 892011 - Mobile collections', balance: 84200.00, isDefault: false },
  { id: 'ACC-003', name: 'Bank Deposit (Equity)', description: 'Corporate settlement account', balance: 450200.00, isDefault: false },
];

const FLOW_STATS = [
  { month: 'Jan', inflow: 120000, outflow: 80000 },
  { month: 'Feb', inflow: 140000, outflow: 95000 },
  { month: 'Mar', inflow: 110000, outflow: 105000 },
  { month: 'Apr', inflow: 160000, outflow: 120000 },
  { month: 'May', inflow: 185000, outflow: 130000 },
  { month: 'Jun', inflow: 195000, outflow: 145000 },
];

const FinancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cash' | 'pl'>('cash');
  const [showNewAccount, setShowNewAccount] = useState(false);
  const [saving, setSaving] = useState(false);
  const [taxRate, setTaxRate] = useState(16);
  const [dateRange, setDateRange] = useState({
    start: '2024-06-01',
    end: '2024-06-30'
  });

  // --- P&L CALCULATIONS ---
  const revenue = {
    sales: 245800,
    returns: 12400,
    get netSales() { return this.sales - this.returns; }
  };

  const cogs = {
    totalCostSales: 112000,
    carriageInwards: 8500,
    get totalCOGS() { return this.totalCostSales + this.carriageInwards; }
  };

  const grossProfit = revenue.netSales - cogs.totalCOGS;
  const expenses = 45200;
  const netProfitBeforeTax = grossProfit - expenses;
  const taxAmount = (netProfitBeforeTax * taxRate) / 100;
  const finalProfit = netProfitBeforeTax - taxAmount;

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowNewAccount(false);
    }, 1200);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
            Financial <span className="text-teal-600">Performance</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
            Cash account logistics and Profit & Loss analysis
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <DateRangePicker range={dateRange} onChange={setDateRange} />
          <div className="h-8 w-px bg-gray-200 dark:bg-slate-800 hidden md:block" />
          <button 
            onClick={() => setActiveTab('pl')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:border-teal-300 transition-all"
          >
            <Calculator size={18} className="text-teal-600" />
            <span className="hidden sm:inline">P&L View</span>
          </button>
        </div>
      </header>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 p-1 bg-gray-100/50 dark:bg-slate-800/50 rounded-2xl mb-8 w-fit border border-gray-100 dark:border-slate-800">
        {[
          { id: 'cash', name: 'Cash Accounts', icon: <Wallet size={14} /> },
          { id: 'pl', name: 'Profit & Loss', icon: <BarChart3 size={14} /> },
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

      {/* Tab Content: CASH ACCOUNTS */}
      {activeTab === 'cash' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Cash Accounts</h3>
                <button 
                  onClick={() => setShowNewAccount(true)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-teal-600 hover:underline"
                >
                  <Plus size={14} /> New Account
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CASH_ACCOUNTS.map(acc => (
                  <div key={acc.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm relative group hover:border-teal-200 transition-all">
                    {acc.isDefault && (
                      <span className="absolute top-6 right-6 px-2 py-0.5 bg-teal-50 text-teal-600 rounded text-[9px] font-black uppercase tracking-tighter">Default</span>
                    )}
                    <div className="w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-teal-600 mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      <Wallet size={24} />
                    </div>
                    <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">{acc.name}</h4>
                    <p className="text-xs text-gray-400 font-medium mb-6 line-clamp-1">{acc.description}</p>
                    <div className="flex items-end justify-between border-t border-gray-50 dark:border-slate-800 pt-4">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Book Balance</p>
                        <p className="text-2xl font-black text-slate-800 dark:text-slate-100">${acc.balance.toLocaleString()}</p>
                      </div>
                      <button className="p-2 text-gray-300 hover:text-slate-600 transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setShowNewAccount(true)}
                  className="border-4 border-dashed border-gray-100 dark:border-slate-800 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-3 hover:border-teal-100 transition-all group min-h-[220px]"
                >
                  <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-full group-hover:text-teal-600 text-gray-300 transition-colors">
                    <Plus size={32} />
                  </div>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Add New Cash Account</span>
                </button>
              </div>
            </div>

            {/* Cash Statistics */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Cash Account Statistics</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={FLOW_STATS}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', background: '#1e293b', color: '#fff' }} />
                      <Bar dataKey="inflow" fill="#0d9488" radius={[2, 2, 0, 0]} barSize={10} />
                      <Bar dataKey="outflow" fill="#f43f5e" radius={[2, 2, 0, 0]} barSize={10} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 space-y-4 pt-8 border-t border-gray-50 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-teal-600" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Inflows</span>
                    </div>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">$910k</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Outflows</span>
                    </div>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">$675k</span>
                  </div>
                </div>
              </div>

              <div className="bg-teal-600 p-6 rounded-[2rem] shadow-xl text-white relative overflow-hidden group">
                 <TrendingUp size={100} className="absolute -bottom-6 -right-6 opacity-10 group-hover:rotate-12 transition-transform duration-500" />
                 <p className="text-[10px] font-black text-teal-100 uppercase tracking-widest mb-2">Liquidity Health</p>
                 <h4 className="text-2xl font-black italic uppercase tracking-tighter">Excellent</h4>
                 <p className="text-xs font-medium text-teal-50 mt-2 leading-relaxed opacity-80">Your cash reserves are sufficient to cover operating expenses for the next 4.2 months based on current burn rate.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: PROFIT & LOSS */}
      {activeTab === 'pl' && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* P&L Header */}
            <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gray-50/20 dark:bg-slate-800/20">
              <div>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Profit & Loss Account</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Period: {dateRange.start} to {dateRange.end}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs hover:bg-gray-100 transition-all">
                  <FileSpreadsheet size={16} className="text-emerald-500" /> Export CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-black transition-all shadow-lg shadow-slate-900/10">
                  <Download size={16} /> Export PDF
                </button>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              
              {/* 1. REVENUE / DETAILS */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center text-teal-600">
                    <Banknote size={16} />
                  </div>
                  <h4 className="text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-[0.2em]">I. Revenue Details</h4>
                </div>
                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-slate-800">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Sales / Revenue</span>
                    <span className="text-sm font-black text-slate-800 dark:text-slate-100">${revenue.sales.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-slate-800">
                    <span className="text-sm font-medium text-rose-500 italic">Sales Returns</span>
                    <span className="text-sm font-black text-rose-500">(${revenue.returns.toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50/50 dark:bg-slate-800/40 rounded-2xl mt-4">
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">NET SALES</span>
                    <span className="text-lg font-black text-teal-600">${revenue.netSales.toLocaleString()}</span>
                  </div>
                </div>
              </section>

              {/* 2. COGS */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600">
                    <Layers size={16} />
                  </div>
                  <h4 className="text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-[0.2em]">II. Cost of Goods Sold (COGS)</h4>
                </div>
                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-slate-800">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Cost Sales</span>
                    <span className="text-sm font-black text-slate-800 dark:text-slate-100">${cogs.totalCostSales.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-slate-800">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Carriage Inwards</span>
                    <span className="text-sm font-black text-slate-800 dark:text-slate-100">${cogs.carriageInwards.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-slate-400 italic">
                    <span className="text-xs font-bold uppercase tracking-tight">Total COGS Calculation</span>
                    <span className="text-sm font-bold">(${cogs.totalCOGS.toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50/30 dark:bg-blue-900/10 rounded-2xl border border-blue-50 dark:border-blue-900/20 mt-4">
                    <span className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest">GROSS PROFIT</span>
                    <span className="text-lg font-black text-blue-800 dark:text-blue-100">${grossProfit.toLocaleString()}</span>
                  </div>
                </div>
              </section>

              {/* 3. EXPENSES & TAX */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-rose-50 dark:bg-rose-900/20 rounded-lg flex items-center justify-center text-rose-600">
                    <TrendingDown size={16} />
                  </div>
                  <h4 className="text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-[0.2em]">III. Operating Result & Tax</h4>
                </div>
                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-slate-800">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Expenses</span>
                    <span className="text-sm font-black text-rose-500">(${expenses.toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-slate-800">
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">NET PROFIT BEFORE TAX</span>
                    <span className="text-lg font-black text-slate-800 dark:text-slate-100">${netProfitBeforeTax.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-gray-50 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Tax Provision</span>
                      <div className="flex items-center gap-1 bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
                        <input 
                          type="number" 
                          value={taxRate} 
                          onChange={(e) => setTaxRate(parseInt(e.target.value) || 0)}
                          className="w-8 bg-transparent border-none p-0 text-xs font-black text-teal-600 text-right focus:ring-0"
                        />
                        <span className="text-[10px] font-black text-gray-400">%</span>
                      </div>
                    </div>
                    <span className="text-sm font-black text-rose-500">(${taxAmount.toLocaleString()})</span>
                  </div>
                  
                  {/* Final Profit Hero */}
                  <div className="mt-12 p-10 bg-slate-900 dark:bg-teal-950/20 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white group">
                    <BarChart3 size={150} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-500 text-teal-400" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div>
                        <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em] mb-3">Final Retained Earnings</p>
                        <h5 className="text-5xl font-black tracking-tighter uppercase italic">Net <span className="text-teal-400">Profit</span></h5>
                        <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-[0.2em] flex items-center gap-2">
                           <CheckCircle2 size={12} className="text-teal-500" /> Ledger Audited & Balanced
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-6xl font-black text-teal-400 tracking-tighter">${finalProfit.toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest opacity-60">Report generated on June 30, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      )}

      {/* NEW CASH ACCOUNT MODAL */}
      {showNewAccount && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowNewAccount(false)} />
          <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-900/20">
                  <Wallet size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">New Cash Account</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Initialize Treasury Allocation</p>
                </div>
              </div>
              <button onClick={() => setShowNewAccount(false)} className="p-2.5 text-gray-300 hover:text-rose-500 transition-all hover:rotate-90">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddAccount} className="p-8 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Account Name *</label>
                  <input type="text" placeholder="e.g. Mombasa Office Petty Cash" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" required />
                </div>
                
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Description</label>
                  <textarea rows={2} placeholder="Explain the primary use of this account..." className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Opening Balance ($)</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" />
                      <input type="number" step="0.01" placeholder="0.00" className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black text-teal-600" />
                    </div>
                  </div>
                  <div className="flex items-end pb-1 px-1">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-10 h-5 bg-gray-200 dark:bg-slate-800 rounded-full peer peer-checked:bg-teal-600 transition-all shadow-inner"></div>
                        <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-5 transition-transform shadow-sm"></div>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">Set as Default</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-2xl border border-teal-100 dark:border-teal-900/30 flex gap-4">
                 <Info size={20} className="text-teal-600 shrink-0 mt-0.5" />
                 <p className="text-[10px] font-bold text-teal-700 dark:text-teal-300 leading-relaxed uppercase tracking-wider">
                   Pro Tip: The opening balance is treated as an 'Owner Investment' in your equity account for double-entry tracking.
                 </p>
              </div>

              <div className="flex gap-4 pt-4 sticky bottom-0 bg-white dark:bg-slate-900 pb-2">
                <button 
                  type="button" 
                  onClick={() => setShowNewAccount(false)}
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
                      Post & Initialize Account <ChevronRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancePage;
