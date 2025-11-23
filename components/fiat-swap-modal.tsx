"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeftRight, DollarSign, Coins } from "lucide-react"
import { fiatService, type FiatQuote, type FiatSwapRequest } from "@/lib/fiat-service"

interface FiatSwapModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  walletAddress: string
}

export function FiatSwapModal({ open, onOpenChange, walletAddress }: FiatSwapModalProps) {
  const [swapType, setSwapType] = useState<"buy" | "sell">("buy")
  const [fiatAmount, setFiatAmount] = useState("")
  const [fiatCurrency, setFiatCurrency] = useState("USD")
  const [cryptoCurrency, setCryptoCurrency] = useState("Pi")
  const [quote, setQuote] = useState<FiatQuote | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGetQuote = async () => {
    setLoading(true)
    try {
      const request: FiatSwapRequest = {
        type: swapType,
        fiatAmount: Number.parseFloat(fiatAmount),
        fiatCurrency,
        cryptoCurrency,
        walletAddress,
      }

      const newQuote = await fiatService.getQuote(request)
      setQuote(newQuote)
    } catch (error) {
      console.error("Failed to get quote:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSwap = async () => {
    if (!quote) return

    try {
      const request: FiatSwapRequest = {
        type: swapType,
        fiatAmount: quote.fiatAmount,
        fiatCurrency,
        cryptoCurrency,
        walletAddress,
      }

      const paymentUrl = await fiatService.initiateSwap(quote, request)
      window.open(paymentUrl, "_blank")
    } catch (error) {
      console.error("Failed to initiate swap:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <DollarSign className="h-5 w-5" />
            Buy/Sell Crypto with Fiat
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={swapType === "buy" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setSwapType("buy")}
            >
              Buy Crypto
            </Button>
            <Button
              variant={swapType === "sell" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setSwapType("sell")}
            >
              Sell Crypto
            </Button>
          </div>

          <div>
            <Label>Fiat Amount</Label>
            <div className="flex gap-2 mt-2">
              <select
                className="bg-background border border-border rounded-lg px-3 py-2 w-24"
                value={fiatCurrency}
                onChange={(e) => setFiatCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="EGP">EGP</option>
              </select>
              <Input
                type="number"
                value={fiatAmount}
                onChange={(e) => setFiatAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label>Cryptocurrency</Label>
            <select
              className="w-full bg-background border border-border rounded-lg px-3 py-2 mt-2"
              value={cryptoCurrency}
              onChange={(e) => setCryptoCurrency(e.target.value)}
            >
              <option value="Pi">Pi (π)</option>
              <option value="TEOS">TEOS</option>
              <option value="TUT">TUT</option>
              <option value="ERT">ERT</option>
              <option value="SOL">SOL</option>
            </select>
          </div>

          <Button onClick={handleGetQuote} disabled={loading || !fiatAmount} className="w-full">
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            Get Quote
          </Button>

          {quote && (
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">You {swapType === "buy" ? "pay" : "receive"}:</span>
                <span className="font-bold">
                  {quote.fiatAmount.toFixed(2)} {quote.fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">You {swapType === "buy" ? "get" : "pay"}:</span>
                <span className="font-bold">
                  {quote.cryptoAmount.toFixed(4)} {quote.cryptoCurrency}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Exchange Rate:</span>
                <span>
                  1 {quote.cryptoCurrency} = {quote.exchangeRate.toFixed(2)} {quote.fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fees:</span>
                <span>
                  {quote.fees.toFixed(2)} {quote.fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Provider:</span>
                <span className="capitalize">{quote.provider}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Est. Time:</span>
                <span>{quote.estimatedTime}</span>
              </div>

              <Button onClick={handleSwap} className="w-full mt-4 gradient-gold">
                <Coins className="mr-2 h-4 w-4" />
                Continue to {quote.provider}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
