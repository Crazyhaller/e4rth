'use client'

import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <SignUp
        appearance={{
          elements: {
            card: 'glass border border-white/10 shadow-glass',
          },
        }}
      />
    </div>
  )
}
