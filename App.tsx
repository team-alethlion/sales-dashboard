
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import { SalesVsTargetChart, ProfitAndLossChart, SalesByStoreChart } from './components/DashboardCharts';
import DateRangePicker from './components/DateRangePicker';
import GrowthChart from './components/GrowthChart';
import ActivityFeed from './components/ActivityFeed';
import GlobalSearchModal from './components/GlobalSearchModal';
import { Search, Bell, Maximize, ChevronDown, Sparkles, X, Sun, Moon, Filter } from 'lucide-react';
import { getDashboardInsights } from './services/geminiService';
import { branchDatabase } from './data/branches';

const App: React.FC = () => {
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(branchDatabase.branches[0].id);
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-06-30'
  });

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const currentBranch = useMemo(() => {
    return branchDatabase.branches.find(b => b.id === selectedBranchId) || branchDatabase.branches[0];
  }, [selectedBranchId]);

  // Updated range mapping to better handle the Jan-Jun demo data
  const rangeIndices = useMemo(() => {
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);
    
    // For demo purposes, we clamp to the first 6 months (0-5)
    const startIdx = Math.max(0, Math.min(5, start.getMonth()));
    const endIdx = Math.max(startIdx, Math.min(5, end.getMonth()));
    
    return { start: startIdx, end: endIdx };
  }, [dateRange]);

  const filteredSalesData = useMemo(() => {
    return currentBranch.salesData.slice(rangeIndices.start, rangeIndices.end + 1);
  }, [rangeIndices, currentBranch]);

  const filteredProfitData = useMemo(() => {
    return currentBranch.profitLossData.slice(rangeIndices.start, rangeIndices.end + 1);
  }, [rangeIndices, currentBranch]);

  const stats = useMemo(() => {
    const totalSales = filteredSalesData.reduce((acc, curr) => acc + curr.sales, 0);
    const totalProfit = filteredProfitData.reduce((acc, curr) => acc + (curr.income - curr.expense), 0);
    const totalCost = filteredProfitData.reduce((acc, curr) => acc + curr.expense, 0);

    return {
      sales: totalSales,
      profit: totalProfit,
      cost: totalCost
    };
  }, [filteredSalesData, filteredProfitData]);

  const generateInsights = async () => {
    setLoadingInsights(true);
    try {
      const dataToAnalyze = {
        branch: currentBranch.name,
        period: `${dateRange.start} to ${dateRange.end}`,
        totalSales: stats.sales,
        performance: filteredSalesData,
        categories: currentBranch.categoryData
      };
      const result = await getDashboardInsights(dataToAnalyze);
      setAiInsights(result || null);
    } catch (error) {
      console.error("Failed to generate AI insights:", error);
    } finally {
      setLoadingInsights(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f3f4f6] dark:bg-slate-950 text-slate-700 dark:text-slate-300 overflow-hidden transition-colors duration-300">
      <Sidebar />
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Sales Analysis <span className="text-teal-600">Overview</span></h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Monitoring {currentBranch.name} performance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="group hidden sm:flex items-center gap-3 px-3 py-2 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:border-teal-200 dark:hover:border-teal-800 transition-all"
            >
              <Search size={18} className="text-gray-400 group-hover:text-teal-600" />
              <span className="text-sm text-gray-400 font-medium mr-4">Search...</span>
              <kbd className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>
            
            <div className="h-8 w-px bg-gray-200 dark:bg-slate-800 mx-1 hidden md:block" />

            <button 
              className="sm:hidden p-2.5 text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all active:scale-95"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} />
            </button>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2.5 text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all active:scale-95"
            >
              {isDarkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-slate-600" />}
            </button>

            <button className="flex items-center gap-2 px-4 py-2.5 text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all font-bold text-sm">
              <Maximize size={18} />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>
          </div>
        </header>

        {/* Global Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex flex-wrap items-center gap-4">
            <DateRangePicker range={dateRange} onChange={setDateRange} />
            
            <div className="relative">
              <button 
                onClick={() => setIsBranchMenuOpen(!isBranchMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">🏢 {currentBranch.name}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isBranchMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isBranchMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-800 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                  {branchDatabase.branches.map(branch => (
                    <button
                      key={branch.id}
                      onClick={() => {
                        setSelectedBranchId(branch.id);
                        setIsBranchMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        selectedBranchId === branch.id 
                        ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-bold' 
                        : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {branch.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
             <button 
              onClick={generateInsights}
              disabled={loadingInsights}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-100 dark:shadow-none hover:bg-teal-700 active:scale-95 transition-all"
            >
              <Sparkles size={18} />
              {loadingInsights ? 'Analyzing...' : 'AI Insights'}
            </button>
            <button className="flex-1 sm:flex-none px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-slate-600 active:scale-95 transition-all">
              Export PDF
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
              <div className="flex-1">
                <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Branch Performance Report</h3>
                <div className="text-sm text-teal-800 dark:text-teal-200 space-y-2 prose prose-sm dark:prose-invert max-w-none">
                  {aiInsights.split('\n').map((line, i) => (
                    <p key={i} className="mb-0">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            label="REVENUE GENERATED" 
            value={`$${stats.sales.toLocaleString()}`} 
            subValue={`vs target: +$${(stats.sales * 0.1).toLocaleString()}`} 
            change="14.2" 
            isPositive={true} 
            barColor="bg-teal-500" 
          />
          <StatCard 
            label="OPERATIONAL COST" 
            value={`$${stats.cost.toLocaleString()}`} 
            subValue="Mainly logistics & staff" 
            change="3.1" 
            isPositive={false} 
            barColor="bg-rose-400" 
          />
          <StatCard 
            label="NET MARGIN" 
            value={`$${stats.profit.toLocaleString()}`} 
            subValue="After all expenses" 
            change="9.5" 
            isPositive={true} 
            barColor="bg-teal-500" 
          />
        </div>

        {/* Primary Analysis Row */}
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
            <SalesByStoreChart data={currentBranch.categoryData} />
            <div className="mt-6 pt-6 border-t border-gray-50 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">Highest Category</span>
                <span className="text-xs font-bold text-teal-600">{currentBranch.categoryData[0].location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Growth Potential</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Analysis Row */}
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
            <GrowthChart data={currentBranch.growthData} />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-12 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">BRANCH LOGS & ACTIVITY</h3>
              <button className="text-[10px] font-bold text-teal-600 hover:underline">MARK ALL AS READ</button>
            </div>
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
