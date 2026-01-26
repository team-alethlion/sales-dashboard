
import React from 'react';
import { Users, ShieldCheck, TrendingUp, Target } from 'lucide-react';

const CustomerKPIs: React.FC = () => {
  const stats = [
    { label: 'Total Customers', value: '2,840', change: '+12.5%', icon: <Users className="text-blue-500" /> },
    { label: 'Retention Rate', value: '94.2%', change: '+2.1%', icon: <ShieldCheck className="text-teal-500" /> },
    { label: 'Avg. Lifetime Value', value: '$1,240', change: '+8.4%', icon: <TrendingUp className="text-emerald-500" /> },
    { label: 'Acquisition Cost', value: '$42.50', change: '-3.2%', icon: <Target className="text-rose-500" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">{stat.icon}</div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-teal-50 text-teal-600' : 'bg-rose-50 text-rose-600'}`}>
              {stat.change}
            </span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
          <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default CustomerKPIs;
