
import React, { useState, useEffect } from 'react';
// Added ArrowRight to the imports from lucide-react
import { 
  Settings, 
  Building2, 
  Palette, 
  Globe, 
  Shield, 
  Cpu, 
  Save, 
  Image as ImageIcon, 
  PenTool, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  X, 
  Plus, 
  Eye, 
  EyeOff, 
  Terminal, 
  Smartphone, 
  Printer, 
  Cloud, 
  Webhook, 
  Fingerprint,
  Mail,
  MapPin,
  Phone,
  FileText,
  BadgeCheck,
  RotateCcw,
  DollarSign,
  Percent,
  Link,
  Activity,
  ArrowRight
} from 'lucide-react';

type SettingsTab = 'general' | 'branding' | 'fiscal' | 'pos' | 'security' | 'api';

interface WebhookEntry {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'pending' | 'failed';
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  
  // Webhook State
  const [webhooks, setWebhooks] = useState<WebhookEntry[]>([
    { id: 'wh_1', name: 'Inventory Sync (Shopify)', url: 'https://api.store.com/webhooks/stock', status: 'active' }
  ]);
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [newWebhook, setNewWebhook] = useState({ name: '', url: '' });

  // Form State (Mocked)
  const [bizInfo, setBizInfo] = useState({
    name: 'Code8 Global Traders',
    legalName: 'Code8 Logistics & Retail Ltd',
    taxPin: 'P051239044J',
    email: 'ops@code8.io',
    phone: '+254 711 000 888',
    address: 'Suite 402, Trade Tower, Nairobi, Kenya'
  });

  const [branding, setBranding] = useState({
    primaryColor: '#0d9488',
    secondaryColor: '#115e59',
    logoUrl: 'https://picsum.photos/seed/code8logo/200/200',
    receiptLogo: true,
    compactInvoices: false
  });

  const [fiscal, setFiscal] = useState({
    currency: 'KES',
    timezone: 'UTC+3 (EAT)',
    dateFormat: 'DD/MM/YYYY',
    taxRate: '16',
    autoReconcile: true
  });

  const [signature, setSignature] = useState({
    type: 'generated',
    content: 'Nicholas S.',
    font: 'italic'
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setIsDirty(false);
    }, 1500);
  };

  const notifyChange = () => setIsDirty(true);

  const handleAddWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWebhook.name || !newWebhook.url) return;
    
    const entry: WebhookEntry = {
      id: `wh_${Date.now()}`,
      name: newWebhook.name,
      url: newWebhook.url,
      status: 'active'
    };
    
    setWebhooks([...webhooks, entry]);
    setNewWebhook({ name: '', url: '' });
    setShowWebhookModal(false);
    notifyChange();
  };

  const deleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(w => w.id !== id));
    notifyChange();
  };

  // --- SUB-COMPONENTS ---
  const SidebarItem = ({ id, label, icon: Icon }: { id: SettingsTab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
        activeTab === id 
        ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20' 
        : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const FormSection = ({ title, desc, children }: { title: string, desc: string, children: React.ReactNode }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{title}</h3>
        <p className="text-sm text-gray-400 font-medium mt-1">{desc}</p>
      </div>
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm space-y-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="pb-32">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
            System <span className="text-teal-600 italic">Configuration</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
            Manage your global application settings and business preferences
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Settings Sub-Sidebar */}
        <aside className="lg:col-span-3 space-y-2 lg:sticky lg:top-8">
          <SidebarItem id="general" label="Business Info" icon={Building2} />
          <SidebarItem id="branding" label="Branding" icon={Palette} />
          <SidebarItem id="fiscal" label="Fiscal & Tax" icon={CreditCard} />
          <SidebarItem id="pos" label="Hardware & POS" icon={Printer} />
          <SidebarItem id="security" label="Privacy" icon={Shield} />
          <SidebarItem id="api" label="Integrations" icon={Terminal} />
          
          <div className="mt-8 p-6 bg-teal-50 dark:bg-teal-950/20 rounded-[2rem] border border-teal-100 dark:border-teal-900/30">
            <h4 className="text-[10px] font-black text-teal-800 dark:text-teal-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <BadgeCheck size={14} /> License Verified
            </h4>
            <p className="text-[10px] text-teal-700 dark:text-teal-300 font-medium leading-relaxed">Code8 Enterprise v4.2.1 • Renewing in 284 days</p>
          </div>
        </aside>

        {/* Settings Content Area */}
        <div className="lg:col-span-9 space-y-12">
          
          {/* TAB: GENERAL */}
          {activeTab === 'general' && (
            <FormSection title="Legal Identity" desc="Official company records for billing and compliance.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Display Brand Name</label>
                  <input 
                    type="text" 
                    value={bizInfo.name} 
                    onChange={(e) => {setBizInfo({...bizInfo, name: e.target.value}); notifyChange();}}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Legal Entity Name</label>
                  <input 
                    type="text" 
                    value={bizInfo.legalName}
                    onChange={(e) => {setBizInfo({...bizInfo, legalName: e.target.value}); notifyChange();}}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Tax Registration PIN</label>
                  <div className="relative">
                    <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="text" 
                      value={bizInfo.taxPin}
                      onChange={(e) => {setBizInfo({...bizInfo, taxPin: e.target.value}); notifyChange();}}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black text-teal-600" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Primary Contact Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="email" 
                      value={bizInfo.email}
                      onChange={(e) => {setBizInfo({...bizInfo, email: e.target.value}); notifyChange();}}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" 
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Headquarters Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={14} />
                  <textarea 
                    rows={2} 
                    value={bizInfo.address}
                    onChange={(e) => {setBizInfo({...bizInfo, address: e.target.value}); notifyChange();}}
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none" 
                  />
                </div>
              </div>
            </FormSection>
          )}

          {/* TAB: BRANDING */}
          {activeTab === 'branding' && (
            <FormSection title="Visual Identity" desc="Customize how your customers perceive your business across all touchpoints.">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-4 block tracking-widest">Primary Brand Color</label>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl shadow-inner border border-gray-100 dark:border-slate-800" style={{ backgroundColor: branding.primaryColor }} />
                        <input 
                          type="text" 
                          value={branding.primaryColor} 
                          onChange={(e) => {setBranding({...branding, primaryColor: e.target.value}); notifyChange();}}
                          className="flex-1 px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-black tracking-widest" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-4 block tracking-widest">Organization Logo</label>
                      <div className="border-4 border-dashed border-gray-100 dark:border-slate-800 rounded-[2rem] p-8 text-center bg-gray-50/20 group hover:border-teal-200 transition-all cursor-pointer">
                         <img src={branding.logoUrl} className="w-20 h-20 object-contain mx-auto rounded-xl shadow-lg mb-4" alt="Brand Logo" />
                         <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Replace Asset</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">UI Preferences</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl">
                         <div className="flex items-center gap-3">
                            <ImageIcon size={18} className="text-teal-600" />
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Show logo on receipts</span>
                         </div>
                         <button onClick={() => {setBranding({...branding, receiptLogo: !branding.receiptLogo}); notifyChange();}} className={`w-10 h-5 rounded-full relative transition-all ${branding.receiptLogo ? 'bg-teal-600' : 'bg-gray-300'}`}>
                            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${branding.receiptLogo ? 'left-6' : 'left-1'}`} />
                         </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl">
                         <div className="flex items-center gap-3">
                            <FileText size={18} className="text-teal-600" />
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Compact invoice layout</span>
                         </div>
                         <button onClick={() => {setBranding({...branding, compactInvoices: !branding.compactInvoices}); notifyChange();}} className={`w-10 h-5 rounded-full relative transition-all ${branding.compactInvoices ? 'bg-teal-600' : 'bg-gray-300'}`}>
                            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${branding.compactInvoices ? 'left-6' : 'left-1'}`} />
                         </button>
                      </div>
                    </div>
                  </div>
               </div>
            </FormSection>
          )}

          {/* TAB: FISCAL */}
          {activeTab === 'fiscal' && (
            <FormSection title="Financial Controls" desc="Manage accounting rules, tax behavior, and localized data formats.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Base Currency</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={14} />
                    <select 
                      value={fiscal.currency}
                      onChange={(e) => {setFiscal({...fiscal, currency: e.target.value}); notifyChange();}}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none"
                    >
                      <option value="KES">Kenyan Shilling (KES)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">Pound Sterling (£)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">System Timezone</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <select 
                      value={fiscal.timezone}
                      onChange={(e) => {setFiscal({...fiscal, timezone: e.target.value}); notifyChange();}}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold appearance-none"
                    >
                      <option>UTC+3 (EAT) - Nairobi</option>
                      <option>UTC+0 (GMT) - London</option>
                      <option>UTC-5 (EST) - New York</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Global Default Tax (%)</label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500" size={14} />
                    <input 
                      type="number" 
                      value={fiscal.taxRate} 
                      onChange={(e) => {setFiscal({...fiscal, taxRate: e.target.value}); notifyChange();}}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black" 
                    />
                  </div>
                </div>
                <div className="flex items-end pb-1">
                   <div className="w-full p-4 bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/30 rounded-2xl flex items-center gap-3">
                      <Shield size={18} className="text-teal-600" />
                      <p className="text-[10px] font-bold text-teal-700 dark:text-teal-300 leading-tight uppercase">Tax rules are automatically applied based on SKU classification if overrides are not present.</p>
                   </div>
                </div>
              </div>
            </FormSection>
          )}

          {/* TAB: POS & SIGNATURE */}
          {activeTab === 'pos' && (
            <div className="space-y-12">
               <FormSection title="Receipt & PDF Logic" desc="Hardware settings and document validation protocols.">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Hardware Link</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-transparent hover:border-teal-200 transition-all cursor-pointer">
                           <div className="flex items-center gap-3">
                              <Printer size={18} className="text-teal-600" />
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Generic Thermal 58mm</span>
                           </div>
                           <span className="text-[9px] font-black text-teal-600 uppercase bg-teal-50 px-2 py-0.5 rounded">Active</span>
                        </div>
                        <button className="w-full py-3 bg-gray-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center justify-center gap-2">
                           <Plus size={14} /> Add Peripheral Device
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Auto-Print Rules</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-medium text-slate-500">Print receipt on Sale Finish</span>
                           <button className="w-8 h-4 bg-teal-600 rounded-full relative"><div className="absolute top-0.5 left-4.5 w-3 h-3 bg-white rounded-full"/></button>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-medium text-slate-500">Auto-generate PDF for Transfers</span>
                           <button className="w-8 h-4 bg-gray-300 rounded-full relative"><div className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full"/></button>
                        </div>
                      </div>
                    </div>
                  </div>
               </FormSection>

               <FormSection title="Digital Authorization" desc="The signature to be applied to all finalized inter-branch movements and fiscal reports.">
                  <div className="flex flex-col md:flex-row gap-12">
                     <div className="flex-1 space-y-6">
                        <div>
                           <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Signatory Full Name</label>
                           <input 
                              type="text" 
                              value={signature.content} 
                              onChange={(e) => {setSignature({...signature, content: e.target.value}); notifyChange();}}
                              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" 
                           />
                        </div>
                        <div className="flex gap-4">
                           <button onClick={() => {setSignature({...signature, font: 'italic'}); notifyChange();}} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${signature.font === 'italic' ? 'bg-teal-600 border-teal-600 text-white' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>Cursive</button>
                           <button onClick={() => {setSignature({...signature, font: 'bold'}); notifyChange();}} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${signature.font === 'bold' ? 'bg-teal-600 border-teal-600 text-white' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>Strong</button>
                        </div>
                     </div>
                     
                     <div className="flex-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Signature Preview</label>
                        <div className="h-40 bg-gray-50 dark:bg-slate-800 rounded-[2rem] border border-gray-100 dark:border-slate-700 flex flex-col items-center justify-center relative overflow-hidden group">
                           <div className="absolute top-2 right-2 p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm text-gray-300">
                              <PenTool size={14} />
                           </div>
                           <p className={`text-4xl text-slate-800 dark:text-slate-100 select-none ${signature.font === 'italic' ? 'italic font-serif' : 'font-black'}`}>
                             {signature.content || "Signatory"}
                           </p>
                           <div className="absolute bottom-4 inset-x-0 text-center">
                              <span className="text-[8px] font-black text-teal-600 uppercase tracking-[0.3em]">Code8 Authenticated</span>
                           </div>
                        </div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase mt-3 text-center">This digital identity is legally binding for internal logistics.</p>
                     </div>
                  </div>
               </FormSection>
            </div>
          )}

          {/* TAB: SECURITY */}
          {activeTab === 'security' && (
            <FormSection title="Account & Safety" desc="Manage access permissions and two-factor authentication.">
               <div className="space-y-8">
                  <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800 rounded-[2rem]">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-rose-500 shadow-sm">
                           <Shield size={24} />
                        </div>
                        <div>
                           <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">Two-Factor Auth (2FA)</h4>
                           <p className="text-xs text-gray-400 font-medium">Verify login attempts via registered mobile device.</p>
                        </div>
                     </div>
                     <span className="px-3 py-1 bg-rose-50 text-rose-500 rounded-lg text-[10px] font-black uppercase tracking-widest">Disabled</span>
                  </div>
                  
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Session Management</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Auto-Logout Timer</label>
                           <select className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none text-sm font-bold appearance-none">
                              <option>15 Minutes</option>
                              <option>1 Hour</option>
                              <option>8 Hours (Full Shift)</option>
                           </select>
                        </div>
                        <div>
                           <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block">Login Alerts</label>
                           <div className="flex items-center gap-3 py-3">
                              <button className="w-10 h-5 bg-teal-600 rounded-full relative"><div className="absolute top-1 left-6 w-3 h-3 bg-white rounded-full"/></button>
                              <span className="text-xs font-medium text-gray-500">Notify via Email of new IP logins</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </FormSection>
          )}

          {/* TAB: API */}
          {activeTab === 'api' && (
            <FormSection title="External Gateways" desc="Connect Code8 to your own applications or e-commerce storefront.">
               <div className="space-y-8">
                  <div className="p-6 bg-slate-950 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                     <Cloud size={100} className="absolute -bottom-6 -right-6 opacity-10 group-hover:rotate-12 transition-transform duration-500 text-blue-400" />
                     <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                           <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                             <Terminal size={16} className="text-blue-400" /> Production API Access
                           </h4>
                           <button onClick={() => setShowSecret(!showSecret)} className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1.5 hover:underline">
                             {showSecret ? <><EyeOff size={14}/> Hide Secret</> : <><Eye size={14}/> Reveal Secret</>}
                           </button>
                        </div>
                        <div className="space-y-4">
                           <div>
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1">X-API-KEY</p>
                              <div className="w-full bg-slate-900 px-4 py-3 rounded-xl border border-slate-800 text-sm font-mono text-slate-300 truncate">
                                 {showSecret ? "sk_live_9021_xk89_2201_code8_secure_99" : "••••••••••••••••••••••••••••••••••••••••••••"}
                              </div>
                           </div>
                           <button className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors">
                              <RotateCcw size={12} /> Regenerate Keys
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center justify-between mb-2 px-1">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Webhooks</h4>
                        <button 
                          onClick={() => setShowWebhookModal(true)}
                          className="text-[10px] font-black text-teal-600 uppercase hover:underline flex items-center gap-1"
                        >
                          <Plus size={12} /> New Endpoint
                        </button>
                     </div>
                     
                     <div className="space-y-3">
                        {webhooks.length === 0 ? (
                           <div className="py-8 text-center bg-gray-50/50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-gray-100 dark:border-slate-800">
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No active endpoints found</p>
                           </div>
                        ) : (
                          webhooks.map(wh => (
                            <div key={wh.id} className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl flex items-center justify-between border border-transparent hover:border-blue-200 transition-all group">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
                                     <Webhook size={20} />
                                  </div>
                                  <div>
                                     <p className="text-xs font-black text-slate-800 dark:text-slate-100">{wh.name}</p>
                                     <p className="text-[10px] text-gray-400 font-medium">{wh.url}</p>
                                  </div>
                               </div>
                               <div className="flex items-center gap-4">
                                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${wh.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {wh.status === 'active' ? 'Success (200)' : 'Failed'}
                                  </span>
                                  <button onClick={() => deleteWebhook(wh.id)} className="p-2 text-gray-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                                    <X size={16} />
                                  </button>
                               </div>
                            </div>
                          ))
                        )}
                     </div>
                  </div>
               </div>
            </FormSection>
          )}

        </div>
      </div>

      {/* Floating Save Action Bar */}
      {isDirty && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xl px-4 animate-in slide-in-from-bottom-8 duration-500">
           <div className="bg-slate-900 text-white p-4 rounded-[2rem] shadow-2xl flex items-center justify-between gap-6 border border-slate-800">
              <div className="flex items-center gap-4 ml-2">
                 <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center text-white animate-pulse">
                    <Save size={20} />
                 </div>
                 <div>
                    <h4 className="text-xs font-black uppercase tracking-tight">Unsaved Evolution</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Changes detected in the system registry.</p>
                 </div>
              </div>
              <div className="flex gap-2">
                 <button 
                  onClick={() => {setIsDirty(false); setWebhooks(webhooks.filter(w => !w.id.startsWith('wh_'))); }}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                 >
                   Reset
                 </button>
                 <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-900/40 transition-all active:scale-95 flex items-center gap-3"
                 >
                   {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><CheckCircle2 size={16} /> Deploy Changes</>}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* NEW WEBHOOK MODAL */}
      {showWebhookModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-8">
           <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowWebhookModal(false)} />
           <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col">
              <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/20">
                      <Webhook size={24} />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Provision New Endpoint</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">External Data Synchronization</p>
                   </div>
                </div>
                <button onClick={() => setShowWebhookModal(false)} className="p-2.5 text-gray-300 hover:text-rose-500 transition-all hover:rotate-90">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddWebhook} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Endpoint Friendly Name</label>
                    <div className="relative">
                       <Activity size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input 
                        type="text" 
                        placeholder="e.g. Google Cloud Function Audit" 
                        value={newWebhook.name}
                        onChange={(e) => setNewWebhook({...newWebhook, name: e.target.value})}
                        className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">Payload URL (HTTPS Required)</label>
                    <div className="relative">
                       <Link size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input 
                        type="url" 
                        placeholder="https://events.provider.io/webhook/..." 
                        value={newWebhook.url}
                        onChange={(e) => setNewWebhook({...newWebhook, url: e.target.value})}
                        className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-blue-500/50 text-sm font-bold" 
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex gap-4">
                   <Shield size={20} className="text-blue-600 shrink-0 mt-0.5" />
                   <p className="text-[10px] font-bold text-blue-700 dark:text-blue-300 leading-relaxed uppercase tracking-wider">
                     All webhooks are transmitted with an X-Code8-Signature header for server-side payload verification.
                   </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowWebhookModal(false)}
                    className="flex-1 py-4 bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    Establish Endpoint <ArrowRight size={14} />
                  </button>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
