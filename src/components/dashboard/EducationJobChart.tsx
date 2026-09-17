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
} from 'recharts';
import { GraduationCap, Briefcase } from 'lucide-react';

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
  payload: DistributionItem;
}

function MiniBarTooltip({
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

  return (
    <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-md text-xs border border-slate-700 max-w-[220px]">
      <strong className="block text-white font-bold mb-1">{label}</strong>
      <p className="flex justify-between gap-3 text-slate-200">
        <span>Jumlah:</span>
        <span className="font-bold text-white">{item.count.toLocaleString('id-ID')} Jiwa</span>
      </p>
      <p className="flex justify-between gap-3 text-slate-200">
        <span>Persentase:</span>
        <span className="font-bold text-emerald-400">{item.percentage}%</span>
      </p>
    </div>
  );
}

export function EducationJobChart({
  educationData,
  jobData,
}: EducationJobChartProps) {
  return (
    <section
      aria-label="Distribusi Pendidikan dan Pekerjaan Warga"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
    >
      {/* Chart 1: Pendidikan Terakhir */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
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
              <Tooltip content={<MiniBarTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Bar
                dataKey="count"
                fill="#059669"
                radius={[0, 4, 4, 0]}
                maxBarSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Pekerjaan Utama */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
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
              <Tooltip content={<MiniBarTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Bar
                dataKey="count"
                fill="#475569"
                radius={[0, 4, 4, 0]}
                maxBarSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
