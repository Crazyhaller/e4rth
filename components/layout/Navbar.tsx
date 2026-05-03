'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Leaf, Menu, X } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import ThemeToggle from '@/components/shared/ThemeToggle'

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Platform', href: '/#platform' },
  { label: 'Intelligence', href: '/#intelligence' },
  { label: 'Pricing', href: '/pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isSignedIn } = useUser()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="fixed left-0 top-0 z-50 w-full px-4 pt-4"
    >
      <div
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border px-4 shadow-soft backdrop-blur-2xl transition-all duration-300 ${
          scrolled
            ? 'border-border/80 bg-card/82'
            : 'border-white/20 bg-card/45'
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:scale-[1.02]"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-e4rth text-primary-foreground shadow-glow">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-semibold tracking-tight">E4rth</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-foreground/70 transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href={isSignedIn ? '/dashboard' : '/sign-in'}
            className="btn-primary"
          >
            {isSignedIn ? 'Dashboard' : 'Get Started'}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/70 hover:cursor-pointer "
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 max-w-7xl rounded-3xl border border-border/70 bg-card/95 p-4 shadow-glass backdrop-blur-2xl md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-foreground/75 transition hover:bg-primary/10 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={isSignedIn ? '/dashboard' : '/sign-in'}
              className="btn-primary mt-2"
            >
              {isSignedIn ? 'Dashboard' : 'Get Started'}
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
