import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { plants, chats } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import { eq } from 'drizzle-orm'
import { GoogleGenAI } from '@google/genai'
import { checkAiUsage } from '@/lib/usage/checkAiUsage'
import { getUserPlants } from '@/server/repositories/plant.repo'

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

/**
 * POST /api/ai/chat
 */
export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    /**
     * 💬 Usage limits
     */
    const usage = await checkAiUsage(user.id)

    if (!usage.allowed) {
      return NextResponse.json(
        {
          error: usage.reason,
          upgradeRequired: true,
        },
        { status: 403 },
      )
    }

    const body = await req.json()
    const { message } = body

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    /**
     * 🌿 User plants context
     */
    const userPlants = await getUserPlants(user.id)

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
${message}

Rules:
- Be concise but helpful
- Give actionable plant advice
- Use a friendly botanical tone
- Keep answers readable
`

    const result = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [prompt],
    })

    const response = result.text

    if (!response) {
      throw new Error('AI returned an empty response')
    }

    /**
     * 💾 Store user message
     */
    await db.insert(chats).values({
      userId: user.id,
      role: 'user',
      message,
    })

    /**
     * 💾 Store AI response
     */
    await db.insert(chats).values({
      userId: user.id,
      role: 'assistant',
      message: response,
    })

    return NextResponse.json({
      response,
    })
  } catch (error) {
    console.error('Chat AI error:', error)
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 })
  }
}
