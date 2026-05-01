'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/75 text-foreground shadow-soft backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:cursor-pointer"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-200 transition group-hover:rotate-12" />
      ) : (
        <Moon className="h-4 w-4 text-forest transition group-hover:-rotate-12" />
      )}
    </button>
  )
}
