
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const STOCK_VALUE_DATA = [
  { name: 'Electronics', value: 145000, color: '#0d9488' },
  { name: 'Apparel', value: 82000, color: '#2dd4bf' },
  { name: 'Home', value: 45000, color: '#99f6e4' },
  { name: 'Groceries', value: 12500, color: '#ccfbf1' },
];

const StockValueChart: React.FC = () => {
  return (
    <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Stock Value by Category</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={STOCK_VALUE_DATA}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {STOCK_VALUE_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              formatter={(value: any) => `$${value.toLocaleString()}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3 mt-4">
        {STOCK_VALUE_DATA.map((seg, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="text-xs font-bold text-gray-500">{seg.name}</span>
            </div>
            <span className="text-xs font-black text-slate-700 dark:text-slate-300">${(seg.value / 1000).toFixed(1)}k</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockValueChart;
