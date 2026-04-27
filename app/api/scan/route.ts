import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { scans } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { analyzePlantImage } from '@/lib/ai/gemini'

/**
 * POST /api/scan
 */
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { image, plantId } = body

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 })
    }

    /**
     * 🧠 AI ANALYSIS
     */
    const result = await analyzePlantImage(image)

    /**
     * 💾 STORE IN DB
     */
    const saved = await db
      .insert(scans)
      .values({
        userId: user.id,
        plantId: plantId ?? null,
        imageUrl: image, // temp (base64)
        disease: result.disease,
        confidence: result.confidence,
        severity: result.severity,
        rawResponse: result,
      })
      .returning()

    return NextResponse.json(saved[0], { status: 200 })
  } catch (error) {
    console.error('Scan API error:', error)

    return NextResponse.json(
      { error: 'Failed to process scan' },
      { status: 500 },
    )
  }
}
