import { db } from '@/lib/db'
import { scans, chats, users } from '@/lib/db/schema'
import { FREE_LIMITS } from '@/lib/plans'
import { eq, gte, and, count } from 'drizzle-orm'

export async function checkAiUsage(userId: string) {
  /**
   * 🌿 Get user plan
   */
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })

  if (!user) {
    return {
      allowed: false,
      reason: 'User not found',
    }
  }

  /**
   * 👑 Premium bypass
   */
  if (user.plan === 'premium') {
    return {
      allowed: true,
    }
  }

  const today = new Date()

  today.setHours(0, 0, 0, 0)

  /**
   * 📸 Today's scans
   */
  const scanCount = await db
    .select({
      count: count(),
    })
    .from(scans)
    .where(and(eq(scans.userId, userId), gte(scans.createdAt, today)))

  /**
   * 💬 Today's chats
   */
  const chatCount = await db
    .select({
      count: count(),
    })
    .from(chats)
    .where(and(eq(chats.userId, userId), gte(chats.createdAt, today)))

  const scansToday = scanCount[0].count
  const chatsToday = chatCount[0].count

  if (scansToday >= FREE_LIMITS.scansPerDay) {
    return {
      allowed: false,
      reason: 'Daily scan limit reached',
    }
  }

  if (chatsToday >= FREE_LIMITS.chatMessagesPerDay) {
    return {
      allowed: false,
      reason: 'Daily chat limit reached',
    }
  }

  return {
    allowed: true,
  }
}
