
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Quote, 
  Calendar, 
  User, 
  Plus, 
  ChevronRight, 
  Download, 
  Save, 
  Clock, 
  Info,
  X,
  PlusCircle,
  ShieldCheck,
  Send,
  FileText,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface QuoteItem {
  id: string;
  description: string;
  qty: number;
  price: number;
}

interface FormalQuotePageProps {
  onBack: () => void;
}

const FormalQuotePage: React.FC<FormalQuotePageProps> = ({ onBack }) => {
  // --- STATE ---
  const [validity, setValidity] = useState('7'); // days
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // --- CALCULATIONS ---
  const totalValue = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  }, [items]);

  const validityDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(validity));
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }, [validity]);

  // --- HANDLERS ---
  const handleAddItem = () => {
    const newItem: QuoteItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      qty: 1,
      price: 0
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof QuoteItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleDownload = () => {
    if (items.length === 0) {
      triggerFeedback('Please add at least one item to the quote.');
      return;
    }
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      triggerFeedback('Quotation PDF generated and downloaded successfully.');
    }, 1800);
  };

  const handleDispatch = () => {
    if (!customerName || items.length === 0) {
      triggerFeedback('Customer name and items are required for dispatch.');
      return;
    }
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      triggerFeedback(`Quotation successfully dispatched to ${customerName}.`);
    }, 2200);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Toast Notification */}
      {actionFeedback && (
        <div className="fixed bottom-8 right-8 z-[110] animate-in slide-in-from-right-8 fade-in duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${actionFeedback.includes('required') || actionFeedback.includes('Please') ? 'bg-rose-500' : 'bg-rose-500'}`}>
              {actionFeedback.includes('required') || actionFeedback.includes('Please') ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
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
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Formal <span className="text-rose-600">Quotation</span></h1>
          <p className="text-sm text-gray-400 font-medium">Non-binding price guarantee documents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {/* Section: Context */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Calendar size={16} className="text-rose-600" /> I. Document Parameters
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Validity Period (Days)</label>
                  <select 
                    value={validity}
                    onChange={(e) => setValidity(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none text-sm font-black appearance-none cursor-pointer"
                  >
                    <option value="3">3 Days</option>
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                    <option value="30">1 Month</option>
                  </select>
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Target Prospect / Client *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Customer name or company..." 
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-rose-500/50 text-sm font-bold" 
                    />
                  </div>
               </div>
            </div>
          </section>

          {/* Section: Items Selection */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <FileText size={16} className="text-rose-600" /> II. Estimated Items
                </h3>
                <button 
                  onClick={handleAddItem}
                  className="flex items-center gap-1 text-[10px] font-black text-rose-600 hover:underline uppercase tracking-widest"
                >
                  <PlusCircle size={14} /> Add Quote Item
                </button>
             </div>
             
             <div className="space-y-4">
                {items.length === 0 ? (
                  <div className="py-20 text-center bg-gray-50/50 dark:bg-slate-800/30 rounded-3xl border-2 border-dashed border-gray-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Your quote is currently empty</p>
                    <button 
                      onClick={handleAddItem}
                      className="mt-4 px-6 py-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl text-[10px] font-black text-rose-600 uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-colors"
                    >
                      Add First Item
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-transparent hover:border-rose-200 transition-all group animate-in slide-in-from-top-2">
                        <div className="flex-1">
                          <label className="text-[9px] font-black text-gray-400 uppercase mb-1 block">Description</label>
                          <input 
                            type="text"
                            value={item.description}
                            onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                            placeholder="Product or service name..."
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border-none rounded-lg text-xs font-bold focus:ring-1 focus:ring-rose-500"
                          />
                        </div>
                        <div className="w-24">
                          <label className="text-[9px] font-black text-gray-400 uppercase mb-1 block">Qty</label>
                          <input 
                            type="number"
                            value={item.qty}
                            onChange={(e) => handleUpdateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border-none rounded-lg text-xs font-bold text-center"
                          />
                        </div>
                        <div className="w-32">
                          <label className="text-[9px] font-black text-gray-400 uppercase mb-1 block">Unit Price ($)</label>
                          <input 
                            type="number"
                            value={item.price}
                            onChange={(e) => handleUpdateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border-none rounded-lg text-xs font-black text-rose-600"
                          />
                        </div>
                        <div className="flex items-end pb-1">
                           <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
                           >
                             <Trash2 size={16} />
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
             </div>
          </section>
        </div>

        {/* Sidebar: Export */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-rose-600 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
              <Quote size={120} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-500" />
              <h4 className="text-[10px] font-black text-rose-100 uppercase tracking-[0.4em] mb-8">Document Preview</h4>
              
              <div className="space-y-4 relative z-10">
                 <div>
                    <p className="text-[10px] font-black text-rose-100/60 uppercase tracking-widest mb-1">Total Quote Value</p>
                    <p className="text-4xl font-black tracking-tighter">
                      ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-rose-100">
                    <Clock size={12} /> Valid until: {validityDate}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-10">
                 <button 
                  onClick={handleDownload}
                  disabled={isDownloading || isDispatching}
                  className="py-4 bg-white text-rose-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-rose-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                 >
                    {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} 
                    DOWNLOAD
                 </button>
                 <button 
                  onClick={handleDispatch}
                  disabled={isDownloading || isDispatching}
                  className="py-4 bg-rose-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                 >
                    {isDispatching ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} 
                    DISPATCH
                 </button>
              </div>
           </div>

           <div className="p-6 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-[2rem] flex gap-4">
              <ShieldCheck size={20} className="text-rose-600 shrink-0 mt-0.5" />
              <p className="text-[10px] font-bold text-rose-700 dark:text-rose-400 leading-relaxed uppercase tracking-wider">
                System Logic: Quotations do NOT reserve or deduct stock from inventory. They are purely for client price verification and follow regional tax rules.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FormalQuotePage;
