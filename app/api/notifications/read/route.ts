import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth/getCurrentUser'

import { markNotificationsReadService } from '@/server/services/notification.server-service'

/**
 * PATCH /api/notifications/read
 */
export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { notificationIds } = body

    if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
      return NextResponse.json(
        { error: 'notificationIds required' },
        { status: 400 },
      )
    }

    /**
     * 🔔 Mark notifications as read
     */
    await markNotificationsReadService({
      userId: user.id,
      notificationIds,
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Read notifications error:', error)

    return NextResponse.json(
      { error: 'Failed to mark as read' },
      { status: 500 },
    )
  }
}
