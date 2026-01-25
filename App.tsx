
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import { SalesVsTargetChart, ProfitAndLossChart, SalesByStoreChart } from './components/DashboardCharts';
import DateRangePicker from './components/DateRangePicker';
import GrowthChart from './components/GrowthChart';
import ActivityFeed from './components/ActivityFeed';
import { Search, Bell, Maximize, ChevronDown, Sparkles, X, Sun, Moon } from 'lucide-react';
import { getDashboardInsights } from './services/geminiService';
import { SALES_CHART_DATA, PROFIT_LOSS_DATA, STORE_LOCATION_DATA } from './constants';

const App: React.FC = () => {
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Handle theme change on the html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-06-30'
  });

  const rangeIndices = useMemo(() => {
    const startMonth = new Date(dateRange.start).getMonth();
    const endMonth = new Date(dateRange.end).getMonth();
    return { start: startMonth, end: endMonth };
  }, [dateRange]);

  const filteredSalesData = useMemo(() => {
    return SALES_CHART_DATA.slice(rangeIndices.start, rangeIndices.end + 1);
  }, [rangeIndices]);

  const filteredProfitData = useMemo(() => {
    return PROFIT_LOSS_DATA.slice(rangeIndices.start, rangeIndices.end + 1);
  }, [rangeIndices]);

  const stats = useMemo(() => {
    const totalSales = filteredSalesData.reduce((acc, curr) => acc + curr.sales, 0);
    const totalProfit = filteredProfitData.reduce((acc, curr) => acc + curr.income - curr.expense, 0);
    const totalCost = filteredProfitData.reduce((acc, curr) => acc + curr.expense, 0);

    return {
      sales: totalSales,
      profit: totalProfit,
      cost: totalCost
    };
  }, [filteredSalesData, filteredProfitData]);

  const generateInsights = async () => {
    setLoadingInsights(true);
    const result = await getDashboardInsights({
      sales: filteredSalesData,
      profit: filteredProfitData,
      stores: STORE_LOCATION_DATA,
      range: dateRange
    });
    setAiInsights(result || null);
    setLoadingInsights(false);
  };

  return (
    <div className="flex h-screen bg-[#f3f4f6] dark:bg-slate-950 text-slate-700 dark:text-slate-300 overflow-hidden transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Good Morning, Nicholas 👋</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Welcome to Sales Analysis Dashboard</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2.5 text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <Search size={20} />
              </button>
            </div>
            <button className="p-2.5 text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2.5 text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all active:scale-95"
            >
              {isDarkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-slate-600" />}
            </button>

            <button className="flex items-center gap-2 px-4 py-2.5 text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all font-medium text-sm">
              <Maximize size={18} />
              Fullscreen
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <DateRangePicker range={dateRange} onChange={setDateRange} />
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">🏢 Select store Location</span>
              <ChevronDown size={16} className="text-gray-400 dark:text-slate-600" />
            </div>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={generateInsights}
              disabled={loadingInsights}
              className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-100 dark:shadow-none hover:bg-teal-700 active:scale-95 transition-all"
            >
              <Sparkles size={18} />
              {loadingInsights ? 'Analyzing...' : 'AI Insights'}
            </button>
            <button className="px-6 py-2.5 bg-teal-800 dark:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-100 dark:shadow-none hover:bg-teal-900 dark:hover:bg-teal-600 active:scale-95 transition-all">
              Customize
            </button>
          </div>
        </div>

        {/* AI Insight Box */}
        {aiInsights && (
          <div className="mb-8 bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 p-6 rounded-2xl relative animate-in fade-in slide-in-from-top-4 duration-500">
            <button 
              onClick={() => setAiInsights(null)}
              className="absolute top-4 right-4 text-teal-400 hover:text-teal-600 dark:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                <Sparkles size={24} className="text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Sales Intelligence Summary</h3>
                <div className="text-sm text-teal-800 dark:text-teal-200 space-y-1">
                  {aiInsights.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            label="TOTAL SALES" 
            value={`$${stats.sales.toLocaleString()}`} 
            subValue="Based on selected range" 
            change={`${(stats.sales * 0.05).toFixed(1)}`} 
            isPositive={true} 
            barColor="bg-teal-400" 
          />
          <StatCard 
            label="TOTAL COST" 
            value={`$${stats.cost.toLocaleString()}`} 
            subValue="Based on selected range" 
            change={`${(stats.cost * 0.02).toFixed(1)}`} 
            isPositive={false} 
            barColor="bg-rose-400" 
          />
          <StatCard 
            label="NET PROFIT" 
            value={`$${stats.profit.toLocaleString()}`} 
            subValue="Based on selected range" 
            change={`${(stats.profit * 0.1).toFixed(1)}`} 
            isPositive={true} 
            barColor="bg-teal-400" 
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 flex flex-col transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">PRODUCT SALE</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-teal-800"></div><span className="text-[10px] text-gray-500 dark:text-slate-500 font-bold uppercase">Store A</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-teal-100"></div><span className="text-[10px] text-gray-500 dark:text-slate-500 font-bold uppercase">Store B</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-teal-300"></div><span className="text-[10px] text-gray-500 dark:text-slate-500 font-bold uppercase">Store C</span></div>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center gap-4 py-8">
              <div className="w-24 h-24 rounded-full bg-teal-800 flex items-center justify-center text-white text-xl font-bold shadow-lg border-4 border-white dark:border-slate-800">
                {Math.round(stats.sales * 0.01)}
              </div>
              <div className="w-32 h-32 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-800 dark:text-teal-400 text-2xl font-extrabold shadow-sm border-4 border-white dark:border-slate-800 -mx-4 relative z-10">
                {Math.round(stats.sales * 0.05)}
              </div>
              <div className="w-20 h-20 rounded-full bg-teal-200 dark:bg-teal-700/50 flex items-center justify-center text-teal-800 dark:text-teal-300 text-lg font-bold shadow-sm border-4 border-white dark:border-slate-800">
                {Math.round(stats.sales * 0.02)}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">PROFIT AND LOSS</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div><span className="text-[10px] text-gray-500 dark:text-slate-500 font-bold uppercase">Income</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-slate-700"></div><span className="text-[10px] text-gray-500 dark:text-slate-500 font-bold uppercase">Expense</span></div>
              </div>
            </div>
            <ProfitAndLossChart data={filteredProfitData} />
          </div>

          <div className="lg:col-span-4 bg-teal-50 dark:bg-teal-950/20 p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <path d="M50 10 Q70 30 50 90 Q30 30 50 10" fill="currentColor" className="text-teal-900 dark:text-teal-400" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-teal-900 dark:text-teal-100 mb-2 max-w-[200px]">Scan receipts effortlessly, anywhere or import from excel</h3>
              <p className="text-xs text-teal-700 dark:text-teal-300 opacity-80 mb-6 max-w-[220px]">Automatic expense tracking with Code8's mobile app and web upload.</p>
            </div>
            <button className="w-max px-6 py-2.5 bg-teal-900 dark:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md hover:bg-black dark:hover:bg-teal-600 transition-all">
              Get Started
            </button>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-colors">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">SALES VS. TARGET OVER TIME</h3>
            </div>
            <div className="flex gap-12 mb-4">
              <div>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">${stats.sales.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase">TOTAL SALES</p>
              </div>
              <div className="w-px bg-gray-100 dark:bg-slate-800"></div>
              <div>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">${(stats.sales * 1.2).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase">TOTAL TARGET</p>
              </div>
            </div>
            <SalesVsTargetChart data={filteredSalesData} />
          </div>

          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-colors">
            <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6">SALES BY STORE LOCATION</h3>
            <div className="mb-4">
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">${stats.sales.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase">TOTAL SALES</p>
            </div>
            <SalesByStoreChart />
          </div>
        </div>

        {/* Row 3: Yearly Sales Growth & Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">YEARLY SALES GROWTH</h3>
            </div>
            <GrowthChart />
          </div>
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-colors">
            <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6">RECENT ACTIVITY</h3>
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
