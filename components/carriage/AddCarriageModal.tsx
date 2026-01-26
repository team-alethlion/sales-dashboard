
import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Building, 
  Calendar, 
  FileText, 
  DollarSign, 
  CreditCard, 
  Save, 
  Loader2 
} from 'lucide-react';

interface AddCarriageModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddCarriageModal: React.FC<AddCarriageModalProps> = ({ onClose, onSuccess }) => {
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20">
          <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <Plus className="text-teal-600" size={20} /> Add Carriage Entry
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-rose-500 transition-all">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSave} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Supplier Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold appearance-none cursor-pointer">
                  <option>Select Supplier...</option>
                  <option>LogiLink Logistics</option>
                  <option>Global Tech Inc.</option>
                  <option>Mombasa Transporters</option>
                  <option>DHL Express</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Date of Service</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input type="date" className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Shipment Details / Notes</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400" size={14} />
              <textarea rows={2} placeholder="e.g. Freight for Batch #902-A..." className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Carriage Amount ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={14} />
                <input type="number" step="0.01" placeholder="0.00" className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black text-teal-600" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Payment Account</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold appearance-none cursor-pointer">
                  <option>Main Petty Cash</option>
                  <option>Bank Deposit</option>
                  <option>M-Pesa Business</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-4 bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={saving}
              className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-teal-900/10 hover:bg-teal-700 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <Save size={16} /> Save Record
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarriageModal;
