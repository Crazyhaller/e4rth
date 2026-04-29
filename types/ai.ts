/* =========================================
   AI DIAGNOSIS
========================================= */

export interface DiagnosisResult {
  disease: string

  confidence: number

  severity: string

  treatment: string[]
}

/* =========================================
   AI CHAT
========================================= */

export interface ChatMessage {
  role: 'user' | 'assistant'

  message: string
}
