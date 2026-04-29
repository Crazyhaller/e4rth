'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '@clerk/nextjs'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
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
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 🌿 Logo */}
        {/* on hover the logo link should pop up and increase its size */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <FontAwesomeIcon icon={faLeaf} className="text-e4rth-500 text-xl" />
          <span className="font-semibold text-lg tracking-tight">E4rth</span>
        </Link>

        {/* 🌿 Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href={isSignedIn ? '/dashboard' : '/sign-in'}
            className="px-5 py-2 rounded-xl bg-gradient-e4rth text-white text-sm shadow-glow hover:opacity-90 transition"
          >
            {isSignedIn ? 'Dashboard' : 'Get Started'}
          </Link>
        </div>

        {/* 🌿 Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
        >
          ☰
        </button>
      </div>

      {/* 🌿 Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-6 pt-2 glass"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-foreground/80 hover:text-primary transition"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={isSignedIn ? '/dashboard' : '/sign-in'}
              className="mt-2 px-5 py-2 rounded-xl bg-gradient-e4rth text-white text-center shadow-glow"
            >
              {isSignedIn ? 'Dashboard' : 'Get Started'}
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
