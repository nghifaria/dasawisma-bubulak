'use client';

import React, { useState, useMemo } from 'react';
import { RWMetricsAggregated } from '@/types/dasawisma';
import { Table, Search, CheckCircle2, ChevronRight, Clock, ShieldCheck } from 'lucide-react';

interface RekapWilayahTableProps {
  data: RWMetricsAggregated[];
  selectedRW?: string;
  onSelectRW?: (rw: string) => void;
}

export function RekapWilayahTable({
  data,
  selectedRW = 'ALL',
  onSelectRW,
}: RekapWilayahTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter baris data berdasarkan pencarian instan
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase().trim();
    return data.filter(
      (item) =>
        item.rw.toLowerCase().includes(q) ||
        `rw ${item.rw}`.toLowerCase().includes(q) ||
        (item.cluster_name && item.cluster_name.toLowerCase().includes(q))
    );
  }, [data, searchQuery]);

  // Kalkulasi Grand Total untuk seluruh RW
  const grandTotal = useMemo(() => {
    const totalRT = data.reduce((sum, r) => sum + (r.target_rt || r.total_rt), 0);
    const totalDasawisma = data.reduce((sum, r) => sum + (r.target_dasawisma || r.total_dasawisma), 0);
    const totalKK = data.reduce((sum, r) => sum + r.total_kk, 0);
    const totalJiwa = data.reduce((sum, r) => sum + r.total_jiwa, 0);
    const totalL = data.reduce((sum, r) => sum + r.total_l, 0);
    const totalP = data.reduce((sum, r) => sum + r.total_p, 0);
    const totalRumahSehat = data.reduce((sum, r) => sum + r.rumah_sehat_count, 0);
    const totalMckLayak = data.reduce((sum, r) => sum + r.mck_layak_count, 0);
    const totalUp2k = data.reduce((sum, r) => sum + r.up2k_aktif_count, 0);

    // Dihitung hanya dari rumah tangga yang sudah masuk formulir
    const avgPersenSehat =
      totalKK > 0 ? Number(((totalRumahSehat / totalKK) * 100).toFixed(1)) : 0;
    const avgPersenMck =
      totalKK > 0 ? Number(((totalMckLayak / totalKK) * 100).toFixed(1)) : 0;
    const avgPersenUp2k =
      totalKK > 0 ? Number(((totalUp2k / totalKK) * 100).toFixed(1)) : 0;

    return {
      totalRT,
      totalDasawisma,
      totalKK,
      totalJiwa,
      totalL,
      totalP,
      avgPersenSehat,
      avgPersenMck,
      avgPersenUp2k,
    };
  }, [data]);

  return (
    <section
      aria-labelledby="heading-rekap-wilayah"
      className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs w-full space-y-4"
    >
      {/* Header & Quick Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Table className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="heading-rekap-wilayah"
              className="text-base sm:text-lg font-bold text-slate-900 tracking-tight"
            >
              Tabel Rekapitulasi Wilayah & Progres Digital
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Target SK Lurah Bubulak No. 147/BBLK/Juni 2026 (50 RT & 226 Dasawisma) vs Realisasi Digital
            </p>
          </div>
        </div>

        {/* Kotak Pencarian Instan (Touch Target >= 44px) */}
        <div className="relative w-full sm:w-64">
          <label htmlFor="search-rw-table" className="sr-only">
            Cari nama RW
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="search-rw-table"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari RW (contoh: RW 10, RW 02)..."
            className="w-full min-h-[44px] pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Tabel Data Responsif */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
              <th scope="col" className="py-3 px-4">Wilayah RW</th>
              <th scope="col" className="py-3 px-3 text-center">Status</th>
              <th scope="col" className="py-3 px-3 text-center">Target RT</th>
              <th scope="col" className="py-3 px-3 text-center">Target Dawis</th>
              <th scope="col" className="py-3 px-3 text-right">Realisasi KK</th>
              <th scope="col" className="py-3 px-4 text-right">Total Jiwa (L / P)</th>
              <th scope="col" className="py-3 px-3 text-right">% Rumah Sehat</th>
              <th scope="col" className="py-3 px-3 text-right">% MCK Layak</th>
              <th scope="col" className="py-3 px-3 text-right">% UP2K</th>
              <th scope="col" className="py-3 px-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredList.map((row) => {
              const isSelected = selectedRW === row.rw;
              const hasData = row.total_kk > 0;

              return (
                <tr
                  key={row.rw}
                  onClick={() => onSelectRW && onSelectRW(row.rw)}
                  className={`transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/75 hover:bg-emerald-100/60 font-semibold'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Kolom Wilayah RW */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{row.rw}</span>
                        {isSelected && (
                          <span className="px-1.5 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-bold">
                            Dipilih
                          </span>
                        )}
                      </div>
                      {row.cluster_name && (
                        <span className="text-[10px] text-slate-500 font-normal truncate max-w-[140px]">
                          {row.cluster_name}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Kolom Status Pendataan */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    {hasData ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Aktif Terdata
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Tahap Pendataan Lapangan
                      </span>
                    )}
                  </td>

                  {/* Kolom Target RT */}
                  <td className="py-3 px-3 text-center text-slate-700 font-medium">
                    {row.target_rt || row.total_rt}
                  </td>

                  {/* Kolom Target Dasawisma */}
                  <td className="py-3 px-3 text-center font-bold text-slate-900">
                    {row.target_dasawisma || row.total_dasawisma}
                  </td>

                  {/* Kolom Realisasi KK */}
                  <td className="py-3 px-3 text-right font-bold text-slate-900">
                    {hasData ? (
                      row.total_kk.toLocaleString('id-ID')
                    ) : (
                      <span className="text-slate-400 font-normal">-</span>
                    )}
                  </td>

                  {/* Kolom Total Jiwa (L / P) */}
                  <td className="py-3 px-4 text-right whitespace-nowrap text-slate-700">
                    {hasData ? (
                      <>
                        <span className="font-bold text-slate-900">
                          {row.total_jiwa.toLocaleString('id-ID')}
                        </span>{' '}
                        <span className="text-[11px] text-slate-500">
                          ({row.total_l} L / {row.total_p} P)
                        </span>
                      </>
                    ) : (
                      <span className="text-slate-400 font-normal">-</span>
                    )}
                  </td>

                  {/* Kolom % Rumah Sehat */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    {hasData ? (
                      <div className="flex items-center justify-end gap-1.5 font-bold">
                        {row.persen_rumah_sehat >= 90 && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                        )}
                        <span className="text-slate-900">{row.persen_rumah_sehat}%</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-normal">-</span>
                    )}
                  </td>

                  {/* Kolom % MCK Layak */}
                  <td className="py-3 px-3 text-right font-semibold text-slate-700">
                    {hasData ? (
                      `${row.persen_mck_layak}%`
                    ) : (
                      <span className="text-slate-400 font-normal">-</span>
                    )}
                  </td>

                  {/* Kolom % UP2K */}
                  <td className="py-3 px-3 text-right font-semibold text-emerald-800">
                    {hasData ? (
                      `${row.persen_up2k}%`
                    ) : (
                      <span className="text-slate-400 font-normal">-</span>
                    )}
                  </td>

                  {/* Kolom Aksi */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <button
                      type="button"
                      aria-label={`Pilih dan filter data ${row.rw}`}
                      className="inline-flex items-center justify-center p-2 min-h-[36px] min-w-[36px] rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectRW) onSelectRW(row.rw);
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* Baris Grand Total Penutup */}
            <tr className="bg-slate-100 text-slate-900 font-extrabold border-t-2 border-slate-300">
              <td className="py-3.5 px-4 whitespace-nowrap text-slate-900" colSpan={2}>
                GRAND TOTAL KELURAHAN (SK LURAH)
              </td>
              <td className="py-3.5 px-3 text-center font-bold text-slate-900">
                {grandTotal.totalRT} RT
              </td>
              <td className="py-3.5 px-3 text-center font-bold text-emerald-800">
                {grandTotal.totalDasawisma} Dawis
              </td>
              <td className="py-3.5 px-3 text-right font-bold text-slate-900">
                {grandTotal.totalKK.toLocaleString('id-ID')} KK
              </td>
              <td className="py-3.5 px-4 text-right whitespace-nowrap">
                {grandTotal.totalJiwa.toLocaleString('id-ID')} Jiwa{' '}
                <span className="text-[11px] font-semibold text-slate-600">
                  ({grandTotal.totalL} L / {grandTotal.totalP} P)
                </span>
              </td>
              <td className="py-3.5 px-3 text-right text-emerald-800">
                {grandTotal.totalKK > 0 ? `${grandTotal.avgPersenSehat}%` : '-'}
              </td>
              <td className="py-3.5 px-3 text-right">
                {grandTotal.totalKK > 0 ? `${grandTotal.avgPersenMck}%` : '-'}
              </td>
              <td className="py-3.5 px-3 text-right text-emerald-800">
                {grandTotal.totalKK > 0 ? `${grandTotal.avgPersenUp2k}%` : '-'}
              </td>
              <td className="py-3.5 px-3 text-center text-slate-500">-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-600 pt-2 gap-2">
        <span className="font-medium">
          Master Baku: 13 RW • 50 RT • 226 Kelompok Dasawisma (Realisasi Input Digital: RW 10 & RW 11)
        </span>
        <span className="text-[11px] text-slate-500 italic">
          *Tanda (-) menandakan RW sedang dalam tahap penyelesaian pendataan lapangan oleh kader
        </span>
      </div>
    </section>
  );
}
