import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { getGrowthLogsService } from '@/server/services/plant.server-service'

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
    const logs = await getGrowthLogsService({
      userId: user.id,
      plantId,
    })

    return NextResponse.json(logs, { status: 200 })
  } catch (error) {
    console.error('Fetch logs error:', error)

    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 })
  }
}
