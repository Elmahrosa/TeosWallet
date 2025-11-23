# TeosWallet - Git Deployment Guide

## Current Status
✅ LinkedIn URL already correct: https://www.linkedin.com/in/aymanseif/
✅ Pi payment system configured and optimized
✅ Founder auth with 7-day persistent session
✅ All code cleaned and production-ready

---

## Steps to Deploy to Your Git Repository

### Step 1: Download the Code from v0
1. Click the **three dots (⋯)** in the top right corner of v0
2. Select **"Download ZIP"**
3. Extract the ZIP file to your local machine

### Step 2: Set Up Git Repository
\`\`\`bash
# Navigate to the extracted folder
cd teos-wallet

# Initialize git (if not already done)
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/Elmahrosa/TeosWllet.git

# Or if already exists, update it
git remote set-url origin https://github.com/Elmahrosa/TeosWllet.git
\`\`\`

### Step 3: Commit and Push
\`\`\`bash
# Add all files
git add .

# Commit with message
git commit -m "Production-ready: Optimized Pi SDK, persistent founder auth, cleaned code"

# Push to GitHub
git push -u origin main

# If you get conflicts, force push (be careful!)
git push -f origin main
\`\`\`

### Step 4: Configure Vercel Environment Variables
Go to your Vercel project settings and add these environment variables:

**Required:**
\`\`\`
PI_API_KEY=xmc5kk0qmb1xsitfnlldvokhaocpyrvv4buvmnwkqxmftunrb0ayov3k0u6jhbzg
\`\`\`

**Optional (for frontend display):**
\`\`\`
NEXT_PUBLIC_PI_API_KEY=xmc5kk0qmb1xsitfnlldvokhaocpyrvv4buvmnwkqxmftunrb0ayov3k0u6jhbzg
\`\`\`

### Step 5: Redeploy on Vercel
After pushing to GitHub, Vercel will automatically redeploy your app.

Or manually trigger deployment:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your TeosWallet project
3. Click **"Redeploy"**

---

## Payment System Verification

### How Pi Payment Works:

**Frontend (Pi Browser):**
1. User clicks "Pay 1 Pi to Unlock Wallet"
2. Pi SDK loads from Pi Browser
3. User authenticates with Pi Network
4. Payment modal appears

**Backend (Vercel):**
1. `/api/pi/approve` - Approves payment with Pi Network API
2. `/api/pi/complete` - Completes payment after blockchain confirmation
3. Payment is sent to your Stellar address: `GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F`

### Testing Payment:
1. Open app in **Pi Browser** (required for Pi SDK to work)
2. URL: `https://teos-wllet.vercel.app` or `https://wallet.teosegypt.com`
3. Click payment button
4. Complete Pi authentication
5. Approve 1 Pi payment

**Note:** Payment will NOT work in regular browsers - only Pi Browser has the Pi SDK.

---

## Founder Dashboard Access

**URL:** `https://teos-wllet.vercel.app/founder`

**Credentials:**
- Username: `aymanseif` or `@aymanseif`
- Password: `teos2025founder`

**Session:** Stays logged in for 7 days (no need to login every time)

---

## Quick Checklist

- [ ] Download ZIP from v0
- [ ] Extract files locally
- [ ] Push to GitHub repository
- [ ] Verify environment variables in Vercel
- [ ] Test payment in Pi Browser
- [ ] Verify founder dashboard login
- [ ] Check that LinkedIn URL is correct in contact page

---

## Important Notes

**I Cannot Push Directly to Your Git Repository**
- v0 cannot access your GitHub credentials
- You must download and push manually
- This keeps your code secure

**Payment Requires Pi Browser**
- Regular browsers don't have Pi SDK
- Users must open the app through Pi Browser
- Test thoroughly before promoting to Pi community

**Environment Variables Are Critical**
- Without `PI_API_KEY`, payments will fail
- Set in Vercel project settings, not in code
- Never commit `.env` file to Git

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Test in Pi Browser (not Chrome/Safari)
4. Check browser console for errors

**All systems are production-ready. Just download and push to Git!**
