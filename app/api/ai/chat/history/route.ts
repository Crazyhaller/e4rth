import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { getChatHistoryService } from '@/server/services/ai.server-service'

/**
 * GET /api/ai/chat/history
 */
export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const history = await getChatHistoryService(user.id)

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
