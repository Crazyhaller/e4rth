'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddPlantModal({ open, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    species: '',
    location: '',
    tags: '',
  })

  const handleSubmit = async () => {
    if (!form.name.trim()) return

    try {
      setLoading(true)

      await fetch('/api/plants/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          species: form.species,
          location: form.location,
          tags: form.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      })

      onSuccess()
      onClose()

      setForm({
        name: '',
        species: '',
        location: '',
        tags: '',
      })
    } catch (err) {
      console.error('Failed to create plant:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl glass border border-white/10 p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-lg font-semibold mb-4">Add New Plant 🌱</h2>

            <div className="space-y-3">
              <input
                placeholder="Plant Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none"
              />

              <input
                placeholder="Species"
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none"
              />

              <input
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none"
              />

              <input
                placeholder="Tags (comma separated)"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-white/10 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-gradient-verdant text-white text-sm shadow-glow"
              >
                {loading ? 'Adding...' : 'Add Plant'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
