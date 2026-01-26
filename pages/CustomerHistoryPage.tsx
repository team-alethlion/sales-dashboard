
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  History, 
  Download, 
  ChevronRight, 
  MoreVertical, 
  ShoppingBag,
  CreditCard,
  Banknote,
  ReceiptText,
  Smartphone,
  ExternalLink,
  CheckCircle2,
  X,
  Loader2,
  AlertCircle,
  Printer,
  RotateCcw,
  RefreshCw
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  items: string;
  total: number;
  method: 'M-Pesa' | 'Card' | 'Bank' | 'Cash';
  status: 'Completed' | 'Refunded' | 'Pending';
  branch: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'SL-9021', date: '2024-06-20', items: 'Monitor, Beans, Silk Mask', total: 450.00, method: 'M-Pesa', status: 'Completed', branch: 'Downtown' },
  { id: 'SL-8842', date: '2024-06-12', items: 'Green Tea, Laptop Stand', total: 124.50, method: 'Card', status: 'Completed', branch: 'Airport' },
  { id: 'SL-8710', date: '2024-06-05', items: 'Bulk Coffee (3kg)', total: 890.00, method: 'Bank', status: 'Refunded', branch: 'Downtown' },
  { id: 'SL-8622', date: '2024-05-28', items: 'Gaming Chair Elite', total: 320.00, method: 'Cash', status: 'Completed', branch: 'Commercial' },
  { id: 'SL-8501', date: '2024-05-20', items: 'Misc Electronics', total: 28.50, method: 'M-Pesa', status: 'Completed', branch: 'Downtown' },
  { id: 'SL-8499', date: '2024-05-18', items: 'Stationery Set', total: 15.00, method: 'M-Pesa', status: 'Completed', branch: 'Airport' },
  { id: 'SL-8450', date: '2024-05-10', items: 'USB-C Hub, Cable', total: 45.00, method: 'Card', status: 'Completed', branch: 'Commercial' },
  { id: 'SL-8300', date: '2024-04-25', items: 'Office Lamps x4', total: 120.00, method: 'Bank', status: 'Completed', branch: 'Downtown' },
  { id: 'SL-8210', date: '2024-04-12', items: 'Wireless Mouse', total: 25.00, method: 'Cash', status: 'Pending', branch: 'Airport' },
];

interface CustomerHistoryPageProps {
  customerId: string | null;
  onBack: () => void;
}

const CustomerHistoryPage: React.FC<CustomerHistoryPageProps> = ({ customerId, onBack }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'alert' } | null>(null);

  const itemsPerPage = 5;

  // Mocking customer basic info for context
  const customer = {
    id: customerId || '1',
    name: 'Alexander Wright',
    email: 'alex.w@example.com'
  };

  // Logic
  const filteredData = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = 
        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tx.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.branch.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All Statuses' || tx.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const showToast = (msg: string, type: 'success' | 'alert' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast(`Export complete: ${filteredData.length} records parsed to CSV.`);
    }, 1500);
  };

  const handlePdf = () => {
    setIsPdfLoading(true);
    setTimeout(() => {
      setIsPdfLoading(false);
      showToast(`Statement PDF generated for audit period.`);
    }, 1800);
  };

  const handleRefund = (id: string) => {
    setTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, status: 'Refunded' } : tx));
    setActiveMenuId(null);
    showToast(`Refund processed for order ${id}. Stock levels updated.`, 'alert');
  };

  const handlePrint = (id: string) => {
    setActiveMenuId(null);
    showToast(`Re-print job for ${id} sent to local terminal.`);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20 relative">
      {/* Local Feedback Toast */}
      {toast && (
        <div className="fixed bottom-24 lg:bottom-8 right-8 z-[150] animate-in slide-in-from-right-8 duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
            {toast.type === 'success' ? (
              <CheckCircle2 size={18} className="text-teal-400" />
            ) : (
              <AlertCircle size={18} className="text-amber-400" />
            )}
            <span className="text-[11px] font-black tracking-tight uppercase">{toast.msg}</span>
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
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Transaction <span className="text-teal-600 italic">Ledger</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Audit Trail for {customer.name}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button 
            onClick={handleExport}
            disabled={isExporting || isPdfLoading}
            className="flex items-center gap-2 px-5 py-3 text-gray-500 dark:text-slate-300 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:bg-gray-50 transition-all font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
           >
             {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
             Export CSV
           </button>
           <button 
            onClick={handlePdf}
            disabled={isExporting || isPdfLoading}
            className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all hover:bg-black active:scale-95 disabled:opacity-50"
           >
             {isPdfLoading ? <Loader2 size={16} className="animate-spin" /> : <ReceiptText size={16} />}
             Statement PDF
           </button>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gray-50/20 dark:bg-slate-800/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID or Items..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium shadow-sm transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all border ${
                  statusFilter !== 'All Statuses' 
                  ? 'bg-teal-50 border-teal-200 text-teal-600 dark:bg-teal-900/30 dark:border-teal-700' 
                  : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-500 hover:text-teal-600'
                }`}
              >
                <Filter size={16} /> {statusFilter}
              </button>
              
              {isFilterOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {['All Statuses', 'Completed', 'Refunded', 'Pending'].map(status => (
                      <button
                        key={status}
                        onClick={() => { setStatusFilter(status); setIsFilterOpen(false); setCurrentPage(1); }}
                        className={`w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
                          statusFilter === status ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/40' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <button 
              onClick={() => { setSearchQuery(''); setStatusFilter('All Statuses'); setCurrentPage(1); }}
              className="p-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl text-gray-400 hover:text-teal-600 transition-all shadow-sm"
              title="Reset View"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[500px]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Purchased Line Items</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Settled Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Payment Method</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {currentItems.length > 0 ? (
                currentItems.map(tx => (
                  <tr key={tx.id} className="hover:bg-gray-50/30 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-[11px] font-black text-teal-600 uppercase">#{tx.id}</span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{tx.branch} Node</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs text-gray-500 font-medium truncate max-w-[220px]">{tx.items}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <p className="text-sm font-black text-slate-800 dark:text-slate-100">${tx.total.toFixed(2)}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col items-center gap-1">
                        {tx.method === 'M-Pesa' ? <Smartphone size={14} className="text-teal-600" /> : 
                          tx.method === 'Card' ? <CreditCard size={14} className="text-blue-500" /> :
                          tx.method === 'Bank' ? <ExternalLink size={14} className="text-indigo-500" /> :
                          <Banknote size={14} className="text-slate-400" />}
                        <span className="text-[9px] font-black text-gray-400 uppercase">{tx.method}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 
                        tx.status === 'Refunded' ? 'bg-rose-50 text-rose-500 dark:bg-rose-900/20' : 
                        'bg-amber-50 text-amber-600 dark:bg-amber-900/20'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center relative">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === tx.id ? null : tx.id)}
                        className={`p-2 transition-colors rounded-lg ${activeMenuId === tx.id ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-teal-600'}`}
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeMenuId === tx.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setActiveMenuId(null)} />
                          <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-48 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-right-2 duration-200">
                             <div className="p-1">
                                <button onClick={() => { setActiveMenuId(null); showToast(`Viewing full details for ${tx.id}`); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                  <ExternalLink size={14} className="text-teal-600" /> View Details
                                </button>
                                <button onClick={() => handlePrint(tx.id)} className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                  <Printer size={14} className="text-blue-500" /> Re-print Receipt
                                </button>
                                <div className="h-px bg-gray-50 dark:bg-slate-700 my-1" />
                                <button 
                                  onClick={() => handleRefund(tx.id)}
                                  disabled={tx.status === 'Refunded'}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-colors disabled:opacity-30 disabled:grayscale"
                                >
                                  <RotateCcw size={14} /> Issue Refund
                                </button>
                             </div>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-8 py-32 text-center">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-gray-200 dark:text-slate-700 mx-auto mb-6">
                      <ShoppingBag size={48} />
                    </div>
                    <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight uppercase">No records matching filters</h4>
                    <p className="text-xs text-gray-400 mt-2 font-medium">Try broadening your search criteria or clearing all filters.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setStatusFilter('All Statuses'); }}
                      className="mt-8 px-8 py-3 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-900/10 hover:bg-teal-700 transition-all"
                    >
                      Clear All Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 bg-gray-50/30 dark:bg-slate-800/30 border-t border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
             {filteredData.length > 0 ? (
               <>Showing Page {currentPage} of {totalPages || 1} <span className="mx-2 opacity-30">|</span> {filteredData.length} Total Matches</>
             ) : (
               "End of Record Ledger"
             )}
           </p>
           <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || filteredData.length === 0}
                className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-teal-600 transition-all disabled:opacity-30 shadow-sm"
              >
                Prev Page
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || filteredData.length === 0}
                className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-teal-600 transition-all disabled:opacity-30 shadow-sm"
              >
                Next Page
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHistoryPage;
