import { analyzePlantImage, generateCarePlan } from '@/lib/ai/gemini'

import { db } from '@/lib/db'

import { plants, chats } from '@/lib/db/schema'

import { asc, eq } from 'drizzle-orm'

import { checkAiUsage } from '@/lib/usage/checkAiUsage'

import { chatSchema } from '@/lib/validators/scan.validator'

import { GoogleGenAI } from '@google/genai'

/* =========================================
   GEMINI
========================================= */

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

/* =========================================
   AI DIAGNOSIS
========================================= */

export async function diagnosePlantService({
  userId,
  imageUrl,
}: {
  userId: string
  imageUrl: string
}) {
  /**
   * 🌿 Usage limits
   */
  const usage = await checkAiUsage(userId)

  if (!usage.allowed) {
    throw new Error(usage.reason || 'AI limit reached')
  }

  return analyzePlantImage(imageUrl)
}

/* =========================================
   AI CARE PLAN
========================================= */

export async function generateAiCarePlanService({
  userId,
  plantId,
}: {
  userId: string
  plantId: string
}) {
  /**
   * 🌿 Usage limits
   */
  const usage = await checkAiUsage(userId)

  if (!usage.allowed) {
    throw new Error(usage.reason || 'AI limit reached')
  }

  /**
   * 🌱 Plant context
   */
  const plant = await db.query.plants.findFirst({
    where: eq(plants.id, plantId),
  })

  if (!plant) {
    throw new Error('Plant not found')
  }

  return generateCarePlan({
    plantName: plant.name,
    species: plant.species,
  })
}

/* =========================================
   AI CHAT
========================================= */

export async function aiChatService({
  userId,
  body,
}: {
  userId: string
  body: unknown
}) {
  /**
   * ✅ Validate
   */
  const parsed = chatSchema.safeParse(body)

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  /**
   * 🌿 Usage limits
   */
  const usage = await checkAiUsage(userId)

  if (!usage.allowed) {
    throw new Error(usage.reason || 'AI limit reached')
  }

  /**
   * 🌱 User plants context
   */
  const userPlants = await db.query.plants.findMany({
    where: eq(plants.userId, userId),
  })

  const context = userPlants
    .map((p) => `Plant: ${p.name}, Species: ${p.species}`)
    .join('\n')

  /**
   * 🧠 AI
   */

  const prompt = `
You are E4rth — a premium plant care assistant.

User plants:
${context}

User message:
${parsed.data.message}

Rules:
- Be concise but helpful
- Give actionable plant advice
- Use markdown formatting where appropriate
- Keep answers readable
`

  const result = await genAI.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [prompt],
  })

  const response = result.text

  if (!response) {
    throw new Error('Empty response received from the model')
  }

  /**
   * 💾 Save user message
   */
  await db.insert(chats).values({
    userId,

    role: 'user',

    message: parsed.data.message,
  })

  /**
   * 💾 Save AI response
   */
  await db.insert(chats).values({
    userId,

    role: 'assistant',

    message: response,
  })

  return {
    response,
  }
}

export async function getChatHistoryService(userId: string) {
  return db.query.chats.findMany({
    where: eq(chats.userId, userId),
    orderBy: [asc(chats.createdAt)],
  })
}
