
import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import CarriageKPIs from '../components/carriage/CarriageKPIs';
import CarriageTrendChart from '../components/carriage/CarrendChart';
import CarriageTable from '../components/carriage/CarriageTable';
import AddCarriageModal from '../components/carriage/AddCarriageModal';

// Fix: typo in chart import corrected from previous conceptual notes
import CarriageTrendChartActual from '../components/carriage/CarriageTrendChart';

interface CarriageInwardsPageProps {
  onBack: () => void;
}

const CarriageInwardsPage: React.FC<CarriageInwardsPageProps> = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);

  // Mock Global Stats for KPIs
  const totalThisMonth = 4570;
  const totalEntries = 124;
  const uniqueSuppliers = 12;

  const handleSuccess = () => {
    setShowForm(false);
    // In a real app, this would trigger a refetch of data
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              Carriage <span className="text-teal-600">Inwards</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
              Tracking transportation costs for incoming inventory
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all"
          >
            <Plus size={18} />
            <span>Add Entry</span>
          </button>
        </div>
      </header>

      {/* Main Grid: Analytics & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <CarriageKPIs 
          totalThisMonth={totalThisMonth} 
          totalEntries={totalEntries} 
          uniqueSuppliers={uniqueSuppliers} 
        />
        <CarriageTrendChartActual />
      </div>

      {/* Search & List Section */}
      <CarriageTable />

      {/* Provision Modal */}
      {showForm && (
        <AddCarriageModal 
          onClose={() => setShowForm(false)} 
          onSuccess={handleSuccess} 
        />
      )}
    </div>
  );
};

export default CarriageInwardsPage;
