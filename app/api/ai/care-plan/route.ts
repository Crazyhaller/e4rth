import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { plants, carePlans } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { generateCarePlan } from '@/lib/ai/gemini'
import { eq, and } from 'drizzle-orm'

/**
 * POST /api/ai/care-plan
 */
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { plantId } = body

    if (!plantId) {
      return NextResponse.json(
        { error: 'plantId is required' },
        { status: 400 },
      )
    }

    /**
     * 🌿 Fetch plant (secure)
     */
    const plant = await db.query.plants.findFirst({
      where: and(eq(plants.id, plantId), eq(plants.userId, user.id)),
    })

    if (!plant) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
    }

    /**
     * 🧠 Generate AI care plan
     */
    const aiPlan = await generateCarePlan({
      plantName: plant.name,
      species: plant.species,
    })

    /**
     * 🔁 Check existing plan
     */
    const existing = await db.query.carePlans.findFirst({
      where: eq(carePlans.plantId, plant.id),
    })

    let saved

    if (existing) {
      /**
       * UPDATE
       */
      saved = await db
        .update(carePlans)
        .set({
          wateringFrequency: aiPlan.wateringFrequency,
          sunlight: aiPlan.sunlight,
          fertilizer: aiPlan.fertilizer,
          notes: aiPlan.notes,
          updatedAt: new Date(),
        })
        .where(eq(carePlans.plantId, plant.id))
        .returning()
    } else {
      /**
       * CREATE
       */
      saved = await db
        .insert(carePlans)
        .values({
          plantId: plant.id,
          wateringFrequency: aiPlan.wateringFrequency,
          sunlight: aiPlan.sunlight,
          fertilizer: aiPlan.fertilizer,
          notes: aiPlan.notes,
        })
        .returning()
    }

    return NextResponse.json(saved[0], { status: 200 })
  } catch (error) {
    console.error('Care plan error:', error)

    return NextResponse.json(
      { error: 'Failed to generate care plan' },
      { status: 500 },
    )
  }
}
