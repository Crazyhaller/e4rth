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
} from 'chart.js'

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
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch(`/api/logs/${plantId}`)
      const data = await res.json()
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

  const getCSSVar = (name: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim()

  const verdant = getCSSVar('--color-verdant-500')
  const moss = getCSSVar('--color-moss')

  const data = {
    labels,
    datasets: [
      {
        label: 'Height (cm)',
        data: logs.map((l) => l.height),
        borderColor: verdant,
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

  const isDark = document.documentElement.classList.contains('dark')

  const textColor = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'

  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)'

  const tooltipBg = isDark ? 'rgba(20,20,20,0.9)' : 'rgba(255,255,255,0.95)'

  const tooltipText = isDark ? '#fff' : '#111'

  const options: any = {
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
    <div className="glass rounded-2xl p-6 border border-white/10">
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
