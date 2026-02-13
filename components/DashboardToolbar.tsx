
import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import DateRangePicker from './DateRangePicker';

interface DashboardToolbarProps {
  dateRange: { start: string; end: string };
  setDateRange: (range: { start: string; end: string }) => void;
  currentBranchName: string;
  branches: { id: string; name: string }[];
  selectedBranchId: string;
  onBranchSelect: (id: string) => void;
  isBranchMenuOpen: boolean;
  setIsBranchMenuOpen: (open: boolean) => void;
  onGenerateInsights: () => void;
  loadingInsights: boolean;
}

const DashboardToolbar: React.FC<DashboardToolbarProps> = ({
  dateRange,
  setDateRange,
  currentBranchName,
  branches,
  selectedBranchId,
  onBranchSelect,
  isBranchMenuOpen,
  setIsBranchMenuOpen,
  onGenerateInsights,
  loadingInsights
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex flex-wrap items-center gap-4">
        <DateRangePicker range={dateRange} onChange={setDateRange} />
        
        <div className="relative">
          <button 
            onClick={() => setIsBranchMenuOpen(!isBranchMenuOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">🏢 {currentBranchName}</span>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${isBranchMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isBranchMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-gray-100 dark:border-slate-800 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
              {branches.map(branch => (
                <button
                  key={branch.id}
                  onClick={() => {
                    onBranchSelect(branch.id);
                    setIsBranchMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                    selectedBranchId === branch.id 
                    ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-bold' 
                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {branch.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
         <button 
          onClick={onGenerateInsights}
          disabled={loadingInsights}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg font-bold text-sm shadow-lg shadow-teal-100 dark:shadow-none hover:bg-teal-700 active:scale-95 transition-all"
        >
          <Sparkles size={18} />
          {loadingInsights ? 'Analyzing...' : 'AI Insights'}
        </button>
        <button className="flex-1 sm:flex-none px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg font-bold text-sm hover:bg-black dark:hover:bg-slate-600 active:scale-95 transition-all">
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default DashboardToolbar;
