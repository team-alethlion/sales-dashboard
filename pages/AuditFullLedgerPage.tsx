
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  ChevronRight, 
  History, 
  Clock, 
  User, 
  Building, 
  ShoppingBag, 
  Truck, 
  RefreshCcw, 
  ShieldCheck, 
  MoreVertical,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Flag,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

interface LedgerEntry {
  id: string;
  timestamp: string;
  type: 'Sale' | 'Restock' | 'Transfer' | 'Adjustment' | 'Return';
  operator: string;
  change: number;
  balance: number;
  branch: string;
  reference: string;
}

const MOCK_LEDGER: LedgerEntry[] = [
  { id: 'LD-90452', timestamp: '2024-06-21 14:22', type: 'Sale', operator: 'Sarah Miller', change: -2, balance: 12, branch: 'Downtown', reference: 'SL-9021' },
  { id: 'LD-90451', timestamp: '2024-06-20 10:15', type: 'Restock', operator: 'System Auto', change: 25, balance: 14, branch: 'Downtown', reference: 'PO-8820' },
  { id: 'LD-90448', timestamp: '2024-06-19 16:40', type: 'Transfer', operator: 'Marcus Chen', change: -10, balance: -11, branch: 'Downtown', reference: 'TR-1024' },
  { id: 'LD-90440', timestamp: '2024-06-18 09:30', type: 'Adjustment', operator: 'Nicholas S.', change: -1, balance: -1, branch: 'Downtown', reference: 'AUDIT-01' },
  { id: 'LD-90435', timestamp: '2024-06-15 11:20', type: 'Return', operator: 'Elena Rodriguez', change: 1, balance: 0, branch: 'Downtown', reference: 'RT-4421' },
  { id: 'LD-90422', timestamp: '2024-06-12 15:55', type: 'Sale', operator: 'Alexander Wright', change: -4, balance: -1, branch: 'Downtown', reference: 'SL-8842' },
  { id: 'LD-90410', timestamp: '2024-06-10 13:10', type: 'Restock', operator: 'System Auto', change: 50, balance: 5, branch: 'Downtown', reference: 'PO-8815' },
];

interface AuditFullLedgerPageProps {
  productId: string | null;
  onBack: () => void;
}

const AuditFullLedgerPage: React.FC<AuditFullLedgerPageProps> = ({ productId, onBack }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Events');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const eventTypes = ['All Events', 'Sale', 'Restock', 'Transfer', 'Adjustment', 'Return'];

  const filteredLedger = useMemo(() => {
    return MOCK_LEDGER.filter(entry => {
      const matchesSearch = entry.id.toLowerCase().includes(search.toLowerCase()) || 
                            entry.reference.toLowerCase().includes(search.toLowerCase()) ||
                            entry.operator.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All Events' || entry.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExport = (format: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast(`Audit ledger compiled to ${format.toUpperCase()} and downloaded.`);
    }, 2000);
  };

  const getEntryStyles = (type: LedgerEntry['type']) => {
    switch (type) {
      case 'Restock': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30';
      case 'Sale': return 'bg-teal-50 text-teal-600 dark:bg-teal-900/30';
      case 'Transfer': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/30';
      case 'Return': return 'bg-amber-50 text-amber-600 dark:bg-amber-900/30';
      case 'Adjustment': return 'bg-rose-50 text-rose-600 dark:bg-rose-900/30';
      default: return 'bg-gray-50 text-gray-500 dark:bg-slate-800';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[150] animate-in slide-in-from-bottom-8 duration-300">
           <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
              <CheckCircle2 size={18} className="text-teal-400" />
              <span className="text-[11px] font-black uppercase tracking-widest">{toast}</span>
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
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Full Movement <span className="text-teal-600 italic">Ledger</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Audit Trail Node: {productId || 'GLOBAL'}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button 
            onClick={() => handleExport('csv')}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-3 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:border-teal-200 transition-all disabled:opacity-50"
           >
             {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FileSpreadsheet size={16} />}
             Export CSV
           </button>
           <button 
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all hover:bg-black active:scale-95 disabled:opacity-50"
           >
             {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
             Print Report
           </button>
        </div>
      </header>

      {/* Analytics Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Inflow Volume</p>
           <h3 className="text-2xl font-black text-emerald-500">+75 Units</h3>
           <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Restocks & Transfers</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Outflow Velocity</p>
           <h3 className="text-2xl font-black text-rose-500">-63 Units</h3>
           <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Sales & Adjustments</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Inventory Variance</p>
           <h3 className="text-2xl font-black text-amber-500">-0.8%</h3>
           <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Post-Audit Adjustment</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Ledger Accuracy</p>
           <h3 className="text-2xl font-black text-teal-600">99.2%</h3>
           <div className="mt-2 h-1 w-full bg-gray-50 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 w-[99%]" />
           </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gray-50/20 dark:bg-slate-800/20 relative">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Ledger ID, Operator or Reference..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium shadow-sm transition-all"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                typeFilter !== 'All Events' 
                ? 'bg-teal-50 border-teal-200 text-teal-600 dark:bg-teal-900/40 dark:border-teal-700' 
                : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-500 hover:text-teal-600'
              }`}
            >
              <Filter size={16} /> {typeFilter}
            </button>
            
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {eventTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => { setTypeFilter(type); setIsFilterOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${
                        typeFilter === type ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/40' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto min-h-[500px]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-50 dark:border-slate-800">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Entry Metadata</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Movement Logic</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Authorized Lead</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Qty Change</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Stock Result</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference Node</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {filteredLedger.length > 0 ? filteredLedger.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50/30 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="text-[11px] font-black text-teal-600 uppercase">#{entry.id}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase mt-1 flex items-center gap-1">
                       <Clock size={10} /> {entry.timestamp}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getEntryStyles(entry.type)}`}>
                       {entry.type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400"><User size={14} /></div>
                       <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{entry.operator}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <p className={`text-sm font-black ${entry.change > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                       {entry.change > 0 ? `+${entry.change}` : entry.change} Units
                    </p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="bg-gray-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-slate-700 inline-block">
                       <p className="text-sm font-black text-slate-800 dark:text-slate-100">{entry.balance} Units</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-black text-slate-700 dark:text-slate-300">REF: {entry.reference}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">{entry.branch} Node</p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                       <button onClick={() => showToast(`Opening source document: ${entry.reference}`)} className="p-2 text-gray-300 hover:text-teal-600 transition-all" title="View Source">
                          <ExternalLink size={16} />
                       </button>
                       <button onClick={() => showToast(`Entry #${entry.id} flagged for supervisor review.`)} className="p-2 text-gray-300 hover:text-rose-500 transition-all" title="Flag Review">
                          <Flag size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={7} className="px-8 py-32 text-center">
                      <History size={48} className="mx-auto text-gray-100 mb-6" />
                      <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight uppercase">No Ledger Entries Found</h4>
                      <p className="text-xs text-gray-400 mt-2 font-medium">Try clearing your search or event filters.</p>
                      <button 
                        onClick={() => { setSearch(''); setTypeFilter('All Events'); }}
                        className="mt-8 px-10 py-3 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-900/10 active:scale-95"
                      >
                        Reset Ledger View
                      </button>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Audit Info */}
        <div className="p-8 border-t border-gray-50 dark:border-slate-800 bg-gray-50/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <ShieldCheck size={20} className="text-teal-600" />
              <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-wider max-w-sm">
                Ledger synchronized across 4 branch network nodes. All entries are cryptographically signed by the authorized operator.
              </p>
           </div>
           <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-teal-600 transition-all shadow-sm flex items-center gap-2">
                <RefreshCcw size={12} /> Force Sync
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuditFullLedgerPage;
