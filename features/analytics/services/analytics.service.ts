import { apiRequest } from '@/lib/api/client'
import type { GlobalAnalytics, PlantAnalytics } from '@/types/analytics'

export async function getGlobalAnalytics() {
  return apiRequest<GlobalAnalytics>('/api/analytics/global')
}

export async function getPlantAnalytics(plantId: string) {
  return apiRequest<PlantAnalytics>(`/api/analytics/plant/${plantId}`)
}
