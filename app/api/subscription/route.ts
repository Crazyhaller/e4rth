import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { getUserPlanService } from '@/server/services/billing.server-service'

export async function GET() {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const plan = await getUserPlanService(user.id)

  return NextResponse.json({
    ...plan,
    paymentsEnabled: false,
  })
}
