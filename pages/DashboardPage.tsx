
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Users, 
  Package, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  MoreVertical, 
  LayoutGrid, 
  Calendar,
  Building,
  User,
  Activity,
  History,
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  ReceiptText,
  FileText,
  HandCoins,
  Quote,
  ShoppingBag,
  Plus
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

// --- MOCK DATA VARIANTS ---
const HOURLY_PERFORMANCE = [
  { label: '08:00', revenue: 1200, orders: 4 },
  { label: '10:00', revenue: 4500, orders: 12 },
  { label: '12:00', revenue: 8900, orders: 28 },
  { label: '14:00', revenue: 6700, orders: 19 },
  { label: '16:00', revenue: 12000, orders: 42 },
  { label: '18:00', revenue: 9500, orders: 31 },
  { label: '20:00', revenue: 3200, orders: 8 },
];

const DAILY_PERFORMANCE = [
  { label: 'Mon', revenue: 32000, orders: 110 },
  { label: 'Tue', revenue: 28000, orders: 95 },
  { label: 'Wed', revenue: 35000, orders: 125 },
  { label: 'Thu', revenue: 41000, orders: 140 },
  { label: 'Fri', revenue: 52000, orders: 180 },
  { label: 'Sat', revenue: 48000, orders: 165 },
  { label: 'Sun', revenue: 25000, orders: 85 },
];

const WEEKLY_PERFORMANCE = [
  { label: 'Week 1', revenue: 210000, orders: 740 },
  { label: 'Week 2', revenue: 195000, orders: 680 },
  { label: 'Week 3', revenue: 240000, orders: 850 },
  { label: 'Week 4', revenue: 228000, orders: 810 },
];

const MONTHLY_PERFORMANCE = [
  { label: 'Jan', revenue: 850000, orders: 3100 },
  { label: 'Feb', revenue: 790000, orders: 2850 },
  { label: 'Mar', revenue: 920000, orders: 3400 },
  { label: 'Apr', revenue: 880000, orders: 3200 },
  { label: 'May', revenue: 1100000, orders: 4100 },
  { label: 'Jun', revenue: 1050000, orders: 3900 },
];

const BRANCH_DISTRIBUTION = [
  { name: 'Downtown', value: 45000, color: '#0d9488' },
  { name: 'Airport', value: 32000, color: '#14b8a6' },
  { name: 'Commercial', value: 18000, color: '#5eead4' },
];

const ACTIVE_STAFF = [
  { name: 'Sarah Miller', role: 'Branch Manager', status: 'On Break', terminal: 'POS-01', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { name: 'Alexander Wright', role: 'Chief Cashier', status: 'Active', terminal: 'POS-02', avatar: 'https://i.pravatar.cc/150?u=alex' },
  { name: 'Marcus Chen', role: 'Inventory Clerk', status: 'Active', terminal: 'Warehouse-01', avatar: 'https://i.pravatar.cc/150?u=marcus' },
  { name: 'Elena Rodriguez', role: 'Sales Associate', status: 'Idle', terminal: 'POS-03', avatar: 'https://i.pravatar.cc/150?u=elena' },
  { name: 'David Kim', role: 'Dispatcher', status: 'Active', terminal: 'Dock-04', avatar: 'https://i.pravatar.cc/150?u=david' },
  { name: 'Linda Omondi', role: 'Accounts Lead', status: 'Active', terminal: 'HQ-Finance', avatar: 'https://i.pravatar.cc/150?u=linda' },
];

const CRITICAL_ALERTS = [
  { id: 1, type: 'stock', message: 'MacBook Pro stock critical (2 units remaining)', branch: 'Downtown', time: '12 mins ago' },
  { id: 2, type: 'transfer', message: 'Inter-branch transfer #TR-1024 delayed at customs', branch: 'Global', time: '1 hour ago' },
  { id: 3, type: 'finance', message: 'M-Pesa reconciliation mismatch detected for Till #892011', branch: 'Commercial', time: '3 hours ago' },
];

interface DashboardPageProps {
  onNavigate: (view: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [perfTab, setPerfTab] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>('hourly');

  const currentDateTime = new Date().toLocaleString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  const activeData = useMemo(() => {
    switch (perfTab) {
      case 'daily': return DAILY_PERFORMANCE;
      case 'weekly': return WEEKLY_PERFORMANCE;
      case 'monthly': return MONTHLY_PERFORMANCE;
      default: return HOURLY_PERFORMANCE;
    }
  }, [perfTab]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* 1. Command Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center justify-center text-teal-600">
               <Zap size={24} fill="currentColor" />
             </div>
             <div>
               <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">System <span className="text-teal-600 italic">Pulse</span></h1>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">{currentDateTime}</p>
             </div>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Cloud Hub Synchronized
            </span>
            <div className="w-px h-3 bg-gray-200 dark:bg-slate-800" />
            <span className="text-[10px] font-bold text-gray-400 uppercase">6 Operators Online</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden lg:block text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Terminal</p>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Nairobi Hub #402</p>
           </div>
           <button 
            onClick={() => onNavigate('quick_pos')}
            className="group flex items-center gap-3 px-6 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95"
           >
             Quick POS Terminal <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </section>

      {/* NEW: Quick Action Command Center */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
            <LayoutGrid size={16} className="text-teal-600" /> Operational Command
          </h3>
          <span className="text-[9px] font-black text-teal-600 uppercase bg-teal-50 px-2 py-0.5 rounded">Fast Lane</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { id: 'new_sale', name: 'Direct Checkout', sub: 'Instant POS sale', icon: <ShoppingBag size={24} />, color: 'bg-teal-600' },
            { id: 'issue_receipt', name: 'Issue Receipt', sub: 'Generate proof of purchase', icon: <ReceiptText size={24} />, color: 'bg-slate-800' },
            { id: 'invoice_hub', name: 'Invoice Hub', sub: 'B2B/Proforma creation', icon: <FileText size={24} />, color: 'bg-blue-600' },
            { id: 'credit_sale', name: 'Credit Sale', sub: 'Manage installments', icon: <HandCoins size={24} />, color: 'bg-amber-600' },
            { id: 'formal_quote', name: 'Formal Quote', sub: 'Price guarantee docs', icon: <Quote size={24} />, color: 'bg-rose-600' },
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => onNavigate(action.id)}
              className="group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left relative overflow-hidden"
            >
              <div className={`w-12 h-12 ${action.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <p className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight">{action.name}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-1 leading-tight">{action.sub}</p>
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <Plus size={16} className="text-teal-600" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 2. Executive KPI Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-teal-200 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <TrendingUp size={80} />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Daily Velocity</p>
          <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">$42,800</h3>
          <div className="flex items-center gap-1.5 mt-3">
            <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md"><ArrowUpRight size={14} /></div>
            <span className="text-[11px] font-black text-emerald-600">+12.4% <span className="text-gray-400 font-bold ml-1">vs yesterday</span></span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <Package size={80} />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Orders</p>
          <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">1,204</h3>
          <div className="flex items-center gap-1.5 mt-3">
            <div className="p-1 bg-blue-50 text-blue-600 rounded-md"><ArrowUpRight size={14} /></div>
            <span className="text-[11px] font-black text-blue-600">+4.1% <span className="text-gray-400 font-bold ml-1">avg. basket growth</span></span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-rose-200 transition-all">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <History size={80} />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Active Returns</p>
          <h3 className="text-3xl font-black text-rose-500">$2,140</h3>
          <div className="flex items-center gap-1.5 mt-3">
            <div className="p-1 bg-rose-50 text-rose-600 rounded-md"><ArrowDownRight size={14} /></div>
            <span className="text-[11px] font-black text-rose-600">-8.2% <span className="text-gray-400 font-bold ml-1">efficiency gain</span></span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-teal-200 transition-all">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <Users size={80} />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Customer Base</p>
          <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100">2.8k</h3>
          <div className="flex items-center gap-1.5 mt-3">
            <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md"><CheckCircle2 size={14} /></div>
            <span className="text-[11px] font-black text-emerald-600">89% <span className="text-gray-400 font-bold ml-1">retention rate</span></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* 3. Main Revenue Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-gray-50 dark:border-slate-800 shadow-sm">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight capitalize">{perfTab} Flow</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Intraday Revenue vs Orders volume</p>
              </div>
              <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 dark:bg-slate-800 rounded-2xl w-fit">
                 <button 
                  onClick={() => setPerfTab('hourly')}
                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${perfTab === 'hourly' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-gray-400 hover:text-slate-600'}`}
                 >
                   Hourly
                 </button>
                 <button 
                  onClick={() => setPerfTab('daily')}
                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${perfTab === 'daily' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-gray-400 hover:text-slate-600'}`}
                 >
                   Daily
                 </button>
                 <button 
                  onClick={() => setPerfTab('weekly')}
                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${perfTab === 'weekly' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-gray-400 hover:text-slate-600'}`}
                 >
                   Weekly
                 </button>
                 <button 
                  onClick={() => setPerfTab('monthly')}
                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${perfTab === 'monthly' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-gray-400 hover:text-slate-600'}`}
                 >
                   Monthly
                 </button>
              </div>
           </div>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={activeData}>
                 <defs>
                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                 <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} tickFormatter={(val) => `$${val >= 1000 ? (val/1000).toFixed(0) + 'k' : val}`} />
                 <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', background: '#0f172a', color: '#fff', padding: '12px' }} />
                 <Area type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={5} fillOpacity={1} fill="url(#colorRev)" animationDuration={600} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* 4. Branch Split */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-gray-50 dark:border-slate-800 shadow-sm flex flex-col">
           <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">Network Split</h3>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">Revenue contribution by location</p>
           
           <div className="flex-1 min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={BRANCH_DISTRIBUTION}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={10}
                    dataKey="value"
                  >
                    {BRANCH_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
           </div>

           <div className="space-y-4 pt-8 border-t border-gray-50 dark:border-slate-800">
              {BRANCH_DISTRIBUTION.map((b, i) => (
                <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                     <span className="text-[11px] font-black uppercase text-slate-500">{b.name}</span>
                   </div>
                   <span className="text-xs font-black text-slate-800 dark:text-slate-100">${(b.value / 1000).toFixed(1)}k</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 5. Staff Presence Board */}
        <div className="lg:col-span-4 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Users size={16} className="text-teal-600" /> Active Shift
              </h3>
              <span className="text-[10px] font-black text-teal-600 uppercase">Live View</span>
           </div>

           <div className="space-y-3">
              {ACTIVE_STAFF.map((staff, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-teal-300 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={staff.avatar} className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-teal-200 transition-all" />
                      <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                        staff.status === 'Active' ? 'bg-emerald-500' : staff.status === 'On Break' ? 'bg-amber-500' : 'bg-gray-300'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">{staff.name}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{staff.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-teal-600 uppercase tracking-tighter">{staff.terminal}</p>
                     <p className="text-[9px] font-bold text-gray-400 uppercase">{staff.status}</p>
                  </div>
                </div>
              ))}
           </div>

           <button 
            onClick={() => onNavigate('team_permissions')}
            className="w-full py-4 bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-slate-500 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] hover:text-teal-600 transition-all border border-transparent hover:border-teal-100"
           >
             Manage Team Permissions
           </button>
        </div>

        {/* 6. Critical Operational War Room */}
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle size={16} className="text-rose-500 animate-pulse" /> Operational Risk Monitor
              </h3>
              <button className="text-[10px] font-black text-rose-500 hover:underline uppercase tracking-widest">Acknowledge All</button>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-rose-100 dark:border-rose-900/20 shadow-sm overflow-hidden">
              <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 flex items-center gap-4 border-b border-rose-50 dark:border-rose-900/30">
                 <ShieldCheck size={18} className="text-rose-500" />
                 <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">3 System exceptions require supervisor override</p>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-slate-800">
                 {CRITICAL_ALERTS.map((alert) => (
                   <div key={alert.id} className="p-6 flex items-center justify-between group hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-6">
                         <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                           alert.type === 'stock' ? 'bg-rose-50 text-rose-600' : 
                           alert.type === 'transfer' ? 'bg-amber-50 text-amber-600' : 
                           'bg-blue-50 text-blue-600'
                         }`}>
                           {alert.type === 'stock' ? <Package size={20}/> : alert.type === 'transfer' ? <Truck size={20}/> : <CreditCard size={20}/>}
                         </div>
                         <div>
                            <p className="text-sm font-black text-slate-800 dark:text-slate-100">{alert.message}</p>
                            <div className="flex items-center gap-3 mt-1">
                               <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-1">
                                 <Building size={10} /> {alert.branch}
                               </span>
                               <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-1">
                                 <Clock size={10} /> {alert.time}
                               </span>
                            </div>
                         </div>
                      </div>
                      <button className="px-4 py-2 bg-gray-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:bg-rose-500 group-hover:text-white rounded-xl transition-all">
                        Resolve
                      </button>
                   </div>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
                 <Target size={150} className="absolute -bottom-12 -right-12 opacity-10 group-hover:scale-110 transition-transform duration-700 text-teal-400" />
                 <h4 className="text-xl font-black italic uppercase tracking-tighter mb-1">Target Achievement</h4>
                 <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em] mb-8">Q2 Regional Objective</p>
                 
                 <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Progress</span>
                      <span className="text-xs font-black">74%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-teal-400 w-[74%] rounded-full shadow-[0_0_12px_rgba(45,212,191,0.5)]" />
                    </div>
                    <p className="text-[10px] font-medium text-slate-400 leading-relaxed">$214k of $280k target reached. <span className="text-white font-black hover:underline cursor-pointer">View Projections</span></p>
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm flex flex-col justify-between group">
                 <div>
                    <div className="flex items-center justify-between mb-4">
                       <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">Global Outreach</h4>
                       <div className="p-2 bg-teal-50 dark:bg-teal-900/30 text-teal-600 rounded-xl"><Sparkles size={16} /></div>
                    </div>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">System AI has detected <span className="text-teal-600 font-black">12 dormant VIP clients</span>. Automated WhatsApp re-engagement recommended.</p>
                 </div>
                 <button 
                  onClick={() => onNavigate('messaging')}
                  className="w-full mt-6 py-3 bg-teal-50 dark:bg-teal-900/20 text-teal-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-sm"
                 >
                   Launch Campaign <ChevronRight size={14} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
