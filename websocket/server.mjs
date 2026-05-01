import { createServer } from 'node:http'
import Redis from 'ioredis'
import { Server } from 'socket.io'

const WS_EVENTS = {
  REGISTER: 'session:register',
  DISCONNECT: 'disconnect',
  NOTIFICATION_CREATED: 'notification:created',
  SCAN_COMPLETED: 'scan:completed',
}

const REDIS_CHANNELS = {
  NOTIFICATIONS: 'e4rth:notifications',
  SCANS: 'e4rth:scans',
}

const port = Number(process.env.WEBSOCKET_PORT ?? 4001)
const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL ?? '*',
    methods: ['GET', 'POST'],
  },
})

function notificationRoom(userId) {
  return `user:${userId}:notifications`
}

function plantRoom(userId) {
  return `user:${userId}:plants`
}

io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId

  if (typeof userId === 'string') {
    socket.join(notificationRoom(userId))
    socket.join(plantRoom(userId))
  }

  socket.on(WS_EVENTS.REGISTER, (payload) => {
    if (!payload?.userId) return
    socket.join(notificationRoom(payload.userId))
    socket.join(plantRoom(payload.userId))
  })

  socket.on(WS_EVENTS.DISCONNECT, () => undefined)
})

async function subscribeToRedis() {
  if (!process.env.REDIS_URL) return

  const subscriber = new Redis(process.env.REDIS_URL)

  await subscriber.subscribe(REDIS_CHANNELS.NOTIFICATIONS, REDIS_CHANNELS.SCANS)

  subscriber.on('message', (channel, message) => {
    const parsed = JSON.parse(message)

    if (channel === REDIS_CHANNELS.NOTIFICATIONS) {
      io.to(notificationRoom(parsed.userId)).emit(
        WS_EVENTS.NOTIFICATION_CREATED,
        parsed.notification,
      )
    }

    if (channel === REDIS_CHANNELS.SCANS) {
      io.to(plantRoom(parsed.userId)).emit(
        WS_EVENTS.SCAN_COMPLETED,
        parsed.scan,
      )
    }
  })
}

subscribeToRedis().catch((error) => {
  console.error('Websocket Redis subscription failed:', error)
})

httpServer.listen(port, () => {
  console.log(`E4rth websocket server listening on :${port}`)
})
