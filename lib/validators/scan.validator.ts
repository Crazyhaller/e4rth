import { z } from 'zod'

/* =========================================
   AI SCAN
========================================= */

export const scanSchema = z.object({
  imageUrl: z.string().min(1),

  plantId: z.string().uuid().optional().nullable(),
})

/* =========================================
   AI CHAT
========================================= */

export const chatSchema = z.object({
  message: z.string().min(1, 'Message required').max(5000),
})

/* =========================================
   CARE PLAN
========================================= */

export const carePlanSchema = z.object({
  plantId: z.string().uuid(),
})

/* =========================================
   TYPES
========================================= */

export type ScanInput = z.infer<typeof scanSchema>

export type ChatInput = z.infer<typeof chatSchema>

export type CarePlanInput = z.infer<typeof carePlanSchema>
