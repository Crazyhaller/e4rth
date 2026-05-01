import {
  createScan,
  getScanById,
  getUserScans,
} from '@/server/repositories/scan.repo'

import {
  createPlant,
  getPlantById,
  updatePlant,
} from '@/server/repositories/plant.repo'

import { scanSchema } from '@/lib/validators/scan.validator'

import { checkAiUsage } from '@/lib/usage/checkAiUsage'

import { analyzePlantImage } from '@/lib/ai/gemini'
import { createNotificationService } from './notification.server-service'
import { NOTIFICATION_TYPES } from '@/lib/utils/constants'
import { publishRealtimeEvent } from '@/lib/redis/client'
import { REDIS_CHANNELS } from '@/websocket/events'

/* =========================================
   CREATE AI SCAN
========================================= */

export async function createScanService({
  userId,
  body,
}: {
  userId: string
  body: unknown
}) {
  /**
   * ✅ Validate payload
   */
  const parsed = scanSchema.safeParse(body)

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  /**
   * 🌿 AI usage limits
   */
  const usage = await checkAiUsage(userId)

  if (!usage.allowed) {
    throw new Error(usage.reason || 'AI usage limit reached')
  }

  /**
   * 🧠 AI diagnosis
   */
  const aiResult = await analyzePlantImage(parsed.data.imageUrl)

  let plantId = parsed.data.plantId ?? null

  if (!plantId) {
    const plant = await createPlant({
      userId,
      data: {
        name: 'Scanned plant',
        species: null,
        location: null,
        imageUrl: parsed.data.imageUrl,
        tags: [],
      },
    })

    plantId = plant.id
  } else {
    const plant = await getPlantById({
      userId,
      plantId,
    })

    if (plant && !plant.imageUrl) {
      await updatePlant({
        userId,
        plantId,
        data: {
          imageUrl: parsed.data.imageUrl,
        },
      })
    }
  }

  /**
   * 💾 Store scan
   */
  const scan = await createScan({
    userId,

    plantId,

    imageUrl: parsed.data.imageUrl,

    disease: aiResult.disease,

    confidence: aiResult.confidence,

    severity: aiResult.severity,

    rawResponse: aiResult,
  })

  await createNotificationService({
    userId,
    type: NOTIFICATION_TYPES.SCAN_COMPLETED,
    message:
      aiResult.disease === 'healthy'
        ? 'Your plant scan is complete: no disease detected.'
        : `Your plant scan found ${aiResult.disease} with ${aiResult.severity} severity.`,
  })

  await publishRealtimeEvent(REDIS_CHANNELS.SCANS, {
    userId,
    scan,
  })

  return scan
}

/* =========================================
   GET USER SCAN HISTORY
========================================= */

export async function getScanHistoryService(userId: string) {
  return getUserScans(userId)
}

/* =========================================
   GET SINGLE SCAN
========================================= */

export async function getScanByIdService({
  userId,
  scanId,
}: {
  userId: string
  scanId: string
}) {
  const scan = await getScanById({
    userId,
    scanId,
  })

  if (!scan) {
    throw new Error('Scan not found')
  }

  return scan
}
