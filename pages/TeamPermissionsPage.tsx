
import React, { useState, useMemo } from 'react';
import { ArrowLeft, UserPlus, CheckCircle2 } from 'lucide-react';
import PermissionKPIs from '../components/team/PermissionKPIs';
import StaffDirectory from '../components/team/StaffDirectory';
import PermissionMatrix from '../components/team/PermissionMatrix';
import AddStaffModal from '../components/team/AddStaffModal';

// --- MOCK DATA ---
const INITIAL_STAFF = [
  { id: 'STF-001', name: 'Nicholas S.', role: 'Super Admin', branch: 'Global Hub', status: 'Online', clearance: 'Full Access', avatar: 'https://picsum.photos/seed/nicholas/40/40' },
  { id: 'STF-002', name: 'Sarah Miller', role: 'Branch Manager', branch: 'Downtown', status: 'Online', clearance: 'Managerial', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: 'STF-003', name: 'Alexander Wright', role: 'Chief Cashier', branch: 'Airport', status: 'Offline', clearance: 'Restricted', avatar: 'https://i.pravatar.cc/150?u=alex' },
  { id: 'STF-004', name: 'Marcus Chen', role: 'Inventory Lead', branch: 'Commercial', status: 'Online', clearance: 'Restricted', avatar: 'https://i.pravatar.cc/150?u=marcus' },
  { id: 'STF-005', name: 'Elena Rodriguez', role: 'Sales Associate', branch: 'Downtown', status: 'Away', clearance: 'Restricted', avatar: 'https://i.pravatar.cc/150?u=elena' },
];

interface TeamPermissionsPageProps {
  onBack: () => void;
}

const TeamPermissionsPage: React.FC<TeamPermissionsPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'roles'>('directory');
  const [staff] = useState(INITIAL_STAFF);
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setActionToast(message);
    setTimeout(() => setActionToast(null), 3000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Action Toast */}
      {actionToast && (
        <div className="fixed bottom-20 lg:bottom-8 right-8 z-[150] animate-in slide-in-from-right-8 duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3">
            <CheckCircle2 size={20} className="text-teal-400" />
            <p className="text-sm font-bold tracking-tight">{actionToast}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl text-gray-500 hover:text-teal-600 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Security <span className="text-teal-600 italic">& Access</span></h1>
            <p className="text-sm text-gray-500 font-medium">Manage team members, roles, and granular security clearance</p>
          </div>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-3 px-6 py-4 bg-teal-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all"
        >
          <UserPlus size={18} /> Provision Operator
        </button>
      </header>

      <PermissionKPIs />

      {/* Main Tabs */}
      <div className="flex items-center gap-2 p-1 bg-gray-100/50 dark:bg-slate-800/50 rounded-2xl mb-12 w-fit border border-gray-100 dark:border-slate-800">
        {[
          { id: 'directory', name: 'Staff Directory' },
          { id: 'roles', name: 'Permission Matrix' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
              ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' 
              : 'text-gray-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {activeTab === 'directory' ? (
        <StaffDirectory staff={staff} onAction={showToast} />
      ) : (
        <PermissionMatrix />
      )}

      <AddStaffModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onSuccess={() => showToast("Credentials dispatched to new operator")}
      />
    </div>
  );
};

export default TeamPermissionsPage;
