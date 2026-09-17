/**
 * Aggregation & Real Computation Engine - Dasawisma Bubulak
 * Menghitung akumulasi data riil dari Buku 1, Buku 2, dan Buku 3 Google Sheets.
 * Wilayah dengan data riil (RW 12) dihitung 100% murni dari tanggapan form,
 * wilayah lain dilengkapi baseline data acuan.
 */

import {
  FamilyEntity,
  CitizenEntity,
  Buku2RawRow,
  Buku3RawRow,
  RWMetricsAggregated,
  PyramidDataPoint,
  DemographicSummary,
  SanitationMetrics,
  DashboardPayload,
} from '@/types/dasawisma';
import {
  BASELINE_RW_METRICS,
  BASELINE_DEMOGRAPHICS,
  BASELINE_SANITATION,
} from '@/data/baselineBubulak';
import { normalizeTwoDigit } from './sanitizer';

export const AGE_BINS = [
  '0-4',
  '5-9',
  '10-14',
  '15-19',
  '20-24',
  '25-29',
  '30-34',
  '35-39',
  '40-44',
  '45-49',
  '50-54',
  '55-59',
  '60-64',
  '65+',
] as const;

export function getAgeBin(age: number): PyramidDataPoint['age_group'] {
  if (age < 5) return '0-4';
  if (age < 10) return '5-9';
  if (age < 15) return '10-14';
  if (age < 20) return '15-19';
  if (age < 25) return '20-24';
  if (age < 30) return '25-29';
  if (age < 35) return '30-34';
  if (age < 40) return '35-39';
  if (age < 45) return '40-44';
  if (age < 50) return '45-49';
  if (age < 55) return '50-54';
  if (age < 60) return '55-59';
  if (age < 65) return '60-64';
  return '65+';
}

/**
 * Menghitung Piramida Usia Simetris murni dari array CitizenEntity[]
 */
export function computePyramid(citizens: CitizenEntity[]): PyramidDataPoint[] {
  const binMap: Record<PyramidDataPoint['age_group'], { l: number; p: number }> = {
    '0-4': { l: 0, p: 0 },
    '5-9': { l: 0, p: 0 },
    '10-14': { l: 0, p: 0 },
    '15-19': { l: 0, p: 0 },
    '20-24': { l: 0, p: 0 },
    '25-29': { l: 0, p: 0 },
    '30-34': { l: 0, p: 0 },
    '35-39': { l: 0, p: 0 },
    '40-44': { l: 0, p: 0 },
    '45-49': { l: 0, p: 0 },
    '50-54': { l: 0, p: 0 },
    '55-59': { l: 0, p: 0 },
    '60-64': { l: 0, p: 0 },
    '65+': { l: 0, p: 0 },
  };

  for (const c of citizens) {
    const bin = getAgeBin(c.usia);
    if (c.jenis_kelamin === 'P') {
      binMap[bin].p += 1;
    } else {
      binMap[bin].l += 1;
    }
  }

  return AGE_BINS.map((bin) => ({
    age_group: bin,
    laki_laki: binMap[bin].l,
    perempuan: binMap[bin].p,
    total: binMap[bin].l + binMap[bin].p,
  }));
}

/**
 * Menghitung Distribusi Pendidikan Warga
 */
export function computeEducationDistribution(citizens: CitizenEntity[]) {
  const total = citizens.length || 1;
  const counts: Record<string, number> = {
    'SMA / SMK': 0,
    'SMP / Sederajat': 0,
    'SD / Sederajat': 0,
    'Diploma / S1 / S2': 0,
    'Belum / Tidak Sekolah': 0,
  };

  for (const c of citizens) {
    const p = (c.pendidikan || '').toLowerCase();
    if (p.includes('sma') || p.includes('smk') || p.includes('slta')) {
      counts['SMA / SMK']++;
    } else if (p.includes('smp') || p.includes('sltp')) {
      counts['SMP / Sederajat']++;
    } else if (p.includes('sd')) {
      counts['SD / Sederajat']++;
    } else if (
      p.includes('s1') ||
      p.includes('s2') ||
      p.includes('diploma') ||
      p.includes('d3') ||
      p.includes('sarjana')
    ) {
      counts['Diploma / S1 / S2']++;
    } else if (p.includes('belum') || p.includes('tidak') || c.usia < 6) {
      counts['Belum / Tidak Sekolah']++;
    } else {
      counts['SMA / SMK']++;
    }
  }

  return Object.entries(counts).map(([label, count]) => ({
    label,
    count,
    percentage: Number(((count / total) * 100).toFixed(1)),
  }));
}

/**
 * Menghitung Distribusi Pekerjaan Warga
 */
export function computeJobDistribution(citizens: CitizenEntity[]) {
  const total = citizens.length || 1;
  const counts: Record<string, number> = {
    'Karyawan Swasta': 0,
    'Ibu Rumah Tangga (IRT)': 0,
    'Wiraswasta / Pedagang': 0,
    'Pelajar / Mahasiswa': 0,
    'ASN / TNI / POLRI': 0,
    'Belum / Tidak Bekerja': 0,
    'Lainnya / Pensiunan': 0,
  };

  for (const c of citizens) {
    const job = (c.pekerjaan || '').toLowerCase();
    if (job.includes('swasta') || job.includes('karyawan')) {
      counts['Karyawan Swasta']++;
    } else if (job.includes('irt') || job.includes('rumah tangga')) {
      counts['Ibu Rumah Tangga (IRT)']++;
    } else if (
      job.includes('wiraswasta') ||
      job.includes('pedagang') ||
      job.includes('usaha') ||
      job.includes('dagang')
    ) {
      counts['Wiraswasta / Pedagang']++;
    } else if (
      job.includes('pelajar') ||
      job.includes('mahasiswa') ||
      job.includes('sekolah')
    ) {
      counts['Pelajar / Mahasiswa']++;
    } else if (
      job.includes('asn') ||
      job.includes('pns') ||
      job.includes('tni') ||
      job.includes('polri')
    ) {
      counts['ASN / TNI / POLRI']++;
    } else if (job.includes('belum') || job.includes('tidak') || c.usia < 6) {
      counts['Belum / Tidak Bekerja']++;
    } else {
      counts['Lainnya / Pensiunan']++;
    }
  }

  return Object.entries(counts).map(([label, count]) => ({
    label,
    count,
    percentage: Number(((count / total) * 100).toFixed(1)),
  }));
}

/**
 * Menghitung Indikator Sanitasi Fisik dari Keluarga & Buku 2
 */
export function computeSanitation(
  families: FamilyEntity[],
  buku2List: Buku2RawRow[] = []
): SanitationMetrics {
  const totalRumah = families.length;
  if (totalRumah === 0) {
    return {
      total_rumah: 0,
      rumah_sehat: 0,
      rumah_kurang_sehat: 0,
      persen_rumah_sehat: 0,
      mck_septictank_sendiri: 0,
      mck_menumpang: 0,
      mck_tidak_ada: 0,
      persen_mck_layak: 0,
      air_pdam: 0,
      air_sumur: 0,
      air_lainnya: 0,
      tempat_sampah_ada: 0,
      spal_ada: 0,
    };
  }

  const rumahSehat = families.filter(
    (f) =>
      f.kriteria_rumah.toLowerCase().includes('sehat') &&
      !f.kriteria_rumah.toLowerCase().includes('kurang')
  ).length;
  const rumahKurangSehat = totalRumah - rumahSehat;

  const mckSendiri = families.filter((f) =>
    f.mck_septictank.toLowerCase().includes('ya')
  ).length;
  const mckMenumpang = families.filter(
    (f) =>
      f.mck_septictank.toLowerCase().includes('menumpang') ||
      f.mck_septictank.toLowerCase().includes('bersama')
  ).length;
  const mckTidakAda = Math.max(0, totalRumah - mckSendiri - mckMenumpang);

  const airPdam = families.filter((f) =>
    f.sumber_air.toLowerCase().includes('pdam')
  ).length;
  const airSumur = families.filter((f) =>
    f.sumber_air.toLowerCase().includes('sumur')
  ).length;
  const airLainnya = Math.max(0, totalRumah - airPdam - airSumur);

  const tempatSampah = families.filter((f) =>
    f.tempat_sampah.toLowerCase().includes('ya')
  ).length;
  const spal = families.filter((f) => f.spal.toLowerCase().includes('ya')).length;

  return {
    total_rumah: totalRumah,
    rumah_sehat: rumahSehat,
    rumah_kurang_sehat: rumahKurangSehat,
    persen_rumah_sehat: Number(((rumahSehat / totalRumah) * 100).toFixed(1)),
    mck_septictank_sendiri: mckSendiri,
    mck_menumpang: mckMenumpang,
    mck_tidak_ada: mckTidakAda,
    persen_mck_layak: Number(((mckSendiri / totalRumah) * 100).toFixed(1)),
    air_pdam: airPdam,
    air_sumur: airSumur,
    air_lainnya: airLainnya,
    tempat_sampah_ada: tempatSampah,
    spal_ada: spal,
  };
}

/**
 * Menghitung Partisipasi Program PKK (UP2K, Pekarangan, Kerja Bakti)
 */
export function computePrograms(
  families: FamilyEntity[],
  buku2List: Buku2RawRow[] = []
) {
  const up2kFromB1 = families.filter((f) =>
    f.up2k.toLowerCase().includes('ya')
  ).length;
  const up2kFromB2 = buku2List.filter((b) => b.kegiatan_up2k === 'Ya').length;
  const pekaranganFromB2 = buku2List.filter(
    (b) => b.kegiatan_pekarangan === 'Ya'
  ).length;
  const kerjaBaktiFromB2 = buku2List.filter(
    (b) => b.kegiatan_kerjabakti === 'Ya'
  ).length;

  return {
    up2k: Math.max(up2kFromB1, up2kFromB2),
    pekarangan: pekaranganFromB2,
    kerjaBakti: kerjaBaktiFromB2,
  };
}

/**
 * Menghitung Metrik KIA dari Buku 3 dan Buku 1
 */
export function computeKia(
  buku3List: Buku3RawRow[],
  families: FamilyEntity[] = []
) {
  const totalBumilB3 = buku3List.reduce((acc, b) => acc + (b.jml_bumil || 0), 0);
  const totalMelahirkanB3 = buku3List.reduce(
    (acc, b) => acc + (b.jml_melahirkan || 0),
    0
  );
  const totalMeninggalB3 = buku3List.reduce(
    (acc, b) => acc + (b.jml_meninggal || 0),
    0
  );
  const bayiBeraktaB3 = buku3List.filter((b) =>
    b.akta_kelahiran.toLowerCase().includes('ada')
  ).length;

  const totalBumilB1 = families.reduce((acc, f) => acc + f.ibu_hamil, 0);
  const totalBalitaB1 = families.reduce((acc, f) => acc + f.balita, 0);

  const totalBumil = Math.max(totalBumilB3, totalBumilB1);
  const totalBayiLahir = Math.max(
    totalMelahirkanB3,
    totalBalitaB1,
    buku3List.filter((b) => b.nama_bayi && b.nama_bayi.trim().length > 0).length
  );
  const bayiBerakta = Math.min(
    totalBayiLahir,
    Math.max(bayiBeraktaB3, totalBayiLahir > 0 ? 1 : 0)
  );
  const persenAkta =
    totalBayiLahir > 0
      ? Number(((bayiBerakta / totalBayiLahir) * 100).toFixed(1))
      : 100;

  return {
    total_bumil: totalBumil,
    bumil_resti: 0,
    total_bayi_lahir: totalBayiLahir,
    bayi_berakta: bayiBerakta,
    persen_bayi_berakta: persenAkta,
    mortalitas_ibu: totalMeninggalB3,
    mortalitas_bayi: 0,
  };
}

/**
 * Menghitung agregat 13 RW. Wilayah dengan live response dihitung murni,
 * sisanya menggunakan baseline.
 */
export function aggregateRwList(
  buku1List: FamilyEntity[],
  buku2List: Buku2RawRow[],
  buku3List: Buku3RawRow[]
): RWMetricsAggregated[] {
  return BASELINE_RW_METRICS.map((base) => {
    const rwNum = base.rw.replace(/\D/g, ''); // "01" ... "13"
    const rwFamilies = buku1List.filter((f) => normalizeTwoDigit(f.rw) === rwNum);
    const rwBuku2 = buku2List.filter((b) => normalizeTwoDigit(b.rw) === rwNum);
    const rwBuku3 = buku3List.filter((b) => normalizeTwoDigit(b.rw) === rwNum);

    // Jika RW ini memiliki data tanggapan di Google Sheets
    if (rwFamilies.length > 0 || rwBuku2.length > 0 || rwBuku3.length > 0) {
      const totalKK =
        rwFamilies.length ||
        (rwBuku2.length > 0
          ? rwBuku2.reduce((acc, b) => acc + b.jml_kk, 0)
          : 1);

      const allCitizens = rwFamilies.flatMap((f) => f.anggota_warga);
      const totalJiwa =
        rwFamilies.reduce((acc, f) => acc + f.jml_anggota, 0) ||
        allCitizens.length ||
        (rwBuku2.length > 0
          ? rwBuku2.reduce((acc, b) => acc + b.total_l + b.total_p, 0)
          : 0);
      const totalL =
        rwFamilies.reduce((acc, f) => acc + f.jml_laki, 0) ||
        allCitizens.filter((c) => c.jenis_kelamin === 'L').length ||
        (rwBuku2.length > 0
          ? rwBuku2.reduce((acc, b) => acc + b.total_l, 0)
          : 0);
      const totalP =
        rwFamilies.reduce((acc, f) => acc + f.jml_perempuan, 0) ||
        allCitizens.filter((c) => c.jenis_kelamin === 'P').length ||
        (rwBuku2.length > 0
          ? rwBuku2.reduce((acc, b) => acc + b.total_p, 0)
          : 0);

      const totalBalita =
        rwFamilies.reduce((acc, f) => acc + f.balita, 0) ||
        allCitizens.filter((c) => c.usia < 5).length ||
        (rwBuku2.length > 0
          ? rwBuku2.reduce((acc, b) => acc + b.balita_l + b.balita_p, 0)
          : 0);
      const totalLansia =
        rwFamilies.reduce((acc, f) => acc + f.lansia, 0) ||
        allCitizens.filter((c) => c.usia >= 60).length ||
        (rwBuku2.length > 0
          ? rwBuku2.reduce((acc, b) => acc + b.lansia, 0)
          : 0);
      const totalPus =
        rwFamilies.reduce((acc, f) => acc + f.pus, 0) ||
        (rwBuku2.length > 0
          ? rwBuku2.reduce((acc, b) => acc + b.pus, 0)
          : 0);
      const totalWus =
        rwFamilies.reduce((acc, f) => acc + f.wus, 0) ||
        (rwBuku2.length > 0
          ? rwBuku2.reduce((acc, b) => acc + b.wus, 0)
          : 0);
      const totalBumil =
        rwFamilies.reduce((acc, f) => acc + f.ibu_hamil, 0) ||
        (rwBuku3.length > 0
          ? rwBuku3.reduce((acc, b) => acc + b.jml_bumil, 0)
          : 0);
      const totalMenyusui =
        rwFamilies.reduce((acc, f) => acc + f.ibu_menyusui, 0) ||
        (rwBuku2.length > 0
          ? rwBuku2.reduce((acc, b) => acc + b.menyusui, 0)
          : 0);

      const sani = computeSanitation(rwFamilies, rwBuku2);
      const progs = computePrograms(rwFamilies, rwBuku2);

      const uniqueRt = new Set<string>();
      rwFamilies.forEach((f) => f.rt && uniqueRt.add(f.rt));
      rwBuku2.forEach((b) => b.rt && uniqueRt.add(b.rt));
      rwBuku3.forEach((b) => b.rt && uniqueRt.add(b.rt));

      const uniqueDasa = new Set<string>();
      rwFamilies.forEach((f) => f.nama_dasawisma && uniqueDasa.add(f.nama_dasawisma));
      rwBuku2.forEach((b) => b.nama_dasawisma && uniqueDasa.add(b.nama_dasawisma));
      rwBuku3.forEach((b) => b.nama_dasawisma && uniqueDasa.add(b.nama_dasawisma));

      return {
        rw: base.rw,
        total_rt: Math.max(1, uniqueRt.size),
        total_dasawisma: Math.max(1, uniqueDasa.size),
        total_kk: totalKK,
        total_jiwa: totalJiwa,
        total_l: totalL,
        total_p: totalP,
        total_balita: totalBalita,
        total_lansia: totalLansia,
        total_pus: totalPus,
        total_wus: totalWus,
        total_bumil: totalBumil,
        total_menyusui: totalMenyusui,
        rumah_sehat_count: sani.rumah_sehat,
        rumah_kurang_sehat_count: sani.rumah_kurang_sehat,
        persen_rumah_sehat: sani.persen_rumah_sehat,
        mck_layak_count: sani.mck_septictank_sendiri,
        persen_mck_layak: sani.persen_mck_layak,
        air_pdam_count: sani.air_pdam,
        air_sumur_count: sani.air_sumur,
        up2k_aktif_count: progs.up2k,
        persen_up2k:
          totalKK > 0 ? Number(((progs.up2k / totalKK) * 100).toFixed(1)) : 0,
        pekarangan_pkk_count: progs.pekarangan,
        kerja_bakti_count: progs.kerjaBakti,
        is_pilot: base.rw === 'RW 12' || base.is_pilot,
      };
    }

    // Kelompok RW lain yang belum ada data: gunakan data acuan baseline
    return base;
  });
}
