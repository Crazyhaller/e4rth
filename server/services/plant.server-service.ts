import {
  createPlant,
  deletePlant,
  getPlantById,
  getPlantCarePlan,
  getPlantGrowthLogs,
  getUserPlants,
  updatePlant,
  upsertCarePlan,
  createGrowthLog,
} from '@/server/repositories/plant.repo'

import {
  createPlantSchema,
  updatePlantSchema,
  growthLogSchema,
} from '@/lib/validators/plant.validator'

import { generateCarePlan } from '@/lib/ai/gemini'

/* =========================================
   CREATE PLANT
========================================= */

export async function createPlantService({
  userId,
  body,
}: {
  userId: string
  body: unknown
}) {
  const parsed = createPlantSchema.safeParse(body)

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  return createPlant({
    userId,
    data: parsed.data,
  })
}

/* =========================================
   GET USER PLANTS
========================================= */

export async function getUserPlantsService(userId: string) {
  return getUserPlants(userId)
}

/* =========================================
   GET SINGLE PLANT
========================================= */

export async function getPlantByIdService({
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

  return plant
}

/* =========================================
   UPDATE PLANT
========================================= */

export async function updatePlantService({
  userId,
  plantId,
  body,
}: {
  userId: string
  plantId: string
  body: unknown
}) {
  const parsed = updatePlantSchema.safeParse(body)

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  const updated = await updatePlant({
    userId,
    plantId,
    data: parsed.data,
  })

  if (!updated) {
    throw new Error('Plant not found')
  }

  return updated
}

/* =========================================
   DELETE PLANT
========================================= */

export async function deletePlantService({
  userId,
  plantId,
}: {
  userId: string
  plantId: string
}) {
  const deleted = await deletePlant({
    userId,
    plantId,
  })

  if (!deleted) {
    throw new Error('Plant not found')
  }

  return deleted
}

/* =========================================
   GENERATE CARE PLAN
========================================= */

export async function generateCarePlanService({
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

  const aiPlan = await generateCarePlan({
    plantName: plant.name,
    species: plant.species,
  })

  return upsertCarePlan({
    plantId,

    wateringFrequency: aiPlan.wateringFrequency,

    sunlight: aiPlan.sunlight,

    fertilizer: aiPlan.fertilizer,

    notes: aiPlan.notes,
  })
}

/* =========================================
   GET CARE PLAN
========================================= */

export async function getPlantCarePlanService({
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

  return getPlantCarePlan(plantId)
}

/* =========================================
   CREATE GROWTH LOG
========================================= */

export async function createGrowthLogService(body: unknown) {
  const parsed = growthLogSchema.safeParse(body)

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  return createGrowthLog(parsed.data)
}

/* =========================================
   GET GROWTH LOGS
========================================= */

export async function getGrowthLogsService(plantId: string) {
  return getPlantGrowthLogs(plantId)
}
