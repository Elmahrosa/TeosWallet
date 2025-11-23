# Token Setup Guide

This guide explains how to configure TEOS Wallet to display real Solana SPL token balances.

---

## Overview

TEOS Wallet fetches token balances from Solana mainnet in real-time. To see your actual balances, you need to:

1. Deploy your SPL tokens on Solana (or use existing tokens)
2. Configure mint addresses in environment variables
3. Add tokens to the campaign wallet for distribution
4. Verify balances are displaying correctly

---

## Current Token Configuration

### TEOS Token ✅
- **Mint**: `AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo`
- **Status**: Live on Solana Mainnet
- **Explorer**: [View on Solscan](https://solscan.io/token/AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo)

### TUT Token ✅
- **Mint**: `Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5`
- **Status**: Live on Solana Mainnet
- **Explorer**: [View on Solscan](https://solscan.io/token/Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5)

### ERT Token ⚠️
- **Mint**: `YOUR_ERT_MINT_ADDRESS_HERE` (placeholder)
- **Status**: Pending deployment
- **Action**: Deploy ERT token and update `.env.production`

---

## Step 1: Deploy SPL Token (If Needed)

If you haven't deployed your tokens yet, use the Solana Token Program:

### Using Solana CLI

\`\`\`bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Create a new token
spl-token create-token --decimals 9

# This will output your mint address, e.g.:
# Creating token 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU

# Create token account
spl-token create-account YOUR_MINT_ADDRESS

# Mint initial supply (example: 10 billion tokens)
spl-token mint YOUR_MINT_ADDRESS 10000000000
\`\`\`

### Using Solana Token Creator UI

1. Visit: https://www.solana-token-creator.com/
2. Connect Phantom/Solflare wallet
3. Fill in token details:
   - Name: "Egyptian Remit Token"
   - Symbol: "ERT"
   - Decimals: 9
   - Supply: 10,000,000,000
4. Pay creation fee (~0.5 SOL)
5. Copy the mint address

---

## Step 2: Update Environment Variables

### Local Development

Edit `.env.local`:

\`\`\`env
NEXT_PUBLIC_TEOS_MINT=AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo
NEXT_PUBLIC_TUT_MINT=Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5
NEXT_PUBLIC_ERT_MINT=YOUR_ACTUAL_ERT_MINT_HERE
\`\`\`

### Vercel Production

1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add:
   - `NEXT_PUBLIC_TEOS_MINT` = `AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo`
   - `NEXT_PUBLIC_TUT_MINT` = `Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5`
   - `NEXT_PUBLIC_ERT_MINT` = `YOUR_ACTUAL_ERT_MINT_HERE`
3. Redeploy: `vercel --prod`

---

## Step 3: Fund Campaign Wallet

Users will see balances once tokens are added to the campaign wallet.

### Campaign Wallet Address
\`\`\`
F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6
\`\`\`

### Transfer Tokens

Using Phantom wallet:
1. Open Phantom → Send
2. Select token (TEOS/TUT/ERT)
3. Enter address: `F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6`
4. Amount: 100,000,000 (example initial supply)
5. Confirm transaction

Using Solana CLI:
\`\`\`bash
spl-token transfer YOUR_MINT_ADDRESS 100000000 F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6
\`\`\`

---

## Step 4: Verify Balances

### Check in TEOS Wallet
1. Visit: https://wallet.teosegypt.com
2. Pay 1 Pi to unlock wallet
3. Wait 10 seconds for balance refresh
4. Verify TEOS/TUT/ERT balances display correctly

### Check on Solana Explorer
1. Go to: https://solscan.io/account/F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6
2. View "Tokens" tab
3. Confirm TEOS/TUT/ERT appear with correct amounts

---

## How Balance Fetching Works

TEOS Wallet uses the Solana RPC API to fetch real-time token balances:

\`\`\`typescript
// lib/solana-balance.ts
export async function fetchTokenBalance(walletAddress: string, mintAddress: string) {
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)
  const publicKey = new PublicKey(walletAddress)
  const mintPublicKey = new PublicKey(mintAddress)
  
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
    mint: mintPublicKey,
  })
  
  return tokenAccounts.value[0]?.account.data.parsed.info.tokenAmount.uiAmount || 0
}
\`\`\`

**Auto-refresh**: Balances update every 10 seconds via polling.

---

## Troubleshooting

### Balance Shows 0

**Possible causes:**
1. Token not yet transferred to campaign wallet
2. Mint address incorrect in `.env`
3. RPC endpoint rate-limited (switch to paid RPC)

**Solution:**
- Verify token transfer on Solscan
- Double-check mint address matches deployed token
- Use premium RPC: https://www.quicknode.com or https://www.alchemy.com

### "Token Account Not Found" Error

**Cause:** Wallet doesn't have a token account for that mint.

**Solution:**
\`\`\`bash
# Create token account for wallet
spl-token create-account YOUR_MINT_ADDRESS --owner WALLET_ADDRESS
\`\`\`

### Balance Not Updating

**Cause:** Caching or RPC delay.

**Solution:**
- Click refresh button in header
- Clear browser cache (Ctrl+Shift+R)
- Wait 30 seconds for RPC propagation

---

## Production Checklist

Before going live:

- [ ] All three token mints deployed on Solana mainnet
- [ ] Environment variables updated in Vercel
- [ ] Campaign wallet funded with initial supply
- [ ] Balances verified on Solscan
- [ ] Test payment flow (pay 1 Pi → receive wallet → see balances)
- [ ] Premium RPC configured for high traffic (optional but recommended)

---

## Support

Need help with token setup?
- **Telegram**: [@elmahrosapi](https://t.me/elmahrosapi)
- **Email**: ayman@elmahrousa.com
- **GitHub Issues**: [Report a Problem](https://github.com/Elmahrosa/TeosWallet/issues)
