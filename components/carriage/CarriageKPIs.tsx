
import React from 'react';
import { TrendingDown } from 'lucide-react';

interface CarriageKPIsProps {
  totalThisMonth: number;
  totalEntries: number;
  uniqueSuppliers: number;
}

const CarriageKPIs: React.FC<CarriageKPIsProps> = ({ totalThisMonth, totalEntries, uniqueSuppliers }) => {
  return (
    <div className="lg:col-span-4 flex flex-col gap-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm transition-all hover:scale-[1.01]">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Spent This Month</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">${totalThisMonth.toLocaleString()}</h3>
          <span className="text-xs font-bold text-teal-600">+12% vs last</span>
        </div>
        <div className="mt-4 h-1.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-teal-600 w-3/4 rounded-full" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm flex flex-col justify-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Entries</p>
          <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">{totalEntries}</h4>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm flex flex-col justify-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Suppliers</p>
          <h4 className="text-xl font-black text-slate-800 dark:text-slate-100">{uniqueSuppliers}</h4>
        </div>
      </div>

      <div className="bg-teal-600 p-6 rounded-3xl shadow-xl shadow-teal-900/20 text-white relative overflow-hidden group">
        <TrendingDown size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform duration-500" />
        <p className="text-[10px] font-black text-teal-100 uppercase tracking-widest mb-2">Efficiency Insight</p>
        <p className="text-sm font-medium leading-relaxed">
          Consolidating shipments from <span className="font-black">Global Tech Inc.</span> could reduce carriage costs by <span className="font-black">15.4%</span> based on current volume.
        </p>
      </div>
    </div>
  );
};

export default CarriageKPIs;
