
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowLeftRight, 
  Plus, 
  Search, 
  Filter, 
  ArrowRight, 
  Building, 
  Package, 
  History, 
  MoreVertical,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  Truck,
  Percent,
  Layers,
  ChevronRight,
  TrendingUp,
  Clock,
  // Added missing Hash icon import
  Hash
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
import { branchDatabase } from '../data/branches';

// Mock data for transfer history
const MOCK_TRANSFERS = [
  { id: 'TR-1024', from: 'Downtown Branch', to: 'Airport Branch', items: 12, value: 4500, date: '2024-06-18', status: 'In Transit' },
  { id: 'TR-1023', from: 'Commercial Branch', to: 'Downtown Branch', items: 5, value: 1200, date: '2024-06-15', status: 'Completed' },
  { id: 'TR-1022', from: 'Airport Branch', to: 'Commercial Branch', items: 28, value: 8900, date: '2024-06-12', status: 'Completed' },
  { id: 'TR-1021', from: 'Downtown Branch', to: 'Commercial Branch', items: 2, value: 350, date: '2024-06-10', status: 'Cancelled' },
];

const TRANSFER_VOLUME_DATA = [
  { day: 'Mon', count: 4 },
  { day: 'Tue', count: 7 },
  { day: 'Wed', count: 5 },
  { day: 'Thu', count: 9 },
  { day: 'Fri', count: 12 },
  { day: 'Sat', count: 3 },
  { day: 'Sun', count: 2 },
];

interface Product {
  id: string;
  name: string;
  stock: number;
}

const MOCK_PRODUCTS: Product[] = [
  { id: 'P1', name: 'UltraHD Curved Monitor', stock: 45 },
  { id: 'P2', name: 'Premium Coffee Beans', stock: 120 },
  { id: 'P3', name: 'Silk Sleep Mask', stock: 85 },
  { id: 'P4', name: 'Ergonomic Office Chair', stock: 12 },
  { id: 'P5', name: 'Leather Desk Mat', stock: 30 },
];

const TransferPage: React.FC = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);

  // Wizard State
  const [sourceBranch, setSourceBranch] = useState(branchDatabase.branches[0].id);
  const [destBranch, setDestBranch] = useState(branchDatabase.branches[1].id);
  const [selectedProducts, setSelectedProducts] = useState<{product: Product, mode: 'fixed' | 'percent' | 'all', value: string}[]>([]);
  const [prodSearch, setProdSearch] = useState('');

  const addProductToTransfer = (p: Product) => {
    if (selectedProducts.find(sp => sp.product.id === p.id)) return;
    setSelectedProducts([...selectedProducts, { product: p, mode: 'fixed', value: '1' }]);
    setProdSearch('');
  };

  const removeProductFromTransfer = (id: string) => {
    setSelectedProducts(selectedProducts.filter(sp => sp.product.id !== id));
  };

  const updateProductTransfer = (id: string, updates: any) => {
    setSelectedProducts(selectedProducts.map(sp => 
      sp.product.id === id ? { ...sp, ...updates } : sp
    ));
  };

  const handleFinalizeTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowWizard(false);
      setSelectedProducts([]);
    }, 1500);
  };

  const filteredProdOptions = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(prodSearch.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
            Inventory <span className="text-teal-600">Transfers</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
            Balance stock levels across your branch network
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowWizard(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all"
          >
            <Plus size={18} />
            <span>New Transfer</span>
          </button>
        </div>
      </header>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Weekly Volume</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">42</h3>
              <span className="text-xs font-bold text-teal-600">+18% growth</span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-widest">Successful branch-to-branch movements</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm flex flex-col justify-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">In Transit</p>
              <h4 className="text-xl font-black text-amber-600">4</h4>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm flex flex-col justify-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Est. Value</p>
              <h4 className="text-xl font-black text-teal-600">$12.4k</h4>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden group">
            <TrendingUp size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform duration-500 text-teal-400" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Smart Allocation</p>
            <p className="text-sm font-medium leading-relaxed italic">
              "System recommends moving <span className="text-teal-400 font-black">20 units</span> of Apparel from Downtown to Airport to meet weekend demand."
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Transfer Frequency</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
              <div className="w-2 h-2 rounded-full bg-teal-500" /> DAILY LOGS
            </div>
          </div>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TRANSFER_VOLUME_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#1e293b', color: '#fff' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={30}>
                  {TRANSFER_VOLUME_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#0d9488' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-slate-800/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by Transfer ID or Branch..."
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
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Movement Route</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Items</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Market Value</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Log Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {MOCK_TRANSFERS.filter(t => t.id.includes(searchQuery) || t.from.includes(searchQuery) || t.to.includes(searchQuery)).map((transfer) => (
                <tr key={transfer.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-gray-400">#{transfer.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs font-black text-slate-800 dark:text-slate-100">{transfer.from}</p>
                      </div>
                      <ArrowRight size={14} className="text-teal-600" />
                      <div>
                        <p className="text-xs font-black text-slate-800 dark:text-slate-100">{transfer.to}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400">{transfer.items} SKUs</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">${transfer.value.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <p className="text-xs text-gray-400 font-bold">{transfer.date}</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      transfer.status === 'Completed' ? 'bg-teal-50 text-teal-600' : 
                      transfer.status === 'In Transit' ? 'bg-amber-50 text-amber-600' : 
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {transfer.status}
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

      {/* New Transfer Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowWizard(false)} />
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 overflow-hidden">
            
            {/* Wizard Header */}
            <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/30 dark:bg-slate-800/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-900/20">
                  <ArrowLeftRight size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Initiate Inventory Movement</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Inter-Branch Logistic Protocol</p>
                </div>
              </div>
              <button onClick={() => setShowWizard(false)} className="p-2.5 text-gray-300 hover:text-rose-500 transition-all hover:rotate-90">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleFinalizeTransfer} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              
              {/* Route Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
                <div className="md:col-span-5 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Source Origin</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600" size={16} />
                    <select 
                      value={sourceBranch}
                      onChange={(e) => setSourceBranch(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none"
                    >
                      {branchDatabase.branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="md:col-span-1 flex justify-center pt-6">
                  <div className="w-10 h-10 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-full flex items-center justify-center text-teal-600 shadow-sm">
                    <ChevronRight size={20} />
                  </div>
                </div>

                <div className="md:col-span-5 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Destination Target</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500" size={16} />
                    <select 
                      value={destBranch}
                      onChange={(e) => setDestBranch(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-rose-500/50 text-sm font-black appearance-none"
                    >
                      {branchDatabase.branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Search & Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Search & Add Items</label>
                  <span className="text-[10px] font-bold text-teal-600 uppercase tracking-tighter bg-teal-50 px-2 py-0.5 rounded-md">Live Origin Stock Check</span>
                </div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text"
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                    placeholder="Type product name, SKU or category..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium"
                  />
                  {prodSearch && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-2xl z-[110] overflow-hidden max-h-60 overflow-y-auto">
                      {filteredProdOptions.map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => addProductToTransfer(p)}
                          className="w-full text-left px-6 py-4 hover:bg-teal-50 dark:hover:bg-slate-800 border-b border-gray-50 dark:border-slate-800 last:border-none transition-colors group flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-black text-slate-800 dark:text-slate-100">{p.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold">Current Stock: {p.stock} units</p>
                          </div>
                          <Plus size={16} className="text-gray-300 group-hover:text-teal-600 transition-colors" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Transfer List */}
              <div className="space-y-4">
                {selectedProducts.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center opacity-30 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-[2rem]">
                    <Layers size={48} className="text-gray-400 mb-4" />
                    <p className="text-sm font-black uppercase tracking-widest text-slate-500">No items staged for transfer</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedProducts.map((item) => (
                      <div key={item.product.id} className="p-5 bg-gray-50 dark:bg-slate-800/40 rounded-2xl border border-gray-100 dark:border-slate-800/50 flex flex-col md:flex-row md:items-center gap-6 group hover:border-teal-200 transition-all">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-slate-800 dark:text-slate-100 truncate">{item.product.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-gray-100 dark:border-slate-700">Stock: {item.product.stock}</span>
                            <span className="text-[10px] font-black text-teal-600 uppercase tracking-tighter">SKU: {item.product.id}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex p-1 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800">
                            {[
                              { id: 'fixed', label: 'Fixed', icon: <Hash size={12} /> },
                              { id: 'percent', label: '%', icon: <Percent size={12} /> },
                              { id: 'all', label: 'All', icon: <Layers size={12} /> }
                            ].map(m => (
                              <button
                                key={m.id}
                                type="button"
                                onClick={() => updateProductTransfer(item.product.id, { mode: m.id })}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                  item.mode === m.id ? 'bg-teal-600 text-white shadow-md' : 'text-gray-400 hover:text-teal-600'
                                }`}
                              >
                                {m.icon}
                                {m.label}
                              </button>
                            ))}
                          </div>

                          <div className="w-24">
                            {item.mode !== 'all' && (
                              <input 
                                type="number"
                                value={item.value}
                                onChange={(e) => updateProductTransfer(item.product.id, { value: e.target.value })}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 text-center font-black text-sm text-teal-600 focus:ring-2 focus:ring-teal-500/50"
                                placeholder={item.mode === 'percent' ? '0%' : '0'}
                                max={item.mode === 'fixed' ? item.product.stock : 100}
                              />
                            )}
                          </div>

                          <button 
                            type="button"
                            onClick={() => removeProductFromTransfer(item.product.id)}
                            className="p-2.5 text-gray-300 hover:text-rose-500 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary Stats */}
              {selectedProducts.length > 0 && (
                <div className="p-6 bg-teal-50 dark:bg-teal-900/10 rounded-3xl border border-teal-100 dark:border-teal-900/20 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center md:text-left">
                      <p className="text-[10px] font-black text-teal-600/60 uppercase tracking-widest mb-1">Total Items</p>
                      <p className="text-xl font-black text-teal-700 dark:text-teal-400">{selectedProducts.length} SKUs</p>
                    </div>
                    <div className="w-px h-10 bg-teal-200 dark:bg-teal-900/40 hidden md:block" />
                    <div className="text-center md:text-left">
                      <p className="text-[10px] font-black text-teal-600/60 uppercase tracking-widest mb-1">Impact Analysis</p>
                      <p className="text-xl font-black text-teal-700 dark:text-teal-400">Low Risk</p>
                    </div>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    <button 
                      type="button"
                      onClick={() => setSelectedProducts([])}
                      className="flex-1 md:flex-none px-6 py-3 text-[10px] font-black text-teal-600 uppercase tracking-widest hover:text-rose-500 transition-colors"
                    >
                      Clear All
                    </button>
                    <button 
                      type="submit"
                      disabled={saving}
                      className="flex-1 md:flex-none px-10 py-3 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-teal-900/20 hover:bg-teal-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                      {saving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Finalize Movement <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferPage;
