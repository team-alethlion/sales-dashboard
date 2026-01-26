
import React from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  ShoppingBag, 
  ShieldCheck, 
  Star, 
  ExternalLink, 
  History,
  Activity,
  MessageSquare,
  CreditCard
} from 'lucide-react';

interface CustomerProfilePageProps {
  customerId: string | null;
  onBack: () => void;
  onViewHistory: (id: string) => void;
}

const CustomerProfilePage: React.FC<CustomerProfilePageProps> = ({ customerId, onBack, onViewHistory }) => {
  // In a real app, you'd fetch customer by ID. For now, we mock the data.
  const customer = {
    id: customerId || '1',
    name: 'Alexander Wright',
    email: 'alex.w@example.com',
    phone: '+1 234 567 890',
    avatar: 'https://i.pravatar.cc/150?u=1',
    status: 'VIP',
    location: 'Nairobi, Kenya',
    joined: 'Jan 12, 2023',
    ltv: 12450.50,
    totalOrders: 42,
    avgOrder: 296.44,
    tags: ['High Value', 'Nairobi Central', 'Tech Enthusiast'],
    notes: 'Preferred communication via WhatsApp. Always interested in early access to new Electronics arrivals.'
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <header className="flex items-center gap-4 mb-10">
        <button 
          onClick={onBack}
          className="p-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl text-gray-500 hover:text-teal-600 transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Customer <span className="text-teal-600 italic">Persona</span></h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Registry Record #{customer.id}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contact Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-gray-50 dark:border-slate-800 shadow-sm text-center">
             <div className="relative inline-block mb-6">
                <img src={customer.avatar} className="w-32 h-32 rounded-[2.5rem] object-cover ring-8 ring-gray-50 dark:ring-slate-800 shadow-xl" />
                <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white p-2 rounded-xl shadow-lg border-4 border-white dark:border-slate-900">
                   <Star size={18} fill="currentColor" />
                </div>
             </div>
             
             <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{customer.name}</h2>
             <div className="flex justify-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-teal-50 text-teal-600 rounded-md text-[10px] font-black uppercase tracking-widest">{customer.status}</span>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-800 text-gray-400 rounded-md text-[10px] font-black uppercase tracking-widest">Active Client</span>
             </div>

             <div className="grid grid-cols-3 gap-2 mt-10">
                <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:bg-teal-50 transition-all group border border-transparent hover:border-teal-100">
                   <Mail size={18} className="text-gray-400 group-hover:text-teal-600" />
                   <span className="text-[9px] font-black uppercase text-gray-400 group-hover:text-teal-600">Email</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:bg-teal-50 transition-all group border border-transparent hover:border-teal-100">
                   <Phone size={18} className="text-gray-400 group-hover:text-teal-600" />
                   <span className="text-[9px] font-black uppercase text-gray-400 group-hover:text-teal-600">Call</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:bg-teal-50 transition-all group border border-transparent hover:border-teal-100">
                   <MessageSquare size={18} className="text-gray-400 group-hover:text-teal-600" />
                   <span className="text-[9px] font-black uppercase text-gray-400 group-hover:text-teal-600">SMS</span>
                </button>
             </div>

             <div className="space-y-4 mt-8 pt-8 border-t border-gray-50 dark:border-slate-800 text-left">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400"><Mail size={14} /></div>
                   <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{customer.email}</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400"><Phone size={14} /></div>
                   <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{customer.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400"><MapPin size={14} /></div>
                   <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{customer.location}</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400"><Calendar size={14} /></div>
                   <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">Joined {customer.joined}</span>
                </div>
             </div>
          </div>
          
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                <ShieldCheck size={80} />
             </div>
             <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em] mb-4">Loyalty Tier</p>
             <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-6">Platinum Elite</h3>
             <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-[10px] font-black uppercase text-slate-400">Next Milestone</span>
                   <span className="text-xs font-black">84%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-teal-400 w-[84%] rounded-full shadow-[0_0_12px_rgba(45,212,191,0.5)]" />
                </div>
                <p className="text-[9px] font-medium text-slate-400 leading-relaxed uppercase tracking-widest">Only $2,549.50 until Diamond access</p>
             </div>
          </div>
        </div>

        {/* Right Column: Metrics & Timeline */}
        <div className="lg:col-span-8 space-y-8">
           {/* Top Stats */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total LTV</p>
                 <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100">${customer.ltv.toLocaleString()}</h4>
                 <div className="flex items-center gap-1 text-teal-600 mt-2">
                    <TrendingUp size={12} />
                    <span className="text-[10px] font-bold">+12% YoY</span>
                 </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Orders Count</p>
                 <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100">{customer.totalOrders} Units</h4>
                 <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-tight">Across 3 branches</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg Ticket</p>
                 <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100">${customer.avgOrder.toFixed(2)}</h4>
                 <div className="flex items-center gap-1 text-teal-600 mt-2">
                    <CreditCard size={12} />
                    <span className="text-[10px] font-bold uppercase">M-Pesa Primary</span>
                 </div>
              </div>
           </div>

           {/* Tags & Internal Notes */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-gray-50 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                 <Activity size={18} className="text-teal-600" />
                 <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Internal Intelligence</h3>
              </div>
              <div className="space-y-6">
                 <div className="flex flex-wrap gap-2">
                    {customer.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-50 dark:bg-slate-800 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 dark:border-slate-700">{tag}</span>
                    ))}
                 </div>
                 <div className="p-6 bg-gray-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">"{customer.notes}"</p>
                 </div>
              </div>
           </div>

           {/* Activity Timeline Preview */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-gray-50 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-3">
                    <History size={18} className="text-teal-600" />
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Registry Events</h3>
                 </div>
                 <button 
                  onClick={() => onViewHistory(customer.id)}
                  className="text-[10px] font-black text-teal-600 hover:underline uppercase tracking-widest"
                 >
                   View Full Ledger
                 </button>
              </div>

              <div className="space-y-10 relative">
                 <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-50 dark:bg-slate-800" />
                 
                 {[
                   { type: 'purchase', title: 'Transaction SL-9021 Completed', desc: 'Purchased UltraHD Monitor + Premium Beans', time: '10:45 AM Today', icon: <ShoppingBag size={12}/>, color: 'bg-teal-600' },
                   { type: 'contact', title: 'Support Ticket Resolved', desc: 'Assisted with printer sync issues via WhatsApp', time: 'Yesterday', icon: <MessageSquare size={12}/>, color: 'bg-blue-500' },
                   { type: 'purchase', title: 'Installment Payment Received', desc: 'Paid $120.00 via M-Pesa for Credit Order #C-402', time: '3 days ago', icon: <CreditCard size={12}/>, color: 'bg-amber-500' },
                 ].map((event, i) => (
                   <div key={i} className="flex gap-6 relative z-10">
                      <div className={`w-6 h-6 rounded-full ${event.color} text-white flex items-center justify-center shrink-0 shadow-lg ring-4 ring-white dark:ring-slate-900`}>
                         {event.icon}
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">{event.title}</h4>
                         <p className="text-[11px] text-gray-400 font-medium mt-1">{event.desc}</p>
                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mt-2">{event.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
