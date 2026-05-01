'use client'

import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import AnimatedContainer from '@/components/shared/AnimatedContainer'
import { notify } from '@/lib/toast'
import type { ChatMessage } from '@/types/ai'
import { getChatHistory, sendChatMessage } from '../services/chat.service'
import MessageBubble from './MessageBubble'
import QuickPromptChips from './QuickPromptChips'
import TypingIndicator from './TypingIndicator'

const welcomeMessage: ChatMessage = {
  role: 'assistant',
  message: 'Hello. I am E4rth. Ask me anything about your plants.',
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getChatHistory()
        setMessages(data.length > 0 ? data : [welcomeMessage])
      } catch (err) {
        console.error('Failed to load chat history:', err)
        setMessages([welcomeMessage])
      }
    }

    loadHistory()
  }, [])

  const handleSend = async (override?: string) => {
    const text = (override ?? input).trim()
    if (!text || loading) return

    setMessages((prev) => [...prev, { role: 'user', message: text }])
    setInput('')
    setLoading(true)

    try {
      const data = await sendChatMessage(text)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', message: data.response },
      ])
    } catch (err) {
      console.error('Chat failed:', err)
      notify.error('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-128px)] flex-col">
      <AnimatedContainer>
        <div className="surface mb-5 p-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Conversational care
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Plant Assistant
          </h2>
          <p className="mt-2 text-sm leading-7 text-foreground/64">
            Ask about disease symptoms, growth patterns, watering, humidity,
            fertilizer, and care routines.
          </p>
        </div>
      </AnimatedContainer>

      <div className="mb-4">
        <QuickPromptChips onSelect={(prompt) => handleSend(prompt)} />
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {messages.map((message, index) => (
          <AnimatedContainer key={`${message.role}-${index}`} delay={0.02}>
            <MessageBubble message={message} />
          </AnimatedContainer>
        ))}

        {loading && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      <div className="mt-6">
        <div className="surface flex items-center gap-3 p-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSend()
              }
            }}
            placeholder="Ask about your plants..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />

          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="grid h-10 w-10 place-items-center rounded-full bg-gradient-e4rth text-primary-foreground shadow-glow hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
