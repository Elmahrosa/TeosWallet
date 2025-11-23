// TEOS Network Configuration - Real Data from Whitepaper & Ecosystem
export const TEOS_CONFIG = {
  // Token Addresses (Solana)
  tokens: {
    teos: {
      name: "TEOS",
      symbol: "TEOS",
      mintAddress: "AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo",
      decimals: 9,
      icon: "𓀠",
      dexlab: "https://app.dexlab.space/token-hub/AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo",
      solscan: "https://solscan.io/token/AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo",
    },
    tut: {
      name: "TUT",
      symbol: "TUT",
      mintAddress: "Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5",
      decimals: 9,
      icon: "𓏏",
      dexlab: "https://app.dexlab.space/token-hub/Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5",
      solscan: "https://solscan.io/token/Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5",
    },
    ert: {
      name: "ERT",
      symbol: "ERT",
      mintAddress: "DHJkzU4yVpBMtDGs78hmw5KSYvfpQ2Jfqd8j7y8fSZ9m",
      decimals: 6,
      icon: "𓊨",
      description: "Egyptian Civic Stablecoin",
      dexlab: "https://app.dexlab.space/token-hub/DHJkzU4yVpBMtDGs78hmw5KSYvfpQ2Jfqd8j7y8fSZ9m",
      solscan: "https://solscan.io/token/DHJkzU4yVpBMtDGs78hmw5KSYvfpQ2Jfqd8j7y8fSZ9m",
    },
  },

  // Campaign Wallets
  wallets: {
    campaign: "F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6",
    civicPool: "F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6",
  },

  piNetwork: {
    stellarAddress: "GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F",
    network: "Pi Testnet",
    paymentAmount: 1, // 1 Pi to unlock wallet
  },

  // Smart Contract
  smartContract: "Aai9XYkpQMrVMLTP5CKHSin1UoJ12rU2FSupGwpNwMQ6",

  // Pioneer Program
  pioneer: {
    contribution: 50, // $50 in SOL
    reward: 10000, // 10,000 TEOS
    maxPioneers: 1000,
    formUrl: "https://tally.so/r/mDL7Yb",
    sheetUrl: "https://docs.google.com/spreadsheets/d/1C0l1UdoVN5DzQe0LdouCQ3KdAX2RudyiXYI5EVITpUk/edit",
  },

  // Staking Tiers (September 2025 Update)
  staking: {
    bronze: {
      contribution: 25,
      reward: 5000,
      badge: "Civic Badge",
      apy: "Civic-weighted",
    },
    silver: {
      contribution: 100,
      reward: 25000,
      badge: "Mythic Badge",
      apy: "Civic-weighted",
    },
    gold: {
      contribution: 250,
      reward: 75000,
      badge: "Pharaoh NFT",
      apy: "Civic-weighted",
    },
    sovereign: {
      contribution: 500,
      reward: 150000,
      badge: "Governance Weight",
      apy: "Civic-weighted",
    },
  },

  // Civic Requirements
  civic: {
    petition: "https://www.change.org/p/join-the-movement-sign-the-petition-to-regulate-digital-currencies-in-egypt",
    telegram: "https://t.me/elmahrosapi",
    facebook: "https://facebook.com/Teosegypt",
    twitter: "https://twitter.com/KING_TEOS",
  },

  // Ecosystem Links
  ecosystem: {
    nilex: "https://nilex.teosegypt.com",
    fpbe: "https://github.com/Aymanseif/FPBE-First-Pimisr-Bank-Elmahrosa",
    healthcare: "https://github.com/Elmahrosa/salma-unity-care-hospital",
    smartCity: "https://github.com/Elmahrosa/ElMahrosa-Pi-Smart-City",
    nftGenerator: "https://github.com/Elmahrosa/TEOS-NFT-AI-Generator",
    whitepaper: "https://whitepaper.teosegypt.com",
    pioneers: "https://pionners.teosegypt.com",
    wallet: "https://wallet.teosegypt.com",
  },

  // Contact
  contact: {
    telegram: "@elmahrosapi",
    whatsapp: "+20 100 616 7293",
    email: "info@elmahrosa-expo.com",
    github: "https://github.com/elmahrosa",
    linkedin: "https://www.linkedin.com/in/aymanseif/",
    piUsername: "@aams1969",
  },

  // Total Supply
  totalSupply: 10000000000, // 10 billion

  // Distribution
  distribution: {
    community: 35,
    liquidity: 25,
    development: 10,
    marketing: 10,
    founders: 20, // 4-year vesting
  },
}

export type TokenTier = "bronze" | "silver" | "gold" | "sovereign"

export interface VerificationStatus {
  petition: boolean
  telegram: boolean
  facebook: boolean
  twitter: boolean
  contribution: number
  tier: TokenTier | null
  verified: boolean
  badge: string | null
}
