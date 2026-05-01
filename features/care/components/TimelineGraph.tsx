export default function TimelineGraph({
  items,
}: {
  items: Array<{ label: string; value: string }>
}) {
  return (
    <div className="surface p-6">
      <h3 className="text-lg font-semibold">Timeline Signals</h3>
      <div className="mt-5 space-y-4">
        {items.map((item, index) => (
          <div key={item.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="h-3 w-3 rounded-full bg-primary shadow-glow" />
              {index < items.length - 1 && (
                <span className="mt-2 h-10 w-px bg-border" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="mt-1 text-xs text-foreground/55">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
