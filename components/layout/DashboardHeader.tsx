'use client'

import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import NotificationBell from '@/features/notifications/components/NotificationBell'
import ThemeToggle from '@/components/shared/ThemeToggle'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/scan': 'AI Scan',
  '/plants': 'My Plants',
  '/analytics': 'Analytics',
  '/chat': 'AI Assistant',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
}

export default function DashboardHeader() {
  const pathname = usePathname()

  const title =
    pageTitles[pathname] ||
    (pathname.startsWith('/plants/') ? 'Plant Details' : 'Dashboard')

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/70 bg-card/72 px-6 pl-16 shadow-soft backdrop-blur-2xl lg:pl-6">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary/80">
          E4rth
        </p>
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <NotificationBell />
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-9 h-9 ring-2 ring-primary/20',
            },
          }}
        />
      </div>
    </header>
  )
}
