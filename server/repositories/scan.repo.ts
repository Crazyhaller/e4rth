import { db } from '@/lib/db'

import { scans } from '@/lib/db/schema'

import { eq, desc } from 'drizzle-orm'
import type { DiagnosisResult } from '@/types/ai'

/* =========================================
   CREATE SCAN
========================================= */

export async function createScan({
  userId,
  plantId,
  imageUrl,
  disease,
  confidence,
  severity,
  rawResponse,
}: {
  userId: string

  plantId?: string | null

  imageUrl: string

  disease: string

  confidence: number

  severity: 'low' | 'medium' | 'high'

  rawResponse?: DiagnosisResult
}) {
  const created = await db
    .insert(scans)
    .values({
      userId,

      plantId: plantId ?? null,

      imageUrl,

      disease,

      confidence,

      severity,

      rawResponse,
    })
    .returning()

  return created[0]
}

/* =========================================
   GET USER SCANS
========================================= */

export async function getUserScans(userId: string) {
  return db.query.scans.findMany({
    where: eq(scans.userId, userId),

    orderBy: [desc(scans.createdAt)],
  })
}

/* =========================================
   GET SCAN BY ID
========================================= */

export async function getScanById({
  userId,
  scanId,
}: {
  userId: string
  scanId: string
}) {
  return db.query.scans.findFirst({
    where: (scan, { and, eq }) =>
      and(eq(scan.id, scanId), eq(scan.userId, userId)),
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
