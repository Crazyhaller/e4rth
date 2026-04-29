/* =========================================
   PLANT ANALYTICS
========================================= */

export interface PlantAnalytics {
  averageHealthScore: number

  latestHeight: number | null

  totalLogs: number

  diseaseCount: number
}

/* =========================================
   GLOBAL ANALYTICS
========================================= */

export interface GlobalAnalytics {
  totalPlants: number

  totalScans: number

  totalNotifications: number

  healthyPlants: number
}
