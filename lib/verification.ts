// Verification system for TEOS Pioneer status
import { Keypair } from "@solana/web3.js"
import { TEOS_CONFIG, type TokenTier } from "./teos-config"

export interface VerificationStatus {
  isPiVerified: boolean
  isTeosPioneer: boolean
  hasWalletAccess: boolean
  piUsername: string | null
  solanaAddress: string | null
  piAddress: string | null
  verifiedAt: number | null
  contributorLevel: TokenTier | "none"
  civicVerified: {
    petition: boolean
    telegram: boolean
    facebook: boolean
    twitter: boolean
  }
  contributionAmount: number
  badgeTier: string | null
}

export class VerificationManager {
  private static STORAGE_KEY = "teos_verification_status"
  private static NILEX_BADGE_KEY = "nilex_badge_sync"

  static getStatus(): VerificationStatus {
    if (typeof window === "undefined") {
      return this.getDefaultStatus()
    }

    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return this.getDefaultStatus()
      }
    }
    return this.getDefaultStatus()
  }

  static saveStatus(status: VerificationStatus): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(status))
    }
  }

  static async verifyWithPi(piUsername: string, paymentId: string): Promise<VerificationStatus> {
    const solanaKeypair = Keypair.generate()
    const solanaAddress = solanaKeypair.publicKey.toBase58()
    const piAddress = TEOS_CONFIG.piNetwork.stellarAddress // Real Pi Network stellar address

    const newStatus: VerificationStatus = {
      isPiVerified: true,
      isTeosPioneer: true,
      hasWalletAccess: true,
      piUsername,
      solanaAddress,
      piAddress,
      verifiedAt: Date.now(),
      contributorLevel: "none",
      civicVerified: {
        petition: false,
        telegram: false,
        facebook: false,
        twitter: false,
      },
      contributionAmount: 0,
      badgeTier: null,
    }

    if (typeof window !== "undefined") {
      // Store encrypted keypair - in production, use proper encryption
      const keypairData = {
        publicKey: solanaAddress,
        secretKey: Array.from(solanaKeypair.secretKey),
        createdAt: Date.now(),
      }
      localStorage.setItem("teos_wallet_keypair", JSON.stringify(keypairData))
    }

    this.saveStatus(newStatus)
    this.syncBadgeToNilex(newStatus)
    return newStatus
  }

  static updateCivicVerification(field: "petition" | "telegram" | "facebook" | "twitter", verified: boolean): void {
    const status = this.getStatus()
    status.civicVerified[field] = verified
    this.saveStatus(status)
    this.syncBadgeToNilex(status)
  }

  static updateContribution(amount: number): void {
    const status = this.getStatus()
    status.contributionAmount += amount

    // Calculate tier based on total contribution
    if (status.contributionAmount >= TEOS_CONFIG.staking.sovereign.contribution) {
      status.contributorLevel = "sovereign"
      status.badgeTier = TEOS_CONFIG.staking.sovereign.badge
    } else if (status.contributionAmount >= TEOS_CONFIG.staking.gold.contribution) {
      status.contributorLevel = "gold"
      status.badgeTier = TEOS_CONFIG.staking.gold.badge
    } else if (status.contributionAmount >= TEOS_CONFIG.staking.silver.contribution) {
      status.contributorLevel = "silver"
      status.badgeTier = TEOS_CONFIG.staking.silver.badge
    } else if (status.contributionAmount >= TEOS_CONFIG.staking.bronze.contribution) {
      status.contributorLevel = "bronze"
      status.badgeTier = TEOS_CONFIG.staking.bronze.badge
    }

    this.saveStatus(status)
    this.syncBadgeToNilex(status)
  }

  static clearStatus(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.STORAGE_KEY)
      localStorage.removeItem(this.NILEX_BADGE_KEY)
      localStorage.removeItem("teos_wallet_keypair")
    }
  }

  private static getDefaultStatus(): VerificationStatus {
    return {
      isPiVerified: false,
      isTeosPioneer: false,
      hasWalletAccess: false,
      piUsername: null,
      solanaAddress: null,
      piAddress: null,
      verifiedAt: null,
      contributorLevel: "none",
      civicVerified: {
        petition: false,
        telegram: false,
        facebook: false,
        twitter: false,
      },
      contributionAmount: 0,
      badgeTier: null,
    }
  }

  static canAccessFeature(feature: "swap" | "mining" | "send" | "receive"): { allowed: boolean; reason?: string } {
    const status = this.getStatus()

    if (!status.hasWalletAccess) {
      return { allowed: false, reason: "Pay 1 Pi to unlock wallet access" }
    }

    if (!status.isTeosPioneer) {
      return { allowed: false, reason: "Become a Verified TEOS Pioneer first" }
    }

    // Check civic verification for advanced features
    const civicComplete = Object.values(status.civicVerified).every((v) => v)

    if ((feature === "swap" || feature === "mining") && !civicComplete) {
      return {
        allowed: false,
        reason: "Complete civic verification (petition, telegram, facebook, twitter) required",
      }
    }

    if ((feature === "swap" || feature === "mining") && status.contributorLevel === "none") {
      return {
        allowed: false,
        reason: `Minimum contribution of $${TEOS_CONFIG.staking.bronze.contribution} required`,
      }
    }

    return { allowed: true }
  }

  static getCivicCompletionStatus(): { completed: number; total: number; percentage: number } {
    const status = this.getStatus()
    const values = Object.values(status.civicVerified)
    const completed = values.filter((v) => v).length
    return {
      completed,
      total: values.length,
      percentage: (completed / values.length) * 100,
    }
  }

  static syncBadgeToNilex(status: VerificationStatus): void {
    if (typeof window === "undefined") return

    const nilexBadge = {
      tier: status.contributorLevel,
      badge: status.badgeTier,
      civicComplete: Object.values(status.civicVerified).every((v) => v),
      verifiedAt: status.verifiedAt,
      piUsername: status.piUsername,
      solanaAddress: status.solanaAddress,
      lastSync: Date.now(),
    }

    localStorage.setItem(this.NILEX_BADGE_KEY, JSON.stringify(nilexBadge))

    window.dispatchEvent(new CustomEvent("teosBadgeUpdate", { detail: nilexBadge }))
  }

  static getBadgeForExternalApp(): {
    tier: TokenTier | "none"
    badge: string | null
    civicComplete: boolean
    canSwap: boolean
    canMine: boolean
  } | null {
    const status = this.getStatus()

    if (!status.hasWalletAccess) return null

    const civicComplete = Object.values(status.civicVerified).every((v) => v)
    const canSwap = civicComplete && status.contributorLevel !== "none"
    const canMine = civicComplete && status.contributorLevel !== "none"

    return {
      tier: status.contributorLevel,
      badge: status.badgeTier,
      civicComplete,
      canSwap,
      canMine,
    }
  }

  static getWalletKeypair(): Keypair | null {
    if (typeof window === "undefined") return null

    try {
      const stored = localStorage.getItem("teos_wallet_keypair")
      if (!stored) return null

      const keypairData = JSON.parse(stored)
      return Keypair.fromSecretKey(new Uint8Array(keypairData.secretKey))
    } catch {
      return null
    }
  }

  private static generateSolanaAddress(): string {
    // This method is now replaced by verifyWithPi's real generation
    const keypair = Keypair.generate()
    return keypair.publicKey.toBase58()
  }

  private static generatePiAddress(): string {
    return TEOS_CONFIG.piNetwork.stellarAddress
  }
}
