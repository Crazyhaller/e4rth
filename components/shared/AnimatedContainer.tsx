'use client'

import { ReactNode } from 'react'
import { motion } from 'motion/react'

interface AnimatedContainerProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function AnimatedContainer({
  children,
  delay = 0,
  className,
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        delay,
      }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
