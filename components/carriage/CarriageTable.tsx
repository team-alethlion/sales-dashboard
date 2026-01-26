
import React, { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';

const MOCK_CARRIAGE_ENTRIES = [
  { id: 'CI-001', supplier: 'LogiLink Logistics', details: 'Freight for Electronics SKU-402', amount: 1200, date: '2024-06-12', account: 'Main Petty Cash', status: 'Cleared' },
  { id: 'CI-002', supplier: 'Global Tech Inc.', details: 'Express shipping for server components', amount: 450, date: '2024-06-14', account: 'Bank Deposit', status: 'Pending' },
  { id: 'CI-003', supplier: 'Mombasa Transporters', details: 'Bulk shipment handling - Apparel', amount: 2800, date: '2024-06-15', account: 'Business Account', status: 'Cleared' },
  { id: 'CI-004', supplier: 'DHL Express', details: 'Sample delivery from UK', amount: 120, date: '2024-06-18', account: 'M-Pesa Business', status: 'Cleared' },
];

const CarriageTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = MOCK_CARRIAGE_ENTRIES.filter(e => 
    e.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-slate-800/30">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by ID, supplier or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-500 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 hover:bg-gray-50 transition-colors">
            <Filter size={14} /> Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Entry ID</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Supplier & Details</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Payment Info</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {filteredEntries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-5">
                  <span className="text-xs font-bold text-gray-400">#{entry.id}</span>
                </td>
                <td className="px-6 py-5">
                  <div>
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">{entry.supplier}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{entry.details}</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-xs text-gray-500 font-bold">{entry.date}</p>
                </td>
                <td className="px-6 py-5 text-right">
                  <p className="text-sm font-black text-slate-800 dark:text-slate-100">${entry.amount.toLocaleString()}</p>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{entry.account}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    entry.status === 'Cleared' ? 'bg-teal-50 text-teal-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {entry.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <button className="p-2 text-gray-300 hover:text-slate-600 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarriageTable;
