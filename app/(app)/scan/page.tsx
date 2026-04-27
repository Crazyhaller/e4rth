'use client'

import { useEffect, useState } from 'react'
import UploadDropzone from '@/features/scan/components/UploadDropzone'
import ScanHistoryList from '@/features/scan/components/ScanHistoryList'
import AnimatedContainer from '@/components/shared/AnimatedContainer'

export default function ScanPage() {
  const [history, setHistory] = useState<any[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  /* =========================
     FETCH HISTORY
  ========================= */
  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/scan/history')
      const data = await res.json()
      setHistory(data)
    } catch (err) {
      console.error('History fetch failed:', err)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  /* =========================
     NEW SCAN HANDLER
  ========================= */
  const handleNewScan = (scan: any) => {
    // Add new scan at top
    setHistory((prev) => [scan, ...prev])

    // Open it immediately
    setActiveId(scan.id)
  }

  return (
    <div className="space-y-6">
      {/* 🌿 Header */}
      <AnimatedContainer>
        <div>
          <h2 className="text-2xl font-semibold">AI Plant Diagnosis 🌿</h2>
          <p className="text-sm text-foreground/70 mt-1">
            Upload an image and let AI detect plant diseases instantly.
          </p>
        </div>
      </AnimatedContainer>

      {/* 📸 Upload */}
      <UploadDropzone onResult={handleNewScan} />

      {/* 🌿 History */}
      <div>
        <h3 className="text-lg font-semibold mt-8 mb-3">Scan History</h3>

        <ScanHistoryList
          history={history}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      </div>
    </div>
  )
}
