import { apiRequest } from '@/lib/api/client'
import type { ChatMessage } from '@/types/ai'

export async function getChatHistory() {
  return apiRequest<ChatMessage[]>('/api/ai/chat/history')
}

export async function sendChatMessage(message: string) {
  return apiRequest<{ response: string }>('/api/ai/chat', {
    method: 'POST',
    body: { message },
  })
}
