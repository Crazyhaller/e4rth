import { createServer } from 'node:http'
import Redis from 'ioredis'
import { Server } from 'socket.io'
import {
  REDIS_CHANNELS,
  type NotificationCreatedPayload,
  type ScanCompletedPayload,
  WS_EVENTS,
} from './events'
import {
  emitNotificationCreated,
  registerNotificationHandlers,
} from './handlers/notification.handler'
import {
  emitScanCompleted,
  registerPlantHandlers,
} from './handlers/plant.handler'

const port = Number(process.env.WEBSOCKET_PORT ?? 4001)
const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL ?? '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId

  if (typeof userId === 'string') {
    socket.join(`user:${userId}:notifications`)
    socket.join(`user:${userId}:plants`)
  }

  registerNotificationHandlers(socket)
  registerPlantHandlers(socket)

  socket.on(WS_EVENTS.DISCONNECT, () => undefined)
})

async function subscribeToRedis() {
  if (!process.env.REDIS_URL) return

  const subscriber = new Redis(process.env.REDIS_URL)

  await subscriber.subscribe(REDIS_CHANNELS.NOTIFICATIONS, REDIS_CHANNELS.SCANS)

  subscriber.on('message', (channel, message) => {
    const parsed = JSON.parse(message) as unknown

    if (channel === REDIS_CHANNELS.NOTIFICATIONS) {
      emitNotificationCreated(io, parsed as NotificationCreatedPayload)
    }

    if (channel === REDIS_CHANNELS.SCANS) {
      emitScanCompleted(io, parsed as ScanCompletedPayload)
    }
  })
}

subscribeToRedis().catch((error) => {
  console.error('Websocket Redis subscription failed:', error)
})

httpServer.listen(port, () => {
  console.log(`E4rth websocket server listening on :${port}`)
})
