// Real-time community statistics tracking
export interface CommunityStats {
  telegram: {
    members: number
    growth24h: number
    active: boolean
  }
  whatsapp: {
    subscribers: number
    growth24h: number
    active: boolean
  }
  facebook: {
    followers: number
    growth24h: number
    active: boolean
  }
  twitter: {
    followers: number
    growth24h: number
    active: boolean
  }
  petition: {
    signatures: number
    goal: number
    growth24h: number
  }
  pioneers: {
    total: number
    maxLimit: number
    remaining: number
    totalContributions: number
  }
}

export class CommunityStatsManager {
  private static STORAGE_KEY = "teos_community_stats"
  private static CACHE_DURATION = 60 * 60 * 1000 // 1 hour

  static async getStats(): Promise<CommunityStats> {
    // For now, return mock data with localStorage caching

    const cached = this.getCachedStats()
    if (cached) return cached

    const stats: CommunityStats = {
      telegram: {
        members: 1247,
        growth24h: 23,
        active: true,
      },
      whatsapp: {
        subscribers: 892,
        growth24h: 15,
        active: true,
      },
      facebook: {
        followers: 3456,
        growth24h: 67,
        active: true,
      },
      twitter: {
        followers: 2189,
        growth24h: 34,
        active: true,
      },
      petition: {
        signatures: 567,
        goal: 10000,
        growth24h: 12,
      },
      pioneers: {
        total: 47,
        maxLimit: 1000,
        remaining: 953,
        totalContributions: 2350, // in SOL
      },
    }

    this.cacheStats(stats)
    return stats
  }

  private static getCachedStats(): CommunityStats | null {
    if (typeof window === "undefined") return null

    const cached = localStorage.getItem(this.STORAGE_KEY)
    if (!cached) return null

    try {
      const data = JSON.parse(cached)
      if (data.cachedAt + this.CACHE_DURATION > Date.now()) {
        return data.stats
      }
    } catch {
      return null
    }

    return null
  }

  private static cacheStats(stats: CommunityStats): void {
    if (typeof window !== "undefined") {
      const data = {
        stats,
        cachedAt: Date.now(),
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
    }
  }

  static async updateStat(platform: keyof CommunityStats, field: string, value: number): Promise<void> {
    const stats = await this.getStats()
    ;(stats[platform] as any)[field] = value
    this.cacheStats(stats)
  }
}
