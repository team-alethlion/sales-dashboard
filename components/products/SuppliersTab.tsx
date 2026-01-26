
import React, { useState } from 'react';
import { 
  Plus, 
  Building, 
  Mail, 
  Phone, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  X, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  User, 
  MapPin, 
  ShieldCheck,
  Briefcase,
  Globe
} from 'lucide-react';

interface Supplier {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

const INITIAL_SUPPLIERS: Supplier[] = [
  { id: 'sup-1', company: 'Global Tech Inc.', contact: 'Sarah Miller', email: 'sarah@globaltech.com', phone: '+1 455 900 11', address: 'Tech Plaza, Silicon Valley', status: 'Active' },
  { id: 'sup-2', company: 'Green Harvest Co.', contact: 'James Chen', email: 'j.chen@greenharvest.org', phone: '+44 20 7946 09', address: 'London Gateway, UK', status: 'Active' },
  { id: 'sup-3', company: 'LogiLink Logistics', contact: 'Mark Vance', email: 'vance@logilink.net', phone: '+254 711 000 22', address: 'Mombasa Road, Nairobi', status: 'Pending' },
];

const SuppliersTab: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'alert' | 'portal' } | null>(null);

  const emptySupplier: Supplier = {
    id: '', company: '', contact: '', email: '', phone: '', address: '', status: 'Active'
  };

  const [formState, setFormState] = useState<Supplier>(emptySupplier);

  const showToast = (msg: string, type: 'success' | 'alert' | 'portal' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAdd = () => {
    setFormState(emptySupplier);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sup: Supplier) => {
    setFormState(sup);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const target = suppliers.find(s => s.id === id);
    setSuppliers(prev => prev.filter(s => s.id !== id));
    showToast(`Supplier "${target?.company}" removed from registry`, 'alert');
  };

  const handleConnectPortal = (company: string) => {
    showToast(`Establishing secure handshake with ${company} portal...`, 'portal');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.company || !formState.email) return;

    setIsSaving(true);
    setTimeout(() => {
      if (formState.id) {
        setSuppliers(prev => prev.map(s => s.id === formState.id ? formState : s));
        showToast(`Vendor specifications updated for ${formState.company}`);
      } else {
        const created: Supplier = { ...formState, id: `sup-${Date.now()}` };
        setSuppliers([created, ...suppliers]);
        showToast(`${formState.company} successfully registered`);
      }
      setIsSaving(false);
      setIsModalOpen(false);
    }, 1200);
  };

  return (
    <div className="animate-in fade-in slide-in-from-left-2 duration-300 relative">
      {toast && (
        <div className="fixed bottom-24 lg:bottom-8 right-8 z-[150] animate-in slide-in-from-right-8 duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
            {toast.type === 'success' && <CheckCircle2 size={18} className="text-teal-400" />}
            {toast.type === 'alert' && <AlertCircle size={18} className="text-rose-400" />}
            {toast.type === 'portal' && <Globe size={18} className="text-blue-400 animate-pulse" />}
            <span className="text-[11px] font-black tracking-tight uppercase">{toast.msg}</span>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20">
          <div>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Vendor Directory</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Authorized Supply Chain Partners</p>
          </div>
          <button onClick={handleOpenAdd} className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-900/10 active:scale-95">
            <Plus size={16} /> Register Supplier
          </button>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800/50">
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Company / Contact</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Channels</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Logistics Node</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Account Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {suppliers.length > 0 ? (
                suppliers.map((sup) => (
                  <tr key={sup.id} className="hover:bg-gray-50/30 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-teal-600 shadow-inner group-hover:scale-110 transition-transform"><Building size={20} /></div>
                        <div>
                          <p className="text-sm font-black text-slate-800 dark:text-slate-100">{sup.company}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{sup.contact}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400"><Mail size={12} className="text-teal-600" /> {sup.email}</div>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400"><Phone size={12} className="text-teal-600" /> {sup.phone}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-2"><MapPin size={12} className="text-gray-300 mt-0.5" /><p className="text-xs text-gray-400 font-medium max-w-[220px] leading-relaxed line-clamp-2">{sup.address}</p></div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        sup.status === 'Active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 
                        sup.status === 'Pending' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' : 
                        'bg-rose-50 text-rose-600 dark:bg-rose-900/20'
                      }`}>{sup.status}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleOpenEdit(sup)} className="p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all" title="Edit"><Edit3 size={16} /></button>
                        <button onClick={() => handleDelete(sup.id)} className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all" title="Delete"><Trash2 size={16} /></button>
                        <div className="w-px h-4 bg-gray-100 dark:bg-slate-800 mx-1" />
                        <button onClick={() => handleConnectPortal(sup.company)} className="p-2 text-gray-300 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-xl transition-all" title="Partner Portal">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="px-8 py-24 text-center"><Building size={48} className="mx-auto text-gray-100 dark:text-slate-800 mb-4" /><p className="text-xs font-black text-gray-400 uppercase tracking-widest">No Registered Suppliers</p></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
             <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-900/20"><Briefcase size={24} /></div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{formState.id ? 'Modify Vendor Profile' : 'Register New Vendor'}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Global Procurement Node</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-gray-50 dark:bg-slate-800 text-gray-400 rounded-2xl hover:text-rose-500 transition-all shadow-sm"><X size={22} /></button>
             </div>
             <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Company Identity *</label>
                      <input type="text" value={formState.company} onChange={(e) => setFormState({...formState, company: e.target.value})} className="w-full px-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" required />
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Primary Contact</label>
                      <input type="text" value={formState.contact} onChange={(e) => setFormState({...formState, contact: e.target.value})} className="w-full px-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" />
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Email *</label>
                      <input type="email" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} className="w-full px-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" required />
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Phone</label>
                      <input type="text" value={formState.phone} onChange={(e) => setFormState({...formState, phone: e.target.value})} className="w-full px-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" />
                   </div>
                </div>
                <div className="p-6 bg-teal-50 dark:bg-teal-950/20 rounded-3xl border border-teal-100 dark:border-teal-900/30 flex gap-4">
                   <ShieldCheck size={24} className="text-teal-600 shrink-0 mt-0.5" />
                   <p className="text-[10px] font-black text-teal-700 dark:text-teal-300 leading-relaxed uppercase tracking-wider">Vendor Compliance: Changes propagate to the carriage inwards module immediately.</p>
                </div>
             </form>
             <div className="p-8 bg-white dark:bg-slate-900 border-t border-gray-50 dark:border-slate-800 shrink-0 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-100 dark:bg-slate-800 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">Cancel</button>
                <button type="submit" disabled={isSaving} onClick={handleSubmit} className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-3">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <>Commit to Registry <Save size={18} /></>}
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuppliersTab;
