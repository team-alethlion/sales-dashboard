
import React, { useState, useMemo } from 'react';
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
  Trash2,
  Loader2,
  AlertCircle,
  Search
} from 'lucide-react';

interface CreditSalePageProps {
  onBack: () => void;
}

const CreditSalePage: React.FC<CreditSalePageProps> = ({ onBack }) => {
  // --- STATE ---
  const [customerName, setCustomerName] = useState('');
  const [totalAmount, setTotalAmount] = useState<string>('0');
  const [downpayment, setDownpayment] = useState<string>('0');
  const [interest, setInterest] = useState<string>('0');
  const [period, setPeriod] = useState<string>('3'); // months
  
  const [isSaving, setIsSaving] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  // --- CALCULATIONS ---
  const financials = useMemo(() => {
    const total = parseFloat(totalAmount) || 0;
    const down = parseFloat(downpayment) || 0;
    const intrRate = parseFloat(interest) || 0;
    const months = parseInt(period) || 1;

    const principalToFinance = Math.max(0, total - down);
    const interestCharge = principalToFinance * (intrRate / 100);
    const totalPayable = total + interestCharge;
    const monthlyInstallment = (principalToFinance + interestCharge) / months;

    return {
      total,
      down,
      principalToFinance,
      interestCharge,
      totalPayable,
      monthlyInstallment
    };
  }, [totalAmount, downpayment, interest, period]);

  // --- HANDLERS ---
  const handleCommitSale = () => {
    if (!customerName) {
      triggerFeedback('Please select or enter an obligator (customer) name.', 'error');
      return;
    }
    if (financials.total <= 0) {
      triggerFeedback('Total sale amount must be greater than zero.', 'error');
      return;
    }
    if (financials.down >= financials.total && financials.total > 0) {
      triggerFeedback('Downpayment covers full amount. Use Direct Checkout instead.', 'error');
      return;
    }

    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      triggerFeedback(`Credit Sale for ${customerName} successfully committed to ledger.`, 'success');
      // Reset form or navigate back after a delay
      setTimeout(() => onBack(), 2000);
    }, 2000);
  };

  const triggerFeedback = (msg: string, type: 'success' | 'error') => {
    setActionFeedback({ msg, type });
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Toast Notification */}
      {actionFeedback && (
        <div className="fixed bottom-8 right-8 z-[110] animate-in slide-in-from-right-8 fade-in duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${actionFeedback.type === 'error' ? 'bg-rose-500' : 'bg-amber-500'}`}>
              {actionFeedback.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            </div>
            <p className="text-sm font-bold">{actionFeedback.msg}</p>
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
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Registered Customer Name *</label>
                  <div className="relative">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                     <input 
                      type="text" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Search customer database..." 
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-amber-500/50 text-sm font-bold" 
                    />
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Guarantor Name (Optional)</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Guarantor Contact</label>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest text-teal-600">Total Sale Value ($) *</label>
                  <div className="relative">
                     <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={14} />
                     <input 
                      type="number" 
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 bg-teal-50/30 dark:bg-teal-900/10 rounded-xl border border-teal-100 dark:border-teal-900/30 focus:ring-2 focus:ring-teal-500/50 text-sm font-black text-teal-600" 
                    />
                  </div>
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Initial Downpayment ($)</label>
                  <div className="relative">
                     <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                     <input 
                      type="number" 
                      value={downpayment}
                      onChange={(e) => setDownpayment(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-amber-500/50 text-sm font-black" 
                    />
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Interest Rate (%)</label>
                  <div className="relative">
                     <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                     <input 
                      type="number" 
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-amber-500/50 text-sm font-black text-amber-600" 
                    />
                  </div>
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Period (Months)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <select 
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-amber-500/50 text-sm font-black appearance-none cursor-pointer"
                    >
                      <option value="1">1 Month</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="12">12 Months (1 Year)</option>
                      <option value="24">24 Months (2 Years)</option>
                    </select>
                  </div>
               </div>
            </div>
          </section>
        </div>

        {/* Sidebar: Financial Impact */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-amber-600 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
              <HandCoins size={120} className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-500" />
              <h4 className="text-[10px] font-black text-amber-100 uppercase tracking-[0.4em] mb-8">Installment Calculation</h4>
              
              <div className="space-y-6 relative z-10">
                 <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="text-[10px] font-black text-amber-100/60 uppercase tracking-widest mb-1">Monthly Installment</p>
                    <p className="text-4xl font-black tracking-tighter">
                      ${financials.monthlyInstallment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                 </div>
                 
                 <div className="pt-6 border-t border-amber-500/30 space-y-3">
                    <div className="flex justify-between items-center text-[11px] font-bold text-amber-100/80">
                       <span className="uppercase">Financed Principal</span>
                       <span>${financials.principalToFinance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold text-amber-100/80">
                       <span className="uppercase">Total Interest ({interest}%)</span>
                       <span>${financials.interestCharge.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                       <p className="text-[10px] font-black text-amber-100 uppercase tracking-widest">Final Total Payable</p>
                       <p className="text-xl font-black">${financials.totalPayable.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    </div>
                 </div>
              </div>

              <button 
                onClick={handleCommitSale}
                disabled={isSaving}
                className="w-full mt-10 py-4 bg-white text-amber-600 rounded-2xl font-black text-sm shadow-xl hover:bg-amber-50 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                 {isSaving ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />} 
                 COMMIT CREDIT SALE
              </button>
           </div>

           <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-[2rem] flex gap-4">
              <ShieldCheck size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 leading-relaxed uppercase tracking-wider">
                System Logic: Inventory is deducted immediately upon commitment. Ensure you have the physical signed credit agreement before processing.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CreditSalePage;
