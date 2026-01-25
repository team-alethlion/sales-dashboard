
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
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-300">
        <div className="flex items-center px-4 py-4 border-b border-gray-50 dark:border-slate-800">
          <Search size={20} className="text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for reports, customers, branches..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 dark:text-slate-100 placeholder-gray-400 text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 uppercase">
              ESC
            </kbd>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query.length === 0 ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-1">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/20 text-slate-700 dark:text-slate-300 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-900 group-hover:text-teal-600 transition-colors shadow-sm">
                          {action.icon}
                        </div>
                        <span className="text-sm font-semibold">{action.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <kbd className="hidden sm:flex px-1.5 py-0.5 text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700">
                          {action.shortcut}
                        </kbd>
                        <ArrowRight size={14} className="text-gray-300 group-hover:text-teal-500 transform group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-lg">
                    <Command size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Pro Tip</h4>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Use shortcuts to navigate even faster. Press <code className="px-1 py-0.5 bg-gray-200 dark:bg-slate-700 rounded text-[10px]">Cmd + K</code> anytime to open this search.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400 mb-4 animate-pulse">
                <Search size={24} />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Searching for "{query}"...</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 max-w-[240px]">We're looking through your branches, reports, and team members.</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-slate-800/30 px-4 py-3 flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><span className="px-1 py-0.5 bg-white dark:bg-slate-900 rounded border border-gray-200 dark:border-slate-700 shadow-xs text-slate-500">↵</span> Select</span>
            <span className="flex items-center gap-1.5"><span className="px-1 py-0.5 bg-white dark:bg-slate-900 rounded border border-gray-200 dark:border-slate-700 shadow-xs text-slate-500">↑↓</span> Navigate</span>
          </div>
          <span className="text-teal-600/60">Powered by Code8 Search</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
