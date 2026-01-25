
import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface InsightsCardProps {
  insights: string;
  onClose: () => void;
}

const InsightsCard: React.FC<InsightsCardProps> = ({ insights, onClose }) => {
  return (
    <div className="mb-8 bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 p-6 rounded-2xl relative animate-in fade-in slide-in-from-top-4 duration-500">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-teal-400 hover:text-teal-600 dark:text-teal-600 dark:hover:text-teal-400 transition-colors"
      >
        <X size={20} />
      </button>
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
          <Sparkles size={24} className="text-teal-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Branch Performance Report</h3>
          <div className="text-sm text-teal-800 dark:text-teal-200 space-y-2 prose prose-sm dark:prose-invert max-w-none">
            {insights.split('\n').map((line, i) => (
              <p key={i} className="mb-0">{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsCard;
