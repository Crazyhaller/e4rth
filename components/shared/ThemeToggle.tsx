'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Wait until mounted on the client to render the UI
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  const isDark = theme === 'dark'

  // Pre-define the base classes to keep your code clean
  const buttonClasses =
    'group grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/75 text-foreground shadow-soft backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:cursor-pointer'

  // During SSR and the initial client render, return a skeleton button
  // This maintains the exact same shape/border/background to prevent layout shifts
  if (!mounted) {
    return <div className={buttonClasses} aria-hidden="true" />
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={buttonClasses}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-200 transition group-hover:rotate-12" />
      ) : (
        <Moon className="h-4 w-4 text-forest transition group-hover:-rotate-12" />
      )}
    </button>
  )
}
