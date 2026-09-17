import React from 'react';
import {
  HeartPulse,
  Baby,
  FileCheck2,
  ShieldAlert,
  CheckCircle2,
  Stethoscope,
} from 'lucide-react';

interface KiaMetricsProps {
  totalBumil: number;
  bumilResti: number;
  totalBayiLahir: number;
  bayiBerakta: number;
  persenBayiBerakta: number;
  mortalitasIbu: number;
  mortalitasBayi: number;
  selectedRW?: string;
}

export function KiaSection({
  totalBumil,
  bumilResti,
  totalBayiLahir,
  bayiBerakta,
  persenBayiBerakta,
  mortalitasIbu,
  mortalitasBayi,
  selectedRW = 'ALL',
}: KiaMetricsProps) {
  const isZeroMortality = mortalitasIbu === 0 && mortalitasBayi === 0;
  const isFiltered = selectedRW !== 'ALL';

  return (
    <section
      aria-labelledby="heading-kia"
      className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs w-full space-y-6"
    >
      {/* Header Seksi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <HeartPulse className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="heading-kia"
              className="text-base sm:text-lg font-bold text-slate-900 tracking-tight"
            >
              Kesehatan Ibu & Anak (KIA) serta Catatan Khusus
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Surveilans Berbasis Kejadian: Ibu Hamil, Kelahiran Bayi, dan Mortalitas (Buku 3)
              {isFiltered ? ` — Wilayah ${selectedRW}` : ' — Seluruh Kelurahan Bubulak'}
            </p>
          </div>
        </div>

        {isZeroMortality && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Nol Kasus Kematian (Zero Mortality)</span>
          </span>
        )}
      </div>

      {/* Grid 4 Kartu Pemantauan KIA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Ibu Hamil & Resti */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Ibu Hamil Terdata
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <HeartPulse className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {totalBumil.toLocaleString('id-ID')}
              </span>
              <span className="text-xs font-medium text-slate-600">Ibu</span>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">Risiko Tinggi (Resti):</span>
              <span
                className={`font-bold px-2 py-0.5 rounded-md ${
                  bumilResti > 0
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900'
                }`}
              >
                {bumilResti} Kasus
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Rutin pemantauan ANC di Puskesmas / Posyandu
            </p>
          </div>
        </div>

        {/* Card 2: Ibu Bersalin & Nifas */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Persalinan & Nifas
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {totalBayiLahir.toLocaleString('id-ID')}
              </span>
              <span className="text-xs font-medium text-slate-600">Ibu Bersalin</span>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">Penolong Nakes:</span>
              <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                100% Medis
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Seluruh persalinan ditolong Bidan/Dokter di Faskes
            </p>
          </div>
        </div>

        {/* Card 3: Bayi Lahir & Kepemilikan Akta */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Kelahiran & Akta
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {totalBayiLahir.toLocaleString('id-ID')}
              </span>
              <span className="text-xs font-medium text-slate-600">Bayi Hidup</span>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">Memiliki Akta:</span>
              <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                {bayiBerakta} ({persenBayiBerakta}%)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Kepemilikan Akta Kelahiran resmi Disdukcapil
            </p>
          </div>
        </div>

        {/* Card 4: Catatan Mortalitas */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Catatan Mortalitas
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Baby className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl font-extrabold tracking-tight ${
                  isZeroMortality ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {mortalitasIbu + mortalitasBayi}
              </span>
              <span className="text-xs font-medium text-slate-600">Kematian</span>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Kematian Ibu:</span>
                <span className="font-bold text-slate-900">{mortalitasIbu} Kasus</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Kematian Bayi:</span>
                <span className="font-bold text-slate-900">{mortalitasBayi} Kasus</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              {isZeroMortality
                ? 'Kondisi kesehatan ibu dan bayi terpantau prima'
                : 'Diperlukan tindak lanjut bersama faskes terkait'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
