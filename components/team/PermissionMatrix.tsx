
import React, { useState, useEffect } from 'react';
import { ShieldCheck, ChevronRight, Layers, Loader2, CheckCircle2 } from 'lucide-react';

const MODULES = [
  { id: 'sales', label: 'Sales Operations', permissions: ['Process Returns', 'Manual Discount', 'Price Overrides', 'Delete Transactions'] },
  { id: 'inventory', label: 'Inventory Control', permissions: ['Manual Stock Adjustment', 'Inter-branch Transfer', 'Supplier Management', 'Cost Price View'] },
  { id: 'finance', label: 'Finance & P&L', permissions: ['View Net Profit', 'Export Ledgers', 'Manage Cash Accounts', 'Tax Rule Editing'] },
  { id: 'system', label: 'System Admin', permissions: ['Manage Users', 'API Access', 'Hardware Pairing', 'License Controls'] },
];

const ROLES = ['Super Admin', 'Branch Manager', 'Accountant', 'Inventory Lead', 'Cashier'];

// Define all permission keys for state tracking
const ALL_PERMS = MODULES.flatMap(m => m.permissions);

const INITIAL_ROLE_STATES: Record<number, Record<string, boolean>> = {
  // Super Admin: Everything true
  0: ALL_PERMS.reduce((acc, p) => ({ ...acc, [p]: true }), {}),
  
  // Branch Manager: Most things except high-level system/delete
  1: ALL_PERMS.reduce((acc, p) => ({ 
    ...acc, 
    [p]: !['Delete Transactions', 'API Access', 'License Controls'].includes(p) 
  }), {}),
  
  // Accountant: Only Finance
  2: ALL_PERMS.reduce((acc, p) => ({ 
    ...acc, 
    [p]: MODULES.find(m => m.id === 'finance')?.permissions.includes(p) || false 
  }), {}),
  
  // Inventory Lead: Only Inventory
  3: ALL_PERMS.reduce((acc, p) => ({ 
    ...acc, 
    [p]: MODULES.find(m => m.id === 'inventory')?.permissions.includes(p) || false 
  }), {}),
  
  // Cashier: Only basic Sales
  4: ALL_PERMS.reduce((acc, p) => ({ 
    ...acc, 
    [p]: ['Process Returns'].includes(p) // Example: only process returns
  }), {}),
};

const PermissionMatrix: React.FC = () => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [rolePermissions, setRolePermissions] = useState(INITIAL_ROLE_STATES);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const togglePermission = (perm: string) => {
    // Prevent modifying Super Admin for this demo if desired, 
    // but usually Admins want to toggle themselves too.
    setRolePermissions(prev => ({
      ...prev,
      [selectedRoleIndex]: {
        ...prev[selectedRoleIndex],
        [perm]: !prev[selectedRoleIndex][perm]
      }
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const currentPerms = rolePermissions[selectedRoleIndex] || {};

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Role Selector Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 mb-6">Security Roles</h3>
          {ROLES.map((role, i) => (
            <button 
              key={i} 
              onClick={() => setSelectedRoleIndex(i)} 
              className={`w-full p-6 rounded-[2rem] border transition-all text-left flex items-center justify-between group ${
                selectedRoleIndex === i 
                ? 'bg-teal-600 border-teal-600 text-white shadow-xl shadow-teal-900/10' 
                : 'bg-white dark:bg-slate-900 border-gray-50 dark:border-slate-800 hover:border-teal-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedRoleIndex === i ? 'bg-white/20' : 'bg-gray-50 dark:bg-slate-800 text-gray-400'}`}>
                  <ShieldCheck size={20} />
                </div>
                <span className="text-sm font-black uppercase tracking-tight">{role}</span>
              </div>
              <ChevronRight size={18} className={selectedRoleIndex === i ? 'text-white' : 'text-gray-300'} />
            </button>
          ))}
        </div>

        {/* Permission Grid */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-gray-50 dark:border-slate-800 shadow-sm relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
            <div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                {ROLES[selectedRoleIndex]} <span className="text-teal-600">Clearance</span>
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-widest">
                Granular Resource Allocation Matrix
              </p>
            </div>
            
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center gap-2 ${
                saveSuccess 
                ? 'bg-emerald-500 text-white shadow-emerald-900/20' 
                : 'bg-slate-900 dark:bg-slate-700 text-white hover:bg-black'
              }`}
            >
              {isSaving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : saveSuccess ? (
                <CheckCircle2 size={16} />
              ) : null}
              {isSaving ? 'Processing...' : saveSuccess ? 'Registry Updated' : 'Save Registry'}
            </button>
          </div>

          <div className="space-y-12">
            {MODULES.map((mod) => (
              <section key={mod.id}>
                <div className="flex items-center gap-3 mb-6 border-b border-gray-50 dark:border-slate-800 pb-4">
                  <Layers size={18} className="text-teal-600" />
                  <h4 className="text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-[0.2em]">
                    {mod.label}
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 px-2">
                  {mod.permissions.map((perm, pi) => {
                    const isActive = currentPerms[perm];
                    return (
                      <div 
                        key={pi} 
                        className="flex items-center justify-between group cursor-pointer"
                        onClick={() => togglePermission(perm)}
                      >
                        <span className={`text-xs font-bold transition-colors ${
                          isActive ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'
                        } group-hover:text-teal-600`}>
                          {perm}
                        </span>
                        
                        <div className={`w-10 h-5 rounded-full relative transition-all duration-300 shadow-inner ${
                          isActive ? 'bg-teal-600' : 'bg-gray-200 dark:bg-slate-800'
                        }`}>
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 shadow-sm ${
                            isActive ? 'left-6' : 'left-1'
                          }`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Verification Callout */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border border-gray-100 dark:border-slate-800 flex items-start gap-4">
            <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-teal-600 shadow-sm shrink-0">
               <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Policy Enforcement</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-500 font-medium mt-1 leading-relaxed">
                Changes to the <span className="font-bold text-teal-600">{ROLES[selectedRoleIndex]}</span> role will propagate to all active operators assigned to this security tier across the branch network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionMatrix;
