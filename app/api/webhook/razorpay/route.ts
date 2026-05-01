import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Payment webhooks are postponed' },
    { status: 501 },
  )
}
