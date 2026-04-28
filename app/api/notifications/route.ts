import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { eq, desc } from 'drizzle-orm'

/**
 * GET /api/notifications
 */
export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await db.query.notifications.findMany({
      where: eq(notifications.userId, user.id),
      orderBy: [desc(notifications.createdAt)],
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Notifications fetch error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 },
    )
  }
}
