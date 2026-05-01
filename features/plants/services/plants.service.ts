import type { Plant, CarePlan, GrowthLog } from '@/types/plant'
import { apiRequest } from '@/lib/api/client'

/* =========================================
   GET ALL PLANTS
========================================= */

export async function getPlants() {
  return apiRequest<Plant[]>('/api/plants')
}

/* =========================================
   GET SINGLE PLANT
========================================= */

export async function getPlant(plantId: string) {
  return apiRequest<Plant>(`/api/plants/${plantId}`)
}

/* =========================================
   CREATE PLANT
========================================= */

export async function createPlant(body: {
  name: string
  species?: string
  location?: string
  tags?: string[]
  imageUrl?: string | null
}) {
  return apiRequest<Plant>('/api/plants/create', {
    method: 'POST',
    body,
  })
}

/* =========================================
   UPDATE PLANT
========================================= */

export async function updatePlant(plantId: string, body: Partial<Plant>) {
  return apiRequest<Plant>(`/api/plants/${plantId}`, {
    method: 'PATCH',
    body,
  })
}

/* =========================================
   DELETE PLANT
========================================= */

export async function deletePlant(plantId: string) {
  return apiRequest<{ success: true }>(`/api/plants/${plantId}`, {
    method: 'DELETE',
  })
}

/* =========================================
   GET CARE PLAN
========================================= */

export async function getCarePlan(plantId: string) {
  return apiRequest<CarePlan>(`/api/plants/${plantId}/care-plan`)
}

/* =========================================
   GENERATE CARE PLAN
========================================= */

export async function generateCarePlan(plantId: string) {
  return apiRequest<CarePlan>('/api/ai/care-plan', {
    method: 'POST',
    body: { plantId },
  })
}

/* =========================================
   GET GROWTH LOGS
========================================= */

export async function getGrowthLogs(plantId: string) {
  return apiRequest<GrowthLog[]>(`/api/logs/${plantId}`)
}

export async function createGrowthLog(body: {
  plantId: string
  height: number | null
  leafCount: number | null
  healthScore: number | null
  notes: string | null
}) {
  return apiRequest<GrowthLog>('/api/logs/add', {
    method: 'POST',
    body,
  })
}
