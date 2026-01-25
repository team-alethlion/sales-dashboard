
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  ChevronRight,
  User,
  MapPin,
  Phone,
  MessageSquare,
  Tag,
  ShoppingBag,
  CreditCard,
  Banknote,
  Percent,
  Calculator,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Send
} from 'lucide-react';

interface Product {
  id: number | string;
  name: string;
  price: number;
  category: string;
}

interface Customer {
  id: number | string;
  name: string;
  phone?: string;
  address?: string;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Premium Coffee Beans', price: 24.50, category: 'Food/Bev' },
  { id: 2, name: 'Organic Green Tea', price: 18.00, category: 'Food/Bev' },
  { id: 3, name: 'Silk Sleep Mask', price: 35.00, category: 'Apparel' },
];

const INITIAL_CUSTOMERS: Customer[] = [
  { id: 1, name: 'John Doe', phone: '+123456789', address: '123 Maple St' },
  { id: 2, name: 'Jane Smith', phone: '+987654321', address: '456 Oak Ave' },
];

interface NewSalePageProps {
  onBack: () => void;
}

const NewSalePage: React.FC<NewSalePageProps> = ({ onBack }) => {
  // --- STATE ---
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  
  // Product Entry State
  const [productQuery, setProductQuery] = useState('');
  const [productPrice, setProductPrice] = useState<string>('');
  
  // Customer State
  const [customerQuery, setCustomerQuery] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Communication State
  const [sendThankYou, setSendThankYou] = useState(false);
  const [commChannel, setCommChannel] = useState<'whatsapp' | 'sms' | 'both'>('whatsapp');

  // Sale Info State
  const [saleSource, setSaleSource] = useState('Walk-in');
  const [taxRate, setTaxRate] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState('Unpaid');
  const [cashAccount, setCashAccount] = useState('No Account (General)');

  // Summary State
  const [discount, setDiscount] = useState<number>(0);
  const [amountPaid, setAmountPaid] = useState<number>(0);

  // --- DERIVED DATA ---
  const filteredProducts = INITIAL_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(productQuery.toLowerCase())
  );

  const filteredCustomers = INITIAL_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(customerQuery.toLowerCase())
  );

  const subtotal = useMemo(() => 
    cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0),
  [cart]);

  const taxAmount = (subtotal - discount) * (taxRate / 100);
  const total = subtotal - discount + taxAmount;
  const balance = total - amountPaid;

  // --- HANDLERS ---
  const handleAddProduct = () => {
    if (!productQuery) return;
    
    const existing = INITIAL_PRODUCTS.find(p => p.name.toLowerCase() === productQuery.toLowerCase());
    const finalProduct: Product = existing || {
      id: `new-${Date.now()}`,
      name: productQuery,
      price: parseFloat(productPrice) || 0,
      category: 'General'
    };

    setCart(prev => {
      const inCart = prev.find(item => item.product.name === finalProduct.name);
      if (inCart) {
        return prev.map(item => 
          item.product.name === finalProduct.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product: finalProduct, quantity: 1 }];
    });

    setProductQuery('');
    setProductPrice('');
  };

  const updateQuantity = (id: number | string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">New Sale</h1>
          <p className="text-sm text-gray-400 font-medium">Point of Sale Transaction Terminal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Forms */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Add Products Section */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Plus size={14} className="text-teal-600" />
              1. Add Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7 relative">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Product Name / Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text"
                    value={productQuery}
                    onChange={(e) => setProductQuery(e.target.value)}
                    placeholder="Search or enter new product..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium"
                  />
                </div>
                {productQuery && filteredProducts.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 z-50 overflow-hidden">
                    {filteredProducts.map(p => (
                      <button 
                        key={p.id}
                        onClick={() => { setProductQuery(p.name); setProductPrice(p.price.toString()); }}
                        className="w-full text-left px-4 py-3 text-xs hover:bg-teal-50 dark:hover:bg-teal-900/20 border-b border-gray-50 dark:border-slate-700 last:border-none flex justify-between"
                      >
                        <span className="font-bold">{p.name}</span>
                        <span className="text-teal-600">${p.price}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="md:col-span-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Price ($)</label>
                <input 
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold text-teal-600"
                />
              </div>
              <div className="md:col-span-2 flex items-end">
                <button 
                  onClick={handleAddProduct}
                  className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-900/10"
                >
                  <Plus size={18} />
                  ADD
                </button>
              </div>
            </div>
          </section>

          {/* 2. Customer Information */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <User size={14} className="text-teal-600" />
              2. Customer Details
            </h3>
            <div className="space-y-4">
              <div className="relative">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Customer Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text"
                    value={customerQuery}
                    onChange={(e) => setCustomerQuery(e.target.value)}
                    placeholder="Existing or new customer..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium"
                  />
                </div>
                {customerQuery && filteredCustomers.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 z-50 overflow-hidden">
                    {filteredCustomers.map(c => (
                      <button 
                        key={c.id}
                        onClick={() => { 
                          setSelectedCustomer(c); 
                          setCustomerQuery(c.name); 
                          setCustomerPhone(c.phone || ''); 
                          setCustomerAddress(c.address || ''); 
                        }}
                        className="w-full text-left px-4 py-3 text-xs hover:bg-teal-50 dark:hover:bg-teal-900/20 border-b border-gray-50 dark:border-slate-700 last:border-none"
                      >
                        <p className="font-bold">{c.name}</p>
                        <p className="text-[10px] text-gray-400">{c.phone}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Phone (Optional)</label>
                  <Phone className="absolute left-3 bottom-3.5 text-gray-400" size={14} />
                  <input 
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                    placeholder="+254..."
                  />
                </div>
                <div className="relative">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-1 block">Address (Optional)</label>
                  <MapPin className="absolute left-3 bottom-3.5 text-gray-400" size={14} />
                  <input 
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                    placeholder="Street, City..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 3. Sale Info */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Tag size={14} className="text-teal-600" />
              3. Sale Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-2 block">Source</label>
                <div className="flex flex-wrap gap-2">
                  {['Walk-in', 'Phone', 'Online', 'Referral', 'Returning'].map(s => (
                    <button 
                      key={s}
                      onClick={() => setSaleSource(s)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                        saleSource === s ? 'bg-teal-600 border-teal-600 text-white' : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-500'
                      }`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-2 block">Tax Rate (%)</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input 
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-2 block">Payment Status</label>
                <select 
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold appearance-none cursor-pointer"
                >
                  {['Unpaid', 'Quote (No Stock Deduction)', 'Installment', 'Partial'].map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 mb-2 block">Cash Account</label>
                <select 
                  value={cashAccount}
                  onChange={(e) => setCashAccount(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold appearance-none cursor-pointer"
                >
                  <option>No Account (General)</option>
                  <option>Main Petty Cash</option>
                  <option>M-Pesa Business</option>
                  <option>Bank Deposit</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Cart & Summary */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
          
          {/* Cart Items */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-50 dark:border-slate-800 shadow-sm flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <ShoppingBag size={20} className="text-teal-600" />
                Cart Items
              </h3>
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-gray-500 uppercase">
                {cart.length} Products
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 max-h-[300px] pr-2 scrollbar-thin scrollbar-thumb-gray-100">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                  <ShoppingBag size={48} className="mb-4 text-gray-300" />
                  <p className="text-xs font-bold uppercase tracking-widest">Cart is Empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex items-center gap-4 bg-gray-50 dark:bg-slate-800/50 p-3 rounded-2xl group transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{item.product.name}</p>
                      <p className="text-[10px] text-teal-600 font-bold">${item.product.price.toFixed(2)} / unit</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-xl px-2 py-1 shadow-sm border border-gray-50 dark:border-slate-800">
                      <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 hover:text-rose-500 transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 hover:text-teal-600 transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                    <button 
                      onClick={() => updateQuantity(item.product.id, -item.quantity)}
                      className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Communication Section */}
            <div className="mt-8 pt-6 border-t border-gray-50 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${sendThankYou ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-400'}`}>
                    <MessageSquare size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Send Thank You Note</span>
                </div>
                <button 
                  onClick={() => setSendThankYou(!sendThankYou)}
                  className={`w-10 h-5 rounded-full relative transition-all ${sendThankYou ? 'bg-teal-600' : 'bg-gray-200 dark:bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${sendThankYou ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              {sendThankYou && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Choose Channel</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare size={12} /> },
                      { id: 'sms', label: 'SMS', icon: <Smartphone size={12} /> },
                      { id: 'both', label: 'Both', icon: <Send size={12} /> }
                    ].map(chan => (
                      <button
                        key={chan.id}
                        onClick={() => setCommChannel(chan.id as any)}
                        className={`flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                          commChannel === chan.id 
                          ? 'bg-teal-50 border-teal-200 text-teal-700 dark:bg-teal-900/20 dark:border-teal-800' 
                          : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-400'
                        }`}
                      >
                        {chan.icon}
                        {chan.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
              <Calculator size={80} />
            </div>
            
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <CreditCard size={14} className="text-teal-400" />
              Summary
            </h3>

            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm font-medium">Discount (Flat $)</span>
                <input 
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-20 bg-slate-800 border-none rounded-lg px-2 py-1 text-xs text-right font-bold text-rose-400 focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Tax ({taxRate}%)</span>
                <span className="font-bold text-slate-200">${taxAmount.toFixed(2)}</span>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-black tracking-tight">TOTAL</span>
                  <span className="text-3xl font-black text-teal-400">${total.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Amount Paid</label>
                    <div className="relative">
                      <Banknote className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                      <input 
                        type="number"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(parseFloat(e.target.value) || 0)}
                        className="w-full pl-8 pr-2 py-2 bg-slate-800 border-none rounded-xl text-sm font-bold text-teal-400 focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Balance</label>
                    <div className={`w-full px-3 py-2 rounded-xl text-sm font-bold flex items-center justify-between ${balance <= 0 ? 'bg-teal-500/10 text-teal-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      <span>${Math.abs(balance).toFixed(2)}</span>
                      {balance <= 0 ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                disabled={cart.length === 0}
                className="w-full mt-8 py-4 bg-teal-500 text-slate-900 rounded-2xl font-black text-sm shadow-xl shadow-teal-500/20 hover:bg-teal-400 active:scale-[0.98] transition-all disabled:opacity-30 disabled:hover:bg-teal-500 flex items-center justify-center gap-2 group"
              >
                COMPLETE TRANSACTION
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSalePage;
