
import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Layers, 
  Truck, 
  Database, 
  Download, 
  Upload, 
  Filter, 
  MoreVertical,
  AlertTriangle,
  FileText,
  FileCode,
  Globe,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  BarChart3,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

type ActiveTab = 'inventory' | 'categories' | 'suppliers' | 'bulk';

const PRODUCT_KPI_DATA = [
  { label: 'Total SKUs', value: '1,420', change: '+42 this month', icon: <Package className="text-teal-500" /> },
  { label: 'Stock Value', value: '$284,500', change: '+$12k vs prev', icon: <BarChart3 className="text-blue-500" /> },
  { label: 'Low Stock', value: '14 Items', change: 'Immediate action', icon: <AlertTriangle className="text-rose-500" />, alert: true },
  { label: 'Suppliers', value: '28 Active', change: 'Across 4 regions', icon: <Truck className="text-amber-500" /> },
];

const MOCK_CATEGORIES = [
  { id: 'cat-1', name: 'Electronics', description: 'Computing, mobile devices, and gadgets', count: 450 },
  { id: 'cat-2', name: 'Home & Living', description: 'Kitchenware, furniture, and decor', count: 320 },
  { id: 'cat-3', name: 'Apparel', description: 'Clothing, footwear, and accessories', count: 580 },
  { id: 'cat-4', name: 'Food & Bev', description: 'Perishables and packaged goods', count: 120 },
];

const MOCK_SUPPLIERS = [
  { id: 'sup-1', company: 'Global Tech Inc.', contact: 'Sarah Miller', email: 'sarah@globaltech.com', phone: '+1 455 900 11', address: 'Tech Plaza, Silicon Valley', status: 'Active' },
  { id: 'sup-2', company: 'Green Harvest Co.', contact: 'James Chen', email: 'j.chen@greenharvest.org', phone: '+44 20 7946 09', address: 'London Gateway, UK', status: 'Active' },
  { id: 'sup-3', company: 'LogiLink Logistics', contact: 'Mark Vance', email: 'vance@logilink.net', phone: '+254 711 000 22', address: 'Mombasa Road, Nairobi', status: 'Pending' },
];

const ProductsPage: React.FC<{ onNewProduct: () => void }> = ({ onNewProduct }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals / Quick Adds (Simplified state)
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSupplier, setShowAddSupplier] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Area */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Inventory & <span className="text-teal-600">Supply Chain</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
            Centralized management for 1,420 unique products
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onNewProduct}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all"
          >
            <Plus size={18} />
            <span>New Product</span>
          </button>
        </div>
      </header>

      {/* KPI Stats */}
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

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 p-1.5 bg-gray-100/50 dark:bg-slate-800/50 rounded-2xl mb-8 w-fit border border-gray-100 dark:border-slate-800">
        {[
          { id: 'inventory', name: 'Inventory', icon: <Package size={14} /> },
          { id: 'categories', name: 'Categories', icon: <Layers size={14} /> },
          { id: 'suppliers', name: 'Suppliers', icon: <Truck size={14} /> },
          { id: 'bulk', name: 'Bulk Ops', icon: <Database size={14} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ActiveTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id 
              ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' 
              : 'text-gray-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by SKU, Product name..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-500 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 transition-colors">
                    <Filter size={14} /> Filters
                  </button>
                </div>
              </div>
              <div className="p-12 text-center">
                <Package size={48} className="mx-auto text-gray-200 dark:text-slate-800 mb-4" />
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">Inventory List Interface</h3>
                <p className="text-xs text-gray-400 mt-2 max-w-xs mx-auto font-medium">This component renders your searchable and paginated database of all physical items in stock.</p>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Global Categories</h3>
                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{MOCK_CATEGORIES.length} Active</span>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-slate-800/50">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category Name</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Product Count</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                  {MOCK_CATEGORIES.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-5">
                        <p className="text-sm font-black text-slate-800 dark:text-slate-100">{cat.name}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-xs text-gray-400 font-medium line-clamp-1">{cat.description}</p>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="text-xs font-black text-teal-600 bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded-lg">
                          {cat.count} SKUs
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button className="p-2 text-gray-300 hover:text-slate-600 transition-colors"><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Create New Category</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Category Name</label>
                    <input type="text" placeholder="e.g. Luxury Goods" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Brief Description</label>
                    <textarea rows={3} placeholder="Describe what items go here..." className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none" />
                  </div>
                  <button className="w-full py-3 bg-slate-800 dark:bg-teal-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all">
                    Register Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUPPLIERS TAB */}
        {activeTab === 'suppliers' && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Vendor Directory</h3>
                <button className="flex items-center gap-2 text-xs font-bold text-teal-600 hover:underline">
                  <Plus size={14} /> Add Supplier
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-slate-800/50">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Company / Contact</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Communication</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Physical Address</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                    {MOCK_SUPPLIERS.map((sup) => (
                      <tr key={sup.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-400">
                              <Building size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-800 dark:text-slate-100">{sup.company}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{sup.contact}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                              <Mail size={12} className="text-teal-600" /> {sup.email}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                              <Phone size={12} className="text-teal-600" /> {sup.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-xs text-gray-400 font-medium max-w-[200px] leading-relaxed">{sup.address}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            sup.status === 'Active' ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {sup.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button className="p-2 text-gray-300 hover:text-slate-600 transition-colors"><ExternalLink size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* BULK OPERATIONS TAB */}
        {activeTab === 'bulk' && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Import Block */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/20 text-teal-600 rounded-2xl flex items-center justify-center">
                  <Upload size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">Database Import</h3>
                  <p className="text-xs text-gray-400 font-medium">Bulk upload or update items from external files</p>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-2xl p-12 text-center mb-8 hover:border-teal-200 transition-all cursor-pointer bg-gray-50/30">
                <FileCode size={40} className="mx-auto text-gray-300 mb-4" />
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Drag and drop file here</p>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Supported: .CSV, .XLSX, .SQL, .JSON</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="py-3 bg-teal-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-teal-900/10 hover:bg-teal-700 transition-all">
                  Initial Upload
                </button>
                <button className="py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all">
                  Bulk Update
                </button>
              </div>
            </div>

            {/* Export Block */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm transition-colors">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Download size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">System Export</h3>
                  <p className="text-xs text-gray-400 font-medium">Download full database snapshots in preferred formats</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {[
                  { id: 'sql', name: 'SQL Dump', icon: <FileCode size={14} />, color: 'text-blue-500' },
                  { id: 'csv', name: 'CSV File', icon: <FileText size={14} />, color: 'text-emerald-500' },
                  { id: 'xlsx', name: 'Excel', icon: <BarChart3 size={14} />, color: 'text-teal-500' },
                  { id: 'json', name: 'JSON Data', icon: <Database size={14} />, color: 'text-amber-500' },
                  { id: 'pdf', name: 'PDF Catalog', icon: <FileText size={14} />, color: 'text-rose-500' },
                  { id: 'txt', name: 'Raw Text', icon: <Globe size={14} />, color: 'text-slate-400' },
                ].map(format => (
                  <button key={format.id} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all border border-transparent hover:border-teal-100 group">
                    <span className={format.color}>{format.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 group-hover:text-teal-600">{format.id}</span>
                  </button>
                ))}
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl">
                <div className="flex gap-3">
                  <AlertTriangle size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] font-bold text-blue-700 dark:text-blue-400 leading-relaxed uppercase tracking-wider">
                    Exports include all SKU metadata, stock levels, and linked suppliers. Large databases may take up to 2 minutes to compile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
