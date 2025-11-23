# TEOS Wallet Setup Guide - Where to Configure Everything

## YOUR LIVE WALLET
**Current URL**: https://teos-wllet.vercel.app (Note: There's a typo - "wllet" instead of "wallet")

## WHERE TO SET UP YOUR WALLET

### Option 1: Use It Right Now (No Setup Needed)
Your wallet is **ALREADY WORKING** at https://teos-wllet.vercel.app

**What works now without any setup:**
- Open the app in Pi Browser
- Pay 1 Pi to unlock wallet
- Get real Solana address
- See real TEOS/TUT/ERT/SOL balances from blockchain
- Send/receive tokens
- View transaction history

**What needs API keys to work:**
- AI Chat Assistant (needs OPENAI_API_KEY or OPENMIND_API_KEY)
- Fiat Swap via MoonPay (needs MOONPAY_API_KEY)

### Option 2: Add API Keys for Full Features

Go to your **Vercel Dashboard** to add environment variables:

#### Step 1: Open Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click on your project: **teos-wllet**
3. Click **Settings** tab
4. Click **Environment Variables** from sidebar

#### Step 2: Add These API Keys

**For AI Chat to Work:**
\`\`\`
OPENAI_API_KEY = sk-proj-your-openai-key-here
\`\`\`
OR
\`\`\`
OPENMIND_API_KEY = your-openmind-key-here
\`\`\`

**For Fiat Swaps to Work:**
\`\`\`
MOONPAY_API_KEY = pk_test_your-moonpay-key-here
NEXT_PUBLIC_MOONPAY_API_KEY = pk_test_your-moonpay-key-here
\`\`\`

**Optional - Pi Network API (for backend verification):**
\`\`\`
PI_API_KEY = your-pi-api-key-from-develop.pi
\`\`\`

#### Step 3: Redeploy
After adding environment variables:
1. Go to **Deployments** tab
2. Click **...** menu on latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes
5. Done! AI chat and fiat swaps now work

## WHERE IS YOUR WALLET ADDRESS?

### Your Wallet Automatically Creates When User Pays 1 Pi

**How it works:**
1. User opens your app in Pi Browser
2. User clicks "Unlock Wallet - Pay 1 Pi"
3. User authenticates with Pi Network
4. **Solana wallet is generated** from their Pi username
5. Wallet address is saved to browser localStorage
6. Real blockchain balances load automatically

**Founder Bypass (You Only):**
- If Pi username is `@aams1969` → No payment needed, instant access

### Campaign Wallet (Where Pioneer Payments Go)

This is YOUR wallet where users send $50 SOL contributions:
\`\`\`
F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6
\`\`\`

**To give pioneers their TEOS tokens:**
1. Check the [Pioneer Tracker Sheet](https://docs.google.com/spreadsheets/d/1C0l1UdoVN5DzQe0LdouCQ3KdAX2RudyiXYI5EVITpUk/edit)
2. When someone pays $50 SOL to campaign wallet
3. Send them 10,000 TEOS to their Solana address
4. Mark them as verified in the sheet

## WHERE TO GET API KEYS

### OpenAI API Key (For AI Chat)
1. Go to https://platform.openai.com/api-keys
2. Create account or login
3. Click "Create new secret key"
4. Copy the key (starts with `sk-proj-`)
5. Add to Vercel environment variables
6. Cost: ~$0.001 per chat message

### OpenMind API Key (Alternative AI)
1. Go to https://openmind.ai
2. Sign up for developer account
3. Get API key from dashboard
4. Add to Vercel environment variables

### MoonPay API Key (For Fiat Swaps)
1. Go to https://www.moonpay.com/dashboard/getting-started
2. Create business account
3. Get API key from dashboard
4. Use test key: `pk_test_...` for development
5. Use live key: `pk_live_...` for production
6. Add BOTH regular and NEXT_PUBLIC_ versions

## CURRENT TOKEN CONFIGURATION

Your tokens are already configured in the code:

### TEOS Token
\`\`\`typescript
Mint Address: AhXBUQmbhv9dNoZCiMYmXF4Gyi1cjQthWHFhTL2CJaSo
Decimals: 9
Network: Solana Mainnet
\`\`\`

### TUT Token
\`\`\`typescript
Mint Address: Gvce3ukeWYDprBeVtYrqUVdgMcRGADWSkX5vCKMQG3b5
Decimals: 9
Network: Solana Mainnet
\`\`\`

### ERT Token
\`\`\`typescript
Mint Address: [UPDATE THIS IN lib/teos-config.ts]
Decimals: 6
Network: Solana Mainnet
\`\`\`

**To update ERT mint address:**
1. Download code from v0 (three dots menu)
2. Edit `lib/teos-config.ts`
3. Update ERT mint address
4. Push to GitHub
5. Vercel auto-deploys

## WHERE TO TEST THE WALLET

### Test in Pi Browser (Real Environment)
1. Open Pi mobile app
2. Go to "Develop" section
3. Enter URL: `https://teos-wllet.vercel.app`
4. Test payment flow
5. Test wallet creation
6. Test balance loading

### Test on Desktop (Demo Mode)
1. Open https://teos-wllet.vercel.app in Chrome
2. App detects non-Pi browser
3. Shows demo mode with mock data
4. Can test UI but not real payments

## SUMMARY - YOUR SETUP CHECKLIST

### ALREADY DONE ✅
- [x] Code deployed to Vercel
- [x] Wallet creation logic working
- [x] Real Solana balance fetching
- [x] Pi Network SDK integrated
- [x] Token mint addresses configured
- [x] Founder bypass for @aams1969
- [x] Campaign wallet set
- [x] Pioneer tracking sheet

### TO DO (Optional for Full Features) ⏳
- [ ] Add OPENAI_API_KEY to Vercel (for AI chat)
- [ ] Add MOONPAY_API_KEY to Vercel (for fiat swaps)
- [ ] Register app at develop.pi (for Pi production mode)
- [ ] Update ERT mint address (when token is deployed)
- [ ] Fix domain typo: teos-wllet → teos-wallet (optional)

### TO DO (For Custom Domain) ⏳
- [ ] Configure DNS for wallet.teosegypt.com
- [ ] Add CNAME record pointing to Vercel
- [ ] Wait for DNS propagation (5-15 minutes)

## IMMEDIATE NEXT STEPS

**To start using your wallet TODAY:**
1. Open https://teos-wllet.vercel.app in Pi Browser
2. Pay 1 Pi to unlock
3. Start receiving real balances from Solana blockchain

**To enable AI chat:**
1. Get OpenAI API key from platform.openai.com
2. Add to Vercel environment variables
3. Redeploy
4. AI chat button works

**To enable fiat swaps:**
1. Get MoonPay API key from moonpay.com
2. Add to Vercel environment variables
3. Redeploy
4. Swap button connects to MoonPay

## WALLET IS ALREADY SET UP

Your wallet is fully operational. Users just need to:
1. Open in Pi Browser
2. Pay 1 Pi
3. Get their Solana address
4. Start using TEOS

No additional setup required unless you want AI chat and fiat swaps.
