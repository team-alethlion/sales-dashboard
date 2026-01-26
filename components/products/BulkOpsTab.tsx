
import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileCode, 
  Download, 
  FileText, 
  BarChart3, 
  Database, 
  Globe, 
  AlertTriangle, 
  Loader2, 
  CheckCircle2, 
  X, 
  RefreshCcw,
  FileArchive
} from 'lucide-react';

const BulkOpsTab: React.FC = () => {
  // --- STATE ---
  const [isImporting, setIsImporting] = useState(false);
  const [importMode, setImportMode] = useState<'initial' | 'update' | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [exportingFormat, setExportingFormat] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'alert' | 'info' } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- HELPERS ---
  const showToast = (msg: string, type: 'success' | 'alert' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // --- HANDLERS ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      showToast(`Staged: ${file.name}`, 'info');
    }
  };

  const handleStartImport = (mode: 'initial' | 'update') => {
    if (!selectedFile) {
      showToast('Please select a source file first.', 'alert');
      return;
    }

    setIsImporting(true);
    setImportMode(mode);
    setImportProgress(0);

    // Simulated Progress Cycle
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsImporting(false);
            setImportMode(null);
            setSelectedFile(null);
            showToast(`Database ${mode === 'initial' ? 'initialized' : 'updated'} with ${selectedFile.name}`);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleExport = (format: string) => {
    setExportingFormat(format);
    showToast(`Compiling full registry into ${format.toUpperCase()}...`, 'info');

    setTimeout(() => {
      setExportingFormat(null);
      showToast(`Snapshot ${Date.now()}.${format} ready for download.`);
      // In a real app, this would trigger window.location = downloadUrl;
    }, 2500);
  };

  const cancelStaging = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="animate-in fade-in slide-in-from-left-2 duration-300 relative">
      {/* Tab Specific Toast */}
      {toast && (
        <div className="fixed bottom-24 lg:bottom-8 right-8 z-[150] animate-in slide-in-from-right-8 duration-300">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
            {toast.type === 'success' && <CheckCircle2 size={18} className="text-teal-400" />}
            {toast.type === 'alert' && <AlertTriangle size={18} className="text-rose-400" />}
            {toast.type === 'info' && <RefreshCcw size={18} className="text-blue-400 animate-spin" />}
            <span className="text-[11px] font-black tracking-tight uppercase">{toast.msg}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Import Block */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm transition-colors relative overflow-hidden">
          {isImporting && (
            <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/30 rounded-3xl flex items-center justify-center text-teal-600 mb-6 animate-pulse">
                <Loader2 size={40} className="animate-spin" />
              </div>
              <h4 className="text-xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">Processing {importMode} Upload</h4>
              <p className="text-xs text-gray-400 font-bold uppercase mt-2 tracking-widest">Validating Schema Integrity...</p>
              
              <div className="w-full max-w-xs mt-8 h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-600 transition-all duration-300" 
                  style={{ width: `${importProgress}%` }}
                />
              </div>
              <p className="text-[10px] font-black text-teal-600 mt-3">{importProgress}% Complete</p>
            </div>
          )}

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/20 text-teal-600 rounded-2xl flex items-center justify-center">
              <Upload size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">Database Import</h3>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter mt-0.5">Automated Bulk Registry Updates</p>
            </div>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileSelect}
            accept=".csv,.xlsx,.sql,.json"
          />

          {selectedFile ? (
            <div className="border-4 border-teal-100 dark:border-teal-900/30 bg-teal-50/20 dark:bg-teal-950/10 rounded-[2rem] p-10 text-center mb-8 animate-in zoom-in-95 duration-300">
               <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-teal-600">
                 <FileArchive size={32} />
               </div>
               <h4 className="text-sm font-black text-slate-800 dark:text-slate-200">{selectedFile.name}</h4>
               <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{(selectedFile.size / 1024).toFixed(1)} KB • Staged for transmission</p>
               <button onClick={cancelStaging} className="mt-4 text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline flex items-center gap-1 mx-auto">
                 <X size={12} /> Discard File
               </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-[2rem] p-12 text-center mb-8 hover:border-teal-300 hover:bg-teal-50/10 transition-all cursor-pointer bg-gray-50/30 group"
            >
              <FileCode size={40} className="mx-auto text-gray-300 group-hover:text-teal-400 transition-colors mb-4" />
              <p className="text-sm font-black text-slate-600 dark:text-slate-400">Click to select source file</p>
              <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-[0.2em]">Supported: .CSV, .XLSX, .SQL, .JSON</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleStartImport('initial')}
              disabled={isImporting}
              className="py-4 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-900/10 hover:bg-teal-700 transition-all active:scale-95 disabled:opacity-50"
            >
              Initial Upload
            </button>
            <button 
              onClick={() => handleStartImport('update')}
              disabled={isImporting}
              className="py-4 bg-slate-900 dark:bg-slate-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-slate-600 transition-all active:scale-95 disabled:opacity-50"
            >
              Bulk Update
            </button>
          </div>
        </div>

        {/* Export Block */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center">
              <Download size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">System Export</h3>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter mt-0.5">High-Fidelity Database Snapshots</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {[
              { id: 'sql', name: 'SQL Dump', icon: <FileCode size={14} />, color: 'text-blue-500' },
              { id: 'csv', name: 'CSV File', icon: <FileText size={14} />, color: 'text-emerald-500' },
              { id: 'xlsx', name: 'Excel', icon: <BarChart3 size={14} />, color: 'text-teal-500' },
              { id: 'json', name: 'JSON Data', icon: <Database size={14} />, color: 'text-amber-500' },
              { id: 'pdf', name: 'PDF Catalog', icon: <FileText size={14} />, color: 'text-rose-500' },
              { id: 'txt', name: 'Raw Text', icon: <Globe size={14} />, color: 'text-slate-400' },
            ].map(format => (
              <button 
                key={format.id} 
                disabled={exportingFormat !== null}
                onClick={() => handleExport(format.id)}
                className={`flex items-center gap-2 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all border border-transparent hover:border-blue-300 group relative disabled:opacity-50 ${exportingFormat === format.id ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}
              >
                {exportingFormat === format.id ? (
                  <Loader2 size={14} className="animate-spin text-blue-600" />
                ) : (
                  <span className={format.color}>{format.icon}</span>
                )}
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 group-hover:text-blue-600">{format.id}</span>
              </button>
            ))}
          </div>

          <div className="p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 rounded-[2rem] flex gap-4">
            <AlertTriangle size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[10px] font-bold text-blue-700 dark:text-blue-300 leading-relaxed uppercase tracking-wider">
              Verification: All exports are timestamped and include SKU metadata, cross-branch stock levels, and linked supplier identifiers for external ERP synchronization.
            </p>
          </div>
          
          <button className="w-full mt-6 py-4 bg-gray-50 dark:bg-slate-800 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-teal-600 transition-all flex items-center justify-center gap-2 group border border-transparent hover:border-teal-100">
            <History className="group-hover:rotate-180 transition-transform" size={14} /> View Export Logs
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple History icon fallback if not already in main imports
const History: React.FC<{className?: string, size?: number}> = ({className, size}) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <path d="M12 7v5l4 2"/>
  </svg>
);

export default BulkOpsTab;
