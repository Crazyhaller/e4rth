import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { getPlantAnalyticsService } from '@/server/services/analytics.server-service'

/**
 * GET /api/analytics/plant/:id
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

    const { id } = await params

    const analytics = await getPlantAnalyticsService({
      userId: user.id,
      plantId: id,
    })

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Plant analytics error:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch analytics',
      },
      {
        status: 500,
      },
    )
  }
}
