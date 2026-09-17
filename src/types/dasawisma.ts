/**
 * Types & Strict Interfaces - Sistem Informasi Dasawisma TP-PKK Kelurahan Bubulak
 * Sesuai spesifikasi docs/03_DATA_MODEL_AND_ERD.md
 */

/**
 * Raw Row hasil parsing baris CSV Google Sheets Buku 1.
 */
export interface RawSheetBuku1Row {
  [key: string]: string | undefined;
}

/**
 * Entitas Individu Anggota Warga (hasil ekstraksi loop 1-6 Buku 1)
 */
export interface CitizenEntity {
  id?: number;
  buku1_id?: number;
  no_kk: string;
  urutan_anggota: number; // 1 s/d 6
  nama: string;
  status_keluarga: 'Kepala Keluarga' | 'Istri' | 'Anak' | 'Famili Lain' | string;
  status_kawin: 'Kawin' | 'Belum Kawin' | 'Cerai Hidup' | 'Cerai Mati' | string;
  jenis_kelamin: 'L' | 'P';
  tanggal_lahir?: string;
  usia: number;
  pendidikan: 'Tidak Sekolah' | 'SD' | 'SMP' | 'SMA' | 'D3' | 'S1' | 'S2' | string;
  pekerjaan: string;
}

/**
 * Entitas Tingkat Keluarga / Kepala Rumah Tangga (Buku 1)
 */
export interface FamilyEntity {
  id?: number;
  timestamp: string;
  nama_pengisi: string;
  nama_dasawisma: string;
  no_kk: string;
  rt: string;
  rw: string;
  nama_krt: string;
  jml_anggota: number;
  jml_laki: number;
  jml_perempuan: number;
  balita: number;
  pus: number;
  wus: number;
  buta3: number;
  ibu_hamil: number;
  ibu_menyusui: number;
  lansia: number;
  makanan_pokok: string;
  mck_septictank: string;
  jml_mck: number;
  sumber_air: string;
  tempat_sampah: string;
  spal: string;
  kriteria_rumah: 'Sehat' | 'Kurang Sehat' | string;
  up2k: string;
  kesling: string;
  catatan_tambahan?: string;
  anggota_warga: CitizenEntity[];
}

/**
 * Raw Row Buku 2: Rekapitulasi Kegiatan & Lingkungan
 */
export interface Buku2RawRow {
  timestamp: string;
  nama_pengisi: string;
  nama_dasawisma: string;
  no_kk: string;
  rt: string;
  rw: string;
  nama_krt: string;
  jml_kk: number;
  total_l: number;
  total_p: number;
  balita_l: number;
  balita_p: number;
  pus: number;
  wus: number;
  bumil: number;
  menyusui: number;
  lansia: number;
  buta3: number;
  berkebutuhan_khusus: number;
  kriteria_rumah: string;
  tempat_sampah: string;
  spal: string;
  mck_septictank: string;
  sumber_air: string;
  makanan: string;
  kegiatan_up2k: string;
  kegiatan_pekarangan: string;
  kegiatan_irt: string;
  kegiatan_kerjabakti: string;
  keterangan?: string;
}

/**
 * Raw Row Buku 3: Catatan Peristiwa KIA & Mortalitas
 */
export interface Buku3RawRow {
  timestamp: string;
  nama_pengisi: string;
  nama_dasawisma: string;
  no_kk: string;
  rt: string;
  rw: string;
  nama_krt: string;
  nama_ibu: string;
  nama_suami: string;
  status_ibu: string;
  nama_bayi: string;
  jenis_kelamin_bayi: string;
  tanggal_lahir_bayi: string;
  akta_kelahiran: string;
  bayi_hidup: string;
  kematian_nama?: string;
  kematian_status?: string;
  kematian_gender?: string;
  kematian_tanggal?: string;
  kematian_sebab?: string;
  jml_bumil: number;
  jml_melahirkan: number;
  jml_nifas: number;
  jml_meninggal: number;
  keterangan?: string;
}

/**
 * Metrik Sanitasi & Kelayakan Hunian Agregat
 */
export interface SanitationMetrics {
  total_rumah: number;
  rumah_sehat: number;
  rumah_kurang_sehat: number;
  persen_rumah_sehat: number;
  mck_septictank_sendiri: number;
  mck_menumpang: number;
  mck_tidak_ada: number;
  persen_mck_layak: number;
  air_pdam: number;
  air_sumur: number;
  air_lainnya: number;
  tempat_sampah_ada: number;
  spal_ada: number;
}

/**
 * Titik Data Piramida Usia Simetris (5-Year Age Bins)
 */
export interface PyramidDataPoint {
  age_group: '0-4' | '5-9' | '10-14' | '15-19' | '20-24' | '25-29' | '30-34' | '35-39' | '40-44' | '45-49' | '50-54' | '55-59' | '60-64' | '65+';
  laki_laki: number;
  perempuan: number;
  total: number;
}

/**
 * Ringkasan Demografi Komprehensif
 */
export interface DemographicSummary {
  total_jiwa: number;
  total_laki: number;
  total_perempuan: number;
  rasio_gender_persen_laki: number;
  rasio_gender_persen_perempuan: number;
  total_balita: number;
  total_lansia: number;
  total_pus: number;
  total_wus: number;
  total_buta3: number;
  piramida_usia: PyramidDataPoint[];
  distribusi_pendidikan: { label: string; count: number; percentage: number }[];
  distribusi_pekerjaan: { label: string; count: number; percentage: number }[];
}

/**
 * Baris Agregat Per Wilayah RW (13 RW)
 */
export interface RWMetricsAggregated {
  rw: string; // 'RW 01' .. 'RW 13'
  total_rt: number;
  total_dasawisma: number;
  total_kk: number;
  total_jiwa: number;
  total_l: number;
  total_p: number;
  total_balita: number;
  total_lansia: number;
  total_pus: number;
  total_wus: number;
  total_bumil: number;
  total_menyusui: number;
  rumah_sehat_count: number;
  rumah_kurang_sehat_count: number;
  persen_rumah_sehat: number;
  mck_layak_count: number;
  persen_mck_layak: number;
  air_pdam_count: number;
  air_sumur_count: number;
  up2k_aktif_count: number;
  persen_up2k: number;
  pekarangan_pkk_count: number;
  kerja_bakti_count: number;
  is_pilot?: boolean;
}

/**
 * Payload Data Komplet Dashboard Eksekutif
 */
export interface DashboardPayload {
  last_updated: string;
  selected_rw: string;
  selected_rt: string;
  kpi_summary: {
    total_dasawisma: number;
    total_kk: number;
    total_jiwa: number;
    total_laki: number;
    total_perempuan: number;
    persen_rumah_sehat: number;
  };
  demographics: DemographicSummary;
  sanitation: SanitationMetrics;
  kia_metrics: {
    total_bumil: number;
    bumil_resti: number;
    total_bayi_lahir: number;
    bayi_berakta: number;
    persen_bayi_berakta: number;
    mortalitas_ibu: number;
    mortalitas_bayi: number;
  };
  rw_list: RWMetricsAggregated[];
  raw_families?: FamilyEntity[];
  raw_buku2?: Buku2RawRow[];
  raw_buku3?: Buku3RawRow[];
}

// ==========================================
// HELPER FUNCTIONS & PRIVACY UTILITIES
// ==========================================

/**
 * Penyamaran Nomor Identitas (16 digit) sesuai standar UU PDP.
 * Contoh: '3271041508880001' -> '3271************'
 */
export function maskIdentifier(val: string | null | undefined): string {
  if (!val) return '-';
  const clean = val.replace(/\D/g, '');
  if (clean.length >= 8) {
    return `${clean.slice(0, 4)}${'*'.repeat(clean.length - 4)}`;
  }
  return '************';
}

/**
 * Menghitung usia dari string tanggal lahir (format 'YYYY-MM-DD', 'M/D/YYYY', atau 'DD/MM/YYYY').
 */
export function calculateAgeFromBirthDate(birthDateStr?: string, fallbackAge?: number): number {
  if (fallbackAge !== undefined && !isNaN(fallbackAge) && fallbackAge >= 0) {
    return Math.min(Math.floor(fallbackAge), 120);
  }
  if (!birthDateStr || typeof birthDateStr !== 'string' || birthDateStr.trim() === '') {
    return 0;
  }

  const trimmed = birthDateStr.trim();
  let birth: Date;

  if (trimmed.includes('/')) {
    const parts = trimmed.split('/');
    if (parts.length === 3) {
      const p0 = parseInt(parts[0], 10);
      const p1 = parseInt(parts[1], 10);
      const p2 = parseInt(parts[2], 10);
      // Deteksi jika M/D/YYYY vs DD/MM/YYYY
      if (p0 > 12) {
        // DD/MM/YYYY
        birth = new Date(p2, p1 - 1, p0);
      } else {
        // M/D/YYYY (format Google Form default)
        birth = new Date(p2, p0 - 1, p1);
      }
    } else {
      birth = new Date(trimmed);
    }
  } else {
    birth = new Date(trimmed);
  }

  if (isNaN(birth.getTime())) {
    return fallbackAge || 0;
  }

  const today = new Date('2026-09-17');
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return Math.max(0, Math.min(age, 120));
}

/**
 * Mengelompokkan angka usia ke dalam 14 kelompok umur 5 tahunan standar BPS / WHO.
 */
export function mapAgeTo5YearBin(age: number): PyramidDataPoint['age_group'] {
  if (age <= 4) return '0-4';
  if (age <= 9) return '5-9';
  if (age <= 14) return '10-14';
  if (age <= 19) return '15-19';
  if (age <= 24) return '20-24';
  if (age <= 29) return '25-29';
  if (age <= 34) return '30-34';
  if (age <= 39) return '35-39';
  if (age <= 44) return '40-44';
  if (age <= 49) return '45-49';
  if (age <= 54) return '50-54';
  if (age <= 59) return '55-59';
  if (age <= 64) return '60-64';
  return '65+';
}
