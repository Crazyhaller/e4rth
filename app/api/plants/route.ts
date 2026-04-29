import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { plants } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { eq, desc } from 'drizzle-orm'
import { getUserPlants } from '@/server/repositories/plant.repo'

/**
 * GET /api/plants
 */
export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userPlants = await getUserPlants(user.id)

    return NextResponse.json(userPlants, { status: 200 })
  } catch (error) {
    console.error('Fetch plants error:', error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
