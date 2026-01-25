
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Building, 
  Plus, 
  ChevronRight, 
  Save, 
  Download, 
  CheckCircle2, 
  Info, 
  User, 
  CreditCard,
  Briefcase,
  Terminal,
  Printer,
  X,
  PlusCircle,
  Trash2,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  price: number;
}

interface InvoiceHubPageProps {
  onBack: () => void;
}

const InvoiceHubPage: React.FC<InvoiceHubPageProps> = ({ onBack }) => {
  const [invoiceType, setInvoiceType] = useState<'tax' | 'proforma'>('tax');
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [lpoNumber, setLpoNumber] = useState('');
  const [taxPin, setTaxPin] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  // Calculations
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  }, [items]);

  const vatAmount = useMemo(() => {
    // Standard 16% VAT
    return invoiceType === 'tax' ? subtotal * 0.16 : 0;
  }, [subtotal, invoiceType]);

  const totalPayable = subtotal + vatAmount;

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
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

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleGenerate = () => {
    if (!clientName || items.length === 0) {
      triggerFeedback('Please provide a client name and at least one item.');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      triggerFeedback(`${invoiceType === 'tax' ? 'Tax Invoice' : 'Proforma'} successfully generated and archived.`);
    }, 2000);
  };

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Toast Notification */}
      {actionFeedback && (
        <div className="fixed bottom-8 right-8 z-[110] animate-in slide-in-from-right-8 fade-in duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${actionFeedback.includes('Please') ? 'bg-rose-500' : 'bg-blue-500'}`}>
              {actionFeedback.includes('Please') ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            </div>
            <p className="text-sm font-bold">{actionFeedback}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-gray-500 hover:text-teal-600 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Invoice <span className="text-blue-600">Hub</span></h1>
            <p className="text-sm text-gray-400 font-medium">Professional B2B financial documents</p>
          </div>
        </div>
        
        <div className="flex p-1 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
           <button 
            onClick={() => setInvoiceType('tax')}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${invoiceType === 'tax' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400'}`}
           >
             Tax Invoice
           </button>
           <button 
            onClick={() => setInvoiceType('proforma')}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${invoiceType === 'proforma' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400'}`}
           >
             Proforma
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {/* Section: Client & Reference */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Building size={16} className="text-blue-600" /> I. Corporate Identity
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Bill To Company *</label>
                  <input 
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Acme Corp Ltd" 
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold" 
                  />
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">LPO / Purchase Order No.</label>
                  <input 
                    type="text" 
                    value={lpoNumber}
                    onChange={(e) => setLpoNumber(e.target.value)}
                    placeholder="e.g. PO-89201" 
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold" 
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Tax PIN / VAT Registration</label>
                  <input 
                    type="text" 
                    value={taxPin}
                    onChange={(e) => setTaxPin(e.target.value)}
                    placeholder="e.g. P0512..." 
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold" 
                  />
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Client Email (For Delivery)</label>
                  <input 
                    type="email" 
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="accounts@acme.com" 
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold" 
                  />
               </div>
            </div>
          </section>

          {/* Section: Items Staging */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Terminal size={16} className="text-blue-600" /> II. Billable Deliverables
                </h3>
                <button 
                  onClick={handleAddItem}
                  className="flex items-center gap-1 text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest"
                >
                  <PlusCircle size={14} /> Add Line Item
                </button>
             </div>
             
             <div className="space-y-4">
                {items.length === 0 ? (
                  <div className="py-20 text-center bg-gray-50/50 dark:bg-slate-800/30 rounded-3xl border-2 border-dashed border-gray-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">No items staged for invoicing</p>
                    <button 
                      onClick={handleAddItem}
                      className="mt-4 px-6 py-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-colors"
                    >
                      Initialize Item Row
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-transparent hover:border-blue-200 transition-all group animate-in slide-in-from-top-2">
                        <div className="flex-1">
                          <label className="text-[9px] font-black text-gray-400 uppercase mb-1 block">Description</label>
                          <input 
                            type="text"
                            value={item.description}
                            onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                            placeholder="Product or service name..."
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border-none rounded-lg text-xs font-bold focus:ring-1 focus:ring-blue-500"
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
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border-none rounded-lg text-xs font-black text-teal-600"
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

        {/* Sidebar: Controls */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 transition-transform duration-700 group-hover:scale-110">
                 <Briefcase size={80} />
              </div>
              <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-8">Summary Preview</h4>
              
              <div className="space-y-4 relative z-10">
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-bold">Subtotal</span>
                    <span className="font-black">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-bold">VAT ({invoiceType === 'tax' ? '16%' : '0%'})</span>
                    <span className={`font-black ${invoiceType === 'tax' ? 'text-blue-400' : 'text-slate-500'}`}>
                      ${vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                 </div>
                 <div className="pt-4 border-t border-slate-800 flex justify-between items-end">
                    <div>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gross Payable</p>
                       <p className="text-3xl font-black text-blue-400 tracking-tighter">${totalPayable.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    </div>
                 </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full mt-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-900/40 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                 {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />} 
                 GENERATE {invoiceType === 'tax' ? 'INVOICE' : 'PROFORMA'}
              </button>
           </div>

           <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-[2rem] border border-blue-100 dark:border-blue-900/30 flex gap-4">
              <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[10px] font-bold text-blue-700 dark:text-blue-400 leading-relaxed uppercase tracking-wider">
                Enterprise documents automatically include your branch's banking details and professional payment terms configured in system settings.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHubPage;
