import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth/getCurrentUser'

import { getNotificationsService } from '@/server/services/notification.service'

/**
 * GET /api/notifications
 */
export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await getNotificationsService(user.id)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Notifications fetch error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 },
    )
  }
}
