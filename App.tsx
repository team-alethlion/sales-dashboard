
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import { SalesVsTargetChart, ProfitAndLossChart, SalesByStoreChart } from './components/DashboardCharts';
import { Search, Bell, Maximize, ChevronDown, Sparkles, X } from 'lucide-react';
import { getDashboardInsights } from './services/geminiService';
import { SALES_CHART_DATA, PROFIT_LOSS_DATA, STORE_LOCATION_DATA } from './constants';

const App: React.FC = () => {
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const generateInsights = async () => {
    setLoadingInsights(true);
    const result = await getDashboardInsights({
      sales: SALES_CHART_DATA,
      profit: PROFIT_LOSS_DATA,
      stores: STORE_LOCATION_DATA
    });
    setAiInsights(result || null);
    setLoadingInsights(false);
  };

  return (
    <div className="flex h-screen bg-[#f3f4f6] text-slate-700 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Good Morning, Miguel 👋</h1>
            <p className="text-sm text-gray-500 font-medium">Welcome to Sales Analysis Dashboard</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2.5 text-gray-400 bg-white rounded-xl border border-gray-100 shadow-sm hover:bg-gray-50">
                <Search size={20} />
              </button>
            </div>
            <button className="p-2.5 text-gray-400 bg-white rounded-xl border border-gray-100 shadow-sm hover:bg-gray-50 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 text-gray-600 bg-white rounded-xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-all font-medium text-sm">
              <Maximize size={18} />
              Fullscreen
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50">
              <span className="text-sm font-semibold text-slate-600">📅 Last 6 Month</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50">
              <span className="text-sm font-semibold text-slate-600">🏢 Select store Location</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={generateInsights}
              disabled={loadingInsights}
              className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-100 hover:bg-teal-700 active:scale-95 transition-all"
            >
              <Sparkles size={18} />
              {loadingInsights ? 'Analyzing...' : 'AI Insights'}
            </button>
            <button className="px-6 py-2.5 bg-teal-800 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-100 hover:bg-teal-900 active:scale-95 transition-all">
              Customize
            </button>
          </div>
        </div>

        {/* AI Insight Box */}
        {aiInsights && (
          <div className="mb-8 bg-teal-50 border border-teal-100 p-6 rounded-2xl relative animate-in fade-in slide-in-from-top-4 duration-500">
            <button 
              onClick={() => setAiInsights(null)}
              className="absolute top-4 right-4 text-teal-400 hover:text-teal-600 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Sparkles size={24} className="text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-teal-900 mb-2">Sales Intelligence Summary</h3>
                <div className="text-sm text-teal-800 space-y-1">
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
            label="SALES" 
            value="$37,829.21" 
            subValue="$1.2K YoY" 
            change="$2.5K" 
            isPositive={true} 
            barColor="bg-teal-400" 
          />
          <StatCard 
            label="PROFIT" 
            value="$5,483.83" 
            subValue="$1.2K YoY" 
            change="$1.4K" 
            isPositive={true} 
            barColor="bg-teal-400" 
          />
          <StatCard 
            label="TOTAL SALES COST" 
            value="$2,982.92" 
            subValue="$5.2K YoY" 
            change="$3.2K" 
            isPositive={false} 
            barColor="bg-rose-400" 
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">PRODUCT SALE</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-teal-800"></div><span className="text-[10px] text-gray-500 font-bold uppercase">Store A</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-teal-100"></div><span className="text-[10px] text-gray-500 font-bold uppercase">Store B</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-teal-300"></div><span className="text-[10px] text-gray-500 font-bold uppercase">Store C</span></div>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center gap-4 py-8">
              <div className="w-24 h-24 rounded-full bg-teal-800 flex items-center justify-center text-white text-xl font-bold shadow-lg border-4 border-white">229</div>
              <div className="w-32 h-32 rounded-full bg-teal-50 flex items-center justify-center text-teal-800 text-2xl font-extrabold shadow-sm border-4 border-white -mx-4 relative z-10">1,283</div>
              <div className="w-20 h-20 rounded-full bg-teal-200 flex items-center justify-center text-teal-800 text-lg font-bold shadow-sm border-4 border-white">622</div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">PROFIT AND LOSS</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div><span className="text-[10px] text-gray-500 font-bold uppercase">Income</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div><span className="text-[10px] text-gray-500 font-bold uppercase">Expense</span></div>
              </div>
            </div>
            <ProfitAndLossChart />
          </div>

          <div className="lg:col-span-4 bg-teal-50 p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <path d="M50 10 Q70 30 50 90 Q30 30 50 10" fill="currentColor" className="text-teal-900" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-teal-900 mb-2 max-w-[200px]">Scan receipts effortlessly, anywhere or import from excel</h3>
              <p className="text-xs text-teal-700 opacity-80 mb-6 max-w-[220px]">Automatic expense tracking with Enelys's mobile app and web upload.</p>
            </div>
            <button className="w-max px-6 py-2.5 bg-teal-900 text-white rounded-xl font-bold text-sm shadow-md hover:bg-black transition-all">
              Get Started
            </button>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">SALES VS. TARGET OVER TIME</h3>
            </div>
            <div className="flex gap-12 mb-4">
              <div>
                <p className="text-2xl font-bold text-slate-800">$37,829.21</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">TOTAL SALES</p>
              </div>
              <div className="w-px bg-gray-100"></div>
              <div>
                <p className="text-2xl font-bold text-slate-800">$20,000.00</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">TOTAL TARGET</p>
              </div>
            </div>
            <SalesVsTargetChart />
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">SALES BY STORE LOCATION</h3>
            <div className="mb-4">
              <p className="text-2xl font-bold text-slate-800">$37,829.21</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">TOTAL SALES</p>
            </div>
            <SalesByStoreChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
