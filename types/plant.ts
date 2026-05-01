/* =========================================
   PLANT
========================================= */

export interface Plant {
  id: string

  userId: string

  name: string

  species: string | null

  location: string | null

  imageUrl?: string | null

  tags: string[]

  createdAt: string
}

/* =========================================
   CARE PLAN
========================================= */

export interface CarePlan {
  id: string

  plantId: string

  wateringFrequency: number

  sunlight: string

  fertilizer: string

  notes: string

  updatedAt: string
}

/* =========================================
   GROWTH LOG
========================================= */

export interface GrowthLog {
  id: string

  plantId: string

  height: number | null

  leafCount: number | null

  healthScore: number | null

  notes: string | null

  createdAt: string
}
