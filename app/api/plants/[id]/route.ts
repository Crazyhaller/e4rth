import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth/getCurrentUser'

import {
  deletePlantService,
  getPlantByIdService,
  updatePlantService,
} from '@/server/services/plant.service'

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

    const plant = await getPlantByIdService({
      userId: user.id,
      plantId,
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
    const existing = await getPlantByIdService({
      userId: user.id,
      plantId,
    })

    if (!existing) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
    }

    const updated = await updatePlantService({
      userId: user.id,
      plantId,
      body,
    })

    return NextResponse.json(updated, { status: 200 })
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
    const existing = await getPlantByIdService({
      userId: user.id,
      plantId,
    })

    if (!existing) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
    }

    await deletePlantService({
      userId: user.id,
      plantId,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Delete plant error:', error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
