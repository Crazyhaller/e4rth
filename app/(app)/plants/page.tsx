'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Plus, Search, Sparkles } from 'lucide-react'
import { useState } from 'react'
import AnimatedContainer from '@/components/shared/AnimatedContainer'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'
import AddPlantModal from '@/features/plants/components/AddPlantModal'
import { usePlants } from '@/features/plants/hooks/usePlants'

const plantImages = [
  'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=900&q=80',
]

export default function PlantsPage() {
  const [openModal, setOpenModal] = useState(false)
  const { plants, loading, error, refreshPlants } = usePlants()

  if (error) {
    return (
      <ErrorState
        title="Plant collection unavailable"
        message={error}
        onRetry={refreshPlants}
      />
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-36 animate-pulse rounded-[2rem] bg-card/60" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-[2rem] border border-border/70 bg-card/60"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-7">
      <section className="surface overflow-hidden">
        <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/45 px-3 py-1.5 text-xs text-foreground/58">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Botanical portfolio
            </div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Your living collection, beautifully organized.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/64">
              Track species, locations, tags, care plans, growth history, and AI
              scan results from a premium plant management workspace.
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="btn-primary w-full md:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Plant
          </button>
        </div>
      </section>

      {plants.length === 0 ? (
        <AnimatedContainer>
          <EmptyState
            title="No plants yet"
            description="Add your first plant and E4rth will start building its care plan, timeline, and health intelligence."
            action={
              <button
                onClick={() => setOpenModal(true)}
                className="btn-primary"
              >
                Add Your First Plant
              </button>
            }
          />
        </AnimatedContainer>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plants.map((plant, index) => (
            <AnimatedContainer key={plant.id} delay={index * 0.04}>
              <Link
                href={`/plants/${plant.id}`}
                className="group block overflow-hidden rounded-[2rem] border border-border/70 bg-card/72 shadow-soft backdrop-blur-xl transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-glass"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={
                      plant.imageUrl ?? plantImages[index % plantImages.length]
                    }
                    alt={plant.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-soil/78 via-soil/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-semibold">{plant.name}</h3>
                    {plant.species && (
                      <p className="mt-1 text-sm text-white/72">
                        {plant.species}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-foreground/62">
                      <MapPin className="h-4 w-4 text-primary" />
                      {plant.location || 'Location not set'}
                    </div>
                    <Search className="h-4 w-4 text-foreground/38 transition group-hover:text-primary" />
                  </div>

                  {plant.tags && plant.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {plant.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs text-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </AnimatedContainer>
          ))}
        </div>
      )}

      <AddPlantModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={refreshPlants}
      />
    </div>
  )
}
