
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  subValue: string;
  change: string;
  isPositive: boolean;
  barColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, change, isPositive, barColor }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 flex flex-col justify-between transition-colors duration-300">
      <div>
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2">{label}</p>
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100">{value}</h3>
          <span className={`text-xs font-medium ${isPositive ? 'text-teal-600 dark:text-teal-400' : 'text-rose-500 dark:text-rose-400'}`}>
            {isPositive ? '+' : '-'}{change}
          </span>
        </div>
        <p className="text-xs text-gray-400 dark:text-slate-500 font-medium">{subValue}</p>
      </div>
      
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full ${barColor} rounded-full`} 
            style={{ width: '65%' }}
          />
        </div>
        <div className="w-px h-4 bg-gray-200 dark:bg-slate-700" />
      </div>
    </div>
  );
};

export default StatCard;
