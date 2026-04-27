'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLeaf,
  faCamera,
  faSeedling,
  faChartLine,
  faComments,
  faBell,
  faCog,
} from '@fortawesome/free-solid-svg-icons'

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <FontAwesomeIcon icon={faLeaf} />,
  },
  {
    label: 'Scan',
    href: '/scan',
    icon: <FontAwesomeIcon icon={faCamera} />,
  },
  {
    label: 'Plants',
    href: '/plants',
    icon: <FontAwesomeIcon icon={faSeedling} />,
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: <FontAwesomeIcon icon={faChartLine} />,
  },
  {
    label: 'Chat',
    href: '/chat',
    icon: <FontAwesomeIcon icon={faComments} />,
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: <FontAwesomeIcon icon={faBell} />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <FontAwesomeIcon icon={faCog} />,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex flex-col h-full p-4">
        {/* 🌿 Logo */}
        <Link href="/" className="flex items-center gap-2 px-3 py-2 mb-6">
          <FontAwesomeIcon icon={faLeaf} className="text-verdant-500 text-xl" />
          <span className="text-lg font-semibold">E4rth</span>
        </Link>

        {/* 🌱 Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all',
                  isActive
                    ? 'bg-verdant-500/20 text-verdant-400 border border-verdant-500/30'
                    : 'text-foreground/70 hover:bg-white/5 hover:text-foreground',
                )}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* 🌿 Bottom Spacer */}
        <div className="flex-1" />

        {/* 🌱 Footer Note */}
        <div className="text-xs text-foreground/50 px-3 py-2">
          AI-powered plant care 🌿
        </div>
      </div>
    </aside>
  )
}
