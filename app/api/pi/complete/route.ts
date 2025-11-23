import { type NextRequest, NextResponse } from "next/server"

const PI_API_KEY = process.env.PI_API_KEY || ""
const PI_API_URL = "https://api.minepi.com"

export async function POST(request: NextRequest) {
  try {
    const { paymentId, txid } = await request.json()

    if (!paymentId || !txid) {
      return NextResponse.json({ error: "Payment ID and transaction ID are required" }, { status: 400 })
    }

    const response = await fetch(`${PI_API_URL}/v2/payments/${paymentId}/complete`, {
      method: "POST",
      headers: {
        Authorization: `Key ${PI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txid }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("Pi API completion error:", error)
      return NextResponse.json({ error: "Failed to complete payment with Pi Network" }, { status: response.status })
    }

    const data = await response.json()

    // Store payment record in your database here
    // This confirms the user has paid and can access features

    return NextResponse.json({ success: true, data })
    // </CHANGE>
  } catch (error) {
    console.error("Payment completion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
