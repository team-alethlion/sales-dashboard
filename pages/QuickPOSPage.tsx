
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Zap, 
  Monitor, 
  Smartphone, 
  CreditCard, 
  Banknote, 
  ChevronRight, 
  Printer, 
  X,
  LayoutGrid,
  CheckCircle2,
  Loader2,
  Tag
} from 'lucide-react';

interface POSProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string;
}

const POPULAR_PRODUCTS: POSProduct[] = [
  { id: 'P01', name: 'Coffee Beans', price: 24.50, category: 'Food', color: 'bg-amber-100 text-amber-700' },
  { id: 'P02', name: 'Green Tea', price: 18.00, category: 'Food', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'P03', name: 'Silk Mask', price: 35.00, category: 'Apparel', color: 'bg-blue-100 text-blue-700' },
  { id: 'P04', name: '32" Monitor', price: 299.00, category: 'Electronics', color: 'bg-slate-100 text-slate-700' },
  { id: 'P05', name: 'Office Chair', price: 145.00, category: 'Home', color: 'bg-rose-100 text-rose-700' },
  { id: 'P06', name: 'Desk Mat', price: 12.00, category: 'Home', color: 'bg-teal-100 text-teal-700' },
  { id: 'P07', name: 'Smart Bulb', price: 15.00, category: 'Electronics', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'P08', name: 'Travel Bag', price: 85.00, category: 'Apparel', color: 'bg-orange-100 text-orange-700' },
];

interface QuickPOSPageProps {
  onBack: () => void;
}

const QuickPOSPage: React.FC<QuickPOSPageProps> = ({ onBack }) => {
  const [cart, setCart] = useState<{ product: POSProduct; qty: number }[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFinishing, setIsFinishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'M-Pesa' | 'Card'>('Cash');

  const categories = ['All', ...Array.from(new Set(POPULAR_PRODUCTS.map(p => p.category)))];

  const filteredProducts = POPULAR_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const subtotal = useMemo(() => cart.reduce((acc, curr) => acc + (curr.product.price * curr.qty), 0), [cart]);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const addToCart = (product: POSProduct) => {
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        return { ...item, qty: Math.max(0, item.qty + delta) };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const handleFinish = () => {
    if (cart.length === 0) return;
    setIsFinishing(true);
    setTimeout(() => {
      setIsFinishing(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setCart([]);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-gray-500 hover:text-teal-600 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Quick <span className="text-teal-600 italic">Terminal</span></h1>
            <div className="flex items-center gap-2 mt-0.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">POS-01 Online • Nairobi Hub</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700">
             <Printer size={14} className="text-teal-600" />
             <span className="text-[10px] font-black text-gray-500 uppercase">Printer Ready</span>
           </div>
           <button className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-black transition-all">
             <Zap size={18} />
           </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Product Catalog */}
        <div className="lg:col-span-8 flex flex-col min-h-0">
           <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input 
                  type="text" 
                  placeholder="Quick search or Scan barcode..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium shadow-sm"
                 />
              </div>
              <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-x-auto no-scrollbar">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                      activeCategory === cat ? 'bg-teal-600 text-white shadow-lg' : 'text-gray-400 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
           </div>

           <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                 {filteredProducts.map(p => (
                   <button 
                    key={p.id}
                    onClick={() => addToCart(p)}
                    className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-50 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left flex flex-col group relative overflow-hidden"
                   >
                     <div className={`w-10 h-10 ${p.color} rounded-2xl flex items-center justify-center mb-4 font-black text-xs shadow-inner`}>
                       {p.id}
                     </div>
                     <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight group-hover:text-teal-600 transition-colors">{p.name}</h3>
                     <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{p.category}</p>
                     <div className="mt-auto pt-4 flex items-center justify-between">
                        <span className="text-base font-black text-slate-700 dark:text-slate-200">${p.price.toFixed(2)}</span>
                        <div className="w-8 h-8 bg-teal-50 dark:bg-teal-900/30 text-teal-600 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus size={16} />
                        </div>
                     </div>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Checkout Console */}
        <div className="lg:col-span-4 flex flex-col min-h-0">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-xl flex flex-col h-full overflow-hidden relative">
              
              {/* Cart Section */}
              <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between shrink-0">
                 <div className="flex items-center gap-3">
                    <ShoppingBag size={24} className="text-teal-600" />
                    <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">Active Sale</h3>
                 </div>
                 <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase text-gray-500">
                    {cart.length} Items
                 </span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                 {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-20 text-center px-12">
                       <LayoutGrid size={64} className="mb-6" />
                       <p className="text-sm font-black uppercase tracking-widest leading-relaxed">Add items from the catalog to begin</p>
                    </div>
                 ) : (
                    <div className="space-y-3">
                       {cart.map(item => (
                         <div key={item.product.id} className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-between animate-in slide-in-from-right-2">
                            <div className="flex-1 min-w-0 pr-4">
                               <p className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">{item.product.name}</p>
                               <p className="text-[10px] font-bold text-teal-600">${(item.product.price * item.qty).toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                               <button onClick={() => updateQty(item.product.id, -1)} className="p-1.5 bg-white dark:bg-slate-900 rounded-lg text-gray-400 hover:text-rose-500 transition-colors shadow-sm">
                                 <Minus size={12} />
                               </button>
                               <span className="w-6 text-center text-xs font-black">{item.qty}</span>
                               <button onClick={() => updateQty(item.product.id, 1)} className="p-1.5 bg-white dark:bg-slate-900 rounded-lg text-gray-400 hover:text-teal-600 transition-colors shadow-sm">
                                 <Plus size={12} />
                               </button>
                            </div>
                         </div>
                       ))}
                    </div>
                 )}
              </div>

              {/* Checkout Controls */}
              <div className="p-8 bg-gray-50/50 dark:bg-slate-800/30 border-t border-gray-50 dark:border-slate-800 shrink-0 space-y-6">
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                       <span className="font-bold text-gray-400 uppercase">Subtotal</span>
                       <span className="font-black text-slate-600 dark:text-slate-400">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="font-bold text-gray-400 uppercase">Tax (VAT 16%)</span>
                       <span className="font-black text-slate-600 dark:text-slate-400">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                       <span className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">Net Payable</span>
                       <span className="text-3xl font-black text-teal-600 tracking-tighter">${total.toFixed(2)}</span>
                    </div>
                 </div>

                 {/* Payment Methods */}
                 <div className="grid grid-cols-3 gap-2">
                    {[
                       { id: 'Cash', icon: <Banknote size={14} /> },
                       { id: 'M-Pesa', icon: <Smartphone size={14} /> },
                       { id: 'Card', icon: <CreditCard size={14} /> }
                    ].map(method => (
                      <button 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border transition-all ${
                          paymentMethod === method.id 
                          ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20 text-teal-600' 
                          : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-400'
                        }`}
                      >
                         {method.icon}
                         <span className="text-[8px] font-black uppercase">{method.id}</span>
                      </button>
                    ))}
                 </div>

                 <button 
                    disabled={cart.length === 0 || isFinishing}
                    onClick={handleFinish}
                    className="w-full py-5 bg-teal-600 text-white rounded-[1.5rem] font-black text-sm shadow-2xl shadow-teal-900/20 hover:bg-teal-700 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                 >
                    {isFinishing ? <Loader2 className="animate-spin" size={20} /> : (
                      <>FINALIZE & PRINT <ChevronRight size={20} /></>
                    )}
                 </button>
              </div>

              {/* Success Overlay */}
              {showSuccess && (
                <div className="absolute inset-0 bg-teal-600/95 flex flex-col items-center justify-center text-white p-8 text-center animate-in fade-in slide-in-from-bottom-4 z-50">
                   <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
                      <CheckCircle2 size={48} />
                   </div>
                   <h4 className="text-2xl font-black italic tracking-tight uppercase">Checkout Success</h4>
                   <p className="text-teal-50 text-sm mt-2 opacity-80">Transaction archived and receipt sent to queue.</p>
                   <p className="text-[10px] font-black mt-8 uppercase tracking-[0.4em] opacity-40">Code8 Secured</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPOSPage;
