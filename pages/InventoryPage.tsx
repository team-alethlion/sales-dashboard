
import React from 'react';
import { 
  ClipboardList, 
  AlertCircle, 
  TrendingUp, 
  Package, 
  Truck, 
  ArrowRight, 
  DollarSign, 
  BarChart3, 
  MoreHorizontal,
  ChevronRight,
  ShieldAlert,
  Archive
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const STOCK_VALUE_DATA = [
  { name: 'Electronics', value: 145000, color: '#0d9488' },
  { name: 'Apparel', value: 82000, color: '#2dd4bf' },
  { name: 'Home', value: 45000, color: '#99f6e4' },
  { name: 'Groceries', value: 12500, color: '#ccfbf1' },
];

const TOP_PRODUCTS = [
  { name: 'UltraHD Curved Monitor', category: 'Electronics', sales: 124, revenue: '$43,400', stock: 12 },
  { name: 'Premium Coffee Beans', category: 'Food/Bev', sales: 540, revenue: '$13,230', stock: 85 },
  { name: 'Ergonomic Office Chair', category: 'Home', sales: 82, revenue: '$20,500', stock: 4 },
  { name: 'Silk Sleep Mask', category: 'Apparel', sales: 210, revenue: '$7,350', stock: 110 },
];

const LOW_STOCK_ITEMS = [
  { id: '1', name: 'MacBook Pro M3', stock: 2, min: 5, value: '$4,000' },
  { id: '2', name: 'Sony WH-1000XM5', stock: 0, min: 10, value: '$0' },
  { id: '3', name: 'Leather Desk Mat', stock: 3, min: 15, value: '$120' },
];

interface InventoryPageProps {
  onCarriageInwards: () => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ onCarriageInwards }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header Area */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Inventory <span className="text-teal-600">Health & Analytics</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
            Real-time stock valuation and sales velocity analysis
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onCarriageInwards}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all"
          >
            <Truck size={18} />
            <span>Carriage Inwards</span>
          </button>
        </div>
      </header>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[
          { label: 'Total SKUs', value: '1,420', sub: 'Across 4 branches', icon: <Package size={18} />, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
          { label: 'Low Stock', value: '24', sub: 'Items near threshold', icon: <AlertCircle size={18} />, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Out of Stock', value: '8', sub: 'Immediate restock', icon: <ShieldAlert size={18} />, color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20' },
          { label: 'Cost Value', value: '$184.2k', sub: 'Investment at cost', icon: <Archive size={18} />, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Stock Value', value: '$245.8k', sub: 'Potential market price', icon: <TrendingUp size={18} />, color: 'text-teal-600', bg: 'bg-teal-100/50 dark:bg-teal-600/20' },
        ].map((stat, i) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Top Selling Products */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={14} className="text-teal-600" />
              Top Selling Products (30 Days)
            </h3>
            <button className="text-[10px] font-bold text-teal-600 hover:underline">VIEW FULL REPORT</button>
          </div>
          
          <div className="space-y-4">
            {TOP_PRODUCTS.map((prod, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl group hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center font-black text-teal-600 text-sm shadow-sm">
                    #{i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">{prod.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{prod.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <div className="text-right">
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

        {/* Stock Value Distribution */}
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
      </div>

      {/* Stock Health & Restock Table */}
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
    </div>
  );
};

export default InventoryPage;
