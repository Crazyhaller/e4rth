import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { eq, asc } from 'drizzle-orm'

/**
 * GET /api/ai/chat/history
 */
export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const history = await db.query.chats.findMany({
      where: eq(chats.userId, user.id),
      orderBy: [asc(chats.createdAt)],
    })

    return NextResponse.json(history, {
      status: 200,
    })
  } catch (error) {
    console.error('Chat history error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 },
    )
  }
}
