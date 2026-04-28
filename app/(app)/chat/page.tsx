'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedContainer from '@/components/shared/AnimatedContainer'
import { notify } from '@/lib/toast'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  message: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  /* =========================
     AUTO SCROLL
  ========================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  /* =========================
   LOAD CHAT HISTORY
========================= */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/ai/chat/history')

        const data = await res.json()

        if (Array.isArray(data) && data.length > 0) {
          setMessages(
            data.map((msg: any) => ({
              role: msg.role,
              message: msg.message,
            })),
          )
        } else {
          setMessages([
            {
              role: 'assistant',
              message: 'Hello 🌿 I’m E4rth. Ask me anything about your plants.',
            },
          ])
        }
      } catch (err) {
        console.error('Failed to load chat history:', err)
      }
    }

    fetchHistory()
  }, [])

  /* =========================
     SEND MESSAGE
  ========================= */
  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        message: userMessage,
      },
    ])

    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      })

      const data = await res.json()

      if (data.upgradeRequired) {
        notify.error('Daily AI limit reached. Upgrade to Premium 🌿')

        return
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          message: data.response,
        },
      ])
    } catch (err) {
      console.error('Chat failed:', err)

      notify.error('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* 🌿 Header */}
      <AnimatedContainer>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Plant Assistant 🌿</h2>

          <p className="text-sm text-foreground/70 mt-1">
            Ask questions about your plants, diseases, growth, and care.
          </p>
        </div>
      </AnimatedContainer>

      {/* 💬 Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, index) => (
          <AnimatedContainer key={index} delay={index * 0.02}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'ml-auto bg-gradient-verdant text-white shadow-glow'
                  : 'glass border border-white/10'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="max-w-none text-sm leading-relaxed space-y-3">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-xl font-semibold mt-4 mb-2">
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2 className="text-lg font-semibold mt-4 mb-2">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="text-base font-semibold mt-3 mb-2 text-verdant-500">
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p className="text-foreground/80 leading-7">
                          {children}
                        </p>
                      ),

                      li: ({ children }) => (
                        <li className="ml-4 list-disc text-foreground/80 mb-1">
                          {children}
                        </li>
                      ),

                      strong: ({ children }) => (
                        <strong className="font-semibold text-foreground">
                          {children}
                        </strong>
                      ),

                      em: ({ children }) => (
                        <em className="italic text-verdant-500">{children}</em>
                      ),
                    }}
                  >
                    {msg.message}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.message
              )}
            </div>
          </AnimatedContainer>
        ))}

        {/* 🌱 Typing */}
        {loading && (
          <div className="glass border border-white/10 rounded-2xl px-4 py-3 text-sm w-fit">
            E4rth is thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ✍️ Input */}
      <div className="mt-6">
        <div className="glass border border-white/10 rounded-2xl p-3 flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend()
              }
            }}
            placeholder="Ask about your plants..."
            className="flex-1 bg-transparent outline-none text-sm"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-gradient-verdant text-white text-sm shadow-glow"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
