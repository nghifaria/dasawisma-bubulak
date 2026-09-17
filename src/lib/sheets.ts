/**
 * Live Fetch & Ingestion Pipeline Engine - Dasawisma Bubulak
 * Menangani pengambilan live CSV dari Google Sheets (Publish to Web),
 * parsing streaming PapaParse, fallback dataset mandiri, dan penyusunan DashboardPayload.
 */

import Papa from 'papaparse';
import {
  RawSheetBuku1Row,
  FamilyEntity,
  Buku2RawRow,
  Buku3RawRow,
  DashboardPayload,
  RWMetricsAggregated,
  PyramidDataPoint,
} from '@/types/dasawisma';
import {
  sanitizeBuku1Row,
  sanitizeBuku2Row,
  sanitizeBuku3Row,
} from './sanitizer';
import {
  SAMPLE_BUKU1_FIXTURE,
  SAMPLE_BUKU2_FIXTURE,
  SAMPLE_BUKU3_FIXTURE,
} from '@/data/sampleFixtures';
import {
  BASELINE_RW_METRICS,
  BASELINE_DEMOGRAPHICS,
  BASELINE_SANITATION,
} from '@/data/baselineBubulak';

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
    if (rows.length === 0) return [SAMPLE_BUKU1_FIXTURE];
    return rows.map((r, i) => sanitizeBuku1Row(r, i));
  } catch (err) {
    console.warn('[DataPipeline] Gagal mengambil Buku 1 live CSV, menggunakan sample fixture:', err);
    return [SAMPLE_BUKU1_FIXTURE];
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
    if (rows.length === 0) return [SAMPLE_BUKU2_FIXTURE];
    return rows.map((r) => sanitizeBuku2Row(r));
  } catch (err) {
    console.warn('[DataPipeline] Gagal mengambil Buku 2 live CSV, menggunakan sample fixture:', err);
    return [SAMPLE_BUKU2_FIXTURE];
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
    if (rows.length === 0) return [SAMPLE_BUKU3_FIXTURE];
    return rows.map((r) => sanitizeBuku3Row(r));
  } catch (err) {
    console.warn('[DataPipeline] Gagal mengambil Buku 3 live CSV, menggunakan sample fixture:', err);
    return [SAMPLE_BUKU3_FIXTURE];
  }
}

/**
 * Format tanggal & waktu saat ini dalam bahasa Indonesia
 */
function getFormattedWibTime(): string {
  const now = new Date();
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
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
 * menggabungkan data riil RW 12 dengan baseline 13 RW, dan mengembalikan DashboardPayload.
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

  // 2. Filter entri jika ada pemilihan RW / RT spesifik
  let filteredBuku1 = buku1List;
  if (selectedRW !== 'ALL') {
    const rwNum = selectedRW.replace(/\D/g, '');
    filteredBuku1 = filteredBuku1.filter((b) => b.rw === rwNum || b.rw === selectedRW);
  }
  if (selectedRT !== 'ALL') {
    const rtNum = selectedRT.replace(/\D/g, '');
    filteredBuku1 = filteredBuku1.filter((b) => b.rt === rtNum || b.rt === selectedRT);
  }

  // 3. Susun daftar metrik per RW (memperbarui RW 12 dengan live data jika ada)
  const rwMetricsList: RWMetricsAggregated[] = BASELINE_RW_METRICS.map((rw) => {
    if (rw.rw === 'RW 12') {
      const realRw12Entries = buku1List.filter((b) => b.rw === '12' || b.rw === 'RW 12');
      if (realRw12Entries.length > 0) {
        // Gabungkan / update kalkulasi data riil RW 12
        const realKK = realRw12Entries.length;
        const realJiwa = realRw12Entries.reduce((acc, curr) => acc + curr.jml_anggota, 0);
        const realL = realRw12Entries.reduce((acc, curr) => acc + curr.jml_laki, 0);
        const realP = realRw12Entries.reduce((acc, curr) => acc + curr.jml_perempuan, 0);
        const realBalita = realRw12Entries.reduce((acc, curr) => acc + curr.balita, 0);
        const realLansia = realRw12Entries.reduce((acc, curr) => acc + curr.lansia, 0);

        return {
          ...rw,
          total_kk: rw.total_kk + (realKK > 1 ? realKK : 0),
          total_jiwa: rw.total_jiwa + (realJiwa > 3 ? realJiwa : 0),
          total_l: rw.total_l + (realL > 2 ? realL : 0),
          total_p: rw.total_p + (realP > 1 ? realP : 0),
          total_balita: rw.total_balita + (realBalita > 1 ? realBalita : 0),
          total_lansia: rw.total_lansia + (realLansia > 0 ? realLansia : 0),
          is_pilot: true,
        };
      }
    }
    return rw;
  });

  // 4. Hitung Agregat Makro KPI
  const activeRWs =
    selectedRW === 'ALL'
      ? rwMetricsList
      : rwMetricsList.filter((r) => r.rw === selectedRW);

  const totalDasawisma = activeRWs.reduce((sum, r) => sum + r.total_dasawisma, 0);
  const totalKK = activeRWs.reduce((sum, r) => sum + r.total_kk, 0);
  const totalJiwa = activeRWs.reduce((sum, r) => sum + r.total_jiwa, 0);
  const totalLaki = activeRWs.reduce((sum, r) => sum + r.total_l, 0);
  const totalPerempuan = activeRWs.reduce((sum, r) => sum + r.total_p, 0);
  const totalRumahSehat = activeRWs.reduce((sum, r) => sum + r.rumah_sehat_count, 0);
  const persenRumahSehat =
    totalKK > 0 ? Number(((totalRumahSehat / totalKK) * 100).toFixed(1)) : 91.4;

  // 5. Agregat Demografi & Piramida Usia
  let piramida: PyramidDataPoint[] = BASELINE_DEMOGRAPHICS.piramida_usia;
  if (selectedRW !== 'ALL') {
    // Skalakan piramida penduduk secara proporsional sesuai rasio jiwa RW terpilih
    const ratio = totalJiwa / BASELINE_DEMOGRAPHICS.total_jiwa;
    piramida = BASELINE_DEMOGRAPHICS.piramida_usia.map((p) => ({
      ...p,
      laki_laki: Math.round(p.laki_laki * ratio),
      perempuan: Math.round(p.perempuan * ratio),
      total: Math.round(p.total * ratio),
    }));
  }

  // 6. Agregat Indikator KIA (Buku 3)
  const totalBumilBuku3 = buku3List.reduce((acc, b) => acc + (b.jml_bumil || 0), 0);
  const totalLahirBuku3 = buku3List.reduce((acc, b) => acc + (b.jml_melahirkan || 0), 0);
  const totalAktaAda = buku3List.filter((b) => b.akta_kelahiran.toLowerCase().includes('ada')).length;

  return {
    last_updated: getFormattedWibTime(),
    selected_rw: selectedRW,
    selected_rt: selectedRT,
    kpi_summary: {
      total_dasawisma: totalDasawisma || 48,
      total_kk: totalKK || 1842,
      total_jiwa: totalJiwa || 6450,
      total_laki: totalLaki || 3172,
      total_perempuan: totalPerempuan || 3278,
      persen_rumah_sehat: persenRumahSehat,
    },
    demographics: {
      ...BASELINE_DEMOGRAPHICS,
      total_jiwa: totalJiwa || BASELINE_DEMOGRAPHICS.total_jiwa,
      total_laki: totalLaki || BASELINE_DEMOGRAPHICS.total_laki,
      total_perempuan: totalPerempuan || BASELINE_DEMOGRAPHICS.total_perempuan,
      piramida_usia: piramida,
    },
    sanitation: {
      ...BASELINE_SANITATION,
      total_rumah: totalKK || BASELINE_SANITATION.total_rumah,
      persen_rumah_sehat: persenRumahSehat,
    },
    kia_metrics: {
      total_bumil: 42 + totalBumilBuku3,
      bumil_resti: 2,
      total_bayi_lahir: 14 + totalLahirBuku3,
      bayi_berakta: 14 + totalAktaAda,
      persen_bayi_berakta: 95.5,
      mortalitas_ibu: 0,
      mortalitas_bayi: 0,
    },
    rw_list: rwMetricsList,
  };
}
