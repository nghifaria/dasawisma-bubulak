import React from 'react';
import { SanitationMetrics } from '@/types/dasawisma';
import {
  ShieldCheck,
  Droplets,
  Trash2,
  Waves,
  Briefcase,
  Sprout,
  Users,
} from 'lucide-react';

interface SanitationSectionProps {
  sanitation: SanitationMetrics;
  totalKK: number;
  up2kCount?: number;
  pekaranganCount?: number;
  kerjaBaktiCount?: number;
  selectedRW?: string;
}

export function SanitationSection({
  sanitation,
  totalKK,
  up2kCount = 333,
  pekaranganCount = 530,
  kerjaBaktiCount = 1485,
  selectedRW = 'ALL',
}: SanitationSectionProps) {
  const total = totalKK > 0 ? totalKK : sanitation.total_rumah || 1842;

  // Persentase Sanitasi Fisik
  const persenSehat = sanitation.persen_rumah_sehat || 91.4;
  const persenKurangSehat = Number((100 - persenSehat).toFixed(1));

  const persenMckSendiri = Number(
    ((sanitation.mck_septictank_sendiri / total) * 100).toFixed(1)
  );
  const persenMckMenumpang = Number(
    ((sanitation.mck_menumpang / total) * 100).toFixed(1)
  );
  const persenMckBelumLayak = Math.max(
    0,
    Number((100 - persenMckSendiri - persenMckMenumpang).toFixed(1))
  );

  const persenPdam = Number(((sanitation.air_pdam / total) * 100).toFixed(1));
  const persenSumur = Number(((sanitation.air_sumur / total) * 100).toFixed(1));
  const persenAirLainnya = Math.max(
    0,
    Number((100 - persenPdam - persenSumur).toFixed(1))
  );

  const persenSampah = Number(
    ((sanitation.tempat_sampah_ada / total) * 100).toFixed(1)
  );
  const persenSpal = Number(((sanitation.spal_ada / total) * 100).toFixed(1));

  // Persentase Partisipasi Program PKK
  const persenUp2k = Number(((up2kCount / total) * 100).toFixed(1));
  const persenPekarangan = Number(((pekaranganCount / total) * 100).toFixed(1));
  const persenKerjaBakti = Number(((kerjaBaktiCount / total) * 100).toFixed(1));

  const isFiltered = selectedRW !== 'ALL';

  return (
    <section
      aria-labelledby="heading-sanitasi-pkk"
      className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs w-full space-y-6"
    >
      {/* Header Seksi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="heading-sanitasi-pkk"
              className="text-base sm:text-lg font-bold text-slate-900 tracking-tight"
            >
              Sanitasi Lingkungan & Program Pokok PKK
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Pemantauan Fasilitas Rumah Sehat (Buku 1) & Partisipasi Pemberdayaan Warga (Buku 2)
              {isFiltered ? ` — Wilayah ${selectedRW}` : ' — Seluruh Kelurahan Bubulak'}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200 self-start sm:self-auto">
          Basis: {total.toLocaleString('id-ID')} Rumah Tangga
        </span>
      </div>

      {/* Bagian A: 5 Indikator Sanitasi Fisik Lingkungan */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3.5">
          A. 5 Indikator Fasilitas Sanitasi Fisik
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Kriteria Rumah Sehat */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">Kriteria Rumah</span>
              <span className="text-xs font-extrabold text-emerald-700">
                {persenSehat}% Sehat
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-md h-2.5 overflow-hidden flex">
              <div
                className="bg-emerald-600 h-full transition-all duration-500"
                style={{ width: `${persenSehat}%` }}
                title={`Sehat: ${sanitation.rumah_sehat} rumah (${persenSehat}%)`}
              />
              <div
                className="bg-slate-400 h-full transition-all duration-500"
                style={{ width: `${persenKurangSehat}%` }}
                title={`Kurang Sehat: ${sanitation.rumah_kurang_sehat} rumah (${persenKurangSehat}%)`}
              />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-600 mt-2">
              <span className="text-emerald-800">
                Sehat: {sanitation.rumah_sehat.toLocaleString('id-ID')} ({persenSehat}%)
              </span>
              <span className="text-slate-600">
                Kurang: {sanitation.rumah_kurang_sehat.toLocaleString('id-ID')} ({persenKurangSehat}%)
              </span>
            </div>
          </div>

          {/* 2. MCK & Septic Tank */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">Jamban & Septic Tank</span>
              <span className="text-xs font-extrabold text-emerald-700">
                {persenMckSendiri}% Sendiri
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-md h-2.5 overflow-hidden flex">
              <div
                className="bg-emerald-600 h-full transition-all duration-500"
                style={{ width: `${persenMckSendiri}%` }}
                title={`Sendiri: ${sanitation.mck_septictank_sendiri} rumah (${persenMckSendiri}%)`}
              />
              <div
                className="bg-slate-400 h-full transition-all duration-500"
                style={{ width: `${persenMckMenumpang}%` }}
                title={`Menumpang: ${sanitation.mck_menumpang} rumah (${persenMckMenumpang}%)`}
              />
              <div
                className="bg-rose-400 h-full transition-all duration-500"
                style={{ width: `${persenMckBelumLayak}%` }}
                title={`Belum Layak: ${sanitation.mck_tidak_ada} rumah (${persenMckBelumLayak}%)`}
              />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-600 mt-2">
              <span className="text-emerald-800">Sendiri: {persenMckSendiri}%</span>
              <span>Numpang: {persenMckMenumpang}%</span>
              <span className="text-rose-700">Belum: {persenMckBelumLayak}%</span>
            </div>
          </div>

          {/* 3. Sumber Air Bersih */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sumber Air Bersih</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-700">
                {persenPdam}% PDAM
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-md h-2.5 overflow-hidden flex">
              <div
                className="bg-emerald-600 h-full transition-all duration-500"
                style={{ width: `${persenPdam}%` }}
                title={`PDAM: ${sanitation.air_pdam} rumah (${persenPdam}%)`}
              />
              <div
                className="bg-slate-400 h-full transition-all duration-500"
                style={{ width: `${persenSumur}%` }}
                title={`Sumur Terlindung: ${sanitation.air_sumur} rumah (${persenSumur}%)`}
              />
              <div
                className="bg-amber-400 h-full transition-all duration-500"
                style={{ width: `${persenAirLainnya}%` }}
                title={`Lainnya: ${sanitation.air_lainnya} rumah (${persenAirLainnya}%)`}
              />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-600 mt-2">
              <span className="text-emerald-800">PDAM: {persenPdam}%</span>
              <span>Sumur: {persenSumur}%</span>
              <span>Lainnya: {persenAirLainnya}%</span>
            </div>
          </div>

          {/* 4. Pembuangan Sampah */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <Trash2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tempat Sampah</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-700">
                {persenSampah}% Tertutup
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-md h-2.5 overflow-hidden flex">
              <div
                className="bg-emerald-600 h-full transition-all duration-500"
                style={{ width: `${persenSampah}%` }}
                title={`Tertutup/Terpilah: ${sanitation.tempat_sampah_ada} rumah (${persenSampah}%)`}
              />
              <div
                className="bg-slate-400 h-full transition-all duration-500"
                style={{ width: `${(100 - persenSampah).toFixed(1)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-600 mt-2">
              <span className="text-emerald-800">
                Ada Tertutup: {sanitation.tempat_sampah_ada.toLocaleString('id-ID')}
              </span>
              <span>Terbuka/Belum: {(total - sanitation.tempat_sampah_ada).toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* 5. Saluran Pembuangan Air Limbah (SPAL) */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <Waves className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saluran SPAL</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-700">
                {persenSpal}% Tertutup
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-md h-2.5 overflow-hidden flex">
              <div
                className="bg-emerald-600 h-full transition-all duration-500"
                style={{ width: `${persenSpal}%` }}
                title={`Saluran Tertutup: ${sanitation.spal_ada} rumah (${persenSpal}%)`}
              />
              <div
                className="bg-slate-400 h-full transition-all duration-500"
                style={{ width: `${(100 - persenSpal).toFixed(1)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-600 mt-2">
              <span className="text-emerald-800">
                Tertutup: {sanitation.spal_ada.toLocaleString('id-ID')}
              </span>
              <span>Terbuka/Belum: {(total - sanitation.spal_ada).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian B: 3 Kartu Partisipasi Program Unggulan PKK */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3.5">
          B. Partisipasi 10 Program Pokok PKK (Buku 2)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Program 1: UP2K */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide truncate">
                  Keaktifan UP2K
                </h4>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {persenUp2k}%
                </span>
              </div>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {up2kCount.toLocaleString('id-ID')}{' '}
                <span className="text-xs font-normal text-slate-600">Pelaku Usaha</span>
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                Usaha Peningkatan Pendapatan Keluarga kader rumahan
              </p>
            </div>
          </div>

          {/* Program 2: HATINYA PKK */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <Sprout className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide truncate">
                  HATINYA PKK
                </h4>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {persenPekarangan}%
                </span>
              </div>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {pekaranganCount.toLocaleString('id-ID')}{' '}
                <span className="text-xs font-normal text-slate-600">Pekarangan</span>
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                Pemanfaatan pekarangan untuk Toga & lumbung pangan
              </p>
            </div>
          </div>

          {/* Program 3: Gotong Royong / Kerja Bakti */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide truncate">
                  Kerja Bakti Lingkungan
                </h4>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {persenKerjaBakti}%
                </span>
              </div>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {kerjaBaktiCount.toLocaleString('id-ID')}{' '}
                <span className="text-xs font-normal text-slate-600">KK Aktif</span>
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                Partisipasi rutin gotong royong kebersihan lingkungan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
