# Product Requirements Document (PRD)
## Sistem Informasi & Dashboard Eksekutif Pendataan Dasawisma TP-PKK Kelurahan Bubulak

- **ID Dokumen:** PRD-PKK-BBL-2026-01
- **Versi:** 2.0.0 (Enterprise-Ready & Accessibility Standard)
- **Status:** Approved for Execution
- **Penyusun:** Solo Technical Lead / Developer
- **Target Rilis & Paparan:** Sabtu, 19 September 2026 (09:00 WIB)
- **Stakeholder Kunci:** Ibu Lurah Bubulak, Ketua TP-PKK Kelurahan Bubulak, Kader Dasawisma RW 01–13, Dosen Pembimbing

---

## 1. Latar Belakang & Visi Produk

### 1.1 Konteks Wilayah & Masalah Operasional
Kelurahan Bubulak terletak di Kecamatan Bogor Barat, Kota Bogor, menaungi **13 Rukun Warga (RW)** dan **50 Rukun Tetangga (RT)** dengan dinamika demografi padat serta variasi karakteristik hunian semi-urban. 

Dalam operasional berkala Tim Penggerak PKK, pendataan dasawisma (satuan 10–20 rumah tangga) menjadi ujung tombak pemantauan kesejahteraan keluarga dan kesehatan lingkungan. Selama bertahun-tahun, proses pendataan menggunakan 3 instrumen lembar buku fisik manual berjenjang:
1. **Buku 1:** Catatan Data Keluarga & Warga.
2. **Buku 2:** Rekapitulasi Catatan Data & Kegiatan Warga Kelompok Dasawisma.
3. **Buku 3:** Rekapitulasi Data Ibu Hamil, Melahirkan, Nifas, Bayi Lahir/Meninggal.

Proses manual tersebut memiliki kelemahan sistemik yang mendesak untuk diperbaiki:
- **Tingginya Human Error:** Penghitungan agregasi bertingkat (Dasawisma &rarr; RT &rarr; RW &rarr; Kelurahan) rawan salah jumlah dan inkonsisten antar-buku.
- **Siklus Pelaporan Lambat:** Memerlukan waktu 3 hingga 5 minggu untuk menyusun rekapitulasi kelurahan, sehingga data kehilangan momentum kontekstual untuk respons cepat kesehatan.
- **Ketiadaan Visibilitas Eksekutif:** Ibu Lurah dan jajaran pengurus PKK tidak memiliki akses dasbor visual yang dapat dibuka seketika dari smartphone saat evaluasi mingguan.

### 1.2 Visi & Transformasi Digital
Sistem Informasi & Dashboard Dasawisma Bubulak mentransformasikan rantai pasok data manual menjadi ekosistem digital terintegrasi:
- **Pengumpulan Terarah:** Menggunakan 3 instrumen Google Forms yang dirampingkan dan dioptimalkan bagi kader lapangan.
- **Pilot Project Valid:** Uji coba percontohan dipusatkan di **RW 12** (mencakup kelompok Dasawisma Kenanga A, Edelweis, dsb.) sebelum roll-out serentak ke 12 RW lainnya.
- **Penyajian Data Berstandar Eksekutif:** Platform web responsif yang menyajikan indikator demografi, sanitasi, stunting/KIA, dan kegiatan pemberdayaan dalam visualisasi interaktif dengan waktu muat instan (< 1.2 detik).

---

## 2. Struktur Wilayah Administratif & Hierarki Relasi

Sistem mengadopsi hierarki wilayah ketat yang mencerminkan struktur ketatanegaraan lokal:

```
Pemerintah Kota Bogor
└── Kecamatan Bogor Barat
    └── Kelurahan Bubulak (Kode Wilayah: 32.71.04.1004)
        ├── RW 01 (RT 01 - RT 04)
        ├── RW 02 (RT 01 - RT 04)
        ├── ...
        ├── RW 12 (RT 01 - RT 05)  <-- WILAYAH PILOT PROJECT (Kenanga A, Edelweis)
        └── RW 13 (RT 01 - RT 03)
            └── Kelompok Dasawisma (10-20 Rumah Tangga per Dasawisma)
                └── Kepala Rumah Tangga (KRT) / Kepala Keluarga (KK)
                    └── Individu Warga (Anggota Keluarga 1 s/d 6)
```

---

## 3. Persona Pengguna & Kebutuhan Aksesibilitas

| Persona | Profil & Konteks Penggunaan | Kebutuhan Utama | Target Aksesibilitas & UI |
|---|---|---|---|
| **Ibu Lurah & Ketua TP-PKK (Executive)** | Mengakses sistem via smartphone/tablet saat rapat koordinasi, inspeksi lapangan, atau evaluasi anggaran. | Ringkasan makro sekali pandang (KPI total jiwa, KK, rumah sehat, bumil), perbandingan disparitas antar-RW, dan status sanitasi kritis. | *Clean Vertical Flow*, kartu metrik kontras tinggi, navigasi satu jempol (*thumb-friendly*), no clutter. |
| **Kader Dasawisma & Ketua RW (Field Operator)** | Mengisi Google Forms di lapangan, memantau kemajuan data wilayahnya di HP spesifikasi rendah. | Konfirmasi bahwa data RT/RW-nya sudah tercatat, pengecekan keabsahan input warga, tanpa hambatan login akun. | Area sentuh (*touch target*) &ge; 44x44px, teks terbaca jelas di bawah terik matahari (WCAG 2.1 AA rasio &ge; 4.5:1). |
| **Pihak Kecamatan & Penilai Evaluasi (Stakeholder)** | Mengevaluasi ketercapaian 10 Program Pokok PKK dan program sanitasi/stunting Kota Bogor. | Bukti statistik akurat, metodologi agregasi transparan, audit trail waktu pembaruan data, kepatuhan privasi warga. | Tabel data detail dengan ekspor/filter, indikator metodologi, penyamaran NIK (*data masking*). |

---

## 4. Tiga Pilar Fungsional Instrumen Pendataan

### 4.1 Pilar 1: Buku 1 – Data Keluarga, Anggota & Fasilitas Rumah
- **Unit Data:** Level Rumah Tangga / Kepala Rumah Tangga (KRT).
- **Atribut Pokok & Wilayah:**
  - Wilayah: RW (01–13), RT (01–50), Nama Dasawisma.
  - Identitas: Nomor Kartu Keluarga (16 digit), Nama KRT, No. Telepon Pengisi.
- **Agregat Sasaran Khusus Keluarga:**
  - Jumlah total anggota keluarga (Laki-laki & Perempuan).
  - Kelompok rentan: Balita, Pasangan Usia Subur (PUS), Wanita Usia Subur (WUS), Buta Baca/Tulis/Hitung (3 Buta), Ibu Hamil, Ibu Menyusui, Lansia.
- **Looping Terstruktur Individu Anggota (1 s/d 6 Orang):**
  - Nama lengkap, NIK (dimasking otomatis), Hubungan Keluarga, Status Perkawinan, Jenis Kelamin, Tanggal Lahir / Usia, Pendidikan Terakhir, Pekerjaan Utama.
- **8 Indikator Sanitasi & Lingkungan Fisik Rumah:**
  1. Kriteria Rumah (Sehat / Kurang Sehat).
  2. Ketersediaan Jamban Keluarga / MCK Septic Tank (Milik Sendiri / Menumpang / Tidak Ada).
  3. Jumlah Jamban Keluarga.
  4. Sumber Air Bersih (PDAM / Sumur Terlindung / Mata Air / Lainnya).
  5. Tempat Pembuangan Sampah (Tertutup / Terbuka / Tidak Ada).
  6. Saluran Pembuangan Air Limbah / SPAL (Ada Tertutup / Terbuka / Tidak Ada).
  7. Makanan Pokok Keluarga (Beras / Non-Beras).
  8. Keikutsertaan JKN/BPJS dan program Kesling.

### 4.2 Pilar 2: Buku 2 – Rekapitulasi Catatan Data & Kegiatan Warga
- **Unit Data:** Rekapitulasi per KK / Tingkat Kelompok Dasawisma.
- **Demografi & Sasaran Program:**
  - Total KK, Total Jiwa (L/P), Balita (L/P), PUS, WUS, Bumil, Menyusui, Lansia, 3 Buta, Warga Berkebutuhan Khusus / Disabilitas.
- **Partisipasi Program Unggulan PKK:**
  - Keaktifan dalam Usaha Peningkatan Pendapatan Keluarga (UP2K).
  - Pemanfaatan Tanah Pekarangan (HATINYA PKK: Tanaman Obat Keluarga / Toga, Sayuran, Kolam Ikan).
  - Industri Rumah Tangga (IRT) binaan PKK.
  - Partisipasi Gotong Royong / Kerja Bakti Lingkungan.

### 4.3 Pilar 3: Buku 3 – Data KIA & Catatan Khusus
- **Unit Data:** Pencatatan berbasis peristiwa / kejadian (*event-based surveillance*).
- **Peristiwa Kesehatan Ibu:**
  - Ibu Hamil: Identitas ibu, nama suami, usia kehamilan, risiko kehamilan (Resti/KEK).
  - Ibu Melahirkan & Nifas: Status persalinan, penolong nakes, kondisi nifas.
- **Peristiwa Kelahiran & Bayi:**
  - Nama bayi, jenis kelamin, tanggal lahir, status bayi hidup/meninggal.
  - Kepemilikan Akta Kelahiran resmi Disdukcapil (Ada / Tidak Ada).
- **Mortalitas (Catatan Duka):**
  - Kematian Ibu (Hamil/Melahirkan/Nifas) dan Kematian Bayi/Balita (Nama, jenis kelamin, tanggal, penyebab kematian).

---

## 5. Non-Functional Requirements (NFR) Berstandar Industri

### 5.1 Aksesibilitas (WCAG 2.1 Level AA)
- **Kontras Warna Teks:** Rasio kontras minimal 4.5:1 untuk teks normal dan 3.0:1 untuk teks besar/badge (`text-slate-900` pada latar `#ffffff` / `#f8fafc` mencapai rasio 14:1).
- **Area Sentuh Mobile:** Seluruh kontrol interaktif (dropdown wilayah, tab, tombol sinkronisasi) wajib memenuhi target sentuh minimal `44x44 CSS pixels`.
- **Dukungan Screen Reader:** Setiap grafik Recharts wajib dilengkapi ringkasan teks semantik (`aria-label` dan teks naratif tersembunyi `sr-only`).

### 5.2 Performa & Kecepatan Muat
- **Target Metrik Core Web Vitals:**
  - Largest Contentful Paint (LCP) < 1.2 detik pada jaringan 4G seluler.
  - First Input Delay (FID) / Interaction to Next Paint (INP) < 100 ms.
  - Cumulative Layout Shift (CLS) = 0 (bebas lompatan layout).
- **Skor Google Lighthouse:** Ditargetkan &ge; 90 pada kategori Performance, Accessibility, dan Best Practices pada profil emulasi perangkat mobile.
- **Beban Perangkat:** Dilarang menggunakan animasi CSS loop tak terbatas dan efek `backdrop-filter: blur()` berlebih yang menguras CPU/GPU smartphone kader.

### 5.3 Resiliensi & Penanganan Anomali Data
- **Toleransi Data Kosong (*Null Safety*):** Parser wajib menoleransi entri form yang tidak diisi, string kosong (`""`), atau karakter whitespace tanpa menyebabkan crash/White Screen of Death.
- **Masking Data Pribadi (UU Perlindungan Data Pribadi):** NIK 16 digit dan nomor HP tidak pernah disajikan mentah di publik; wajib dipotong format `3271************`.
- **Ketersediaan Offline/Fallback:** Sistem dilengkapi baseline dataset simulasi realistis untuk 13 RW sehingga antarmuka tetap beroperasi optimal saat koneksi ke Google Sheets mengalami limitasi jaringan.
