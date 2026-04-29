'use client'

import { useState } from 'react'

interface Props {
  plantId: string
  onSuccess: () => void
}

export default function AddGrowthLogForm({ plantId, onSuccess }: Props) {
  const [form, setForm] = useState({
    height: '',
    leafCount: '',
    healthScore: '',
    notes: '',
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)

      await fetch('/api/logs/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plantId,
          height: Number(form.height) || null,
          leafCount: Number(form.leafCount) || null,
          healthScore: Number(form.healthScore) || null,
          notes: form.notes || null,
        }),
      })

      setForm({
        height: '',
        leafCount: '',
        healthScore: '',
        notes: '',
      })

      onSuccess()
    } catch (err) {
      console.error('Add log failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass rounded-2xl p-5 border border-white/10 space-y-4">
      <h3 className="text-sm font-semibold">Add Growth Log</h3>

      <div className="grid grid-cols-2 gap-3">
        <input
          placeholder="Height (cm)"
          value={form.height}
          onChange={(e) => setForm({ ...form, height: e.target.value })}
          className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
        />

        <input
          placeholder="Leaf Count"
          value={form.leafCount}
          onChange={(e) => setForm({ ...form, leafCount: e.target.value })}
          className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm"
        />

        <input
          placeholder="Health Score (0-100)"
          value={form.healthScore}
          onChange={(e) =>
            setForm({
              ...form,
              healthScore: e.target.value,
            })
          }
          className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm col-span-2"
        />

        <input
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm col-span-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full px-4 py-2 rounded-xl bg-gradient-e4rth text-white text-sm shadow-glow"
      >
        {loading ? 'Saving...' : 'Add Log'}
      </button>
    </div>
  )
}
