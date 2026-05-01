import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { getScanByIdService } from '@/server/services/scan.server-service'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const scan = await getScanByIdService({
      userId: user.id,
      scanId: id,
    })

    return NextResponse.json(scan, { status: 200 })
  } catch (error) {
    console.error('Fetch scan error:', error)
    return NextResponse.json({ error: 'Failed to fetch scan' }, { status: 500 })
  }
}
