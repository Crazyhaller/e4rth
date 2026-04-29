import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { getUserScans } from '@/server/repositories/scan.repo'

/**
 * GET /api/scan/history
 */
export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const history = await getUserScans(user.id)

    return NextResponse.json(history, { status: 200 })
  } catch (error) {
    console.error('Scan history error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 },
    )
  }
}
