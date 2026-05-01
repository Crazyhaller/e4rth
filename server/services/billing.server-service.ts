import {
  getActiveSubscription,
  getUserById,
  updateUserPlan,
} from '@/server/repositories/user.repo'

import { FREE_PLAN, PREMIUM_PLAN } from '@/lib/utils/constants'

/* =========================================
   GET USER PLAN
========================================= */

export async function getUserPlanService(userId: string) {
  const user = await getUserById(userId)

  if (!user) {
    throw new Error('User not found')
  }

  return {
    plan: user.plan || FREE_PLAN,
  }
}

/* =========================================
   IS PREMIUM USER
========================================= */

export async function isPremiumUserService(userId: string) {
  const user = await getUserById(userId)

  if (!user) {
    return false
  }

  return user.plan === PREMIUM_PLAN
}

/* =========================================
   ACTIVATE PREMIUM
========================================= */

export async function activatePremiumService({ userId }: { userId: string }) {
  return updateUserPlan({
    userId,
    plan: PREMIUM_PLAN,
  })
}

/* =========================================
   DOWNGRADE TO FREE
========================================= */

export async function downgradeToFreeService({ userId }: { userId: string }) {
  return updateUserPlan({
    userId,
    plan: FREE_PLAN,
  })
}

/* =========================================
   GET SUBSCRIPTION
========================================= */

export async function getSubscriptionService(userId: string) {
  return getActiveSubscription(userId)
}
