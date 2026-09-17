'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts';
import { PyramidDataPoint } from '@/types/dasawisma';
import { Users2 } from 'lucide-react';

interface DemographicsChartProps {
  data: PyramidDataPoint[];
  totalJiwa: number;
}

interface TooltipPayloadItem {
  value: number;
  dataKey: string;
  name: string;
  payload: PyramidDataPoint;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  totalJiwa: number;
}

function CustomPyramidTooltip({
  active,
  payload,
  label,
  totalJiwa,
}: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const row = payload[0].payload;
  const laki = row.laki_laki;
  const perempuan = row.perempuan;
  const totalGrup = laki + perempuan;
  const persenDariTotal = totalJiwa > 0 ? ((totalGrup / totalJiwa) * 100).toFixed(1) : '0';

  return (
    <div className="bg-slate-900 text-white p-3 rounded-xl shadow-md text-xs max-w-xs border border-slate-700">
      <div className="border-b border-slate-700 pb-1 mb-1.5">
        <strong className="text-sm font-bold text-white">Kelompok Usia {label} Tahun</strong>
        <p className="text-[11px] text-slate-300">
          Total: {totalGrup.toLocaleString('id-ID')} Jiwa ({persenDariTotal}% dari total)
        </p>
      </div>
      <div className="space-y-1">
        <p className="flex justify-between gap-4 text-blue-300 font-medium">
          <span>Laki-laki:</span>
          <span className="font-bold text-white">
            {laki.toLocaleString('id-ID')} ({totalGrup > 0 ? ((laki / totalGrup) * 100).toFixed(1) : 0}%)
          </span>
        </p>
        <p className="flex justify-between gap-4 text-rose-300 font-medium">
          <span>Perempuan:</span>
          <span className="font-bold text-white">
            {perempuan.toLocaleString('id-ID')} ({totalGrup > 0 ? ((perempuan / totalGrup) * 100).toFixed(1) : 0}%)
          </span>
        </p>
      </div>
    </div>
  );
}

export function DemographicsChart({ data, totalJiwa }: DemographicsChartProps) {
  // Untuk Recharts Piramida Simetris:
  // Laki-laki dikonversi ke nilai negatif agar menjulur ke kiri dari 0
  const formattedData = data.map((item) => ({
    ...item,
    laki_laki_neg: -Math.abs(item.laki_laki),
    perempuan_pos: Math.abs(item.perempuan),
  }));

  // Hitung batas nilai maksimal untuk skala simetris sumbu X secara dinamis
  const maxCount = Math.max(
    ...data.map((d) => Math.max(d.laki_laki, d.perempuan)),
    5 // Batas minimal 5 jika data sedikit agar sumbu X bilangan bulat rapi
  );
  const xDomainLimit = Math.ceil(maxCount * 1.15);

  return (
    <section
      aria-labelledby="heading-piramida-usia"
      className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs w-full"
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Users2 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="heading-piramida-usia"
              className="text-base sm:text-lg font-bold text-slate-900 tracking-tight"
            >
              Piramida Penduduk Simetris
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Struktur Kelompok Umur 5 Tahunan & Rasio Gender (Standar BPS / WHO)
            </p>
          </div>
        </div>
      </div>

      {/* Screen reader table */}
      <div className="sr-only">
        <table>
          <caption>Piramida penduduk menurut kelompok umur dan jenis kelamin</caption>
          <thead>
            <tr>
              <th>Kelompok Umur</th>
              <th>Laki-laki</th>
              <th>Perempuan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.age_group}>
                <td>{row.age_group}</td>
                <td>{row.laki_laki}</td>
                <td>{row.perempuan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart Piramida Lapang & Sejajar Sempurna */}
      <div className="mt-4 w-full h-[520px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            layout="vertical"
            stackOffset="sign"
            margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis
              type="number"
              domain={[-xDomainLimit, xDomainLimit]}
              tickFormatter={(val: number) => Math.abs(val).toString()}
              allowDecimals={false}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              tick={{ fill: '#64748b', fontSize: 11 }}
            />
            <YAxis
              type="category"
              dataKey="age_group"
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              tick={{ fill: '#334155', fontSize: 11, fontWeight: 500 }}
              width={65}
            />
            <Tooltip
              content={<CustomPyramidTooltip totalJiwa={totalJiwa} />}
              cursor={{ fill: '#f8fafc' }}
            />
            <ReferenceLine x={0} stroke="#94a3b8" strokeWidth={2} />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => {
                if (value === 'Laki-laki') {
                  return <span className="text-xs font-bold text-blue-700 mr-4">Laki-laki (Kiri)</span>;
                }
                return <span className="text-xs font-bold text-rose-700">Perempuan (Kanan)</span>;
              }}
            />
            <Bar
              dataKey="laki_laki_neg"
              name="Laki-laki"
              fill="#2563eb"
              stackId="pyramid"
              radius={[4, 0, 0, 4]}
              barSize={18}
            />
            <Bar
              dataKey="perempuan_pos"
              name="Perempuan"
              fill="#e11d48"
              stackId="pyramid"
              radius={[0, 4, 4, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
        <span className="font-semibold text-blue-700">Laki-laki (#2563eb)</span>
        <span className="text-slate-500 font-medium">Sumbu Tengah: 0</span>
        <span className="font-semibold text-rose-700">Perempuan (#e11d48)</span>
      </div>
    </section>
  );
}
