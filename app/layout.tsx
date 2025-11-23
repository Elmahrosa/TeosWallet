import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TEOS Wallet - Digital Pharaohs Gateway",
  description: "Official TEOS Network Wallet - From Egypt to the World, Powering the Digital Pharaohs",
  keywords: ["TEOS", "wallet", "cryptocurrency", "Egypt", "blockchain", "Solana", "DeFi"],
  generator: "v0.app",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FFD700'/%3E%3Cpath d='M50 10 L90 90 L10 90 Z' fill='%23000' opacity='0.8'/%3E%3Cpath d='M50 25 L75 75 L25 75 Z' fill='%23FFD700' opacity='0.5'/%3E%3Ctext x='50' y='70' fontSize='32' fill='%23FFD700' textAnchor='middle' fontWeight='bold'%3E𓀠%3C/text%3E%3C/svg%3E",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://sdk.minepi.com/pi-sdk.js" async></script>
      </head>
      <body className={`${geistSans.className} ${geistMono.className}`}>{children}</body>
    </html>
  )
}
