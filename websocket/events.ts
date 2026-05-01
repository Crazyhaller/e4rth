import type { NotificationItem } from '@/types/notification'
import type { Scan } from '@/types/scan'

export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  REGISTER: 'session:register',
  NOTIFICATION_CREATED: 'notification:created',
  NOTIFICATIONS_READ: 'notification:read',
  SCAN_COMPLETED: 'scan:completed',
  CARE_REMINDER: 'care:reminder',
  PLANT_UPDATED: 'plant:updated',
} as const

export const REDIS_CHANNELS = {
  NOTIFICATIONS: 'e4rth:notifications',
  SCANS: 'e4rth:scans',
  PLANTS: 'e4rth:plants',
} as const

export interface NotificationCreatedPayload {
  userId: string
  notification: NotificationItem
}

export interface NotificationsReadPayload {
  userId: string
  notificationIds: string[]
}

export interface ScanCompletedPayload {
  userId: string
  scan: Scan
}

export interface PlantUpdatedPayload {
  userId: string
  plantId: string
}

export type RealtimePayload =
  | NotificationCreatedPayload
  | NotificationsReadPayload
  | ScanCompletedPayload
  | PlantUpdatedPayload
