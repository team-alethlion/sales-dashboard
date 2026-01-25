
import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Phone, 
  Mail, 
  ChevronRight, 
  ChevronDown, 
  Zap, 
  ShieldCheck, 
  Plus, 
  X, 
  ArrowRight, 
  ExternalLink, 
  PlayCircle,
  Clock,
  Terminal,
  LifeBuoy,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Activity,
  User,
  Settings,
  Package,
  TrendingUp,
  CreditCard
} from 'lucide-react';

// --- DATA ---
const KNOWLEDGE_BASE = [
  { id: 'kb1', title: 'Getting Started', icon: <LifeBuoy size={24} />, description: 'Initial setup, branch creation, and user management.', count: 12 },
  { id: 'kb2', title: 'Sales & POS Terminal', icon: <TrendingUp size={24} />, description: 'Processing transactions, returns, and daily closing.', count: 28 },
  { id: 'kb3', title: 'Inventory Control', icon: <Package size={24} />, description: 'Managing SKUs, carriage inwards, and inter-branch transfers.', count: 18 },
  { id: 'kb4', title: 'Finance & P&L', icon: <CreditCard size={24} />, description: 'Ledger reconciliation, expense tracking, and profit reports.', count: 15 },
  { id: 'kb5', title: 'System Configuration', icon: <Settings size={24} />, description: 'Printer pairing, API integrations, and security.', count: 9 },
  { id: 'kb6', title: 'Troubleshooting', icon: <Terminal size={24} />, description: 'Fixing common errors and sync issues.', count: 22 },
];

const FAQS = [
  { question: 'How do I perform a stock transfer between branches?', answer: 'Navigate to the Transfer page under Core navigation. Click "New Transfer", select your source and destination branches, and add the products you wish to move. Once finalized, the system will generate a logistics note and update stock levels instantly.' },
  { question: 'Can I undo a finalized sale?', answer: 'For audit integrity, sales cannot be simply "deleted". Instead, you must process a "Sales Return" through the Sales history or POS terminal. This creates a contra-entry in your ledger and restores the items to inventory.' },
  { question: 'My thermal printer is not connecting.', answer: 'Ensure Bluetooth is enabled on your device. Navigate to the Sidebar hardware section and click "Connect Printer". If the device is not found, reset the printer and clear your browser cache. The printer service requires an active SSL connection.' },
  { question: 'How are P&L reports calculated?', answer: 'Code8 uses the Standard Periodic Inventory method. Profit is calculated as (Net Sales) - (COGS + Operating Expenses). COGS includes opening stock plus purchases and carriage inwards, minus closing stock.' },
];

const SYSTEM_STATUS = [
  { service: 'Cloud API', status: 'operational', delay: '12ms' },
  { service: 'Database Hub', status: 'operational', delay: '8ms' },
  { service: 'WhatsApp Gateway', status: 'operational', delay: '45ms' },
  { service: 'SMS API Relay', status: 'maintenance', delay: '-' },
];

interface SupportPageProps {
  onViewAllArticles: () => void;
  onViewArticle: (id: string) => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onViewAllArticles, onViewArticle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketSaving, setTicketSaving] = useState(false);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSaving(true);
    setTimeout(() => {
      setTicketSaving(false);
      setShowTicketModal(false);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Hero Section */}
      <section className="relative rounded-[3rem] bg-teal-900 overflow-hidden mb-12 px-8 py-20 text-center shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-teal-400 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Global <span className="text-teal-400">Support</span> Center
          </h2>
          <p className="text-teal-100/60 text-sm font-medium uppercase tracking-widest">
            Resources, Documentation, and Direct Technical Support
          </p>
          
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-600" size={24} />
            <input 
              type="text" 
              placeholder="Search Knowledge Base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-6 bg-white dark:bg-slate-900 rounded-[2rem] border-none focus:ring-4 focus:ring-teal-500/30 text-lg font-bold shadow-2xl shadow-teal-950/20"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-teal-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-teal-700 transition-all">
              Search
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Knowledge Base & FAQ */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Knowledge Base Grid */}
          <div>
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <BookOpen size={16} className="text-teal-600" /> Knowledge Base
              </h3>
              <button 
                onClick={onViewAllArticles}
                className="text-[10px] font-black text-teal-600 hover:underline uppercase tracking-widest"
              >
                Explore All Articles
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {KNOWLEDGE_BASE.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => onViewArticle(item.id)}
                  className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm hover:border-teal-300 transition-all group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 text-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="px-2.5 py-1 bg-gray-50 dark:bg-slate-800 text-[9px] font-black text-gray-400 rounded-lg uppercase">{item.count} Guides</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed mb-6">{item.description}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-teal-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    View Docs <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive FAQ Section */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden p-8">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8 px-2">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className={`rounded-2xl transition-all border ${openFaq === i ? 'border-teal-200 bg-teal-50/20 dark:bg-teal-900/10' : 'border-gray-50 dark:border-slate-800'}`}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left group"
                  >
                    <span className={`text-sm font-black tracking-tight ${openFaq === i ? 'text-teal-600' : 'text-slate-700 dark:text-slate-200'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown size={18} className={`text-gray-300 transition-transform ${openFaq === i ? 'rotate-180 text-teal-600' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                      <div className="mt-4 flex gap-4">
                        <button className="text-[9px] font-black text-teal-600 uppercase tracking-widest flex items-center gap-1.5 hover:underline">
                          Was this helpful? <CheckCircle2 size={12} />
                        </button>
                        <button className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 hover:underline">
                          Submit Feedback <MessageSquare size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Video Training Section */}
          <div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8 px-2">Operational Masterclasses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { title: 'Advanced Stock Auditing', duration: '12:45', author: 'Nicholas S' },
                 { title: 'Reconciling Mobile Payments', duration: '08:20', author: 'Sarah Miller' }
               ].map((vid, i) => (
                 <div key={i} className="group relative rounded-3xl overflow-hidden aspect-video bg-slate-900 shadow-xl border border-gray-100 dark:border-slate-800">
                    <img src={`https://picsum.photos/seed/vid${i}/600/400`} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center justify-between">
                         <div>
                            <h4 className="text-white font-black text-lg tracking-tight">{vid.title}</h4>
                            <p className="text-teal-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                              <User size={12} /> {vid.author} • <Clock size={12} /> {vid.duration}
                            </p>
                         </div>
                         <button className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-all hover:scale-110 shadow-2xl">
                            <PlayCircle size={28} />
                         </button>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Health */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Quick Contact Cards */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 px-2">Support Channels</h3>
            
            <button 
              onClick={() => setShowTicketModal(true)}
              className="w-full flex items-center gap-4 p-5 bg-teal-600 text-white rounded-3xl shadow-xl shadow-teal-900/20 hover:bg-teal-700 transition-all group active:scale-95"
            >
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
                <LifeBuoy size={24} />
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-black uppercase tracking-widest">New Support Ticket</p>
                <p className="text-[10px] text-teal-100 font-medium">Standard response under 2 hours</p>
              </div>
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            </button>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm space-y-6">
               <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">WhatsApp Support</p>
                    <p className="text-[10px] text-gray-400 font-medium">+254 712 345 678</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">Email Assistance</p>
                    <p className="text-[10px] text-gray-400 font-medium">support@code8.io</p>
                  </div>
               </div>

               <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">Direct Hotline</p>
                    <p className="text-[10px] text-gray-400 font-medium">1-800-CODE8-POS</p>
                  </div>
               </div>
            </div>
          </div>

          {/* System Health Monitor */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                 <Activity size={16} className="text-teal-600" /> Service Health
               </h3>
               <span className="flex items-center gap-1.5 text-[9px] font-black text-teal-600 uppercase">
                 <div className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" /> Live
               </span>
            </div>
            
            <div className="space-y-6">
               {SYSTEM_STATUS.map((sys, idx) => (
                 <div key={idx} className="flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-tighter">{sys.service}</span>
                       <span className="text-[9px] font-bold text-gray-400 uppercase">{sys.delay} Latency</span>
                    </div>
                    <div className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter ${
                      sys.status === 'operational' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {sys.status}
                    </div>
                 </div>
               ))}
            </div>
            
            <button className="w-full mt-8 py-3 bg-gray-50 dark:bg-slate-800 text-gray-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:text-teal-600 transition-colors">
              Full Status Page
            </button>
          </div>

          {/* Useful References */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
            <Zap size={100} className="absolute -bottom-6 -right-6 opacity-10 group-hover:rotate-12 transition-transform duration-500 text-teal-400" />
            <h4 className="text-lg font-black italic uppercase tracking-tighter mb-4">Quick Links</h4>
            <div className="space-y-4 relative z-10">
               {[
                 { label: 'API Documentation', link: '#' },
                 { label: 'Merchant Agreement', link: '#' },
                 { label: 'Release Notes v4.2', link: '#' },
                 { label: 'Privacy Protocol', link: '#' },
               ].map((item, i) => (
                 <a key={i} href={item.link} className="flex items-center justify-between text-xs font-bold text-slate-400 hover:text-teal-400 transition-colors py-1">
                   {item.label} <ExternalLink size={14} />
                 </a>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* NEW TICKET MODAL */}
      {showTicketModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowTicketModal(false)} />
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
             <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-900/20">
                    <LifeBuoy size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Provision Support Ticket</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Direct Technical Link</p>
                  </div>
                </div>
                <button onClick={() => setShowTicketModal(false)} className="p-2.5 text-gray-300 hover:text-rose-500 transition-all hover:rotate-90">
                  <X size={24} />
                </button>
             </div>

             <form onSubmit={handleCreateTicket} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Subject Topic *</label>
                    <input type="text" placeholder="e.g. Printer Sync Delay" className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" required />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Department</label>
                      <select className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none cursor-pointer">
                        <option>IT & Systems</option>
                        <option>Finance & Billing</option>
                        <option>Logistics & Supply</option>
                        <option>General Merchant Support</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Urgency Tier</label>
                      <select className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none cursor-pointer text-rose-500">
                        <option>Low - Question</option>
                        <option>Medium - Minor Issue</option>
                        <option>High - Operational Blocker</option>
                        <option>Critical - POS Down</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Detailed Description</label>
                    <textarea rows={4} placeholder="Describe the behavior, steps to reproduce, and any error codes seen..." className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none" required />
                  </div>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex gap-4">
                   <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                   <p className="text-[10px] font-bold text-amber-700 dark:text-amber-300 leading-relaxed uppercase tracking-wider">
                     Critical tickets are automatically routed to our on-call engineers. Please only use this tier for total system outages.
                   </p>
                </div>

                <div className="flex gap-4 pt-4 sticky bottom-0 bg-white dark:bg-slate-900 pb-2">
                  <button 
                    type="button" 
                    onClick={() => setShowTicketModal(false)}
                    className="flex-1 py-4 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit"
                    disabled={ticketSaving}
                    className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-teal-900/20 hover:bg-teal-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    {ticketSaving ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Commit Ticket <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportPage;
