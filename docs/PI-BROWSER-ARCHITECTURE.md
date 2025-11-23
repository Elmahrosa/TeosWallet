# Pi Browser App Architecture Guide

## Overview

TeosWallet is a **hybrid frontend + backend application** that runs inside the Pi Browser. This document explains where frontend and backend code is used, and how they interact with Pi Network.

---

## Frontend Architecture (Client-Side)

### Where Frontend Runs
- **Pi Browser** - The official Pi Network mobile browser
- **Standard Web Browsers** - For development and testing
- **Next.js Client Components** - All pages marked with `"use client"`

### Frontend Technologies

**React + Next.js 15**
\`\`\`typescript
// All main pages are client-side rendered
"use client" // This directive makes it a client component

import { useState, useEffect } from "react"
// Client-side state management, user interactions
\`\`\`

**UI Components (components/ui/)**
- Button, Card, Input, Badge, Dialog, etc.
- All shadcn/ui components render on the client
- Styled with Tailwind CSS v4
- Pharaonic Futurism design system applied

**Egyptian Icon Components (components/egyptian-icons.tsx)**
- HorusEye, AnkhIcon, PyramidIcon, SunDiskIcon
- Pure SVG components rendered on client
- Used throughout the UI for Egyptian theming

**State Management**
\`\`\`typescript
// Client-side state hooks
const [balances, setBalances] = useState<TokenBalance>({
  teos: 0,
  tut: 0,
  ert: 0,
})

// Browser APIs only work client-side
await navigator.clipboard.writeText(address)
\`\`\`

### Frontend Responsibilities

1. **UI Rendering** - Display wallet interface, cards, modals
2. **User Interactions** - Button clicks, form inputs, tab navigation
3. **Pi SDK Integration** - Initialize and interact with Pi Network
4. **Local State** - Manage UI state, form data, modal visibility
5. **Browser APIs** - Clipboard, localStorage, QR code generation
6. **Solana RPC Calls** - Fetch real blockchain data from Solana mainnet

---

## Backend Architecture (Server-Side)

### Where Backend Runs
- **Vercel Edge Functions** - Serverless API routes
- **Next.js API Routes** - `/app/api/**` directory
- **Server Actions** - Can be used for secure operations

### Backend Technologies

**Next.js API Routes (app/api/)**
\`\`\`typescript
// app/api/pi/approve/route.ts
export async function POST(request: Request) {
  // This code runs on Vercel servers, NOT in the browser
  const apiKey = process.env.PI_API_KEY // Secure server-side only
  
  // Call Pi Network API to approve payment
  const response = await fetch('https://api.minepi.com/v2/payments/approve', {
    headers: { 'Authorization': `Key ${apiKey}` }
  })
  
  return Response.json({ approved: true })
}
\`\`\`

**Environment Variables (Server-Side Only)**
\`\`\`bash
# These are ONLY available on the server
PI_API_KEY=xmc5kk0qmb1xsitfnlldvokhaocpyrvv4buvmnwkqxmftunrb0ayov3k0u6jhbzg
PI_WALLET_PRIVATE_KEY=your_stellar_private_key
DATABASE_URL=postgresql://...
\`\`\`

### Backend Responsibilities

1. **Pi Payment Approval** - `/api/pi/approve` validates and approves Pi payments
2. **Pi Payment Completion** - `/api/pi/complete` finalizes transactions
3. **Secure API Calls** - Authenticate with Pi Network using private API key
4. **Database Operations** - Store user data, transaction history (if needed)
5. **Token Distribution** - Send TEOS/TUT/ERT tokens to pioneers
6. **Verification Logic** - Validate payment proofs and issue wallet addresses

---

## Pi Network Integration Flow

### 1. Frontend - User Initiates Payment

\`\`\`typescript
// app/page.tsx (CLIENT-SIDE)
const handlePiPayment = async () => {
  // Step 1: Initialize Pi SDK (client-side)
  await piSDK.init()
  
  // Step 2: Authenticate user with Pi Browser
  const piUser = await piSDK.authenticate()
  // Returns: { username: "@aymanseif", uid: "..." }
  
  // Step 3: Create payment request (client-side)
  const paymentId = await piSDK.createPayment(1, "TEOS Pioneer Activation")
  // Pi Browser shows payment modal to user
}
\`\`\`

### 2. Backend - Approve Payment

\`\`\`typescript
// app/api/pi/approve/route.ts (SERVER-SIDE)
export async function POST(request: Request) {
  const { paymentId } = await request.json()
  
  // Verify payment with Pi Network API (server-side only)
  const response = await fetch(
    `https://api.minepi.com/v2/payments/${paymentId}/approve`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )
  
  // Return approval to Pi Network
  return Response.json({ approved: true })
}
\`\`\`

### 3. Backend - Complete Payment

\`\`\`typescript
// app/api/pi/complete/route.ts (SERVER-SIDE)
export async function POST(request: Request) {
  const { paymentId, txid } = await request.json()
  
  // Verify transaction on Stellar blockchain
  const verified = await verifyStellarTransaction(txid)
  
  if (verified) {
    // Issue wallet address to user
    const walletAddress = generateSolanaWallet()
    
    // Send welcome tokens
    await sendTeosTokens(walletAddress, 10000)
    
    return Response.json({ 
      walletAddress,
      success: true 
    })
  }
}
\`\`\`

### 4. Frontend - Update UI

\`\`\`typescript
// app/page.tsx (CLIENT-SIDE)
const handlePiPayment = async () => {
  // ... payment flow ...
  
  // Update local state with new wallet
  setWalletAddress(newAddress)
  setIsConnected(true)
  setVerificationStatus({ hasWalletAccess: true })
  
  // Fetch real balances from Solana
  await loadRealBalances(newAddress)
}
\`\`\`

---

## Component Distribution

### Pure Frontend Components

**Pages:**
- `app/page.tsx` - Main wallet interface (CLIENT)
- `app/founder/page.tsx` - Founder dashboard (CLIENT)
- `app/layout.tsx` - Root layout with Pi SDK script (CLIENT)

**UI Components:**
- `components/ui/**` - All shadcn components (CLIENT)
- `components/egyptian-icons.tsx` - SVG icons (CLIENT)
- `components/pharaoh-card.tsx` - Glassmorphism cards (CLIENT)
- `components/civic-verification-card.tsx` - Verification UI (CLIENT)
- `components/user-profile-modal.tsx` - Profile editor (CLIENT)

**Libraries (Client-Side):**
- `lib/pi-sdk.ts` - Pi Browser SDK wrapper (CLIENT)
- `lib/verification.ts` - Local verification state (CLIENT)
- `lib/profile.ts` - User profile management (CLIENT)
- `lib/qrcode.ts` - QR code generation (CLIENT)
- `lib/solana-balance.ts` - Solana RPC calls (CLIENT)

### Backend Components

**API Routes:**
- `app/api/pi/approve/route.ts` - Payment approval (SERVER)
- `app/api/pi/complete/route.ts` - Payment completion (SERVER)

**Libraries (Server-Side):**
- `lib/founder-auth.ts` - Authentication logic (can run on both)
- `lib/community-stats.ts` - Fetch social stats (SERVER preferred)

### Configuration Files

**Client + Server:**
- `lib/teos-config.ts` - Public configuration (BOTH)

**Server Only:**
- `.env` - Environment variables (SERVER)
- `.env.example` - Template for developers (SERVER)

---

## Security Best Practices

### Client-Side (Frontend)
✅ Pi SDK initialization and user authentication
✅ Display wallet addresses and balances
✅ QR code generation
✅ Form validation
✅ UI state management

### Server-Side (Backend)
✅ Pi API key storage and usage
✅ Payment approval with Pi Network
✅ Token distribution
✅ Database operations
✅ Private key management
✅ Transaction signing

### NEVER on Client
❌ API keys in frontend code
❌ Private keys in localStorage
❌ Database credentials
❌ Payment approval logic
❌ Token distribution logic

---

## Deployment Architecture

\`\`\`
┌─────────────────────────────────────────┐
│         Pi Browser (Mobile)              │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │   TeosWallet Frontend (Next.js)    │ │
│  │   - React Components               │ │
│  │   - Pi SDK Integration             │ │
│  │   - Solana Balance Fetching        │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
                    │
                    │ HTTPS
                    ▼
┌─────────────────────────────────────────┐
│      Vercel Edge Network                 │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │   API Routes (Serverless)          │ │
│  │   - /api/pi/approve                │ │
│  │   - /api/pi/complete               │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
          │                    │
          │                    │
          ▼                    ▼
┌──────────────────┐  ┌──────────────────┐
│  Pi Network API  │  │  Solana Mainnet  │
│  (Stellar)       │  │  (Blockchain)    │
└──────────────────┘  └──────────────────┘
\`\`\`

---

## Development Workflow

### 1. Local Development
\`\`\`bash
# Install dependencies
pnpm install

# Set environment variables
cp .env.example .env
# Edit .env with your Pi API key

# Run development server
pnpm dev

# Open in browser
# http://localhost:3000
\`\`\`

### 2. Testing in Pi Browser
- Deploy to Vercel (temporary URL)
- Register app at https://develop.pi
- Add app URL to Pi Developer Portal
- Open in Pi Browser mobile app
- Test payment flow with sandbox Pi

### 3. Production Deployment
\`\`\`bash
# Push to GitHub
git push origin main

# Vercel auto-deploys
# Add environment variables in Vercel dashboard
# Update DNS for wallet.teosegypt.com
\`\`\`

---

## Summary

**Frontend (Pi Browser):**
- User interface rendering
- Pi SDK integration
- Solana balance fetching
- Local state management
- User interactions

**Backend (Vercel):**
- Pi payment approval
- Secure API key usage
- Token distribution
- Database operations
- Transaction verification

**Integration:**
- Frontend initiates payment via Pi SDK
- Backend approves payment via Pi API
- Frontend updates UI with wallet data
- Backend sends tokens to new pioneers
