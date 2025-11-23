import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Chain = "solana" | "ethereum" | "bitcoin" | "pi"

export interface WalletState {
  // Authentication
  isAuthenticated: boolean
  piUser: { uid: string; username: string } | null

  // Active chain
  activeChain: Chain

  // Balances per chain
  balances: Record<Chain, { native: number; tokens: Record<string, number> }>

  // Settings
  language: "en" | "ar"
  rtlEnabled: boolean

  // Actions
  setAuthenticated: (user: { uid: string; username: string } | null) => void
  setActiveChain: (chain: Chain) => void
  updateBalance: (chain: Chain, native: number, tokens?: Record<string, number>) => void
  setLanguage: (lang: "en" | "ar") => void
  toggleRTL: () => void
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      piUser: null,
      activeChain: "solana",
      balances: {
        solana: { native: 0, tokens: {} },
        ethereum: { native: 0, tokens: {} },
        bitcoin: { native: 0, tokens: {} },
        pi: { native: 0, tokens: {} },
      },
      language: "en",
      rtlEnabled: false,

      setAuthenticated: (user) => set({ isAuthenticated: !!user, piUser: user }),
      setActiveChain: (chain) => set({ activeChain: chain }),
      updateBalance: (chain, native, tokens = {}) =>
        set((state) => ({
          balances: {
            ...state.balances,
            [chain]: { native, tokens: { ...state.balances[chain].tokens, ...tokens } },
          },
        })),
      setLanguage: (lang) => set({ language: lang, rtlEnabled: lang === "ar" }),
      toggleRTL: () => set((state) => ({ rtlEnabled: !state.rtlEnabled })),
    }),
    {
      name: "teos-wallet-storage",
    },
  ),
)
