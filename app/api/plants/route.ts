import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { getUserPlantsService } from '@/server/services/plant.service'

/**
 * GET /api/plants
 */
export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userPlants = await getUserPlantsService(user.id)

    return NextResponse.json(userPlants, { status: 200 })
  } catch (error) {
    console.error('Fetch plants error:', error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
