
import React from 'react';
import { Search, Filter, RefreshCcw } from 'lucide-react';

interface InventoryToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  resetFilters: () => void;
  isFilterMenuOpen: boolean;
  setIsFilterMenuOpen: (open: boolean) => void;
  setCurrentPage: (page: number) => void;
}

const InventoryToolbar: React.FC<InventoryToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  resetFilters,
  isFilterMenuOpen,
  setIsFilterMenuOpen,
  setCurrentPage
}) => {
  return (
    <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col lg:row sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/20 dark:bg-slate-800/20">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Filter by name or SKU..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium shadow-sm"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <button 
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${
              categoryFilter !== 'All Categories' || statusFilter !== 'All Statuses'
              ? 'bg-teal-50 border-teal-200 text-teal-600 dark:bg-teal-900/30'
              : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-500 hover:text-teal-600 shadow-sm'
            }`}
          >
            <Filter size={16} /> Filters
          </button>
          
          {isFilterMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsFilterMenuOpen(false)} />
              <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl z-50 p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Category</label>
                  <select 
                    value={categoryFilter}
                    onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Apparel</option>
                    <option>Home & Living</option>
                    <option>Food & Bev</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Stock Status</label>
                  <select 
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-teal-500/50"
                  >
                    <option>All Statuses</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
                <button onClick={resetFilters} className="w-full py-2.5 text-[10px] font-black text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl transition-all uppercase tracking-widest">Reset All</button>
              </div>
            </>
          )}
        </div>
        
        <button onClick={resetFilters} title="Refresh Registry" className="p-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl text-gray-400 hover:text-teal-600 transition-all shadow-sm">
          <RefreshCcw size={18} />
        </button>
      </div>
    </div>
  );
};

export default InventoryToolbar;
