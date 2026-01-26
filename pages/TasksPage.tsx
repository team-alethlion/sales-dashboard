import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Layout, 
  List, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft,
  ChevronRight, 
  MoreVertical, 
  Trash2, 
  X, 
  Search, 
  Timer, 
  User, 
  Flag,
  RotateCcw,
  Zap,
  ArrowRight,
  Hash
} from 'lucide-react';

// --- TYPES ---
type Priority = 'Urgent' | 'High' | 'Normal';
type Status = 'To Do' | 'In Progress' | 'Finished' | 'Cancelled' | 'Missed';
type Category = 'Inventory' | 'Sales' | 'Finance' | 'System' | 'HR' | 'Marketing';
type CalendarMode = 'month' | 'week' | 'day';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  category: Category;
  deadline: string; // YYYY-MM-DD
  assignee: string;
  isFlagged: boolean;
}

// --- INITIAL DATA (ENRICHED) ---
const INITIAL_TASKS: Task[] = [
  { id: 'TSK-001', title: 'Monthly Inventory Audit', description: 'Comprehensive stock count for Downtown branch SKUs.', priority: 'High', status: 'To Do', category: 'Inventory', deadline: '2024-06-25', assignee: 'Nicholas S', isFlagged: true },
  { id: 'TSK-002', title: 'M-Pesa Reconciliation', description: 'Cross-check mobile payments with ledger entries.', priority: 'Urgent', status: 'In Progress', category: 'Finance', deadline: '2024-06-22', assignee: 'Sarah Miller', isFlagged: false },
  { id: 'TSK-003', title: 'VIP Customer Outreach', description: 'Follow up with Top 50 clients for feedback.', priority: 'Normal', status: 'To Do', category: 'Sales', deadline: '2024-06-28', assignee: 'Alexander Wright', isFlagged: false },
  { id: 'TSK-004', title: 'System Security Patch', description: 'Update firewall rules and database encryption keys.', priority: 'High', status: 'Finished', category: 'System', deadline: '2024-06-18', assignee: 'IT Team', isFlagged: false },
  { id: 'TSK-005', title: 'Supplier Contract Review', description: 'Negotiate bulk discount with Global Tech Inc.', priority: 'Normal', status: 'Cancelled', category: 'Inventory', deadline: '2024-06-15', assignee: 'Nicholas S', isFlagged: false },
  { id: 'TSK-006', title: 'Staff Performance Review', description: 'Q2 reviews for Airport branch team members.', priority: 'Urgent', status: 'Missed', category: 'HR', deadline: '2024-06-10', assignee: 'Sarah Miller', isFlagged: true },
  { id: 'TSK-007', title: 'New Marketing Campaign', description: 'Draft SMS/WhatsApp templates for July Flash Sale.', priority: 'High', status: 'In Progress', category: 'Marketing', deadline: '2024-06-24', assignee: 'Marketing Team', isFlagged: false },
  { id: 'TSK-008', title: 'Office Petty Cash Audit', description: 'Reconcile receipts for the first half of June.', priority: 'Normal', status: 'To Do', category: 'Finance', deadline: '2024-06-26', assignee: 'Sarah Miller', isFlagged: false },
  { id: 'TSK-009', title: 'Branch Manager Sync', description: 'Alignment on Q3 operational targets and budget.', priority: 'High', status: 'To Do', category: 'HR', deadline: '2024-06-21', assignee: 'Nicholas S', isFlagged: false },
  { id: 'TSK-010', title: 'Weekly Payroll Submission', description: 'Finalize hours for warehouse and retail staff.', priority: 'Urgent', status: 'To Do', category: 'Finance', deadline: '2024-06-24', assignee: 'Accounts Dept', isFlagged: false },
  { id: 'TSK-011', title: 'Fire Safety Inspection', description: 'Mandatory annual check for Commercial Branch.', priority: 'High', status: 'To Do', category: 'System', deadline: '2024-06-23', assignee: 'Security lead', isFlagged: false },
  { id: 'TSK-012', title: 'Warehouse Restock Coordination', description: 'Heavy freight moving from main hub to Downtown.', priority: 'Normal', status: 'In Progress', category: 'Inventory', deadline: '2024-06-22', assignee: 'Logistics', isFlagged: false },
  { id: 'TSK-013', title: 'E-commerce Sync', description: 'Integrate offline inventory with website levels.', priority: 'High', status: 'Finished', category: 'System', deadline: '2024-06-19', assignee: 'Dev Team', isFlagged: false },
  { id: 'TSK-014', title: 'IT Infrastructure Audit', description: 'Check server health and backup redundancy.', priority: 'Normal', status: 'To Do', category: 'System', deadline: '2024-06-27', assignee: 'IT Team', isFlagged: false },
  { id: 'TSK-015', title: 'Customer Loyalty Program Launch', description: 'Going live with the point-based reward system.', priority: 'Urgent', status: 'To Do', category: 'Marketing', deadline: '2024-06-30', assignee: 'Marketing Team', isFlagged: true },
  { id: 'TSK-016', title: 'Support Training Session', description: 'Handling high-value client disputes training.', priority: 'Normal', status: 'Finished', category: 'HR', deadline: '2024-06-18', assignee: 'Sarah Miller', isFlagged: false },
];

const TasksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'board' | 'list' | 'calendar'>('board');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [showNewTask, setShowNewTask] = useState(false);
  const [preselectedDate, setPreselectedDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // --- CALENDAR ENGINE STATE ---
  const [viewDate, setViewDate] = useState(new Date(2024, 5, 21)); 
  const [calendarMode, setCalendarMode] = useState<CalendarMode>('month');

  // --- DERIVED DATA ---
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  const stats = useMemo(() => {
    const urgentCount = tasks.filter(t => t.priority === 'Urgent' && t.status !== 'Finished').length;
    const completedCount = tasks.filter(t => t.status === 'Finished').length;
    const missedCount = tasks.filter(t => t.status === 'Missed').length;
    const openCount = tasks.filter(t => t.status === 'To Do' || t.status === 'In Progress').length;
    return { urgentCount, completedCount, missedCount, openCount };
  }, [tasks]);

  // --- DATE HELPERS ---
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  
  const handlePrev = () => {
    const newDate = new Date(viewDate);
    if (calendarMode === 'month') newDate.setMonth(viewDate.getMonth() - 1);
    if (calendarMode === 'week') newDate.setDate(viewDate.getDate() - 7);
    if (calendarMode === 'day') newDate.setDate(viewDate.getDate() - 1);
    setViewDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(viewDate);
    if (calendarMode === 'month') newDate.setMonth(viewDate.getMonth() + 1);
    if (calendarMode === 'week') newDate.setDate(viewDate.getDate() + 7);
    if (calendarMode === 'day') newDate.setDate(viewDate.getDate() + 1);
    setViewDate(newDate);
  };

  const handleToday = () => setViewDate(new Date());

  // --- HANDLERS ---
  const handleOpenNewTask = (dateStr?: string) => {
    setPreselectedDate(dateStr || '');
    setShowNewTask(true);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowNewTask(false);
      setPreselectedDate('');
    }, 1200);
  };

  // Fixed Error: Use React.FC to properly handle React component props like 'key' in list mapping
  const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-teal-200 dark:hover:border-teal-900 transition-all group relative">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
          task.priority === 'Urgent' ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 animate-pulse' :
          task.priority === 'High' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600' :
          'bg-blue-50 dark:bg-blue-900/30 text-blue-600'
        }`}>
          {task.priority}
        </span>
        <div className="flex gap-2">
           <button className="p-1 text-gray-300 hover:text-teal-600 transition-colors"><RotateCcw size={14} /></button>
           <button className="p-1 text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>
        </div>
      </div>
      
      <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight mb-2 group-hover:text-teal-600 transition-colors">{task.title}</h4>
      <p className="text-[10px] text-gray-400 font-medium line-clamp-2 mb-4">{task.description}</p>
      
      <div className="flex items-center justify-between border-t border-gray-50 dark:border-slate-800 pt-4 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400">
             <User size={12} className="text-gray-400" />
          </div>
          <span className="text-[9px] font-bold text-gray-500 uppercase truncate max-w-[60px]">{task.assignee}</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-black text-teal-600 uppercase">
          <Clock size={12} />
          {task.deadline}
        </div>
      </div>
    </div>
  );

  // Fixed: Use React.FC for functional component declaration
  const KanbanColumn: React.FC<{ title: string, status: Status, color: string }> = ({ title, status, color }) => (
    <div className="flex flex-col gap-4 min-w-[300px] flex-1">
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">{title}</h3>
        </div>
        <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-gray-500">
          {filteredTasks.filter(t => t.status === status).length}
        </span>
      </div>
      <div className="space-y-4 max-h-[600px] overflow-y-auto no-scrollbar p-1">
        {filteredTasks.filter(t => t.status === status).map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        <button 
          onClick={() => handleOpenNewTask()}
          className="w-full py-4 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-3xl flex items-center justify-center gap-2 text-[10px] font-black uppercase text-gray-300 hover:text-teal-600 hover:border-teal-200 transition-all group"
        >
          <Plus size={14} /> New Task
        </button>
      </div>
    </div>
  );

  // --- CALENDAR VIEW RENDERING ---
  const renderMonthView = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysCount = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`pad-${i}`} className="bg-gray-50/20 dark:bg-slate-900/20 min-h-[140px] border-b border-r border-gray-100 dark:border-slate-800" />);
    }
    
    for (let d = 1; d <= daysCount; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayTasks = tasks.filter(t => t.deadline === dateStr);
      const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();
      
      days.push(
        <div key={d} className={`bg-white dark:bg-slate-900 min-h-[140px] p-4 border-b border-r border-gray-100 dark:border-slate-800 transition-colors hover:bg-gray-50/50 dark:hover:bg-slate-800/50 group relative`}>
          <div className="flex justify-between items-start mb-2">
            <span className={`text-sm font-black ${isToday ? 'text-teal-600 bg-teal-50 dark:bg-teal-900/40 w-7 h-7 flex items-center justify-center rounded-lg shadow-sm' : 'text-gray-300 group-hover:text-gray-400'}`}>{d}</span>
            {dayTasks.length > 0 && <div className="w-1.5 h-1.5 rounded-full bg-teal-600 shadow-[0_0_8px_rgba(13,148,136,0.5)]" />}
          </div>
          <div className="space-y-1">
            {dayTasks.slice(0, 3).map(t => (
              <div key={t.id} className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-tight truncate border ${
                t.priority === 'Urgent' ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 border-rose-100' :
                t.priority === 'High' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600' :
                'bg-teal-50 dark:bg-teal-900/30 text-teal-600 border-teal-100'
              }`}>
                {t.title}
              </div>
            ))}
            {dayTasks.length > 3 && <p className="text-[8px] font-black text-gray-400 px-1">+{dayTasks.length - 3} more</p>}
          </div>
          <button 
            onClick={() => handleOpenNewTask(dateStr)}
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 text-gray-300 hover:text-teal-600 transition-all bg-white dark:bg-slate-800 rounded-lg shadow-sm"
          >
            <Plus size={12} />
          </button>
        </div>
      );
    }
    return days;
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(viewDate);
    startOfWeek.setDate(viewDate.getDate() - viewDate.getDay());
    
    return Array.from({ length: 7 }).map((_, i) => {
      const current = new Date(startOfWeek);
      current.setDate(startOfWeek.getDate() + i);
      const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
      const dayTasks = tasks.filter(t => t.deadline === dateStr);
      const isToday = new Date().toDateString() === current.toDateString();

      return (
        <div key={i} className="bg-white dark:bg-slate-900 min-h-[500px] border-r border-gray-100 dark:border-slate-800 p-4 space-y-4">
          <div className="text-center pb-4 border-b border-gray-50 dark:border-slate-800">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][current.getDay()]}</p>
             <h4 className={`text-xl font-black mt-1 ${isToday ? 'text-teal-600' : 'text-slate-800 dark:text-slate-100'}`}>{current.getDate()}</h4>
          </div>
          <div className="space-y-3">
             {dayTasks.map(t => (
                <div key={t.id} className="p-3 bg-gray-50 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-800 rounded-2xl group hover:border-teal-200 transition-all">
                   <div className="flex justify-between">
                     <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                       t.priority === 'Urgent' ? 'bg-rose-50 text-rose-600' : 'bg-teal-50 text-teal-600'
                     }`}>{t.priority}</span>
                     <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{t.category}</span>
                   </div>
                   <p className="text-[11px] font-black text-slate-800 dark:text-slate-200 mt-2 line-clamp-2 leading-tight">{t.title}</p>
                </div>
             ))}
             <button 
                onClick={() => handleOpenNewTask(dateStr)}
                className="w-full py-3 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-2xl flex items-center justify-center text-gray-300 hover:text-teal-600 hover:border-teal-200 transition-all"
             >
                <Plus size={16} />
             </button>
          </div>
        </div>
      );
    });
  };

  const renderDayView = () => {
    const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(viewDate.getDate()).padStart(2, '0')}`;
    const dayTasks = tasks.filter(t => t.deadline === dateStr);
    
    return (
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 min-h-[500px]">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-600 text-white rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center shadow-xl shadow-teal-900/20">
                 <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][viewDate.getDay()]}</span>
                 <span className="text-2xl sm:text-3xl font-black">{viewDate.getDate()}</span>
              </div>
              <div>
                 <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">{viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}</h3>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                   <Zap size={14} className="text-teal-600" /> {dayTasks.length} Ops Scheduled
                 </p>
              </div>
            </div>
            <button 
              onClick={() => handleOpenNewTask(dateStr)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all"
            >
              <Plus size={16} /> Add Task
            </button>
         </div>

         <div className="space-y-4 max-w-3xl">
            {dayTasks.length === 0 ? (
               <div className="py-20 flex flex-col items-center justify-center text-center opacity-30 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-[2rem]">
                  <CalendarIcon size={40} className="text-gray-400 mb-4" />
                  <p className="text-xs font-black uppercase tracking-widest">Clear queue</p>
               </div>
            ) : (
              dayTasks.map(t => (
                <div key={t.id} className="flex items-start gap-4 sm:gap-6 p-5 sm:p-6 bg-gray-50 dark:bg-slate-800/40 rounded-2xl sm:rounded-[2rem] border border-gray-100 dark:border-slate-800 hover:border-teal-200 transition-all group">
                   <div className="w-1.5 h-10 sm:h-12 bg-teal-600 rounded-full shrink-0" />
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                         <span className="text-[9px] font-black uppercase text-teal-600 tracking-[0.1em] truncate">{t.category}</span>
                         <span className={`px-1.5 py-0.5 rounded-lg text-[8px] font-black uppercase shrink-0 ${t.priority === 'Urgent' ? 'bg-rose-50 text-rose-600' : 'bg-teal-50 text-teal-600'}`}>{t.priority}</span>
                      </div>
                      <h4 className="text-base font-black text-slate-800 dark:text-slate-100 mt-2 truncate">{t.title}</h4>
                      <p className="text-[11px] text-gray-400 font-medium mt-1 leading-relaxed line-clamp-2">{t.description}</p>
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 overflow-x-auto no-scrollbar whitespace-nowrap">
                         <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 border flex items-center justify-center text-gray-400"><User size={10}/></div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase">{t.assignee}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <Clock size={10} className="text-gray-400" />
                            <span className="text-[9px] font-bold text-gray-400 uppercase">9:00 AM</span>
                         </div>
                      </div>
                   </div>
                   <button className="p-2 sm:p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-gray-300 hover:text-teal-600 transition-colors"><MoreVertical size={18}/></button>
                </div>
              ))
            )}
         </div>
      </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-3">
            Operations <span className="text-teal-600">Pipeline</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
            Manage operational workflows and team deliverables
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative group flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-teal-600 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500/30 transition-all w-full sm:w-60 shadow-sm"
            />
          </div>
          <button 
            onClick={() => handleOpenNewTask()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-teal-900/10 hover:bg-teal-700 active:scale-95 transition-all"
          >
            <Plus size={16} /> New Entry
          </button>
        </div>
      </header>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { label: 'Active', value: stats.openCount, sub: 'Assigned', icon: <Zap size={18} />, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' },
          { label: 'Urgent', value: stats.urgentCount, sub: 'Risk', icon: <AlertCircle size={18} />, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
          { label: 'Done', value: stats.completedCount, sub: 'Cycle', icon: <CheckCircle2 size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Late', value: stats.missedCount, sub: 'Review', icon: <XCircle size={18} />, color: 'text-gray-400', bg: 'bg-gray-100 dark:bg-slate-800' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-800 transition-all">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className={`text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-gray-100/50 dark:bg-slate-800/50 rounded-2xl mb-8 w-fit border border-gray-100 dark:border-slate-800 overflow-x-auto no-scrollbar max-w-full">
        {[
          { id: 'board', name: 'Board', icon: <Layout size={14} /> },
          { id: 'list', name: 'Audit', icon: <List size={14} /> },
          { id: 'calendar', name: 'Calendar', icon: <CalendarIcon size={14} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab.id 
              ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' 
              : 'text-gray-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content Rendering */}
      <div className="min-h-[500px]">
        {activeTab === 'board' && (
          <div className="flex flex-col lg:flex-row gap-8 overflow-x-auto pb-8 animate-in fade-in slide-in-from-left-4 duration-500 no-scrollbar">
             <KanbanColumn title="To Do" status="To Do" color="bg-gray-400" />
             <KanbanColumn title="In Progress" status="In Progress" color="bg-blue-500" />
             <KanbanColumn title="Finished" status="Finished" color="bg-emerald-500" />
             <KanbanColumn title="Cancelled / Missed" status="Cancelled" color="bg-rose-500" />
          </div>
        )}

        {activeTab === 'list' && (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-slate-800/50">
                    <th className="px-6 sm:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Priority</th>
                    <th className="px-6 sm:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Task Details</th>
                    <th className="px-6 sm:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Category</th>
                    <th className="px-6 sm:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Assignee</th>
                    <th className="px-6 sm:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Deadline</th>
                    <th className="px-6 sm:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-6 sm:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                  {filteredTasks.map(task => (
                    <tr key={task.id} className="hover:bg-gray-50/30 dark:hover:bg-slate-800/20 transition-colors group">
                      <td className="px-6 sm:px-8 py-6">
                         <span className={`flex items-center gap-2 text-[10px] font-black uppercase ${
                           task.priority === 'Urgent' ? 'text-rose-500' : task.priority === 'High' ? 'text-amber-500' : 'text-blue-500'
                         }`}>
                           <Flag size={12} fill={task.priority === 'Urgent' ? 'currentColor' : 'none'} />
                           {task.priority}
                         </span>
                      </td>
                      <td className="px-6 sm:px-8 py-6">
                        <p className="text-sm font-black text-slate-800 dark:text-slate-100">{task.title}</p>
                        <p className="text-[10px] text-gray-400 font-medium truncate max-w-[200px]">{task.description}</p>
                      </td>
                      <td className="px-6 sm:px-8 py-6 text-center">
                        <span className="px-2 py-0.5 bg-gray-50 dark:bg-slate-800 text-gray-400 rounded text-[9px] font-black uppercase tracking-widest">
                          {task.category}
                        </span>
                      </td>
                      <td className="px-6 sm:px-8 py-6">
                         <div className="flex items-center gap-2">
                           <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                             <User size={14} />
                           </div>
                           <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{task.assignee}</span>
                         </div>
                      </td>
                      <td className="px-6 sm:px-8 py-6 text-center font-bold text-[11px] text-gray-400 uppercase tracking-tight">{task.deadline}</td>
                      <td className="px-6 sm:px-8 py-6 text-center">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          task.status === 'Finished' ? 'bg-emerald-50 text-emerald-600' : 
                          task.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                          task.status === 'Missed' ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-400'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 sm:px-8 py-6 text-center">
                        <button className="p-2 text-gray-300 hover:text-teal-600 transition-colors"><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 sm:p-8 border-b border-gray-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50/20 dark:bg-slate-800/20">
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 p-1 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-sm">
                      <button onClick={handlePrev} className="p-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-teal-600"><ChevronLeft size={18}/></button>
                      <button onClick={handleToday} className="px-3 sm:px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:text-teal-600 transition-colors">Today</button>
                      <button onClick={handleNext} className="p-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-teal-600"><ChevronRight size={18}/></button>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                      {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
                    </h3>
                 </div>
                 
                 <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl">
                   {[
                     { id: 'month', label: 'Month' },
                     { id: 'week', label: 'Week' },
                     { id: 'day', label: 'Day' }
                   ].map(m => (
                     <button 
                      key={m.id}
                      onClick={() => setCalendarMode(m.id as CalendarMode)}
                      className={`px-4 sm:px-6 py-2 rounded-lg text-[9px] sm:text-[10px] font-black uppercase transition-all ${
                        calendarMode === m.id ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-gray-400 hover:text-slate-600'
                      }`}
                     >
                       {m.label}
                     </button>
                   ))}
                 </div>
              </div>

              <div className="flex-1 overflow-x-auto no-scrollbar">
                {calendarMode === 'month' && (
                  <div className="grid grid-cols-7 gap-px bg-gray-100 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-800 min-w-[700px]">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="bg-gray-50/50 dark:bg-slate-800/50 py-4 text-center border-r border-gray-100 dark:border-slate-800 last:border-r-0">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{day}</span>
                      </div>
                    ))}
                    {renderMonthView()}
                  </div>
                )}
                {calendarMode === 'week' && (
                  <div className="grid grid-cols-7 bg-gray-100 dark:bg-slate-800 min-w-[700px]">
                    {renderWeekView()}
                  </div>
                )}
                {calendarMode === 'day' && renderDayView()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NEW TASK MODAL - RESPONSIVE ENHANCED */}
      {showNewTask && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center sm:px-4 sm:py-8 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-300 hidden sm:block" onClick={() => setShowNewTask(false)} />
          <div className="relative w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-none sm:rounded-[2.5rem] shadow-2xl border-none sm:border border-gray-100 dark:border-slate-800 animate-in sm:zoom-in-95 sm:slide-in-from-top-4 duration-300 overflow-hidden">
             
             {/* Modal Header */}
             <div className="p-6 sm:p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/20 dark:bg-slate-800/20 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-900/20">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Provision New Task</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1 hidden sm:block">Operational Directive Protocol</p>
                    <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest mt-1 sm:hidden">Workflow Management</p>
                  </div>
                </div>
                <button onClick={() => setShowNewTask(false)} className="p-3 bg-gray-50 dark:bg-slate-800 text-gray-400 rounded-2xl hover:text-rose-500 transition-all shadow-sm">
                  <X size={22} />
                </button>
             </div>

             <form onSubmit={handleAddTask} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 no-scrollbar">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Task Headline *</label>
                    <input type="text" placeholder="e.g. Branch Performance Audit" className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" required />
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Deliverable Description</label>
                    <textarea rows={4} placeholder="What needs to be achieved exactly?" className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-medium resize-none" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Business Domain</label>
                      <select className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none cursor-pointer">
                        <option>Inventory</option>
                        <option>Sales</option>
                        <option>Finance</option>
                        <option>System</option>
                        <option>HR</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest text-teal-600">Priority Matrix</label>
                      <select className="w-full px-5 py-4 bg-teal-50 dark:bg-teal-900/10 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-black appearance-none cursor-pointer text-teal-600">
                        <option>Normal Priority</option>
                        <option>High Impact</option>
                        <option>Urgent Blocker</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Deadline Milestone</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                          type="date" 
                          defaultValue={preselectedDate}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" 
                          required 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-2 block tracking-widest">Responsible Lead</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input type="text" placeholder="e.g. Nicholas S." className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-teal-500/50 text-sm font-bold" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-teal-50 dark:bg-teal-950/20 rounded-3xl border border-teal-100 dark:border-teal-900/30 flex gap-4">
                   <Timer size={24} className="text-teal-600 shrink-0 mt-0.5" />
                   <p className="text-[10px] font-black text-teal-700 dark:text-teal-300 leading-relaxed uppercase tracking-wider">
                     Verification Protocol: Assigning this task will generate a ledger entry for auditing. The assignee will receive a push notification via their linked terminal device.
                   </p>
                </div>
             </form>

             {/* Modal Footer (Sticky) */}
             <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 border-t border-gray-50 dark:border-slate-800 shrink-0">
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setShowNewTask(false)}
                    className="flex-1 py-4 bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-100 transition-all"
                  >
                    Discard
                  </button>
                  <button 
                    onClick={handleAddTask}
                    disabled={saving}
                    className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-teal-900/40 hover:bg-teal-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                  >
                    {saving ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Commit to Queue <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;