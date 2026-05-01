import { db } from '@/lib/db'

import { growthLogs, notifications, plants, scans } from '@/lib/db/schema'

import { and, avg, count, desc, eq, inArray, isNotNull } from 'drizzle-orm'
import { getPlantById } from '../repositories/plant.repo'

/* =========================================
   PLANT ANALYTICS
========================================= */

export async function getPlantAnalyticsService({
  userId,
  plantId,
}: {
  userId: string
  plantId: string
}) {
  const plant = await getPlantById({
    userId,
    plantId,
  })

  if (!plant) {
    throw new Error('Plant not found')
  }

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
    .where(and(eq(scans.userId, userId), eq(scans.severity, 'low')))

  const unreadNotifications = await db
    .select({
      count: count(),
    })
    .from(notifications)
    .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)))

  const userPlants = await db.query.plants.findMany({
    where: eq(plants.userId, userId),
  })

  const plantIds = userPlants.map((plant) => plant.id)

  const healthRows = plantIds.length
    ? await db
        .select({
          value: avg(growthLogs.healthScore),
        })
        .from(growthLogs)
        .where(
          and(
            inArray(growthLogs.plantId, plantIds),
            isNotNull(growthLogs.healthScore),
          ),
        )
    : [{ value: 0 }]

  return {
    totalPlants: totalPlants[0]?.count ?? 0,

    totalScans: totalScans[0]?.count ?? 0,

    totalNotifications: totalNotifications[0]?.count ?? 0,

    healthyPlants: healthyPlants[0]?.count ?? 0,

    unreadNotifications: unreadNotifications[0]?.count ?? 0,

    averageHealthScore: Number(healthRows[0]?.value ?? 0),
  }
}
