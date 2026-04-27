'use client'

import { useState } from 'react'
import UploadDropzone from '@/features/scan/components/UploadDropzone'
import DiagnosisResultCard from '@/features/scan/components/DiagnosisResultCard'
import AnimatedContainer from '@/components/shared/AnimatedContainer'
import ScanHistoryList from '@/features/scan/components/ScanHistoryList'

export default function ScanPage() {
  const [result, setResult] = useState<any>(null)

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
      <UploadDropzone onResult={setResult} />

      {/* 🧠 Result */}
      {result && <DiagnosisResultCard data={result} />}

      {result && <DiagnosisResultCard data={result} />}

      {/* 🌿 History */}
      <div>
        <h3 className="text-lg font-semibold mt-8 mb-3">Scan History</h3>
        <ScanHistoryList />
      </div>
    </div>
  )
}
