# UI & Charts Specification
## Design System, Accessibility Standards & Visual Hierarchy – Dasawisma Bubulak

- **ID Dokumen:** UI-PKK-BBL-2026-04
- **Versi:** 2.0.0 (Enterprise Taste-Skill & WCAG 2.1 AA Standard)
- **Status:** Approved for Execution
- **Pustaka Visual:** Recharts 3.x, Lucide React, Tailwind CSS

---

## 1. Fondasi Desain & Taste-Skill Guardrails

Dashboard Dasawisma Bubulak mengimplementasikan tata visual berwibawa khas instansi kepemerintahan daerah, menghindari tampilan generik (*anti-slop*), dan mengutamakan kenyamanan membaca dalam waktu lama.

### 1.1 Color Tokens & Contrast Validation
| Token Nama | Nilai Hex | Tailwind Class | Rasio Kontras pada `#ffffff` | Fungsi & Penerapan |
|---|---|---|---|---|
| **PKK Primary** | `#059669` | `bg-emerald-600` | 4.8:1 (AA) | Warna identitas utama PKK, tombol aksi, border kartu aktif. |
| **PKK Dark** | `#047857` | `bg-emerald-700` | 6.5:1 (AAA) | State hover tombol primer, teks link penekanan. |
| **PKK Surface** | `#ecfdf5` | `bg-emerald-50` | N/A (Latar) | Latar belakang badge status, kartu highlight wilayah pilot RW 12. |
| **Gender Male** | `#2563eb` | `bg-blue-600` | 5.2:1 (AA) | Batang Piramida Pria & indikator rasio laki-laki. |
| **Gender Female** | `#e11d48` | `bg-rose-600` | 4.9:1 (AA) | Batang Piramida Wanita & indikator sasaran ibu/anak. |
| **Canvas Background** | `#f8fafc` | `bg-slate-50` | N/A (Dasar) | Menghindari silau putih murni pada layar smartphone kader. |
| **Heading Text** | `#0f172a` | `text-slate-900` | 15.2:1 (AAA) | Angka KPI besar, judul seksi utama. |
| **Body Text** | `#334155` | `text-slate-700` | 9.1:1 (AAA) | Teks penjelasan, label sumbu grafik, tabel data. |
| **Muted Text** | `#64748b` | `text-slate-500` | 4.6:1 (AA) | Keterangan unit, timestamp waktu sinkronisasi. |
| **Card Border** | `#e2e8f0` | `border-slate-200` | N/A | Garis pemisah tegas tanpa efek bayangan berlebihan. |

### 1.2 Aturan Baku Anti-Slop
1. **Dilarang Gradien Ungu AI:** Tidak menggunakan gradien sintetis ungu/fuchsia yang tidak memiliki konteks kultural lokal Kota Bogor.
2. **Dilarang Bento Grid Padat:** Struktur layout adalah **Clean Vertical Flow** dengan jarak vertikal lega (`space-y-8 md:space-y-12`) agar pengguna smartphone tidak mengalami kelelahan kognitif (*cognitive overload*).
3. **Eliminasi Heavy GPU Blur:** Dilarang menggunakan CSS `backdrop-blur-xl` yang memicu frame drop pada ponsel Android kelas entri. Gunakan warna solid dengan opacity terukur (`bg-white/95 border border-slate-200`).
4. **Touch Target Standard:** Seluruh tombol, link tab, dan item dropdown wajib memiliki area sentuh fisik minimal `44x44 CSS pixels` (`min-h-[44px] min-w-[44px]`).

---

## 2. Struktur 8 Seksi Vertikal Beranda

```
┌────────────────────────────────────────────────────────────────────────┐
│ SEKSI 1: Header Banner Resmi, Penanda Waktu & Tombol Sinkronisasi      │
├────────────────────────────────────────────────────────────────────────┤
│ SEKSI 2: 4 Kartu Metrik KPI Makro (Dasawisma, KK, Jiwa, Sanitasi)      │
├────────────────────────────────────────────────────────────────────────┤
│ SEKSI 3: Sticky Global Filter Bar (Pilihan RW 01–13, RT, Tombol Reset) │
├────────────────────────────────────────────────────────────────────────┤
│ SEKSI 4: Grafik Komparasi Metrik Antar-RW (Grouped Bar Recharts)       │
├────────────────────────────────────────────────────────────────────────┤
│ SEKSI 5: Demografi: Piramida Usia Simetris & Pendidikan/Pekerjaan      │
├────────────────────────────────────────────────────────────────────────┤
│ SEKSI 6: Indikator Sanitasi Lingkungan & Partisipasi Program PKK       │
├────────────────────────────────────────────────────────────────────────┤
│ SEKSI 7: Pemantauan Kesehatan Ibu & Anak (KIA Buku 3)                  │
├────────────────────────────────────────────────────────────────────────┤
│ SEKSI 8: Tabel Rekapitulasi Wilayah (13 RW, Search & Grand Total)      │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Seksi 1: Header Banner Resmi & Status Sinkronisasi
- **Elemen Identitas:**
  - Kiri: Logo resmi TP-PKK dan Lambang Kota Bogor.
  - Teks: `"Tim Penggerak PKK Kelurahan Bubulak, Kecamatan Bogor Barat"`.
  - Judul: `"Sistem Informasi & Dashboard Dasawisma"`.
- **Panel Aksi Cepat:**
  - Status Waktu: Badge hijau `"Data Terkini: DD MMMM YYYY, HH:mm WIB"`.
  - Tombol Primer: `"Sinkronkan Data"` dengan ikon reload putar halus (`Lucide: RefreshCw`).

---

### Seksi 2: 4 Kartu Metrik KPI Makro
Disusun responsif: `grid-cols-2 lg:grid-cols-4 gap-4`:

1. **Card 1 – Kelompok Dasawisma Binaan:**
   - Ikon: `Users` (Emerald `#059669`).
   - Nilai: **48 Kelompok**.
   - Sub-label: Tersebar di 13 RW (Rata-rata 3–5 per RW).
2. **Card 2 – Total Kepala Keluarga (KK):**
   - Ikon: `Home` (Emerald `#059669`).
   - Nilai: **1.842 KK**.
   - Sub-label: 100% terdata basis Buku 1 & 2.
3. **Card 3 – Total Jiwa & Rasio Gender:**
   - Ikon: `UserCheck` (Slate `#334155`).
   - Nilai: **6.450 Jiwa**.
   - Komparasi Gender: Bar proporsional `49.2% Pria (#2563eb)` vs `50.8% Wanita (#e11d48)`.
4. **Card 4 – Cakupan Rumah Sehat & Sanitasi:**
   - Ikon: `ShieldCheck` (Emerald `#059669`).
   - Nilai: **91.4%**.
   - Sub-label: Memenuhi kriteria rumah sehat & MCK septic tank.

---

### Seksi 3: Sticky Global Filter Bar
- Menempel di bagian atas saat di-scroll (`sticky top-0 z-30 bg-white/95 border-y border-slate-200 py-3 shadow-xs`):
  - **Dropdown RW:** Pilihan `"Semua Wilayah (13 RW)"` default, dan opsi `"RW 01"` s/d `"RW 13"`. Diberi badge khusus `"Pilot Area"` pada opsi `"RW 12"`.
  - **Dropdown RT:** Dinamis sesuai RW terpilih (misal jika RW 12 dipilih &rarr; RT 01 s/d RT 05).
  - **Tombol Reset:** Mengembalikan ke agregat kelurahan dalam satu sentuhan.

---

### Seksi 4: Grafik Komparasi Metrik Antar-RW
- **Visualisasi:** Recharts `BarChart` horizontal grouped bars.
- **Interaktivitas Switch Mode:** Tab pemilih metrik: `[Total Jiwa]`, `[Kepala Keluarga]`, `[Rumah Sehat]`.
- **Sumbu Y:** Daftar nama RW (`RW 01` s/d `RW 13`).
- **Sumbu X:** Nilai absolut kuantitatif.
- **Highlight Visual:** Bar milik **RW 12** diberi outline tebal aksen Emerald `#059669` untuk menegaskan status pilot project.
- **Screen Reader:** Dilengkapi ringkasan naratif tersembunyi `sr-only` ("Grafik batang membandingkan jumlah jiwa di 13 RW Kelurahan Bubulak...").

---

### Seksi 5: Demografi & Piramida Usia Simetris
Dibagi 2 kolom sejajar pada desktop (`grid-cols-1 lg:grid-cols-2 gap-6`):

1. **Piramida Usia Penduduk Simetris (5-Year Bins):**
   - Sumbu tengah 0: Laki-laki di kiri (Nilai negatif pada sumbu X, diformat absolut pada tooltip, warna `#2563eb`), Perempuan di kanan (Warna `#e11d48`).
   - Rentang umur: `0-4`, `5-9`, `10-14`, ..., `60-64`, `65+`.
   - Tooltip: `"Kelompok Usia 25-29 Tahun: 240 Laki-laki (48.5%), 255 Perempuan (51.5%)"`.
2. **Distribusi Pendidikan & Pekerjaan Utama:**
   - Horizontal Bar Chart mini persentase:
     - Pendidikan: SD, SMP, SMA, Diploma/Sarjana, Belum Sekolah.
     - Pekerjaan: Ibu Rumah Tangga (IRT), Karyawan Swasta, Wiraswasta/Pedagang, Pelajar/Mahasiswa, ASN/PNS.

---

### Seksi 6: Indikator Sanitasi & Program PKK (Buku 1 & 2)
1. **5 Indikator Sanitasi Fisik (Progress Meter & Persentase):**
   - **Kriteria Rumah:** `91.4% Sehat` vs `8.6% Kurang Sehat`.
   - **MCK & Septic Tank:** `89.1% Milik Sendiri`, `8.4% Menumpang`, `2.5% Belum Layak`.
   - **Sumber Air Minum:** `74.5% PDAM`, `23.8% Sumur Terlindung`, `1.7% Lainnya`.
   - **Tempat Sampah:** `93.2% Tertutup/Terpilah`.
   - **Saluran SPAL:** `87.6% Memiliki Saluran Limbah Tertutup`.
2. **Partisipasi Program Unggulan PKK:**
   - 3 Kartu Progress Capaian:
     - **Keaktifan UP2K:** Persentase keluarga dengan usaha peningkatan pendapatan.
     - **Pekarangan HATINYA PKK:** Pemanfaatan tanaman obat keluarga (Toga) & lumbung hidup.
     - **Kerja Bakti Lingkungan:** Persentase partisipasi gotong royong warga bulanan.

---

### Seksi 7: Pemantauan Kesehatan Ibu & Anak (KIA Buku 3)
Grid 4 Kartu Pemantauan Terpadu:
- **Ibu Hamil:** Total terdata, jumlah Resti (Risiko Tinggi), kepesertaan ANC di Puskesmas/Posyandu.
- **Ibu Bersalin & Nifas:** Jumlah persalinan bulan berjalan, 100% tertolong Tenaga Kesehatan (Nakes).
- **Bayi & Kepemilikan Akta Kelahiran:** Total bayi lahir hidup dan persentase kepemilikan Akta Kelahiran resmi.
- **Mortalitas (Catatan Duka):** Indikator angka kematian ibu dan bayi dengan penanda khusus jika tercapai *Zero Mortality*.

---

### Seksi 8: Tabel Rekapitulasi Wilayah Lengkap
Tabel data responsif dengan pembungkus `overflow-x-auto`:

- **Fitur Kontrol:** Kotak pencarian instan nama RW/RT (`Quick Search`).
- **Kolom Tabel:**
  1. **Wilayah RW** (Teks tebal, penanda badge hijau pilot untuk RW 12).
  2. **Jml RT**
  3. **Jml Dasawisma**
  4. **Total KK**
  5. **Total Jiwa**
  6. **Rasio L / P**
  7. **% Rumah Sehat** (Dot hijau jika &ge; 90%).
  8. **% MCK Septic Tank**
  9. **% Partisipasi UP2K**
- **Baris Grand Total:**
  - Baris penutup paling bawah dengan font tebal (`font-bold bg-slate-100 text-slate-900 border-t-2 border-slate-300`) merangkum akumulasi seluruh Kelurahan Bubulak.
- **Interaktivitas Baris:** Mengetuk baris RW langsung memicu filter dashboard ke RW bersangkutan.
