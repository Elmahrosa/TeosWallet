// Pi Network SDK Configuration
export const PI_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_PI_API_KEY || "",
  walletAddress: "GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F",
  paymentAmount: 1,
  paymentMemo: "TEOS Pioneer Wallet Activation",
}

export interface PiUser {
  uid: string
  username: string
}

export interface PiPayment {
  identifier: string
  amount: number
  memo: string
  metadata: Record<string, any>
  status: {
    developer_approved: boolean
    transaction_verified: boolean
    developer_completed: boolean
    cancelled: boolean
    user_cancelled: boolean
  }
}

import { FounderAuth } from "./founder-auth"

class PiSDK {
  private pi: any
  private initialized = false

  constructor() {
    if (typeof window !== "undefined") {
      this.pi = (window as any).Pi
    }
  }

  init(): void {
    if (this.initialized || typeof window === "undefined") {
      return
    }

    if (!this.pi) {
      this.pi = (window as any).Pi
    }

    if (this.pi) {
      try {
        this.pi.init({ version: "2.0", sandbox: false })
        this.initialized = true
      } catch (error) {
        throw error
      }
    }
  }

  async waitForSDK(maxWaitMs = 10000): Promise<void> {
    const startTime = Date.now()

    while (!this.pi && Date.now() - startTime < maxWaitMs) {
      this.pi = (window as any).Pi
      if (this.pi) break
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    if (!this.pi) {
      throw new Error("Pi SDK not loaded. Please open this app in Pi Browser.")
    }

    this.init()
  }

  private checkInitialized(): void {
    if (!this.initialized || !this.pi) {
      throw new Error("Pi Network SDK was not initialized. Call init() first.")
    }
  }

  async authenticate(): Promise<PiUser> {
    this.checkInitialized()

    try {
      const scopes = ["payments", "username"]
      const authResult = await this.pi.authenticate(scopes, this.onIncompletePaymentFound.bind(this))

      if (FounderAuth.shouldBypassPayment(authResult.user.username)) {
      }

      return authResult.user
    } catch (error) {
      throw error
    }
  }

  async createPayment(
    amount = 1,
    memo: string = PI_CONFIG.paymentMemo,
    metadata?: Record<string, any>,
  ): Promise<string> {
    this.checkInitialized()

    try {
      const paymentData = {
        amount,
        memo,
        metadata: metadata || {
          timestamp: Date.now(),
          app: "TeosWallet",
          purpose: "wallet_activation",
        },
      }

      const payment = await this.pi.createPayment(paymentData, {
        onReadyForServerApproval: (paymentId: string) => {
          this.approvePayment(paymentId)
        },
        onReadyForServerCompletion: (paymentId: string, txid: string) => {
          this.completePayment(paymentId, txid)
        },
        onCancel: (paymentId: string) => {},
        onError: (error: Error, payment: any) => {
          // Handled by caller
        },
      })

      return payment.identifier
    } catch (error) {
      throw error
    }
  }

  private async approvePayment(paymentId: string): Promise<void> {
    try {
      const response = await fetch("/api/pi/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to approve payment")
      }
    } catch (error) {
      throw error
    }
  }

  private async completePayment(paymentId: string, txid: string): Promise<void> {
    try {
      const response = await fetch("/api/pi/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId, txid }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to complete payment")
      }
    } catch (error) {
      throw error
    }
  }

  private onIncompletePaymentFound(payment: PiPayment): void {
    // Handle incomplete payment resumption if needed
  }

  isAvailable(): boolean {
    return !!this.pi
  }

  isInitialized(): boolean {
    return this.initialized
  }

  isReady(): boolean {
    return this.initialized && !!this.pi
  }

  async processPayment(paymentId: string): Promise<any> {
    this.checkInitialized()
    // Payment processing handled by callbacks
    return { success: true, paymentId }
  }
}

export const piSDK = new PiSDK()
