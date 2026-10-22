'use client';

import React, { useState, useMemo } from 'react';
import {
  MASTER_SK_PENGURUS,
  SK_PENGURUS_INFO,
  getSKDirectoryStats,
} from '@/data/skPengurus';
import {
  Search,
  Users,
  Home,
  CheckCircle2,
  Award,
  ChevronDown,
  ChevronUp,
  FileText,
  UserCheck,
  MapPin,
  X,
} from 'lucide-react';

export function PengurusDirectoryView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRWFilter, setSelectedRWFilter] = useState<string>('ALL');
  const [expandedRWs, setExpandedRWs] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    MASTER_SK_PENGURUS.forEach((r) => {
      init[r.rw] = true;
    });
    return init;
  });

  const stats = useMemo(() => getSKDirectoryStats(), []);

  // Filter RW dan pencarian komprehensif (nama kader, nama RT, nama RW, nama kelompok)
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return MASTER_SK_PENGURUS.filter((rw) => {
      // 1. Filter RW
      if (selectedRWFilter !== 'ALL' && rw.rw !== selectedRWFilter) {
        return false;
      }

      // 2. Filter search query
      if (!q) return true;

      const matchRW = rw.rw.toLowerCase().includes(q);
      const matchCluster = rw.namaCluster?.toLowerCase().includes(q);
      const matchKetuaRW = rw.ketuaRW.toLowerCase().includes(q);

      const matchRT = rw.rtList.some((rt) => {
        const matchKetuaRT = rt.ketuaRT.toLowerCase().includes(q);
        const matchNamaRT = rt.rt.toLowerCase().includes(q);
        const matchKader = rt.kelompokList.some(
          (k) =>
            k.namaKader.toLowerCase().includes(q) ||
            k.namaKelompok.toLowerCase().includes(q)
        );
        return matchKetuaRT || matchNamaRT || matchKader;
      });

      return matchRW || matchCluster || matchKetuaRW || matchRT;
    });
  }, [searchQuery, selectedRWFilter]);

  const toggleRW = (rwCode: string) => {
    setExpandedRWs((prev) => ({
      ...prev,
      [rwCode]: !prev[rwCode],
    }));
  };

  const handleExpandAll = (expand: boolean) => {
    const next: Record<string, boolean> = {};
    MASTER_SK_PENGURUS.forEach((r) => {
      next[r.rw] = expand;
    });
    setExpandedRWs(next);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Banner Resmi SK Lurah */}
      <section
        aria-labelledby="heading-direktori"
        className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-70" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <FileText className="w-3.5 h-3.5" />
              Dokumen Resmi Lampiran SK Lurah
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Nomor: {SK_PENGURUS_INFO.nomorSK} • Ditetapkan {SK_PENGURUS_INFO.tanggalPenetapan}
            </span>
          </div>

          <h1
            id="heading-direktori"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
          >
            Direktori Kepengurusan Kelompok Dasawisma
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
            Berdasarkan Keputusan Lurah Bubulak Nomor: {SK_PENGURUS_INFO.nomorSK} tentang{' '}
            <strong className="text-slate-800 font-semibold">{SK_PENGURUS_INFO.tentang}</strong>,{' '}
            {SK_PENGURUS_INFO.kecamatan}, {SK_PENGURUS_INFO.kota}. Memuat susunan resmi Ketua PKK RW, Ketua PKK RT, dan Kader penanggung jawab tiap kelompok dasawisma.
          </p>
        </div>
      </section>

      {/* 2. Stat Cards Mini Ringkasan SK */}
      <section aria-label="Statistik SK Terdata" className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: RW Terverifikasi */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                RW Terdata SK
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {stats.totalVerifiedRW}{' '}
                <span className="text-lg font-semibold text-slate-400">/ {stats.totalRW} RW</span>
              </div>
              <p className="text-xs text-emerald-700 mt-1 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                100% Lengkap (RW 01 - RW 13)
              </p>
            </div>
          </div>

          {/* Card 2: RT Terdata */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                RT Terdata SK
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Home className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {stats.totalRT} RT
              </div>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Dilengkapi nama Ketua PKK RT resmi
              </p>
            </div>
          </div>

          {/* Card 3: Kelompok Dasawisma */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Kelompok Dasawisma
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Users className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {stats.totalDasawisma} Dawis
              </div>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Terdata dalam lampiran SK Lurah
              </p>
            </div>
          </div>

          {/* Card 4: Total Pengurus & Kader */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Kader & Pengurus SK
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Award className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {stats.totalKader} Orang
              </div>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Ketua RW, Ketua RT & Kader Dasawisma
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sticky Filter & Quick Search Bar */}
      <section
        aria-label="Filter & Pencarian Pengurus"
        className="sticky top-0 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Kotak Pencarian */}
          <div className="relative flex-1">
            <label htmlFor="search-kader" className="sr-only">
              Pencarian Kader atau Dasawisma
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="search-kader"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama kader, ketua RT, atau kelompok (contoh: Siti Martini, Teratai 1.1)..."
              className="w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Bersihkan pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tombol Expand / Collapse All */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              type="button"
              onClick={() => handleExpandAll(true)}
              className="px-3 py-2 min-h-[40px] rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Buka Semua
            </button>
            <button
              type="button"
              onClick={() => handleExpandAll(false)}
              className="px-3 py-2 min-h-[40px] rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Tutup Semua
            </button>
          </div>
        </div>

        {/* Filter Pills RW */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-semibold mr-1 flex-shrink-0">Filter:</span>
          {[
            { id: 'ALL', label: 'Semua (13 RW)' },
            { id: 'RW 01', label: 'RW 01 (Teratai)' },
            { id: 'RW 02', label: 'RW 02 (Melati)' },
            { id: 'RW 03', label: 'RW 03 (Flamboyan)' },
            { id: 'RW 04', label: 'RW 04 (Kenanga)' },
            { id: 'RW 05', label: 'RW 05 (Mawar)' },
            { id: 'RW 06', label: 'RW 06 (Cempaka)' },
            { id: 'RW 07', label: 'RW 07 (Nusa Indah)' },
            { id: 'RW 08', label: 'RW 08 (Anggrek Bulan)' },
            { id: 'RW 09', label: 'RW 09 (Dahlia)' },
            { id: 'RW 10', label: 'RW 10 (Anggrek Merah)' },
            { id: 'RW 11', label: 'RW 11 (Bougenville)' },
            { id: 'RW 12', label: 'RW 12 (Kenanga)' },
            { id: 'RW 13', label: 'RW 13 (Multi-Bunga)' },
          ].map((pill) => {
            const active = selectedRWFilter === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setSelectedRWFilter(pill.id)}
                className={`px-3 py-1.5 min-h-[36px] rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer flex-shrink-0 ${
                  active
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Hierarki Konten: Kartu Per RW */}
      <section aria-label="Daftar Pengurus per RW" className="space-y-6">
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Tidak ditemukan pengurus atau kader
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Tidak ada hasil yang cocok dengan kata kunci &quot;{searchQuery}&quot;. Silakan coba gunakan nama kader, RT, atau pilih filter &quot;Semua RW&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedRWFilter('ALL');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          filteredData.map((rw) => {
            const isExpanded = expandedRWs[rw.rw] ?? true;

            const totalKelompok = rw.rtList.reduce(
              (acc, rt) => acc + rt.kelompokList.length,
              0
            );

            // Kartu RW Terverifikasi SK
            return (
              <article
                key={rw.rw}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                {/* Header RW Accordion Toggle */}
                <header
                  onClick={() => toggleRW(rw.rw)}
                  className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4 cursor-pointer hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-base font-extrabold shadow-xs flex-shrink-0">
                      {rw.rw.replace('RW ', '')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                          {rw.rw} Bubulak
                        </h2>
                        {rw.namaCluster && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Cluster {rw.namaCluster}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          SK Terverifikasi
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 flex items-center gap-2 flex-wrap">
                        <span>
                          Ketua TP-PKK RW:{' '}
                          <strong className="text-slate-900 font-bold">{rw.ketuaRW}</strong>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span>
                          {rw.rtList.length} RT • {totalKelompok} Kelompok Dasawisma
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                      {isExpanded ? 'Sembunyikan RT' : 'Tampilkan RT'}
                    </span>
                    <button
                      type="button"
                      aria-label={`${isExpanded ? 'Tutup' : 'Buka'} rincian ${rw.rw}`}
                      className="w-9 h-9 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-400 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </header>

                {/* Body RT & Grid Kelompok Dasawisma */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 space-y-6">
                    {rw.rtList.map((rt) => (
                      <div
                        key={rt.rt}
                        className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-3.5"
                      >
                        {/* Subheader RT */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2.5 border-b border-slate-200/80">
                          <div className="flex items-center gap-2.5">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-extrabold tracking-wide">
                              {rt.rt}
                            </span>
                            <div className="text-xs sm:text-sm text-slate-700">
                              <span className="text-slate-500 font-medium">Ketua PKK RT: </span>
                              <strong className="text-slate-900 font-bold">{rt.ketuaRT}</strong>
                            </div>
                          </div>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 self-start sm:self-auto">
                            {rt.kelompokList.length} Kelompok Dasawisma
                          </span>
                        </div>

                        {/* Grid Kartu Kelompok Dasawisma */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {rt.kelompokList.map((dawis) => (
                            <div
                              key={dawis.namaKelompok}
                              className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition-all space-y-1.5"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-bold text-emerald-800">
                                  {dawis.namaKelompok}
                                </span>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                              </div>
                              <div className="text-xs font-bold text-slate-900 leading-snug">
                                {dawis.namaKader}
                              </div>
                              <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                                <UserCheck className="w-3 h-3 text-slate-400" />
                                Kader Penanggung Jawab
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })
        )}
      </section>

      {/* 5. Catatan Kaki Legalitas */}
      <footer className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p>
          Dokumen ini merupakan salinan digital resmi dari Keputusan Lurah Bubulak Nomor: {SK_PENGURUS_INFO.nomorSK}.
        </p>
        <p className="font-semibold text-slate-700">
          Kelurahan Bubulak • TP-PKK Kota Bogor
        </p>
      </footer>
    </div>
  );
}
