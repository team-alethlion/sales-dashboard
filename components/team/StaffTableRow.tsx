
import React, { useState } from 'react';
import { MoreVertical, ShieldCheck, History, ShieldAlert, UserX, Building, Loader2 } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  branch: string;
  status: string;
  clearance: string;
  avatar: string;
}

interface StaffTableRowProps {
  person: StaffMember;
  onAction: (id: string, action: string) => void;
}

const StaffTableRow: React.FC<StaffTableRowProps> = ({ person, onAction }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTriggerAction = (actionName: string) => {
    setIsMenuOpen(false);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onAction(person.id, actionName);
    }, 1500);
  };

  return (
    <tr className="hover:bg-gray-50/30 dark:hover:bg-slate-800/30 transition-colors group">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
            <div className="relative">
              <img src={person.avatar} className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-teal-200 transition-all shadow-sm" />
              {isProcessing && (
                <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 rounded-xl flex items-center justify-center">
                  <Loader2 size={16} className="text-teal-600 animate-spin" />
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-black text-slate-800 dark:text-slate-100">{person.name}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID: {person.id}</p>
            </div>
        </div>
      </td>
      <td className="px-8 py-6 font-bold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-tight">{person.role}</td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-2">
            <Building size={14} className="text-gray-300" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{person.branch}</span>
        </div>
      </td>
      <td className="px-8 py-6">
        <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase ${
          person.status === 'Online' ? 'text-emerald-500' : 'text-gray-400'
        }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${person.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
            {person.status}
        </span>
      </td>
      <td className="px-8 py-6">
        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
          person.clearance === 'Full Access' ? 'bg-teal-50 text-teal-600 border-teal-100' :
          person.clearance === 'Managerial' ? 'bg-blue-50 text-blue-600 border-blue-100' :
          'bg-gray-50 text-gray-400 border-gray-100'
        }`}>
            {person.clearance}
        </span>
      </td>
      <td className="px-8 py-6 text-center relative">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 transition-colors rounded-lg ${isMenuOpen ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-teal-600'}`}
        >
          <MoreVertical size={18} />
        </button>

        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-48 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-right-2 duration-200">
              <div className="p-1">
                <button onClick={() => handleTriggerAction('Permission Update')} className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <ShieldCheck size={14} className="text-teal-600" /> Modify Permissions
                </button>
                <button onClick={() => handleTriggerAction('Security Audit')} className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <History size={14} className="text-blue-500" /> Security Audit
                </button>
                <div className="h-px bg-gray-50 dark:bg-slate-700 my-1" />
                <button onClick={() => handleTriggerAction('Access Suspension')} className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors">
                  <ShieldAlert size={14} /> Suspend Access
                </button>
                <button onClick={() => handleTriggerAction('Termination')} className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-colors">
                  <UserX size={14} /> Terminate Operator
                </button>
              </div>
            </div>
          </>
        )}
      </td>
    </tr>
  );
};

export default StaffTableRow;
