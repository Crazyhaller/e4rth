'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAnglesLeft,
  faBars,
  faBell,
  faCamera,
  faChartLine,
  faCog,
  faComments,
  faLeaf,
  faSeedling,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { useNotifications } from '@/features/notifications/hooks/useNotifications'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: faLeaf },
  { label: 'Scan', href: '/scan', icon: faCamera },
  { label: 'Plants', href: '/plants', icon: faSeedling },
  { label: 'Analytics', href: '/analytics', icon: faChartLine },
  { label: 'Chat', href: '/chat', icon: faComments },
  { label: 'Notifications', href: '/notifications', icon: faBell },
  { label: 'Settings', href: '/settings', icon: faCog },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('e4rth:sidebar-collapsed') === 'true'
  })
  const [mobileOpen, setMobileOpen] = useState(false)
  const { unreadCount } = useNotifications()

  const toggleCollapsed = () => {
    const next = !collapsed
    setCollapsed(next)
    window.localStorage.setItem('e4rth:sidebar-collapsed', String(next))
  }

  const sidebar = (
    <div className="flex h-full flex-col p-4">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/dashboard"
          className={cn(
            'flex items-center gap-3 rounded-2xl px-2 py-2',
            collapsed && 'justify-center',
          )}
          onClick={() => setMobileOpen(false)}
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-e4rth text-primary-foreground shadow-glow">
            <FontAwesomeIcon icon={faLeaf} className="text-base" />
          </span>
          {!collapsed && (
            <span>
              <span className="block text-sm font-semibold leading-4">
                E4rth
              </span>
              <span className="text-[11px] text-foreground/48">
                Plant intelligence
              </span>
            </span>
          )}
        </Link>

        <button
          onClick={toggleCollapsed}
          aria-label="Collapse sidebar"
          className="hidden rounded-xl p-2 text-foreground/60 transition hover:bg-primary/10 lg:block hover:cursor-pointer"
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
      </div>

      <nav className="flex flex-col gap-1.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const badge =
            item.href === '/notifications' && unreadCount > 0
              ? unreadCount
              : null

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'relative flex min-h-11 items-center gap-3 rounded-2xl px-3 py-2 text-sm transition-all',
                collapsed && 'justify-center',
                isActive
                  ? 'border border-primary/30 bg-primary/14 text-foreground shadow-soft'
                  : 'text-foreground/66 hover:bg-primary/8 hover:text-foreground',
              )}
              title={collapsed ? item.label : undefined}
            >
              <FontAwesomeIcon icon={item.icon} className="text-base" />
              {!collapsed && <span>{item.label}</span>}
              {badge && (
                <span className="ml-auto grid min-h-5 min-w-5 place-items-center rounded-full bg-gradient-e4rth px-1 text-[10px] text-primary-foreground shadow-glow">
                  {badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="flex-1" />

      {!collapsed && (
        <div className="rounded-2xl border border-border/70 bg-card/65 px-3 py-3 text-xs leading-5 text-foreground/58 shadow-soft">
          Deep care intelligence for every plant in your collection.
        </div>
      )}
    </div>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        className="fixed left-4 top-4 z-50 grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/85 shadow-soft backdrop-blur-xl lg:hidden hover:cursor-pointer"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <aside
        className={cn(
          'sticky top-0 hidden h-screen border-r border-border/70 bg-card/64 shadow-soft backdrop-blur-2xl transition-[width] lg:block',
          collapsed ? 'w-20' : 'w-64',
        )}
      >
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-soil/70 hover:cursor-pointer"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative h-full w-72 border-r border-border/70 bg-background/95 shadow-glass backdrop-blur-xl">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full hover:bg-primary/10 hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {sidebar}
          </aside>
        </div>
      )}
    </>
  )
}
