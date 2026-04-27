import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { plants, growthLogs } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { eq, and, desc } from 'drizzle-orm'

/**
 * GET /api/logs/:plantId
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ plantId: string }> },
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { plantId } = await params

    /**
     * 🌿 Verify ownership
     */
    const plant = await db.query.plants.findFirst({
      where: and(eq(plants.id, plantId), eq(plants.userId, user.id)),
    })

    if (!plant) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
    }

    /**
     * 🌱 Fetch logs
     */
    const logs = await db.query.growthLogs.findMany({
      where: eq(growthLogs.plantId, plantId),
      orderBy: [desc(growthLogs.createdAt)],
    })

    return NextResponse.json(logs, { status: 200 })
  } catch (error) {
    console.error('Fetch logs error:', error)

    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 })
  }
}
