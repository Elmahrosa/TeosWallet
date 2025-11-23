"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { generateQRCode, downloadQRCode } from "@/lib/qrcode"
import { TEOS_CONFIG } from "@/lib/teos-config"

interface QRCodeItem {
  id: string
  title: string
  description: string
  content: string
  icon: string
}

const QR_CODES: QRCodeItem[] = [
  {
    id: "pioneer",
    title: "Pioneer Sign-Up",
    description: "Recruit new pioneers at events",
    content: "https://pionners.teosegypt.com/",
    icon: "𓀠",
  },
  {
    id: "wallet",
    title: "TEOS Wallet",
    description: "Direct access to wallet app",
    content: "https://wallet.teosegypt.com/",
    icon: "👛",
  },
  {
    id: "petition",
    title: "Civic Petition",
    description: "Verification step 1",
    content: TEOS_CONFIG.civic.petition,
    icon: "✍️",
  },
  {
    id: "telegram",
    title: "Telegram Community",
    description: "Verification step 2",
    content: TEOS_CONFIG.civic.telegram,
    icon: "💬",
  },
  {
    id: "campaign-wallet",
    title: "Campaign Wallet",
    description: "Quick SOL contributions",
    content: TEOS_CONFIG.wallets.campaign,
    icon: "💰",
  },
  {
    id: "teos-token",
    title: "TEOS Token Contract",
    description: "Add to Solana wallet",
    content: TEOS_CONFIG.tokens.teos.mintAddress,
    icon: "🪙",
  },
  {
    id: "nilex",
    title: "Nilex DEX",
    description: "Trading platform access",
    content: TEOS_CONFIG.ecosystem.nilex,
    icon: "⚡",
  },
  {
    id: "whitepaper",
    title: "Whitepaper",
    description: "Full project documentation",
    content: TEOS_CONFIG.ecosystem.whitepaper,
    icon: "📄",
  },
]

export function QRCodePack() {
  const [generatedQRs, setGeneratedQRs] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<string | null>(null)

  const handleGenerate = async (item: QRCodeItem) => {
    setLoading(item.id)
    try {
      const qrDataURL = await generateQRCode(item.content, {
        width: 512,
        errorCorrectionLevel: "H",
        color: {
          dark: "#FFD700",
          light: "#0F172A",
        },
      })
      setGeneratedQRs((prev) => ({ ...prev, [item.id]: qrDataURL }))
    } catch (error) {
      console.error(`Failed to generate QR for ${item.id}:`, error)
    } finally {
      setLoading(null)
    }
  }

  const handleDownload = async (item: QRCodeItem) => {
    const qrDataURL = generatedQRs[item.id]
    if (qrDataURL) {
      downloadQRCode(qrDataURL, `teos-${item.id}-qr.png`)
    }
  }

  const handleDownloadAll = async () => {
    setLoading("all")
    for (const item of QR_CODES) {
      if (!generatedQRs[item.id]) {
        await handleGenerate(item)
      }
    }
    setLoading(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gold">QR Code Pack</h2>
          <p className="text-text-light/70">Event onboarding and marketing materials</p>
        </div>
        <Button onClick={handleDownloadAll} disabled={loading === "all"} className="bg-gradient-primary">
          {loading === "all" ? "Generating All..." : "Download All QR Codes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {QR_CODES.map((item) => (
          <Card key={item.id} className="glass-card border-gold/20 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl">{item.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gold mb-1">{item.title}</h3>
                <p className="text-sm text-text-light/70">{item.description}</p>
              </div>
            </div>

            {generatedQRs[item.id] ? (
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <img
                    src={generatedQRs[item.id] || "/placeholder.svg"}
                    alt={`QR Code for ${item.title}`}
                    className="w-full h-auto"
                  />
                </div>
                <Button onClick={() => handleDownload(item)} className="w-full" variant="outline">
                  Download PNG
                </Button>
              </div>
            ) : (
              <Button onClick={() => handleGenerate(item)} disabled={loading === item.id} className="w-full">
                {loading === item.id ? "Generating..." : "Generate QR"}
              </Button>
            )}

            <div className="mt-3 p-2 bg-deep-blue/50 rounded text-xs font-mono text-text-light/50 break-all">
              {item.content.substring(0, 40)}...
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
