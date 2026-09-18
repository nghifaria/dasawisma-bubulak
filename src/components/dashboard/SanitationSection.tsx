'use client';

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
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';

interface SanitationSectionProps {
  sanitation: SanitationMetrics;
  totalKK: number;
  up2kCount?: number;
  pekaranganCount?: number;
  kerjaBaktiCount?: number;
  selectedRW?: string;
}

interface RadarTooltipPayloadItem {
  payload: {
    subject: string;
    value: number;
    fullMark: number;
  };
}

function CustomRadarTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: RadarTooltipPayloadItem[];
}) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-slate-900 text-white p-3 rounded-xl shadow-md text-xs border border-slate-700 min-w-[180px]">
      <p className="font-bold text-white mb-1.5 text-sm">{data.subject}</p>
      <div className="space-y-1">
        <p className="flex items-center justify-between gap-3 text-slate-200">
          <span className="text-slate-400">Skor Indeks:</span>
          <span className="font-bold text-emerald-400 text-sm">{data.value}%</span>
        </p>
        <p className="text-[11px] text-slate-400">
          Target optimal: 100%
        </p>
      </div>
    </div>
  );
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

  // 6 Sumbu Pilar Radar Chart
  const radarData = [
    { subject: 'Rumah Sehat', value: persenSehat, fullMark: 100 },
    { subject: 'Jamban/MCK', value: persenMckSendiri, fullMark: 100 },
    { subject: 'Air Bersih', value: persenPdam, fullMark: 100 },
    { subject: 'Sampah', value: persenSampah, fullMark: 100 },
    { subject: 'SPAL', value: persenSpal, fullMark: 100 },
    { subject: 'Kemandirian UP2K', value: persenUp2k, fullMark: 100 },
  ];

  const rataRataPilar = Number(
    (radarData.reduce((acc, curr) => acc + curr.value, 0) / radarData.length).toFixed(1)
  );

  return (
    <section
      aria-labelledby="heading-sanitasi-pkk"
      className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs w-full space-y-6"
    >
      {/* Header Seksi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
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

      {/* Bagian A & Radar Chart Bersanding */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Kolom Kiri: 5 Indikator Fasilitas Sanitasi Fisik */}
        <div className="space-y-3.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            A. 5 Indikator Fasilitas Sanitasi Fisik
          </h3>

          <div className="space-y-3">
            {/* 1. Kriteria Rumah Sehat */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">1. Kriteria Rumah</span>
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
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">2. Jamban & Septic Tank</span>
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
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                  <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3. Sumber Air Bersih</span>
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
                  title={`Sumur: ${sanitation.air_sumur} rumah (${persenSumur}%)`}
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
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                  <Trash2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>4. Tempat Sampah Tertutup</span>
                </div>
                <span className="text-xs font-extrabold text-emerald-700">
                  {persenSampah}% Tertutup
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-md h-2.5 overflow-hidden flex">
                <div
                  className="bg-emerald-600 h-full transition-all duration-500"
                  style={{ width: `${persenSampah}%` }}
                  title={`Tertutup: ${sanitation.tempat_sampah_ada} rumah (${persenSampah}%)`}
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
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                  <Waves className="w-3.5 h-3.5 text-emerald-600" />
                  <span>5. Saluran SPAL Tertutup</span>
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

        {/* Kolom Kanan: Radar Chart 6 Pilar Sanitasi & PKK */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Radar 6 Pilar Sanitasi & PKK
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Cakupan sanitasi fisik & kemandirian ekonomi warga (0 - 100%)
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
                Spider Chart
              </span>
            </div>

            <div className="w-full h-[320px] sm:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  data={radarData}
                >
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    stroke="#cbd5e1"
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                  />
                  <Tooltip content={<CustomRadarTooltip />} />
                  <Radar
                    name="Capaian Wilayah"
                    dataKey="value"
                    stroke="#059669"
                    strokeWidth={2}
                    fill="#059669"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ringkasan Skor Rata-rata 6 Pilar */}
          <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Rata-rata Capaian 6 Pilar:</span>
            <span className="font-extrabold text-emerald-700 text-sm bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              {rataRataPilar}%
            </span>
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
