import { streamText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

export default defineEventHandler(async (event) => {
  const { messages, prompt, model, apiKey } = await readBody(event)

  const google = createGoogleGenerativeAI({
    apiKey: apiKey || process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
  })

  const selectedModel = google(model || 'gemini-3-flash-preview')

  // Support both chat (messages) and completion (prompt) modes
  const msgs = messages || [{ role: 'user', content: prompt }]

  const result = streamText({
    model: selectedModel,
    messages: msgs
  })

  return result.toTextStreamResponse()
})
