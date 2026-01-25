
import React from 'react';
import { Box, ChevronDown } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';
import PrinterPairing from './PrinterPairing';

const Sidebar: React.FC = () => {
  const sections = ['CORE', 'BUSINESS', 'SYSTEM'];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 flex flex-col h-full sticky top-0 overflow-hidden shrink-0 transition-colors duration-300">
      {/* Fixed Header */}
      <div className="p-6 flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 bg-teal-900 dark:bg-teal-700 rounded-lg flex items-center justify-center text-white">
          <Box size={20} />
        </div>
        <span className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Code8</span>
      </div>

      {/* Scrollable Middle Section */}
      <nav className="flex-1 px-4 mt-4 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800 hover:scrollbar-thumb-gray-300 dark:hover:scrollbar-thumb-slate-700 pb-6">
        {sections.map((section) => (
          <div key={section}>
            <p className="px-3 text-[10px] font-bold text-gray-400 dark:text-slate-500 mb-4 tracking-[0.15em] uppercase">
              {section}
            </p>
            <div className="space-y-1">
              {NAVIGATION_ITEMS.filter(item => item.section === section).map((item) => (
                <a
                  key={item.id}
                  href="#"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    item.id === 'sales' 
                    ? 'bg-teal-700 text-white shadow-lg shadow-teal-900/10' 
                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-teal-700 dark:hover:text-teal-500'
                  }`}
                >
                  <span className={`${item.id === 'sales' ? 'text-white' : 'text-inherit'}`}>
                    {item.icon}
                  </span>
                  <span className="font-semibold text-sm">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Utility Area */}
      <div className="mt-auto">
        <PrinterPairing />
        
        {/* Fixed Footer Profile */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-all group">
            <img 
              src="https://picsum.photos/seed/nicholas/40/40" 
              alt="Profile" 
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-slate-800 group-hover:ring-teal-500/30 transition-all"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 dark:text-slate-200 truncate">Nicholas S</p>
              <p className="text-xs text-gray-500 dark:text-slate-500 truncate">Admin Account</p>
            </div>
            <ChevronDown size={16} className="text-gray-400 dark:text-slate-600" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
