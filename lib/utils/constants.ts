/* =========================================
   APP
========================================= */

export const APP_NAME = 'E4rth'

export const APP_DESCRIPTION = 'AI-powered plant intelligence platform'

/* =========================================
   PLANS
========================================= */

export const FREE_PLAN = 'free'

export const PREMIUM_PLAN = 'premium'

/* =========================================
   AI LIMITS
========================================= */

export const FREE_SCAN_LIMIT = 5

export const FREE_CHAT_LIMIT = 20

/* =========================================
   PLANT TAGS
========================================= */

export const PLANT_TAGS = [
  'Indoor',
  'Outdoor',
  'Herb',
  'Flowering',
  'Succulent',
  'Tropical',
  'Medicinal',
  'Fruit',
  'Vegetable',
] as const

/* =========================================
   SCAN SEVERITY
========================================= */

export const SCAN_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const

/* =========================================
   NOTIFICATION TYPES
========================================= */

export const NOTIFICATION_TYPES = {
  CARE_REMINDER: 'care_reminder',
  PLANT_ALERT: 'plant_alert',
  SCAN_COMPLETED: 'scan_completed',
  GROWTH_INSIGHT: 'growth_insight',
} as const

/* =========================================
   ROUTES
========================================= */

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PLANTS: '/plants',
  SCAN: '/scan',
  ANALYTICS: '/analytics',
  CHAT: '/chat',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
  PRICING: '/pricing',
} as const

/* =========================================
   QUERY KEYS
========================================= */

export const QUERY_KEYS = {
  PLANTS: 'plants',
  SCANS: 'scans',
  NOTIFICATIONS: 'notifications',
  ANALYTICS: 'analytics',
  CHAT: 'chat',
} as const
