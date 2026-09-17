'use client';

import React from 'react';
import { Filter, RotateCcw, MapPin } from 'lucide-react';
import { DAFTAR_RW_BUBULAK } from '@/data/wilayah';

interface GlobalFilterBarProps {
  selectedRW: string;
  selectedRT: string;
  onRWChange: (rw: string) => void;
  onRTChange: (rt: string) => void;
  onReset: () => void;
}

export function GlobalFilterBar({
  selectedRW,
  selectedRT,
  onRWChange,
  onRTChange,
  onReset,
}: GlobalFilterBarProps) {
  // Ambil daftar RT dinamis berdasarkan RW yang sedang dipilih
  const currentRWInfo = DAFTAR_RW_BUBULAK.find((r) => r.code === selectedRW);
  const rtOptions = currentRWInfo ? currentRWInfo.rtList : [];

  const hasFilter = selectedRW !== 'ALL' || selectedRT !== 'ALL';

  return (
    <nav
      aria-label="Filter Wilayah Dasawisma"
      className="sticky top-0 z-20 w-full bg-white border-b border-slate-200 shadow-xs py-3.5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Label Filter */}
          <div className="flex items-center gap-2 text-slate-700">
            <Filter className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Filter Wilayah:
            </span>
          </div>

          {/* Kontrol Dropdown & Reset */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap w-full sm:w-auto">
            {/* Dropdown RW */}
            <div className="relative flex-1 sm:w-60">
              <label htmlFor="select-rw" className="sr-only">
                Pilih Wilayah Rukun Warga (RW)
              </label>
              <select
                id="select-rw"
                value={selectedRW}
                onChange={(e) => {
                  onRWChange(e.target.value);
                  onRTChange('ALL');
                }}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors cursor-pointer"
              >
                <option value="ALL">Semua Wilayah (13 RW)</option>
                {DAFTAR_RW_BUBULAK.map((rw) => (
                  <option key={rw.code} value={rw.code}>
                    {rw.code} {rw.isPilot ? '(Area Pilot)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown RT */}
            <div className="relative flex-1 sm:w-44">
              <label htmlFor="select-rt" className="sr-only">
                Pilih Rukun Tetangga (RT)
              </label>
              <select
                id="select-rt"
                value={selectedRT}
                disabled={selectedRW === 'ALL'}
                onChange={(e) => onRTChange(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <option value="ALL">
                  {selectedRW === 'ALL' ? 'Pilih RW Dulu' : 'Semua RT'}
                </option>
                {rtOptions.map((rt) => (
                  <option key={rt.id} value={rt.id}>
                    {rt.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tombol Reset */}
            {hasFilter && (
              <button
                type="button"
                onClick={onReset}
                aria-label="Kembalikan filter ke semua wilayah"
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Indikator Wilayah Aktif */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-700 font-medium bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              Cakupan:{' '}
              <strong className="text-slate-900 font-bold">
                {selectedRW === 'ALL' ? 'Seluruh Kelurahan Bubulak' : selectedRW}
                {selectedRT !== 'ALL' ? ` - RT ${selectedRT}` : ''}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
