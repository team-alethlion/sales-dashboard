
import React from 'react';
import { UserPlus, Download } from 'lucide-react';
import CustomerKPIs from '../components/customers/CustomerKPIs';
import CustomerCharts from '../components/customers/CustomerCharts';
import CustomerTable from '../components/customers/CustomerTable';

interface CustomersPageProps {
  onNewCustomer: () => void;
  onViewProfile: (id: string) => void;
  onViewHistory: (id: string) => void;
}

const CustomersPage: React.FC<CustomersPageProps> = ({ onNewCustomer, onViewProfile, onViewHistory }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Area */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Customer <span className="text-teal-600">Relationships</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
            Managing active clients across all branches
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onNewCustomer}
            className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all"
          >
            <UserPlus size={18} />
            <span>New Customer</span>
          </button>
          
          <div className="h-8 w-px bg-gray-200 dark:bg-slate-800 mx-1 hidden md:block" />
          
          <button className="flex items-center gap-2 px-4 py-2.5 text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all font-bold text-sm">
            <Download size={18} />
            <span className="hidden sm:inline">Export CRM</span>
          </button>
        </div>
      </header>

      <CustomerKPIs />
      <CustomerCharts />
      <CustomerTable onViewProfile={onViewProfile} onViewHistory={onViewHistory} />
    </div>
  );
};

export default CustomersPage;
