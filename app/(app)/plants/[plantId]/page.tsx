'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import AnimatedContainer from '@/components/shared/AnimatedContainer'

type Plant = {
  id: string
  name: string
  species?: string | null
  location?: string | null
  tags?: string[] | null
}

export default function PlantDetailPage() {
  const { plantId } = useParams()

  const [plant, setPlant] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!plantId) return

    const fetchPlant = async () => {
      try {
        const res = await fetch(`/api/plants/${plantId}`)
        const data = await res.json()
        setPlant(data)
      } catch (error) {
        console.error('Failed to fetch plant:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlant()
  }, [plantId])

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-40 bg-white/5 animate-pulse rounded-xl" />
        <div className="h-32 bg-white/5 animate-pulse rounded-2xl" />
      </div>
    )
  }

  /* =========================
     NOT FOUND
  ========================= */
  if (!plant) {
    return (
      <AnimatedContainer>
        <div className="glass rounded-2xl p-10 text-center border border-white/10">
          <h2 className="text-xl font-semibold mb-2">Plant not found 🌿</h2>
          <p className="text-sm text-foreground/70">
            This plant may have been deleted or does not exist.
          </p>
        </div>
      </AnimatedContainer>
    )
  }

  /* =========================
     MAIN UI
  ========================= */
  return (
    <div className="space-y-6">
      {/* 🌿 HEADER */}
      <AnimatedContainer>
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h1 className="text-2xl font-semibold">{plant.name}</h1>

          {plant.species && (
            <p className="text-sm text-foreground/60 mt-1">{plant.species}</p>
          )}

          {plant.location && (
            <p className="text-xs text-foreground/50 mt-2">
              📍 {plant.location}
            </p>
          )}

          {plant.tags && plant.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
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
        </div>
      </AnimatedContainer>

      {/* 🌱 FUTURE SECTIONS PLACEHOLDER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnimatedContainer className="lg:col-span-2">
          <div className="glass rounded-2xl p-6 border border-white/10 h-40 flex items-center justify-center text-foreground/60">
            Care Plan (coming next)
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.1}>
          <div className="glass rounded-2xl p-6 border border-white/10 h-40 flex items-center justify-center text-foreground/60">
            Insights / Alerts
          </div>
        </AnimatedContainer>
      </div>
    </div>
  )
}
