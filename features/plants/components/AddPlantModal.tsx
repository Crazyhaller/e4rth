'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { notify } from '@/lib/toast'
import { createPlant } from '../services/plants.service'

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

      await createPlant({
        name: form.name,
        species: form.species,
        location: form.location,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      })

      onSuccess()
      onClose()

      setForm({
        name: '',
        species: '',
        location: '',
        tags: '',
      })
      notify.success('Plant added successfully')
    } catch (err) {
      console.error('Failed to create plant:', err)
      notify.error('Failed to add plant.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-soil/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-glass backdrop-blur-2xl"
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  New plant
                </p>
                <h2 className="mt-1 text-2xl font-semibold">
                  Add to your collection
                </h2>
                <p className="mt-2 text-sm leading-6 text-foreground/62">
                  Give E4rth enough context to build better care plans and scan
                  history.
                </p>
              </div>
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-border/70 hover:bg-primary/10 hover:cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                ['name', 'Plant name *'],
                ['species', 'Species'],
                ['location', 'Location'],
                ['tags', 'Tags, comma separated'],
              ].map(([key, label]) => (
                <label key={key} className="block">
                  <span className="mb-1.5 block text-xs font-medium text-foreground/55">
                    {label}
                  </span>
                  <input
                    value={form[key as keyof typeof form]}
                    onChange={(event) =>
                      setForm({ ...form, [key]: event.target.value })
                    }
                    className="w-full rounded-2xl border border-border/70 bg-background/45 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-background/70"
                  />
                </label>
              ))}
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button onClick={onClose} className="btn-secondary">
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
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
