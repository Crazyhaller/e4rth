'use client'

import ReactMarkdown from 'react-markdown'
import type { ChatMessage } from '@/types/ai'

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isUser
          ? 'ml-auto bg-gradient-e4rth text-primary-foreground shadow-glow'
          : 'surface'
      }`}
    >
      {isUser ? (
        message.message
      ) : (
        <div className="space-y-3">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-xl font-semibold">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-semibold text-e4rth-300">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="leading-7 text-foreground/80">{children}</p>
              ),
              li: ({ children }) => (
                <li className="ml-4 list-disc text-foreground/80">
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">
                  {children}
                </strong>
              ),
            }}
          >
            {message.message}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}
