/**
 * Data Sanitizer & Normalization Engine - Dasawisma Bubulak
 * Menangani pembersihan data CSV Google Forms, normalisasi RT/RW,
 * safe-looping anggota keluarga 1-6 Buku 1, dan pencegahan error tipe data.
 */

import {
  RawSheetBuku1Row,
  FamilyEntity,
  CitizenEntity,
  Buku2RawRow,
  Buku3RawRow,
  calculateAgeFromBirthDate,
} from '@/types/dasawisma';

/**
 * Membersihkan nilai string mentah (trimming spasi, menghilangkan quote ganda)
 */
export function cleanString(val: unknown): string {
  if (val === null || val === undefined) return '';
  return String(val)
    .replace(/^["']|["']$/g, '')
    .trim();
}

/**
 * Mengonversi nilai mentah menjadi integer aman (fallback 0)
 */
export function safeInt(val: unknown, fallback = 0): number {
  if (val === null || val === undefined) return fallback;
  const cleaned = String(val).replace(/[^\d-]/g, '');
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Menstandarkan format nomor RT / RW menjadi string 2 digit (contoh: "2" -> "02", "12" -> "12")
 */
export function normalizeTwoDigit(val: unknown): string {
  const cleaned = cleanString(val).replace(/\D/g, '');
  if (!cleaned) return '01';
  if (cleaned.length > 2) {
    const num = parseInt(cleaned, 10);
    if (!isNaN(num) && num < 100) return String(num).padStart(2, '0');
    return '01';
  }
  return cleaned.padStart(2, '0');
}

/**
 * Mencari nilai dalam baris CSV berdasarkan kata kunci pada header kolom.
 * Berguna untuk menoleransi perubahan baris baru (\n) atau teks instruksi Google Forms.
 */
export function findRowValue(row: RawSheetBuku1Row, keywords: string[]): string {
  const entries = Object.entries(row);
  for (const [key, value] of entries) {
    const lowerKey = key.toLowerCase().replace(/\s+/g, ' ');
    const isMatch = keywords.every((kw) => {
      const lowerKw = kw.toLowerCase();
      if (lowerKw === 'rt' || lowerKw === 'rw') {
        const regex = new RegExp(`\\b${lowerKw}\\b`, 'i');
        return regex.test(lowerKey);
      }
      return lowerKey.includes(lowerKw);
    });
    if (isMatch && value !== undefined && value !== null) {
      return cleanString(value);
    }
  }
  return '';
}

/**
 * Normalisasi dan Safe Looping Anggota Warga 1 s/d 6 (Buku 1)
 */
export function extractAnggotaWarga(row: RawSheetBuku1Row, noKk: string): CitizenEntity[] {
  const anggotaList: CitizenEntity[] = [];

  for (let i = 1; i <= 6; i++) {
    // Cari nama anggota ke-i
    const namaKeywords = i === 1 ? ['nama anggota 1'] : [`nama anggota ${i}`];
    const nama = findRowValue(row, namaKeywords);

    // Jika kolom nama kosong atau tanda strip, lewati
    if (!nama || nama === '-' || nama.length < 2) {
      continue;
    }

    // Ekstraksi atribut anggota i
    // Catatan: Header Google Forms untuk i >= 2 biasanya memiliki sufiks '_1', '_2', dst.
    const statusKelKeywords = i === 1 ? ['status dalam keluarga'] : [`status dalam keluarga_${i - 1}`];
    let statusKeluarga = findRowValue(row, statusKelKeywords);
    if (!statusKeluarga) {
      statusKeluarga = findRowValue(row, ['status dalam keluarga']);
    }

    const statusKawinKeywords = i === 1 ? ['status dalam perkawinan'] : [`status dalam perkawinan_${i - 1}`];
    let statusKawin = findRowValue(row, statusKawinKeywords);
    if (!statusKawin) {
      statusKawin = findRowValue(row, ['status dalam perkawinan']);
    }

    const genderKeywords = i === 1 ? ['jenis kelamin'] : [`jenis kelamin_${i - 1}`];
    let genderRaw = findRowValue(row, genderKeywords);
    if (!genderRaw) {
      genderRaw = findRowValue(row, ['jenis kelamin']);
    }
    const jenisKelamin: 'L' | 'P' =
      genderRaw.toLowerCase().startsWith('p') ? 'P' : 'L';

    const tglLahirKeywords = i === 1 ? ['tanggal lahir'] : [`tanggal lahir_${i - 1}`];
    let tglLahir = findRowValue(row, tglLahirKeywords);
    if (!tglLahir) {
      tglLahir = findRowValue(row, ['tanggal lahir']);
    }

    const pendKeywords = i === 1 ? ['pendidikan terakhir'] : [`pendidikan terakhir_${i - 1}`];
    let pendidikan = findRowValue(row, pendKeywords);

    const pekerKeywords = i === 1 ? ['pekerjaan'] : [`pekerjaan_${i - 1}`];
    let pekerjaan = findRowValue(row, pekerKeywords);

    const usia = calculateAgeFromBirthDate(tglLahir);

    let resolvedPendidikan = pendidikan;
    if (!resolvedPendidikan) {
      resolvedPendidikan = usia < 6 ? 'Belum / Tidak Sekolah' : 'SMA/SMK';
    } else if (usia < 6 && resolvedPendidikan === 'SMA/SMK') {
      resolvedPendidikan = 'Belum / Tidak Sekolah';
    }

    let resolvedPekerjaan = pekerjaan;
    if (!resolvedPekerjaan) {
      resolvedPekerjaan = usia < 6 ? 'Belum / Tidak Bekerja' : 'Lainnya';
    }

    anggotaList.push({
      no_kk: noKk,
      urutan_anggota: i,
      nama,
      status_keluarga: statusKeluarga || (i === 1 ? 'Kepala Keluarga' : 'Anggota'),
      status_kawin: statusKawin || 'Kawin',
      jenis_kelamin: jenisKelamin,
      tanggal_lahir: tglLahir,
      usia,
      pendidikan: resolvedPendidikan,
      pekerjaan: resolvedPekerjaan,
    });
  }

  return anggotaList;
}

/**
 * Parser dan Sanitizer Baris Mentah CSV Buku 1 menjadi FamilyEntity
 */
export function sanitizeBuku1Row(row: RawSheetBuku1Row, index: number): FamilyEntity {
  const rawNoKk = findRowValue(row, ['nomor kartu keluarga']) || findRowValue(row, ['no. kk']);
  const noKk = cleanString(rawNoKk) || `32710400000000${index + 1}`;
  const rtRaw = findRowValue(row, ['rt (rukun tetangga)']) || findRowValue(row, ['rt']);
  const rwRaw = findRowValue(row, ['rw (rukun warga)']) || findRowValue(row, ['rw']);

  const anggotaWarga = extractAnggotaWarga(row, noKk);

  // Jika hitungan laki/perempuan di form kosong, hitung dari anggotaWarga
  const totalLakiFromAnggota = anggotaWarga.filter((a) => a.jenis_kelamin === 'L').length;
  const totalPerempuanFromAnggota = anggotaWarga.filter((a) => a.jenis_kelamin === 'P').length;

  return {
    id: index + 1,
    timestamp: cleanString(row['Timestamp']) || new Date().toISOString(),
    nama_pengisi: findRowValue(row, ['nama pengisi']),
    nama_dasawisma: findRowValue(row, ['nama dasa wisma']) || 'KENANGA',
    no_kk: noKk,
    rt: normalizeTwoDigit(rtRaw),
    rw: normalizeTwoDigit(rwRaw),
    nama_krt: findRowValue(row, ['nama kepala rumah tangga']) || 'Kepala Keluarga',
    jml_anggota: safeInt(findRowValue(row, ['jumlah anggota keluarga total']), anggotaWarga.length || 1),
    jml_laki: safeInt(findRowValue(row, ['jumlah laki-laki']), totalLakiFromAnggota),
    jml_perempuan: safeInt(findRowValue(row, ['jumlah perempuan']), totalPerempuanFromAnggota),
    balita: safeInt(findRowValue(row, ['balita'])),
    pus: safeInt(findRowValue(row, ['pus'])),
    wus: safeInt(findRowValue(row, ['wus'])),
    buta3: safeInt(findRowValue(row, ['3 buta'])),
    ibu_hamil: safeInt(findRowValue(row, ['ibu hamil'])),
    ibu_menyusui: safeInt(findRowValue(row, ['ibu menyusui'])),
    lansia: safeInt(findRowValue(row, ['lansia'])),
    makanan_pokok: findRowValue(row, ['makanan pokok']) || 'Beras',
    mck_septictank: findRowValue(row, ['sarana mck']) || 'Ya',
    jml_mck: safeInt(findRowValue(row, ['jumlah sarana mck']), 1),
    sumber_air: findRowValue(row, ['sumber air']) || 'PDAM',
    tempat_sampah: findRowValue(row, ['tempat pembuangan sampah']) || 'Ya',
    spal: findRowValue(row, ['spal']) || 'Ya',
    kriteria_rumah: findRowValue(row, ['kriteria rumah']) || 'Sehat',
    up2k: findRowValue(row, ['up2k']) || 'Tidak',
    kesling: findRowValue(row, ['kesehatan lingkungan']) || 'Tidak',
    catatan_tambahan: findRowValue(row, ['catatan anggota tambahan']),
    anggota_warga: anggotaWarga,
  };
}

/**
 * Parser dan Sanitizer Baris Mentah CSV Buku 2
 */
export function sanitizeBuku2Row(row: RawSheetBuku1Row): Buku2RawRow {
  const kegiatan = findRowValue(row, ['mengikuti kegiatan']);
  const rtRaw = findRowValue(row, ['rt (rukun tetangga)']) || findRowValue(row, ['rt']);
  const rwRaw = findRowValue(row, ['rw (rukun warga)']) || findRowValue(row, ['rw']);

  return {
    timestamp: cleanString(row['Timestamp']) || new Date().toISOString(),
    nama_pengisi: findRowValue(row, ['nama pengisi']),
    nama_dasawisma: findRowValue(row, ['nama dasa wisma']) || 'KENANGA',
    no_kk: findRowValue(row, ['no. kk']) || findRowValue(row, ['nomor kartu keluarga']),
    rt: normalizeTwoDigit(rtRaw),
    rw: normalizeTwoDigit(rwRaw),
    nama_krt: findRowValue(row, ['nama kepala rumah tangga']),
    jml_kk: safeInt(findRowValue(row, ['jumlah kk']), 1),
    total_l: safeInt(findRowValue(row, ['total laki-laki'])),
    total_p: safeInt(findRowValue(row, ['total perempuan'])),
    balita_l: safeInt(findRowValue(row, ['balita laki-laki'])),
    balita_p: safeInt(findRowValue(row, ['balita perempuan'])),
    pus: safeInt(findRowValue(row, ['pus'])),
    wus: safeInt(findRowValue(row, ['wus'])),
    bumil: safeInt(findRowValue(row, ['ibu hamil'])),
    menyusui: safeInt(findRowValue(row, ['ibu menyusui'])),
    lansia: safeInt(findRowValue(row, ['lansia'])),
    buta3: safeInt(findRowValue(row, ['3 buta'])),
    berkebutuhan_khusus: safeInt(findRowValue(row, ['berkebutuhan khusus'])),
    kriteria_rumah: findRowValue(row, ['hunian / rumah']) || 'Sehat',
    tempat_sampah: findRowValue(row, ['tempat pembuangan sampah']) || 'Ya',
    spal: findRowValue(row, ['spal']) || 'Ya',
    mck_septictank: findRowValue(row, ['sarana mck']) || 'Ya',
    sumber_air: findRowValue(row, ['sumber air']) || 'PDAM',
    makanan: findRowValue(row, ['makanan']) || 'Beras',
    kegiatan_up2k: kegiatan.toLowerCase().includes('up2k') ? 'Ya' : 'Tidak',
    kegiatan_pekarangan: kegiatan.toLowerCase().includes('pekarangan') ? 'Ya' : 'Tidak',
    kegiatan_irt: kegiatan.toLowerCase().includes('industri') ? 'Ya' : 'Tidak',
    kegiatan_kerjabakti: kegiatan.toLowerCase().includes('kerja bakti') ? 'Ya' : 'Tidak',
    keterangan: cleanString(row['Keterangan']),
  };
}

/**
 * Parser dan Sanitizer Baris Mentah CSV Buku 3
 */
export function sanitizeBuku3Row(row: RawSheetBuku1Row): Buku3RawRow {
  const rtRaw = findRowValue(row, ['rt (rukun tetangga)']) || findRowValue(row, ['rt']);
  const rwRaw = findRowValue(row, ['rw (rukun warga)']) || findRowValue(row, ['rw']);

  return {
    timestamp: cleanString(row['Timestamp']) || new Date().toISOString(),
    nama_pengisi: findRowValue(row, ['nama pengisi']),
    nama_dasawisma: findRowValue(row, ['nama dasa wisma']) || 'KENANGA',
    no_kk: findRowValue(row, ['no. kk']) || findRowValue(row, ['nomor kartu keluarga']),
    rt: normalizeTwoDigit(rtRaw),
    rw: normalizeTwoDigit(rwRaw),
    nama_krt: findRowValue(row, ['nama kepala rumah tangga']),
    nama_ibu: findRowValue(row, ['nama ibu']),
    nama_suami: findRowValue(row, ['nama suami']),
    status_ibu: findRowValue(row, ['status ibu']),
    nama_bayi: findRowValue(row, ['nama bayi']),
    jenis_kelamin_bayi: findRowValue(row, ['jenis kelamin']),
    tanggal_lahir_bayi: findRowValue(row, ['tanggal lahir']),
    akta_kelahiran: findRowValue(row, ['akta kelahiran']) || 'Ada',
    bayi_hidup: findRowValue(row, ['bayi masih hidup']) || 'Ya',
    kematian_nama: findRowValue(row, ['nama yang meninggal']),
    kematian_status: findRowValue(row, ['status yang meninggal']),
    kematian_gender: findRowValue(row, ['jenis kelamin_1']),
    kematian_tanggal: findRowValue(row, ['tanggal meninggal']),
    kematian_sebab: findRowValue(row, ['sebab meninggal']),
    jml_bumil: safeInt(findRowValue(row, ['jumlah ibu hamil'])),
    jml_melahirkan: safeInt(findRowValue(row, ['jumlah ibu melahirkan'])),
    jml_nifas: safeInt(findRowValue(row, ['jumlah ibu nifas'])),
    jml_meninggal: safeInt(findRowValue(row, ['jumlah ibu meninggal'])),
    keterangan: cleanString(row['Keterangan']),
  };
}
