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
} from 'chart.js'

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
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
    return <div className="text-sm text-foreground/60">No growth data yet.</div>
  }

  const labels = logs.map((log) => new Date(log.createdAt).toLocaleDateString())

  const data = {
    labels,
    datasets: [
      {
        label: 'Height',
        data: logs.map((l) => l.height),
        borderWidth: 2,
      },
      {
        label: 'Health Score',
        data: logs.map((l) => l.healthScore),
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255,255,255,0.6)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(255,255,255,0.6)',
        },
      },
    },
  }

  return (
    <div className="glass rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold mb-4">Growth Analytics</h3>

      <Line data={data} options={options} />
    </div>
  )
}
