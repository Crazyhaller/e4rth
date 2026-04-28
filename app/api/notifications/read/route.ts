import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { eq, and } from 'drizzle-orm'

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
    for (const id of notificationIds) {
      await db
        .update(notifications)
        .set({
          isRead: true,
        })
        .where(and(eq(notifications.id, id), eq(notifications.userId, user.id)))
    }

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
