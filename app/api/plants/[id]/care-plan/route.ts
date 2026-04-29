import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import {
  getPlantByIdService,
  getPlantCarePlanService,
} from '@/server/services/plant.service'

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
    const plant = await getPlantByIdService({
      userId: user.id,
      plantId,
    })

    if (!plant) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
    }

    /**
     * 🌱 Fetch care plan
     */
    const plan = await getPlantCarePlanService({
      userId: user.id,
      plantId,
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
