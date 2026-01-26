
import React, { useState } from 'react';
import { 
  LayoutGrid, 
  TrendingUp, 
  ShoppingBag, 
  ClipboardList, 
  MoreHorizontal, 
  X,
  Settings
} from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';

interface BottomNavProps {
  activeView: string;
  onNavigate: (viewId: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate }) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Essential mobile items
  const primaryItems = [
    { id: 'dashboard', name: 'Home', icon: <LayoutGrid size={20} /> },
    { id: 'sales', name: 'Sales', icon: <TrendingUp size={20} /> },
    { id: 'quick_pos', name: 'POS', icon: <ShoppingBag size={20} /> },
    { id: 'inventory', name: 'Stock', icon: <ClipboardList size={20} /> },
  ];

  // Secondary items for the "More" menu
  const secondaryItems = NAVIGATION_ITEMS.filter(
    item => !primaryItems.find(p => p.id === item.id)
  );

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsMoreMenuOpen(false);
  };

  const isItemActive = (itemId: string) => {
    if (itemId === 'sales' && (activeView === 'sales' || activeView === 'new_sale')) return true;
    if (itemId === 'dashboard' && activeView === 'dashboard') return true;
    return activeView === itemId;
  };

  return (
    <>
      {/* Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-gray-100 dark:border-slate-800 pb-safe shadow-[0_-4px_30px_rgba(0,0,0,0.1)] transition-colors">
        <div className="flex items-center justify-around h-16 px-1">
          {primaryItems.map((item) => {
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all active:scale-90 ${
                  active ? 'text-teal-600' : 'text-gray-400'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-colors ${active ? 'bg-teal-50 dark:bg-teal-900/30' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-tighter">{item.name}</span>
              </button>
            );
          })}
          
          <button
            onClick={() => setIsMoreMenuOpen(true)}
            className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all active:scale-90 ${
              isMoreMenuOpen ? 'text-teal-600' : 'text-gray-400'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-colors ${isMoreMenuOpen ? 'bg-teal-50 dark:bg-teal-900/30' : ''}`}>
              <MoreHorizontal size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter">More</span>
          </button>
        </div>
      </nav>

      {/* "More" Menu Bottom Sheet Overlay */}
      {isMoreMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setIsMoreMenuOpen(false)}
          />
          
          <div className="relative bg-white dark:bg-slate-900 rounded-t-[2.5rem] shadow-2xl border-t border-gray-100 dark:border-slate-800 p-6 md:p-10 max-h-[85vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-full duration-400 ease-out">
            {/* Drag Indicator Bar */}
            <div className="w-12 h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full mx-auto mb-8 shrink-0" />

            <div className="flex items-center justify-between mb-8 shrink-0">
              <div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">System <span className="text-teal-600 italic">Modules</span></h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Operational Command Hub</p>
              </div>
              <button 
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-3 bg-gray-50 dark:bg-slate-800 text-gray-400 rounded-2xl hover:text-rose-500 transition-colors shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {secondaryItems.map((item) => {
                  const active = isItemActive(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border transition-all text-center group active:scale-95 ${
                        active 
                        ? 'bg-teal-50 border-teal-200 text-teal-600 dark:bg-teal-900/20 dark:border-teal-800 shadow-sm' 
                        : 'bg-gray-50 border-transparent dark:bg-slate-800/40 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className={`p-3 rounded-2xl transition-all ${active ? 'bg-teal-600 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-gray-400 group-hover:text-teal-600 shadow-sm'}`}>
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="shrink-0 mt-4 pt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
              <div className="flex items-center gap-4">
                <img 
                  src="https://picsum.photos/seed/nicholas/40/40" 
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-gray-50 dark:ring-slate-800"
                  alt="Profile"
                />
                <div>
                  <p className="text-sm font-black text-slate-800 dark:text-slate-100">Nicholas S</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Admin</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleNavigate('settings')}
                  className="p-4 bg-gray-50 dark:bg-slate-800 rounded-[1.25rem] text-gray-400 hover:text-teal-600 transition-colors shadow-sm"
                >
                  <Settings size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
