export default function DiagnosisLoader() {
  return (
    <div className="surface p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-e4rth-400 border-t-transparent" />
        <span className="text-sm text-foreground/70">
          Analyzing leaf texture, color, and visible stress patterns
        </span>
      </div>
      <div className="space-y-3">
        <div className="h-4 w-1/2 animate-pulse rounded bg-primary/12" />
        <div className="h-3 w-full animate-pulse rounded bg-primary/10" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-primary/10" />
      </div>
    </div>
  )
}
