import { Keypair } from "@solana/web3.js"
import { FounderAuth, type VerificationStatus } from "./founder-auth"

export class VerificationManager {
  static async verifyFounderDirect(piUsername: string): Promise<VerificationStatus> {
    if (!FounderAuth.shouldBypassPayment(piUsername)) {
      throw new Error("Not authorized for direct verification")
    }

    const solanaAddress = Keypair.generate().publicKey.toBase58()
    const piAddress = `G${piUsername.replace("@", "").toUpperCase()}`

    const status: VerificationStatus = {
      isVerified: true,
      isPaid: true,
      piUsername,
      paymentId: "FOUNDER_BYPASS",
      solanaAddress,
      piAddress,
      badge: "founder",
      verifiedAt: new Date().toISOString(),
      metadata: {
        isFounder: true,
        bypassedPayment: true,
      },
    }

    this.saveVerificationStatus(status)
    return status
  }
}
