export interface FiatQuote {
  fiatAmount: number
  fiatCurrency: string
  cryptoAmount: number
  cryptoCurrency: string
  exchangeRate: number
  fees: number
  provider: "moonpay" | "transak" | "ramp"
  estimatedTime: string
}

export interface FiatSwapRequest {
  type: "buy" | "sell"
  fiatAmount?: number
  cryptoAmount?: number
  fiatCurrency: string // USD, EUR, EGP
  cryptoCurrency: string // Pi, TEOS, TUT, ERT
  walletAddress: string
}

export class FiatService {
  async getQuote(request: FiatSwapRequest): Promise<FiatQuote> {
    // Calculate exchange rates
    const rates: Record<string, number> = {
      Pi: 1.5, // $1.50 per Pi (example rate)
      TEOS: 0.01, // $0.01 per TEOS
      TUT: 0.42, // $0.42 per TUT
      ERT: 1.0, // $1.00 per ERT (stablecoin)
      SOL: 150.0, // $150 per SOL
    }

    const rate = rates[request.cryptoCurrency] || 1
    const feePercent = 0.025 // 2.5% fee

    let fiatAmount = request.fiatAmount || 0
    let cryptoAmount = request.cryptoAmount || 0

    if (request.type === "buy") {
      // User wants to buy crypto with fiat
      cryptoAmount = (fiatAmount * (1 - feePercent)) / rate
    } else {
      // User wants to sell crypto for fiat
      fiatAmount = cryptoAmount * rate * (1 - feePercent)
    }

    const fees = request.type === "buy" ? fiatAmount * feePercent : cryptoAmount * rate * feePercent

    return {
      fiatAmount,
      fiatCurrency: request.fiatCurrency,
      cryptoAmount,
      cryptoCurrency: request.cryptoCurrency,
      exchangeRate: rate,
      fees,
      provider: "moonpay",
      estimatedTime: "5-10 minutes",
    }
  }

  async initiateSwap(quote: FiatQuote, request: FiatSwapRequest): Promise<string> {
    // In production, integrate with MoonPay, Transak, or Ramp
    if (quote.provider === "moonpay") {
      const params = new URLSearchParams({
        apiKey: process.env.MOONPAY_API_KEY || "demo_key",
        currencyCode: quote.cryptoCurrency.toLowerCase(),
        walletAddress: request.walletAddress,
        baseCurrencyAmount: quote.fiatAmount.toString(),
        baseCurrencyCode: quote.fiatCurrency.toLowerCase(),
      })

      return `https://buy.moonpay.com?${params.toString()}`
    }

    throw new Error("Fiat provider not configured")
  }
}

export const fiatService = new FiatService()
