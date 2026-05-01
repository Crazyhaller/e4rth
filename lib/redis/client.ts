import { Redis } from '@upstash/redis'

const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

export const redis =
  url && token
    ? new Redis({
        url,
        token,
      })
    : null

export async function getJsonCache<T>(key: string): Promise<T | null> {
  if (!redis) return null

  try {
    return await redis.get<T>(key)
  } catch (error) {
    console.error('Redis cache read failed:', error)
    return null
  }
}

export async function setJsonCache(
  key: string,
  value: unknown,
  ttlSeconds: number,
) {
  if (!redis) return

  try {
    await redis.set(key, value, { ex: ttlSeconds })
  } catch (error) {
    console.error('Redis cache write failed:', error)
  }
}

export async function publishRealtimeEvent(channel: string, payload: unknown) {
  if (!redis) return

  try {
    await redis.publish(channel, payload)
  } catch (error) {
    console.error('Redis publish failed:', error)
  }
}
