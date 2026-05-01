'use client'

import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { notify } from '@/lib/toast'
import type { NotificationItem } from '@/types/notification'
import { WS_EVENTS } from '@/websocket/events'
import { getNotificationSettings } from '../services/notifications.service'
import { apiRequest } from '@/lib/api/client'

export function useRealtimeNotifications(
  onNotification: (notification: NotificationItem) => void,
) {
  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL

    if (!socketUrl) return

    let active = true
    let socket: ReturnType<typeof io> | null = null

    async function connect() {
      const session = await apiRequest<{ userId: string }>(
        '/api/realtime/session',
      )

      if (!active) return

      socket = io(socketUrl!, {
        auth: { userId: session.userId },
        transports: ['websocket'],
      })

      socket.emit(WS_EVENTS.REGISTER, { userId: session.userId })

      socket.on(WS_EVENTS.NOTIFICATION_CREATED, (notification) => {
        const item = notification as NotificationItem
        onNotification(item)

        if (getNotificationSettings().realtimeToasts) {
          notify.info(item.message)
        }
      })
    }

    connect().catch((error) => {
      console.error('Realtime notification connection failed:', error)
    })

    return () => {
      active = false
      socket?.disconnect()
    }
  }, [onNotification])
}
