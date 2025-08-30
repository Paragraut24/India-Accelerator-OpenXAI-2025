// app/api/chat/route.ts
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1]

  // Call Ollama with stream: false for a single response
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3.2:latest',
      prompt: lastMessage.content,
      stream: false,
    }),
  })

  const data = await response.json()
  const text = data.response || ''

  // Return the response as plain text
  return new Response(text, {
    headers: { 'Content-Type': 'text/plain' },
  })
}