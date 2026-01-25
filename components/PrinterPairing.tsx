
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
      if (!(navigator as any).bluetooth) {
        throw new Error("Bluetooth not supported.");
      }

      const device = await (navigator as any).bluetooth.requestDevice({
        filters: [{ services: ['printer'] }],
        optionalServices: ['battery_service']
      });

      setDeviceName(device.name || 'Thermal Printer');
      setStatus('connected');
    } catch (err: any) {
      console.error(err);
      if (err.name === 'NotFoundError') {
        setStatus('disconnected');
      } else {
        setErrorMsg(err.message || 'Failed to pair');
        setStatus('error');
      }
    }
  };

  const handleDisconnect = () => {
    setStatus('disconnected');
    setDeviceName(null);
  };

  return (
    <div className="w-full flex flex-col transition-all duration-300">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${
            status === 'connected' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'
          }`}>
            <Printer size={14} />
          </div>
          <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">
            Hardware
          </span>
        </div>
        {status === 'connected' && (
          <div className="flex items-center gap-1.5 bg-teal-50 dark:bg-teal-900/20 px-1.5 py-0.5 rounded-md">
            <span className="w-1 h-1 rounded-full bg-teal-600 animate-pulse"></span>
            <span className="text-[9px] font-black text-teal-600 uppercase">ON</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {status === 'disconnected' && (
          <button
            onClick={handlePair}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 dark:bg-slate-800 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 transition-all border border-gray-100 dark:border-slate-700 group shadow-sm"
          >
            <Bluetooth size={14} className="group-hover:scale-110 transition-transform" />
            Connect Printer
          </button>
        )}

        {status === 'pairing' && (
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
            <Loader2 size={14} className="text-teal-600 animate-spin" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scanning...</span>
          </div>
        )}

        {status === 'connected' && (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="px-3 py-2 bg-teal-50/50 dark:bg-teal-900/10 rounded-xl border border-teal-100/50 dark:border-teal-900/20 flex items-center gap-3 group">
              <div className="w-6 h-6 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center shadow-sm text-teal-600">
                <CheckCircle2 size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-slate-800 dark:text-slate-100 truncate uppercase">{deviceName}</p>
              </div>
              <button 
                onClick={handleDisconnect}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-rose-500"
                title="Disconnect"
              >
                <XCircle size={14} />
              </button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <button
            onClick={handlePair}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all border border-rose-100 dark:border-rose-900/30"
          >
            <RefreshCw size={12} />
            Retry Link
          </button>
        )}
      </div>
    </div>
  );
};

export default PrinterPairing;
