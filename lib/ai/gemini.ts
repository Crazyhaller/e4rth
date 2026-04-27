import { GoogleGenAI } from '@google/genai'

// 1. Use the new GoogleGenAI client class
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

/**
 * Analyze plant image
 */
export async function analyzePlantImage(base64Image: string) {
  // Safely extract base64 data (handles cases where the prefix might be missing)
  const base64Data = base64Image.includes(',')
    ? base64Image.split(',')[1]
    : base64Image

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
    // 2. Models are accessed directly from the initialized client
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: 'image/jpeg',
          },
        },
      ],
      config: {
        // 3. Recommended: Force the API to return valid JSON
        responseMimeType: 'application/json',
      },
    })

    // 4. In the new SDK, 'text' is a property on the response, not a method
    const text = response.text

    if (!text) throw new Error('Empty response received from the model')

    return JSON.parse(text)
  } catch (err) {
    console.error('AI parse error:', err)

    return {
      disease: 'unknown',
      confidence: 0,
      severity: 'low',
      treatment: ['Unable to analyze image'],
    }
  }
}
