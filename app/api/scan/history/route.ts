import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { scans } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { eq, desc } from 'drizzle-orm'

/**
 * GET /api/scan/history
 */
export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const history = await db.query.scans.findMany({
      where: eq(scans.userId, user.id),
      orderBy: [desc(scans.createdAt)],
    })

    return NextResponse.json(history, { status: 200 })
  } catch (error) {
    console.error('Scan history error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 },
    )
  }
}
