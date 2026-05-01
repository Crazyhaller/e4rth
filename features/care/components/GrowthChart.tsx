'use client'

import { Line } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartOptions,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
)

export default function GrowthChart({
  labels,
  health,
}: {
  labels: string[]
  health: number[]
}) {
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: 'hsl(var(--foreground) / 0.72)', usePointStyle: true },
      },
    },
    scales: {
      x: {
        ticks: { color: 'hsl(var(--foreground) / 0.62)' },
        grid: { color: 'hsl(var(--border) / 0.6)' },
      },
      y: {
        min: 0,
        max: 100,
        ticks: { color: 'hsl(var(--foreground) / 0.62)' },
        grid: { color: 'hsl(var(--border) / 0.6)' },
      },
    },
  }

  return (
    <div className="surface p-6">
      <h3 className="mb-4 text-lg font-semibold">Health Trend</h3>
      <div className="h-72">
        <Line
          data={{
            labels,
            datasets: [
              {
                label: 'Average health',
                data: health,
                borderColor: '#3fae68',
                backgroundColor: 'rgba(63,174,104,0.14)',
                fill: true,
                tension: 0.42,
              },
            ],
          }}
          options={options}
        />
      </div>
    </div>
  )
}
