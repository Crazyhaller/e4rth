import { cn } from '@/lib/utils'

export default function Loader({
  label = 'Loading',
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 text-sm text-foreground/70 shadow-soft backdrop-blur-xl',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-e4rth-400 border-t-transparent" />
      {label}
    </div>
  )
}
