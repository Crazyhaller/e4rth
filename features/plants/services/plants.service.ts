import type { Plant, CarePlan, GrowthLog } from '@/types/plant'

/* =========================================
   GET ALL PLANTS
========================================= */

export async function getPlants() {
  const res = await fetch('/api/plants')

  if (!res.ok) {
    throw new Error('Failed to fetch plants')
  }

  return (await res.json()) as Plant[]
}

/* =========================================
   GET SINGLE PLANT
========================================= */

export async function getPlant(plantId: string) {
  const res = await fetch(`/api/plants/${plantId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch plant')
  }

  return (await res.json()) as Plant
}

/* =========================================
   CREATE PLANT
========================================= */

export async function createPlant(body: {
  name: string
  species?: string
  location?: string
  tags?: string[]
}) {
  const res = await fetch('/api/plants/create', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = await res.json()

    throw new Error(error.error || 'Failed to create plant')
  }

  return (await res.json()) as Plant
}

/* =========================================
   UPDATE PLANT
========================================= */

export async function updatePlant(plantId: string, body: Partial<Plant>) {
  const res = await fetch(`/api/plants/${plantId}`, {
    method: 'PATCH',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error('Failed to update plant')
  }

  return (await res.json()) as Plant
}

/* =========================================
   DELETE PLANT
========================================= */

export async function deletePlant(plantId: string) {
  const res = await fetch(`/api/plants/${plantId}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete plant')
  }

  return res.json()
}

/* =========================================
   GET CARE PLAN
========================================= */

export async function getCarePlan(plantId: string) {
  const res = await fetch(`/api/plants/${plantId}/care-plan`)

  if (!res.ok) {
    throw new Error('Failed to fetch care plan')
  }

  return (await res.json()) as CarePlan
}

/* =========================================
   GENERATE CARE PLAN
========================================= */

export async function generateCarePlan(plantId: string) {
  const res = await fetch('/api/ai/care-plan', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      plantId,
    }),
  })

  if (!res.ok) {
    throw new Error('Failed to generate care plan')
  }

  return (await res.json()) as CarePlan
}

/* =========================================
   GET GROWTH LOGS
========================================= */

export async function getGrowthLogs(plantId: string) {
  const res = await fetch(`/api/logs/${plantId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch growth logs')
  }

  return (await res.json()) as GrowthLog[]
}
