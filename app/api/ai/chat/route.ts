import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { checkAiUsage } from '@/lib/usage/checkAiUsage'
import { aiChatService } from '@/server/services/ai.server-service'

/**
 * POST /api/ai/chat
 */
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    /**
     * 💬 Usage limits
     */
    const usage = await checkAiUsage(user.id)

    if (!usage.allowed) {
      return NextResponse.json(
        {
          error: usage.reason,
          upgradeRequired: true,
        },
        { status: 403 },
      )
    }

    const body = await req.json()

    const result = await aiChatService({
      userId: user.id,
      body,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Chat AI error:', error)
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 })
  }
}
