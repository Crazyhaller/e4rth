'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AnimatedContainer from '@/components/shared/AnimatedContainer'
import GrowthChart from '@/features/analytics/components/GrowthChart'
import AddGrowthLogForm from '@/features/analytics/components/AddGrowthLogForm'
import { notify } from '@/lib/toast'

type Plant = {
  id: string
  name: string
  species?: string | null
  location?: string | null
  tags?: string[] | null
}

export default function PlantDetailPage() {
  const { plantId } = useParams()
  const router = useRouter()

  const [plant, setPlant] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [carePlan, setCarePlan] = useState<any>(null)
  const [loadingPlan, setLoadingPlan] = useState(false)
  const [refreshLogs, setRefreshLogs] = useState(0)

  const [form, setForm] = useState({
    name: '',
    species: '',
    location: '',
    tags: '',
  })

  // FETCH CARE PLAN
  const fetchCarePlan = async () => {
    try {
      const res = await fetch(`/api/plants/${plantId}/care-plan`)
      const data = await res.json()

      if (!data.error) {
        setCarePlan(data)
      }
    } catch (err) {
      console.error('Failed to fetch care plan:', err)
    }
  }

  // FETCH PLANT
  const fetchPlant = async () => {
    try {
      const res = await fetch(`/api/plants/${plantId}`)
      const data = await res.json()
      setPlant(data)

      await fetchCarePlan()

      setForm({
        name: data.name || '',
        species: data.species || '',
        location: data.location || '',
        tags: data.tags?.join(', ') || '',
      })
    } catch (err) {
      console.error('Fetch plant failed:', err)
    } finally {
      setLoading(false)
    }
  }

  // GENERATE CARE PLAN
  const handleGeneratePlan = async () => {
    try {
      setLoadingPlan(true)

      const res = await fetch('/api/ai/care-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plantId }),
      })

      const data = await res.json()

      setCarePlan(data)
      notify.success('Care plan generated 🌱')
    } catch (err) {
      console.error('Generate plan failed:', err)
      notify.error('Failed to generate care plan.')
    } finally {
      setLoadingPlan(false)
    }
  }

  useEffect(() => {
    if (plantId) fetchPlant()
  }, [plantId])

  /* =========================
     UPDATE
  ========================= */
  const handleUpdate = async () => {
    try {
      await fetch(`/api/plants/${plantId}`, {
        method: 'PATCH',
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

      setEditing(false)
      fetchPlant()
      notify.success('Plant updated')
    } catch (err) {
      console.error('Update failed:', err)
      notify.error('Failed to update plant.')
    }
  }

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this plant?')

    if (!confirmDelete) return

    try {
      await fetch(`/api/plants/${plantId}`, {
        method: 'DELETE',
      })

      notify.success('Plant deleted')
      router.push('/plants')
    } catch (err) {
      console.error('Delete failed:', err)
      notify.error('Failed to delete plant.')
    }
  }

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return <div className="h-40 bg-white/5 animate-pulse rounded-2xl" />
  }

  if (!plant) {
    return <div>Plant not found</div>
  }

  return (
    <div className="space-y-6">
      {/* 🌿 HEADER */}
      <AnimatedContainer>
        <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
          {!editing ? (
            <>
              <h1 className="text-2xl font-semibold">{plant.name}</h1>

              {plant.species && (
                <p className="text-sm text-foreground/60">{plant.species}</p>
              )}

              {plant.location && (
                <p className="text-xs text-foreground/50">
                  📍 {plant.location}
                </p>
              )}

              {plant.tags && plant.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
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

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl bg-red-500/80 text-white text-sm"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              {/* ✏️ Edit Form */}
              <div className="space-y-3">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10"
                />

                <input
                  value={form.species}
                  onChange={(e) =>
                    setForm({ ...form, species: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10"
                />

                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10"
                />

                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded-xl bg-gradient-verdant text-white text-sm shadow-glow"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-sm"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </AnimatedContainer>

      {/* 🌱 Features */}

      <div className="space-y-6">
        {/* 🌿 Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 🌱 Care Plan */}
          <AnimatedContainer className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Care Plan</h3>

                <button
                  onClick={handleGeneratePlan}
                  className="px-3 py-1 text-xs rounded-xl bg-gradient-verdant text-white shadow-glow"
                >
                  {loadingPlan
                    ? 'Generating...'
                    : carePlan
                      ? 'Regenerate'
                      : 'Generate'}
                </button>
              </div>

              {!carePlan ? (
                <p className="text-sm text-foreground/60">
                  No care plan yet. Generate one using AI.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-foreground/60">Watering</p>
                    <p className="font-medium">
                      Every {carePlan.wateringFrequency} days
                    </p>
                  </div>

                  <div>
                    <p className="text-foreground/60">Sunlight</p>
                    <p className="font-medium">{carePlan.sunlight}</p>
                  </div>

                  <div>
                    <p className="text-foreground/60">Fertilizer</p>
                    <p className="font-medium">{carePlan.fertilizer}</p>
                  </div>

                  <div>
                    <p className="text-foreground/60">Notes</p>
                    <p className="text-foreground/70">{carePlan.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </AnimatedContainer>

          {/* ⚠️ Alerts / Insights */}
          <AnimatedContainer delay={0.05}>
            <div className="glass rounded-2xl p-6 border border-white/10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-3">Insights</h3>

                <p className="text-sm text-foreground/70">
                  Your plant health looks stable. Consider tracking growth logs
                  for better insights.
                </p>
              </div>

              <p className="text-xs text-foreground/50 mt-4">
                AI powered suggestion
              </p>
            </div>
          </AnimatedContainer>
        </div>

        {/* Add Growth Log Form */}
        <AnimatedContainer>
          <AddGrowthLogForm
            plantId={plant.id}
            onSuccess={() => setRefreshLogs((prev) => prev + 1)}
          />
        </AnimatedContainer>

        {/* 📊 Row 2 → FULL WIDTH CHART */}
        <AnimatedContainer>
          <GrowthChart plantId={plant.id} refreshKey={refreshLogs} />
        </AnimatedContainer>
      </div>
    </div>
  )
}
