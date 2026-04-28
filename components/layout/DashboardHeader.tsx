'use client'

import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import NotificationBell from '@/features/notifications/components/NotificationBell'

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
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      {/* 🌿 Page Title */}
      <h1 className="text-lg font-semibold tracking-tight">{title}</h1>

      {/* 🌱 Actions */}
      <div className="flex items-center gap-4">
        {/* 🔔 Notifications */}
        <NotificationBell />

        {/* 👤 User */}
        <div className="flex items-center">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-9 h-9',
              },
            }}
          />
        </div>
      </div>
    </header>
  )
}
