
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ActivityFeed from './components/ActivityFeed';
import GlobalSearchModal from './components/GlobalSearchModal';
import DashboardHeader from './components/DashboardHeader';
import DashboardToolbar from './components/DashboardToolbar';
import InsightsCard from './components/InsightsCard';
import MetricStats from './components/MetricStats';
import PerformanceCharts from './components/PerformanceCharts';
import NewSalePage from './pages/NewSalePage';
import CustomersPage from './pages/CustomersPage';
import NewCustomerPage from './pages/NewCustomerPage';
import ProductsPage from './pages/ProductsPage';
import NewProductPage from './pages/NewProductPage';
import InventoryPage from './pages/InventoryPage';
import CarriageInwardsPage from './pages/CarriageInwardsPage';
import TransferPage from './pages/TransferPage';
import ExpensesPage from './pages/ExpensesPage';
import FinancePage from './pages/FinancePage';
import MessagingPage from './pages/MessagingPage';
import TasksPage from './pages/TasksPage';
import SupportPage from './pages/SupportPage';
import SupportAllArticlesPage from './pages/SupportAllArticlesPage';
import SupportArticleViewPage from './pages/SupportArticleViewPage';
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage';
import IssueReceiptPage from './pages/IssueReceiptPage';
import InvoiceHubPage from './pages/InvoiceHubPage';
import CreditSalePage from './pages/CreditSalePage';
import FormalQuotePage from './pages/FormalQuotePage';
import { getDashboardInsights } from './services/geminiService';
import { branchDatabase } from './data/branches';

type ViewType = 'dashboard' | 'sales' | 'new_sale' | 'customers' | 'new_customer' | 'products' | 'new_product' | 'inventory' | 'carriage_inwards' | 'transfer' | 'expenses' | 'finance' | 'messaging' | 'tasks' | 'support' | 'support_all' | 'support_article' | 'settings' | 'issue_receipt' | 'invoice_hub' | 'credit_sale' | 'formal_quote';

const App: React.FC = () => {
  // --- STATE ---
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
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

  // --- EFFECTS ---
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

  // --- DERIVED DATA ---
  const currentBranch = useMemo(() => {
    return branchDatabase.branches.find(b => b.id === selectedBranchId) || branchDatabase.branches[0];
  }, [selectedBranchId]);

  const rangeIndices = useMemo(() => {
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);
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
    return { sales: totalSales, profit: totalProfit, cost: totalCost };
  }, [filteredSalesData, filteredProfitData]);

  // --- HANDLERS ---
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

  const handleSidebarNavigate = (id: string) => {
    const validViews = ['dashboard', 'sales', 'customers', 'products', 'inventory', 'carriage_inwards', 'transfer', 'expenses', 'finance', 'messaging', 'tasks', 'support', 'settings'];
    if (validViews.includes(id)) {
      setCurrentView(id as any);
    }
  };

  return (
    <div className="flex h-screen bg-[#f3f4f6] dark:bg-slate-950 text-slate-700 dark:text-slate-300 overflow-hidden transition-colors duration-300">
      <Sidebar activeView={currentView} onNavigate={handleSidebarNavigate} />
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
        {currentView === 'dashboard' && (
          <DashboardPage onNavigate={setCurrentView as any} />
        )}

        {currentView === 'sales' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <DashboardHeader 
              branchName={currentBranch.name} 
              isDarkMode={isDarkMode} 
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
              onOpenSearch={() => setIsSearchOpen(true)}
              onNewSale={() => setCurrentView('new_sale')}
            />

            <DashboardToolbar 
              dateRange={dateRange}
              setDateRange={setDateRange}
              currentBranchName={currentBranch.name}
              branches={branchDatabase.branches}
              selectedBranchId={selectedBranchId}
              onBranchSelect={setSelectedBranchId}
              isBranchMenuOpen={isBranchMenuOpen}
              setIsBranchMenuOpen={setIsBranchMenuOpen}
              onGenerateInsights={generateInsights}
              loadingInsights={loadingInsights}
            />

            {aiInsights && (
              <InsightsCard insights={aiInsights} onClose={() => setAiInsights(null)} />
            )}

            <MetricStats stats={stats} />

            <PerformanceCharts 
              filteredSalesData={filteredSalesData}
              filteredProfitData={filteredProfitData}
              categoryData={currentBranch.categoryData}
              growthData={currentBranch.growthData}
              currentBranchName={currentBranch.name}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              <div className="lg:col-span-12 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">BRANCH LOGS & ACTIVITY</h3>
                  <button className="text-[10px] font-bold text-teal-600 hover:underline uppercase tracking-widest">MARK ALL AS READ</button>
                </div>
                <ActivityFeed />
              </div>
            </div>
          </div>
        )}

        {currentView === 'customers' && (
          <CustomersPage onNewCustomer={() => setCurrentView('new_customer')} />
        )}

        {currentView === 'products' && (
          <ProductsPage onNewProduct={() => setCurrentView('new_product')} />
        )}

        {currentView === 'inventory' && (
          <InventoryPage onCarriageInwards={() => setCurrentView('carriage_inwards')} />
        )}

        {currentView === 'carriage_inwards' && (
          <CarriageInwardsPage onBack={() => setCurrentView('inventory')} />
        )}

        {currentView === 'transfer' && (
          <TransferPage />
        )}

        {currentView === 'expenses' && (
          <ExpensesPage />
        )}

        {currentView === 'finance' && (
          <FinancePage />
        )}

        {currentView === 'messaging' && (
          <MessagingPage />
        )}

        {currentView === 'tasks' && (
          <TasksPage />
        )}

        {currentView === 'support' && (
          <SupportPage 
            onViewAllArticles={() => setCurrentView('support_all')}
            onViewArticle={() => setCurrentView('support_article')}
          />
        )}

        {currentView === 'support_all' && (
          <SupportAllArticlesPage 
            onBack={() => setCurrentView('support')} 
            onViewArticle={() => setCurrentView('support_article')}
          />
        )}

        {currentView === 'support_article' && (
          <SupportArticleViewPage onBack={() => setCurrentView('support_all')} />
        )}

        {currentView === 'settings' && (
          <SettingsPage />
        )}

        {currentView === 'new_product' && (
          <NewProductPage onBack={() => setCurrentView('products')} />
        )}

        {currentView === 'new_customer' && (
          <NewCustomerPage onBack={() => setCurrentView('customers')} />
        )}

        {currentView === 'new_sale' && (
          <NewSalePage onBack={() => setCurrentView('sales')} />
        )}

        {currentView === 'issue_receipt' && (
          <IssueReceiptPage onBack={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'invoice_hub' && (
          <InvoiceHubPage onBack={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'credit_sale' && (
          <CreditSalePage onBack={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'formal_quote' && (
          <FormalQuotePage onBack={() => setCurrentView('dashboard')} />
        )}
      </main>
    </div>
  );
};

export default App;
