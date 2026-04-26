'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: ReactNode
  title?: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export default function SectionWrapper({
  children,
  title,
  subtitle,
  centered = false,
  className,
}: SectionWrapperProps) {
  return (
    <section className={cn('py-20', className)}>
      {(title || subtitle) && (
        <div
          className={cn('mb-12 max-w-2xl', centered && 'mx-auto text-center')}
        >
          {title && (
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-foreground/70 text-base md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  )
}
