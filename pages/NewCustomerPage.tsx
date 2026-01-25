
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Tag, 
  MessageSquare, 
  Save, 
  AlertCircle,
  Smartphone,
  CheckCircle2,
  FileText,
  Bookmark
} from 'lucide-react';

interface NewCustomerPageProps {
  onBack: () => void;
}

const NewCustomerPage: React.FC<NewCustomerPageProps> = ({ onBack }) => {
  // --- STATE ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    zip: '',
    group: 'Retail',
    loyaltyTier: 'Bronze',
    newsletter: true,
    whatsappUpdates: false,
    smsMarketing: false,
    notes: '',
    tags: [] as string[]
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- HANDLERS ---
  const handleSave = () => {
    if (!formData.name) return;
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => {
        onBack();
      }, 1500);
    }, 1000);
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag) 
        : [...prev.tags, tag]
    }));
  };

  const QUICK_TAGS = ['High Value', 'Complaints History', 'Frequent Buyer', 'Family Account', 'Corporate'];

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Register <span className="text-teal-600">Customer</span></h1>
            <p className="text-sm text-gray-400 font-medium">Create a new profile in your CRM database</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-8 space-y-6">
          {/* Primary Info */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm transition-colors">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <User size={14} className="text-teal-600" />
              1. Basic Profile
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Johnathan Doe"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+254..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Address Info */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm transition-colors">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <MapPin size={14} className="text-teal-600" />
              2. Geographic Location
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Street Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                  <textarea 
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Building, Street, Area..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">City</label>
                  <input 
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Region/State</label>
                  <input 
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">ZIP Code</label>
                  <input 
                    type="text"
                    value={formData.zip}
                    onChange={(e) => setFormData({...formData, zip: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Notes & Important Info */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm transition-colors">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <FileText size={14} className="text-teal-600" />
              3. Internal Remarks
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-2 block">Notes & Observations</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400" size={16} />
                  <textarea 
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Enter relevant details about this client's preferences, behavior, or history..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-3 block">Quick Identification Tags</label>
                <div className="flex flex-wrap gap-2">
                  {QUICK_TAGS.map(tag => {
                    const active = formData.tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-2 transition-all border ${
                          active 
                          ? 'bg-teal-500 border-teal-500 text-white' 
                          : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-400 hover:border-teal-200'
                        }`}
                      >
                        <Bookmark size={10} className={active ? 'text-teal-100' : 'text-gray-300'} />
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar settings */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm transition-colors">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Tag size={14} className="text-teal-600" />
              4. Classification
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-2 block">Customer Group</label>
                <div className="flex flex-wrap gap-2">
                  {['Retail', 'VIP', 'Wholesaler', 'Partner'].map(g => (
                    <button 
                      key={g}
                      onClick={() => setFormData({...formData, group: g})}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                        formData.group === g 
                        ? 'bg-teal-600 border-teal-600 text-white' 
                        : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500'
                      }`}
                    >
                      {g.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-50 dark:border-slate-800">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-3 block">Communications</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Newsletter</span>
                    </div>
                    <button 
                      onClick={() => setFormData({...formData, newsletter: !formData.newsletter})}
                      className={`w-8 h-4 rounded-full relative transition-all ${formData.newsletter ? 'bg-teal-600' : 'bg-gray-200 dark:bg-slate-700'}`}
                    >
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${formData.newsletter ? 'left-4.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={14} className="text-gray-400" />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">WhatsApp</span>
                    </div>
                    <button 
                      onClick={() => setFormData({...formData, whatsappUpdates: !formData.whatsappUpdates})}
                      className={`w-8 h-4 rounded-full relative transition-all ${formData.whatsappUpdates ? 'bg-teal-600' : 'bg-gray-200 dark:bg-slate-700'}`}
                    >
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${formData.whatsappUpdates ? 'left-4.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone size={14} className="text-gray-400" />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">SMS Marketing</span>
                    </div>
                    <button 
                      onClick={() => setFormData({...formData, smsMarketing: !formData.smsMarketing})}
                      className={`w-8 h-4 rounded-full relative transition-all ${formData.smsMarketing ? 'bg-teal-600' : 'bg-gray-200 dark:bg-slate-700'}`}
                    >
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${formData.smsMarketing ? 'left-4.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <button 
            onClick={handleSave}
            disabled={saving || !formData.name || success}
            className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-3 shadow-xl ${
              success 
              ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
              : 'bg-teal-600 text-white shadow-teal-500/20 hover:bg-teal-700 disabled:opacity-50'
            }`}
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : success ? (
              <>
                <CheckCircle2 size={20} />
                CUSTOMER SAVED
              </>
            ) : (
              <>
                <Save size={20} />
                REGISTER CUSTOMER
              </>
            )}
          </button>
          
          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl flex gap-3 transition-colors">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 leading-relaxed uppercase tracking-wider">
              Note: Fields marked with * are mandatory. Providing an email or phone enables automated receipt delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCustomerPage;
