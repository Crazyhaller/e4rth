import { NextResponse } from 'next/server'

import { getPlantAnalyticsService } from '@/server/services/analytics.server-service'

/**
 * GET /api/analytics/plant/:id
 */
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string
    }
  },
) {
  try {
    const analytics = await getPlantAnalyticsService(params.id)

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
