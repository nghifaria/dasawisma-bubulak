/**
 * Metadata Master Wilayah Administratif Kelurahan Bubulak
 * Kecamatan Bogor Barat, Kota Bogor
 * Terdiri dari 13 RW (RW 01 s/d RW 13) dan 50 RT
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
  totalRT: 50,
  pilotRW: 'RW 12',
};

export const DAFTAR_RW_BUBULAK: RWInfo[] = [
  {
    id: '01',
    code: 'RW 01',
    name: 'RW 01 Bubulak',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 3 },
      { id: '02', name: 'RT 02', dasawismaCount: 3 },
      { id: '03', name: 'RT 03', dasawismaCount: 3 },
      { id: '04', name: 'RT 04', dasawismaCount: 3 },
    ],
  },
  {
    id: '02',
    code: 'RW 02',
    name: 'RW 02 Bubulak',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 3 },
      { id: '02', name: 'RT 02', dasawismaCount: 4 },
      { id: '03', name: 'RT 03', dasawismaCount: 3 },
      { id: '04', name: 'RT 04', dasawismaCount: 3 },
    ],
  },
  {
    id: '03',
    code: 'RW 03',
    name: 'RW 03 Bubulak',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 3 },
      { id: '02', name: 'RT 02', dasawismaCount: 3 },
      { id: '03', name: 'RT 03', dasawismaCount: 4 },
      { id: '04', name: 'RT 04', dasawismaCount: 3 },
    ],
  },
  {
    id: '04',
    code: 'RW 04',
    name: 'RW 04 Bubulak',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 4 },
      { id: '02', name: 'RT 02', dasawismaCount: 3 },
      { id: '03', name: 'RT 03', dasawismaCount: 3 },
      { id: '04', name: 'RT 04', dasawismaCount: 3 },
    ],
  },
  {
    id: '05',
    code: 'RW 05',
    name: 'RW 05 Bubulak',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 3 },
      { id: '02', name: 'RT 02', dasawismaCount: 4 },
      { id: '03', name: 'RT 03', dasawismaCount: 3 },
      { id: '04', name: 'RT 04', dasawismaCount: 4 },
    ],
  },
  {
    id: '06',
    code: 'RW 06',
    name: 'RW 06 Bubulak',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 3 },
      { id: '02', name: 'RT 02', dasawismaCount: 3 },
      { id: '03', name: 'RT 03', dasawismaCount: 3 },
      { id: '04', name: 'RT 04', dasawismaCount: 3 },
    ],
  },
  {
    id: '07',
    code: 'RW 07',
    name: 'RW 07 Bubulak',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 4 },
      { id: '02', name: 'RT 02', dasawismaCount: 4 },
      { id: '03', name: 'RT 03', dasawismaCount: 3 },
      { id: '04', name: 'RT 04', dasawismaCount: 3 },
    ],
  },
  {
    id: '08',
    code: 'RW 08',
    name: 'RW 08 Bubulak',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 3 },
      { id: '02', name: 'RT 02', dasawismaCount: 3 },
      { id: '03', name: 'RT 03', dasawismaCount: 3 },
      { id: '04', name: 'RT 04', dasawismaCount: 4 },
    ],
  },
  {
    id: '09',
    code: 'RW 09',
    name: 'RW 09 Bubulak',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 3 },
      { id: '02', name: 'RT 02', dasawismaCount: 3 },
      { id: '03', name: 'RT 03', dasawismaCount: 3 },
      { id: '04', name: 'RT 04', dasawismaCount: 3 },
    ],
  },
  {
    id: '10',
    code: 'RW 10',
    name: 'RW 10 Bubulak',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 3 },
      { id: '02', name: 'RT 02', dasawismaCount: 3 },
      { id: '03', name: 'RT 03', dasawismaCount: 4 },
      { id: '04', name: 'RT 04', dasawismaCount: 3 },
    ],
  },
  {
    id: '11',
    code: 'RW 11',
    name: 'RW 11 Bubulak',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 3 },
      { id: '02', name: 'RT 02', dasawismaCount: 4 },
      { id: '03', name: 'RT 03', dasawismaCount: 3 },
      { id: '04', name: 'RT 04', dasawismaCount: 3 },
    ],
  },
  {
    id: '12',
    code: 'RW 12',
    name: 'RW 12 Bubulak',
    isPilot: false,
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 3 },
      { id: '02', name: 'RT 02', dasawismaCount: 4 },
      { id: '03', name: 'RT 03', dasawismaCount: 3 },
      { id: '04', name: 'RT 04', dasawismaCount: 3 },
      { id: '05', name: 'RT 05', dasawismaCount: 3 },
    ],
  },
  {
    id: '13',
    code: 'RW 13',
    name: 'RW 13 Bubulak',
    rtList: [
      { id: '01', name: 'RT 01', dasawismaCount: 3 },
      { id: '02', name: 'RT 02', dasawismaCount: 3 },
      { id: '03', name: 'RT 03', dasawismaCount: 3 },
    ],
  },
];
