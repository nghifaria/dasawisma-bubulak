/**
 * Metadata Master Wilayah Administratif Kelurahan Bubulak
 * Kecamatan Bogor Barat, Kota Bogor
 * Berdasarkan SK Lurah Bubulak Nomor 147/BBLK/Juni 2026
 * tentang Pengangkatan Pengurus Kelompok Dasawisma TP-PKK Kelurahan Bubulak
 */

export interface RTInfo {
  id: string;      // Contoh: '01', '02'
  name: string;    // Contoh: 'RT 01'
  dasawismaCount: number;
}

export interface RWInfo {
  id: string;      // '01' .. '13'
  code: string;    // 'RW 01' .. 'RW 13'
  name: string;
  dasawismaTarget: number;
  keterangan?: string;
  isPilot?: boolean;
  rtList: RTInfo[];
}

export const KELURAHAN_INFO = {
  name: 'Kelurahan Bubulak',
  kecamatan: 'Kecamatan Bogor Barat',
  kota: 'Kota Bogor',
  provinsi: 'Jawa Barat',
  kodeWilayah: '32.71.04.1004',
  totalRW: 13,
  totalRT: 52,
  totalDasawisma: 242,
  skLurah: 'SK Lurah Bubulak No. 147/BBLK/Juni 2026',
  pilotRW: 'RW 10 & RW 11',
};

export const RW_TARGET_MAP: Record<string, { rt: number; dasawisma: number; name: string; cluster?: string }> = {
  'RW 01': { rt: 5, dasawisma: 27, name: 'RW 01', cluster: 'Teratai' },
  'RW 02': { rt: 4, dasawisma: 22, name: 'RW 02', cluster: 'Melati 1.1 - 4.3' },
  'RW 03': { rt: 5, dasawisma: 25, name: 'RW 03', cluster: 'Flamboyan' },
  'RW 04': { rt: 5, dasawisma: 21, name: 'RW 04', cluster: 'Kenanga 1.1 - 5.4' },
  'RW 05': { rt: 3, dasawisma: 12, name: 'RW 05', cluster: 'Mawar 1.1 - 3.4' },
  'RW 06': { rt: 3, dasawisma: 10, name: 'RW 06', cluster: 'Cempaka 1.1 - 2.3' },
  'RW 07': { rt: 4, dasawisma: 20, name: 'RW 07' },
  'RW 08': { rt: 3, dasawisma: 16, name: 'RW 08', cluster: 'Anggrek Bulan 1.1 - 3.5' },
  'RW 09': { rt: 4, dasawisma: 17, name: 'RW 09', cluster: 'Dahlia 1.1 - 4.5' },
  'RW 10': { rt: 5, dasawisma: 27, name: 'RW 10', cluster: 'Anggrek Merah' },
  'RW 11': { rt: 4, dasawisma: 15, name: 'RW 11', cluster: 'Bougenville 1.1 - 4.4' },
  'RW 12': { rt: 3, dasawisma: 14, name: 'RW 12', cluster: 'Kenanga 1.1 - 3.5' },
  'RW 13': { rt: 4, dasawisma: 16, name: 'RW 13', cluster: 'Kenanga, Anggrek, Teratai, Tulip' },
};

export const DAFTAR_RW_BUBULAK: RWInfo[] = [
  {
    id: '01',
    code: 'RW 01',
    name: 'RW 01 Bubulak',
    dasawismaTarget: 27,
    keterangan: 'Teratai',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 7 },
      { id: '02', name: 'RT 02', dasawismaCount: 7 },
      { id: '03', name: 'RT 03', dasawismaCount: 5 },
      { id: '04', name: 'RT 04', dasawismaCount: 5 },
      { id: '05', name: 'RT 05', dasawismaCount: 3 },
    ],
  },
  {
    id: '02',
    code: 'RW 02',
    name: 'RW 02 Bubulak',
    dasawismaTarget: 22,
    keterangan: 'Melati 1.1 - 4.3',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 6 },
      { id: '02', name: 'RT 02', dasawismaCount: 6 },
      { id: '03', name: 'RT 03', dasawismaCount: 7 },
      { id: '04', name: 'RT 04', dasawismaCount: 3 },
    ],
  },
  {
    id: '03',
    code: 'RW 03',
    name: 'RW 03 Bubulak',
    dasawismaTarget: 25,
    keterangan: 'Flamboyan',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 4 },
      { id: '02', name: 'RT 02', dasawismaCount: 7 },
      { id: '03', name: 'RT 03', dasawismaCount: 5 },
      { id: '04', name: 'RT 04', dasawismaCount: 4 },
      { id: '05', name: 'RT 05', dasawismaCount: 5 },
    ],
  },
  {
    id: '04',
    code: 'RW 04',
    name: 'RW 04 Bubulak',
    dasawismaTarget: 21,
    keterangan: 'Kenanga 1.1 - 5.4',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 4 },
      { id: '02', name: 'RT 02', dasawismaCount: 4 },
      { id: '03', name: 'RT 03', dasawismaCount: 4 },
      { id: '04', name: 'RT 04', dasawismaCount: 5 },
      { id: '05', name: 'RT 05', dasawismaCount: 4 },
    ],
  },
  {
    id: '05',
    code: 'RW 05',
    name: 'RW 05 Bubulak',
    dasawismaTarget: 12,
    keterangan: 'Mawar 1.1 - 3.4',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 4 },
      { id: '02', name: 'RT 02', dasawismaCount: 4 },
      { id: '03', name: 'RT 03', dasawismaCount: 4 },
    ],
  },
  {
    id: '06',
    code: 'RW 06',
    name: 'RW 06 Bubulak',
    dasawismaTarget: 10,
    keterangan: 'Cempaka 1.1 - 2.3',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 4 },
      { id: '02', name: 'RT 02', dasawismaCount: 3 },
      { id: '03', name: 'RT 03', dasawismaCount: 3 },
    ],
  },
  {
    id: '07',
    code: 'RW 07',
    name: 'RW 07 Bubulak',
    dasawismaTarget: 20,
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 5 },
      { id: '02', name: 'RT 02', dasawismaCount: 5 },
      { id: '03', name: 'RT 03', dasawismaCount: 5 },
      { id: '04', name: 'RT 04', dasawismaCount: 5 },
    ],
  },
  {
    id: '08',
    code: 'RW 08',
    name: 'RW 08 Bubulak',
    dasawismaTarget: 16,
    keterangan: 'Anggrek Bulan 1.1 - 3.5',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 6 },
      { id: '02', name: 'RT 02', dasawismaCount: 5 },
      { id: '03', name: 'RT 03', dasawismaCount: 5 },
    ],
  },
  {
    id: '09',
    code: 'RW 09',
    name: 'RW 09 Bubulak',
    dasawismaTarget: 17,
    keterangan: 'Dahlia 1.1 - 4.5',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 5 },
      { id: '02', name: 'RT 02', dasawismaCount: 4 },
      { id: '03', name: 'RT 03', dasawismaCount: 4 },
      { id: '04', name: 'RT 04', dasawismaCount: 4 },
    ],
  },
  {
    id: '10',
    code: 'RW 10',
    name: 'RW 10 Bubulak',
    dasawismaTarget: 27,
    keterangan: 'Anggrek Merah',
    isPilot: true,
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 6 },
      { id: '02', name: 'RT 02', dasawismaCount: 6 },
      { id: '03', name: 'RT 03', dasawismaCount: 5 },
      { id: '04', name: 'RT 04', dasawismaCount: 5 },
      { id: '05', name: 'RT 05', dasawismaCount: 5 },
    ],
  },
  {
    id: '11',
    code: 'RW 11',
    name: 'RW 11 Bubulak',
    dasawismaTarget: 15,
    keterangan: 'Bougenville 1.1 - 4.4',
    isPilot: true,
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 4 },
      { id: '02', name: 'RT 02', dasawismaCount: 4 },
      { id: '03', name: 'RT 03', dasawismaCount: 4 },
      { id: '04', name: 'RT 04', dasawismaCount: 3 },
    ],
  },
  {
    id: '12',
    code: 'RW 12',
    name: 'RW 12 Bubulak',
    dasawismaTarget: 14,
    keterangan: 'Kenanga 1.1 - 3.5',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 5 },
      { id: '02', name: 'RT 02', dasawismaCount: 5 },
      { id: '03', name: 'RT 03', dasawismaCount: 4 },
    ],
  },
  {
    id: '13',
    code: 'RW 13',
    name: 'RW 13 Bubulak',
    dasawismaTarget: 16,
    keterangan: 'Kenanga, Anggrek, Teratai, Tulip',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 4 },
      { id: '02', name: 'RT 02', dasawismaCount: 4 },
      { id: '03', name: 'RT 03', dasawismaCount: 4 },
      { id: '04', name: 'RT 04', dasawismaCount: 4 },
    ],
  },
];
