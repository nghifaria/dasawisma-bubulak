'use client';

import React, { useState, useMemo } from 'react';
import {
  DashboardPayload,
  PyramidDataPoint,
  SanitationMetrics,
} from '@/types/dasawisma';
import {
  computePyramid,
  computeEducationDistribution,
  computeJobDistribution,
  computeSanitation,
  computeKia,
  computePrograms,
} from '@/lib/aggregator';
import { normalizeTwoDigit } from '@/lib/sanitizer';
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
    filteredEducation,
    filteredJobs,
    filteredSanitation,
    filteredKia,
    filteredPrograms,
  } = useMemo(() => {
    if (selectedRW === 'ALL') {
      const allUp2k = initialData.rw_list.reduce((sum, r) => sum + r.up2k_aktif_count, 0);
      const allPekarangan = initialData.rw_list.reduce((sum, r) => sum + r.pekarangan_pkk_count, 0);
      const allKerjaBakti = initialData.rw_list.reduce((sum, r) => sum + r.kerja_bakti_count, 0);

      return {
        filteredKPI: initialData.kpi_summary,
        filteredPyramid: initialData.demographics.piramida_usia,
        filteredEducation: initialData.demographics.distribusi_pendidikan,
        filteredJobs: initialData.demographics.distribusi_pekerjaan,
        filteredSanitation: initialData.sanitation,
        filteredKia: initialData.kia_metrics,
        filteredPrograms: {
          up2k: allUp2k,
          pekarangan: allPekarangan,
          kerjaBakti: allKerjaBakti,
        },
      };
    }

    const rwNum = selectedRW.replace(/\D/g, '');
    const rwFamilies = (initialData.raw_families || []).filter(
      (f) => normalizeTwoDigit(f.rw) === rwNum
    );
    const rwBuku2 = (initialData.raw_buku2 || []).filter(
      (b) => normalizeTwoDigit(b.rw) === rwNum
    );
    const rwBuku3 = (initialData.raw_buku3 || []).filter(
      (b) => normalizeTwoDigit(b.rw) === rwNum
    );

    const rwMatch = initialData.rw_list.find((r) => r.rw === selectedRW);

    // Jika RW memiliki tanggapan riil di Google Sheets (seperti RW 12):
    if (rwFamilies.length > 0 || rwBuku2.length > 0 || rwBuku3.length > 0) {
      const citizens = rwFamilies.flatMap((f) => f.anggota_warga);
      const kpi = {
        total_dasawisma: rwMatch ? rwMatch.total_dasawisma : 1,
        total_kk: rwFamilies.length || (rwBuku2.length > 0 ? rwBuku2.reduce((acc, b) => acc + b.jml_kk, 0) : 1),
        total_jiwa: rwFamilies.reduce((acc, f) => acc + f.jml_anggota, 0) || citizens.length,
        total_laki: rwFamilies.reduce((acc, f) => acc + f.jml_laki, 0) || citizens.filter((c) => c.jenis_kelamin === 'L').length,
        total_perempuan: rwFamilies.reduce((acc, f) => acc + f.jml_perempuan, 0) || citizens.filter((c) => c.jenis_kelamin === 'P').length,
        persen_rumah_sehat: rwMatch ? rwMatch.persen_rumah_sehat : 100,
      };

      const realPyramid = computePyramid(citizens);
      const realEducation = computeEducationDistribution(citizens);
      const realJobs = computeJobDistribution(citizens);
      const realSanitation = computeSanitation(rwFamilies, rwBuku2);
      const realPrograms = computePrograms(rwFamilies, rwBuku2);
      const realKia = computeKia(rwBuku3, rwFamilies);

      return {
        filteredKPI: kpi,
        filteredPyramid: realPyramid,
        filteredEducation: realEducation,
        filteredJobs: realJobs,
        filteredSanitation: realSanitation,
        filteredKia: realKia,
        filteredPrograms: realPrograms,
      };
    }

    // Untuk RW yang belum ada data riil, seluruh indikator bernilai 0 murni
    const zeroKPI = {
      total_dasawisma: 0,
      total_kk: 0,
      total_jiwa: 0,
      total_laki: 0,
      total_perempuan: 0,
      persen_rumah_sehat: 0,
    };

    const zeroPyramid = computePyramid([]);
    const zeroEducation = computeEducationDistribution([]);
    const zeroJobs = computeJobDistribution([]);
    const zeroSanitation = computeSanitation([]);
    const zeroPrograms = { up2k: 0, pekarangan: 0, kerjaBakti: 0 };
    const zeroKia = computeKia([]);

    return {
      filteredKPI: zeroKPI,
      filteredPyramid: zeroPyramid,
      filteredEducation: zeroEducation,
      filteredJobs: zeroJobs,
      filteredSanitation: zeroSanitation,
      filteredKia: zeroKia,
      filteredPrograms: zeroPrograms,
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
          educationData={filteredEducation}
          jobData={filteredJobs}
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
            Platform Sistem Informasi & Dashboard Dasawisma TP-PKK Kelurahan Bubulak
          </p>
        </div>
      </footer>
    </div>
  );
}
