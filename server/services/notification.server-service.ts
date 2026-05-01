import { db } from '@/lib/db'

import { notifications } from '@/lib/db/schema'

import { and, eq, inArray, desc } from 'drizzle-orm'

import { NOTIFICATION_TYPES } from '@/lib/utils/constants'
import { publishRealtimeEvent } from '@/lib/redis/client'
import { REDIS_CHANNELS } from '@/websocket/events'
import type { NotificationItem } from '@/types/notification'

/* =========================================
   CREATE NOTIFICATION
========================================= */

export async function createNotificationService({
  userId,
  type,
  message,
}: {
  userId: string

  type: (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES]

  message: string
}) {
  const created = await db
    .insert(notifications)
    .values({
      userId,

      type,

      message,
    })
    .returning()

  const notification = created[0] as NotificationItem

  await publishRealtimeEvent(REDIS_CHANNELS.NOTIFICATIONS, {
    userId,
    notification,
  })

  return notification
}

/* =========================================
   GET USER NOTIFICATIONS
========================================= */

export async function getNotificationsService(userId: string) {
  return db.query.notifications.findMany({
    where: eq(notifications.userId, userId),

    orderBy: [desc(notifications.createdAt)],
  })
}

/* =========================================
   MARK AS READ
========================================= */

export async function markNotificationsReadService({
  userId,
  notificationIds,
}: {
  userId: string

  notificationIds: string[]
}) {
  /**
   * ⚡ Batch update
   */
  await db
    .update(notifications)
    .set({
      isRead: true,
    })
    .where(
      and(
        eq(notifications.userId, userId),

        inArray(notifications.id, notificationIds),
      ),
    )

  await publishRealtimeEvent(REDIS_CHANNELS.NOTIFICATIONS, {
    userId,
    notificationIds,
  })

  return {
    success: true,
  }
}
