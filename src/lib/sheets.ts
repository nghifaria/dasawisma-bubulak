/**
 * Live Fetch & Ingestion Pipeline Engine - Dasawisma Bubulak
 * Menangani pengambilan live CSV dari Google Sheets (Publish to Web),
 * parsing streaming PapaParse, agregasi murni data riil, dan penyusunan DashboardPayload.
 */

import Papa from 'papaparse';
import {
  RawSheetBuku1Row,
  FamilyEntity,
  Buku2RawRow,
  Buku3RawRow,
  DashboardPayload,
  RWMetricsAggregated,
} from '@/types/dasawisma';
import {
  sanitizeBuku1Row,
  sanitizeBuku2Row,
  sanitizeBuku3Row,
  normalizeTwoDigit,
} from './sanitizer';
import {
  aggregateRwList,
  computePyramid,
  computeEducationDistribution,
  computeJobDistribution,
  computeSanitation,
  computeKia,
} from './aggregator';

const DEFAULT_BUKU1_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQcRyarK4PiA4MCAn6l8NNjeLpZN1X8w6E34rO4f2GdLIO5IKfDjxGfJso5hh6Qs6N5ufYc4pCnMx71/pub?output=csv';

const DEFAULT_BUKU2_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR7cxwxaPXhW915yzkIHQZW8R0lxxPRWJdplCIscOXCUTnoVeq5p6vQuEqFQaYYel8iYIRWm3fde6h-/pub?output=csv';

const DEFAULT_BUKU3_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLlFGVLEtyl4IM8gpuG7TvYquaDS8QfZcgiNi1Vk0DFEM1bqC89AtK5wsr4X0mZ9iX_hejUcYnP2V_/pub?output=csv';

/**
 * Fetcher CSV teks mentah dari URL dengan batas waktu (Timeout 5 detik)
 */
async function fetchCsvWithTimeout(url: string, timeoutMs = 5000): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        Accept: 'text/csv; charset=utf-8',
      },
      next: { revalidate: 60 }, // Cache ISR 60 detik di Server Next.js
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    return text;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Mem-parse teks CSV mentah menjadi array objek menggunakan PapaParse
 */
function parseCsvToRows(csvText: string): RawSheetBuku1Row[] {
  if (!csvText || csvText.trim().length === 0) return [];

  const result = Papa.parse<RawSheetBuku1Row>(csvText, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (header: string) => header.trim(),
  });

  return result.data || [];
}

/**
 * Menarik dan mem-parse seluruh data Buku 1 (Keluarga & Anggota)
 */
export async function getBuku1Data(): Promise<FamilyEntity[]> {
  const url = process.env.SHEET_BUKU1_URL || DEFAULT_BUKU1_URL;
  try {
    const csv = await fetchCsvWithTimeout(url);
    const rows = parseCsvToRows(csv);
    return rows.map((r, i) => sanitizeBuku1Row(r, i));
  } catch (err) {
    console.warn('[DataPipeline] Gagal mengambil Buku 1 live CSV:', err);
    return [];
  }
}

/**
 * Menarik dan mem-parse seluruh data Buku 2 (Rekapitulasi Lingkungan)
 */
export async function getBuku2Data(): Promise<Buku2RawRow[]> {
  const url = process.env.SHEET_BUKU2_URL || DEFAULT_BUKU2_URL;
  try {
    const csv = await fetchCsvWithTimeout(url);
    const rows = parseCsvToRows(csv);
    return rows.map((r) => sanitizeBuku2Row(r));
  } catch (err) {
    console.warn('[DataPipeline] Gagal mengambil Buku 2 live CSV:', err);
    return [];
  }
}

/**
 * Menarik dan mem-parse seluruh data Buku 3 (KIA & Peristiwa)
 */
export async function getBuku3Data(): Promise<Buku3RawRow[]> {
  const url = process.env.SHEET_BUKU3_URL || DEFAULT_BUKU3_URL;
  try {
    const csv = await fetchCsvWithTimeout(url);
    const rows = parseCsvToRows(csv);
    return rows.map((r) => sanitizeBuku3Row(r));
  } catch (err) {
    console.warn('[DataPipeline] Gagal mengambil Buku 3 live CSV:', err);
    return [];
  }
}

/**
 * Format tanggal & waktu saat ini dalam bahasa Indonesia
 */
function getFormattedWibTime(): string {
  const now = new Date();
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const d = now.getDate().toString().padStart(2, '0');
  const m = months[now.getMonth()];
  const y = now.getFullYear();
  const h = now.getHours().toString().padStart(2, '0');
  const min = now.getMinutes().toString().padStart(2, '0');
  return `${d} ${m} ${y}, ${h}:${min} WIB`;
}

/**
 * Eksekutor Utama Pipeline: Mengambil data 3 buku secara paralel,
 * mengagregasi 100% data riil dari baris tanggapan aktual.
 */
export async function fetchDasawismaData(
  selectedRW = 'ALL',
  selectedRT = 'ALL'
): Promise<DashboardPayload> {
  // 1. Eksekusi penarikan paralel 3 Google Sheets
  const [buku1List, buku2List, buku3List] = await Promise.all([
    getBuku1Data(),
    getBuku2Data(),
    getBuku3Data(),
  ]);

  // 2. Agregasi dinamis 13 RW murni data riil (RW tanpa data = 0)
  const rwMetricsList: RWMetricsAggregated[] = aggregateRwList(
    buku1List,
    buku2List,
    buku3List
  );

  // 3. Filter data berdasarkan RW / RT jika dipilih
  let activeFamilies = buku1List;
  let activeBuku2 = buku2List;
  let activeBuku3 = buku3List;

  if (selectedRW !== 'ALL') {
    const rwNum = selectedRW.replace(/\D/g, '');
    activeFamilies = activeFamilies.filter((f) => normalizeTwoDigit(f.rw) === rwNum);
    activeBuku2 = activeBuku2.filter((b) => normalizeTwoDigit(b.rw) === rwNum);
    activeBuku3 = activeBuku3.filter((b) => normalizeTwoDigit(b.rw) === rwNum);
  }

  if (selectedRT !== 'ALL') {
    const rtNum = selectedRT.replace(/\D/g, '');
    activeFamilies = activeFamilies.filter((f) => normalizeTwoDigit(f.rt) === rtNum);
    activeBuku2 = activeBuku2.filter((b) => normalizeTwoDigit(b.rt) === rtNum);
    activeBuku3 = activeBuku3.filter((b) => normalizeTwoDigit(b.rt) === rtNum);
  }

  const activeRWs =
    selectedRW === 'ALL'
      ? rwMetricsList
      : rwMetricsList.filter((r) => r.rw === selectedRW);

  // 4. Hitung Agregat Makro KPI Murni
  const totalDasawisma = activeRWs.reduce((sum, r) => sum + r.total_dasawisma, 0);
  const totalKK = activeRWs.reduce((sum, r) => sum + r.total_kk, 0);
  const totalJiwa = activeRWs.reduce((sum, r) => sum + r.total_jiwa, 0);
  const totalLaki = activeRWs.reduce((sum, r) => sum + r.total_l, 0);
  const totalPerempuan = activeRWs.reduce((sum, r) => sum + r.total_p, 0);
  const totalRumahSehat = activeRWs.reduce((sum, r) => sum + r.rumah_sehat_count, 0);
  const persenRumahSehat =
    totalKK > 0 ? Number(((totalRumahSehat / totalKK) * 100).toFixed(1)) : 0;

  // 5. Demografi Murni dari CitizenEntity[]
  const activeCitizens = activeFamilies.flatMap((f) => f.anggota_warga);
  const piramida = computePyramid(activeCitizens);
  const eduDist = computeEducationDistribution(activeCitizens);
  const jobDist = computeJobDistribution(activeCitizens);

  // 6. Sanitasi & KIA Murni
  const sanitation = computeSanitation(activeFamilies, activeBuku2);
  const kiaMetrics = computeKia(activeBuku3, activeFamilies);

  return {
    last_updated: getFormattedWibTime(),
    selected_rw: selectedRW,
    selected_rt: selectedRT,
    kpi_summary: {
      total_dasawisma: totalDasawisma,
      total_kk: totalKK,
      total_jiwa: totalJiwa,
      total_laki: totalLaki,
      total_perempuan: totalPerempuan,
      persen_rumah_sehat: persenRumahSehat,
    },
    demographics: {
      total_jiwa: totalJiwa,
      total_laki: totalLaki,
      total_perempuan: totalPerempuan,
      rasio_gender_persen_laki:
        totalJiwa > 0 ? Number(((totalLaki / totalJiwa) * 100).toFixed(1)) : 0,
      rasio_gender_persen_perempuan:
        totalJiwa > 0 ? Number(((totalPerempuan / totalJiwa) * 100).toFixed(1)) : 0,
      total_balita: activeRWs.reduce((sum, r) => sum + r.total_balita, 0),
      total_lansia: activeRWs.reduce((sum, r) => sum + r.total_lansia, 0),
      total_pus: activeRWs.reduce((sum, r) => sum + r.total_pus, 0),
      total_wus: activeRWs.reduce((sum, r) => sum + r.total_wus, 0),
      total_buta3: activeFamilies.reduce((sum, f) => sum + f.buta3, 0),
      piramida_usia: piramida,
      distribusi_pendidikan: eduDist,
      distribusi_pekerjaan: jobDist,
    },
    sanitation,
    kia_metrics: kiaMetrics,
    rw_list: rwMetricsList,
    raw_families: buku1List,
    raw_buku2: buku2List,
    raw_buku3: buku3List,
  };
}
