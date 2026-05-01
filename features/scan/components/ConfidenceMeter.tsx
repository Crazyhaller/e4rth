export default function ConfidenceMeter({ value }: { value: number }) {
  const normalized = Math.max(0, Math.min(100, Math.round(value)))

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-foreground/60">Confidence</span>
        <span className="font-medium">{normalized}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-e4rth transition-all duration-700"
          style={{ width: `${normalized}%` }}
        />
      </div>
    </div>
  )
}
