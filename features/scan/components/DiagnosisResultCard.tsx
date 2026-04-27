'use client'

import AnimatedContainer from '@/components/shared/AnimatedContainer'

interface Props {
  data: {
    disease: string
    confidence: number
    severity: 'low' | 'medium' | 'high'
    rawResponse?: any
  }
}

export default function DiagnosisResultCard({ data }: Props) {
  const { disease, confidence, severity, rawResponse } = data

  const severityColor =
    severity === 'high'
      ? 'bg-red-500/20 text-red-400'
      : severity === 'medium'
        ? 'bg-yellow-500/20 text-yellow-400'
        : 'bg-green-500/20 text-green-400'

  return (
    <AnimatedContainer>
      <div className="glass rounded-2xl p-6 border border-white/10 space-y-6">
        {/* 🌿 Disease */}
        <div>
          <h2 className="text-xl font-semibold">
            {disease === 'healthy' ? 'Healthy Plant 🌱' : disease}
          </h2>
          <p className="text-sm text-foreground/60 mt-1">AI diagnosis result</p>
        </div>

        {/* 📊 Confidence */}
        <div>
          <p className="text-sm text-foreground/60 mb-2">Confidence</p>

          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-verdant transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>

          <p className="text-xs mt-1 text-foreground/50">{confidence}%</p>
        </div>

        {/* ⚠️ Severity */}
        <div>
          <span className={`px-3 py-1 rounded-full text-xs ${severityColor}`}>
            {severity.toUpperCase()} SEVERITY
          </span>
        </div>

        {/* 🧪 Treatment */}
        {rawResponse?.treatment && (
          <div>
            <h3 className="text-sm font-semibold mb-2">Suggested Treatment</h3>

            <ul className="space-y-2 text-sm text-foreground/70">
              {rawResponse.treatment.map((step: string, index: number) => (
                <li key={index}>• {step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </AnimatedContainer>
  )
}
