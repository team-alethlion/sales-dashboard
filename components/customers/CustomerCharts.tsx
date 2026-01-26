
import React from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SEGMENT_DATA = [
  { name: 'VIP/Champions', value: 35, color: '#0d9488' },
  { name: 'Loyal', value: 45, color: '#2dd4bf' },
  { name: 'New', value: 15, color: '#99f6e4' },
  { name: 'At Risk', value: 5, color: '#f43f5e' },
];

const GROWTH_DATA = [
  { month: 'Jan', new: 400, ret: 240 },
  { month: 'Feb', new: 300, ret: 139 },
  { month: 'Mar', new: 200, ret: 980 },
  { month: 'Apr', new: 278, ret: 390 },
  { month: 'May', new: 189, ret: 480 },
  { month: 'Jun', new: 239, ret: 380 },
];

const CustomerCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
      {/* Lifecycle Chart */}
      <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Customer Segments</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={SEGMENT_DATA}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {SEGMENT_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3 mt-4">
          {SEGMENT_DATA.map((seg, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
                <span className="text-xs font-bold text-gray-500">{seg.name}</span>
              </div>
              <span className="text-xs font-black text-slate-700 dark:text-slate-300">{seg.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth/Activity Chart */}
      <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Growth & Engagement</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-teal-600"></div><span className="text-[10px] text-gray-400 font-bold uppercase">New Clients</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gray-200"></div><span className="text-[10px] text-gray-400 font-bold uppercase">Retention</span></div>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {/* Fix: changed GROW_DATA to correctly defined GROWTH_DATA */}
            <BarChart data={GROWTH_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
              <Tooltip 
                 contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="new" fill="#0d9488" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ret" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CustomerCharts;
