# Security Configuration for TeosWallet

## Critical Security Notice

Your Pi Network API key should NEVER be committed to your repository or exposed in frontend code. Follow these steps to secure your credentials.

## Step 1: Add Environment Variables to Vercel

Go to your Vercel project settings and add these environment variables:

### Required Environment Variables

\`\`\`
NEXT_PUBLIC_PI_API_KEY=xmc5kk0qmb1xsitfnlldvokhaocpyrvv4buvmnwkqxmftunrb0ayov3k0u6jhbzg
\`\`\`

## Step 2: Update Your Local Development

Create a `.env.local` file in your project root (this file is already gitignored):

\`\`\`bash
NEXT_PUBLIC_PI_API_KEY=xmc5kk0qmb1xsitfnlldvokhaocpyrvv4buvmnwkqxmftunrb0ayov3k0u6jhbzg
\`\`\`

## Step 3: Never Commit Private Keys

Private keys should ONLY be stored:
- In Vercel environment variables (for production)
- In `.env.local` file (for local development - this file is gitignored)
- NEVER in your code files

## Current Status

✅ App deployed successfully at https://teos-wllet.vercel.app/
✅ Solana token addresses configured (TEOS, TUT, ERT)
✅ Pi Network payment integration ready
⚠️ Move API key to environment variables immediately

## How to Add Environment Variables to Vercel

1. Go to https://vercel.com/dashboard
2. Select your TeosWallet project
3. Go to Settings > Environment Variables
4. Add `NEXT_PUBLIC_PI_API_KEY` with your API key
5. Redeploy your app

## After Adding Environment Variables

Redeploy your app:
\`\`\`bash
vercel --prod
\`\`\`

Or push to GitHub and Vercel will automatically redeploy.

## Important Notes

- Pi API keys in frontend are visible to users but this is normal for Pi SDK
- The `NEXT_PUBLIC_` prefix makes the variable available in the browser
- Never expose private keys or secrets in frontend code
- For server-side secrets, use environment variables WITHOUT the `NEXT_PUBLIC_` prefix
</markdown>
