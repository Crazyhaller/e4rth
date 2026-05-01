export default function TypingIndicator() {
  return (
    <div className="surface inline-flex items-center gap-2 px-4 py-3">
      <span className="h-2 w-2 animate-pulse rounded-full bg-e4rth-400" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-e4rth-300 [animation-delay:120ms]" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-e4rth-200 [animation-delay:240ms]" />
    </div>
  )
}
