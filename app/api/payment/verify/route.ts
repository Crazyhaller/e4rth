import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Payment integration is postponed' },
    { status: 501 },
  )
}
