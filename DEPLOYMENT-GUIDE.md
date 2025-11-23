# TeosWallet Deployment Guide

Complete guide to deploy TeosWallet to production at **wallet.teosegypt.com**

## Prerequisites

- Vercel account
- GitHub repository access
- Domain: wallet.teosegypt.com
- Pi Network App verified

---

## Step 1: Deploy to Vercel

### Option A: Deploy from v0

1. Click the **"Publish"** button in the top right of v0 interface
2. Connect your Vercel account
3. Select project settings:
   - **Project Name**: teos-wallet
   - **Framework**: Next.js
   - **Root Directory**: ./
4. Click **Deploy**

### Option B: Deploy from GitHub

1. Push code to GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure:
   \`\`\`
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   \`\`\`
5. Click **Deploy**

---

## Step 2: Configure Custom Domain

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add domain: `wallet.teosegypt.com`
3. Configure DNS at your domain provider:

   **If using Cloudflare, Namecheap, or GoDaddy:**
   \`\`\`
   Type: CNAME
   Name: wallet
   Value: cname.vercel-dns.com
   TTL: Auto
   \`\`\`

   **If using root domain (teosegypt.com):**
   \`\`\`
   Type: A
   Name: @
   Value: 76.76.21.21
   \`\`\`

4. Wait for DNS propagation (5-30 minutes)
5. SSL certificate will be auto-issued by Vercel

---

## Step 3: Pi Network App Verification

### 3.1 Upload Validation Key

The `validation-key.txt` file is already in your `/public` folder.

After deployment, it will be accessible at:
\`\`\`
https://wallet.teosegypt.com/validation-key.txt
\`\`\`

### 3.2 Verify on Pi Developer Portal

1. Go to [minepi.com/develop](https://minepi.com/develop)
2. Select your app
3. Go to **Settings** → **Domain Verification**
4. Enter domain: `wallet.teosegypt.com`
5. Click **Verify Domain**
6. Wait for verification (1-5 minutes)

### 3.3 Update Pi App Configuration

In Pi Developer Portal:
\`\`\`
App Name: TeosWallet
App URL: https://wallet.teosegypt.com
Redirect URI: https://wallet.teosegypt.com/auth/callback
\`\`\`

---

## Step 4: Environment Variables

### Required Environment Variables

Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**

Add these variables:

\`\`\`env
# Pi Network Configuration
NEXT_PUBLIC_PI_APP_ID=your_pi_app_id
PI_API_KEY=your_pi_api_key

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# TEOS Token Addresses (Already in code, but can override)
NEXT_PUBLIC_TEOS_MINT=AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo
NEXT_PUBLIC_TUT_MINT=Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5

# Campaign Wallet
NEXT_PUBLIC_CAMPAIGN_WALLET=8P96xkWwmwWf8h5NvvSCvyKs6E68n6C9aqZ4X3jA1gvS

# Pi Network Stellar Address
NEXT_PUBLIC_PI_STELLAR_ADDRESS=GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F

# Domain
NEXT_PUBLIC_APP_URL=https://wallet.teosegypt.com
\`\`\`

After adding, click **Save** and **Redeploy**

---

## Step 5: Update Pi SDK Configuration

### 5.1 Install Pi SDK

In your project:
\`\`\`bash
npm install @pinetwork-js/sdk
\`\`\`

### 5.2 Update lib/pi-sdk.ts

Replace the mock SDK with real Pi SDK:

\`\`\`typescript
import Pi from '@pinetwork-js/sdk'

export class PiNetworkSDK {
  private pi: any
  
  async init(): Promise<void> {
    this.pi = await Pi.init({
      version: "2.0",
      sandbox: false // Set to false for production
    })
  }
  
  async authenticate(): Promise<PiUser> {
    const scopes = ['username', 'payments']
    const authResult = await this.pi.authenticate(scopes, onIncompletePaymentFound)
    
    return {
      uid: authResult.user.uid,
      username: authResult.user.username,
      accessToken: authResult.accessToken
    }
  }
  
  async createPayment(amount: number, memo: string, metadata?: Record<string, any>): Promise<PiPayment> {
    const paymentData = {
      amount: amount,
      memo: memo,
      metadata: metadata || {}
    }
    
    const payment = await this.pi.createPayment(paymentData, {
      onReadyForServerApproval: (paymentId) => {
        console.log('Payment ready:', paymentId)
      },
      onReadyForServerCompletion: (paymentId, txid) => {
        console.log('Payment completed:', paymentId, txid)
      },
      onCancel: (paymentId) => {
        console.log('Payment cancelled:', paymentId)
      },
      onError: (error, payment) => {
        console.error('Payment error:', error)
      }
    })
    
    return payment
  }
}
\`\`\`

---

## Step 6: Security Checklist

### 6.1 Wallet Security

- [ ] Implement proper encryption for stored keypairs
- [ ] Add backup/recovery mechanism
- [ ] Use secure random for key generation
- [ ] Implement session timeout
- [ ] Add transaction confirmation dialogs

### 6.2 Payment Security

- [ ] Verify all Pi payments on backend
- [ ] Implement payment webhook handler
- [ ] Add fraud detection
- [ ] Log all transactions
- [ ] Implement rate limiting

### 6.3 Production Hardening

\`\`\`typescript
// Add to next.config.mjs
export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
\`\`\`

---

## Step 7: Testing

### 7.1 Pre-Launch Checklist

- [ ] Test Pi payment flow end-to-end
- [ ] Verify wallet address generation
- [ ] Test all token operations (send, receive, swap)
- [ ] Check mobile responsiveness
- [ ] Test on multiple browsers
- [ ] Verify QR code generation
- [ ] Test civic verification flow
- [ ] Check Nilex DEX integration

### 7.2 Test URLs

After deployment, test:
\`\`\`
https://wallet.teosegypt.com - Main app
https://wallet.teosegypt.com/terms - Terms page
https://wallet.teosegypt.com/privacy - Privacy page
https://wallet.teosegypt.com/qr-pack - QR code pack
https://wallet.teosegypt.com/validation-key.txt - Pi verification
\`\`\`

---

## Step 8: Go Live

### 8.1 Launch Sequence

1. **Verify domain is live**: Visit https://wallet.teosegypt.com
2. **Test Pi payment**: Complete one test transaction
3. **Verify wallet generation**: Check Solana address is valid
4. **Test on mobile**: Use actual mobile device
5. **Monitor logs**: Check Vercel logs for errors
6. **Announce launch**: Share on social media

### 8.2 Monitoring

Set up monitoring:
- Vercel Analytics (auto-enabled)
- Error tracking: Check Vercel logs
- Pi payment webhook logs
- User registration tracking

---

## Step 9: Post-Launch

### Update Documentation

Update README.md with:
- Live URL
- Pioneer count
- Total contributions
- Feature updates

### Marketing

Announce on:
- Twitter: @KING_TEOS
- Facebook: @Teosegypt
- Telegram: t.me/teosegypt
- GitHub: Update all repos with live link

---

## Troubleshooting

### Domain Not Working

1. Check DNS records:
   \`\`\`bash
   nslookup wallet.teosegypt.com
   \`\`\`
2. Verify CNAME points to Vercel
3. Wait up to 48 hours for propagation
4. Clear browser cache

### Pi Verification Failing

1. Check validation key file is accessible:
   \`\`\`bash
   curl https://wallet.teosegypt.com/validation-key.txt
   \`\`\`
2. Verify file contains only the key (no extra whitespace)
3. Check domain is exactly `wallet.teosegypt.com` (no www)
4. Contact Pi Network support if still failing

### Wallet Not Generating

1. Check Solana web3.js is installed
2. Verify browser localStorage is enabled
3. Check console for errors
4. Test in incognito mode

### Payment Not Processing

1. Verify Pi App ID in environment variables
2. Check Pi SDK is properly initialized
3. Review Pi Developer Portal logs
4. Ensure app is not in sandbox mode

---

## Support

- GitHub Issues: [Your repo URL]
- Email: support@teosegypt.com
- Telegram: @teosegypt
- Twitter: @KING_TEOS

---

## Next Steps

After successful deployment:
1. Set up backend payment verification server
2. Implement wallet backup system
3. Add advanced analytics
4. Integrate with more DEXes
5. Launch Pioneer rewards program

**Congratulations! TeosWallet is now live at wallet.teosegypt.com**

From Egypt to the World 🇪🇬 - Powering the Digital Pharaohs
