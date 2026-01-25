
import React, { useState } from 'react';
import { Bluetooth, Printer, Loader2, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

type PrinterStatus = 'disconnected' | 'pairing' | 'connected' | 'error';

const PrinterPairing: React.FC = () => {
  const [status, setStatus] = useState<PrinterStatus>('disconnected');
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePair = async () => {
    setStatus('pairing');
    setErrorMsg(null);

    try {
      // Use the Web Bluetooth API to request a device
      // Note: This requires HTTPS and user interaction (which this click provides)
      // Fix: Access bluetooth property via type assertion to bypass Navigator interface limitations in TypeScript (line 19)
      if (!(navigator as any).bluetooth) {
        throw new Error("Bluetooth not supported in this browser.");
      }

      // Fix: Access bluetooth property via type assertion to bypass Navigator interface limitations in TypeScript (line 23)
      const device = await (navigator as any).bluetooth.requestDevice({
        filters: [{ services: ['printer'] }],
        optionalServices: ['battery_service'] // Example optional service
      });

      setDeviceName(device.name || 'Generic Printer');
      setStatus('connected');
    } catch (err: any) {
      console.error(err);
      if (err.name === 'NotFoundError') {
        // User cancelled the picker
        setStatus('disconnected');
      } else {
        setErrorMsg(err.message || 'Failed to pair device');
        setStatus('error');
      }
    }
  };

  const handleDisconnect = () => {
    setStatus('disconnected');
    setDeviceName(null);
  };

  return (
    <div className="mx-3 mb-6 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${
            status === 'connected' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'
          }`}>
            <Printer size={14} />
          </div>
          <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
            Hardware
          </span>
        </div>
        {status === 'connected' && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-teal-600 dark:text-teal-400">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
            ONLINE
          </span>
        )}
      </div>

      <div className="space-y-3">
        {status === 'disconnected' && (
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-3 leading-relaxed">
              Connect a thermal printer to enable automated receipt printing.
            </p>
            <button
              onClick={handlePair}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all group"
            >
              <Bluetooth size={14} className="text-teal-600 group-hover:scale-110 transition-transform" />
              Pair Printer
            </button>
          </div>
        )}

        {status === 'pairing' && (
          <div className="flex flex-col items-center py-2">
            <Loader2 size={24} className="text-teal-600 animate-spin mb-2" />
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Searching for devices...</p>
          </div>
        )}

        {status === 'connected' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-900 rounded-xl border border-teal-100 dark:border-teal-900/20 mb-3">
              <CheckCircle2 size={16} className="text-teal-600" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">{deviceName}</p>
                <p className="text-[10px] text-gray-400">Paired via Bluetooth</p>
              </div>
            </div>
            <button
              onClick={handleDisconnect}
              className="w-full py-1.5 text-[10px] font-bold text-gray-400 hover:text-rose-500 transition-colors uppercase tracking-widest"
            >
              Disconnect
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="animate-in slide-in-from-bottom-2">
            <div className="flex items-start gap-3 p-2 bg-rose-50 dark:bg-rose-900/10 rounded-xl border border-rose-100 dark:border-rose-900/20 mb-3">
              <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[11px] font-bold text-rose-700 dark:text-rose-400 leading-tight">Connection Failed</p>
                <p className="text-[10px] text-rose-600/70 dark:text-rose-400/60 mt-0.5">{errorMsg}</p>
              </div>
            </div>
            <button
              onClick={handlePair}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition-all"
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrinterPairing;
