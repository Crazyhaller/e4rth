import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'

/**
 * POST /api/notifications/create
 */
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { type, message } = body

    if (!type || !message) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const created = await db
      .insert(notifications)
      .values({
        userId: user.id,
        type,
        message,
      })
      .returning()

    return NextResponse.json(created[0], { status: 201 })
  } catch (error) {
    console.error('Create notification error:', error)

    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 },
    )
  }
}
