export type NotificationType =
  | 'care_reminder'
  | 'plant_alert'
  | 'scan_completed'
  | 'growth_insight'

export interface NotificationItem {
  id: string
  userId: string
  type: NotificationType | null
  message: string
  isRead: boolean | null
  createdAt: string | Date | null
}

export interface NotificationSettings {
  careReminders: boolean
  scanAlerts: boolean
  growthInsights: boolean
  realtimeToasts: boolean
}
