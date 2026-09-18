'use client';

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  GraduationCap,
  Briefcase,
  ChartBar,
  ChartPie,
} from 'lucide-react';

interface DistributionItem {
  label: string;
  count: number;
  percentage: number;
}

interface EducationJobChartProps {
  educationData: DistributionItem[];
  jobData: DistributionItem[];
}

interface TooltipPayloadItem {
  value: number;
  name?: string;
  payload: DistributionItem;
}

const JOB_COLORS = [
  '#059669', // Emerald 600
  '#0d9488', // Teal 600
  '#0284c7', // Sky 600
  '#475569', // Slate 600
  '#64748b', // Slate 500
  '#94a3b8', // Slate 400
  '#cbd5e1', // Slate 300
];

const EDU_COLORS = [
  '#059669', // Emerald 600
  '#0d9488', // Teal 600
  '#0284c7', // Sky 600
  '#64748b', // Slate 500
  '#94a3b8', // Slate 400
];

function CustomChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;
  const title = label || payload[0].name || item.label;

  return (
    <div className="bg-slate-900 text-white p-3 rounded-xl shadow-md text-xs border border-slate-700 max-w-[240px]">
      <strong className="block text-white font-bold mb-1.5 text-sm">{title}</strong>
      <div className="space-y-1">
        <p className="flex justify-between gap-4 text-slate-200">
          <span className="text-slate-400">Jumlah:</span>
          <span className="font-bold text-white">
            {item.count.toLocaleString('id-ID')} Jiwa
          </span>
        </p>
        <p className="flex justify-between gap-4 text-slate-200">
          <span className="text-slate-400">Persentase:</span>
          <span className="font-bold text-emerald-400">{item.percentage}%</span>
        </p>
      </div>
    </div>
  );
}

interface ChartToggleProps {
  view: 'bar' | 'donut';
  onToggle: (view: 'bar' | 'donut') => void;
  ariaLabel: string;
}

function ChartToggle({ view, onToggle, ariaLabel }: ChartToggleProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0"
    >
      <button
        type="button"
        role="tab"
        aria-selected={view === 'bar'}
        onClick={() => onToggle('bar')}
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold min-h-[44px] transition-all cursor-pointer ${
          view === 'bar'
            ? 'bg-emerald-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        <ChartBar className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Bar</span>
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={view === 'donut'}
        onClick={() => onToggle('donut')}
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold min-h-[44px] transition-all cursor-pointer ${
          view === 'donut'
            ? 'bg-emerald-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        <ChartPie className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Donut</span>
      </button>
    </div>
  );
}

function DonutView({
  data,
  colors,
  title,
}: {
  data: DistributionItem[];
  colors: string[];
  title: string;
}) {
  return (
    <div className="w-full min-h-[260px] flex flex-col sm:flex-row items-center justify-center gap-5">
      {/* Clean Minimalist Donut Ring */}
      <div className="relative w-[180px] h-[180px] shrink-0 mx-auto sm:mx-0 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomChartTooltip />} />
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              stroke="#ffffff"
              strokeWidth={2}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category Legend List */}
      <div
        className="flex-1 w-full space-y-1.5 max-h-[260px] overflow-y-auto pr-1"
        role="list"
        aria-label={`Rincian kategori ${title}`}
      >
        {data.map((item, idx) => {
          const color = colors[idx % colors.length];
          return (
            <div
              key={item.label}
              role="listitem"
              className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-slate-50/80 hover:bg-slate-100/90 border border-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
                <span className="text-slate-700 font-medium truncate" title={item.label}>
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-semibold text-slate-900 tabular-nums">
                  {item.count.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] font-medium text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200 tabular-nums">
                  {item.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function EducationJobChart({
  educationData,
  jobData,
}: EducationJobChartProps) {
  const [eduView, setEduView] = useState<'bar' | 'donut'>('bar');
  const [jobView, setJobView] = useState<'bar' | 'donut'>('bar');

  return (
    <section
      aria-label="Distribusi Pendidikan dan Pekerjaan Warga"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
    >
      {/* Chart 1: Pendidikan Terakhir */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Pendidikan Terakhir Warga
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Sebaran jenjang ijazah tertinggi yang ditamatkan
              </p>
            </div>
          </div>
          <ChartToggle
            view={eduView}
            onToggle={setEduView}
            ariaLabel="Ubah visualisasi grafik pendidikan terakhir"
          />
        </div>

        {eduView === 'bar' ? (
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={educationData}
                layout="vertical"
                margin={{ top: 5, right: 15, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="label"
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fill: '#0f172a', fontSize: 11, fontWeight: 600 }}
                  width={105}
                />
                <Tooltip content={<CustomChartTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar
                  dataKey="count"
                  fill="#059669"
                  radius={[0, 4, 4, 0]}
                  maxBarSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <DonutView
            data={educationData}
            colors={EDU_COLORS}
            title="Pendidikan Terakhir"
          />
        )}

        {/* Semantic sr-only table for accessibility */}
        <table className="sr-only">
          <caption>Tabel Distribusi Pendidikan Terakhir</caption>
          <thead>
            <tr>
              <th scope="col">Tingkat Pendidikan</th>
              <th scope="col">Jumlah (Jiwa)</th>
              <th scope="col">Persentase</th>
            </tr>
          </thead>
          <tbody>
            {educationData.map((item) => (
              <tr key={item.label}>
                <td>{item.label}</td>
                <td>{item.count}</td>
                <td>{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart 2: Pekerjaan Utama */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Pekerjaan Utama Warga
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Distribusi mata pencaharian & profesi dominan
              </p>
            </div>
          </div>
          <ChartToggle
            view={jobView}
            onToggle={setJobView}
            ariaLabel="Ubah visualisasi grafik pekerjaan utama"
          />
        </div>

        {jobView === 'bar' ? (
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={jobData}
                layout="vertical"
                margin={{ top: 5, right: 15, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="label"
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fill: '#0f172a', fontSize: 11, fontWeight: 600 }}
                  width={115}
                />
                <Tooltip content={<CustomChartTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar
                  dataKey="count"
                  fill="#475569"
                  radius={[0, 4, 4, 0]}
                  maxBarSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <DonutView
            data={jobData}
            colors={JOB_COLORS}
            title="Pekerjaan Utama"
          />
        )}

        {/* Semantic sr-only table for accessibility */}
        <table className="sr-only">
          <caption>Tabel Distribusi Pekerjaan Utama</caption>
          <thead>
            <tr>
              <th scope="col">Jenis Pekerjaan</th>
              <th scope="col">Jumlah (Jiwa)</th>
              <th scope="col">Persentase</th>
            </tr>
          </thead>
          <tbody>
            {jobData.map((item) => (
              <tr key={item.label}>
                <td>{item.label}</td>
                <td>{item.count}</td>
                <td>{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
