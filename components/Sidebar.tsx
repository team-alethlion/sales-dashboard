
import React from 'react';
import { Box, ChevronDown } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full sticky top-0 overflow-y-auto shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-teal-900 rounded-lg flex items-center justify-center text-white">
          <Box size={20} />
        </div>
        <span className="text-xl font-bold text-slate-800">Enelys</span>
      </div>

      <nav className="flex-1 px-4 mt-4">
        <div className="mb-8">
          <p className="px-3 text-xs font-semibold text-gray-400 mb-4 tracking-wider uppercase">MAIN MENU</p>
          <div className="space-y-1">
            {NAVIGATION_ITEMS.filter(item => item.section === 'MAIN MENU').map((item) => (
              <a
                key={item.id}
                href="#"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  item.id === 'overview' 
                  ? 'bg-teal-700 text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-teal-700'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 mb-4 tracking-wider uppercase">OTHER</p>
          <div className="space-y-1">
            {NAVIGATION_ITEMS.filter(item => item.section === 'OTHER').map((item) => (
              <a
                key={item.id}
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-teal-700 transition-all"
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
          <img 
            src="https://picsum.photos/seed/miguel/40/40" 
            alt="Profile" 
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">Miguel Allesandro</p>
            <p className="text-xs text-gray-500 truncate">mig.allesandro@email.com</p>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
