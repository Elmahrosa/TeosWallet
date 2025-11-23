import { type NextRequest, NextResponse } from "next/server"
import { askWalletAssistant, type WalletQuery } from "@/lib/ai-assistant"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, context, provider } = body as WalletQuery

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const result = await askWalletAssistant({
      message,
      context,
      provider,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("AI chat API error:", error)
    return NextResponse.json({ success: false, error: "Failed to process AI request" }, { status: 500 })
  }
}
