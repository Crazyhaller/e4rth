import { apiRequest } from '@/lib/api/client'
import type {
  NotificationItem,
  NotificationSettings,
  NotificationType,
} from '@/types/notification'

export async function getNotifications() {
  return apiRequest<NotificationItem[]>('/api/notifications')
}

export async function createNotification(payload: {
  type: NotificationType
  message: string
}) {
  return apiRequest<NotificationItem>('/api/notifications/create', {
    method: 'POST',
    body: payload,
  })
}

export async function markNotificationsRead(notificationIds: string[]) {
  return apiRequest<{ success: true }>('/api/notifications/read', {
    method: 'PATCH',
    body: { notificationIds },
  })
}

const storageKey = 'e4rth:notification-settings'

export function getNotificationSettings(): NotificationSettings {
  if (typeof window === 'undefined') {
    return {
      careReminders: true,
      scanAlerts: true,
      growthInsights: true,
      realtimeToasts: true,
    }
  }

  const stored = window.localStorage.getItem(storageKey)
  if (!stored) {
    return {
      careReminders: true,
      scanAlerts: true,
      growthInsights: true,
      realtimeToasts: true,
    }
  }

  return JSON.parse(stored) as NotificationSettings
}

export function saveNotificationSettings(settings: NotificationSettings) {
  window.localStorage.setItem(storageKey, JSON.stringify(settings))
}
