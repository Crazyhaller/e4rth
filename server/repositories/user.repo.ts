import { db } from '@/lib/db'

import { users, subscriptions } from '@/lib/db/schema'

import { eq } from 'drizzle-orm'

/* =========================================
   GET USER BY ID
========================================= */

export async function getUserById(userId: string) {
  return db.query.users.findFirst({
    where: eq(users.id, userId),
  })
}

/* =========================================
   GET USER BY CLERK ID
========================================= */

export async function getUserByClerkId(clerkId: string) {
  return db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  })
}

/* =========================================
   UPDATE USER PLAN
========================================= */

export async function updateUserPlan({
  userId,
  plan,
}: {
  userId: string
  plan: 'free' | 'premium'
}) {
  const updated = await db
    .update(users)
    .set({
      plan,
    })
    .where(eq(users.id, userId))
    .returning()

  return updated[0]
}

/* =========================================
   CREATE SUBSCRIPTION
========================================= */

export async function createSubscription({
  userId,
  plan,
  status,
  stripeCustomerId,
  stripeSubscriptionId,
  currentPeriodEnd,
}: {
  userId: string

  plan: 'free' | 'premium'

  status: 'active' | 'cancelled' | 'past_due'

  stripeCustomerId?: string | null

  stripeSubscriptionId?: string | null

  currentPeriodEnd?: Date | null
}) {
  const created = await db
    .insert(subscriptions)
    .values({
      userId,
      plan,
      status,

      razorpayCustomerId: stripeCustomerId,

      razorpaySubId: stripeSubscriptionId,

      currentPeriodEnd: currentPeriodEnd ?? null,
    })
    .returning()

  return created[0]
}

/* =========================================
   GET ACTIVE SUBSCRIPTION
========================================= */

export async function getActiveSubscription(userId: string) {
  return db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  })
}
