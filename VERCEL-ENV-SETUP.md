# Vercel Environment Variables Setup

Your TeosWallet needs environment variables configured in Vercel for secure API key management.

## Required Environment Variables

### Pi Network API Key
\`\`\`
NEXT_PUBLIC_PI_API_KEY=xmc5kk0qmb1xsitfnlldvokhaocpyrvv4buvmnwkqxmftunrb0ayov3k0u6jhbzg
PI_API_KEY=xmc5kk0qmb1xsitfnlldvokhaocpyrvv4buvmnwkqxmftunrb0ayov3k0u6jhbzg
\`\`\`

Both variables are needed:
- `NEXT_PUBLIC_PI_API_KEY` - Used by frontend Pi SDK
- `PI_API_KEY` - Used by backend API routes (approve/complete)

## How to Add Environment Variables in Vercel

### Step 1: Go to Project Settings
1. Open your Vercel project: https://vercel.com/elmahrosa/teos-wllet
2. Click on **Settings** tab
3. Click on **Environment Variables** in the left sidebar

### Step 2: Add Each Variable
For each variable above:
1. Click **Add New** button
2. Enter the **Key** (variable name)
3. Enter the **Value** (your actual key)
4. Select environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. Click **Save**

### Step 3: Redeploy
After adding all variables:
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the three dots (...) menu
4. Select **Redeploy**
5. Wait for the build to complete

## Current Status

✅ Code updated to use environment variables  
⏳ Need to add environment variables in Vercel  
⏳ Need to redeploy after adding variables  

## Security Notes

- The Pi API key in `PI_API_KEY` is for backend only (secure)
- `NEXT_PUBLIC_PI_API_KEY` is exposed in frontend (required by Pi SDK)
- Never commit `.env` files to GitHub
- Use `.env.example` as a template only

## Local Development

Create a `.env.local` file in your project root:

\`\`\`env
NEXT_PUBLIC_PI_API_KEY=xmc5kk0qmb1xsitfnlldvokhaocpyrvv4buvmnwkqxmftunrb0ayov3k0u6jhbzg
PI_API_KEY=xmc5kk0qmb1xsitfnlldvokhaocpyrvv4buvmnwkqxmftunrb0ayov3k0u6jhbzg
\`\`\`

This file is automatically ignored by Git.

## Verification

After redeployment, test the payment flow:
1. Open app in Pi Browser: https://teos-wllet.vercel.app
2. Click "Pay 1 Pi to Unlock Wallet"
3. Complete the payment
4. Verify wallet unlocks successfully

If you see errors, check the Vercel deployment logs for missing environment variables.
