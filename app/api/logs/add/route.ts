import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { plants, growthLogs } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { eq, and } from 'drizzle-orm'

/**
 * POST /api/logs/add
 */
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    const { plantId, height, leafCount, healthScore, notes } = body

    if (!plantId) {
      return NextResponse.json(
        { error: 'plantId is required' },
        { status: 400 },
      )
    }

    /**
     * 🌿 Verify ownership
     */
    const plant = await db.query.plants.findFirst({
      where: and(eq(plants.id, plantId), eq(plants.userId, user.id)),
    })

    if (!plant) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
    }

    /**
     * 🌱 Insert log
     */
    const log = await db
      .insert(growthLogs)
      .values({
        plantId,
        height: height ?? null,
        leafCount: leafCount ?? null,
        healthScore: healthScore ?? null,
        notes: notes ?? null,
      })
      .returning()

    return NextResponse.json(log[0], { status: 201 })
  } catch (error) {
    console.error('Add log error:', error)

    return NextResponse.json({ error: 'Failed to add log' }, { status: 500 })
  }
}
