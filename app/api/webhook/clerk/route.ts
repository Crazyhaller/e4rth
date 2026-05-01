import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

interface ClerkWebhookEvent {
  type: 'user.created' | 'user.updated' | 'user.deleted' | string
  data: {
    id: string
    email_addresses?: Array<{ email_address?: string }>
    first_name?: string | null
    last_name?: string | null
    image_url?: string | null
  }
}

/**
 * Clerk Webhook Handler
 */
export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET')
  }

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  const payload = await req.text()

  // Verify webhook
  const wh = new Webhook(WEBHOOK_SECRET)

  let event: ClerkWebhookEvent

  try {
    event = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkWebhookEvent
  } catch (err) {
    console.error('Webhook verification failed', err)
    return new Response('Invalid signature', { status: 400 })
  }

  const { type, data } = event

  try {
    switch (type) {
      /**
       * 🟢 USER CREATED
       */
      case 'user.created': {
        await db.insert(users).values({
          clerkId: data.id,
          email: data.email_addresses?.[0]?.email_address ?? '',
          name: `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim(),
          imageUrl: data.image_url,
        })
        break
      }

      /**
       * 🟡 USER UPDATED
       */
      case 'user.updated': {
        await db
          .update(users)
          .set({
            email: data.email_addresses?.[0]?.email_address,
            name: `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim(),
            imageUrl: data.image_url,
          })
          .where(eq(users.clerkId, data.id))
        break
      }

      /**
       * 🔴 USER DELETED
       */
      case 'user.deleted': {
        await db.delete(users).where(eq(users.clerkId, data.id))
        break
      }

      default:
        console.log('Unhandled webhook type:', type)
    }

    return new Response('Webhook processed', { status: 200 })
  } catch (error) {
    console.error('Webhook DB error:', error)
    return new Response('Database error', { status: 500 })
  }
}
