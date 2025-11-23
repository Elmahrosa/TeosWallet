# Environment Variables Setup Guide

Your TEOS Wallet needs the following environment variables configured in Vercel:

## Required Environment Variables

### 1. Pi Network API Key
\`\`\`
PI_API_KEY=your_pi_api_key_here
\`\`\`

**How to get it:**
1. Go to https://develop.minepi.com/
2. Login with your Pi Network developer account
3. Create a new app or select your existing app
4. Copy the API key from the dashboard
5. Add it to Vercel environment variables

### 2. Pi Network API Key (Public)
\`\`\`
NEXT_PUBLIC_PI_API_KEY=your_pi_api_key_here
\`\`\`

**Note:** This is the same as `PI_API_KEY` but prefixed with `NEXT_PUBLIC_` so it can be used in the browser for SDK initialization.

### 3. Solana RPC URL (Optional but recommended)
\`\`\`
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
\`\`\`

Or use a premium RPC from Helius, QuickNode, or Alchemy for better performance.

## Setting Environment Variables in Vercel

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable:
   - Variable name: `PI_API_KEY`
   - Value: Your actual Pi API key
   - Environments: Production, Preview, Development
4. Click "Save"
5. Redeploy your app for changes to take effect

## Verifying Setup

After adding environment variables:
1. Open your app in Pi Browser
2. Check the browser console (F12) for `[v0]` debug messages
3. Try making a payment - you should see detailed logs
4. If you see "Failed to approve payment", check that `PI_API_KEY` is correctly set

## Common Issues

**Payment not processing:**
- Verify `PI_API_KEY` is set in Vercel
- Check that you're using Pi Browser, not regular browser
- Look for `[v0]` debug messages in console

**SDK not loading:**
- Make sure `NEXT_PUBLIC_PI_API_KEY` is set
- Open the app in Pi Browser app, not mobile Safari/Chrome
- Clear browser cache and reload

**Username not showing as @aams1969:**
- Username is determined by your Pi Network account
- Make sure you're logged into Pi Browser with the correct account
- The config file has `piUsername: "@aams1969"` for display purposes
