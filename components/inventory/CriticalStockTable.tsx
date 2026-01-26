
import React from 'react';
import { ArrowRight } from 'lucide-react';

const LOW_STOCK_ITEMS = [
  { id: '1', name: 'MacBook Pro M3', stock: 2, min: 5, value: '$4,000' },
  { id: '2', name: 'Sony WH-1000XM5', stock: 0, min: 10, value: '$0' },
  { id: '3', name: 'Leather Desk Mat', stock: 3, min: 15, value: '$120' },
];

const CriticalStockTable: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/30">
        <div>
          <h3 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">Critical Stock Overview</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Items below safety threshold</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-700 transition-all">
          Generate PO for all
        </button>
      </div>
      
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50/50 dark:bg-slate-800/50">
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Name</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Stock</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Min. Threshold</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Value Gap</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
          {LOW_STOCK_ITEMS.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.stock === 0 ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`} />
                  <p className="text-sm font-black text-slate-800 dark:text-slate-100">{item.name}</p>
                </div>
              </td>
              <td className="px-6 py-5">
                <span className={`px-2 py-1 rounded-lg text-xs font-black ${
                  item.stock === 0 ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {item.stock} UNITS
                </span>
              </td>
              <td className="px-6 py-5 font-bold text-gray-400 text-sm">{item.min} UNITS</td>
              <td className="px-6 py-5 font-black text-slate-700 dark:text-slate-300 text-sm">{item.value}</td>
              <td className="px-6 py-5 text-center">
                <button className="text-teal-600 hover:text-teal-700 font-black text-[10px] uppercase tracking-widest flex items-center gap-1 mx-auto">
                  Restock <ArrowRight size={12} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 text-center">
        <button className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-teal-600 transition-colors">View All Safety Alerts</button>
      </div>
    </div>
  );
};

export default CriticalStockTable;
