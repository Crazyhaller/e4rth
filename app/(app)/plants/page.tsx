'use client'

import { useEffect, useState } from 'react'
import AnimatedContainer from '@/components/shared/AnimatedContainer'
import AddPlantModal from '@/features/plants/components/AddPlantModal'
import Link from 'next/link'
import UploadDropzone from '@/features/scan/components/UploadDropzone'

type Plant = {
  id: string
  name: string
  species?: string | null
  location?: string | null
  tags?: string[] | null
}

export default function PlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  const fetchPlants = async () => {
    try {
      const res = await fetch('/api/plants')
      const data = await res.json()
      setPlants(data)
    } catch (error) {
      console.error('Failed to fetch plants:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlants()
  }, [])

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-40 bg-white/5 animate-pulse rounded-xl" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-2xl bg-white/5 animate-pulse border border-white/10"
            />
          ))}
        </div>
      </div>
    )
  }

  /* =========================
     MAIN CONTENT
  ========================= */
  return (
    <div className="space-y-6">
      {/* 🌿 Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">My Plants 🌱</h2>
          <p className="text-sm text-foreground/70 mt-1">
            Manage and track all your plants in one place.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="px-5 py-2 rounded-xl bg-gradient-verdant text-white text-sm shadow-glow hover:opacity-90 transition"
        >
          + Add Plant
        </button>
      </div>

      <UploadDropzone
        onResult={(data) => {
          console.log('Scan result:', data)
        }}
      />

      {/* 🌱 EMPTY STATE */}
      {plants.length === 0 ? (
        <AnimatedContainer>
          <div className="glass rounded-2xl p-10 text-center border border-white/10">
            <h2 className="text-xl font-semibold mb-2">No plants yet 🌱</h2>
            <p className="text-sm text-foreground/70">
              Start by adding your first plant and track its growth with AI.
            </p>

            <button
              onClick={() => setOpenModal(true)}
              className="mt-6 px-5 py-2 rounded-xl bg-gradient-verdant text-white text-sm shadow-glow"
            >
              Add Your First Plant
            </button>
          </div>
        </AnimatedContainer>
      ) : (
        /* 🌿 GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant, index) => (
            <AnimatedContainer key={plant.id} delay={index * 0.05}>
              <Link
                href={`/plants/${plant.id}`}
                className="block glass rounded-2xl p-5 border border-white/10 hover:shadow-glow transition hover:scale-[1.02]"
              >
                <h3 className="text-lg font-semibold">{plant.name}</h3>

                {plant.species && (
                  <p className="text-sm text-foreground/60 mt-1">
                    {plant.species}
                  </p>
                )}

                {plant.location && (
                  <p className="text-xs text-foreground/50 mt-2">
                    📍 {plant.location}
                  </p>
                )}

                {plant.tags && plant.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {plant.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-verdant-500/10 text-verdant-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </AnimatedContainer>
          ))}
        </div>
      )}

      {/* 🌿 MODAL */}
      <AddPlantModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchPlants}
      />
    </div>
  )
}
