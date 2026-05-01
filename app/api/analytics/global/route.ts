import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth/getCurrentUser'

import { getGlobalAnalyticsService } from '@/server/services/analytics.server-service'

/**
 * GET /api/analytics/global
 */
export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
        },
        {
          status: 401,
        },
      )
    }

    const analytics = await getGlobalAnalyticsService(user.id)

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Global analytics error:', error)

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
