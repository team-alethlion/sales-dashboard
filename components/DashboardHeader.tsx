
import React from 'react';
import { Search, Sun, Moon, Maximize, Plus } from 'lucide-react';

interface DashboardHeaderProps {
  branchName: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onNewSale: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  branchName, 
  isDarkMode, 
  onToggleDarkMode, 
  onOpenSearch,
  onNewSale
}) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Sales Analysis <span className="text-teal-600">Overview</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
          Monitoring {branchName} performance
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onNewSale}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all mr-2"
        >
          <Plus size={18} />
          <span>New Sale</span>
        </button>

        <button 
          onClick={onOpenSearch}
          className="group hidden sm:flex items-center gap-3 px-3 py-2 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:border-teal-200 dark:hover:border-teal-800 transition-all"
        >
          <Search size={18} className="text-gray-400 group-hover:text-teal-600" />
          <span className="text-sm text-gray-400 font-medium mr-4">Search...</span>
          <kbd className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700">
            ⌘K
          </kbd>
        </button>
        
        <div className="h-8 w-px bg-gray-200 dark:bg-slate-800 mx-1 hidden md:block" />

        <button 
          className="sm:hidden p-2.5 text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all active:scale-95"
          onClick={onOpenSearch}
        >
          <Search size={20} />
        </button>

        <button 
          onClick={onToggleDarkMode}
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="p-2.5 text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all active:scale-95"
        >
          {isDarkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-slate-600" />}
        </button>

        <button className="flex items-center gap-2 px-4 py-2.5 text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all font-bold text-sm">
          <Maximize size={18} />
          <span className="hidden sm:inline">Fullscreen</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
