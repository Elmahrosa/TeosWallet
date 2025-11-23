# TEOS Token Setup Guide

## Current Status
🔴 **All balances are showing as ZERO because token mint addresses need to be updated**

## Steps to Show Real Balances

### 1. Create or Deploy Your Tokens on Solana
If you haven't created your tokens yet, you need to:
- Deploy TEOS, TUT, and ERT tokens on Solana Mainnet
- Each token deployment will give you a **mint address** (public key)

### 2. Add 100M Tokens to Your Wallet
Once tokens are deployed, mint 100M of each to your Solana wallet:
\`\`\`
Wallet: F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6
- 100,000,000 TEOS
- 100,000,000 TUT  
- 100,000,000 ERT
\`\`\`

### 3. Update Token Mint Addresses in Config
Edit `lib/teos-config.ts` and replace the placeholder mint addresses:

\`\`\`typescript
tokens: {
  teos: {
    mintAddress: "YOUR_REAL_TEOS_MINT_ADDRESS_HERE", // Replace this
  },
  tut: {
    mintAddress: "YOUR_REAL_TUT_MINT_ADDRESS_HERE", // Replace this
  },
  ert: {
    mintAddress: "YOUR_REAL_ERT_MINT_ADDRESS_HERE", // Replace this
  },
}
\`\`\`

### 4. How to Find Your Token Mint Addresses
After deploying tokens on Solana:
- Check Solscan: https://solscan.io
- Check your wallet's token list
- The mint address is the **token's public key** (not your wallet address)

### 5. Verify Real Balances
Once mint addresses are updated:
- Open TeosWallet in Pi Browser
- Pay 1 Pi to unlock wallet
- Real balances will load from Solana blockchain
- Balances refresh every 10 seconds automatically

## Current Configuration

**Campaign Wallet (where 100M tokens should be added):**
\`\`\`
F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6
\`\`\`

**Pi Network Receiver:**
\`\`\`
GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F
\`\`\`

## Testing Checklist
- [ ] Deploy TEOS token on Solana
- [ ] Deploy TUT token on Solana
- [ ] Deploy ERT token on Solana
- [ ] Mint 100M TEOS to campaign wallet
- [ ] Mint 100M TUT to campaign wallet
- [ ] Mint 100M ERT to campaign wallet
- [ ] Update mintAddress for TEOS in config
- [ ] Update mintAddress for TUT in config
- [ ] Update mintAddress for ERT in config
- [ ] Test in TeosWallet - verify real balances show

## No More Fake Data
✅ All demo balances removed
✅ All transactions are real blockchain queries
✅ Balances fetch from Solana mainnet only
✅ No hardcoded values

Once you complete these steps, TeosWallet will display your real token balances from the Solana blockchain!
