import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { createGrowthLogService } from '@/server/services/plant.server-service'

/**
 * POST /api/logs/add
 */
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    const log = await createGrowthLogService({
      userId: user.id,
      body,
    })

    return NextResponse.json(log, { status: 201 })
  } catch (error) {
    console.error('Add log error:', error)

    return NextResponse.json({ error: 'Failed to add log' }, { status: 500 })
  }
}
