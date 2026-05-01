'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageWrapperProps {
  children: ReactNode
  className?: string
  withAmbient?: boolean
}

export default function PageWrapper({
  children,
  className,
  withAmbient = false,
}: PageWrapperProps) {
  return (
    <div
      className={cn(
        'relative min-h-screen w-full overflow-hidden',
        withAmbient && 'bg-ambient',
        className,
      )}
    >
      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
    </div>
  )
}
