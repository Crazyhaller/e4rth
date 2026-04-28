'use client'

import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

interface Notification {
  id: string
  type: string
  message: string
  isRead: boolean
  createdAt: string
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const dropdownRef = useRef<HTMLDivElement>(null)

  /* =========================
     FETCH
  ========================= */
  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications')
      const data = await res.json()

      setNotifications(data)
    } catch (err) {
      console.error('Notification fetch failed:', err)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

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

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = async () => {
    const unread = notifications.filter((n) => !n.isRead)

    if (unread.length === 0) return

    const ids = unread.map((n) => n.id)

    try {
      await fetch('/api/notifications/read', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notificationIds: ids,
        }),
      })

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          isRead: true,
        })),
      )
    } catch (err) {
      console.error('Mark read failed:', err)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 🔔 Bell */}
      <button
        onClick={() => {
          setOpen((prev) => !prev)

          if (!open) {
            markAsRead()
          }
        }}
        className="relative p-2 rounded-xl hover:bg-white/5 transition"
      >
        <FontAwesomeIcon icon={faBell} className="text-lg" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-verdant-500 text-white text-[10px] flex items-center justify-center shadow-glow">
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
            className="absolute right-0 mt-3 w-85 glass rounded-2xl border border-white/10 p-4 z-50"
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
                        ? 'bg-white/5 border-white/5'
                        : 'bg-verdant-500/10 border-verdant-500/20'
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
                        <span className="w-2 h-2 rounded-full bg-verdant-400 mt-1.5" />
                      )}
                    </div>

                    <p className="text-[10px] text-foreground/40 mt-3">
                      {new Date(notification.createdAt).toLocaleString()}
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
