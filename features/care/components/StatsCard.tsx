import type { ReactNode } from 'react'

export default function StatsCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: ReactNode
  label: string
  value: string | number
  sub?: string
}) {
  return (
    <div className="surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground/60">{label}</span>
        <span className="text-primary">{icon}</span>
      </div>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
      {sub && <p className="mt-1 text-xs text-foreground/50">{sub}</p>}
    </div>
  )
}
