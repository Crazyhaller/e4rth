import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

/**
 * Ensures we always have a DB user for the current Clerk user
 */
export async function getCurrentUser() {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  // Check if user exists in DB
  const dbUser = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  })

  if (dbUser) {
    return dbUser
  }

  /**
   * Fallback: create user if webhook hasn't synced yet
   */
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return null
  }

  const email = clerkUser.emailAddresses?.[0]?.emailAddress ?? ''

  const name = `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim()

  const imageUrl = clerkUser.imageUrl

  const inserted = await db
    .insert(users)
    .values({
      clerkId: userId,
      email,
      name,
      imageUrl,
    })
    .returning()

  return inserted[0]
}
