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

  severity: string

  rawResponse?: any

  createdAt: string
}
