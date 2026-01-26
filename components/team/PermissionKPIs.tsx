
import React from 'react';
import { Shield, Briefcase, Lock, Activity } from 'lucide-react';

const PermissionKPIs: React.FC = () => {
  const stats = [
    { label: 'Admin Seats', value: '2/5', sub: 'Allocated slots', icon: <Shield size={18} />, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
    { label: 'Managerial', value: '4', sub: 'Active branch leads', icon: <Briefcase size={18} />, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Restricted', value: '12', sub: 'Standard operators', icon: <Lock size={18} />, color: 'text-slate-500', bg: 'bg-gray-100 dark:bg-slate-800' },
    { label: 'Audit Log', value: 'Perfect', sub: 'No violations detected', icon: <Activity size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-50 dark:border-slate-800 transition-all hover:scale-[1.02]">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
            {stat.icon}
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
          <h3 className={`text-xl font-black text-slate-800 dark:text-slate-100`}>{stat.value}</h3>
          <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tight">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default PermissionKPIs;
