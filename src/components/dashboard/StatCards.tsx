import React from 'react';
import { Users, Home, UserCheck, ShieldCheck } from 'lucide-react';

interface StatCardsProps {
  totalDasawisma: number;
  totalKK: number;
  totalJiwa: number;
  totalLaki: number;
  totalPerempuan: number;
  persenRumahSehat: number;
  selectedRW?: string;
}

export function StatCards({
  totalDasawisma,
  totalKK,
  totalJiwa,
  totalLaki,
  totalPerempuan,
  persenRumahSehat,
  selectedRW = 'ALL',
}: StatCardsProps) {
  const isFiltered = selectedRW !== 'ALL';
  const hasData = totalKK > 0;

  const persenLaki =
    totalJiwa > 0 ? ((totalLaki / totalJiwa) * 100).toFixed(1) : '50.0';
  const persenPerempuan =
    totalJiwa > 0 ? ((totalPerempuan / totalJiwa) * 100).toFixed(1) : '50.0';

  return (
    <section aria-label="Ringkasan Indikator Kunci Dasawisma" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Dasawisma */}
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
              {totalDasawisma.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              {isFiltered
                ? hasData
                  ? `Target SK Lurah 2026 • Terdata digital: ${totalKK} KK`
                  : `Target SK Lurah 2026 di ${selectedRW} (Tahap Pendataan)`
                : 'Target SK Lurah 2026 • Realisasi digital: RW 10 & 11 (77 KK)'}
            </p>
          </div>
        </div>

        {/* Card 2: Total Kepala Keluarga (KK) */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Kepala Keluarga (KK)
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Home className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {hasData ? totalKK.toLocaleString('id-ID') : '0'}
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              {isFiltered
                ? hasData
                  ? `Total rumah tangga terdata di ${selectedRW}`
                  : `Tahap pendataan kader lapangan di ${selectedRW}`
                : 'Realisasi digital masuk (RW 10 & RW 11)'}
            </p>
          </div>
        </div>

        {/* Card 3: Total Jiwa & Rasio Gender */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Total Jiwa Penduduk
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <UserCheck className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {hasData ? totalJiwa.toLocaleString('id-ID') : '0'}
            </div>
            {hasData ? (
              <div className="mt-2">
                <div
                  className="w-full bg-slate-100 rounded-md h-2.5 overflow-hidden flex"
                  title={`Laki-laki: ${totalLaki.toLocaleString('id-ID')} (${persenLaki}%), Perempuan: ${totalPerempuan.toLocaleString('id-ID')} (${persenPerempuan}%)`}
                >
                  <div
                    className="bg-blue-600 h-full transition-all duration-500"
                    style={{ width: `${persenLaki}%` }}
                  />
                  <div
                    className="bg-rose-500 h-full transition-all duration-500"
                    style={{ width: `${persenPerempuan}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-semibold mt-1">
                  <span className="text-blue-700">L: {totalLaki.toLocaleString('id-ID')} ({persenLaki}%)</span>
                  <span className="text-rose-700">P: {totalPerempuan.toLocaleString('id-ID')} ({persenPerempuan}%)</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Data anggota keluarga dalam proses penginputan
              </p>
            )}
          </div>
        </div>

        {/* Card 4: Cakupan Sanitasi Sehat */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Rumah Sehat & Sanitasi
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            {hasData ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {persenRumahSehat}%
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Layak
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {isFiltered
                    ? `Sanitasi layak di ${selectedRW}`
                    : 'Basis 77 KK terdata digital (Buku 1 & 2)'}
                </p>
              </>
            ) : (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-400 tracking-tight">
                    -
                  </span>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Tahap Pendataan
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Menunggu verifikasi sanitasi kader lapangan
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
