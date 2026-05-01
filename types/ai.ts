/* =========================================
   AI DIAGNOSIS
========================================= */

export interface DiagnosisResult {
  disease: string

  confidence: number

  severity: 'low' | 'medium' | 'high'

  treatment: string[]
}

/* =========================================
   AI CHAT
========================================= */

export interface ChatMessage {
  role: 'user' | 'assistant'

  message: string

  id?: string

  createdAt?: string | Date | null
}
