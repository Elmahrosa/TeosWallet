"use server"

import { createOpenAI } from "@ai-sdk/openai"
import { generateText, streamText } from "ai"

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// OpenMind AI configuration (OpenAI-compatible API)
const openmind = createOpenAI({
  apiKey: process.env.OPENMIND_API_KEY,
  baseURL: process.env.OPENMIND_BASE_URL || "https://api.openmind.ai/v1",
})

export interface WalletQuery {
  message: string
  context?: {
    balances?: Record<string, number>
    recentTx?: any[]
    userAddress?: string
  }
  provider?: "openai" | "openmind"
}

export async function askWalletAssistant(query: WalletQuery) {
  const systemPrompt = `You are TEOS AI Assistant, a helpful blockchain wallet expert for the TEOS ecosystem.
You help users with:
- Understanding token balances (TEOS, TUT, ERT, SOL)
- Explaining transaction history
- Guiding through swaps and transfers
- Answering questions about the Pi Network integration
- Providing security best practices

Context:
${query.context?.balances ? `User balances: ${JSON.stringify(query.context.balances)}` : ""}
${query.context?.recentTx ? `Recent transactions: ${JSON.stringify(query.context.recentTx)}` : ""}

Be concise, friendly, and accurate. Use Egyptian references when appropriate.`

  const provider = query.provider || (process.env.OPENMIND_API_KEY ? "openmind" : "openai")
  const aiModel = provider === "openmind" ? openmind("gpt-4") : openai("gpt-4o-mini")

  try {
    const { text } = await generateText({
      model: aiModel,
      system: systemPrompt,
      prompt: query.message,
      maxTokens: 500,
    })

    return { success: true, response: text, provider }
  } catch (error) {
    if (provider === "openmind" && process.env.OPENAI_API_KEY) {
      try {
        const { text } = await generateText({
          model: openai("gpt-4o-mini"),
          system: systemPrompt,
          prompt: query.message,
          maxTokens: 500,
        })
        return { success: true, response: text, provider: "openai" }
      } catch (fallbackError) {
        return { success: false, error: "All AI providers failed" }
      }
    }
    return { success: false, error: "Failed to get AI response" }
  }
}

export async function streamWalletAssistant(query: WalletQuery) {
  const systemPrompt = `You are TEOS AI Assistant, a helpful blockchain wallet expert for the TEOS ecosystem.`

  const provider = query.provider || (process.env.OPENMIND_API_KEY ? "openmind" : "openai")
  const aiModel = provider === "openmind" ? openmind("gpt-4") : openai("gpt-4o-mini")

  return streamText({
    model: aiModel,
    system: systemPrompt,
    prompt: query.message,
    maxTokens: 500,
  })
}
