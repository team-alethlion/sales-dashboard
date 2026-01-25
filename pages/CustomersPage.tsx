
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  TrendingUp, 
  Target, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MoreVertical, 
  ChevronRight,
  Filter,
  Download,
  Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CustomerRecord {
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

const CUSTOMER_DATA: CustomerRecord[] = [
  { id: '1', name: 'Alexander Wright', email: 'alex.w@example.com', phone: '+1 234 567 890', spent: 12450, orders: 42, lastOrder: '2024-05-20', status: 'VIP', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Sarah Jenkins', email: 's.jenkins@example.com', phone: '+1 987 654 321', spent: 8200, orders: 28, lastOrder: '2024-05-18', status: 'VIP', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Marcus Chen', email: 'm.chen@example.com', phone: '+1 444 555 666', spent: 3100, orders: 12, lastOrder: '2024-05-10', status: 'Regular', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Elena Rodriguez', email: 'elena.r@example.com', phone: '+1 222 333 444', spent: 450, orders: 2, lastOrder: '2024-05-22', status: 'New', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'David Smith', email: 'd.smith@example.com', phone: '+1 777 888 999', spent: 5600, orders: 19, lastOrder: '2024-03-01', status: 'At Risk', avatar: 'https://i.pravatar.cc/150?u=5' },
];

const SEGMENT_DATA = [
  { name: 'VIP/Champions', value: 35, color: '#0d9488' },
  { name: 'Loyal', value: 45, color: '#2dd4bf' },
  { name: 'New', value: 15, color: '#99f6e4' },
  { name: 'At Risk', value: 5, color: '#f43f5e' },
];

const CustomersPage: React.FC<{ onNewCustomer: () => void }> = ({ onNewCustomer }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = useMemo(() => 
    CUSTOMER_DATA.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase())),
  [searchQuery]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Area */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Customer <span className="text-teal-600">Relationships</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
            Managing {CUSTOMER_DATA.length} active clients across all branches
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

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Customers', value: '2,840', change: '+12.5%', icon: <Users className="text-blue-500" /> },
          { label: 'Retention Rate', value: '94.2%', change: '+2.1%', icon: <ShieldCheck className="text-teal-500" /> },
          { label: 'Avg. Lifetime Value', value: '$1,240', change: '+8.4%', icon: <TrendingUp className="text-emerald-500" /> },
          { label: 'Acquisition Cost', value: '$42.50', change: '-3.2%', icon: <Target className="text-rose-500" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">{stat.icon}</div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-teal-50 text-teal-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Lifecycle Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Customer Segments</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SEGMENT_DATA}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {SEGMENT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {SEGMENT_DATA.map((seg, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
                  <span className="text-xs font-bold text-gray-500">{seg.name}</span>
                </div>
                <span className="text-xs font-black text-slate-700 dark:text-slate-300">{seg.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth/Activity Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Growth & Engagement</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-teal-600"></div><span className="text-[10px] text-gray-400 font-bold uppercase">New Clients</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gray-200"></div><span className="text-[10px] text-gray-400 font-bold uppercase">Retention</span></div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { month: 'Jan', new: 400, ret: 240 },
                { month: 'Feb', new: 300, ret: 139 },
                { month: 'Mar', new: 200, ret: 980 },
                { month: 'Apr', new: 278, ret: 390 },
                { month: 'May', new: 189, ret: 480 },
                { month: 'Jun', new: 239, ret: 380 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="new" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ret" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Customer List Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, email or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 bg-gray-50 dark:bg-slate-800 text-gray-500 rounded-xl hover:bg-gray-100 transition-colors">
              <Filter size={18} />
            </button>
            <div className="h-8 w-px bg-gray-100 dark:bg-slate-800" />
            <p className="text-xs font-bold text-gray-400 px-2 uppercase tracking-widest">Rows: 10</p>
          </div>
        </div>

        <div className="overflow-x-auto">
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
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={customer.avatar} className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-teal-500/20 transition-all" />
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
                    <div className="flex justify-center items-center gap-2">
                      <button className="p-2 text-gray-300 hover:text-teal-600 transition-colors"><Mail size={16} /></button>
                      <button className="p-2 text-gray-300 hover:text-teal-600 transition-colors"><Phone size={16} /></button>
                      <button className="p-2 text-gray-300 hover:text-slate-600 transition-colors"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-gray-50/30 dark:bg-slate-800/30 flex items-center justify-between border-t border-gray-50 dark:border-slate-800">
          <p className="text-xs text-gray-400 font-medium tracking-tight">Showing 1 to 5 of 2,840 results</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-lg text-xs font-bold text-gray-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-bold shadow-md shadow-teal-900/10">1</button>
            <button className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-gray-50">2</button>
            <button className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
