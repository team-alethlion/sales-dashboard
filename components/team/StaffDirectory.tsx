
import React, { useState, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import StaffTableRow from './StaffTableRow';
import DirectoryFilter from './DirectoryFilter';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  branch: string;
  status: string;
  clearance: string;
  avatar: string;
}

interface StaffDirectoryProps {
  staff: StaffMember[];
  onAction: (message: string) => void;
}

const StaffDirectory: React.FC<StaffDirectoryProps> = ({ staff, onAction }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBranch, setFilterBranch] = useState('All Branches');
  const [filterClearance, setFilterClearance] = useState('All Levels');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredStaff = useMemo(() => {
    return staff.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBranch = filterBranch === 'All Branches' || s.branch === filterBranch;
      const matchesClearance = filterClearance === 'All Levels' || s.clearance === filterClearance;
      return matchesSearch && matchesBranch && matchesClearance;
    });
  }, [staff, searchQuery, filterBranch, filterClearance]);

  const activeFilterCount = (filterBranch !== 'All Branches' ? 1 : 0) + (filterClearance !== 'All Levels' ? 1 : 0);

  const handleReset = () => {
    setFilterBranch('All Branches');
    setFilterClearance('All Levels');
    setSearchQuery('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gray-50/20 dark:bg-slate-800/20">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role or operator ID..."
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium shadow-sm transition-all"
          />
        </div>
        
        <DirectoryFilter 
          isOpen={isFilterOpen} 
          onToggle={() => setIsFilterOpen(!isFilterOpen)}
          filterBranch={filterBranch}
          setFilterBranch={setFilterBranch}
          filterClearance={filterClearance}
          setFilterClearance={setFilterClearance}
          onReset={handleReset}
          activeCount={activeFilterCount}
        />
      </div>

      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-slate-800/50">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Operator Profile</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Core Role</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Branch Node</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">System Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Clearance Level</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {filteredStaff.length > 0 ? (
              filteredStaff.map(person => (
                <StaffTableRow key={person.id} person={person} onAction={(id, action) => onAction(`${action} successful for ${id}`)} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-8 py-24 text-center">
                   <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-gray-200 dark:text-slate-700 mx-auto mb-6">
                     <Search size={40} />
                   </div>
                   <h4 className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight">No Operators Found</h4>
                   <button onClick={handleReset} className="mt-8 px-6 py-2 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Clear Registry Search</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-gray-50/30 dark:bg-slate-800/30 border-t border-gray-50 dark:border-slate-800 text-center">
        <button className="text-[10px] font-black text-gray-400 hover:text-teal-600 uppercase tracking-[0.3em] transition-colors flex items-center justify-center gap-2 mx-auto">
          <RotateCcw size={14} /> Global Staff Audit Trail
        </button>
      </div>
    </div>
  );
};

export default StaffDirectory;
