'use client'

import { useEffect, useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useNotifications } from '../hooks/useNotifications'

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const { markAllRead, notifications, unreadCount } = useNotifications()

  const dropdownRef = useRef<HTMLDivElement>(null)

  /* =========================
     CLOSE ON OUTSIDE CLICK
  ========================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 🔔 Bell */}
      <button
        onClick={() => {
          setOpen((prev) => !prev)

          if (!open) {
            markAllRead()
          }
        }}
        className="relative grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-card/70 shadow-soft transition hover:cursor-pointer hover:bg-primary/10"
        aria-label="Open notifications"
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-e4rth px-1 text-[10px] text-primary-foreground shadow-glow">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 📦 Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute right-0 z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] rounded-[1.5rem] border border-border/70 bg-card/95 p-4 shadow-glass backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Notifications</h3>

              <span className="text-xs text-foreground/50">
                {notifications.length} total
              </span>
            </div>

            {/* Empty */}
            {notifications.length === 0 ? (
              <p className="text-sm text-foreground/60">
                No notifications yet.
              </p>
            ) : (
              <div className="space-y-3 max-h-100 overflow-y-auto pr-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-xl p-3 border transition ${
                      notification.isRead
                        ? 'border-border/60 bg-background/35'
                        : 'border-primary/25 bg-primary/10'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {notification.type}
                        </p>

                        <p className="text-xs text-foreground/70 mt-1">
                          {notification.message}
                        </p>
                      </div>

                      {!notification.isRead && (
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>

                    <p className="text-[10px] text-foreground/40 mt-3">
                      {notification.createdAt
                        ? new Date(notification.createdAt).toLocaleString()
                        : 'Just now'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
