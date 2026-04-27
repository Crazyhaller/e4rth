import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { plants } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'

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

    const { name, species, location, tags } = body

    // Basic validation
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Plant name is required' },
        { status: 400 },
      )
    }

    const newPlant = await db
      .insert(plants)
      .values({
        userId: user.id,
        name,
        species: species ?? null,
        location: location ?? null,
        tags: Array.isArray(tags) ? tags : [],
      })
      .returning()

    return NextResponse.json(newPlant[0], { status: 201 })
  } catch (error) {
    console.error('Create plant error:', error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
