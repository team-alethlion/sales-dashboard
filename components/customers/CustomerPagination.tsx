
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomerPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  startIndex: number;
  endIndex: number;
}

const CustomerPagination: React.FC<CustomerPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalResults, 
  startIndex, 
  endIndex 
}) => {
  return (
    <div className="p-6 bg-gray-50/30 dark:bg-slate-800/30 flex flex-col sm:flex-row items-center justify-between border-t border-gray-50 dark:border-slate-800 gap-4">
      <p className="text-xs text-gray-400 font-medium tracking-tight">
        Showing <span className="font-black text-slate-700 dark:text-slate-300">{startIndex}</span> to <span className="font-black text-slate-700 dark:text-slate-300">{endIndex}</span> of <span className="font-black text-slate-700 dark:text-slate-300">{totalResults}</span> results
      </p>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-gray-500 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            // Simplified: show all if few, or just current neighborhood if many
            if (totalPages > 5 && Math.abs(pageNum - currentPage) > 1 && pageNum !== 1 && pageNum !== totalPages) {
              if (pageNum === 2 || pageNum === totalPages - 1) return <span key={pageNum} className="px-1 text-gray-300">...</span>;
              return null;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-9 h-9 rounded-xl text-[11px] font-black transition-all ${
                  currentPage === pageNum 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/10' 
                  : 'bg-white dark:bg-slate-900 text-gray-400 hover:text-teal-600 border border-gray-100 dark:border-slate-800'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-gray-500 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm group"
        >
          <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CustomerPagination;
