import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { plants } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { eq, and } from 'drizzle-orm'

/**
 * GET /api/plants/:id
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: plantId } = await params

    const plant = await db.query.plants.findFirst({
      where: and(eq(plants.id, plantId), eq(plants.userId, user.id)),
    })

    if (!plant) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
    }

    return NextResponse.json(plant, { status: 200 })
  } catch (error) {
    console.error('Fetch plant error:', error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

/**
 * PATCH /api/plants/:id
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: plantId } = await params
    const body = await req.json()
    const { name, species, location, tags } = body

    // Validate at least one field
    if (!name && !species && !location && !tags) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 },
      )
    }

    // Ensure plant belongs to user
    const existing = await db.query.plants.findFirst({
      where: and(eq(plants.id, plantId), eq(plants.userId, user.id)),
    })

    if (!existing) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
    }

    const updated = await db
      .update(plants)
      .set({
        name: name ?? existing.name,
        species: species ?? existing.species,
        location: location ?? existing.location,
        tags: Array.isArray(tags) ? tags : existing.tags,
      })
      .where(eq(plants.id, plantId))
      .returning()

    return NextResponse.json(updated[0], { status: 200 })
  } catch (error) {
    console.error('Update plant error:', error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

/**
 * DELETE /api/plants/:id
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: plantId } = await params

    // Ensure plant belongs to user
    const existing = await db.query.plants.findFirst({
      where: and(eq(plants.id, plantId), eq(plants.userId, user.id)),
    })

    if (!existing) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
    }

    await db.delete(plants).where(eq(plants.id, plantId))

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Delete plant error:', error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
