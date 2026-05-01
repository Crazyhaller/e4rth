import { Radio } from 'lucide-react'

export default function LiveAlertToast() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs text-primary">
      <Radio className="h-3.5 w-3.5" />
      Live alerts enabled
    </div>
  )
}
