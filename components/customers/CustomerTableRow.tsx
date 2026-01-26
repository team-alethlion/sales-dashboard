
import React, { useState } from 'react';
import { Star, Mail, Phone, MoreVertical, Eye, Edit3, History, Trash2 } from 'lucide-react';
import { CustomerRecord } from './CustomerTable';

interface CustomerTableRowProps {
  customer: CustomerRecord;
  onAction: (message: string, type?: 'success' | 'alert') => void;
  onDelete: () => void;
  onEdit: () => void;
  onViewProfile: () => void;
  onViewHistory: () => void;
}

const CustomerTableRow: React.FC<CustomerTableRowProps> = ({ customer, onAction, onDelete, onEdit, onViewProfile, onViewHistory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuAction = (callback: () => void) => {
    setIsMenuOpen(false);
    callback();
  };

  return (
    <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={customer.avatar} className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-teal-500/20 transition-all shadow-sm" alt={customer.name} />
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              {customer.name}
              {customer.status === 'VIP' && <Star size={12} className="fill-amber-400 text-amber-400" />}
            </p>
            <p className="text-[10px] text-gray-400 font-medium">{customer.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
          customer.status === 'VIP' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' :
          customer.status === 'New' ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/20' :
          customer.status === 'At Risk' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20' :
          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
        }`}>
          {customer.status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <p className="text-sm font-black text-slate-800 dark:text-slate-100">${customer.spent.toLocaleString()}</p>
        <div className="w-20 ml-auto h-1 bg-gray-100 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
          <div 
            className="h-full bg-teal-600 rounded-full" 
            style={{ width: `${Math.min(100, (customer.spent / 15000) * 100)}%` }} 
          />
        </div>
      </td>
      <td className="px-6 py-4 text-right font-bold text-slate-600 dark:text-slate-400">{customer.orders}</td>
      <td className="px-6 py-4 text-right text-xs text-gray-400 font-medium">
        {new Date(customer.lastOrder).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center items-center gap-2 relative">
          <button 
            onClick={() => onAction(`Draft email sent to ${customer.name}`)}
            className="p-2 text-gray-300 hover:text-teal-600 transition-colors hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg" 
            title="Email"
          >
            <Mail size={16} />
          </button>
          <button 
            onClick={() => onAction(`Dialing ${customer.phone}...`)}
            className="p-2 text-gray-300 hover:text-teal-600 transition-colors hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg" 
            title="Call"
          >
            <Phone size={16} />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-colors rounded-lg ${isMenuOpen ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
            >
              <MoreVertical size={16} />
            </button>

            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-48 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-right-2 duration-200">
                  <div className="p-1">
                    <button 
                      onClick={() => handleMenuAction(onViewProfile)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <Eye size={14} className="text-teal-600" /> View Profile
                    </button>
                    <button 
                      onClick={() => handleMenuAction(onEdit)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <Edit3 size={14} className="text-blue-500" /> Edit Details
                    </button>
                    <button 
                      onClick={() => handleMenuAction(onViewHistory)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <History size={14} className="text-amber-500" /> History
                    </button>
                    <div className="h-px bg-gray-50 dark:bg-slate-700 my-1" />
                    <button 
                      onClick={() => handleMenuAction(onDelete)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-colors"
                    >
                      <Trash2 size={14} /> Delete Record
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CustomerTableRow;
