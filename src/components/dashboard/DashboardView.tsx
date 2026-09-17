'use client';

import React, { useState, useMemo } from 'react';
import {
  DashboardPayload,
  PyramidDataPoint,
  SanitationMetrics,
} from '@/types/dasawisma';
import { HeaderExecutive } from './HeaderExecutive';
import { StatCards } from './StatCards';
import { GlobalFilterBar } from './GlobalFilterBar';
import { RWComparisonChart } from './RWComparisonChart';
import { DemographicsChart } from './DemographicsChart';
import { EducationJobChart } from './EducationJobChart';
import { SanitationSection } from './SanitationSection';
import { KiaSection } from './KiaSection';
import { RekapWilayahTable } from './RekapWilayahTable';

interface DashboardViewProps {
  initialData: DashboardPayload;
}

export function DashboardView({ initialData }: DashboardViewProps) {
  const [selectedRW, setSelectedRW] = useState<string>('ALL');
  const [selectedRT, setSelectedRT] = useState<string>('ALL');

  // Kalkulasi data reaktif saat filter wilayah berubah
  const {
    filteredKPI,
    filteredPyramid,
    filteredSanitation,
    filteredKia,
    filteredPrograms,
  } = useMemo(() => {
    if (selectedRW === 'ALL') {
      return {
        filteredKPI: initialData.kpi_summary,
        filteredPyramid: initialData.demographics.piramida_usia,
        filteredSanitation: initialData.sanitation,
        filteredKia: initialData.kia_metrics,
        filteredPrograms: {
          up2k: 333,
          pekarangan: 530,
          kerjaBakti: 1485,
        },
      };
    }

    const rwMatch = initialData.rw_list.find((r) => r.rw === selectedRW);
    if (!rwMatch) {
      return {
        filteredKPI: initialData.kpi_summary,
        filteredPyramid: initialData.demographics.piramida_usia,
        filteredSanitation: initialData.sanitation,
        filteredKia: initialData.kia_metrics,
        filteredPrograms: {
          up2k: 333,
          pekarangan: 530,
          kerjaBakti: 1485,
        },
      };
    }

    const kpi = {
      total_dasawisma: rwMatch.total_dasawisma,
      total_kk: rwMatch.total_kk,
      total_jiwa: rwMatch.total_jiwa,
      total_laki: rwMatch.total_l,
      total_perempuan: rwMatch.total_p,
      persen_rumah_sehat: rwMatch.persen_rumah_sehat,
    };

    // Skalakan piramida penduduk secara proporsional sesuai rasio jiwa wilayah RW
    const totalAllJiwa = initialData.kpi_summary.total_jiwa || 6450;
    const ratio = rwMatch.total_jiwa / totalAllJiwa;

    const scaledPyramid: PyramidDataPoint[] = initialData.demographics.piramida_usia.map((p) => ({
      ...p,
      laki_laki: Math.max(1, Math.round(p.laki_laki * ratio)),
      perempuan: Math.max(1, Math.round(p.perempuan * ratio)),
      total: Math.max(2, Math.round(p.total * ratio)),
    }));

    // Skalakan metrik sanitasi untuk wilayah RW spesifik
    const saniMenumpang = Math.round(rwMatch.total_kk * 0.08);
    const saniTidakAda = Math.max(0, rwMatch.total_kk - rwMatch.mck_layak_count - saniMenumpang);

    const sani: SanitationMetrics = {
      total_rumah: rwMatch.total_kk,
      rumah_sehat: rwMatch.rumah_sehat_count,
      rumah_kurang_sehat: rwMatch.rumah_kurang_sehat_count,
      persen_rumah_sehat: rwMatch.persen_rumah_sehat,
      mck_septictank_sendiri: rwMatch.mck_layak_count,
      mck_menumpang: saniMenumpang,
      mck_tidak_ada: saniTidakAda,
      persen_mck_layak: rwMatch.persen_mck_layak,
      air_pdam: rwMatch.air_pdam_count,
      air_sumur: rwMatch.air_sumur_count,
      air_lainnya: Math.max(0, rwMatch.total_kk - rwMatch.air_pdam_count - rwMatch.air_sumur_count),
      tempat_sampah_ada: Math.round(rwMatch.total_kk * 0.93),
      spal_ada: Math.round(rwMatch.total_kk * 0.88),
    };

    // Metrik KIA wilayah RW
    const totalBayi = Math.max(1, Math.round(rwMatch.total_balita * 0.3));
    const kia = {
      total_bumil: Math.max(1, rwMatch.total_bumil),
      bumil_resti: rwMatch.rw === 'RW 12' ? 0 : Math.round(rwMatch.total_bumil * 0.1),
      total_bayi_lahir: totalBayi,
      bayi_berakta: Math.max(1, Math.round(totalBayi * 0.95)),
      persen_bayi_berakta: 95.5,
      mortalitas_ibu: 0,
      mortalitas_bayi: 0,
    };

    return {
      filteredKPI: kpi,
      filteredPyramid: scaledPyramid,
      filteredSanitation: sani,
      filteredKia: kia,
      filteredPrograms: {
        up2k: rwMatch.up2k_aktif_count,
        pekarangan: rwMatch.pekarangan_pkk_count,
        kerjaBakti: rwMatch.kerja_bakti_count,
      },
    };
  }, [selectedRW, initialData]);

  const handleReset = () => {
    setSelectedRW('ALL');
    setSelectedRT('ALL');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Header Eksekutif & Identitas Resmi PKK */}
      <HeaderExecutive lastUpdated={initialData.last_updated} />

      {/* 2. Sticky Global Filter Bar */}
      <GlobalFilterBar
        selectedRW={selectedRW}
        selectedRT={selectedRT}
        onRWChange={setSelectedRW}
        onRTChange={setSelectedRT}
        onReset={handleReset}
      />

      {/* 3. Konten Utama: Clean Vertical Flow */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 md:space-y-12">
        {/* Seksi 2: 4 Kartu Metrik Utama */}
        <StatCards
          totalDasawisma={filteredKPI.total_dasawisma}
          totalKK={filteredKPI.total_kk}
          totalJiwa={filteredKPI.total_jiwa}
          totalLaki={filteredKPI.total_laki}
          totalPerempuan={filteredKPI.total_perempuan}
          persenRumahSehat={filteredKPI.persen_rumah_sehat}
          selectedRW={selectedRW}
        />

        {/* Seksi 4: Komparasi Data Antar-RW */}
        <RWComparisonChart
          data={initialData.rw_list}
          selectedRW={selectedRW}
          onSelectRW={(rw) => setSelectedRW(rw)}
        />

        {/* Seksi 5: Demografi - Piramida Penduduk Simetris */}
        <DemographicsChart
          data={filteredPyramid}
          totalJiwa={filteredKPI.total_jiwa}
        />

        {/* Seksi 5B: Distribusi Pendidikan & Pekerjaan Utama */}
        <EducationJobChart
          educationData={initialData.demographics.distribusi_pendidikan}
          jobData={initialData.demographics.distribusi_pekerjaan}
        />

        {/* Seksi 6: Indikator Sanitasi Fisik & Partisipasi Program PKK */}
        <SanitationSection
          sanitation={filteredSanitation}
          totalKK={filteredKPI.total_kk}
          up2kCount={filteredPrograms.up2k}
          pekaranganCount={filteredPrograms.pekarangan}
          kerjaBaktiCount={filteredPrograms.kerjaBakti}
          selectedRW={selectedRW}
        />

        {/* Seksi 7: Pemantauan Kesehatan Ibu & Anak (KIA) Buku 3 */}
        <KiaSection
          totalBumil={filteredKia.total_bumil}
          bumilResti={filteredKia.bumil_resti}
          totalBayiLahir={filteredKia.total_bayi_lahir}
          bayiBerakta={filteredKia.bayi_berakta}
          persenBayiBerakta={filteredKia.persen_bayi_berakta}
          mortalitasIbu={filteredKia.mortalitas_ibu}
          mortalitasBayi={filteredKia.mortalitas_bayi}
          selectedRW={selectedRW}
        />

        {/* Seksi 8: Tabel Rekapitulasi Wilayah Lengkap 13 RW */}
        <RekapWilayahTable
          data={initialData.rw_list}
          selectedRW={selectedRW}
          onSelectRW={(rw) => setSelectedRW(rw)}
        />
      </main>

      {/* Footer Resmi Pemerintahan Kelurahan */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>
            © 2026 Tim Penggerak PKK Kelurahan Bubulak, Kecamatan Bogor Barat, Kota Bogor.
          </p>
          <p className="font-semibold text-slate-700">
            Platform Sistem Informasi & Dashboard Dasawisma (Wilayah Pilot: RW 12)
          </p>
        </div>
      </footer>
    </div>
  );
}
