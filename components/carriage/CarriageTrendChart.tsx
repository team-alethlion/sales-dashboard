
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

const MONTHLY_CARRIAGE_DATA = [
  { month: 'Jan', amount: 4500 },
  { month: 'Feb', amount: 3200 },
  { month: 'Mar', amount: 5800 },
  { month: 'Apr', amount: 4100 },
  { month: 'May', amount: 6200 },
  { month: 'Jun', amount: 4570 },
];

const CarriageTrendChart: React.FC = () => {
  return (
    <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Expense Trends</h3>
        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
          <div className="w-2 h-2 rounded-full bg-teal-500" /> MONTHLY TOTALS
        </div>
      </div>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MONTHLY_CARRIAGE_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#1e293b', color: '#fff' }}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]} barSize={40}>
              {MONTHLY_CARRIAGE_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 5 ? '#0d9488' : '#cbd5e1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CarriageTrendChart;
