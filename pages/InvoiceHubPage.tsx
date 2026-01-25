
import React, { useState } from 'react';
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
  PlusCircle
} from 'lucide-react';

interface InvoiceHubPageProps {
  onBack: () => void;
}

const InvoiceHubPage: React.FC<InvoiceHubPageProps> = ({ onBack }) => {
  const [invoiceType, setInvoiceType] = useState<'tax' | 'proforma'>('tax');
  const [saving, setSaving] = useState(false);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
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
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Bill To Company *</label>
                  <input type="text" placeholder="e.g. Acme Corp Ltd" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold" />
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">LPO / Purchase Order No.</label>
                  <input type="text" placeholder="e.g. PO-89201" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Tax PIN / VAT Registration</label>
                  <input type="text" placeholder="e.g. P0512..." className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold" />
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Client Email (For Delivery)</label>
                  <input type="email" placeholder="accounts@acme.com" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold" />
               </div>
            </div>
          </section>

          {/* Section: Items Staging */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Terminal size={16} className="text-blue-600" /> II. Billable Deliverables
                </h3>
                <button className="flex items-center gap-1 text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">
                  <PlusCircle size={14} /> Add Line Item
                </button>
             </div>
             
             <div className="space-y-4">
                <div className="py-20 text-center bg-gray-50/50 dark:bg-slate-800/30 rounded-3xl border-2 border-dashed border-gray-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">No items staged for invoicing</p>
                </div>
             </div>
          </section>
        </div>

        {/* Sidebar: Controls */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                 <Briefcase size={80} />
              </div>
              <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-8">Summary Preview</h4>
              
              <div className="space-y-4 relative z-10">
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-bold">Subtotal</span>
                    <span className="font-black">$0.00</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-bold">VAT (16%)</span>
                    <span className="font-black">$0.00</span>
                 </div>
                 <div className="pt-4 border-t border-slate-800 flex justify-between items-end">
                    <div>
                       <p className="text-[10px] font-black text-slate-500 uppercase">Gross Payable</p>
                       <p className="text-3xl font-black text-blue-400">$0.00</p>
                    </div>
                 </div>
              </div>

              <button className="w-full mt-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-900/40 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                 <Download size={18} /> GENERATE DOCUMENT
              </button>
           </div>

           <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-[2rem] border border-blue-100 dark:border-blue-900/30 flex gap-4">
              <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[10px] font-bold text-blue-700 dark:text-blue-400 leading-relaxed uppercase tracking-wider">
                Enterprise invoices automatically include your branch's banking details and payment terms configured in settings.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHubPage;
