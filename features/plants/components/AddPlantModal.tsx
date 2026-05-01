'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { notify } from '@/lib/toast'
import { createPlant } from '../services/plants.service'
import { uploadScanImage } from '@/features/scan/services/scan.service'

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
  const [preview, setPreview] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const handleSubmit = async () => {
    if (!form.name.trim()) return

    try {
      setLoading(true)

      await createPlant({
        name: form.name,
        species: form.species,
        location: form.location,
        imageUrl: imageUrl ?? null,
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

  const handleImageSelect = async (file: File) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      setPreview(reader.result as string)
    }

    reader.readAsDataURL(file)
    setUploadingImage(true)
    setImageUrl(null)

    try {
      const result = await uploadScanImage(file)
      setImageUrl(result.secure_url)
      notify.success('Image uploaded successfully')
    } catch (err) {
      console.error('Image upload failed:', err)
      notify.error('Failed to upload image.')
    } finally {
      setUploadingImage(false)
    }
  }

  const clearImage = () => {
    setPreview(null)
    setImageUrl(null)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-soil/70 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="mx-auto flex h-full max-h-[calc(100vh-4rem)] w-full max-w-lg flex-col overflow-hidden rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-glass backdrop-blur-2xl"
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
          >
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                    New plant
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold">
                    Add to your collection
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-foreground/62">
                    Give E4rth enough context to build better care plans and
                    scan history.
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
                {preview ? (
                  <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-background/45 p-3">
                    <img
                      src={preview}
                      alt="Plant preview"
                      className="h-52 w-full rounded-3xl object-cover"
                    />
                    <button
                      onClick={clearImage}
                      type="button"
                      className="mt-3 inline-flex items-center rounded-full border border-border/70 bg-card px-3 py-2 text-sm transition hover:bg-primary/10"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background/45 px-4 py-6 text-center transition hover:border-primary/50 hover:bg-primary/10">
                    <span className="text-sm font-medium">Upload an image</span>
                    <span className="mt-1 text-xs text-foreground/55">
                      Optional but helpful for plant history
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0]
                        if (file) handleImageSelect(file)
                      }}
                      className="sr-only"
                    />
                  </label>
                )}

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
              </div>
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
