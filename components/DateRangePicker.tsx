
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface DateRange {
  start: string;
  end: string;
}

interface DateRangePickerProps {
  range: DateRange;
  onChange: (range: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ range, onChange }) => {
  return (
    <div 
      role="group" 
      aria-label="Date range selection"
      className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-all hover:border-teal-200 dark:hover:border-teal-800 focus-within:ring-2 focus-within:ring-teal-100 dark:focus-within:ring-teal-900/50 focus-within:border-teal-300 dark:focus-within:border-teal-700"
    >
      <div className="flex items-center gap-2">
        <CalendarIcon size={16} className="text-teal-600 dark:text-teal-500" aria-hidden="true" />
        <div className="flex items-center gap-1">
          <input
            type="date"
            value={range.start}
            aria-label="Start Date"
            onChange={(e) => onChange({ ...range, start: e.target.value })}
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 outline-none bg-transparent cursor-pointer focus:text-teal-700 dark:focus:text-teal-400"
          />
          <span className="text-gray-300 dark:text-slate-700 text-xs" aria-hidden="true">-</span>
          <input
            type="date"
            value={range.end}
            aria-label="End Date"
            onChange={(e) => onChange({ ...range, end: e.target.value })}
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 outline-none bg-transparent cursor-pointer focus:text-teal-700 dark:focus:text-teal-400"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
