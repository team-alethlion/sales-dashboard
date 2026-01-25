
import React from 'react';
import { Users, Sparkles, Store, Settings, Package } from 'lucide-react';
import { RECENT_ACTIVITY_DATA } from '../constants';

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'user': return <Users size={14} className="text-white" />;
    case 'ai': return <Sparkles size={14} className="text-white" />;
    case 'store': return <Store size={14} className="text-white" />;
    case 'system': return <Settings size={14} className="text-white" />;
    case 'product': return <Package size={14} className="text-white" />;
    default: return null;
  }
};

const ActivityFeed: React.FC = () => {
  return (
    <div className="space-y-6">
      {RECENT_ACTIVITY_DATA.map((item) => (
        <div key={item.id} className="flex items-start gap-4">
          <div className={`mt-0.5 w-7 h-7 shrink-0 rounded-lg ${item.color} flex items-center justify-center shadow-sm`}>
            {getActivityIcon(item.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-tight">
              {item.content}
            </p>
            <p className="text-[11px] font-medium text-gray-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
              {item.time}
            </p>
          </div>
        </div>
      ))}
      <button className="w-full mt-2 py-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors uppercase tracking-widest border-t border-gray-50 dark:border-slate-800 pt-4">
        View All Activity
      </button>
    </div>
  );
};

export default ActivityFeed;
