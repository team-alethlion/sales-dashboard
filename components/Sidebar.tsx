
import React from 'react';
import { Box, ChevronDown } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 flex flex-col h-full sticky top-0 overflow-y-auto shrink-0 transition-colors duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-teal-900 dark:bg-teal-700 rounded-lg flex items-center justify-center text-white">
          <Box size={20} />
        </div>
        <span className="text-xl font-bold text-slate-800 dark:text-slate-100">Code8</span>
      </div>

      <nav className="flex-1 px-4 mt-4">
        <div className="mb-8">
          <p className="px-3 text-xs font-semibold text-gray-400 dark:text-slate-500 mb-4 tracking-wider uppercase">MAIN MENU</p>
          <div className="space-y-1">
            {NAVIGATION_ITEMS.filter(item => item.section === 'MAIN MENU').map((item) => (
              <a
                key={item.id}
                href="#"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  item.id === 'overview' 
                  ? 'bg-teal-700 text-white shadow-md' 
                  : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-teal-700 dark:hover:text-teal-500'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 dark:text-slate-500 mb-4 tracking-wider uppercase">OTHER</p>
          <div className="space-y-1">
            {NAVIGATION_ITEMS.filter(item => item.section === 'OTHER').map((item) => (
              <a
                key={item.id}
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-teal-700 dark:hover:text-teal-500 transition-all"
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-all">
          <img 
            src="https://picsum.photos/seed/nicholas/40/40" 
            alt="Profile" 
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 truncate">Nicholas S</p>
            <p className="text-xs text-gray-500 dark:text-slate-500 truncate">nicholas.s@email.com</p>
          </div>
          <ChevronDown size={16} className="text-gray-400 dark:text-slate-600" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
