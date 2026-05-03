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
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })
dotenv.config()

const port = Number(process.env.PORT || process.env.WEBSOCKET_PORT || 4001)
const httpServer = createServer()

// Strict CORS for Production
const allowedOrigins = process.env.NEXT_PUBLIC_APP_URL
  ? [process.env.NEXT_PUBLIC_APP_URL]
  : ['http://localhost:3000'] // Fallback for local dev only

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  // Production stability timeouts
  pingTimeout: 60000,
  pingInterval: 25000,
})

io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId

  if (typeof userId === 'string') {
    socket.join(`user:${userId}:notifications`)
    socket.join(`user:${userId}:plants`)
  }

  registerNotificationHandlers(socket)
  registerPlantHandlers(socket)

  socket.on(WS_EVENTS.DISCONNECT, () => {
    // Optional: Log disconnects in production if needed for debugging
  })
})

async function subscribeToRedis() {
  if (!process.env.REDIS_URL) {
    throw new Error(
      'CRITICAL: REDIS_URL is completely missing. Cannot start subscription.',
    )
  }

  const subscriber = new Redis(process.env.REDIS_URL, {
    // Production retry strategy so it doesn't crash on temporary network blips
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000)
      return delay
    },
  })

  // Log connection status
  subscriber.on('connect', () => console.log('Redis connected successfully.'))
  subscriber.on('error', (err) => console.error('Redis connection error:', err))
  subscriber.on('close', () => console.warn('Redis connection closed.'))

  await subscriber.subscribe(REDIS_CHANNELS.NOTIFICATIONS, REDIS_CHANNELS.SCANS)

  subscriber.on('message', (channel, message) => {
    try {
      const parsed = JSON.parse(message) as unknown

      if (channel === REDIS_CHANNELS.NOTIFICATIONS) {
        emitNotificationCreated(io, parsed as NotificationCreatedPayload)
      }

      if (channel === REDIS_CHANNELS.SCANS) {
        emitScanCompleted(io, parsed as ScanCompletedPayload)
      }
    } catch (error) {
      console.error(
        `Failed to parse Redis message on channel ${channel}:`,
        error,
      )
    }
  })
}

subscribeToRedis().catch((error) => {
  console.error('Websocket Redis subscription absolutely failed:', error)
  process.exit(1) // Kill the process if Redis fails to connect so the host can restart it
})

httpServer.listen(port, '0.0.0.0', () => {
  console.log(`E4rth websocket server listening on port: ${port}`)
  console.log(`Allowing CORS for: ${allowedOrigins.join(', ')}`)
})
