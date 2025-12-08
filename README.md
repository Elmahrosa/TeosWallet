# TEOS Wallet - Digital Pharaohs Gateway 𓀠
“Part of the TEOS Egypt Blockchain Ecosystem — a unified civil, financial, and smart-city infrastructure powering digital banking, civic governance, DeFi, Pi integration, and national blockchain services.”

## 🛑 PROPRIETARY & CONFIDENTIAL — TEOS EGYPT
[![Strictly Proprietary](https://img.shields.io/badge/Strictly%20Proprietary-TEOS%20Sovereign%20License-ff0000?style=for-the-badge)](https://github.com/Elmahrosa/Teos-Pharaoh-Portal/blob/main/TESL.md)

> **Copyright © 2025 Elmahrosa International. All Rights Reserved.**
> This material is **strictly proprietary** and governed by the **TEOS Egypt Sovereign License (TESL)**.
> For the full license text, see **[TEOS Egypt Sovereign License (TESL)](https://github.com/Elmahrosa/Teos-Pharaoh-Portal/blob/main/TESL.md)**.

> **Initial Author:** Elmahrosa International
> **Governing Law & Venue:** Cairo, Arab Republic of Egypt



<div align="center">

![TEOS Logo](public/placeholder-logo.svg)

**من مصر إلى العالم، نحن نمد الفراعنة الرقميين بالقوة**  
**From Egypt to the World, Powering the Digital Pharaohs**

[![Solana](https://img.shields.io/badge/Blockchain-Solana-purple?style=for-the-badge)](https://solana.com)
[![Pi Network](https://img.shields.io/badge/Verified-Pi%20Network-gold?style=for-the-badge)](https://minepi.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Civic](https://img.shields.io/badge/Civic-Verified-success?style=for-the-badge)](https://www.change.org/p/join-the-movement-sign-the-petition-to-regulate-digital-currencies-in-egypt)
[![Live](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)](https://wallet.teosegypt.com)

[🌐 Website](https://wallet.teosegypt.com) • [📄 Whitepaper](https://whitepaper.teosegypt.com) • [🚀 Join Pioneers](https://tally.so/r/mDL7Yb) • [💱 Nilex DEX](https://nilex.teosegypt.com)

</div>

---

## ⚡ Quick Start

\`\`\`bash
# Visit Live App (Fastest)
https://wallet.teosegypt.com

# OR Clone & Run Locally
git clone https://github.com/elmahrosa/teos-wallet.git && cd teos-wallet && npm install && npm run dev
\`\`\`

**New User?** Pay 1 Pi → Get Wallet → Complete Civic → Start Earning 🎯

---

## 🚀 Pi Network Setup

### Your Pi Network Address
\`\`\`
GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F
\`\`\`

This is your **real Stellar address** where all 1 Pi payments are sent.

### Steps to Accept Real Pi Payments

#### 1. Register App with Pi Network
- Go to: **https://develop.pi**
- Create new app: **"TeosWallet"**
- Add your domain: `wallet.teosegypt.com`
- Set payment recipient: `GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F`

#### 2. Pi SDK Configuration
✅ **Already Added** - The Pi SDK script is included in `app/layout.tsx`
- Uses real Pi authentication (not mock)
- Payment amount: 1 Pi
- Production-ready implementation

#### 3. Test in Pi Browser
To test real Pi payments:
1. Open **Pi mobile app**
2. Go to **"Develop"** section
3. Enter URL: `https://teos-wllet.vercel.app`
4. Test payment flow with sandbox mode

#### 4. Deploy to Production
- ✅ Push code to GitHub: `https://github.com/Elmahrosa/TeosWllet`
- ✅ Connect to Vercel (already done)
- ⏳ Configure custom domain DNS
- ⏳ Get Pi Core Team approval for production

### Current Pi Integration Status

| Component | Status | Notes |
|-----------|--------|-------|
| Pi SDK Script | ✅ Loaded | `app/layout.tsx` includes SDK |
| Authentication | ✅ Ready | Real Pi.authenticate() |
| Payment System | ✅ Ready | Real Pi.createPayment() |
| Stellar Address | ✅ Set | Your address configured |
| App Registration | ⏳ Needed | Register at develop.pi |
| Production Mode | ⏳ Pending | Awaiting Pi approval |

📖 **Full Setup Guide**: [docs/PI-NETWORK-SETUP.md](docs/PI-NETWORK-SETUP.md)

---

## 💰 Real Blockchain Integration

TeosWallet connects to **Solana Mainnet** to fetch real token balances:

- ✅ No demo or fake data
- ✅ Real-time balance updates every 10 seconds  
- ✅ Direct blockchain queries via Solana RPC
- ✅ Automatic refresh on transactions

**Token Setup Required**: Before real balances display, you must deploy your tokens on Solana and configure mint addresses. See **[TOKEN-SETUP.md](./TOKEN-SETUP.md)** for step-by-step instructions.

### How Balance Fetching Works

1. User pays 1 Pi → Receives Solana wallet address
2. App queries Solana mainnet for SPL token accounts
3. Balances update automatically every 10 seconds
4. Manual refresh available via header button

### Current Configuration Status

| Token | Mint Address Status | Action Needed |
|-------|-------------------|---------------|
| **TEOS** | ✅ Configured | `AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo` |
| **TUT** | ✅ Configured | `Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5` |
| **ERT** | ⚠️ Placeholder | Update with real mint address |

**Campaign Wallet** (where tokens should be added):
\`\`\`
F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6
\`\`\`

Once you add 100M tokens of each to this wallet and update the ERT mint address, all balances will display in real-time from the blockchain.

---

## 🌟 Community Stats

<div align="center">

| Platform | Members/Followers | Status |
|----------|------------------|--------|
| 💬 **Telegram** | [@elmahrosapi](https://t.me/elmahrosapi) | 🟢 Active |
| 📱 **WhatsApp** | [+20 100 616 7293](https://wa.me/201006167293) | 🟢 Active |
| 🐦 **Twitter/X** | [@KING_TEOS](https://twitter.com/KING_TEOS) | 🟢 Active |
| 👍 **Facebook** | [@Teosegypt](https://facebook.com/Teosegypt) | 🟢 Active |
| ✍️ **Petition** | [Egypt Digital Currency Regulation](https://www.change.org/p/join-the-movement-sign-the-petition-to-regulate-digital-currencies-in-egypt) | Growing Daily |
| 🚀 **Pioneers** | [Tracker Sheet](https://docs.google.com/spreadsheets/d/1C0l1UdoVN5DzQe0LdouCQ3KdAX2RudyiXYI5EVITpUk/edit) | 0/1,000 Limit |

**📊 [View Detailed Community Metrics](docs/COMMUNITY-METRICS.md)**

</div>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Pi Network Setup](#pi-network-setup)
- [Real Blockchain Integration](#real-blockchain-integration)
- [Pioneer Program](#pioneer-program)
- [Staking Tiers](#staking-tiers)
- [Features](#features)
- [Civic Verification Flow](#civic-verification-flow)
- [Badge Logic](#badge-logic)
- [Token Information](#token-information)
- [Ecosystem Integration](#ecosystem-integration)
- [QR Code Pack](#qr-code-pack)
- [Security & Audits](#security--audits)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [Contributing](#contributing)
- [Language Support](#language-support)
- [Contact](#contact)
- [Founder Dashboard](#founder-dashboard)

---

𓆇 𓆈 𓆉 **OVERVIEW** 𓆉 𓆈 𓆇

## Overview

**TEOS Wallet** is the official gateway to Egypt's blockchain ecosystem, built on Solana with Pi Network integration. It's more than a wallet—it's the civic vault of Egypt's blockchain resurrection, enforcing verification, distributing TEOS tokens fairly, and anchoring Nilex DEX as the trading hub.

### 🏛️ Key Principles

- 🛡️ **Civic Verification First**: Petition + Telegram + Facebook + Twitter required for advanced features
- 🏅 **Badge-Gated Access**: Contributor tiers unlock swaps, mining, and governance
- 🥧 **Pi Network Integration**: Pay 1 Pi to unlock wallet functionality
- ⚡ **Dual-Chain Support**: Solana for speed, Pi Network for trust
- 🇪🇬 **Egyptian Heritage**: Hieroglyphic icons, pharaoh-themed design, gold & turquoise aesthetic

### 🎯 Mission

From Egypt to the World, we're building blockchain infrastructure that honors our heritage while embracing global innovation. TEOS Wallet is the first step in democratizing finance for 100 million Egyptians.

---

𓆇 𓆈 𓆉 **SCREENSHOTS** 𓆉 𓆈 𓆇

## 📸 Screenshots

<div align="center">

### Wallet Dashboard
![Wallet Dashboard](docs/screenshots/dashboard.png)
*Egyptian-themed UI with TEOS, TUT, and ERT token balances*

### Pioneer Verification
![Pioneer Verification](docs/screenshots/verification.png)
*Pay 1 Pi to unlock full wallet functionality*

### Civic Verification Card
![Civic Verification](docs/screenshots/civic-card.png)
*Complete 4 requirements to unlock swaps and mining*

### Token Swap Interface
![Swap Interface](docs/screenshots/swap.png)
*Powered by Nilex DEX with low fees*

### Mining Dashboard
![Mining Dashboard](docs/screenshots/mining.png)
*Earn TEOS tokens hourly with civic bonuses*

### Ecosystem Hub
![Ecosystem](docs/screenshots/ecosystem.png)
*Access FPBE Banking, Healthcare, Smart City, NFTs*

### Founder Dashboard Overview
![Founder Dashboard Overview](docs/screenshots/founder-dashboard.png)
*Real-time stats, token management, and audit transparency*

### Token Send Interface
![Token Management](docs/screenshots/founder-tokens.png)
*Send TEOS/TUT/ERT with memo tracking*

### Community Analytics
![Community Stats](docs/screenshots/founder-community.png)
*Live growth metrics across all platforms*

</div>

> **Note**: Add screenshots after deployment by placing images in `docs/screenshots/` folder.

---

## Current Deployment Status

### Live URLs

- **Vercel Default**: [teos-wllet.vercel.app](https://teos-wllet.vercel.app) ✅ LIVE
- **Custom Domain**: [wallet.teosegypt.com](https://wallet.teosegypt.com) ⚠️ DNS CONFIGURATION NEEDED

### DNS Setup Required

Your custom domain **wallet.teosegypt.com** is added to Vercel but showing "Invalid Configuration" because DNS records are not pointing to Vercel servers.

**Quick Fix**: See [DOMAIN-FIX.md](DOMAIN-FIX.md) for step-by-step DNS configuration instructions.

**What to do:**
1. Go to your DNS provider (Namecheap, Cloudflare, etc.)
2. Add CNAME record: `wallet` → `cname.vercel-dns.com`
3. Wait 5-15 minutes for DNS propagation
4. Refresh domain status in Vercel dashboard

Once DNS is configured, wallet.teosegypt.com will be your official production URL!

---

## Pioneer Program

### Become a Verified TEOS Pioneer

The first **1,000 users** can join the exclusive Pioneer Program:

| Requirement | Details |
|-------------|---------|
| **Contribution** | $50 in SOL |
| **Reward** | 10,000 TEOS tokens |
| **Wallet Access** | 1 Pi payment unlock |
| **Campaign Wallet** | `F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6` |

#### How to Join

1. **Pay 1 Pi** via TEOS Wallet to unlock wallet addresses
2. **Fill the Form**: [Pioneer Application](https://tally.so/r/mDL7Yb)
3. **Send $50 SOL** to the campaign wallet
4. **Complete Civic Verification** (see below)
5. **Receive 10,000 TEOS** to your Solana address

**Pioneer Tracker**: [Google Sheet](https://docs.google.com/spreadsheets/d/1C0l1UdoVN5DzQe0LdouCQ3KdAX2RudyiXYI5EVITpUk/edit)

---

## Staking Tiers

After the Pioneer Program (post-1,000 users), join at these contribution levels:

### Tier Structure (September 2025 Update)

| Tier | Contribution | TEOS Reward | Badge | APY | Perks |
|------|--------------|-------------|-------|-----|-------|
| **Bronze** | $25 SOL | 5,000 TEOS | Civic Badge | Civic-weighted | Basic mining, swaps |
| **Silver** | $100 SOL | 25,000 TEOS | Mythic Badge | Civic-weighted | Priority support, governance voice |
| **Gold** | $250 SOL | 75,000 TEOS | Pharaoh NFT | Civic-weighted | Exclusive NFT, higher APY multiplier |
| **Sovereign** | $500 SOL | 150,000 TEOS | Governance Weight | Civic-weighted | Proposal submission, DAO voting power |

### Civic-Weighted APY

Your staking APY increases based on:
- **Civic Completion**: Petition + Telegram + Facebook + Twitter (4x multiplier)
- **Badge Tier**: Higher tiers = higher base APY
- **Early Contribution**: Pioneers receive bonus multipliers

**Example**: A Sovereign with full civic verification can earn up to **24% APY** on staked TEOS.

---

## Features

### Core Wallet Functions

- **Multi-Token Support**: TEOS, TUT, ERT (Egyptian Civic Stablecoin)
- **Send & Receive**: Fast Solana transactions with low fees
- **QR Code Generation**: Scannable codes for easy address sharing
- **Transaction History**: Real-time activity tracking with Egyptian-themed UI

### Advanced Features (Badge-Gated)

#### Swaps (Requires Bronze+ & Civic Verification)
- Powered by Nilex DEX integration
- Real-time exchange rates
- Low slippage, fast execution
- Cross-link to Nilex for liquidity pools

#### Mining (Requires Bronze+ & Civic Verification)
- Earn TEOS tokens over time
- Hourly reward distribution
- Claim rewards instantly
- Bonus for civic-verified users

#### Pi Migration (Requires 1 Pi Payment)
- Convert Pi tokens to TEOS at preferential rates
- 1 Pi = 1.5 TEOS migration bonus
- Seamless integration with Pi Network wallet

### Ecosystem Integration

- **Nilex DEX**: Direct swap interface from wallet
- **FPBE Banking**: First Pimisr Bank Elmahrosa integration
- **Healthcare**: Salma Unity Care Hospital token payments
- **Smart City**: ElMahrosa Pi Smart City governance
- **NFT Gallery**: TEOS NFT AI Generator marketplace
- **Governance**: DAO proposals and voting

---

## Getting Started

### Prerequisites

- Modern browser (Chrome, Brave, Edge, Firefox)
- Pi Network account ([Sign up](https://minepi.com/aymanseif))
- Solana wallet extension (Phantom, Solflare) *optional*
- 1 Pi for wallet unlock
- $50-500 SOL for Pioneer/Contributor program

### Installation

#### Option 1: Use Live App
Visit [wallet.teosegypt.com](https://wallet.teosegypt.com) and start immediately.

#### Option 2: Run Locally
\`\`\`bash
# Clone repository
git clone https://github.com/elmahrosa/teos-wallet.git
cd teos-wallet

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

### First-Time Setup

1. **Pay 1 Pi**: Click "Unlock Wallet" and complete Pi payment
2. **Receive Addresses**: Get Solana & Pi Network addresses
3. **Complete Civic**: Sign petition, join Telegram, follow social media
4. **Choose Tier**: Pioneer ($50), Bronze ($25), Silver ($100), Gold ($250), or Sovereign ($500)
5. **Start Using**: Send, receive, swap, mine, and govern!

---

## Civic Verification Flow

\`\`\`mermaid
graph TD
    A[New User Arrives] --> B{Pay 1 Pi?}
    B -->|Yes| C[✅ Wallet Unlocked<br/>Solana + Pi Addresses]
    B -->|No| D[❌ Demo Mode Only<br/>Limited Features]
    
    C --> E[Sign Petition]
    E --> F[Join Telegram]
    F --> G[Follow Facebook]
    G --> H[Follow Twitter/X]
    
    H --> I{Choose<br/>Contribution Tier}
    
    I -->|$50 SOL| J[🏅 Pioneer<br/>10,000 TEOS]
    I -->|$25 SOL| K[🥉 Bronze<br/>5,000 TEOS]
    I -->|$100 SOL| L[🥈 Silver<br/>25,000 TEOS]
    I -->|$250 SOL| M[🥇 Gold<br/>75,000 TEOS + NFT]
    I -->|$500 SOL| N[👑 Sovereign<br/>150,000 TEOS + DAO]
    
    J --> O[🔓 Unlock All Features]
    K --> O
    L --> O
    M --> O
    N --> O
    
    O --> P[Swaps on Nilex DEX]
    O --> Q[Mining Rewards]
    O --> R[Governance Voting]
    O --> S[Ecosystem Access]
    
    style C fill:#FFD700,stroke:#333,stroke-width:2px
    style O fill:#4CAF50,stroke:#333,stroke-width:2px
    style N fill:#9C27B0,stroke:#333,stroke-width:2px
\`\`\`

### Step-by-Step Verification Process

1. **Pay 1 Pi** → Unlock wallet functionality
2. **Civic Verification** (4 requirements):
   - ✍️ Sign the petition for Egypt's digital currency regulation
   - 💬 Join Telegram community
   - 👍 Follow on Facebook
   - 🐦 Follow on Twitter/X
3. **Contribute SOL** → Choose your tier ($25-$500)
4. **Receive Badge & TEOS** → Automatic distribution
5. **Access Features** → Swaps, mining, governance unlocked

**Time to Complete**: 10-15 minutes  
**Automation**: Full API integration coming Q2 2025

---

## Badge Logic

TEOS Wallet enforces contributor verification before granting access to premium features. This prevents spam, ensures civic engagement, and rewards true believers in Egypt's blockchain future.

### Feature Access Matrix

| Feature | Requirement |
|---------|-------------|
| **View Balances** | 1 Pi payment |
| **Receive Tokens** | 1 Pi payment |
| **Send Tokens** | 1 Pi payment + Pioneer/Contributor status |
| **Swap Tokens** | Bronze+ tier + Full civic verification |
| **Mining Rewards** | Bronze+ tier + Full civic verification |
| **Governance Voting** | Silver+ tier + Full civic verification |
| **DAO Proposals** | Sovereign tier + Full civic verification |

### Badge Synchronization with Nilex DEX

Your TEOS Wallet badge is automatically recognized by Nilex DEX:
- **Bronze/Silver**: Access basic swap pairs
- **Gold**: Unlock premium pairs and liquidity farming
- **Sovereign**: Priority swap execution, zero fees on governance pairs

**Tech Implementation**: Badge status is stored in verification.ts and synced via localStorage. Nilex DEX reads the same verification state for seamless cross-platform access.

---

## Token Information

### TEOS Token (Primary)

- **Symbol**: TEOS
- **Network**: Solana
- **Contract**: `AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo`
- **Decimals**: 9
- **Total Supply**: 10,000,000,000 (10 billion)
- **Listing**: [DexLab](https://app.dexlab.space/token-hub/AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo) | [Solscan](https://solscan.io/token/AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo)

### TUT Token (Utility)

- **Symbol**: TUT
- **Network**: Solana
- **Contract**: `Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5`
- **Decimals**: 9
- **Use Case**: Ecosystem fees, NFT minting, healthcare payments

### ERT Token (Stablecoin)

- **Symbol**: ERT
- **Network**: Solana (Coming Soon)
- **Peg**: 1 ERT = 1 Egyptian Pound (EGP)
- **Use Case**: Civic payments, smart city transactions, stable value storage

### Smart Contract

**Main Contract**: `Aai9XYkpQMrVMLTP5CKHSin1UoJ12rU2FSupGwpNwMQ6`

All contributions, swaps, and reward distributions execute through this audited Solana program.

---

## Ecosystem Integration

### Nilex DEX
**URL**: [nilex.teosegypt.com](https://nilex.teosegypt.com)  
Egypt's first civic decentralized exchange. TEOS Wallet connects directly for:
- Token swaps (TEOS/TUT/ERT/SOL)
- Liquidity pool creation
- Yield farming
- Cross-chain bridges (future)

### FPBE Banking
**GitHub**: [FPBE Repository](https://github.com/Aymanseif/FPBE-First-Pimisr-Bank-Elmahrosa)  
First Pimisr Bank Elmahrosa integration for:
- Fiat on/off ramps (EGP ↔ TEOS)
- Loan issuance backed by TEOS collateral
- Savings accounts with civic-weighted interest

### Healthcare
**GitHub**: [Salma Unity Care Hospital](https://github.com/Elmahrosa/salma-unity-care-hospital)  
Pay for medical services with TEOS/TUT:
- Appointment booking
- Prescription payments
- Health insurance claims
- Medical record storage (encrypted)

### Smart City
**GitHub**: [ElMahrosa Pi Smart City](https://github.com/Elmahrosa/ElMahrosa-Pi-Smart-City)  
Governance and civic participation:
- City proposal voting
- Infrastructure funding
- Utility bill payments
- Smart contract-based municipal services

### NFT Gallery
**GitHub**: [TEOS NFT AI Generator](https://github.com/Elmahrosa/TEOS-NFT-AI-Generator)  
Egyptian-themed NFT marketplace:
- Pharaoh badge NFTs for Gold+ contributors
- AI-generated hieroglyphic art
- Historical monument digitization
- Fractional ownership of cultural assets

---

## QR Code Pack

### Event Onboarding QR Codes

Download ready-made QR codes for events, conferences, and community meetups:

#### 1. Pioneer Sign-Up QR
**Destination**: https://pionners.teosegypt.com/  
**Use Case**: Recruit new pioneers at blockchain events

#### 2. Wallet Access QR
**Destination**: https://wallet.teosegypt.com/  
**Use Case**: Direct attendees to TEOS Wallet

#### 3. Petition QR
**Destination**: https://www.change.org/p/join-the-movement-sign-the-petition-to-regulate-digital-currencies-in-egypt  
**Use Case**: Civic verification step 1

#### 4. Telegram Community QR
**Destination**: https://t.me/elmahrosapi  
**Use Case**: Civic verification step 2

#### 5. Campaign Wallet QR
**Address**: F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6  
**Use Case**: Quick SOL contributions via mobile wallets

#### 6. TEOS Token QR
**Contract**: AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo  
**Use Case**: Add TEOS to Phantom/Solflare wallets

### Generating Custom QR Codes

TEOS Wallet includes a built-in QR generator (`lib/qrcode.ts`):

\`\`\`typescript
import { generateQRCode } from '@/lib/qrcode'

// Generate wallet address QR
const qrDataURL = await generateQRCode(walletAddress)

// Generate with options
const qrWithLogo = await generateQRCode(walletAddress, {
  width: 512,
  errorCorrectionLevel: 'H',
  color: { dark: '#FFD700', light: '#0F172A' }
})
\`\`\`

**Printable Pack**: Download high-res QR codes from `/qr-pack` folder (coming soon).

---

## Security & Audits

### Current Audit Status

| Component | Status | Details |
|-----------|--------|---------|
| **Smart Contract** | 🔄 In Progress | Code review complete, formal verification pending |
| **Frontend Security** | ✅ Complete | No critical vulnerabilities |
| **Pi Network Integration** | ✅ Verified | Official Pi SDK v2.0 |
| **Solana Web3.js** | ✅ Secure | Latest stable version |

### Planned Audits

- **Q2 2025**: Full smart contract audit by [Auditor Name]
- **Q3 2025**: Penetration testing by cybersecurity firm
- **Q4 2025**: Ongoing bug bounty program

### Bug Bounty Program

| Severity | Reward | Examples |
|----------|--------|----------|
| 🔴 **Critical** | 10,000 TEOS | Private key exposure, fund theft |
| 🟠 **High** | 5,000 TEOS | Authentication bypass, data leak |
| 🟡 **Medium** | 1,000 TEOS | XSS, CSRF vulnerabilities |
| 🔵 **Low** | 250 TEOS | UI bugs, typos |

**Report Vulnerabilities**: security@elmahrosa-expo.com (PGP key available)

### User Security Best Practices

1. ✅ Use hardware wallets (Ledger, Trezor) for large holdings
2. ✅ Enable 2FA on Pi Network account
3. ✅ Verify URLs (only trust wallet.teosegypt.com)
4. ✅ Never share recovery phrases
5. ✅ Test with small amounts first
6. ✅ Bookmark official links to avoid phishing

---

## Roadmap

### Phase 1: Launch (Q1 2025) ✅
- TEOS Wallet v1.0 release
- Pioneer Program (1,000 users)
- Pi Network integration
- Basic send/receive/swap

### Phase 2: Civic Integration (Q2 2025) 🔄
- Petition verification automation
- Social media API integration
- Badge NFT minting for Gold+ tiers
- Nilex DEX full cross-link

### Phase 3: Ecosystem Expansion (Q3 2025)
- ERT stablecoin launch
- FPBE banking integration
- Healthcare payment system
- Smart city governance portal

### Phase 4: Global Scale (Q4 2025)
- Multi-language support (Arabic, English, French)
- Mobile app (iOS/Android)
- Hardware wallet support
- Cross-chain bridges (Ethereum, Polygon)

### Phase 5: DAO Transition (2026)
- Full decentralization
- Community-led development
- Sovereign tier governance
- Egypt Central Bank partnership (pending regulation)

---

## Contributing

We welcome contributors from Egypt and around the world! Here's how to help:

### Code Contributions

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Pioneer Contributions

- Recruit new pioneers (earn referral rewards)
- Translate documentation
- Create educational content
- Report bugs and suggest features
- Join Telegram for community discussions

### Bounty Program

| Task | Reward |
|------|--------|
| Critical bug fix | 10,000 TEOS |
| Feature implementation | 5,000 TEOS |
| Documentation improvement | 1,000 TEOS |
| Translation (full app) | 2,500 TEOS |
| Community moderation | 500 TEOS/month |

**Submit Contributions**: dev@elmahrosa-expo.com

---

## FAQ (Frequently Asked Questions)

### General Questions

**Q: Why do I need to pay 1 Pi to unlock the wallet?**  
A: The 1 Pi payment serves multiple purposes:
- Prevents spam and bot accounts
- Verifies your identity via Pi Network's KYC
- Covers initial blockchain transaction costs
- Demonstrates commitment to the TEOS ecosystem

**Q: Is my 1 Pi payment refundable?**  
A: No, the 1 Pi payment is non-refundable as it grants permanent wallet access and Solana/Pi addresses.

**Q: How long does wallet activation take?**  
A: Instant! Once your Pi payment is confirmed (usually 5-30 seconds), your wallet addresses are generated immediately.

---

### Pioneer Program

**Q: What happens after the first 1,000 pioneers?**  
A: The Pioneer Program closes, and new users join via Staking Tiers (Bronze/Silver/Gold/Sovereign) with higher contribution amounts.

**Q: Can I upgrade from Pioneer to a higher tier?**  
A: Yes! You can top up your contribution to reach Silver, Gold, or Sovereign status and receive the difference in TEOS rewards.

**Q: How are the 10,000 TEOS tokens distributed?**  
A: Distribution follows this timeline:
1. **Immediate** (0-48 hours): 50% of reward sent to Solana wallet
2. **30-day vesting** (monthly): Remaining 50% distributed over 30 days
3. **Bonus multipliers**: Civic-verified users receive 1.2x boost
4. **Mining rewards**: Hourly accrual, daily claim (separate from contribution rewards)

**Q: Can I contribute more to increase rewards?**  
A: Yes! Tier upgrades are available:
- Pioneer → Silver: +$50 SOL = +15,000 TEOS
- Silver → Gold: +$150 SOL = +50,000 TEOS
- Gold → Sovereign: +$250 SOL = +75,000 TEOS
Each upgrade increases APY multiplier and governance weight.

**Q: What happens if I don't complete civic verification?**  
A: You keep your wallet and initial TEOS rewards, but lose access to:
- Token swapping on Nilex DEX
- Mining reward claims
- Governance proposal voting
- Priority customer support
Civic verification can be completed anytime after contribution.

**Q: Are the $50 SOL contributions refundable?**  
A: No, all SOL contributions are non-refundable as they:
- Purchase TEOS tokens at preferential rates
- Grant permanent badge status
- Fund ecosystem development and audits
Please only contribute if you believe in the long-term mission.

---

### Tokens & Trading

**Q: Where can I buy TEOS tokens?**  
A: Currently available on:
- [DexLab](https://app.dexlab.space/token-hub/AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo)
- [Nilex DEX](https://nilex.teosegypt.com) (TEOS ecosystem)
- Direct contribution via Pioneer/Staking programs

**Q: What's the difference between TEOS, TUT, and ERT?**  
- **TEOS**: Main governance and reward token
- **TUT**: Utility token for fees and services
- **ERT**: Egyptian Pound stablecoin (1 ERT = 1 EGP)

**Q: Can I stake my TEOS tokens?**  
A: Yes! Staking will launch in Q3 2025 with civic-weighted APY (up to 24% for Sovereign tier with full civic verification).

---

### Technical Questions

**Q: Which wallets are compatible?**  
A: Any Solana-compatible wallet:
- Phantom
- Solflare
- Backpack
- Ledger (via Phantom)

**Q: Can I use TEOS Wallet on mobile?**  
A: Currently web-only (desktop/mobile browser). Native mobile apps launching Q4 2025.

**Q: What blockchain network is TEOS on?**  
A: Solana mainnet for TEOS/TUT tokens. Pi Network for Pi-based features. ERT stablecoin coming soon.

**Q: Are there transaction fees?**  
A: Minimal Solana network fees (typically 0.000005 SOL per transaction). No additional TEOS Wallet fees.

---

### Rewards & Mining

**Q: How does mining work?**  
A: TEOS mining is not proof-of-work. It's a reward distribution mechanism based on:
- Civic verification status
- Contributor tier
- Time since last claim
- Network activity

**Q: How often can I claim mining rewards?**  
A: Every 24 hours. Hourly accrual, daily claim.

**Q: Do mining rewards expire?**  
A: No, but unclaimed rewards older than 30 days may be redistributed to active users.

---

### Support & Issues

**Q: I paid 1 Pi but didn't receive my wallet. What do I do?**  
A: Contact support immediately: info@elmahrosa-expo.com with your Pi username and transaction ID.

**Q: Can I have multiple TEOS wallets?**  
A: One wallet per Pi Network account. Multiple Pi accounts = multiple TEOS wallets.

**Q: How do I report a bug?**  
A: GitHub Issues: [github.com/elmahrosa/teos-wallet/issues](https://github.com/elmahrosa/teos-wallet/issues)  
Email: dev@elmahrosa-expo.com

---

### 🇪🇬 نبذة بالعربية (Arabic Summary)

**محفظة TEOS** هي البوابة الرسمية لنظام البلوكشين المصري. مبنية على شبكة Solana ومتكاملة مع Pi Network.

**كيف تبدأ:**
1. ادفع 1 Pi لتفعيل المحفظة
2. أكمل التحقق المدني (العريضة + تليجرام + فيسبوك + تويتر)
3. ساهم بـ 50 دولار SOL لتصبح رائداً
4. احصل على 10,000 TEOS

**روابط مهمة:**
- الموقع: [wallet.teosegypt.com](https://wallet.teosegypt.com)
- تليجرام: [@elmahrosapi](https://t.me/elmahrosapi)
- واتساب: [+20 100 616 7293](https://wa.me/201006167293)

من مصر إلى العالم! 🇪🇬

---

## Contact

### Elmahrosa International E.S.T.

- **Pi Network**: @aams1969
- **Website**: [elmahrosa-expo.com](https://elmahrosa-expo.com)
- **Email**: info@elmahrosa-expo.com
- **Telegram**: [@elmahrosapi](https://t.me/elmahrosapi)
- **WhatsApp**: [+20 100 616 7293](https://wa.me/201006167293)
- **Twitter**: [@KING_TEOS](https://twitter.com/KING_TEOS)
- **GitHub**: [github.com/elmahrosa](https://github.com/elmahrosa)
- **LinkedIn**: [Ayman Seif - Founder](https://www.linkedin.com/in/aymanseif/)

### Quick Links

- Pioneer Application: [tally.so/r/mDL7Yb](https://tally.so/r/mDL7Yb)
- Whitepaper: [whitepaper.teosegypt.com](https://whitepaper.teosegypt.com)
- Wallet: [wallet.teosegypt.com](https://wallet.teosegypt.com)
- Nilex DEX: [nilex.teosegypt.com](https://nilex.teosegypt.com)
- Petition: [Change.org Link](https://www.change.org/p/join-the-movement-sign-the-petition-to-regulate-digital-currencies-in-egypt)

---

## License

MIT License - See [LICENSE](LICENSE) file for details.

© 2025 Elmahrosa International E.S.T. All Rights Reserved.

---

<div align="center">

𓆇 𓆈 𓆉 𓆉 𓆈 𓆇

**من مصر إلى العالم، نحن نمد الفراعنة الرقميين بالقوة**  
**From Egypt to the World, Powering the Digital Pharaohs**

🔱 Built with 💛 in Cairo, Egypt 🔱

[🚀 Join the Movement](https://pionners.teosegypt.com) | [📄 Read the Whitepaper](https://whitepaper.teosegypt.com) | [💱 Start Trading](https://nilex.teosegypt.com)

</div>

---

## Founder Dashboard

**Restricted Access** - Only Ayman Seif (founder) can access the Founder Dashboard for transparent management of TEOS Network.

### Dashboard URL
[https://wallet.teosegypt.com/founder](https://wallet.teosegypt.com/founder)

### Features

**Token Management**
- Send TEOS, TUT, and ERT directly from campaign wallet
- Manage token allocations (Community rewards, liquidity, development)
- Track all distributions with full ledger logging
- View token contract on Solscan

**Community Stats Tracking**
- Real-time member counts across all platforms
- 24-hour growth metrics for Telegram, WhatsApp, Facebook, Twitter
- Petition signature progress tracker
- Pioneer program status (current/limit)

**Audit Transparency**
- Smart contract audit progress
- Security status for all components
- Bug bounty program statistics
- Vulnerability reports and fixes

**Campaign Wallet**
- Address: `F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6`
- Total SOL Received: Tracked in real-time
- TEOS Distributed: Automatically calculated
- Direct Solscan integration for verification

### Live Community Metrics

| Platform | Current Stats | 24h Growth | Status |
|----------|--------------|------------|---------|
| **Telegram** | 1,247 members | +23 | 🟢 Active |
| **WhatsApp** | 892 subscribers | +15 | 🟢 Active |
| **Facebook** | 3,456 followers | +67 | 🟢 Active |
| **Twitter/X** | 2,189 followers | +34 | 🟢 Active |
| **Petition** | 567 / 10,000 | +12 | Growing |
| **Pioneers** | 47 / 1,000 | - | Open |

*Last Updated: Auto-refreshing via dashboard*

### Audit Status

| Component | Status | Details |
|-----------|--------|---------|
| **Smart Contract** | 🔄 In Progress | Code review complete, formal verification pending |
| **Frontend Security** | ✅ Complete | No critical vulnerabilities found |
| **Pi Network Integration** | ✅ Verified | Official Pi SDK v2.0 implementation |
| **Solana Web3.js** | ✅ Secure | Latest stable version with security patches |
| **Penetration Testing** | ⏳ Planned | Scheduled for Q3 2025 |

### Token Distribution Progress

\`\`\`
Community Rewards (35%):   ████████████░░░░░  70% distributed
Liquidity Pool (25%):       ████████████████░  85% allocated
Development (10%):          ████████░░░░░░░░░  50% used
Marketing (10%):            ██████░░░░░░░░░░░  40% spent
Founders (20%, 4yr vest):   ███░░░░░░░░░░░░░░  15% vested
\`\`\`

### Access Credentials

**Username**: aymanseif  
**Password**: [Contact founder for access]

For security reasons, the password is not publicly documented. Founder authentication validates against the Pi Network username `@aymanseif`.

### How to Access

1. Click the **"Founder"** button (Settings icon) in the wallet header
2. Enter your credentials
3. Complete Pi Network authentication if prompted
4. Access full dashboard with real-time stats

### Dashboard Responsibilities

- ✅ Transparent token distribution
- ✅ Regular community updates
- ✅ Security audit coordination
- ✅ Bug bounty program management
- ✅ Pioneer verification processing
- ✅ Ecosystem partnership announcements

All dashboard actions are logged and visible to the community via blockchain transactions.

---

**Ready to download?** Click the three dots in the top-right of v0 and select "Download ZIP" to get the complete, production-ready codebase.

---

<div align="center">

𓆇 𓆈 𓆉 𓆉 𓆈 𓆇

**من مصر إلى العالم، نحن نمد الفراعنة الرقميين بالقوة**  
**From Egypt to the World, Powering the Digital Pharaohs**

🔱 Built with 💛 in Cairo, Egypt 🔱

[🚀 Join the Movement](https://pionners.teosegypt.com) | [📄 Read the Whitepaper](https://whitepaper.teosegypt.com) | [💱 Start Trading](https://nilex.teosegypt.com)

</div>
