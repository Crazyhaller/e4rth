import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { generateCarePlanService } from '@/server/services/plant.server-service'

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
    const plantId = typeof body.plantId === 'string' ? body.plantId : ''

    if (!plantId) {
      return NextResponse.json(
        { error: 'plantId is required' },
        { status: 400 },
      )
    }

    const saved = await generateCarePlanService({
      userId: user.id,
      plantId,
    })

    return NextResponse.json(saved, { status: 200 })
  } catch (error) {
    console.error('Care plan error:', error)

    return NextResponse.json(
      { error: 'Failed to generate care plan' },
      { status: 500 },
    )
  }
}
