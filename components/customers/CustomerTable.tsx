
import React, { useState, useMemo } from 'react';
import { Search, Filter, CheckCircle2, X, RefreshCcw, AlertCircle, User, Save, Loader2, Camera, ShieldCheck } from 'lucide-react';
import CustomerTableRow from './CustomerTableRow';
import CustomerPagination from './CustomerPagination';

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  spent: number;
  orders: number;
  lastOrder: string;
  status: 'VIP' | 'Regular' | 'New' | 'At Risk';
  avatar: string;
}

const INITIAL_CUSTOMER_DATA: CustomerRecord[] = [
  { id: '1', name: 'Alexander Wright', email: 'alex.w@example.com', phone: '+1 234 567 890', spent: 12450, orders: 42, lastOrder: '2024-05-20', status: 'VIP', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Sarah Jenkins', email: 's.jenkins@example.com', phone: '+1 987 654 321', spent: 8200, orders: 28, lastOrder: '2024-05-18', status: 'VIP', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Marcus Chen', email: 'm.chen@example.com', phone: '+1 444 555 666', spent: 3100, orders: 12, lastOrder: '2024-05-10', status: 'Regular', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Elena Rodriguez', email: 'elena.r@example.com', phone: '+1 222 333 444', spent: 450, orders: 2, lastOrder: '2024-05-22', status: 'New', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'David Smith', email: 'd.smith@example.com', phone: '+1 777 888 999', spent: 5600, orders: 19, lastOrder: '2024-03-01', status: 'At Risk', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: '6', name: 'Linda Omondi', email: 'linda.o@example.io', phone: '+254 711 000 111', spent: 9800, orders: 31, lastOrder: '2024-06-01', status: 'VIP', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: '7', name: 'James Wilson', email: 'james.w@outlook.com', phone: '+1 555 123 456', spent: 1200, orders: 5, lastOrder: '2024-05-28', status: 'Regular', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: '8', name: 'Sophia Loren', email: 'sophia@studio.it', phone: '+39 02 1234567', spent: 15400, orders: 52, lastOrder: '2024-06-05', status: 'VIP', avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: '9', name: 'Kenji Sato', email: 'sato@tokyo-net.jp', phone: '+81 3 1234 5678', spent: 4200, orders: 14, lastOrder: '2024-04-12', status: 'Regular', avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: '10', name: 'Aria Montgomery', email: 'aria.m@rosewood.com', phone: '+1 610 555 0192', spent: 150, orders: 1, lastOrder: '2024-06-10', status: 'New', avatar: 'https://i.pravatar.cc/150?u=10' },
  { id: '11', name: 'Victor Hugo', email: 'v.hugo@lesmis.fr', phone: '+33 1 45 67 89 00', spent: 2800, orders: 8, lastOrder: '2024-01-15', status: 'At Risk', avatar: 'https://i.pravatar.cc/150?u=11' },
  { id: '12', name: 'Clara Oswald', email: 'impossible.girl@tardis.co', phone: '+44 20 7946 0000', spent: 6700, orders: 22, lastOrder: '2024-05-25', status: 'Regular', avatar: 'https://i.pravatar.cc/150?u=12' },
  { id: '13', name: 'Nina Simone', email: 'nina@highpriestess.com', phone: '+1 828 555 0100', spent: 11000, orders: 38, lastOrder: '2024-06-08', status: 'VIP', avatar: 'https://i.pravatar.cc/150?u=13' },
  { id: '14', name: 'Amara Walker', email: 'amara.w@star.net', phone: '+234 802 345 6789', spent: 300, orders: 2, lastOrder: '2024-06-02', status: 'New', avatar: 'https://i.pravatar.cc/150?u=14' },
  { id: '15', name: 'Dante Alighieri', email: 'dante@divina.it', phone: '+39 055 123456', spent: 50, orders: 1, lastOrder: '2023-12-25', status: 'At Risk', avatar: 'https://i.pravatar.cc/150?u=15' },
];

interface CustomerTableProps {
  onViewProfile: (id: string) => void;
  onViewHistory: (id: string) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ onViewProfile, onViewHistory }) => {
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_CUSTOMER_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionFeedback, setActionFeedback] = useState<{msg: string, type: 'success' | 'alert'} | null>(null);
  
  // Edit Modal State
  const [editingCustomer, setEditingCustomer] = useState<CustomerRecord | null>(null);
  const [isEditSaving, setIsEditSaving] = useState(false);

  const itemsPerPage = 5;

  // Filter Logic
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.includes(searchQuery);
      
      const matchesStatus = statusFilter === 'All Statuses' || c.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, statusFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredCustomers.length);

  const handleAction = (message: string, type: 'success' | 'alert' = 'success') => {
    setActionFeedback({ msg: message, type });
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleDelete = (id: string) => {
    const customerToDelete = customers.find(c => c.id === id);
    setCustomers(prev => prev.filter(c => c.id !== id));
    handleAction(`Account for ${customerToDelete?.name} permanently removed.`, 'alert');
    // If the last item on the current page was deleted, move back a page
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (customer: CustomerRecord) => {
    setEditingCustomer(customer);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;
    setIsEditSaving(true);
    
    // Simulate API delay
    setTimeout(() => {
      setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? editingCustomer : c));
      setIsEditSaving(false);
      setEditingCustomer(null);
      handleAction(`Changes to ${editingCustomer.name} saved successfully.`);
    }, 1200);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All Statuses');
    setCurrentPage(1);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden relative">
      {/* Local Feedback Toast */}
      {actionFeedback && (
        <div className="fixed bottom-8 right-8 z-[110] animate-in slide-in-from-right-8 duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
            {actionFeedback.type === 'success' ? (
              <CheckCircle2 size={18} className="text-teal-400" />
            ) : (
              <AlertCircle size={18} className="text-rose-400" />
            )}
            <span className="text-[11px] font-bold tracking-tight uppercase">{actionFeedback.msg}</span>
          </div>
        </div>
      )}

      <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/20 dark:bg-slate-800/20">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by name, email or ID..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-xs font-bold ${
                statusFilter !== 'All Statuses' 
                ? 'bg-teal-50 border-teal-200 text-teal-600' 
                : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Filter size={16} />
              {statusFilter}
            </button>
            
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 z-50 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {['All Statuses', 'VIP', 'Regular', 'New', 'At Risk'].map(status => (
                    <button
                      key={status}
                      onClick={() => { setStatusFilter(status); setIsFilterOpen(false); setCurrentPage(1); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                        statusFilter === status ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/30' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <button 
            onClick={resetFilters}
            title="Reset Grid"
            className="p-2.5 text-gray-400 hover:text-teal-600 transition-colors bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm"
          >
            <RefreshCcw size={18} />
          </button>
          
          <div className="h-8 w-px bg-gray-200 dark:bg-slate-800" />
          <p className="text-[10px] font-black text-gray-400 px-2 uppercase tracking-widest">Matches: {filteredCustomers.length}</p>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[350px]">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Profile</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">LTV (Spent)</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Orders</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Last Visit</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {currentItems.length > 0 ? (
              currentItems.map((customer) => (
                <CustomerTableRow 
                  key={customer.id} 
                  customer={customer} 
                  onAction={handleAction}
                  onDelete={() => handleDelete(customer.id)}
                  onEdit={() => handleEdit(customer)}
                  onViewProfile={() => onViewProfile(customer.id)}
                  onViewHistory={() => onViewHistory(customer.id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-24 text-center">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-gray-300 mx-auto mb-6">
                    <Search size={40} />
                  </div>
                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">No matching records</h4>
                  <p className="text-xs text-gray-400 mt-2 font-medium">Try adjusting your search or status filters</p>
                  <button onClick={resetFilters} className="mt-8 px-6 py-2.5 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-900/10">Clear all filters</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {filteredCustomers.length > 0 && (
        <CustomerPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalResults={filteredCustomers.length}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      )}

      {/* EDIT CUSTOMER MODAL */}
      {editingCustomer && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setEditingCustomer(null)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
             <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-900/20">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Edit Customer Profile</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Registry Management Node</p>
                  </div>
                </div>
                <button onClick={() => setEditingCustomer(null)} className="p-3 bg-gray-50 dark:bg-slate-800 text-gray-400 rounded-2xl hover:text-rose-500 transition-all shadow-sm">
                  <X size={22} />
                </button>
             </div>

             <form onSubmit={saveEdit} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                <div className="flex flex-col items-center mb-4">
                   <div className="relative group">
                      <img src={editingCustomer.avatar} className="w-24 h-24 rounded-3xl object-cover ring-4 ring-gray-50 dark:ring-slate-800 shadow-xl" />
                      <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                         <Camera size={24} className="text-white" />
                      </div>
                   </div>
                   <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mt-4">Change Profile Picture</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Full Legal Name</label>
                      <input 
                        type="text" 
                        value={editingCustomer.name}
                        onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" 
                        required
                      />
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Primary Contact Email</label>
                      <input 
                        type="email" 
                        value={editingCustomer.email}
                        onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" 
                        required
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Mobile/Direct Phone</label>
                      <input 
                        type="text" 
                        value={editingCustomer.phone}
                        onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" 
                      />
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Client Standing</label>
                      <select 
                        value={editingCustomer.status}
                        onChange={(e) => setEditingCustomer({...editingCustomer, status: e.target.value as any})}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none cursor-pointer"
                      >
                         <option value="VIP">VIP Platinum</option>
                         <option value="Regular">Regular Member</option>
                         <option value="New">Newly Registered</option>
                         <option value="At Risk">At Risk / Inactive</option>
                      </select>
                   </div>
                </div>

                <div className="p-6 bg-teal-50 dark:bg-teal-950/20 rounded-3xl border border-teal-100 dark:border-teal-900/30 flex gap-4">
                   <ShieldCheck size={24} className="text-teal-600 shrink-0 mt-0.5" />
                   <p className="text-[10px] font-black text-teal-700 dark:text-teal-300 leading-relaxed uppercase tracking-wider">
                     Verification Check: Modifying customer identity details will be logged in the global audit trail. Loyalty points and purchase history remain tethered to the unique ID.
                   </p>
                </div>
             </form>

             <div className="p-8 bg-white dark:bg-slate-900 border-t border-gray-50 dark:border-slate-800 shrink-0 flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setEditingCustomer(null)} 
                  className="flex-1 py-4 bg-gray-100 dark:bg-slate-800 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={isEditSaving} 
                  onClick={saveEdit} 
                  className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-teal-900/20 hover:bg-teal-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  {isEditSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Commit Changes <Save size={18} />
                    </>
                  )}
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
