
import React from 'react';
import { SalesVsTargetChart, ProfitAndLossChart, SalesByStoreChart } from './DashboardCharts';
import GrowthChart from './GrowthChart';

interface PerformanceChartsProps {
  filteredSalesData: any[];
  filteredProfitData: any[];
  categoryData: any[];
  growthData: any[];
  currentBranchName: string;
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({
  filteredSalesData,
  filteredProfitData,
  categoryData,
  growthData
}) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">SALES VS. TARGET PERFORMANCE</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-teal-600"></div><span className="text-[10px] text-gray-400 font-bold">ACTUAL</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full border border-gray-200 dark:border-slate-700"></div><span className="text-[10px] text-gray-400 font-bold">TARGET</span></div>
            </div>
          </div>
          <SalesVsTargetChart data={filteredSalesData} />
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-colors">
          <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6">SALES BY PRODUCT CATEGORY</h3>
          <SalesByStoreChart data={categoryData} />
          <div className="mt-6 pt-6 border-t border-gray-50 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Highest Category</span>
              <span className="text-xs font-bold text-teal-600">{categoryData[0].location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Growth Potential</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">High</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
         <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">PROFITABILITY TRENDS</h3>
          </div>
          <ProfitAndLossChart data={filteredProfitData} />
          <div className="mt-4 text-center">
            <p className="text-[10px] text-gray-400 font-medium">Income vs Expense Monthly Variance</p>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">LONG-TERM GROWTH TRENDS (5Y)</h3>
          </div>
          <GrowthChart data={growthData} />
        </div>
      </div>
    </>
  );
};

export default PerformanceCharts;
