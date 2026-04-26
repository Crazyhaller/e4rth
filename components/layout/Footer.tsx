'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      {/* 🌿 Ambient Background */}
      <div className="absolute inset-0 bg-ambient opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 🌿 Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FontAwesomeIcon
                icon={faLeaf}
                className="text-verdant-500 text-xl"
              />
              <span className="text-lg font-semibold">E4rth</span>
            </div>

            <p className="text-sm text-foreground/70 leading-relaxed">
              Intelligent plant care powered by AI. Diagnose, track, and nurture
              your plants with precision and elegance.
            </p>
          </motion.div>

          {/* 🌱 Product */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link href="/scan" className="hover:text-primary transition">
                  AI Diagnosis
                </Link>
              </li>
              <li>
                <Link href="/plants" className="hover:text-primary transition">
                  Plant Management
                </Link>
              </li>
              <li>
                <Link
                  href="/analytics"
                  className="hover:text-primary transition"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-primary transition">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* 🌿 Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* 🌍 Social */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 text-lg">
              <a
                href="#"
                className="hover:text-primary transition"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                className="hover:text-primary transition"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="#"
                className="hover:text-primary transition"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} E4rth. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
