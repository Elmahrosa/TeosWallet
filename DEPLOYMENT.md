# TEOS Wallet - Deployment Guide

## Steps to Go Live

### 1. Environment Setup

Create a `.env.local` file with the following:

\`\`\`bash
# Solana RPC Endpoint (use a premium RPC for production)
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com
# Or use QuickNode, Helius, or other providers for better performance

# Pi Network Configuration
NEXT_PUBLIC_PI_STELLAR_ADDRESS=GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F
NEXT_PUBLIC_PI_PAYMENT_AMOUNT=1

# TEOS Token Addresses
NEXT_PUBLIC_TEOS_MINT=AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo
NEXT_PUBLIC_TUT_MINT=Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5

# Campaign Wallet
NEXT_PUBLIC_CAMPAIGN_WALLET=F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6
\`\`\`

### 2. Pi Network Domain Verification

1. Upload `validation-key.txt` to your hosting at:
   `https://teoswallet6613.pinet.com/validation-key.txt`

2. Verify the key is accessible by visiting the URL

3. Submit verification in Pi Network Developer Portal

4. Wait for approval (usually 24-48 hours)

### 3. Production Build

\`\`\`bash
npm install
npm run build
npm start
\`\`\`

### 4. Deployment Options

#### Option A: Vercel (Recommended)
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

#### Option B: Pi Network Hosting
1. Build the project: `npm run build`
2. Upload the `.next` folder and `public` folder
3. Configure server to run `npm start`
4. Point domain to hosting server

### 5. Pi Network Integration

To receive real Pi payments:

1. Set up Pi Network API credentials
2. Configure webhook for payment notifications
3. Implement server-side payment verification
4. Update `lib/verification.ts` with real Pi SDK

### 6. Solana Wallet Integration

Users can connect with:
- Any Solana wallet browser extension
- Phantom
- Solflare
- Backpack
- Trust Wallet (mobile)

### 7. Real Token Transfers

The wallet now supports:
- Real SOL transfers
- Real TEOS token transfers (AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo)
- Real TUT token transfers (Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5)

### 8. Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set up rate limiting
- [ ] Implement CORS policies
- [ ] Add CSP headers
- [ ] Enable Vercel Analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Implement transaction logging
- [ ] Add wallet address validation
- [ ] Set up backup RPC endpoints

### 9. Testing on Mainnet

1. Connect real Solana wallet
2. Verify real token balances display
3. Test send transactions with small amounts
4. Verify Nilex DEX integration
5. Test QR code generation
6. Verify civic verification flow

### 10. Go Live Checklist

- [ ] Domain verified on Pi Network
- [ ] SSL certificate installed
- [ ] Real Solana wallets connecting successfully
- [ ] Real token balances loading
- [ ] Send transactions working
- [ ] QR codes generating correctly
- [ ] All links to ecosystem apps working
- [ ] Terms and Privacy pages accessible
- [ ] Mobile responsive on all devices
- [ ] Analytics tracking enabled

## Pi Network Stellar Address

**Stellar Address:** `GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F`

This address is configured to receive 1 Pi payment to unlock wallet features.

## Support

For technical support:
- Telegram: @elmahrosapi
- WhatsApp: +20 100 616 7293
- Email: info@elmahrosa-expo.com

## Post-Launch

After going live:
1. Monitor wallet connections in real-time
2. Track transaction success rates
3. Gather user feedback
4. Update documentation
5. Plan feature releases

---

**From Egypt to the World - Powering the Digital Pharaohs** 🇪🇬
