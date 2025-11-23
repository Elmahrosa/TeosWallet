import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TEOS Wallet - Digital Pharaohs Gateway",
  description: "Become a Verified TEOS Pioneer - Official TEOS Network Wallet",
  generator: "v0.app",
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
      {/* </CHANGE> */}
      <body className={`${geistSans.className} ${geistMono.className}`}>{children}</body>
    </html>
  )
}
