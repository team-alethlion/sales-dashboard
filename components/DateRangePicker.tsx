
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown, Clock } from 'lucide-react';

interface DateRange {
  start: string;
  end: string;
}

interface DateRangePickerProps {
  range: DateRange;
  onChange: (range: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ range, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const presets = [
    { label: 'Q1 (Jan-Mar)', start: '2024-01-01', end: '2024-03-31' },
    { label: 'Q2 (Apr-Jun)', start: '2024-04-01', end: '2024-06-30' },
    { label: 'H1 (Jan-Jun)', start: '2024-01-01', end: '2024-06-30' },
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-all hover:border-teal-200 dark:hover:border-teal-800 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900/50"
      >
        <CalendarIcon size={16} className="text-teal-600 dark:text-teal-500" />
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
          {formatDate(range.start)} - {formatDate(range.end)}
        </span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Clock size={12} /> Quick Select
                </p>
                <div className="grid grid-cols-1 gap-1">
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        onChange({ start: preset.start, end: preset.end });
                        setIsOpen(false);
                      }}
                      className="text-left px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 dark:hover:text-teal-400 rounded-lg transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-50 dark:border-slate-800">
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3">Custom Range</p>
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase px-1">Start Date</label>
                    <input
                      type="date"
                      value={range.start}
                      onChange={(e) => onChange({ ...range, start: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase px-1">End Date</label>
                    <input
                      type="date"
                      value={range.end}
                      onChange={(e) => onChange({ ...range, end: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full mt-2 bg-teal-600 text-white py-2 rounded-xl text-sm font-bold shadow-md hover:bg-teal-700 transition-colors"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateRangePicker;
