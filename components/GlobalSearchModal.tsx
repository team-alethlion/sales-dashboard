
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Command, TrendingUp, Users, Package, Settings, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the animation has started before focusing
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { icon: <TrendingUp size={16} />, label: 'View Sales Reports', shortcut: 'S' },
    { icon: <Users size={16} />, label: 'Manage Customers', shortcut: 'C' },
    { icon: <Package size={16} />, label: 'Inventory Check', shortcut: 'I' },
    { icon: <Settings size={16} />, label: 'System Settings', shortcut: ',' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center sm:pt-[15vh] overflow-hidden">
      {/* Backdrop - Hidden on smallest mobile screens for full-screen feel */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300 hidden sm:block"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full h-full sm:h-auto sm:max-w-2xl bg-white dark:bg-slate-900 rounded-none sm:rounded-2xl shadow-2xl border-none sm:border border-gray-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in sm:zoom-in-95 sm:slide-in-from-top-4 duration-300">
        <div className="flex items-center px-6 py-5 border-b border-gray-50 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <Search size={22} className="text-teal-600 mr-4" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search anything..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 dark:text-slate-100 placeholder-gray-400 text-lg font-bold"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-black text-gray-400 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 uppercase tracking-widest">
              ESC
            </kbd>
            <button 
              onClick={onClose} 
              className="p-2.5 bg-gray-50 dark:bg-slate-800 text-gray-400 rounded-lg hover:text-rose-500 transition-colors shadow-sm"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
          {query.length === 0 ? (
            <div className="space-y-10">
              <div>
                <h3 className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-[0.3em] px-2 mb-4">Immediate Actions</h3>
                <div className="grid grid-cols-1 gap-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      className="group flex items-center justify-between p-4 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/20 text-slate-700 dark:text-slate-300 transition-all text-left border border-transparent hover:border-teal-100 dark:hover:border-teal-800"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-900 group-hover:text-teal-600 transition-all shadow-sm">
                          {action.icon}
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">{action.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <kbd className="hidden sm:flex px-2 py-0.5 text-[10px] font-black text-gray-300 bg-gray-50 dark:bg-slate-800 rounded-md border border-gray-100 dark:border-slate-700">
                          {action.shortcut}
                        </kbd>
                        <ArrowRight size={16} className="text-gray-300 group-hover:text-teal-500 transform group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 dark:bg-teal-950/20 p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12 group-hover:scale-110 transition-transform">
                   <Command size={100} className="text-white" />
                </div>
                <div className="flex items-start gap-4 relative z-10">
                  <div className="p-3 bg-teal-500 text-white rounded-lg shadow-lg">
                    <Command size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Power User Tip</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                      Press <code className="px-1.5 py-0.5 bg-slate-800 rounded text-teal-400 font-bold mx-1">⌘K</code> to invoke search globally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-teal-600 mb-6 shadow-inner animate-pulse">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">Locating "{query}"...</h3>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 max-w-[280px] font-medium uppercase tracking-widest">Scouring registries, reports, and network nodes</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-slate-800/50 px-6 py-4 flex items-center justify-between text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] shrink-0 border-t sm:border-none">
          <div className="hidden sm:flex gap-6">
            <span className="flex items-center gap-2"><span className="px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded border border-gray-200 dark:border-slate-700 shadow-sm text-slate-500">↵</span> Select</span>
            <span className="flex items-center gap-2"><span className="px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded border border-gray-200 dark:border-slate-700 shadow-sm text-slate-500">↑↓</span> Navigate</span>
          </div>
          <div className="sm:hidden flex gap-4">
             <span>Tap to result</span>
          </div>
          <span className="text-teal-600">Secure Core Search</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
