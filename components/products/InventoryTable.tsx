
import React from 'react';
import { Package, Plus, Edit3, Trash2, History } from 'lucide-react';

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface InventoryTableProps {
  items: ProductItem[];
  onRestock: (id: string) => void;
  onEdit: (item: ProductItem) => void;
  onDelete: (id: string) => void;
  onViewAudit: (sku: string) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  totalFilteredCount: number;
  resetFilters: () => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  onRestock,
  onEdit,
  onDelete,
  onViewAudit,
  currentPage,
  totalPages,
  setCurrentPage,
  totalFilteredCount,
  resetFilters
}) => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-x-auto">
        {items.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-50 dark:border-slate-800">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">SKU Identity</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Price</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Stock</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/30 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-[11px] font-black text-teal-600 uppercase">#{item.sku}</span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">{item.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{item.category}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">${item.price.toFixed(2)}</p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-sm font-black text-slate-700 dark:text-slate-200">{item.stock} Units</span>
                      <div className="w-20 h-1 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.stock > 10 ? 'bg-teal-500' : item.stock > 0 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${Math.min(100, (item.stock / 100) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 
                      item.status === 'Low Stock' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' : 
                      'bg-rose-50 text-rose-500 dark:bg-rose-900/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => onRestock(item.id)} title="Quick Restock" className="p-2 text-gray-300 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-xl transition-all">
                        <Plus size={16} />
                      </button>
                      <div className="w-px h-4 bg-gray-100 dark:bg-slate-800" />
                      <button onClick={() => onEdit(item)} title="Edit SKU" className="p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => onDelete(item.id)} title="Delete SKU" className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all">
                        <Trash2 size={16} />
                      </button>
                      <div className="w-px h-4 bg-gray-100 dark:bg-slate-800" />
                      <button onClick={() => onViewAudit(item.sku)} title="Audit Trail" className="p-2 text-gray-300 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all">
                        <History size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-20 text-center animate-in fade-in zoom-in-95 duration-500">
             <Package size={48} className="mx-auto text-gray-200 mb-6" />
             <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">No Items Found</h3>
             <button onClick={resetFilters} className="mt-8 px-8 py-3 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-teal-700 transition-all">Clear Filters</button>
          </div>
        )}
      </div>

      {totalFilteredCount > 0 && (
        <div className="p-8 bg-gray-50/30 dark:bg-slate-800/30 border-t border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Showing {items.length} of {totalFilteredCount} items</p>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-teal-600 transition-all disabled:opacity-30">Previous</button>
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-teal-600 transition-all disabled:opacity-30">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
