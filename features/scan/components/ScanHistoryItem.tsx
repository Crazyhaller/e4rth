'use client'

import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Scan } from '@/types/scan'

export default function ScanHistoryItem({
  scan,
  active,
  onToggle,
}: {
  scan: Scan
  active: boolean
  onToggle: () => void
}) {
  const isHealthy = scan.disease.toLowerCase() === 'healthy'

  return (
    <button
      onClick={onToggle}
      className={cn(
        'grid w-full grid-cols-[72px_1fr_auto] items-center gap-4 rounded-xl border p-3 text-left transition',
        active
          ? 'border-primary/35 bg-primary/12 shadow-glow hover:cursor-pointer'
          : 'border-border/70 bg-card/60 hover:bg-primary/8',
      )}
    >
      <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-white/10">
        <Image
          src={scan.imageUrl}
          alt={scan.disease}
          fill
          className="object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">
          {isHealthy ? 'Healthy plant' : scan.disease}
        </p>
        <p className="mt-1 text-xs text-foreground/60">
          {scan.confidence}% confidence · {scan.severity} severity
        </p>
        <p className="mt-1 text-xs text-foreground/45">
          {scan.createdAt
            ? new Date(scan.createdAt).toLocaleString()
            : 'Recent'}
        </p>
      </div>
      {active ? (
        <ChevronUp className="h-4 w-4 text-foreground/50" />
      ) : (
        <ChevronDown className="h-4 w-4 text-foreground/50" />
      )}
    </button>
  )
}
