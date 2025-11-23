export interface SwapQuote {
  inputMint: string
  outputMint: string
  inAmount: number
  outAmount: number
  priceImpact: number
  slippage: number
  fees: Array<{ name: string; amount: number }>
}

export class SwapService {
  async getQuote(inputMint: string, outputMint: string, amount: number, slippage = 0.5): Promise<SwapQuote> {
    // Use Jupiter aggregator for best routes
    try {
      const response = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippage * 100}`,
      )
      const data = await response.json()

      return {
        inputMint,
        outputMint,
        inAmount: amount,
        outAmount: data.outAmount,
        priceImpact: data.priceImpactPct,
        slippage,
        fees: data.routePlan?.map((r: any) => ({ name: r.swapInfo.label, amount: r.swapInfo.feeAmount })) || [],
      }
    } catch (error) {
      console.error("Failed to get swap quote:", error)
      throw error
    }
  }

  async executeSwap(quote: SwapQuote, walletAddress: string): Promise<string> {
    // Execute swap transaction
    throw new Error("Swap requires wallet signature")
  }
}

export const swapService = new SwapService()
