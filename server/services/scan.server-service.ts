import {
  createScan,
  getScanById,
  getUserScans,
} from '@/server/repositories/scan.repo'

import { scanSchema } from '@/lib/validators/scan.validator'

import { checkAiUsage } from '@/lib/usage/checkAiUsage'

import { analyzePlantImage } from '@/lib/ai/gemini'

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

  /**
   * 💾 Store scan
   */
  const scan = await createScan({
    userId,

    plantId: parsed.data.plantId ?? null,

    imageUrl: parsed.data.imageUrl,

    disease: aiResult.disease,

    confidence: aiResult.confidence,

    severity: aiResult.severity,

    rawResponse: aiResult,
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
