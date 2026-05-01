import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { diagnosePlantService } from '@/server/services/ai.server-service'

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const imageUrl = typeof body.imageUrl === 'string' ? body.imageUrl : ''

    if (!imageUrl) {
      return NextResponse.json({ error: 'imageUrl required' }, { status: 400 })
    }

    const diagnosis = await diagnosePlantService({
      userId: user.id,
      imageUrl,
    })

    return NextResponse.json(diagnosis)
  } catch (error) {
    console.error('Diagnose API error:', error)
    return NextResponse.json({ error: 'Diagnosis failed' }, { status: 500 })
  }
}
