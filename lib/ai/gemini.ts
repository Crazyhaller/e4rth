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
You are an expert-level plant pathology AI trained to analyze plant images with high accuracy.

Your task is to carefully examine the provided plant image and identify visible signs of disease, stress, or health.

Return STRICT JSON ONLY in the following format:

{
  "disease": "specific disease name or 'healthy'",
  "confidence": number (0-100),
  "severity": "low" | "medium" | "high",
  "treatment": ["clear actionable step 1", "step 2", "step 3"],
}

Strict Rules:
- DO NOT return anything except valid JSON
- DO NOT include markdown, comments, or explanations
- "disease" must be specific if identifiable (e.g., "powdery mildew", "leaf spot", "root rot"); otherwise use "unknown issue"
- If no visible issues → set "disease" to "healthy" and "severity" to "low"
- "confidence" must reflect visual certainty (avoid always using high values)
- Base conclusions ONLY on visible evidence (leaf color, spots, wilting, mold, discoloration, damage patterns)
- Do NOT hallucinate unseen conditions (e.g., root rot if roots are not visible unless strongly inferred)
- "severity":
  - low → minor or early-stage symptoms
  - medium → noticeable spread or impact
  - high → severe damage, widespread infection, or plant near death
- "symptoms" must describe visible observations, not conclusions
- "causes" should include environmental or biological reasons (e.g., overwatering, fungal infection, pests)
- "treatment" must be practical, step-by-step, and immediately actionable
- "prevention" should help avoid recurrence

Be precise, conservative, and realistic in diagnosis.
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
You are an expert-level plant care specialist with deep knowledge of indoor and outdoor plant maintenance.

Generate a highly practical, realistic care plan for the plant below based on its species and general plant care best practices.

Plant Name: ${plantName}
Species: ${species ?? 'Unknown'}

Return STRICT JSON ONLY in the following format:

{
  "wateringFrequency": number (days),
  "sunlight": "clear and specific light requirement",
  "fertilizer": "type, frequency, and usage guidance",
  "notes": "practical care tips and common mistakes to avoid"
}

Strict Rules:
- DO NOT return anything except valid JSON
- DO NOT include markdown, comments, or explanations
- If species is unknown, infer care based on common characteristics of similar houseplants
- "wateringFrequency" must be realistic and depend on typical plant needs (avoid fixed/generic values)
- "sunlight" must clearly specify intensity (e.g., "bright indirect light", "partial shade", "full sun")
- "fertilizer" should include both type (e.g., liquid, balanced NPK) and frequency (e.g., every 2 weeks)
- "humidity" must reflect plant preference accurately
- "temperature" should be a realistic indoor/outdoor range (e.g., "18–26°C")
- "soil" must describe drainage and composition if relevant (e.g., "well-draining, peat-based mix")
- "notes" should include actionable advice (e.g., overwatering risks, seasonal adjustments, pruning tips)
- Avoid vague phrases like "water regularly" or "keep in sunlight"
- Be specific, practical, and tailored to the plant

Ensure the output is useful for real-world plant care, not generic advice.
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
