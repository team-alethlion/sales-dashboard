
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Send, 
  MessageSquare, 
  History, 
  Settings, 
  Plus, 
  Smartphone, 
  Smartphone as PhoneIcon,
  CreditCard, 
  Zap, 
  QrCode, 
  Copy, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  User, 
  Trash2, 
  FileText,
  Clock,
  ExternalLink,
  Info,
  ShieldCheck,
  Layout,
  MoreVertical,
  Search,
  Save,
  Type,
  Hash,
  Terminal
} from 'lucide-react';

// --- INITIAL DATA ---
const INITIAL_TEMPLATES = [
  { id: 't1', name: 'Order Confirmation', content: 'Hello {{customer_name}}, your order #{{order_id}} has been confirmed and is being processed. Thank you for choosing Code8!', channel: 'both' },
  { id: 't2', name: 'Flash Sale Alert', content: 'Huge Savings! Use code FLASH20 for 20% off all Electronics this weekend. Shop now at code8.store/sales', channel: 'whatsapp' },
  { id: 't3', name: 'Inventory Restock', content: 'The item you were watching, {{product_name}}, is back in stock! Grab yours before they are gone.', channel: 'sms' },
];

const HISTORY_LOGS = [
  { id: 'm1', recipient: 'John Doe', channel: 'WhatsApp', content: 'Your order is ready for pickup...', time: '10:45 AM', status: 'Delivered' },
  { id: 'm2', recipient: '+254 712 345 678', channel: 'SMS', content: 'Thank you for your purchase!', time: 'Yesterday', status: 'Sent' },
  { id: 'm3', recipient: 'Sarah Jenkins', channel: 'WhatsApp', content: 'New arrival alert: Premium Coffee...', time: 'Yesterday', status: 'Read' },
  { id: 'm4', recipient: 'Marcus Chen', channel: 'SMS', content: 'Payment received for INV-9021...', time: '2 days ago', status: 'Failed' },
];

const PACKAGES = [
  { id: 'p1', name: 'Basic Tier', credits: 500, price: 1000, bestValue: false },
  { id: 'p2', name: 'Growth Tier', credits: 2000, price: 3500, bestValue: true },
  { id: 'p3', name: 'Enterprise', credits: 10000, price: 15000, bestValue: false },
];

type ActiveTab = 'compose' | 'templates' | 'history' | 'connection' | 'topup';

const MessagingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('compose');
  const [messageChannel, setMessageChannel] = useState<'sms' | 'whatsapp'>('whatsapp');
  const [recipients, setRecipients] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  
  // Template State
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ name: '', content: '', channel: 'both' as 'sms' | 'whatsapp' | 'both' });
  const [savingTemplate, setSavingTemplate] = useState(false);

  // Connection Logic
  const [connStep, setConnStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pairingMethod, setPairingMethod] = useState<'qr' | 'code'>('qr');
  const [generatingQR, setGeneratingQR] = useState(false);

  // Topup Logic
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[1]);
  const [topupPhone, setTopupPhone] = useState('2547');
  const [loadingTopup, setLoadingTopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- HANDLERS ---
  const handleTemplateSelect = (val: string) => {
    setSelectedTemplate(val);
    const template = templates.find(t => t.id === val);
    if (template) setMessageBody(template.content);
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplate.name || !newTemplate.content) return;
    
    setSavingTemplate(true);
    setTimeout(() => {
      const created = {
        ...newTemplate,
        id: `t-${Date.now()}`
      };
      setTemplates([created, ...templates]);
      setSavingTemplate(false);
      setShowTemplateModal(false);
      setNewTemplate({ name: '', content: '', channel: 'both' });
    }, 1000);
  };

  const insertPlaceholder = (placeholder: string) => {
    setNewTemplate(prev => ({
      ...prev,
      content: prev.content + ` {{${placeholder}}}`
    }));
  };

  const handleTopup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingTopup(true);
    setTimeout(() => {
      setLoadingTopup(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const generatePairing = () => {
    setGeneratingQR(true);
    setTimeout(() => {
      setGeneratingQR(false);
      setConnStep(2);
    }, 1500);
  };

  // --- SUB-COMPONENTS ---
  const iPhonePreview = () => (
    <div className="relative mx-auto w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden group transition-all duration-500 hover:scale-[1.02]">
      {/* Speaker/Dynamic Island */}
      <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 flex justify-center items-end pb-1 z-20">
        <div className="w-16 h-3 bg-black rounded-full" />
      </div>
      
      {/* Screen Content */}
      <div className="h-full w-full bg-slate-100 dark:bg-slate-950 pt-8 flex flex-col">
        {/* Mock Header */}
        <div className={`p-4 ${messageChannel === 'whatsapp' ? 'bg-[#075e54]' : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800'} flex items-center gap-2`}>
           <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
             <User size={16} className="text-slate-400" />
           </div>
           <div className="flex-1 min-w-0">
             <p className={`text-[10px] font-bold ${messageChannel === 'whatsapp' ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>Customer Name</p>
             <p className={`text-[8px] ${messageChannel === 'whatsapp' ? 'text-teal-100' : 'text-slate-400'}`}>Online</p>
           </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-3 space-y-4 overflow-y-auto flex flex-col justify-end">
          <div className={`self-end max-w-[85%] p-2 rounded-2xl rounded-tr-none shadow-sm animate-in slide-in-from-bottom-2 duration-300 ${
            messageChannel === 'whatsapp' ? 'bg-[#dcf8c6] dark:bg-teal-900 text-slate-800 dark:text-teal-50' : 'bg-blue-600 text-white'
          }`}>
            <p className="text-[10px] leading-relaxed whitespace-pre-wrap">
              {messageBody || "Type something to see preview..."}
            </p>
            <div className={`text-right mt-1 text-[8px] opacity-70 ${messageChannel === 'whatsapp' ? 'text-slate-500 dark:text-teal-300' : 'text-blue-100'}`}>
              12:45 PM
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t dark:border-slate-800 flex items-center gap-2">
          <div className="flex-1 h-6 bg-gray-100 dark:bg-slate-800 rounded-full px-3 flex items-center">
            <span className="text-[8px] text-gray-400">Type a message...</span>
          </div>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${messageChannel === 'whatsapp' ? 'bg-[#075e54]' : 'bg-blue-600'}`}>
            <Send size={10} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
            Messaging <span className="text-teal-600">Hub</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
            Connect with your audience via SMS & WhatsApp
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm transition-all hover:border-teal-200">
             <div className="p-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 rounded-lg">
               <Zap size={16} />
             </div>
             <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Credits</p>
               <p className="text-sm font-black text-slate-800 dark:text-slate-100 mt-1">4,280</p>
             </div>
             <button 
               onClick={() => setActiveTab('topup')}
               className="ml-2 text-[10px] font-black text-teal-600 uppercase hover:underline"
             >
               Topup
             </button>
           </div>
        </div>
      </header>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 p-1 bg-gray-100/50 dark:bg-slate-800/50 rounded-2xl mb-8 w-fit border border-gray-100 dark:border-slate-800 overflow-x-auto max-w-full no-scrollbar">
        {[
          { id: 'compose', name: 'Compose', icon: <Send size={14} /> },
          { id: 'templates', name: 'Templates', icon: <Layout size={14} /> },
          { id: 'history', name: 'History', icon: <History size={14} /> },
          { id: 'connection', name: 'Connection', icon: <Smartphone size={14} /> },
          { id: 'topup', name: 'Top-Up', icon: <CreditCard size={14} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ActiveTab)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab.id 
              ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' 
              : 'text-gray-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        
        {/* 1. COMPOSE TAB */}
        {activeTab === 'compose' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Form Section */}
            <div className="lg:col-span-7 space-y-6">
              <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">New Message Protocol</h3>
                  <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-xl">
                    <button 
                      onClick={() => setMessageChannel('whatsapp')}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${messageChannel === 'whatsapp' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-gray-400'}`}
                    >
                      WhatsApp
                    </button>
                    <button 
                      onClick={() => setMessageChannel('sms')}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${messageChannel === 'sms' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-gray-400'}`}
                    >
                      SMS
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Recipients (Comma Separated or Search)</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        type="text" 
                        value={recipients}
                        onChange={(e) => setRecipients(e.target.value)}
                        placeholder="e.g. 254712345678, Alexander Wright..."
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Quick Template Select</label>
                    <select 
                      value={selectedTemplate}
                      onChange={(e) => handleTemplateSelect(e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none cursor-pointer"
                    >
                      <option value="">Start from scratch...</option>
                      {templates.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Message Content</label>
                    <textarea 
                      rows={6} 
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none"
                    />
                    <div className="mt-2 flex justify-between px-1">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Supports placeholders: {'{{customer_name}}'}, {'{{order_id}}'}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{messageBody.length} Chars</p>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-teal-600 text-white rounded-[1.5rem] font-black text-sm shadow-xl shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all flex items-center justify-center gap-3">
                    <Send size={18} />
                    TRANSMIT MESSAGE
                  </button>
                </div>
              </section>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl flex gap-4">
                 <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
                 <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 leading-relaxed uppercase tracking-wider">
                   Alert: WhatsApp messages require an active connection. SMS charges 1 credit per 160 characters. Placeholders are automatically populated during transmission.
                 </p>
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Live Terminal Preview</h3>
              {iPhonePreview()}
            </div>
          </div>
        )}

        {/* 2. TEMPLATES TAB */}
        {activeTab === 'templates' && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {templates.map((t) => (
                 <div key={t.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-50 dark:border-slate-800 shadow-sm hover:border-teal-300 transition-all flex flex-col group h-full">
                   <div className="flex justify-between items-start mb-4">
                     <div className={`p-2 rounded-xl ${t.channel === 'whatsapp' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : t.channel === 'sms' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'bg-teal-50 dark:bg-teal-900/20 text-teal-600'}`}>
                        {t.channel === 'whatsapp' ? <MessageSquare size={18} /> : t.channel === 'sms' ? <Smartphone size={18} /> : <Zap size={18} />}
                     </div>
                     <button className="p-2 text-gray-300 hover:text-rose-500 transition-colors">
                       <Trash2 size={16} />
                     </button>
                   </div>
                   <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight mb-2">{t.name}</h4>
                   <p className="text-xs text-gray-400 dark:text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3 italic">"{t.content}"</p>
                   <button 
                     onClick={() => { setMessageBody(t.content); setActiveTab('compose'); }}
                     className="mt-auto py-2.5 bg-gray-50 dark:bg-slate-800 text-gray-400 group-hover:text-teal-600 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-transparent group-hover:border-teal-200"
                   >
                     Use Template
                   </button>
                 </div>
               ))}
               <button 
                onClick={() => setShowTemplateModal(true)}
                className="bg-gray-50 dark:bg-slate-800/30 p-6 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3 hover:border-teal-300 transition-all group min-h-[200px]"
               >
                <div className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm text-gray-400 group-hover:text-teal-600 transition-colors">
                  <Plus size={24} />
                </div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">New Draft Template</span>
              </button>
             </div>
          </div>
        )}

        {/* 3. HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gray-50/20 dark:bg-slate-800/20">
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Communication Logs</h3>
              <button className="flex items-center gap-2 px-5 py-2 text-[10px] font-black uppercase tracking-[0.15em] bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-teal-600 transition-all rounded-xl">
                <Trash2 size={14} /> Clear Logs
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-slate-800/50">
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Recipient</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Channel</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Preview</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Timestamp</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                  {HISTORY_LOGS.map(log => (
                    <tr key={log.id} className="hover:bg-gray-50/30 dark:hover:bg-slate-800/20 transition-colors group">
                      <td className="px-8 py-6 font-bold text-sm text-slate-700 dark:text-slate-200">{log.recipient}</td>
                      <td className="px-8 py-6">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${log.channel === 'WhatsApp' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'}`}>{log.channel}</span>
                      </td>
                      <td className="px-8 py-6 max-w-[300px] truncate text-xs text-gray-400 dark:text-slate-500">{log.content}</td>
                      <td className="px-8 py-6 text-[11px] font-bold text-gray-400 uppercase tracking-tight">{log.time}</td>
                      <td className="px-8 py-6">
                        <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase ${
                          log.status === 'Failed' ? 'text-rose-500' : 'text-teal-600'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'Failed' ? 'bg-rose-500' : 'bg-teal-600'}`} />
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. CONNECTION TAB */}
        {activeTab === 'connection' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <section className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-gray-50 dark:border-slate-800 shadow-sm text-center">
              <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/30 rounded-3xl flex items-center justify-center text-teal-600 mx-auto mb-8 shadow-inner">
                {connStep === 1 ? <Smartphone size={40} /> : <QrCode size={40} />}
              </div>
              
              {connStep === 1 && (
                <div className="space-y-8 animate-in zoom-in-95 duration-300">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Connect WhatsApp Device</h3>
                    <p className="text-sm text-gray-400 font-medium mt-2">Step 1: Verify your communication endpoint</p>
                  </div>
                  
                  <div className="max-w-xs mx-auto">
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block text-left">Mobile Number (With Country Code)</label>
                    <input 
                      type="tel" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 254712345678"
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-lg font-black text-center tracking-widest"
                    />
                  </div>

                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={() => setPairingMethod('qr')}
                      className={`flex flex-col items-center gap-2 p-6 rounded-3xl border-2 transition-all w-40 ${pairingMethod === 'qr' ? 'border-teal-600 bg-teal-50/50 dark:bg-teal-900/10' : 'border-gray-100 dark:border-slate-800'}`}
                    >
                      <QrCode size={24} className={pairingMethod === 'qr' ? 'text-teal-600' : 'text-gray-300'} />
                      <span className="text-[10px] font-black uppercase">Scan QR</span>
                    </button>
                    <button 
                      onClick={() => setPairingMethod('code')}
                      className={`flex flex-col items-center gap-2 p-6 rounded-3xl border-2 transition-all w-40 ${pairingMethod === 'code' ? 'border-teal-600 bg-teal-50/50 dark:bg-teal-900/10' : 'border-gray-100 dark:border-slate-800'}`}
                    >
                      <Copy size={24} className={pairingMethod === 'code' ? 'text-teal-600' : 'text-gray-300'} />
                      <span className="text-[10px] font-black uppercase">Pairing Code</span>
                    </button>
                  </div>

                  <button 
                    disabled={!phoneNumber || generatingQR}
                    onClick={generatePairing}
                    className="w-full py-5 bg-teal-600 text-white rounded-[2rem] font-black text-sm shadow-xl shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-30"
                  >
                    {generatingQR ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "PROVISION HANDSET"}
                  </button>
                </div>
              )}

              {connStep === 2 && (
                <div className="space-y-8 animate-in zoom-in-95 duration-300">
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Scan Authenticator</h3>
                    <p className="text-sm text-gray-400 font-medium mt-2">Open WhatsApp > Settings > Linked Devices > Link a Device</p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl shadow-xl border-8 border-gray-50 mx-auto w-fit">
                    {pairingMethod === 'qr' ? (
                       <div className="w-48 h-48 bg-slate-900 rounded-xl flex items-center justify-center relative group">
                          <QrCode size={120} className="text-white opacity-20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="bg-teal-600 text-white p-4 rounded-xl shadow-2xl animate-pulse">
                                <p className="text-[10px] font-black uppercase tracking-tighter">Encrypted Token Live</p>
                             </div>
                          </div>
                       </div>
                    ) : (
                       <div className="px-10 py-12 flex flex-col items-center gap-6">
                          <p className="text-4xl font-black tracking-[0.5em] text-slate-800">4K2L-9X2Z</p>
                          <button className="flex items-center gap-2 text-[10px] font-black text-teal-600 uppercase tracking-widest hover:underline">
                            <Copy size={12} /> Copy Code
                          </button>
                       </div>
                    )}
                  </div>

                  <div className="flex justify-center gap-4">
                     <button onClick={() => setConnStep(1)} className="px-8 py-3 bg-gray-100 dark:bg-slate-800 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">Go Back</button>
                     <button onClick={() => setConnStep(1)} className="px-8 py-3 bg-teal-50 dark:bg-teal-900/30 text-teal-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">Verify Link</button>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* 5. TOPUP TAB */}
        {activeTab === 'topup' && (
          <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {PACKAGES.map((pkg) => (
                 <div 
                   key={pkg.id}
                   onClick={() => setSelectedPackage(pkg)}
                   className={`bg-white dark:bg-slate-900 p-8 rounded-[3rem] border-4 transition-all cursor-pointer relative overflow-hidden group ${
                     selectedPackage.id === pkg.id ? 'border-teal-600 shadow-2xl' : 'border-gray-50 dark:border-slate-800 hover:border-teal-200 shadow-sm'
                   }`}
                 >
                   {pkg.bestValue && (
                     <div className="absolute top-0 right-0 bg-teal-600 text-white px-4 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest">Best Choice</div>
                   )}
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">{pkg.name}</p>
                   <h4 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-baseline gap-2">
                     {pkg.credits.toLocaleString()} <span className="text-xs font-bold text-gray-400">CREDITS</span>
                   </h4>
                   <div className="mt-8 flex items-center justify-between border-t border-gray-50 dark:border-slate-800 pt-8">
                     <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</p>
                       <p className="text-xl font-black text-teal-600">KES {pkg.price.toLocaleString()}</p>
                     </div>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                       selectedPackage.id === pkg.id ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'
                     }`}>
                       <CheckCircle2 size={16} />
                     </div>
                   </div>
                 </div>
               ))}
             </div>

             <section className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-gray-50 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#339d3c] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">M</div>
                      <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight uppercase italic">Secure M-Pesa Checkout</h3>
                        <p className="text-xs text-gray-400 font-medium">Instant STK Push for seamless credit topup</p>
                      </div>
                    </div>
                    
                    <form onSubmit={handleTopup} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">M-Pesa Phone Number</label>
                          <div className="relative">
                            <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                              type="tel" 
                              value={topupPhone}
                              onChange={(e) => setTopupPhone(e.target.value)}
                              className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-lg font-black tracking-widest"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Total To Pay</label>
                          <div className="w-full px-6 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl font-black text-lg text-teal-600 flex items-center justify-between">
                            KES {selectedPackage.price.toLocaleString()}
                            <ShieldCheck size={20} className="text-teal-600" />
                          </div>
                        </div>
                      </div>

                      <button 
                        disabled={loadingTopup}
                        className="w-full py-5 bg-[#339d3c] text-white rounded-[2rem] font-black text-sm shadow-xl shadow-emerald-900/10 hover:bg-[#2d8b35] active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                        {loadingTopup ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Zap size={18} /> INITIATE STK PUSH
                          </>
                        )}
                      </button>
                    </form>

                    {showSuccess && (
                      <div className="p-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in-95">
                        <CheckCircle2 size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">Transaction Sent! Check your handset.</span>
                      </div>
                    )}
                  </div>

                  <div className="w-px h-60 bg-gray-100 dark:bg-slate-800 hidden md:block" />

                  <div className="flex-1 space-y-6">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Coming Soon</h4>
                    <div className="grid grid-cols-2 gap-4 opacity-40 grayscale pointer-events-none">
                      <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 flex flex-col items-center gap-3">
                         <CreditCard size={24} />
                         <span className="text-[10px] font-bold">VISA / MASTERCARD</span>
                      </div>
                      <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 flex flex-col items-center gap-3">
                         <PhoneIcon size={24} />
                         <span className="text-[10px] font-bold">AIRTEL MONEY</span>
                      </div>
                    </div>
                  </div>
                </div>
             </section>
          </div>
        )}

      </div>

      {/* NEW TEMPLATE MODAL */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowTemplateModal(false)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
             <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-900/20">
                    <Layout size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Create Messaging Template</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Standardized Response Protocol</p>
                  </div>
                </div>
                <button onClick={() => setShowTemplateModal(false)} className="p-2.5 text-gray-300 hover:text-rose-500 transition-all hover:rotate-90">
                  <X size={24} />
                </button>
             </div>

             <form onSubmit={handleSaveTemplate} className="p-8 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Template Name</label>
                    <div className="relative">
                      <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input 
                        type="text" 
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                        placeholder="e.g. Refund Processing" 
                        className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" 
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Primary Channel</label>
                    <select 
                      value={newTemplate.channel}
                      onChange={(e) => setNewTemplate({...newTemplate, channel: e.target.value as any})}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none cursor-pointer"
                    >
                      <option value="both">Both (SMS & WhatsApp)</option>
                      <option value="whatsapp">WhatsApp Only</option>
                      <option value="sms">SMS Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Template Content</label>
                  <textarea 
                    rows={5} 
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                    placeholder="Draft your message here..." 
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none" 
                    required
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest w-full mb-1">Insert Variables:</p>
                    {['customer_name', 'order_id', 'product_name', 'delivery_date', 'total_amount'].map(v => (
                      <button 
                        key={v}
                        type="button"
                        onClick={() => insertPlaceholder(v)}
                        className="px-2 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 rounded text-[9px] font-black uppercase tracking-tighter hover:bg-teal-100 transition-all border border-teal-100 dark:border-teal-800"
                      >
                        + {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 sticky bottom-0 bg-white dark:bg-slate-900 pb-2">
                  <button 
                    type="button" 
                    onClick={() => setShowTemplateModal(false)}
                    className="flex-1 py-4 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={savingTemplate}
                    className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-teal-900/20 hover:bg-teal-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    {savingTemplate ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Commit to Database <Save size={14} />
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

export default MessagingPage;
