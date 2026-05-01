import type { GrowthLog } from '@/types/plant'

export default function LogEntryCard({ log }: { log: GrowthLog }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          {log.createdAt ? new Date(log.createdAt).toLocaleDateString() : 'Log'}
        </p>
        {typeof log.healthScore === 'number' && (
          <span className="rounded-full bg-e4rth-500/10 px-2 py-1 text-xs text-e4rth-200">
            {log.healthScore}% health
          </span>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-foreground/65">
        <span>Height: {log.height ?? '-'} cm</span>
        <span>Leaves: {log.leafCount ?? '-'}</span>
      </div>
      {log.notes && <p className="mt-3 text-sm text-foreground/70">{log.notes}</p>}
    </div>
  )
}
