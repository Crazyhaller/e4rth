import { GoogleGenAI } from '@google/genai'
import { createHash } from 'node:crypto'
import { Buffer } from 'node:buffer'
import { getJsonCache, setJsonCache } from '@/lib/redis/client'
import type { DiagnosisResult } from '@/types/ai'

function getGoogleGenAiClient() {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY environment variable')
  }

  return new GoogleGenAI({ apiKey })
}

interface CarePlanResult {
  wateringFrequency: number
  sunlight: string
  fertilizer: string
  notes: string
}

function cacheKey(scope: string, value: string) {
  return `e4rth:ai:${scope}:${createHash('sha256').update(value).digest('hex')}`
}

/**
 * Analyze plant image
 */
export async function analyzePlantImage(
  imageUrl: string,
): Promise<DiagnosisResult> {
  const cached = await getJsonCache<DiagnosisResult>(
    cacheKey('diagnosis', imageUrl),
  )

  if (cached) {
    return cached
  }

  const { base64Data, mimeType } = await getImagePayload(imageUrl)

  const prompt = `
You are a plant disease detection AI.

Analyze the plant image and return STRICT JSON in this format:

{
  "disease": "name or healthy",
  "confidence": number (0-100),
  "severity": "low" | "medium" | "high",
  "treatment": ["step 1", "step 2", "step 3"]
}

Rules:
- If plant is healthy → disease = "healthy"
- Confidence must be realistic
- Keep treatment practical and concise
- DO NOT return anything except JSON
`

  try {
    const response = await getGoogleGenAiClient().models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType,
          },
        },
      ],
      config: {
        responseMimeType: 'application/json',
      },
    })

    const text =
      typeof (response as any).text === 'function'
        ? await (response as any).text()
        : (response as any).text

    if (!text) throw new Error('Empty response received from the model')

    const parsed = JSON.parse(text) as DiagnosisResult

    await setJsonCache(cacheKey('diagnosis', imageUrl), parsed, 60 * 60 * 24)

    return parsed
  } catch (err) {
    console.error('AI parse error:', err)

    const fallback: DiagnosisResult = {
      disease: 'unknown',
      confidence: 0,
      severity: 'low',
      treatment: ['Unable to analyze image'],
    }

    return fallback
  }
}

/**
 * Resolve remote URLs and data URLs into base64 content for Gemini.
 */
async function getImagePayload(imageUrl: string) {
  if (imageUrl.startsWith('data:')) {
    return parseDataUrl(imageUrl)
  }

  if (imageUrl.startsWith('http')) {
    const response = await fetch(imageUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${response.status}`)
    }

    const contentType =
      response.headers.get('content-type')?.split(';')[0] || 'image/jpeg'
    const buffer = Buffer.from(await response.arrayBuffer())

    return {
      base64Data: buffer.toString('base64'),
      mimeType: contentType,
    }
  }

  return {
    base64Data: imageUrl,
    mimeType: 'image/jpeg',
  }
}

function parseDataUrl(imageUrl: string) {
  const [prefix, data] = imageUrl.split(',', 2)
  const mimeType = prefix.split(';')[0].replace('data:', '') || 'image/jpeg'

  return {
    base64Data: data,
    mimeType,
  }
}

export async function generateCarePlan({
  plantName,
  species,
}: {
  plantName: string
  species?: string | null
}): Promise<CarePlanResult> {
  const cacheInput = `${plantName}:${species ?? 'unknown'}`
  const cached = await getJsonCache<CarePlanResult>(
    cacheKey('care-plan', cacheInput),
  )

  if (cached) {
    return cached
  }

  const prompt = `
You are a plant care expert.

Generate a care plan for the plant below.

Plant Name: ${plantName}
Species: ${species ?? 'Unknown'}

Return STRICT JSON in this format:

{
  "wateringFrequency": number (days),
  "sunlight": "description",
  "fertilizer": "description",
  "notes": "extra care tips"
}

Rules:
- Watering frequency should be realistic (in days)
- Keep sunlight and fertilizer concise
- Notes should be practical and helpful
- DO NOT return anything except JSON
`

  try {
    const response = await getGoogleGenAiClient().models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    })

    const text =
      typeof (response as any).text === 'function'
        ? await (response as any).text()
        : (response as any).text

    if (!text) throw new Error('Empty response received from the model')

    const parsed = JSON.parse(text) as CarePlanResult

    await setJsonCache(cacheKey('care-plan', cacheInput), parsed, 60 * 60 * 12)

    return parsed
  } catch (err) {
    // Log the actual error object rather than the parsed text string
    console.error('Care plan parse error:', err)

    return {
      wateringFrequency: 3,
      sunlight: 'Moderate indirect sunlight',
      fertilizer: 'Use balanced fertilizer monthly',
      notes: 'Unable to generate detailed plan',
    }
  }
}
