// User and founder profile management
export interface UserProfile {
  id: string
  username: string
  patientNumber?: string // For healthcare integration
  photoURL: string | null
  email?: string
  piUsername?: string
  solanaAddress?: string
  piAddress?: string
  createdAt: number
  updatedAt: number
  bio?: string
  civicScore: number
  contributorTier?: string
}

export interface FounderProfile {
  name: string
  title: string
  photoURL: string
  bio: string
  social: {
    twitter?: string
    telegram?: string
    github?: string
    linkedin?: string
  }
}

export class ProfileManager {
  private static PROFILE_KEY = "teos_user_profile"
  private static PHOTO_KEY = "teos_profile_photo"

  static getFounderProfile(): FounderProfile {
    return {
      name: "Ayman Seif",
      title: "Founder & CEO, Elmahrosa International E.S.T.",
      photoURL: "/founder-ayman-seif.jpg", // Upload founder photo to public folder
      bio: "Visionary entrepreneur building Egypt's blockchain future. Creator of TEOS Network, FPBE Banking, and the Digital Pharaohs movement. From Cairo to the world.",
      social: {
        twitter: "https://twitter.com/KING_TEOS",
        telegram: "https://t.me/elmahrosapi",
        github: "https://github.com/Aymanseif",
        linkedin: "https://www.linkedin.com/in/aymanseif/",
      },
    }
  }

  static getUserProfile(): UserProfile | null {
    if (typeof window === "undefined") return null

    const stored = localStorage.getItem(this.PROFILE_KEY)
    if (!stored) return null

    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }

  static saveUserProfile(profile: UserProfile): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile))
    }
  }

  static async createProfile(data: {
    username: string
    patientNumber?: string
    photo?: File
    piUsername: string
    solanaAddress: string
    piAddress: string
  }): Promise<UserProfile> {
    let photoURL: string | null = null

    if (data.photo) {
      photoURL = await this.uploadPhoto(data.photo)
    }

    const profile: UserProfile = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username: data.username,
      patientNumber: data.patientNumber,
      photoURL,
      piUsername: data.piUsername,
      solanaAddress: data.solanaAddress,
      piAddress: data.piAddress,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      civicScore: 0,
      contributorTier: "none",
    }

    this.saveUserProfile(profile)
    return profile
  }

  static async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const currentProfile = this.getUserProfile()
    if (!currentProfile) {
      throw new Error("No profile found")
    }

    const updatedProfile: UserProfile = {
      ...currentProfile,
      ...updates,
      updatedAt: Date.now(),
    }

    this.saveUserProfile(updatedProfile)
    return updatedProfile
  }

  static async uploadPhoto(file: File): Promise<string> {
    // In production, upload to Vercel Blob or Supabase Storage
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const base64 = reader.result as string
        localStorage.setItem(this.PHOTO_KEY, base64)
        resolve(base64)
      }

      reader.onerror = () => reject(new Error("Failed to read photo"))

      reader.readAsDataURL(file)
    })
  }

  static getProfilePhoto(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(this.PHOTO_KEY)
  }

  static updateCivicScore(increment: number): void {
    const profile = this.getUserProfile()
    if (profile) {
      profile.civicScore += increment
      profile.updatedAt = Date.now()
      this.saveUserProfile(profile)
    }
  }

  static clearProfile(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.PROFILE_KEY)
      localStorage.removeItem(this.PHOTO_KEY)
    }
  }
}
