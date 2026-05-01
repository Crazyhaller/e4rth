import TimelineItem from './TimelineItem'

export default function TimelineFeed({
  items,
}: {
  items: Array<{ title: string; description: string; date: string }>
}) {
  if (items.length === 0) {
    return <p className="text-sm text-foreground/60">No timeline events yet.</p>
  }

  return (
    <div className="glass rounded-2xl border border-white/10 p-5">
      <h3 className="mb-5 text-lg font-semibold">Timeline</h3>
      {items.map((item) => (
        <TimelineItem key={`${item.title}-${item.date}`} {...item} />
      ))}
    </div>
  )
}
