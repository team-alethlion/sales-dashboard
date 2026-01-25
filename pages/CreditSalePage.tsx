
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  HandCoins, 
  User, 
  Calendar, 
  Percent, 
  DollarSign, 
  Plus, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Clock,
  ShieldCheck,
  Smartphone,
  Save,
  Trash2
} from 'lucide-react';

interface CreditSalePageProps {
  onBack: () => void;
}

const CreditSalePage: React.FC<CreditSalePageProps> = ({ onBack }) => {
  const [downpayment, setDownpayment] = useState('');
  const [interest, setInterest] = useState('0');
  const [period, setPeriod] = useState('3'); // months
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
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Credit <span className="text-amber-600">Terminal</span></h1>
          <p className="text-sm text-gray-400 font-medium">Installment sales and debt management protocol</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {/* Section: Debtor Info */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <User size={16} className="text-amber-600" /> I. Obligator Profile
            </h3>
            
            <div className="space-y-6">
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Registered Customer Name *</label>
                  <div className="relative">
                     <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                     <input type="text" placeholder="Search customer database..." className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-amber-500/50 text-sm font-bold" />
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Guarantor Name (Optional)</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Guarantor Contact</label>
                    <input type="tel" placeholder="+254..." className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-bold" />
                  </div>
               </div>
            </div>
          </section>

          {/* Section: Terms Configuration */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <Calendar size={16} className="text-amber-600" /> II. Repayment Terms
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Downpayment ($)</label>
                  <div className="relative">
                     <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={14} />
                     <input 
                      type="number" 
                      value={downpayment}
                      onChange={(e) => setDownpayment(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-black text-teal-600" 
                    />
                  </div>
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Interest Rate (%)</label>
                  <div className="relative">
                     <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                     <input 
                      type="number" 
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-black text-amber-600" 
                    />
                  </div>
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Period (Months)</label>
                  <select 
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-black appearance-none cursor-pointer"
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">1 Year</option>
                  </select>
               </div>
            </div>
          </section>
        </div>

        {/* Sidebar: Financial Impact */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-amber-600 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
              <HandCoins size={120} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-500" />
              <h4 className="text-[10px] font-black text-amber-100 uppercase tracking-[0.4em] mb-8">Installment Calculation</h4>
              
              <div className="space-y-6 relative z-10">
                 <div>
                    <p className="text-[10px] font-black text-amber-100/60 uppercase tracking-widest mb-1">Monthly Principal</p>
                    <p className="text-3xl font-black">$0.00</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-amber-100/60 uppercase tracking-widest mb-1">Final Total Payable</p>
                    <p className="text-xl font-black">$0.00</p>
                 </div>
              </div>

              <button className="w-full mt-10 py-4 bg-white text-amber-600 rounded-2xl font-black text-sm shadow-xl hover:bg-amber-50 transition-all flex items-center justify-center gap-3">
                 <CheckCircle2 size={18} /> COMMIT CREDIT SALE
              </button>
           </div>

           <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-[2rem] flex gap-4">
              <ShieldCheck size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 leading-relaxed uppercase tracking-wider">
                Note: Inventory is deducted immediately upon commitment. Ensure you have the physical signed credit agreement before processing.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CreditSalePage;
