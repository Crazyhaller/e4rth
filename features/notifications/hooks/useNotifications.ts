'use client'

import { useCallback, useEffect, useState } from 'react'
import { notify } from '@/lib/toast'
import type { NotificationItem } from '@/types/notification'
import {
  getNotifications,
  markNotificationsRead,
} from '../services/notifications.service'
import { useRealtimeNotifications } from './useRealtimeNotifications'

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setError(null)
      const data = await getNotifications()
      setNotifications(data)
    } catch (err) {
      console.error('Notification fetch failed:', err)
      setError('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }, [])

  const markAllRead = useCallback(async () => {
    const ids = notifications
      .filter((notification) => !notification.isRead)
      .map((notification) => notification.id)

    if (ids.length === 0) return

    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    )

    try {
      await markNotificationsRead(ids)
    } catch (err) {
      console.error('Mark read failed:', err)
      notify.error('Failed to update notifications')
      await refresh()
    }
  }, [notifications, refresh])

  const handleRealtimeNotification = useCallback((notification: NotificationItem) => {
    setNotifications((prev) => [notification, ...prev])
  }, [])

  useRealtimeNotifications(handleRealtimeNotification)

  useEffect(() => {
    const load = async () => {
      await refresh()
    }

    load()
  }, [refresh])

  return {
    error,
    loading,
    markAllRead,
    notifications,
    refresh,
    setNotifications,
    unreadCount: notifications.filter((notification) => !notification.isRead)
      .length,
  }
}
