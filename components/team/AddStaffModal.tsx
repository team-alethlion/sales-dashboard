
import React, { useState } from 'react';
import { UserPlus, X, User, Terminal, ArrowRight } from 'lucide-react';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center sm:px-4 sm:py-8 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-300 hidden sm:block" onClick={onClose} />
      <div className="relative w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-none sm:rounded-[2.5rem] shadow-2xl border-none sm:border border-gray-100 dark:border-slate-800 animate-in sm:zoom-in-95 sm:slide-in-from-top-4 duration-300 overflow-hidden">
         <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-900/20">
                <UserPlus size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Provision System Operator</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Operational Onboarding Protocol</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 bg-gray-50 dark:bg-slate-800 text-gray-400 rounded-2xl hover:text-rose-500 transition-all shadow-sm">
              <X size={22} />
            </button>
         </div>

         <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
            <div className="space-y-6">
               <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 bg-gray-50 dark:bg-slate-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center group hover:border-teal-200 transition-all cursor-pointer">
                     <User size={32} className="text-gray-300" />
                     <p className="text-[8px] font-black uppercase text-gray-400 mt-2">Upload Photo</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Full Legal Name *</label>
                    <input type="text" placeholder="e.g. Johnathan Smith" className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" required />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Company Email *</label>
                    <input type="email" placeholder="jsmith@code8.io" className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" required />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Branch Node Assignment</label>
                    <select className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none cursor-pointer">
                      <option>Downtown Nairobi</option>
                      <option>Airport Hub</option>
                      <option>Commercial Center</option>
                      <option>Global Admin (HQ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Functional Role</label>
                    <select className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none cursor-pointer">
                      <option>Cashier</option>
                      <option>Branch Manager</option>
                      <option>Inventory Clerk</option>
                      <option>Accountant</option>
                    </select>
                  </div>
               </div>

               <div className="p-6 bg-teal-50 dark:bg-teal-950/20 rounded-3xl border border-teal-100 dark:border-teal-900/30 flex gap-4">
                  <Terminal size={24} className="text-teal-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] font-black text-teal-700 dark:text-teal-300 leading-relaxed uppercase tracking-wider">
                    Verification Required: System will generate a terminal activation token dispatched to the provided email.
                  </p>
               </div>
            </div>
         </form>

         <div className="p-8 bg-white dark:bg-slate-900 border-t border-gray-50 dark:border-slate-800 shrink-0 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-gray-100 dark:bg-slate-800 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all">Cancel</button>
            <button type="submit" disabled={saving} onClick={handleSubmit} className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-teal-900/20 hover:bg-teal-700 transition-all flex items-center justify-center gap-3">
              {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Commit to Registry <ArrowRight size={18} /></>}
            </button>
         </div>
      </div>
    </div>
  );
};

export default AddStaffModal;
