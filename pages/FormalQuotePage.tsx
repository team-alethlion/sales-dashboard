
import React, { useState } from 'react';
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
  FileText
} from 'lucide-react';

interface FormalQuotePageProps {
  onBack: () => void;
}

const FormalQuotePage: React.FC<FormalQuotePageProps> = ({ onBack }) => {
  const [validity, setValidity] = useState('7'); // days
  const [saving, setSaving] = useState(false);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
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
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Validity Period (Days)</label>
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
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Target Prospect / Client *</label>
                  <input type="text" placeholder="Customer name or company..." className="w-full px-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-rose-500/50 text-sm font-bold" />
               </div>
            </div>
          </section>

          {/* Section: Items Selection */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <FileText size={16} className="text-rose-600" /> II. Estimated Items
                </h3>
                <button className="flex items-center gap-1 text-[10px] font-black text-rose-600 hover:underline uppercase tracking-widest">
                  <PlusCircle size={14} /> Add Quote Item
                </button>
             </div>
             
             <div className="space-y-4">
                <div className="py-20 text-center bg-gray-50/50 dark:bg-slate-800/30 rounded-3xl border-2 border-dashed border-gray-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Your quote is currently empty</p>
                </div>
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
                    <p className="text-3xl font-black">$0.00</p>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-rose-100">
                    <Clock size={12} /> Valid until: June 28, 2024
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-10">
                 <button className="py-4 bg-white text-rose-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-rose-50 transition-all flex items-center justify-center gap-2">
                    <Download size={14} /> DOWNLOAD
                 </button>
                 <button className="py-4 bg-rose-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-800 transition-all flex items-center justify-center gap-2">
                    <Send size={14} /> DISPATCH
                 </button>
              </div>
           </div>

           <div className="p-6 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-[2rem] flex gap-4">
              <ShieldCheck size={20} className="text-rose-600 shrink-0 mt-0.5" />
              <p className="text-[10px] font-bold text-rose-700 dark:text-rose-400 leading-relaxed uppercase tracking-wider">
                System Logic: Quotations do NOT reserve or deduct stock from inventory. They are purely for client price verification.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FormalQuotePage;
