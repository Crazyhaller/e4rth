import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { plants, carePlans } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { eq, and } from 'drizzle-orm'

/**
 * GET /api/plants/:id/care-plan
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: plantId } = await params

    /**
     * 🌿 Verify plant ownership
     */
    const plant = await db.query.plants.findFirst({
      where: and(eq(plants.id, plantId), eq(plants.userId, user.id)),
    })

    if (!plant) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
    }

    /**
     * 🌱 Fetch care plan
     */
    const plan = await db.query.carePlans.findFirst({
      where: eq(carePlans.plantId, plantId),
    })

    if (!plan) {
      return NextResponse.json({ error: 'No care plan found' }, { status: 404 })
    }

    return NextResponse.json(plan, { status: 200 })
  } catch (error) {
    console.error('Fetch care plan error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch care plan' },
      { status: 500 },
    )
  }
}
