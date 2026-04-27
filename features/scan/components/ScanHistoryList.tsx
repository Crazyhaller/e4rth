'use client'

import AnimatedContainer from '@/components/shared/AnimatedContainer'
import DiagnosisResultCard from './DiagnosisResultCard'

interface Props {
  history: any[]
  activeId: string | null
  setActiveId: (id: string | null) => void
}

export default function ScanHistoryList({
  history,
  activeId,
  setActiveId,
}: Props) {
  if (history.length === 0) {
    return <div className="text-sm text-foreground/60">No scans yet.</div>
  }

  return (
    <div className="space-y-3">
      {history.map((scan, i) => {
        const isActive = activeId === scan.id

        return (
          <AnimatedContainer key={scan.id} delay={i * 0.05}>
            <div className="space-y-3">
              {/* 📄 Item */}
              <div
                onClick={() => setActiveId(isActive ? null : scan.id)}
                className="glass rounded-xl p-4 border border-white/10 cursor-pointer hover:shadow-glow transition"
              >
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

              {/* 🧠 Inline Result */}
              {isActive && (
                <div className="pl-2">
                  <DiagnosisResultCard data={scan} />
                </div>
              )}
            </div>
          </AnimatedContainer>
        )
      })}
    </div>
  )
}
