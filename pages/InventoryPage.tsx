
import React from 'react';
import { Truck } from 'lucide-react';
import InventoryKPIs from '../components/inventory/InventoryKPIs';
import TopSellingProducts from '../components/inventory/TopSellingProducts';
import StockValueChart from '../components/inventory/StockValueChart';
import CriticalStockTable from '../components/inventory/CriticalStockTable';

interface InventoryPageProps {
  onCarriageInwards: () => void;
  onViewFullReport: () => void;
  onViewProduct: (id: string) => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ onCarriageInwards, onViewFullReport, onViewProduct }) => {
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
      <InventoryKPIs />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Top Selling Products */}
        <TopSellingProducts 
          onViewFullReport={onViewFullReport}
          onViewProduct={onViewProduct}
        />

        {/* Stock Value Distribution */}
        <StockValueChart />
      </div>

      {/* Stock Health & Restock Table */}
      <CriticalStockTable />
    </div>
  );
};

export default InventoryPage;
