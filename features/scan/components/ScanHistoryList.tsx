'use client'

import AnimatedContainer from '@/components/shared/AnimatedContainer'
import EmptyState from '@/components/feedback/EmptyState'
import type { Scan } from '@/types/scan'
import DiagnosisResultCard from './DiagnosisResultCard'
import ScanHistoryItem from './ScanHistoryItem'

interface Props {
  history: Scan[]
  activeId: string | null
  setActiveId: (id: string | null) => void
}

export default function ScanHistoryList({
  history,
  activeId,
  setActiveId,
}: Props) {
  if (history.length === 0) {
    return (
      <EmptyState
        title="No scans yet"
        description="Upload a plant photo to start building diagnosis history."
      />
    )
  }

  return (
    <div className="space-y-3">
      {history.map((scan, i) => {
        const isActive = activeId === scan.id

        return (
          <AnimatedContainer key={scan.id} delay={i * 0.04}>
            <div className="space-y-3">
              <ScanHistoryItem
                scan={scan}
                active={isActive}
                onToggle={() => setActiveId(isActive ? null : scan.id)}
              />

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
