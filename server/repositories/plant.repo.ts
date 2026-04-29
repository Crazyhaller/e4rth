import { db } from '@/lib/db'

import { plants, carePlans, growthLogs, scans } from '@/lib/db/schema'

import { eq, and, desc } from 'drizzle-orm'

import type {
  CreatePlantInput,
  UpdatePlantInput,
  GrowthLogInput,
} from '@/lib/validators/plant.validator'

/* =========================================
   CREATE PLANT
========================================= */

export async function createPlant({
  userId,
  data,
}: {
  userId: string
  data: CreatePlantInput
}) {
  const created = await db
    .insert(plants)
    .values({
      userId,
      name: data.name,
      species: data.species ?? null,
      location: data.location ?? null,
      tags: data.tags ?? [],
    })
    .returning()

  return created[0]
}

/* =========================================
   GET ALL USER PLANTS
========================================= */

export async function getUserPlants(userId: string) {
  return db.query.plants.findMany({
    where: eq(plants.userId, userId),

    orderBy: [desc(plants.createdAt)],
  })
}

/* =========================================
   GET PLANT BY ID
========================================= */

export async function getPlantById({
  userId,
  plantId,
}: {
  userId: string
  plantId: string
}) {
  return db.query.plants.findFirst({
    where: and(eq(plants.id, plantId), eq(plants.userId, userId)),
  })
}

/* =========================================
   UPDATE PLANT
========================================= */

export async function updatePlant({
  userId,
  plantId,
  data,
}: {
  userId: string
  plantId: string
  data: UpdatePlantInput
}) {
  const updated = await db
    .update(plants)
    .set({
      ...data,
    })
    .where(and(eq(plants.id, plantId), eq(plants.userId, userId)))
    .returning()

  return updated[0]
}

/* =========================================
   DELETE PLANT
========================================= */

export async function deletePlant({
  userId,
  plantId,
}: {
  userId: string
  plantId: string
}) {
  const deleted = await db
    .delete(plants)
    .where(and(eq(plants.id, plantId), eq(plants.userId, userId)))
    .returning()

  return deleted[0]
}

/* =========================================
   GET CARE PLAN
========================================= */

export async function getPlantCarePlan(plantId: string) {
  return db.query.carePlans.findFirst({
    where: eq(carePlans.plantId, plantId),
  })
}

/* =========================================
   UPSERT CARE PLAN
========================================= */

export async function upsertCarePlan({
  plantId,
  wateringFrequency,
  sunlight,
  fertilizer,
  notes,
}: {
  plantId: string

  wateringFrequency: number

  sunlight: string

  fertilizer: string

  notes: string
}) {
  const existing = await db.query.carePlans.findFirst({
    where: eq(carePlans.plantId, plantId),
  })

  if (existing) {
    const updated = await db
      .update(carePlans)
      .set({
        wateringFrequency,
        sunlight,
        fertilizer,
        notes,
        updatedAt: new Date(),
      })
      .where(eq(carePlans.plantId, plantId))
      .returning()

    return updated[0]
  }

  const created = await db
    .insert(carePlans)
    .values({
      plantId,
      wateringFrequency,
      sunlight,
      fertilizer,
      notes,
    })
    .returning()

  return created[0]
}

/* =========================================
   CREATE GROWTH LOG
========================================= */

export async function createGrowthLog(data: GrowthLogInput) {
  const created = await db
    .insert(growthLogs)
    .values({
      plantId: data.plantId,
      height: data.height ?? null,
      leafCount: data.leafCount ?? null,
      healthScore: data.healthScore ?? null,
      notes: data.notes ?? null,
    })
    .returning()

  return created[0]
}

/* =========================================
   GET PLANT GROWTH LOGS
========================================= */

export async function getPlantGrowthLogs(plantId: string) {
  return db.query.growthLogs.findMany({
    where: eq(growthLogs.plantId, plantId),

    orderBy: [desc(growthLogs.createdAt)],
  })
}

/* =========================================
   GET PLANT SCANS
========================================= */

export async function getPlantScans(plantId: string) {
  return db.query.scans.findMany({
    where: eq(scans.plantId, plantId),

    orderBy: [desc(scans.createdAt)],
  })
}
