
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
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex flex-col justify-between">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</p>
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          <span className={`text-xs font-medium ${isPositive ? 'text-teal-600' : 'text-rose-500'}`}>
            {isPositive ? '+' : '-'}{change}
          </span>
        </div>
        <p className="text-xs text-gray-400 font-medium">{subValue}</p>
      </div>
      
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${barColor} rounded-full`} 
            style={{ width: '65%' }}
          />
        </div>
        <div className="w-px h-4 bg-gray-200" />
      </div>
    </div>
  );
};

export default StatCard;
