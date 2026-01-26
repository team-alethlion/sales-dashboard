
import React from 'react';
import { Package, BarChart3, AlertTriangle, Truck } from 'lucide-react';

const PRODUCT_KPI_DATA = [
  { label: 'Total SKUs', value: '1,420', change: '+42 this month', icon: <Package className="text-teal-500" /> },
  { label: 'Stock Value', value: '$284,500', change: '+$12k vs prev', icon: <BarChart3 className="text-blue-500" /> },
  { label: 'Low Stock', value: '14 Items', change: 'Immediate action', icon: <AlertTriangle className="text-rose-500" />, alert: true },
  { label: 'Suppliers', value: '28 Active', change: 'Across 4 regions', icon: <Truck className="text-amber-500" /> },
];

const ProductKPIs: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {PRODUCT_KPI_DATA.map((stat, i) => (
        <div key={i} className={`bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border ${stat.alert ? 'border-rose-100 dark:border-rose-900/30' : 'border-gray-50 dark:border-slate-800'}`}>
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg ${stat.alert ? 'bg-rose-50 dark:bg-rose-900/20' : 'bg-gray-50 dark:bg-slate-800'}`}>
              {stat.icon}
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.alert ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 dark:bg-slate-800 text-gray-500'}`}>
              LIVE
            </span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
          <h3 className={`text-2xl font-black ${stat.alert ? 'text-rose-600' : 'text-slate-800 dark:text-slate-100'}`}>{stat.value}</h3>
          <p className="text-[10px] font-medium text-gray-400 mt-1">{stat.change}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductKPIs;
