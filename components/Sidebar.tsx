
import React from 'react';
import { Box, ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';
import PrinterPairing from './PrinterPairing';

interface SidebarProps {
  activeView: string;
  onNavigate: (viewId: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, isCollapsed, onToggle }) => {
  const sections = ['CORE', 'BUSINESS', 'SYSTEM'];

  const isItemActive = (itemId: string) => {
    if (itemId === 'sales' && (activeView === 'sales' || activeView === 'new_sale')) return true;
    if (itemId === 'customers' && (activeView === 'customers' || activeView === 'new_customer')) return true;
    if (itemId === 'products' && (activeView === 'products' || activeView === 'new_product')) return true;
    if (itemId === 'inventory' && activeView === 'inventory') return true;
    if (itemId === 'dashboard' && activeView === 'dashboard') return true;
    if (itemId === 'carriage_inwards' && activeView === 'carriage_inwards') return true;
    return activeView === itemId;
  };

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 flex flex-col h-full sticky top-0 overflow-hidden shrink-0 transition-all duration-300 ease-in-out z-20`}>
      {/* Fixed Header */}
      <div className={`p-6 flex items-center justify-between shrink-0 ${isCollapsed ? 'px-4' : 'px-6'}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-900 dark:bg-teal-700 rounded-lg flex items-center justify-center text-white shrink-0">
            <Box size={20} />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-all duration-300">Code8</span>
          )}
        </div>
        <button 
          onClick={onToggle}
          className="p-1.5 text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* Scrollable Middle Section */}
      <nav className="flex-1 px-4 mt-4 space-y-8 overflow-y-auto no-scrollbar pb-6">
        {sections.map((section) => (
          <div key={section}>
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold text-gray-400 dark:text-slate-500 mb-4 tracking-[0.15em] uppercase transition-all duration-300">
                {section}
              </p>
            )}
            <div className="space-y-1">
              {NAVIGATION_ITEMS.filter(item => item.section === section).map((item) => {
                const active = isItemActive(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={isCollapsed ? item.name : undefined}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                      isCollapsed ? 'justify-center' : 'px-3'
                    } ${
                      active 
                      ? 'bg-teal-700 text-white shadow-lg shadow-teal-900/10' 
                      : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-teal-700 dark:hover:text-teal-500'
                    }`}
                  >
                    <span className={`${active ? 'text-white' : 'text-inherit'} shrink-0`}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="font-semibold text-sm whitespace-nowrap overflow-hidden transition-all duration-300">{item.name}</span>
                    )}
                  </button>
                );
              })}
            </div>
            {isCollapsed && <div className="h-px bg-gray-50 dark:bg-slate-800 my-4 mx-2" />}
          </div>
        ))}
      </nav>

      {/* Utility Area (Printer Pairing) */}
      <div className={`py-6 shrink-0 border-t border-gray-50 dark:border-slate-800/50 bg-gray-50/20 dark:bg-slate-900/50 ${isCollapsed ? 'px-4' : 'px-5'}`}>
        <PrinterPairing isCollapsed={isCollapsed} />
      </div>

      {/* Fixed Footer Profile */}
      <div className="p-4 border-t border-gray-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-all group ${isCollapsed ? 'justify-center' : ''}`}>
          <img 
            src="https://picsum.photos/seed/nicholas/40/40" 
            alt="Profile" 
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-slate-800 group-hover:ring-teal-500/30 transition-all shrink-0"
          />
          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0 transition-all duration-300">
                <p className="text-sm font-bold text-gray-800 dark:text-slate-200 truncate">Nicholas S</p>
                <p className="text-xs text-gray-500 dark:text-slate-500 truncate text-[10px] font-medium">Admin Account</p>
              </div>
              <ChevronDown size={14} className="text-gray-400 dark:text-slate-600 group-hover:text-teal-600 transition-colors" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
