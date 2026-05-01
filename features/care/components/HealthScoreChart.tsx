'use client'

import { Doughnut } from 'react-chartjs-2'
import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip)

export default function HealthScoreChart({ score }: { score: number }) {
  const normalized = Math.max(0, Math.min(100, Math.round(score)))

  return (
    <div className="surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Health Score</h3>
        <span className="text-xs text-foreground/50">Portfolio average</span>
      </div>
      <div className="mx-auto h-56 max-w-56">
        <Doughnut
          data={{
            labels: ['Healthy', 'Needs attention'],
            datasets: [
              {
                data: [normalized, 100 - normalized],
                backgroundColor: ['#6f7b44', 'rgba(126,92,50,0.18)'],
                borderWidth: 0,
              },
            ],
          }}
          options={{
            cutout: '72%',
            plugins: {
              tooltip: {
                backgroundColor: 'hsl(var(--card))',
              },
            },
          }}
        />
      </div>
      <p className="-mt-32 mb-24 text-center text-3xl font-semibold">
        {normalized}%
      </p>
    </div>
  )
}
