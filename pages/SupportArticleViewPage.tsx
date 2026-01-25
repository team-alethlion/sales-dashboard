
import React from 'react';
import { ArrowLeft, ChevronRight, Clock, User, CheckCircle2, MessageSquare, Share2, Copy, Bookmark, ExternalLink, Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface SupportArticleViewPageProps {
  onBack: () => void;
}

const SupportArticleViewPage: React.FC<SupportArticleViewPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-3 mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 overflow-x-auto no-scrollbar">
        <button onClick={onBack} className="hover:text-teal-600 transition-colors whitespace-nowrap">Support Hub</button>
        <ChevronRight size={12} className="shrink-0" />
        <button onClick={onBack} className="hover:text-teal-600 transition-colors whitespace-nowrap">Knowledge Base</button>
        <ChevronRight size={12} className="shrink-0" />
        <span className="text-teal-600 whitespace-nowrap">Getting Started</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Content Area */}
        <article className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-gray-50 dark:border-slate-800 shadow-sm">
          {/* Header Info */}
          <header className="mb-12 border-b border-gray-50 dark:border-slate-800 pb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight mb-8">
              Setting up your first <span className="text-teal-600 italic">Branch Terminal</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Author</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Nicholas S.</p>
                  </div>
               </div>
               <div className="h-8 w-px bg-gray-100 dark:bg-slate-800" />
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Updated</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">June 14, 2024 • 5 min read</p>
                  </div>
               </div>
            </div>
          </header>

          {/* Article Body Content Structure */}
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-10">
            {/* Intro */}
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
              Code8 is designed to scale with your business. Setting up a new branch terminal takes less than 10 minutes if you have your logistical details ready. Follow this structured guide to ensure a smooth deployment.
            </p>

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-4 uppercase italic">1. Initialize Branch Metadata</h2>
              <p className="text-base text-gray-500 leading-relaxed font-medium">
                Before physical hardware can be linked, the system requires an entry in the Global Branch Registry. This defines the tax protocols, currency settings, and default petty cash accounts for that specific location.
              </p>
              
              <div className="mt-8 bg-gray-50 dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700">
                 <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-teal-600 shadow-sm shrink-0">
                      <Lightbulb size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">Pro Tip</h4>
                      <p className="text-xs text-gray-400 mt-1 font-medium leading-relaxed">
                        Use the "Commercial Branch" template if you are opening a high-volume retail center. It pre-configures common SKU categories automatically.
                      </p>
                    </div>
                 </div>
              </div>
            </section>

            {/* Section 2 - Steps */}
            <section>
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-6 uppercase italic">2. Hardware Synchronization</h2>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Network Setup', desc: 'Ensure the terminal device is connected to a secure WPA3 network. Public WiFi is discouraged for POS security.' },
                  { step: 2, title: 'Printer Linkage', desc: 'Navigate to Sidebar > Hardware. Turn on your thermal printer and click "Connect Printer".' },
                  { step: 3, title: 'Registry Sync', desc: 'Click "Force Sync" in System Settings to fetch the latest inventory database from the cloud hub.' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-6 group">
                     <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black shrink-0 group-hover:bg-teal-600 transition-colors shadow-lg">
                       {s.step}
                     </div>
                     <div>
                       <h4 className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight">{s.title}</h4>
                       <p className="text-sm text-gray-400 font-medium leading-relaxed mt-1">{s.desc}</p>
                     </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Warning Callout */}
            <div className="p-6 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-3xl flex gap-4">
               <AlertTriangle className="text-rose-500 shrink-0" size={24} />
               <div>
                 <h4 className="text-sm font-black text-rose-600 uppercase tracking-widest">Important: Security Protocol</h4>
                 <p className="text-xs text-rose-500 mt-1 font-medium leading-relaxed">
                   Never share your Terminal Activation Code with anyone outside of your branch manager group. This code provides full ledger access.
                 </p>
               </div>
            </div>

            {/* Ending */}
            <section>
              <p className="text-base text-gray-500 leading-relaxed font-medium">
                Once the three steps above are completed, your terminal status in the Main Dashboard will change to <span className="text-teal-600 font-black">ACTIVE</span>. You can now begin processing sales and receiving stock transfers.
              </p>
            </section>
          </div>

          {/* Feedback Widget */}
          <footer className="mt-16 pt-12 border-t border-gray-50 dark:border-slate-800">
            <div className="bg-gray-50 dark:bg-slate-800/40 p-10 rounded-[2.5rem] text-center">
               <h4 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-4 italic uppercase">Was this guide <span className="text-teal-600">helpful?</span></h4>
               <div className="flex justify-center gap-4">
                  <button className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-teal-600 hover:scale-105 transition-all shadow-sm">
                    <CheckCircle2 size={16} /> Yes, it was
                  </button>
                  <button className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:scale-105 transition-all shadow-sm">
                    No, I need more
                  </button>
               </div>
            </div>
          </footer>
        </article>

        {/* Article Sidebar */}
        <aside className="lg:col-span-4 space-y-8 sticky top-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Article Actions</h3>
             <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-teal-50 transition-all group">
                   <div className="flex items-center gap-3"><Copy size={16} className="text-gray-400 group-hover:text-teal-600" /> Copy Link</div>
                   <ChevronRight size={14} className="text-gray-300" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-teal-50 transition-all group">
                   <div className="flex items-center gap-3"><Bookmark size={16} className="text-gray-400 group-hover:text-teal-600" /> Save Article</div>
                   <ChevronRight size={14} className="text-gray-300" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-teal-50 transition-all group">
                   <div className="flex items-center gap-3"><Share2 size={16} className="text-gray-400 group-hover:text-teal-600" /> Social Share</div>
                   <ChevronRight size={14} className="text-gray-300" />
                </button>
             </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-teal-500 rounded-full blur-[60px] opacity-20 group-hover:scale-150 transition-transform duration-700" />
            <h4 className="text-lg font-black italic uppercase tracking-tighter mb-4">Related Content</h4>
            <div className="space-y-6 relative z-10">
               {[
                 { title: 'Troubleshooting Bluetooth printer drops', category: 'Hardware' },
                 { title: 'Configuring custom tax rates for regions', category: 'Finance' },
                 { title: 'Weekly branch close procedure', category: 'Operations' },
               ].map((item, i) => (
                 <div key={i} className="cursor-pointer group/item">
                    <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest mb-1">{item.category}</p>
                    <h5 className="text-xs font-bold text-slate-300 group-hover/item:text-white transition-colors">{item.title}</h5>
                 </div>
               ))}
            </div>
            <button className="mt-8 flex items-center gap-2 text-[10px] font-black text-teal-400 uppercase tracking-widest hover:underline">
              View All in category <ExternalLink size={12} />
            </button>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm text-center">
             <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-6">
                <MessageSquare size={32} />
             </div>
             <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">Still stuck?</h4>
             <p className="text-xs text-gray-400 mt-2 font-medium leading-relaxed">Our support agents are available 24/7 for technical emergencies.</p>
             <button className="w-full mt-6 py-3 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-900/10">
                Open Chat
             </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SupportArticleViewPage;
