
import React from 'react';
import { TrendingUp, ChevronRight } from 'lucide-react';

const TOP_PRODUCTS = [
  { id: 'ELE-MON-01', name: 'UltraHD Curved Monitor', category: 'Electronics', sales: 124, revenue: '$43,400', stock: 12 },
  { id: 'F&B-BEA-05', name: 'Premium Coffee Beans', category: 'Food/Bev', sales: 540, revenue: '$13,230', stock: 85 },
  { id: 'HOM-CHR-09', name: 'Ergonomic Office Chair', category: 'Home', sales: 82, revenue: '$20,500', stock: 4 },
  { id: 'APP-MSK-02', name: 'Silk Sleep Mask', category: 'Apparel', sales: 210, revenue: '$7,350', stock: 110 },
];

interface TopSellingProductsProps {
  onViewFullReport: () => void;
  onViewProduct: (id: string) => void;
}

const TopSellingProducts: React.FC<TopSellingProductsProps> = ({ onViewFullReport, onViewProduct }) => {
  return (
    <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <TrendingUp size={14} className="text-teal-600" />
          Top Selling Products (30 Days)
        </h3>
        <button 
          onClick={onViewFullReport}
          className="text-[10px] font-black text-teal-600 hover:underline uppercase tracking-widest"
        >
          VIEW FULL REPORT
        </button>
      </div>
      
      <div className="space-y-4">
        {TOP_PRODUCTS.map((prod, i) => (
          <div 
            key={i} 
            onClick={() => onViewProduct(prod.id)}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl group hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-slate-700 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center font-black text-teal-600 text-sm shadow-sm group-hover:scale-110 transition-transform">
                #{i + 1}
              </div>
              <div>
                <p className="text-sm font-black text-slate-800 dark:text-slate-100">{prod.name}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{prod.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Units Sold</p>
                <p className="text-sm font-black text-slate-700 dark:text-slate-300">{prod.sales}</p>
              </div>
              <div className="text-right w-24">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Revenue</p>
                <p className="text-sm font-black text-teal-600">{prod.revenue}</p>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-teal-500 transition-colors" size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;
