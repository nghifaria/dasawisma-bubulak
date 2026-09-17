'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { RWMetricsAggregated } from '@/types/dasawisma';
import { BarChart3 } from 'lucide-react';

interface RWComparisonChartProps {
  data: RWMetricsAggregated[];
  selectedRW?: string;
  onSelectRW?: (rw: string) => void;
}

type MetricMode = 'jiwa' | 'kk' | 'rumah_sehat';

interface TooltipPayloadItem {
  value: number;
  name: string;
  payload: RWMetricsAggregated;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  mode: MetricMode;
}

function CustomTooltip({ active, payload, label, mode }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const rwData = payload[0].payload;

  return (
    <div className="bg-slate-900 text-white p-3 rounded-xl shadow-md text-xs max-w-xs border border-slate-700">
      <div className="flex items-center justify-between gap-2 border-b border-slate-700 pb-1.5 mb-1.5">
        <strong className="text-sm font-bold text-emerald-400">{label}</strong>
        {rwData.is_pilot && (
          <span className="px-2 py-0.5 rounded-md bg-emerald-800 text-emerald-100 text-[10px] font-bold">
            Area Pilot
          </span>
        )}
      </div>

      <div className="space-y-1">
        {mode === 'jiwa' && (
          <>
            <p className="flex justify-between gap-4">
              <span className="text-slate-300">Total Jiwa:</span>
              <span className="font-bold text-white">{rwData.total_jiwa.toLocaleString('id-ID')}</span>
            </p>
            <p className="flex justify-between gap-4 text-blue-300">
              <span>Laki-laki:</span>
              <span className="font-semibold">{rwData.total_l} ({((rwData.total_l / rwData.total_jiwa) * 100).toFixed(1)}%)</span>
            </p>
            <p className="flex justify-between gap-4 text-rose-300">
              <span>Perempuan:</span>
              <span className="font-semibold">{rwData.total_p} ({((rwData.total_p / rwData.total_jiwa) * 100).toFixed(1)}%)</span>
            </p>
          </>
        )}

        {mode === 'kk' && (
          <>
            <p className="flex justify-between gap-4">
              <span className="text-slate-300">Total Kepala Keluarga:</span>
              <span className="font-bold text-white">{rwData.total_kk.toLocaleString('id-ID')}</span>
            </p>
            <p className="flex justify-between gap-4 text-emerald-300">
              <span>Kelompok Dasawisma:</span>
              <span className="font-semibold">{rwData.total_dasawisma}</span>
            </p>
          </>
        )}

        {mode === 'rumah_sehat' && (
          <>
            <p className="flex justify-between gap-4">
              <span className="text-slate-300">Rumah Sehat:</span>
              <span className="font-bold text-emerald-400">
                {rwData.rumah_sehat_count} ({rwData.persen_rumah_sehat}%)
              </span>
            </p>
            <p className="flex justify-between gap-4 text-slate-300">
              <span>Total KK:</span>
              <span className="font-semibold">{rwData.total_kk}</span>
            </p>
            <p className="flex justify-between gap-4 text-slate-400">
              <span>Kurang Sehat:</span>
              <span className="font-semibold">{rwData.rumah_kurang_sehat_count}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export function RWComparisonChart({
  data,
  selectedRW = 'ALL',
  onSelectRW,
}: RWComparisonChartProps) {
  const [metricMode, setMetricMode] = useState<MetricMode>('jiwa');

  const getBarColor = (item: RWMetricsAggregated) => {
    // Penekanan khusus jika terpilih
    if (selectedRW !== 'ALL' && item.rw === selectedRW) {
      return '#059669'; // Emerald aktif
    }
    // Highlight khusus area pilot RW 12
    if (item.is_pilot) {
      return '#10b981'; // Emerald cerah
    }
    // Warna standar netral
    return metricMode === 'rumah_sehat' ? '#059669' : '#475569';
  };

  const getDataKey = () => {
    switch (metricMode) {
      case 'kk':
        return 'total_kk';
      case 'rumah_sehat':
        return 'rumah_sehat_count';
      case 'jiwa':
      default:
        return 'total_jiwa';
    }
  };

  const getMetricLabel = () => {
    switch (metricMode) {
      case 'kk':
        return 'Jumlah Kepala Keluarga (KK)';
      case 'rumah_sehat':
        return 'Jumlah Rumah Kriteria Sehat';
      case 'jiwa':
      default:
        return 'Jumlah Total Jiwa Penduduk';
    }
  };

  return (
    <section
      aria-labelledby="heading-komparasi-rw"
      className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="heading-komparasi-rw"
              className="text-base sm:text-lg font-bold text-slate-900 tracking-tight"
            >
              Komparasi Data Antar-RW
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Perbandingan 13 RW Kelurahan Bubulak (RW 12 sebagai Wilayah Percontohan)
            </p>
          </div>
        </div>

        {/* Tab Switcher Metrik dengan Area Sentuh >= 44px */}
        <div
          className="inline-flex p-1 bg-slate-100 rounded-xl self-start sm:self-auto flex-wrap gap-1"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={metricMode === 'jiwa'}
            onClick={() => setMetricMode('jiwa')}
            className={`min-h-[44px] px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
              metricMode === 'jiwa'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Total Jiwa
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={metricMode === 'kk'}
            onClick={() => setMetricMode('kk')}
            className={`min-h-[44px] px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
              metricMode === 'kk'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kepala Keluarga
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={metricMode === 'rumah_sehat'}
            onClick={() => setMetricMode('rumah_sehat')}
            className={`min-h-[44px] px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
              metricMode === 'rumah_sehat'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rumah Sehat
          </button>
        </div>
      </div>

      {/* Screen Reader Semantic Table Summary */}
      <div className="sr-only">
        <table>
          <caption>Data perbandingan 13 RW Kelurahan Bubulak</caption>
          <thead>
            <tr>
              <th>Wilayah RW</th>
              <th>Total Jiwa</th>
              <th>Total KK</th>
              <th>Rumah Sehat</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.rw}>
                <td>{item.rw}</td>
                <td>{item.total_jiwa}</td>
                <td>{item.total_kk}</td>
                <td>{item.rumah_sehat_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grafik Recharts Horizontal Bar */}
      <div className="mt-4 w-full h-[460px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
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
              dataKey="rw"
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              tick={{ fill: '#0f172a', fontSize: 11, fontWeight: 600 }}
              width={58}
            />
            <Tooltip
              content={<CustomTooltip mode={metricMode} />}
              cursor={{ fill: '#f8fafc' }}
            />
            <Bar
              dataKey={getDataKey()}
              name={getMetricLabel()}
              radius={[0, 4, 4, 0]}
              onClick={(entry) => {
                const item = entry as { rw?: string; payload?: RWMetricsAggregated };
                const rwName = item?.payload?.rw || item?.rw;
                if (onSelectRW && rwName) {
                  onSelectRW(rwName);
                }
              }}
              className="cursor-pointer"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.rw}
                  fill={getBarColor(entry)}
                  stroke={entry.is_pilot ? '#047857' : undefined}
                  strokeWidth={entry.is_pilot ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Catatan Kaki Legenda */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-slate-600 inline-block" />
            <span>RW Standar</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-emerald-500 border border-emerald-700 inline-block" />
            <strong className="text-emerald-800">RW 12 (Pilot Project Riil)</strong>
          </span>
        </div>
        <span className="text-[11px] text-slate-500 italic">
          *Ketuk batang RW untuk memfilter data
        </span>
      </div>
    </section>
  );
}
