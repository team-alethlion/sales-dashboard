
import React from 'react';
import { Package, AlertCircle, ShieldAlert, Archive, TrendingUp } from 'lucide-react';

const InventoryKPIs: React.FC = () => {
  const stats = [
    { label: 'Total SKUs', value: '1,420', sub: 'Across 4 branches', icon: <Package size={18} />, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
    { label: 'Low Stock', value: '24', sub: 'Items near threshold', icon: <AlertCircle size={18} />, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Out of Stock', value: '8', sub: 'Immediate restock', icon: <ShieldAlert size={18} />, color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    { label: 'Cost Value', value: '$184.2k', sub: 'Investment at cost', icon: <Archive size={18} />, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Stock Value', value: '$245.8k', sub: 'Potential market price', icon: <TrendingUp size={18} />, color: 'text-teal-600', bg: 'bg-teal-100/50 dark:bg-teal-600/20' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-all hover:scale-[1.02]">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
            {stat.icon}
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
          <h3 className={`text-xl font-black text-slate-800 dark:text-slate-100`}>{stat.value}</h3>
          <p className="text-[10px] font-medium text-gray-400 mt-1">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default InventoryKPIs;
