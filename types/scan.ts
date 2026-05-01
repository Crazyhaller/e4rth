import type { DiagnosisResult } from './ai'

/* =========================================
   SCAN
========================================= */

export interface Scan {
  id: string

  userId: string

  plantId: string | null

  imageUrl: string

  disease: string

  confidence: number

  severity: 'low' | 'medium' | 'high'

  rawResponse?: DiagnosisResult | null

  createdAt: string | Date | null
}
