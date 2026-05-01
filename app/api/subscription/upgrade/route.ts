import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Plan upgrades are postponed until payments are enabled' },
    { status: 501 },
  )
}
