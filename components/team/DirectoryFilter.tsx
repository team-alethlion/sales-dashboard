
import React from 'react';
import { Filter } from 'lucide-react';

interface DirectoryFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  filterBranch: string;
  setFilterBranch: (branch: string) => void;
  filterClearance: string;
  setFilterClearance: (level: string) => void;
  onReset: () => void;
  activeCount: number;
}

const DirectoryFilter: React.FC<DirectoryFilterProps> = ({ 
  isOpen, onToggle, filterBranch, setFilterBranch, filterClearance, setFilterClearance, onReset, activeCount 
}) => {
  const branches = ['All Branches', 'Global Hub', 'Downtown', 'Airport', 'Commercial'];
  const clearanceLevels = ['All Levels', 'Full Access', 'Managerial', 'Restricted'];

  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all border ${
          activeCount > 0 
          ? 'bg-teal-50 border-teal-200 text-teal-600 dark:bg-teal-900/20 dark:border-teal-800' 
          : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-500'
        }`}
      >
        <Filter size={16} /> 
        {activeCount > 0 ? `Filters (${activeCount})` : 'Filters'}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onToggle} />
          <div className="absolute top-full right-0 mt-4 w-72 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl z-50 p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-6">
               <div>
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Branch Node</h4>
                 <div className="flex flex-wrap gap-2">
                   {branches.map(b => (
                     <button 
                      key={b} 
                      onClick={() => setFilterBranch(b)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase border transition-all ${filterBranch === b ? 'bg-teal-600 border-teal-600 text-white' : 'bg-gray-50 dark:bg-slate-800 text-gray-500 border-transparent'}`}
                     >
                       {b}
                     </button>
                   ))}
                 </div>
               </div>

               <div>
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Security Tier</h4>
                 <div className="flex flex-wrap gap-2">
                   {clearanceLevels.map(c => (
                     <button 
                      key={c} 
                      onClick={() => setFilterClearance(c)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase border transition-all ${filterClearance === c ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 dark:bg-slate-800 text-gray-500 border-transparent'}`}
                     >
                       {c}
                     </button>
                   ))}
                 </div>
               </div>

               <button 
                 onClick={onReset}
                 className="w-full py-3 text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl transition-all"
               >
                 Reset All
               </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DirectoryFilter;
