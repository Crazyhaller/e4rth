/* =========================================
   PLANT ANALYTICS
========================================= */

export interface PlantAnalytics {
  averageHealthScore: number

  latestHeight: number | null

  totalLogs: number

  diseaseCount: number

  logs: GrowthLog[]
}

/* =========================================
   GLOBAL ANALYTICS
========================================= */

export interface GlobalAnalytics {
  totalPlants: number

  totalScans: number

  totalNotifications: number

  healthyPlants: number

  unreadNotifications: number

  averageHealthScore: number
}
import type { GrowthLog } from './plant'
