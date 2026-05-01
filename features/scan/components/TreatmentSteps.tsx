import { CheckCircle2 } from 'lucide-react'

export default function TreatmentSteps({ steps }: { steps: string[] }) {
  if (steps.length === 0) return null

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">Suggested Treatment</h3>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div
            key={`${step}-${index}`}
            className="flex gap-3 rounded-2xl border border-border/70 bg-background/42 p-3 text-sm text-foreground/75"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-e4rth-400" />
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
