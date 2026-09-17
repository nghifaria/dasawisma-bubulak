'use client';

import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderExecutiveProps {
  lastUpdated: string;
  onSync?: () => Promise<void> | void;
}

export function HeaderExecutive({ lastUpdated, onSync }: HeaderExecutiveProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const router = useRouter();

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      if (onSync) {
        await onSync();
      } else {
        await fetch('/api/sync', { method: 'POST' });
        router.refresh();
      }
    } catch (err) {
      console.error('Gagal sinkronisasi data:', err);
    } finally {
      setTimeout(() => setIsSyncing(false), 700);
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Identitas Logo & Instansi Resmi */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  TP-PKK Kelurahan Bubulak
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  Kecamatan Bogor Barat, Kota Bogor
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                Dashboard Eksekutif Pendataan Dasawisma
              </h1>
            </div>
          </div>

          {/* Status Sinkronisasi & Tombol Refresh */}
          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Data Terkini:</span>
              <span className="font-bold text-slate-900">{lastUpdated}</span>
            </div>

            <button
              onClick={handleSync}
              disabled={isSyncing}
              aria-label="Sinkronkan data dengan Google Sheets"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              <RefreshCw
                className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              <span>{isSyncing ? 'Memperbarui...' : 'Sinkronkan Data'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
