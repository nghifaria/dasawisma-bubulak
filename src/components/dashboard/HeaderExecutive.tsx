'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { RefreshCw, CheckCircle2, Shield, BarChart3, ClipboardList } from 'lucide-react';

interface HeaderExecutiveProps {
  lastUpdated?: string;
  onSync?: () => Promise<void> | void;
}

export function HeaderExecutive({ lastUpdated, onSync }: HeaderExecutiveProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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

  const isDashboard = pathname === '/';
  const isPengurus = pathname.startsWith('/pengurus');

  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 space-y-4">
        {/* Baris 1: Identitas Resmi, Status Sinkronisasi & Tombol Refresh */}
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
            {lastUpdated && (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Data Terkini:</span>
                <span className="font-bold text-slate-900">{lastUpdated}</span>
              </div>
            )}

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

        {/* Baris 2: Segmented Navigation Switcher */}
        <nav
          aria-label="Navigasi Halaman Utama"
          className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto"
        >
          <div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1">
            <Link
              href="/"
              className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isDashboard
                  ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>📊 Dashboard Data & Agregat</span>
            </Link>

            <Link
              href="/pengurus"
              className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isPengurus
                  ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>📋 Direktori SK Pengurus</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
                SK 2026
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
