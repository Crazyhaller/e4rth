import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { createPlantService } from '@/server/services/plant.server-service'

/**
 * POST /api/plants/create
 */
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    const plant = await createPlantService({
      userId: user.id,
      body,
    })

    return NextResponse.json(plant, {
      status: 201,
    })
  } catch (error) {
    console.error('Create plant error:', error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
