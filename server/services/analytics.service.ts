import { db } from '@/lib/db'

import { growthLogs, notifications, plants, scans } from '@/lib/db/schema'

import { avg, count, desc, eq } from 'drizzle-orm'

/* =========================================
   PLANT ANALYTICS
========================================= */

export async function getPlantAnalyticsService(plantId: string) {
  /**
   * 📈 Growth logs
   */
  const logs = await db.query.growthLogs.findMany({
    where: eq(growthLogs.plantId, plantId),

    orderBy: [desc(growthLogs.createdAt)],
  })

  /**
   * 🌿 Average health
   */
  const avgHealth = await db
    .select({
      value: avg(growthLogs.healthScore),
    })
    .from(growthLogs)
    .where(eq(growthLogs.plantId, plantId))

  /**
   * 📸 Disease scans
   */
  const diseaseCount = await db
    .select({
      count: count(),
    })
    .from(scans)
    .where(eq(scans.plantId, plantId))

  return {
    averageHealthScore: Number(avgHealth[0]?.value ?? 0),

    latestHeight: logs[0]?.height ?? null,

    totalLogs: logs.length,

    diseaseCount: diseaseCount[0]?.count ?? 0,

    logs,
  }
}

/* =========================================
   GLOBAL ANALYTICS
========================================= */

export async function getGlobalAnalyticsService(userId: string) {
  /**
   * 🌱 Total plants
   */
  const totalPlants = await db
    .select({
      count: count(),
    })
    .from(plants)
    .where(eq(plants.userId, userId))

  /**
   * 📸 Total scans
   */
  const totalScans = await db
    .select({
      count: count(),
    })
    .from(scans)
    .where(eq(scans.userId, userId))

  /**
   * 🔔 Notifications
   */
  const totalNotifications = await db
    .select({
      count: count(),
    })
    .from(notifications)
    .where(eq(notifications.userId, userId))

  /**
   * 🌿 Healthy plants estimate
   */
  const healthyPlants = await db
    .select({
      count: count(),
    })
    .from(scans)
    .where(eq(scans.severity, 'low'))

  return {
    totalPlants: totalPlants[0]?.count ?? 0,

    totalScans: totalScans[0]?.count ?? 0,

    totalNotifications: totalNotifications[0]?.count ?? 0,

    healthyPlants: healthyPlants[0]?.count ?? 0,
  }
}
