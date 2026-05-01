'use client'

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { GrowthLog } from '@/types/plant'
import { getGrowthLogs } from '@/features/plants/services/plants.service'

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
)

interface Props {
  plantId: string
  refreshKey?: number
}

export default function GrowthChart({ plantId, refreshKey }: Props) {
  const [logs, setLogs] = useState<GrowthLog[]>([])
  useEffect(() => {
    const fetchLogs = async () => {
      const data = await getGrowthLogs(plantId)
      setLogs(data.reverse())
    }

    fetchLogs()
  }, [plantId, refreshKey])

  if (logs.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 border border-white/10 text-sm text-foreground/60">
        No growth data yet.
      </div>
    )
  }

  const labels = logs.map((log) => new Date(log.createdAt).toLocaleDateString())

  const e4rth = '#3fae68'
  const moss = '#6b8f71'

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Height (cm)',
        data: logs.map((l) => l.height),
        borderColor: e4rth,
        backgroundColor: 'rgba(63,174,104,0.15)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Health Score (%)',
        data: logs.map((l) => l.healthScore),
        borderColor: moss,
        backgroundColor: 'rgba(107,143,113,0.12)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const textColor = 'hsl(var(--foreground) / 0.72)'
  const gridColor = 'hsl(var(--border) / 0.65)'
  const tooltipBg = 'hsl(var(--card))'
  const tooltipText = 'hsl(var(--foreground))'

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          usePointStyle: true,
        },
      },

      tooltip: {
        backgroundColor: tooltipBg,
        borderColor: gridColor,
        borderWidth: 1,
        padding: 10,
        titleColor: tooltipText,
        bodyColor: tooltipText,
      },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: 'Timeline',
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },

      y: {
        title: {
          display: true,
          text: 'Growth / Health',
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  }

  return (
    <div className="surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Growth Analytics</h3>

        <span className="text-xs text-foreground/50">Trends over time</span>
      </div>

      <div className="h-75">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
