export default function TimelineItem({
  title,
  description,
  date,
}: {
  title: string
  description: string
  date: string
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span className="h-3 w-3 rounded-full bg-e4rth-400 shadow-glow" />
        <span className="mt-2 h-full min-h-10 w-px bg-white/10" />
      </div>
      <div className="pb-5">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-sm text-foreground/65">{description}</p>
        <p className="mt-2 text-xs text-foreground/40">{date}</p>
      </div>
    </div>
  )
}
