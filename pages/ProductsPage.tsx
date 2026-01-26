
import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Layers, 
  Truck, 
  Database
} from 'lucide-react';
import ProductKPIs from '../components/products/ProductKPIs';
import InventoryTab from '../components/products/InventoryTab';
import CategoriesTab from '../components/products/CategoriesTab';
import SuppliersTab from '../components/products/SuppliersTab';
import BulkOpsTab from '../components/products/BulkOpsTab';

type ActiveTab = 'inventory' | 'categories' | 'suppliers' | 'bulk';

const ProductsPage: React.FC<{ onNewProduct: () => void }> = ({ onNewProduct }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inventory');

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

      {/* KPI Stats Grid */}
      <ProductKPIs />

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

      {/* Tab Content Rendering */}
      <div className="space-y-6">
        {activeTab === 'inventory' && <InventoryTab />}
        {activeTab === 'categories' && <CategoriesTab />}
        {activeTab === 'suppliers' && <SuppliersTab />}
        {activeTab === 'bulk' && <BulkOpsTab />}
      </div>
    </div>
  );
};

export default ProductsPage;
