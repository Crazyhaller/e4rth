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
      where: and(
        eq(plants.id, plantId),
        eq(plants.userId, user.id), // 🔐 SECURITY CHECK
      ),
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
