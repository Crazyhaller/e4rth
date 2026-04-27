'use client'

import { useEffect, useState } from 'react'
import AnimatedContainer from '@/components/shared/AnimatedContainer'

export default function ScanHistoryList() {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/scan/history')
        const data = await res.json()
        setHistory(data)
      } catch (err) {
        console.error('History fetch failed:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (loading) {
    return <div className="h-32 bg-white/5 animate-pulse rounded-xl" />
  }

  if (history.length === 0) {
    return <div className="text-sm text-foreground/60">No scans yet.</div>
  }

  return (
    <div className="space-y-3">
      {history.map((scan, i) => (
        <AnimatedContainer key={scan.id} delay={i * 0.05}>
          <div className="glass rounded-xl p-4 border border-white/10">
            <p className="text-sm font-medium">
              {scan.disease === 'healthy' ? 'Healthy 🌱' : scan.disease}
            </p>

            <p className="text-xs text-foreground/60">
              Confidence: {scan.confidence}%
            </p>

            <p className="text-xs text-foreground/50 mt-1">
              {new Date(scan.createdAt).toLocaleString()}
            </p>
          </div>
        </AnimatedContainer>
      ))}
    </div>
  )
}
