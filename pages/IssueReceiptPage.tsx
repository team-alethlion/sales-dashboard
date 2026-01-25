
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  ReceiptText, 
  Printer, 
  Send, 
  History, 
  User, 
  Calendar, 
  DollarSign, 
  MoreVertical,
  ChevronRight,
  Filter,
  CheckCircle2,
  X,
  Loader2,
  RefreshCw,
  Share2
} from 'lucide-react';

// Helper to generate dynamic dates for testing filters
const getDateOffset = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

const MOCK_SALES = [
  { id: 'SL-9021', customer: 'Alexander Wright', date: getDateOffset(0), items: 3, total: 450.00, status: 'Paid', method: 'M-Pesa', branch: 'Downtown' },
  { id: 'SL-9020', customer: 'Sarah Miller', date: getDateOffset(1), items: 1, total: 124.50, status: 'Paid', method: 'Cash', branch: 'Airport' },
  { id: 'SL-9019', customer: 'Walk-in Customer', date: getDateOffset(3), items: 5, total: 890.00, status: 'Paid', method: 'Card', branch: 'Commercial' },
  { id: 'SL-9018', customer: 'Marcus Chen', date: getDateOffset(8), items: 2, total: 240.00, status: 'Paid', method: 'M-Pesa', branch: 'Downtown' },
  { id: 'SL-9017', customer: 'Elena Rodriguez', date: getDateOffset(0), items: 4, total: 1200.00, status: 'Paid', method: 'Bank', branch: 'Airport' },
];

interface IssueReceiptPageProps {
  onBack: () => void;
}

const IssueReceiptPage: React.FC<IssueReceiptPageProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Branches');
  const [selectedSale, setSelectedSale] = useState<any>(null);
  
  // Action states
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isReissuing, setIsReissuing] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const filters = ['All Branches', 'Today', 'Last 7 Days', 'M-Pesa Only'];

  const filteredSales = useMemo(() => {
    return MOCK_SALES.filter(sale => {
      // Search matching
      const matchesSearch = 
        sale.id.toLowerCase().includes(search.toLowerCase()) || 
        sale.customer.toLowerCase().includes(search.toLowerCase());
      
      if (!matchesSearch) return false;

      // Filter matching
      const saleDate = new Date(sale.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      switch (activeFilter) {
        case 'Today':
          return saleDate >= today;
        case 'Last 7 Days':
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return saleDate >= sevenDaysAgo;
        case 'M-Pesa Only':
          return sale.method === 'M-Pesa';
        default:
          return true;
      }
    });
  }, [search, activeFilter]);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      triggerFeedback('Receipt sent to Thermal Printer queue');
    }, 1500);
  };

  const handleShare = () => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      triggerFeedback('Digital receipt link generated and sent to WhatsApp');
    }, 1200);
  };

  const handleReissue = () => {
    setIsReissuing(true);
    setTimeout(() => {
      setIsReissuing(false);
      triggerFeedback(`Sale ${selectedSale.id} re-initialized in registry`);
    }, 1000);
  };

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Toast Notification */}
      {actionFeedback && (
        <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-right-8 fade-in duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
            <p className="text-sm font-bold">{actionFeedback}</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-gray-500 hover:text-teal-600 transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Receipt <span className="text-teal-600">Registry</span></h1>
          <p className="text-sm text-gray-400 font-medium">Re-issue, print, or share digital purchase proofs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Search & History */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm">
             <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by ID or customer name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium"
                />
             </div>
             
             <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
                {filters.map(f => (
                  <button 
                    key={f} 
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeFilter === f 
                      ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20' 
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-teal-600'
                    }`}
                  >
                    {f}
                  </button>
                ))}
             </div>

             <div className="space-y-3">
                {filteredSales.length > 0 ? filteredSales.map(sale => (
                  <div 
                    key={sale.id}
                    onClick={() => setSelectedSale(sale)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      selectedSale?.id === sale.id ? 'bg-teal-50 border-teal-200 dark:bg-teal-900/20 dark:border-teal-800' : 'bg-white dark:bg-slate-900 border-gray-50 dark:border-slate-800 hover:border-teal-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors ${
                        selectedSale?.id === sale.id ? 'bg-teal-600 text-white' : 'bg-gray-50 dark:bg-slate-800 text-gray-400 group-hover:text-teal-600'
                      }`}>
                        <ReceiptText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-100">{sale.id} • {sale.customer}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{formatDate(sale.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-teal-600">${sale.total.toFixed(2)}</p>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">{sale.method}</span>
                    </div>
                  </div>
                )) : (
                  <div className="py-12 text-center opacity-30">
                    <ReceiptText size={48} className="mx-auto mb-4" />
                    <p className="text-sm font-black uppercase tracking-widest">No matching records found</p>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Right: Preview & Actions */}
        <div className="lg:col-span-5">
          {selectedSale ? (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
               <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-gray-50 dark:border-slate-800 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-teal-600" />
                  
                  {/* Receipt Aesthetic */}
                  <div className="text-center space-y-2 mb-8">
                     <h3 className="text-2xl font-black italic tracking-tighter">Code8 <span className="text-teal-600">Global</span></h3>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Transaction Record</p>
                     <p className="text-[9px] font-medium text-gray-400 uppercase tracking-widest">{selectedSale.branch} Branch</p>
                  </div>
                  
                  <div className="space-y-4 border-t border-dashed border-gray-100 dark:border-slate-800 pt-6">
                     <div className="flex justify-between text-xs">
                        <span className="font-bold text-gray-400 uppercase">Receipt No</span>
                        <span className="font-black text-slate-800 dark:text-slate-100">{selectedSale.id}</span>
                     </div>
                     <div className="flex justify-between text-xs">
                        <span className="font-bold text-gray-400 uppercase">Customer</span>
                        <span className="font-black text-slate-800 dark:text-slate-100">{selectedSale.customer}</span>
                     </div>
                     <div className="flex justify-between text-xs">
                        <span className="font-bold text-gray-400 uppercase">Date</span>
                        <span className="font-black text-slate-800 dark:text-slate-100">{formatDate(selectedSale.date)}</span>
                     </div>
                  </div>

                  <div className="my-8 py-4 border-y border-dashed border-gray-100 dark:border-slate-800">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Line Items</p>
                     <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold">
                           <span>General Product x{selectedSale.items}</span>
                           <span>${selectedSale.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                           <span>Service Fee</span>
                           <span>$0.00</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-between items-end mb-4">
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</p>
                        <h4 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tighter">${selectedSale.total.toFixed(2)}</h4>
                     </div>
                     <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                       {selectedSale.status}
                     </div>
                  </div>

                  <div className="text-center pt-8 opacity-20">
                     <div className="h-10 w-full bg-slate-900 rounded-md" />
                     <p className="text-[8px] font-bold mt-2 uppercase tracking-[0.5em]">Digital Signature Verified</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={handlePrint}
                    disabled={isPrinting || isSharing || isReissuing}
                    className="flex items-center justify-center gap-3 py-4 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-teal-900/20 hover:bg-teal-700 transition-all disabled:opacity-50"
                  >
                    {isPrinting ? <Loader2 size={18} className="animate-spin" /> : <Printer size={18} />} 
                    Print Thermal
                  </button>
                  <button 
                    onClick={handleShare}
                    disabled={isPrinting || isSharing || isReissuing}
                    className="flex items-center justify-center gap-3 py-4 bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all disabled:opacity-50"
                  >
                    {isSharing ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />} 
                    Share WhatsApp
                  </button>
               </div>
               
               <button 
                onClick={handleReissue}
                disabled={isPrinting || isSharing || isReissuing}
                className="w-full flex items-center justify-center gap-3 py-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-500 hover:text-teal-600 hover:border-teal-200 transition-all disabled:opacity-50"
               >
                 {isReissuing ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />} 
                 Re-issue to Terminal
               </button>
            </div>
          ) : (
            <div className="h-[400px] bg-gray-50/50 dark:bg-slate-900/50 rounded-[3rem] border-4 border-dashed border-gray-100 dark:border-slate-800 flex flex-col items-center justify-center text-center p-8">
               <ReceiptText size={64} className="text-gray-200 mb-6" />
               <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">Select a transaction to preview</h4>
               <p className="text-xs text-gray-400 mt-2 max-w-[200px] mx-auto font-medium leading-relaxed">Search through the registry on the left to begin processing a re-print or digital share.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueReceiptPage;
