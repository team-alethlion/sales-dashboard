
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  DollarSign, 
  Calendar, 
  FileText, 
  Building, 
  TrendingDown,
  ChevronRight,
  MoreVertical,
  X,
  Save,
  Clock,
  Briefcase,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell
} from 'recharts';

const MOCK_CARRIAGE_ENTRIES = [
  { id: 'CI-001', supplier: 'LogiLink Logistics', details: 'Freight for Electronics SKU-402', amount: 1200, date: '2024-06-12', account: 'Main Petty Cash', status: 'Cleared' },
  { id: 'CI-002', supplier: 'Global Tech Inc.', details: 'Express shipping for server components', amount: 450, date: '2024-06-14', account: 'Bank Deposit', status: 'Pending' },
  { id: 'CI-003', supplier: 'Mombasa Transporters', details: 'Bulk shipment handling - Apparel', amount: 2800, date: '2024-06-15', account: 'Business Account', status: 'Cleared' },
  { id: 'CI-004', supplier: 'DHL Express', details: 'Sample delivery from UK', amount: 120, date: '2024-06-18', account: 'M-Pesa Business', status: 'Cleared' },
];

const MONTHLY_CARRIAGE_DATA = [
  { month: 'Jan', amount: 4500 },
  { month: 'Feb', amount: 3200 },
  { month: 'Mar', amount: 5800 },
  { month: 'Apr', amount: 4100 },
  { month: 'May', amount: 6200 },
  { month: 'Jun', amount: 4570 },
];

interface CarriageInwardsPageProps {
  onBack: () => void;
}

const CarriageInwardsPage: React.FC<CarriageInwardsPageProps> = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);

  // Stats
  const totalThisMonth = 4570;
  const totalEntries = 124;
  const uniqueSuppliers = 12;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowForm(false);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              Carriage <span className="text-teal-600">Inwards</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
              Tracking transportation costs for incoming inventory
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all"
          >
            <Plus size={18} />
            <span>Add Entry</span>
          </button>
        </div>
      </header>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* KPI Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Spent This Month</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">${totalThisMonth.toLocaleString()}</h3>
              <span className="text-xs font-bold text-teal-600">+12% vs last</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-teal-600 w-3/4 rounded-full" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Entries</p>
              <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">{totalEntries}</h4>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Suppliers</p>
              <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">{uniqueSuppliers}</h4>
            </div>
          </div>

          <div className="bg-teal-600 p-6 rounded-3xl shadow-xl shadow-teal-900/20 text-white relative overflow-hidden group">
            <TrendingDown size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform duration-500" />
            <p className="text-[10px] font-black text-teal-100 uppercase tracking-widest mb-2">Efficiency Insight</p>
            <p className="text-sm font-medium leading-relaxed">
              Consolidating shipments from <span className="font-black">Global Tech Inc.</span> could reduce carriage costs by <span className="font-black">15.4%</span> based on current volume.
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Expense Trends</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
              <div className="w-2 h-2 rounded-full bg-teal-500" /> MONTHLY TOTALS
            </div>
          </div>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_CARRIAGE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#1e293b', color: '#fff' }}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]} barSize={40}>
                  {MONTHLY_CARRIAGE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#0d9488' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* List Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-slate-800/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by supplier or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-500 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 hover:bg-gray-50 transition-colors">
              <Filter size={14} /> Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Entry ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Supplier & Details</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Payment Info</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {MOCK_CARRIAGE_ENTRIES.filter(e => e.supplier.toLowerCase().includes(searchQuery.toLowerCase())).map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-gray-400">#{entry.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div>
                      <p className="text-sm font-black text-slate-800 dark:text-slate-100">{entry.supplier}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{entry.details}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs text-gray-500 font-bold">{entry.date}</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">${entry.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{entry.account}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      entry.status === 'Cleared' ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button className="p-2 text-gray-300 hover:text-slate-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Entry Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
                <Plus className="text-teal-600" size={20} /> Add Carriage Entry
              </h3>
              <button onClick={() => setShowForm(false)} className="p-2 text-gray-400 hover:text-rose-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Supplier Name</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold appearance-none cursor-pointer">
                      <option>Select Supplier...</option>
                      <option>LogiLink Logistics</option>
                      <option>Global Tech Inc.</option>
                      <option>Mombasa Transporters</option>
                      <option>DHL Express</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Date of Service</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input type="date" className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Shipment Details / Notes</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400" size={14} />
                  <textarea rows={2} placeholder="e.g. Freight for Batch #902-A..." className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Carriage Amount ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={14} />
                    <input type="number" step="0.01" placeholder="0.00" className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black text-teal-600" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Payment Account</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold appearance-none cursor-pointer">
                      <option>Main Petty Cash</option>
                      <option>Bank Deposit</option>
                      <option>M-Pesa Business</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex-[2] py-3 bg-teal-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-teal-900/10 hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save size={16} /> Save Record
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

export default CarriageInwardsPage;
