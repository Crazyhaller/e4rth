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
    <section className={cn('py-24', className)}>
      {(title || subtitle) && (
        <div
          className={cn('mb-12 max-w-2xl', centered && 'mx-auto text-center')}
        >
          {title && (
            <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-base leading-8 text-foreground/68 md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  )
}
