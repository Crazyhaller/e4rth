'use client'

import AnimatedContainer from '@/components/shared/AnimatedContainer'
import type { DiagnosisResult } from '@/types/ai'
import ConfidenceMeter from './ConfidenceMeter'
import ImagePreviewCard from './ImagePreviewCard'
import TreatmentSteps from './TreatmentSteps'

interface Props {
  data: {
    imageUrl?: string
    disease: string
    confidence: number
    severity: 'low' | 'medium' | 'high'
    rawResponse?: DiagnosisResult | null
  }
}

export default function DiagnosisResultCard({ data }: Props) {
  const { disease, confidence, severity, rawResponse } = data

  const severityColor =
    severity === 'high'
      ? 'bg-red-500/15 text-red-700 border-red-500/25 dark:text-red-300'
      : severity === 'medium'
        ? 'bg-yellow-500/18 text-yellow-800 border-yellow-500/25 dark:text-yellow-200'
        : 'bg-green-500/15 text-green-800 border-green-500/25 dark:text-green-200'

  return (
    <AnimatedContainer>
      <div className="surface space-y-6 p-6">
        {data.imageUrl && (
          <ImagePreviewCard imageUrl={data.imageUrl} alt={disease} />
        )}

        <div>
          <h2 className="text-xl font-semibold">
            {disease.toLowerCase() === 'healthy' ? 'Healthy Plant' : disease}
          </h2>
          <p className="mt-1 text-sm text-foreground/60">
            AI diagnosis result
          </p>
        </div>

        <ConfidenceMeter value={confidence} />

        <span
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${severityColor}`}
        >
          {severity} severity
        </span>

        <TreatmentSteps steps={rawResponse?.treatment ?? []} />
      </div>
    </AnimatedContainer>
  )
}
