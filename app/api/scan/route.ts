import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth/getCurrentUser'

import { checkAiUsage } from '@/lib/usage/checkAiUsage'
import { createScanService } from '@/server/services/scan.server-service'

/**
 * POST /api/scan
 */
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    /**
     * 📸 Usage limits
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

    const scan = await createScanService({
      userId: user.id,
      body,
    })

    return NextResponse.json(scan, {
      status: 201,
    })
  } catch (error) {
    console.error('Scan API error:', error)

    return NextResponse.json(
      { error: 'Failed to process scan' },
      { status: 500 },
    )
  }
}
