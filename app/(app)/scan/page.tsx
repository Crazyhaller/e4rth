'use client'

import { useState } from 'react'
import UploadDropzone from '@/features/scan/components/UploadDropzone'
import DiagnosisResultCard from '@/features/scan/components/DiagnosisResultCard'
import AnimatedContainer from '@/components/shared/AnimatedContainer'

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
    </div>
  )
}
