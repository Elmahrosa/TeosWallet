// Founder authentication and authorization
export const FOUNDER_CREDENTIALS = {
  username: "AymanSeif",
  piUsername: "@aams1969",
  role: "founder",
}

export class FounderAuth {
  private static STORAGE_KEY = "teos_founder_session"
  private static FOUNDER_PASSWORD = "teos2025founder"

  static isFounder(): boolean {
    if (typeof window === "undefined") return false

    const session = localStorage.getItem(this.STORAGE_KEY)
    if (!session) return false

    try {
      const data = JSON.parse(session)
      return data.isFounder === true && data.expiresAt > Date.now()
    } catch {
      return false
    }
  }

  static async authenticate(piUsername: string, password: string): Promise<boolean> {
    const normalizedInput = piUsername.trim().toLowerCase()
    const expectedUsername = FOUNDER_CREDENTIALS.piUsername.toLowerCase()

    if (normalizedInput === expectedUsername && password === this.FOUNDER_PASSWORD) {
      const session = {
        isFounder: true,
        piUsername: FOUNDER_CREDENTIALS.piUsername,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // Extended to 7 days for persistent login
        authenticatedAt: Date.now(),
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session))
      return true
    }

    return false
  }

  static logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.STORAGE_KEY)
    }
  }

  static getSession() {
    if (typeof window === "undefined") return null

    const session = localStorage.getItem(this.STORAGE_KEY)
    if (!session) return null

    try {
      return JSON.parse(session)
    } catch {
      return null
    }
  }

  static hasFounderPrivileges(piUsername?: string): boolean {
    if (this.isFounder()) return true

    if (piUsername) {
      const normalized = piUsername.trim().toLowerCase()
      return normalized === FOUNDER_CREDENTIALS.piUsername.toLowerCase()
    }

    return false
  }

  static shouldBypassPayment(piUsername?: string): boolean {
    return this.hasFounderPrivileges(piUsername)
  }
}
