import { z } from 'zod'

/* =========================================
   CREATE PLANT
========================================= */

export const createPlantSchema = z.object({
  name: z.string().min(2, 'Plant name is too short').max(100),

  species: z.string().max(100).optional().nullable(),

  location: z.string().max(100).optional().nullable(),

  tags: z.array(z.string()).optional().default([]),
})

/* =========================================
   UPDATE PLANT
========================================= */

export const updatePlantSchema = createPlantSchema.partial()

/* =========================================
   GROWTH LOG
========================================= */

export const growthLogSchema = z.object({
  plantId: z.string().uuid(),

  height: z.number().min(0).max(10000).optional().nullable(),

  leafCount: z.number().min(0).max(100000).optional().nullable(),

  healthScore: z.number().min(0).max(100).optional().nullable(),

  notes: z.string().max(1000).optional().nullable(),
})

/* =========================================
   TYPES
========================================= */

export type CreatePlantInput = z.infer<typeof createPlantSchema>

export type UpdatePlantInput = z.infer<typeof updatePlantSchema>

export type GrowthLogInput = z.infer<typeof growthLogSchema>
