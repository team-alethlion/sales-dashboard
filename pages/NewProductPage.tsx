
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Package, 
  Tag, 
  DollarSign, 
  Truck, 
  Layers, 
  AlertTriangle, 
  Save, 
  Image as ImageIcon,
  CheckCircle2,
  Barcode,
  TrendingUp,
  Hash,
  Info
} from 'lucide-react';

interface NewProductPageProps {
  onBack: () => void;
}

const NewProductPage: React.FC<NewProductPageProps> = ({ onBack }) => {
  // --- STATE ---
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: 'Electronics',
    brand: '',
    costPrice: '',
    sellingPrice: '',
    tax: '16',
    initialStock: '',
    minStock: '5',
    supplier: '',
    description: '',
    status: 'Active',
    tags: [] as string[]
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- DERIVED CALCULATIONS ---
  const financials = useMemo(() => {
    const cost = parseFloat(formData.costPrice) || 0;
    const sell = parseFloat(formData.sellingPrice) || 0;
    const profit = sell - cost;
    const margin = sell > 0 ? (profit / sell) * 100 : 0;
    return { profit, margin };
  }, [formData.costPrice, formData.sellingPrice]);

  // --- HANDLERS ---
  const handleSave = () => {
    if (!formData.name || !formData.costPrice || !formData.sellingPrice) return;
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

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-lg text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Add New <span className="text-teal-600">Product</span></h1>
            <p className="text-sm text-gray-400 font-medium">Register a new item in your inventory system</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Basic Identity */}
          <section className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm transition-colors">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Package size={14} className="text-teal-600" />
              1. Identity & Classification
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Product Name *</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. UltraHD Curved Monitor 32\"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-lg border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">SKU Code</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({...formData, sku: e.target.value})}
                      placeholder="PROD-001"
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-lg border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Barcode (EAN/UPC)</label>
                  <div className="relative">
                    <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="text"
                      value={formData.barcode}
                      onChange={(e) => setFormData({...formData, barcode: e.target.value})}
                      placeholder="7102930..."
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-lg border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Primary Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-lg border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold appearance-none cursor-pointer"
                  >
                    <option>Electronics</option>
                    <option>Home & Living</option>
                    <option>Apparel</option>
                    <option>Food & Bev</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Brand / Manufacturer</label>
                  <input 
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    placeholder="e.g. Samsung"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-lg border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Financials */}
          <section className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <DollarSign size={14} className="text-teal-600" />
                2. Financial Configuration
              </h3>
              {financials.margin > 0 && (
                <div className="flex items-center gap-2 px-3 py-1 bg-teal-50 dark:bg-teal-900/20 rounded-lg animate-in zoom-in-95">
                  <TrendingUp size={12} className="text-teal-600" />
                  <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest">
                    Margin: {financials.margin.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Cost Price ($) *</label>
                <input 
                  type="number"
                  value={formData.costPrice}
                  onChange={(e) => setFormData({...formData, costPrice: e.target.value})}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-lg border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black text-slate-700 dark:text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Selling Price ($) *</label>
                <input 
                  type="number"
                  value={formData.sellingPrice}
                  onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-lg border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black text-teal-600"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Tax Type (%)</label>
                <select 
                  value={formData.tax}
                  onChange={(e) => setFormData({...formData, tax: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-lg border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold"
                >
                  <option value="16">VAT (16%)</option>
                  <option value="0">Zero Rated (0%)</option>
                  <option value="exempt">Exempt</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 3: Inventory & Supply */}
          <section className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm transition-colors">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Layers size={14} className="text-teal-600" />
              3. Stock & Supply Chain
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Opening Stock</label>
                    <input 
                      type="number"
                      value={formData.initialStock}
                      onChange={(e) => setFormData({...formData, initialStock: e.target.value})}
                      placeholder="0"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-lg border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Low Stock Alert</label>
                    <input 
                      type="number"
                      value={formData.minStock}
                      onChange={(e) => setFormData({...formData, minStock: e.target.value})}
                      placeholder="5"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-lg border-none focus:ring-2 focus:ring-rose-500/50 text-sm font-bold text-rose-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Preferred Supplier</label>
                  <div className="relative">
                    <Truck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <select 
                      value={formData.supplier}
                      onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-lg border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold appearance-none cursor-pointer"
                    >
                      <option value="">Select Supplier...</option>
                      <option>Global Tech Inc.</option>
                      <option>Green Harvest Co.</option>
                      <option>LogiLink Logistics</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Product Description</label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Technical specs, features, and selling points..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-lg border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none h-[104px]"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status & Media */}
          <section className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm transition-colors">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Tag size={14} className="text-teal-600" />
              Status & Media
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-3 block">Product Status</label>
                <div className="flex gap-2">
                  {['Active', 'Draft', 'Archived'].map(st => (
                    <button
                      key={st}
                      onClick={() => setFormData({...formData, status: st})}
                      className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all border ${
                        formData.status === st 
                        ? 'bg-teal-600 border-teal-600 text-white' 
                        : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-2 block">Product Images</label>
                <div className="border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-xl p-8 text-center bg-gray-50/30 hover:border-teal-200 transition-all cursor-pointer">
                  <ImageIcon size={32} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upload Media</p>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button 
              onClick={handleSave}
              disabled={saving || !formData.name || success}
              className={`w-full py-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-3 shadow-xl ${
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
                  PRODUCT REGISTERED
                </>
              ) : (
                <>
                  <Save size={20} />
                  SAVE PRODUCT
                </>
              )}
            </button>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl flex gap-3">
              <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[10px] font-bold text-blue-700 dark:text-blue-400 leading-relaxed uppercase tracking-wider">
                Tip: Adding a Barcode allows for faster checkout using the POS scanner module. SKU codes are used for internal stock tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductPage;
