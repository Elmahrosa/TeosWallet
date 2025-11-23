import { type NextRequest, NextResponse } from "next/server"

const PI_API_KEY = process.env.PI_API_KEY || ""
const PI_API_URL = "https://api.minepi.com"

export async function POST(request: NextRequest) {
  try {
    const { paymentId } = await request.json()

    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID is required" }, { status: 400 })
    }

    const response = await fetch(`${PI_API_URL}/v2/payments/${paymentId}/approve`, {
      method: "POST",
      headers: {
        Authorization: `Key ${PI_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json({ error: "Failed to approve payment with Pi Network" }, { status: response.status })
    }

    const data = await response.json()

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
