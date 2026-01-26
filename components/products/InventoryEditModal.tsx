
import React from 'react';
import { Package, X, Hash, DollarSign, Layers, ShieldCheck, Save, Loader2 } from 'lucide-react';

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface InventoryEditModalProps {
  item: ProductItem;
  setItem: (item: ProductItem) => void;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  isSaving: boolean;
}

const InventoryEditModal: React.FC<InventoryEditModalProps> = ({
  item,
  setItem,
  onClose,
  onSave,
  isSaving
}) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
         <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-900/20"><Package size={24} /></div>
              <div>
                <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Modify Inventory Unit</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Registry Synchronization Node</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 bg-gray-50 dark:bg-slate-800 text-gray-400 rounded-2xl hover:text-rose-500 transition-all shadow-sm"><X size={22} /></button>
         </div>

         <form onSubmit={onSave} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Product Identity *</label>
                  <input type="text" value={item.name} onChange={(e) => setItem({...item, name: e.target.value})} className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" required />
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">SKU Identity Code</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input type="text" value={item.sku} onChange={(e) => setItem({...item, sku: e.target.value})} className="w-full pl-10 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold uppercase" required />
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Category</label>
                  <select value={item.category} onChange={(e) => setItem({...item, category: e.target.value})} className="w-full px-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none cursor-pointer">
                     <option>Electronics</option><option>Apparel</option><option>Home & Living</option><option>Food & Bev</option>
                  </select>
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">MSRP Price ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600" size={14} />
                    <input type="number" step="0.01" value={item.price} onChange={(e) => setItem({...item, price: parseFloat(e.target.value) || 0})} className="w-full pl-10 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black text-teal-600" />
                  </div>
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Stock Level</label>
                  <div className="relative">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input type="number" value={item.stock} onChange={(e) => setItem({...item, stock: parseInt(e.target.value) || 0})} className="w-full pl-10 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black" />
                  </div>
               </div>
            </div>

            <div className="p-6 bg-teal-50 dark:bg-teal-950/20 rounded-3xl border border-teal-100 dark:border-teal-900/30 flex gap-4">
               <ShieldCheck size={24} className="text-teal-600 shrink-0 mt-0.5" />
               <p className="text-[10px] font-black text-teal-700 dark:text-teal-300 leading-relaxed uppercase tracking-wider">Verification: Registry changes are tracked via the Ledger Integrity Module.</p>
            </div>
         </form>

         <div className="p-8 bg-white dark:bg-slate-900 border-t border-gray-50 dark:border-slate-800 shrink-0 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-gray-100 dark:bg-slate-800 text-gray-500 rounded-2xl text-[10px] font-black uppercase hover:bg-gray-200 transition-all">Discard</button>
            <button type="submit" disabled={isSaving} onClick={onSave} className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-3 active:scale-95">
              {isSaving ? <Loader2 size={20} className="animate-spin" /> : <>Commit Record <Save size={18} /></>}
            </button>
         </div>
      </div>
    </div>
  );
};

export default InventoryEditModal;
