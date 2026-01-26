
import React, { useState } from 'react';
import { 
  Layers, 
  MoreVertical, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Info,
  Eye,
  Search
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  count: number;
}

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', name: 'Electronics', description: 'Computing, mobile devices, and gadgets', count: 450 },
  { id: 'cat-2', name: 'Home & Living', description: 'Kitchenware, furniture, and decor', count: 320 },
  { id: 'cat-3', name: 'Apparel', description: 'Clothing, footwear, and accessories', count: 580 },
  { id: 'cat-4', name: 'Food & Bev', description: 'Perishables and packaged goods', count: 120 },
];

const CategoriesTab: React.FC = () => {
  // --- STATE ---
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isEditSaving, setIsEditSaving] = useState(false);
  
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'alert' | 'info' } | null>(null);

  // --- HELPERS ---
  const showToast = (msg: string, type: 'success' | 'alert' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- HANDLERS ---
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsRegistering(true);
    setTimeout(() => {
      const created: CategoryItem = {
        id: `cat-${Date.now()}`,
        name: newName,
        description: newDesc || 'No description provided.',
        count: 0
      };
      setCategories([created, ...categories]);
      setNewName('');
      setNewDesc('');
      setIsRegistering(false);
      showToast(`${newName} added to categories`);
    }, 1000);
  };

  const handleDelete = (id: string) => {
    const target = categories.find(c => c.id === id);
    if (target && target.count > 0) {
      showToast(`Cannot delete category with ${target.count} items.`, 'alert');
      return;
    }
    setCategories(categories.filter(c => c.id !== id));
    showToast(`Category removed from registry`, 'alert');
  };

  const handleFilterInventory = (name: string) => {
    showToast(`Opening inventory view filtered by ${name}...`, 'info');
    // Note: In a production environment, this would call a global navigation hook
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    setIsEditSaving(true);
    setTimeout(() => {
      setCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
      setIsEditSaving(false);
      setEditingCategory(null);
      showToast(`Category specifications updated`);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-left-2 duration-300 relative">
      {toast && (
        <div className="fixed bottom-24 lg:bottom-8 right-8 z-[150] animate-in slide-in-from-right-8 duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
            {toast.type === 'success' && <CheckCircle2 size={18} className="text-teal-400" />}
            {toast.type === 'alert' && <AlertCircle size={18} className="text-rose-400" />}
            {toast.type === 'info' && <Search size={18} className="text-blue-400" />}
            <span className="text-[11px] font-black tracking-tight uppercase">{toast.msg}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20">
            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Global Categories</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Classification Registry</p>
            </div>
            <span className="text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full">{categories.length} Active Codes</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-slate-800/50">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category Name</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Population</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-teal-600"><Layers size={14} /></div>
                          <p className="text-sm font-black text-slate-800 dark:text-slate-100">{cat.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-xs text-gray-400 font-medium line-clamp-1 max-w-[250px]">{cat.description}</p>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="text-[10px] font-black text-teal-600 bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded-lg">{cat.count} SKUs</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditingCategory(cat)} className="p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all" title="Edit"><Edit3 size={16} /></button>
                          <button onClick={() => handleDelete(cat.id)} className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all" title="Delete"><Trash2 size={16} /></button>
                          <button onClick={() => handleFilterInventory(cat.name)} className="p-2 text-gray-300 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-all" title="View Items"><Eye size={16} /></button>
                        </div>
                        <div className="group-hover:hidden text-gray-200"><MoreVertical size={16} /></div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={4} className="px-6 py-20 text-center"><Layers size={40} className="mx-auto text-gray-100 mb-4" /><p className="text-xs font-black text-gray-400 uppercase tracking-widest">No categories found</p></td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm sticky top-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-teal-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Plus size={20} /></div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Create New Category</h3>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Category Name *</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Luxury Goods" className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" required />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Brief Description</label>
                <textarea rows={4} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Describe scope..." className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none" />
              </div>
              <button type="submit" disabled={isRegistering || !newName.trim()} className="w-full py-4 bg-slate-900 dark:bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase hover:opacity-90 transition-all flex items-center justify-center gap-3">
                {isRegistering ? <Loader2 size={16} className="animate-spin" /> : <>Register Category <Save size={16} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {editingCategory && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setEditingCategory(null)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col">
             <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl"><Edit3 size={24} /></div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Modify Category</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Registry Update Node</p>
                  </div>
                </div>
                <button onClick={() => setEditingCategory(null)} className="p-3 bg-gray-50 dark:bg-slate-800 text-gray-400 rounded-2xl hover:text-rose-500 transition-all"><X size={22} /></button>
             </div>
             <form onSubmit={handleSaveEdit} className="p-8 space-y-6">
                <div>
                   <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Name</label>
                   <input type="text" value={editingCategory.name} onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})} className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" required />
                </div>
                <div>
                   <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Description</label>
                   <textarea rows={3} value={editingCategory.description} onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})} className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setEditingCategory(null)} className="flex-1 py-4 bg-gray-100 dark:bg-slate-800 text-gray-500 rounded-2xl text-[10px] font-black uppercase transition-all">Discard</button>
                  <button type="submit" disabled={isEditSaving} className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-3">
                    {isEditSaving ? <Loader2 size={16} className="animate-spin" /> : <>Commit Updates <Save size={18} /></>}
                  </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTab;
