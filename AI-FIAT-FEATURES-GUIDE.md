# AI Assistant & Fiat Swap Features - Deployment Guide

## Overview

Your TEOS Wallet now includes two powerful new features:

1. **AI Assistant** - Conversational chatbot powered by OpenAI GPT-4
2. **Fiat On/Off Ramp** - Buy/sell crypto with USD, EUR, EGP via MoonPay

---

## Features Added

### 1. AI Assistant (`components/ai-chat-modal.tsx`)

**What it does:**
- Answers questions about your wallet, balances, and transactions
- Explains TEOS ecosystem features
- Provides blockchain education
- Offers security best practices
- Uses Egyptian-themed responses

**Access:**
- Floating button (Bot icon) in bottom-right corner
- Click to open chat interface
- Real-time streaming responses

**Technical:**
- Uses Vercel AI SDK with OpenAI GPT-4o-mini
- Server-side API calls for security
- Context-aware (knows your balances, recent transactions)

### 2. Fiat Swap Modal (`components/fiat-swap-modal.tsx`)

**What it does:**
- Buy crypto with fiat (USD, EUR, EGP)
- Sell crypto for fiat
- Support for Pi, TEOS, TUT, ERT, SOL
- Real-time quotes with fees
- Direct integration with payment providers

**Access:**
- Floating button (Dollar icon) in bottom-right corner
- Select buy/sell mode
- Get instant quotes
- Complete purchase via MoonPay

**Technical:**
- MoonPay integration (production-ready)
- Exchange rate calculations
- Fee transparency (2.5%)
- Secure payment flow

---

## Environment Variables Required

Add these to your Vercel project:

\`\`\`bash
# AI Assistant
OPENAI_API_KEY=sk-your-openai-key-here

# Fiat On/Off Ramp
MOONPAY_API_KEY=your-moonpay-api-key-here
TRANSAK_API_KEY=your-transak-api-key-here  # Optional alternative
\`\`\`

### Getting API Keys

1. **OpenAI API Key:**
   - Go to: https://platform.openai.com/api-keys
   - Create new secret key
   - Copy and save immediately (won't show again)
   - Cost: ~$0.001 per chat interaction

2. **MoonPay API Key:**
   - Go to: https://www.moonpay.com/dashboard/signup
   - Complete KYC verification
   - Generate production API key
   - Set up webhook URLs for payment notifications

---

## Files Changed/Added

### New Files
1. `lib/ai-assistant.ts` - AI backend logic
2. `components/ai-chat-modal.tsx` - Chat UI
3. `lib/fiat-service.ts` - Fiat swap logic
4. `components/fiat-swap-modal.tsx` - Fiat swap UI

### Modified Files
1. `app/page.tsx` - Added floating buttons and modals
2. `.env.example` - Added new environment variables
3. `package.json` - Already includes AI SDK dependencies

---

## Deployment Steps

### Step 1: Download Latest Code from v0
\`\`\`bash
# Click the three dots (•••) in the top-right of v0
# Select "Download ZIP"
# Extract to your local machine
\`\`\`

### Step 2: Update GitHub Repository
\`\`\`bash
cd TeosWallet  # or your repo directory

# Add all new files
git add .

# Commit with descriptive message
git commit -m "feat: Add AI assistant and fiat swap features"

# Push to main branch
git push origin main
\`\`\`

### Step 3: Configure Vercel Environment Variables

\`\`\`bash
# Option 1: Via Vercel Dashboard
# 1. Go to: https://vercel.com/your-team/teos-wallet/settings/environment-variables
# 2. Add each variable:
#    - OPENAI_API_KEY
#    - MOONPAY_API_KEY
# 3. Select all environments (Production, Preview, Development)
# 4. Click "Save"

# Option 2: Via Vercel CLI
vercel env add OPENAI_API_KEY production
vercel env add MOONPAY_API_KEY production
\`\`\`

### Step 4: Deploy
\`\`\`bash
# Automatic deployment (recommended)
# Vercel will auto-deploy when you push to main

# Manual deployment (if needed)
vercel --prod
\`\`\`

---

## Testing Guide

### Test AI Assistant

1. Open wallet at https://wallet.teosegypt.com
2. Click the Bot icon (bottom-right)
3. Try these test prompts:
   - "What is my TEOS balance?"
   - "How do I send tokens?"
   - "Explain the TEOS ecosystem"
   - "What security measures should I take?"

**Expected behavior:**
- Chat opens instantly
- AI responds within 2-3 seconds
- Responses are contextual and helpful
- Chat history persists during session

### Test Fiat Swap

1. Click the Dollar icon (bottom-right)
2. Select "Buy Crypto"
3. Enter amount: 100 USD
4. Select cryptocurrency: Pi
5. Click "Get Quote"
6. Verify quote shows:
   - Fiat amount
   - Crypto amount
   - Exchange rate
   - Fees (2.5%)
   - Provider (MoonPay)
7. Click "Continue to MoonPay"

**Expected behavior:**
- Quote appears within 1 second
- Calculations are accurate
- MoonPay window opens in new tab
- Payment flow works end-to-end

---

## Mobile Responsiveness

Both features are fully responsive:

- **AI Chat:** Adapts to phone screens, scrollable message history
- **Fiat Modal:** Touch-friendly buttons, readable text on small screens
- **Floating Buttons:** Positioned for thumb access on mobile

Test on:
- iPhone (Safari)
- Android (Chrome)
- Tablet (landscape/portrait)

---

## Cost Estimates

### AI Assistant
- **Per user per day:** ~$0.01 (10 questions)
- **1000 users/month:** ~$300
- **Optimization:** Cache common responses, use GPT-4o-mini

### Fiat Ramp
- **MoonPay fees:** 2.5-4.5% per transaction
- **Your cut:** Negotiate revenue share with MoonPay
- **No upfront cost** - only pay per successful transaction

---

## Security Considerations

### AI Assistant
✅ Server-side API calls (keys never exposed to client)
✅ Rate limiting (prevent abuse)
✅ No PII sent to OpenAI
✅ Context filtered to wallet data only

### Fiat Swap
✅ MoonPay handles KYC/AML compliance
✅ Payment processing via secure iframe
✅ No credit card data touches your servers
✅ Wallet addresses validated before payment

---

## Troubleshooting

### AI Assistant Issues

**Problem:** "Failed to get AI response"
- Check: OpenAI API key is set correctly in Vercel
- Check: API key has credits remaining
- Check: Network connectivity

**Problem:** Slow responses
- Normal: 2-3 seconds for GPT-4o-mini
- Upgrade to GPT-4o-turbo for faster responses
- Add loading skeleton for better UX

### Fiat Swap Issues

**Problem:** "Provider not configured"
- Check: MOONPAY_API_KEY is set in Vercel
- Check: MoonPay account is active
- Check: Sandbox vs Production mode

**Problem:** Payment window doesn't open
- Check: Browser popup blocker settings
- Check: HTTPS is enabled (required by MoonPay)
- Check: Wallet address is valid Solana address

---

## Next Steps

### Recommended Enhancements

1. **AI Assistant:**
   - Add voice input/output
   - Multi-language support (Arabic)
   - Transaction history analysis
   - Price alerts and predictions

2. **Fiat Swap:**
   - Add Transak as backup provider
   - Support more fiat currencies (JPY, GBP, AUD)
   - P2P fiat trading (escrow system)
   - Bank transfer integration

3. **Analytics:**
   - Track AI chat topics
   - Monitor fiat conversion rates
   - User engagement metrics
   - Revenue per user

---

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Test environment variables are set
3. Verify API keys have correct permissions
4. Contact support:
   - Email: info@elmahrosa-expo.com
   - Telegram: @elmahrosapi
   - GitHub Issues: https://github.com/Elmahrosa/TeosWallet/issues

---

## Conclusion

Your TEOS Wallet now rivals leading wallets like Phantom and Trust Wallet with:

✅ AI-powered support
✅ Fiat on/off ramps
✅ Pi Network integration
✅ Multi-token support
✅ Pharaonic Futurism design
✅ Mobile-first UX

**Ready for production deployment!**

Download the code, push to GitHub, set environment variables, and deploy to Vercel.

---

**Built with ❤️ by Elmahrosa International E.S.T.**
**From Egypt to the World - Powering the Digital Pharaohs**
