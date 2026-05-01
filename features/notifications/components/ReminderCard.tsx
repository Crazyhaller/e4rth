import { CalendarClock } from 'lucide-react'

export default function ReminderCard({
  title,
  description,
  tone = 'default',
}: {
  title: string
  description: string
  tone?: 'default' | 'urgent'
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/42 p-4 shadow-soft">
      <div className="flex items-start gap-3">
        <CalendarClock
          className={`mt-0.5 h-5 w-5 ${
            tone === 'urgent' ? 'text-yellow-300' : 'text-e4rth-300'
          }`}
        />
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-foreground/65">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
