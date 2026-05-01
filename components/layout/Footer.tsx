'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Leaf } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

const socialLinks: Array<[string, IconDefinition]> = [
  ['Twitter', faTwitter],
  ['GitHub', faGithub],
  ['LinkedIn', faLinkedin],
]

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/70 bg-card/45">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-e4rth text-primary-foreground shadow-glow">
                <Leaf className="h-4 w-4" />
              </span>
              <span className="text-lg font-semibold">E4rth</span>
            </div>

            <p className="text-sm leading-7 text-foreground/66">
              Premium AI plant intelligence for diagnosis, care plans, growth
              tracking, reminders, and calmer daily plant care.
            </p>
          </motion.div>

          <FooterColumn
            title="Product"
            links={[
              ['AI Diagnosis', '/scan'],
              ['Plant Management', '/plants'],
              ['Analytics', '/analytics'],
              ['AI Assistant', '/chat'],
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              ['About', '/about'],
              ['Contact', '/contact'],
              ['Pricing', '/pricing'],
            ]}
          />

          <div>
            <h4 className="mb-4 text-sm font-semibold">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map(([label, icon]) => (
                <a
                  key={label}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-background/45 text-foreground/70 transition hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                  aria-label={label}
                >
                  <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-6 text-sm text-foreground/55 md:flex-row">
          <p>© {new Date().getFullYear()} E4rth. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: Array<[string, string]>
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold">{title}</h4>
      <ul className="space-y-3 text-sm text-foreground/66">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="transition hover:text-primary">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
