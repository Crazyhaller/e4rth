import type { Server, Socket } from 'socket.io'
import {
  type NotificationCreatedPayload,
  type NotificationsReadPayload,
  WS_EVENTS,
} from '../events'

export function notificationRoom(userId: string) {
  return `user:${userId}:notifications`
}

export function registerNotificationHandlers(socket: Socket) {
  socket.on(WS_EVENTS.REGISTER, (payload: { userId?: string }) => {
    if (!payload.userId) return
    socket.join(notificationRoom(payload.userId))
  })
}

export function emitNotificationCreated(
  io: Server,
  payload: NotificationCreatedPayload,
) {
  io.to(notificationRoom(payload.userId)).emit(
    WS_EVENTS.NOTIFICATION_CREATED,
    payload.notification,
  )
}

export function emitNotificationsRead(
  io: Server,
  payload: NotificationsReadPayload,
) {
  io.to(notificationRoom(payload.userId)).emit(
    WS_EVENTS.NOTIFICATIONS_READ,
    payload.notificationIds,
  )
}
