/**
 * Master Data Kepengurusan Kelompok Dasawisma
 * Berdasarkan Surat Keputusan Lurah Bubulak Nomor: 147/BBLK/Juni 2026
 * tentang Pengangkatan Pengurus Kelompok Dasawisma TP-PKK Kelurahan Bubulak,
 * Kecamatan Bogor Barat, Kota Bogor
 * 100% Terdata Lengkap untuk Seluruh 13 RW (RW 01 s/d RW 13)
 */

export interface DasawismaKader {
  namaKelompok: string;
  namaKader: string;
}

export interface RTPengurus {
  rt: string;
  ketuaRT: string;
  kelompokList: DasawismaKader[];
}

export interface RWSKPengurus {
  rw: string;
  namaCluster?: string;
  ketuaRW: string;
  status: 'Terverifikasi SK';
  rtList: RTPengurus[];
}

export const SK_PENGURUS_INFO = {
  nomorSK: '147/BBLK/Juni 2026',
  tentang: 'Pengangkatan Pengurus Kelompok Dasawisma TP-PKK Kelurahan Bubulak',
  kelurahan: 'Kelurahan Bubulak',
  kecamatan: 'Kecamatan Bogor Barat',
  kota: 'Kota Bogor',
  tanggalPenetapan: 'Juni 2026',
  pejabat: 'Lurah Bubulak',
};

export const MASTER_SK_PENGURUS: RWSKPengurus[] = [
  // RW 01 - Cluster Teratai
  {
    rw: 'RW 01',
    namaCluster: 'Teratai',
    ketuaRW: 'Ny. Muflihah',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Ny. Siti Khodijah',
        kelompokList: [
          { namaKelompok: 'Teratai 1.1', namaKader: 'Ny. Siti Martini' },
          { namaKelompok: 'Teratai 1.2', namaKader: 'Ny. Nasih' },
          { namaKelompok: 'Teratai 1.3', namaKader: 'Ny. Tri Wahyuni' },
          { namaKelompok: 'Teratai 1.4', namaKader: 'Ny. Rustini' },
          { namaKelompok: 'Teratai 1.5', namaKader: 'Ny. Gita' },
          { namaKelompok: 'Teratai 1.6', namaKader: 'Ny. Pipin Sapinah' },
          { namaKelompok: 'Teratai 1.7', namaKader: 'Ny. Yanti' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Ny. Livia',
        kelompokList: [
          { namaKelompok: 'Teratai 2.1', namaKader: 'Ny. Yeni Supiati' },
          { namaKelompok: 'Teratai 2.2', namaKader: 'Ny. Ela Nurlaela' },
          { namaKelompok: 'Teratai 2.3', namaKader: 'Ny. Heni Prihatini' },
          { namaKelompok: 'Teratai 2.4', namaKader: 'Ny. Nenti' },
          { namaKelompok: 'Teratai 2.5', namaKader: 'Ny. Eet' },
          { namaKelompok: 'Teratai 2.6', namaKader: 'Ny. Dedeh Sumarni' },
          { namaKelompok: 'Teratai 2.7', namaKader: 'Ny. Salbiah' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Ny. Mamah',
        kelompokList: [
          { namaKelompok: 'Teratai 3.1', namaKader: 'Ny. Mintarsih' },
          { namaKelompok: 'Teratai 3.2', namaKader: 'Ny. Ade Rohayani' },
          { namaKelompok: 'Teratai 3.3', namaKader: 'Ny. Sri' },
          { namaKelompok: 'Teratai 3.4', namaKader: 'Ny. Aesih' },
          { namaKelompok: 'Teratai 3.5', namaKader: 'Ny. Endah' },
        ],
      },
      {
        rt: 'RT 04',
        ketuaRT: 'Ny. Risdawati',
        kelompokList: [
          { namaKelompok: 'Teratai 4.1', namaKader: 'Ny. Dasih Purwasih' },
          { namaKelompok: 'Teratai 4.2', namaKader: 'Ny. Tika Kartika' },
          { namaKelompok: 'Teratai 4.3', namaKader: 'Ny. Iis Sugianto' },
          { namaKelompok: 'Teratai 4.4', namaKader: 'Ny. Nurmala' },
          { namaKelompok: 'Teratai 4.5', namaKader: 'Ny. Kholiah' },
        ],
      },
      {
        rt: 'RT 05',
        ketuaRT: 'Ny. Novianti',
        kelompokList: [
          { namaKelompok: 'Teratai 5.1', namaKader: 'Ny. Hj. Maemunah' },
          { namaKelompok: 'Teratai 5.2', namaKader: 'Ny. Anis' },
          { namaKelompok: 'Teratai 5.3', namaKader: 'Ny. Kasmiani' },
        ],
      },
    ],
  },

  // RW 02 - Cluster Melati
  {
    rw: 'RW 02',
    namaCluster: 'Melati 1.1 - 4.3',
    ketuaRW: 'Nurhasanah',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Nining',
        kelompokList: [
          { namaKelompok: 'Melati 1.1', namaKader: 'Epon Rohayati' },
          { namaKelompok: 'Melati 1.2', namaKader: 'Ani Astuti' },
          { namaKelompok: 'Melati 1.3', namaKader: 'Nurma' },
          { namaKelompok: 'Melati 1.4', namaKader: 'Sunarsih' },
          { namaKelompok: 'Melati 1.5', namaKader: 'Wati' },
          { namaKelompok: 'Melati 1.6', namaKader: 'Asunah' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Rustini',
        kelompokList: [
          { namaKelompok: 'Melati 2.1', namaKader: 'Nurfatimah' },
          { namaKelompok: 'Melati 2.2', namaKader: 'Wiwi' },
          { namaKelompok: 'Melati 2.3', namaKader: 'Junaenah' },
          { namaKelompok: 'Melati 2.4', namaKader: 'Sukaesih' },
          { namaKelompok: 'Melati 2.5', namaKader: 'Romayasari' },
          { namaKelompok: 'Melati 2.6', namaKader: 'Priyatun' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Rohati',
        kelompokList: [
          { namaKelompok: 'Melati 3.1', namaKader: 'Nina' },
          { namaKelompok: 'Melati 3.2', namaKader: 'Dewi Agustina' },
          { namaKelompok: 'Melati 3.3', namaKader: 'Nani Turiman' },
          { namaKelompok: 'Melati 3.4', namaKader: 'Rosita' },
          { namaKelompok: 'Melati 3.5', namaKader: 'Sulis' },
          { namaKelompok: 'Melati 3.6', namaKader: 'Gina Farhan' },
          { namaKelompok: 'Melati 3.7', namaKader: 'Irma Susanti' },
        ],
      },
      {
        rt: 'RT 04',
        ketuaRT: 'Tina Priyantin',
        kelompokList: [
          { namaKelompok: 'Melati 4.1', namaKader: 'Itoh Hapiroh' },
          { namaKelompok: 'Melati 4.2', namaKader: 'Mimin' },
          { namaKelompok: 'Melati 4.3', namaKader: 'Epon Marlina' },
        ],
      },
    ],
  },

  // RW 03 - Cluster Flamboyan
  {
    rw: 'RW 03',
    namaCluster: 'Flamboyan',
    ketuaRW: 'Sri Welas',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Yoyoh',
        kelompokList: [
          { namaKelompok: 'Flamboyan 1.1', namaKader: 'Hani Susinta' },
          { namaKelompok: 'Flamboyan 1.2', namaKader: 'Feni Desiana' },
          { namaKelompok: 'Flamboyan 1.3', namaKader: 'Imas Oktaviani' },
          { namaKelompok: 'Flamboyan 1.4', namaKader: 'Amanah' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Lili Sri Gusyulianti',
        kelompokList: [
          { namaKelompok: 'Flamboyan 2.1', namaKader: 'Wiwi Nurlaela' },
          { namaKelompok: 'Flamboyan 2.2', namaKader: 'Mae Seharsih' },
          { namaKelompok: 'Flamboyan 2.3', namaKader: 'Agus Maemunah' },
          { namaKelompok: 'Flamboyan 2.4', namaKader: 'Maemunah' },
          { namaKelompok: 'Flamboyan 2.5', namaKader: 'Ulandari' },
          { namaKelompok: 'Flamboyan 2.6', namaKader: 'Oom' },
          { namaKelompok: 'Flamboyan 2.7', namaKader: 'Encu Djuharsih' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Ani',
        kelompokList: [
          { namaKelompok: 'Flamboyan 3.1', namaKader: 'Zahra Nurmala' },
          { namaKelompok: 'Flamboyan 3.2', namaKader: 'Mega Silviani' },
          { namaKelompok: 'Flamboyan 3.3', namaKader: 'Siti Rohaeni' },
          { namaKelompok: 'Flamboyan 3.4', namaKader: 'Ratna Ririatna' },
          { namaKelompok: 'Flamboyan 3.5', namaKader: 'Rika Andriani' },
        ],
      },
      {
        rt: 'RT 04',
        ketuaRT: 'Suarna',
        kelompokList: [
          { namaKelompok: 'Flamboyan 4.1', namaKader: 'Mona Herdiana' },
          { namaKelompok: 'Flamboyan 4.2', namaKader: 'Hilda Apriani' },
          { namaKelompok: 'Flamboyan 4.3', namaKader: 'Wulandari' },
          { namaKelompok: 'Flamboyan 4.4', namaKader: 'Aisyah' },
        ],
      },
      {
        rt: 'RT 05',
        ketuaRT: 'Elsa Septia Damayanti',
        kelompokList: [
          { namaKelompok: 'Flamboyan 5.1', namaKader: 'Yulianti' },
          { namaKelompok: 'Flamboyan 5.2', namaKader: 'Siti Salbiah' },
          { namaKelompok: 'Flamboyan 5.3', namaKader: 'Fitrianti' },
          { namaKelompok: 'Flamboyan 5.4', namaKader: 'Apri Fani' },
          { namaKelompok: 'Flamboyan 5.5', namaKader: 'Nurdiah' },
        ],
      },
    ],
  },

  // RW 04 - Cluster Kenanga
  {
    rw: 'RW 04',
    namaCluster: 'Kenanga 1.1 - 5.4',
    ketuaRW: 'Nengsih Komala',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Tuti Hermawati',
        kelompokList: [
          { namaKelompok: 'Kenanga 1.1', namaKader: 'Novianti' },
          { namaKelompok: 'Kenanga 1.2', namaKader: 'Yohana' },
          { namaKelompok: 'Kenanga 1.3', namaKader: 'Dede Harni' },
          { namaKelompok: 'Kenanga 1.4', namaKader: 'Siti Aisyah' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Indah Agustin',
        kelompokList: [
          { namaKelompok: 'Kenanga 2.1', namaKader: 'Fitri Aryanti' },
          { namaKelompok: 'Kenanga 2.2', namaKader: 'Yanti' },
          { namaKelompok: 'Kenanga 2.3', namaKader: 'Euis Lisnawati' },
          { namaKelompok: 'Kenanga 2.4', namaKader: 'Cucun Cunayah' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Rini',
        kelompokList: [
          { namaKelompok: 'Kenanga 3.1', namaKader: 'Maryati' },
          { namaKelompok: 'Kenanga 3.2', namaKader: 'Nining Yuningsih' },
          { namaKelompok: 'Kenanga 3.3', namaKader: 'Kustiawati' },
          { namaKelompok: 'Kenanga 3.4', namaKader: 'Arnita' },
        ],
      },
      {
        rt: 'RT 04',
        ketuaRT: 'Sri Yulianti',
        kelompokList: [
          { namaKelompok: 'Kenanga 4.1', namaKader: 'Linda' },
          { namaKelompok: 'Kenanga 4.2', namaKader: 'Latifah' },
          { namaKelompok: 'Kenanga 4.3', namaKader: 'Kiki' },
          { namaKelompok: 'Kenanga 4.4', namaKader: 'Melawati' },
          { namaKelompok: 'Kenanga 4.5', namaKader: 'Meytri' },
        ],
      },
      {
        rt: 'RT 05',
        ketuaRT: 'Maya Maesaroh',
        kelompokList: [
          { namaKelompok: 'Kenanga 5.1', namaKader: 'Siti Nuraeni' },
          { namaKelompok: 'Kenanga 5.2', namaKader: 'Elli Prihatin' },
          { namaKelompok: 'Kenanga 5.3', namaKader: 'Siti Rahmawati' },
          { namaKelompok: 'Kenanga 5.4', namaKader: 'Oon Widianingsih' },
        ],
      },
    ],
  },

  // RW 05 - Cluster Mawar
  {
    rw: 'RW 05',
    namaCluster: 'Mawar 1.1 - 3.4',
    ketuaRW: 'Wiwin Lisnawati',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Siti Kholifah',
        kelompokList: [
          { namaKelompok: 'Mawar 1.1', namaKader: 'Yoyoh Maesaroh' },
          { namaKelompok: 'Mawar 1.2', namaKader: 'Puput' },
          { namaKelompok: 'Mawar 1.3', namaKader: 'Selly Maryani' },
          { namaKelompok: 'Mawar 1.4', namaKader: 'Amelia Nur Alifah' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Santi Afiani',
        kelompokList: [
          { namaKelompok: 'Mawar 2.1', namaKader: 'Nurkholifah' },
          { namaKelompok: 'Mawar 2.2', namaKader: 'Anida' },
          { namaKelompok: 'Mawar 2.3', namaKader: 'Lena' },
          { namaKelompok: 'Mawar 2.4', namaKader: 'Ucih Haltika' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Maya Ismayanti',
        kelompokList: [
          { namaKelompok: 'Mawar 3.1', namaKader: 'Ida Farida' },
          { namaKelompok: 'Mawar 3.2', namaKader: 'Asfariyah' },
          { namaKelompok: 'Mawar 3.3', namaKader: 'Enah Marlena' },
          { namaKelompok: 'Mawar 3.4', namaKader: 'Windasari' },
        ],
      },
    ],
  },

  // RW 06 - Cluster Cempaka
  {
    rw: 'RW 06',
    namaCluster: 'Cempaka 1.1 - 2.3',
    ketuaRW: 'Neng Iti',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Acih Sumiati',
        kelompokList: [
          { namaKelompok: 'Cempaka 1.1', namaKader: 'Rukoyah' },
          { namaKelompok: 'Cempaka 1.2', namaKader: 'Rizki' },
          { namaKelompok: 'Cempaka 1.3', namaKader: 'Sri Rahayu' },
          { namaKelompok: 'Cempaka 1.4', namaKader: 'Eva' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Khoeriyah',
        kelompokList: [
          { namaKelompok: 'Cempaka 2.1', namaKader: 'Wiwi Alfatunisa' },
          { namaKelompok: 'Cempaka 2.2', namaKader: 'Rosdiana' },
          { namaKelompok: 'Cempaka 2.3', namaKader: 'Ratna Dewi' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Yeni Imayanti',
        kelompokList: [
          { namaKelompok: 'Cempaka 3.1', namaKader: 'Nita' },
          { namaKelompok: 'Cempaka 3.2', namaKader: 'Yuni Saraswati' },
          { namaKelompok: 'Cempaka 3.3', namaKader: 'Nurmala' },
        ],
      },
    ],
  },

  // RW 07 - Cluster Nusa Indah
  {
    rw: 'RW 07',
    namaCluster: 'Nusa Indah',
    ketuaRW: 'Siti Aminah',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Elih Sugirti',
        kelompokList: [
          { namaKelompok: 'Nusa Indah 1.1', namaKader: 'Meliyanti' },
          { namaKelompok: 'Nusa Indah 1.2', namaKader: 'Resti' },
          { namaKelompok: 'Nusa Indah 1.3', namaKader: 'Nida' },
          { namaKelompok: 'Nusa Indah 1.4', namaKader: 'Lilis Dayanti' },
          { namaKelompok: 'Nusa Indah 1.5', namaKader: 'Beben' },
          { namaKelompok: 'Nusa Indah 1.6', namaKader: 'Silvia' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Eles Bayuni',
        kelompokList: [
          { namaKelompok: 'Nusa Indah 2.1', namaKader: 'Salbiyah' },
          { namaKelompok: 'Nusa Indah 2.2', namaKader: 'Sadiyah' },
          { namaKelompok: 'Nusa Indah 2.3', namaKader: 'Dewi' },
          { namaKelompok: 'Nusa Indah 2.4', namaKader: 'Nurhikmah' },
          { namaKelompok: 'Nusa Indah 2.5', namaKader: 'Waltiah' },
          { namaKelompok: 'Nusa Indah 2.6', namaKader: 'Himsatun' },
          { namaKelompok: 'Nusa Indah 2.7', namaKader: 'Siti Masitoh' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Rini',
        kelompokList: [
          { namaKelompok: 'Nusa Indah 3.1', namaKader: 'Santiaati' },
          { namaKelompok: 'Nusa Indah 3.2', namaKader: 'Safitri' },
          { namaKelompok: 'Nusa Indah 3.3', namaKader: 'Nuraeni' },
          { namaKelompok: 'Nusa Indah 3.4', namaKader: 'Elis' },
          { namaKelompok: 'Nusa Indah 3.5', namaKader: 'Mulyani' },
          { namaKelompok: 'Nusa Indah 3.6', namaKader: 'Neng Yuyu' },
        ],
      },
      {
        rt: 'RT 04',
        ketuaRT: 'Silva',
        kelompokList: [
          { namaKelompok: 'Nusa Indah 4.1', namaKader: 'Siti Hadijah' },
          { namaKelompok: 'Nusa Indah 4.2', namaKader: 'Dini Ardiani' },
          { namaKelompok: 'Nusa Indah 4.3', namaKader: 'Iryani' },
          { namaKelompok: 'Nusa Indah 4.4', namaKader: 'Zuraedah' },
          { namaKelompok: 'Nusa Indah 4.5', namaKader: 'Sumarni' },
          { namaKelompok: 'Nusa Indah 4.6', namaKader: 'Sugiarti' },
        ],
      },
    ],
  },

  // RW 08 - Cluster Anggrek Bulan
  {
    rw: 'RW 08',
    namaCluster: 'Anggrek Bulan 1.1 - 3.5',
    ketuaRW: 'Yeyen Herawati',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Iis',
        kelompokList: [
          { namaKelompok: 'Anggrek Bulan 1.1', namaKader: 'Erna' },
          { namaKelompok: 'Anggrek Bulan 1.2', namaKader: 'Leni' },
          { namaKelompok: 'Anggrek Bulan 1.3', namaKader: 'Epah Kholifah' },
          { namaKelompok: 'Anggrek Bulan 1.4', namaKader: 'Aisyah' },
          { namaKelompok: 'Anggrek Bulan 1.5', namaKader: 'Siti Lisa' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Ida Farida',
        kelompokList: [
          { namaKelompok: 'Anggrek Bulan 2.1', namaKader: 'Rika' },
          { namaKelompok: 'Anggrek Bulan 2.2', namaKader: 'Kiki' },
          { namaKelompok: 'Anggrek Bulan 2.3', namaKader: 'Nenah' },
          { namaKelompok: 'Anggrek Bulan 2.4', namaKader: 'Yuli' },
          { namaKelompok: 'Anggrek Bulan 2.5', namaKader: 'Murni' },
          { namaKelompok: 'Anggrek Bulan 2.6', namaKader: 'Nurmilah' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Yeti Nurhayati',
        kelompokList: [
          { namaKelompok: 'Anggrek Bulan 3.1', namaKader: 'Siti Maesaroh' },
          { namaKelompok: 'Anggrek Bulan 3.2', namaKader: 'Maesaroh' },
          { namaKelompok: 'Anggrek Bulan 3.3', namaKader: 'Saemah' },
          { namaKelompok: 'Anggrek Bulan 3.4', namaKader: 'Iip Kholifah' },
          { namaKelompok: 'Anggrek Bulan 3.5', namaKader: 'Sarifah' },
        ],
      },
    ],
  },

  // RW 09 - Cluster Dahlia
  {
    rw: 'RW 09',
    namaCluster: 'Dahlia 1.1 - 4.5',
    ketuaRW: 'Ratna Novianti',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Desi',
        kelompokList: [
          { namaKelompok: 'Dahlia 1.1', namaKader: 'Putri' },
          { namaKelompok: 'Dahlia 1.2', namaKader: 'Wida' },
          { namaKelompok: 'Dahlia 1.3', namaKader: 'Encah' },
          { namaKelompok: 'Dahlia 1.4', namaKader: 'Fitri' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Aah Solihat',
        kelompokList: [
          { namaKelompok: 'Dahlia 2.1', namaKader: 'Dian' },
          { namaKelompok: 'Dahlia 2.2', namaKader: 'Aisyah' },
          { namaKelompok: 'Dahlia 2.3', namaKader: 'Lilis' },
          { namaKelompok: 'Dahlia 2.4', namaKader: 'Tiara' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Tita',
        kelompokList: [
          { namaKelompok: 'Dahlia 3.1', namaKader: 'Kaila' },
          { namaKelompok: 'Dahlia 3.2', namaKader: 'Reni' },
          { namaKelompok: 'Dahlia 3.3', namaKader: 'Dini' },
          { namaKelompok: 'Dahlia 3.4', namaKader: 'Eneng' },
        ],
      },
      {
        rt: 'RT 04',
        ketuaRT: 'Mawar',
        kelompokList: [
          { namaKelompok: 'Dahlia 4.1', namaKader: 'Nurlaelah' },
          { namaKelompok: 'Dahlia 4.2', namaKader: 'Mirnasari' },
          { namaKelompok: 'Dahlia 4.3', namaKader: 'Meiliawati' },
          { namaKelompok: 'Dahlia 4.4', namaKader: 'Saewaliah' },
          { namaKelompok: 'Dahlia 4.5', namaKader: 'Anisa' },
        ],
      },
    ],
  },

  // RW 10 - Cluster Anggrek Merah
  {
    rw: 'RW 10',
    namaCluster: 'Anggrek Merah',
    ketuaRW: 'Dewi Anggraeni',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Nova Yamin',
        kelompokList: [
          { namaKelompok: 'Anggrek Merah 1.1', namaKader: 'Dama' },
          { namaKelompok: 'Anggrek Merah 1.2', namaKader: 'Dewi Samsul' },
          { namaKelompok: 'Anggrek Merah 1.3', namaKader: 'Sarmini' },
          { namaKelompok: 'Anggrek Merah 1.4', namaKader: 'Rohaja' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Citra Yuliana',
        kelompokList: [
          { namaKelompok: 'Anggrek Merah 2.1', namaKader: 'Nurwati' },
          { namaKelompok: 'Anggrek Merah 2.2', namaKader: 'Putria' },
          { namaKelompok: 'Anggrek Merah 2.3', namaKader: 'Parwiti' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Ny. Rina Marlina',
        kelompokList: [
          { namaKelompok: 'Anggrek Merah 3.1', namaKader: 'Rusmiati' },
          { namaKelompok: 'Anggrek Merah 3.2', namaKader: 'Yuliana' },
          { namaKelompok: 'Anggrek Merah 3.3', namaKader: 'Mimin' },
          { namaKelompok: 'Anggrek Merah 3.4', namaKader: 'Siti Aminah' },
          { namaKelompok: 'Anggrek Merah 3.5', namaKader: 'Neneng' },
        ],
      },
      {
        rt: 'RT 04',
        ketuaRT: 'Ny. Endang',
        kelompokList: [
          { namaKelompok: 'Anggrek Merah 4.1', namaKader: 'Wartini' },
          { namaKelompok: 'Anggrek Merah 4.2', namaKader: 'Sri' },
          { namaKelompok: 'Anggrek Merah 4.3', namaKader: 'Yati' },
          { namaKelompok: 'Anggrek Merah 4.4', namaKader: 'Eni' },
          { namaKelompok: 'Anggrek Merah 4.5', namaKader: 'Rina' },
        ],
      },
      {
        rt: 'RT 05',
        ketuaRT: 'Ny. Yulianingsih',
        kelompokList: [
          { namaKelompok: 'Anggrek Merah 5.1', namaKader: 'Titin' },
          { namaKelompok: 'Anggrek Merah 5.2', namaKader: 'Dedeh' },
          { namaKelompok: 'Anggrek Merah 5.3', namaKader: 'Nur' },
          { namaKelompok: 'Anggrek Merah 5.4', namaKader: 'Ani' },
          { namaKelompok: 'Anggrek Merah 5.5', namaKader: 'Iis' },
        ],
      },
    ],
  },

  // RW 11 - Cluster Bougenville
  {
    rw: 'RW 11',
    namaCluster: 'Bougenville 1.1 - 4.4',
    ketuaRW: 'Dede Siti Salma',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Darwati',
        kelompokList: [
          { namaKelompok: 'Bougenville 1.1', namaKader: 'Siti Masitoh' },
          { namaKelompok: 'Bougenville 1.2', namaKader: 'Lusiana' },
          { namaKelompok: 'Bougenville 1.3', namaKader: 'Husmiati' },
          { namaKelompok: 'Bougenville 1.4', namaKader: 'Yati' },
          { namaKelompok: 'Bougenville 1.5', namaKader: 'Hartati' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Yayan Suryani',
        kelompokList: [
          { namaKelompok: 'Bougenville 2.1', namaKader: 'Eva Haryani' },
          { namaKelompok: 'Bougenville 2.2', namaKader: 'Sri Haryati' },
          { namaKelompok: 'Bougenville 2.3', namaKader: 'Neneng Ratna Ningsih' },
          { namaKelompok: 'Bougenville 2.4', namaKader: 'Siti Julacha' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Nurul Hayati',
        kelompokList: [
          { namaKelompok: 'Bougenville 3.1', namaKader: 'Meti Sutini' },
          { namaKelompok: 'Bougenville 3.2', namaKader: 'Sri Haryati' },
        ],
      },
      {
        rt: 'RT 04',
        ketuaRT: 'Enyi Sumiati',
        kelompokList: [
          { namaKelompok: 'Bougenville 4.1', namaKader: 'Dea Alvionita' },
          { namaKelompok: 'Bougenville 4.2', namaKader: 'Yulianti' },
          { namaKelompok: 'Bougenville 4.3', namaKader: 'Lia Verawati' },
          { namaKelompok: 'Bougenville 4.4', namaKader: 'Erlin' },
        ],
      },
    ],
  },

  // RW 12 - Cluster Kenanga
  {
    rw: 'RW 12',
    namaCluster: 'Kenanga 1.1 - 3.5',
    ketuaRW: 'R. Sunarsih',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Yanti',
        kelompokList: [
          { namaKelompok: 'Kenanga 1.1', namaKader: 'Yati' },
          { namaKelompok: 'Kenanga 1.2', namaKader: 'Asmiati' },
          { namaKelompok: 'Kenanga 1.3', namaKader: 'Anita Sri Wahyuni' },
          { namaKelompok: 'Kenanga 1.4', namaKader: 'Yuningsih' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Ida Farida',
        kelompokList: [
          { namaKelompok: 'Kenanga 2.1', namaKader: 'Sri Maskah' },
          { namaKelompok: 'Kenanga 2.2', namaKader: 'Nia Aprilia' },
          { namaKelompok: 'Kenanga 2.3', namaKader: 'Yulia' },
          { namaKelompok: 'Kenanga 2.4', namaKader: 'Rini Susanti' },
          { namaKelompok: 'Kenanga 2.5', namaKader: 'Mimi' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Tri Subuantini',
        kelompokList: [
          { namaKelompok: 'Kenanga 3.1', namaKader: 'Dian Marta' },
          { namaKelompok: 'Kenanga 3.2', namaKader: 'Suparti' },
          { namaKelompok: 'Kenanga 3.3', namaKader: 'Rika Maelani' },
          { namaKelompok: 'Kenanga 3.4', namaKader: 'Sally Angelia' },
          { namaKelompok: 'Kenanga 3.5', namaKader: 'Puji Laksanawati' },
        ],
      },
    ],
  },

  // RW 13 - Cluster Multi-Bunga (Kenanga, Anggrek, Teratai, Tulip)
  {
    rw: 'RW 13',
    namaCluster: 'Kenanga, Anggrek, Teratai, Tulip',
    ketuaRW: 'Evi Sari Priantini',
    status: 'Terverifikasi SK',
    rtList: [
      {
        rt: 'RT 01',
        ketuaRT: 'Mira Laksmi Indiasa',
        kelompokList: [
          { namaKelompok: 'Kenanga 1.1', namaKader: 'Triana Palupi' },
          { namaKelompok: 'Kenanga 1.2', namaKader: 'Wahyuni' },
          { namaKelompok: 'Kenanga 1.3', namaKader: 'Gina Gistindar' },
        ],
      },
      {
        rt: 'RT 02',
        ketuaRT: 'Susi Gantini',
        kelompokList: [
          { namaKelompok: 'Anggrek 2.1', namaKader: 'Alphina' },
          { namaKelompok: 'Anggrek 2.2', namaKader: 'Sarah' },
          { namaKelompok: 'Anggrek 2.3', namaKader: 'Ratna' },
        ],
      },
      {
        rt: 'RT 03',
        ketuaRT: 'Nina',
        kelompokList: [
          { namaKelompok: 'Teratai 3.1', namaKader: 'Eva' },
          { namaKelompok: 'Teratai 3.2', namaKader: 'Siti Rosmanah' },
          { namaKelompok: 'Teratai 3.3', namaKader: 'Diah Wulandari' },
        ],
      },
      {
        rt: 'RT 04',
        ketuaRT: 'Selly',
        kelompokList: [
          { namaKelompok: 'Tulip 4.1', namaKader: 'Etih' },
          { namaKelompok: 'Tulip 4.2', namaKader: 'Penti Lusiana' },
          { namaKelompok: 'Tulip 4.3', namaKader: 'Apriyeni' },
        ],
      },
    ],
  },
];

// Helper kalkulasi statistik direktori SK
export function getSKDirectoryStats() {
  const verifiedRW = MASTER_SK_PENGURUS.filter((r) => r.status === 'Terverifikasi SK');
  const totalVerifiedRW = verifiedRW.length;
  const totalRT = verifiedRW.reduce((sum, r) => sum + r.rtList.length, 0);
  const totalDasawisma = verifiedRW.reduce(
    (sum, r) => sum + r.rtList.reduce((s2, rt) => s2 + rt.kelompokList.length, 0),
    0
  );
  // Total kader = jumlah Ketua RW + jumlah Ketua RT + jumlah Kader Dasawisma
  const totalKader = totalVerifiedRW + totalRT + totalDasawisma;

  return {
    totalRW: MASTER_SK_PENGURUS.length,
    totalVerifiedRW,
    totalRT,
    totalDasawisma,
    totalKader,
  };
}
