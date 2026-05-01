import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { uploadToCloudinary } from '@/lib/cloudinary'

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file')

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    const result = await uploadToCloudinary(file)

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Cloudinary upload error:', error)

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to upload image',
      },
      { status: 500 },
    )
  }
}
