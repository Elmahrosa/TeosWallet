# Deploy TeosWallet to wallet.teosegypt.com

## Step 1: Push Code to GitHub Repository

### Connect to https://github.com/Elmahrosa/TeosWllet

\`\`\`bash
# Navigate to your local TeosWallet directory
cd teos-wallet

# Initialize git (if not already done)
git init

# Add the remote repository
git remote add origin https://github.com/Elmahrosa/TeosWllet.git

# Add all files
git add .

# Commit your changes
git commit -m "Initial TEOS Wallet deployment with profiles and Pi integration"

# Push to GitHub
git push -u origin main
\`\`\`

If the repository already exists, sync your changes:

\`\`\`bash
# Pull latest changes first
git pull origin main

# Add your changes
git add .

# Commit
git commit -m "Add user profiles, founder card, and deployment docs"

# Push
git push origin main
\`\`\`

## Step 2: Deploy to Vercel

### Option A: Deploy from v0.dev (Recommended)

1. Click the **"Publish"** button in the top-right corner of v0.dev
2. Select **"Deploy to Vercel"**
3. Connect your GitHub account if not already connected
4. Select the repository: **Elmahrosa/TeosWllet**
5. Configure the project:
   - **Project Name**: `teos-wallet`
   - **Framework**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Option B: Deploy from Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import from GitHub: **Elmahrosa/TeosWllet**
4. Configure build settings (same as above)
5. Click **"Deploy"**

## Step 3: Configure Custom Domain

### Add wallet.teosegypt.com

1. In Vercel project settings, go to **"Domains"**
2. Add custom domain: `wallet.teosegypt.com`
3. Vercel will provide DNS instructions

### Update DNS Records (Namecheap/Cloudflare)

Add these DNS records to your teosegypt.com domain:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | wallet | cname.vercel-dns.com | Auto |

Or if using A records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | wallet | 76.76.21.21 | Auto |

Wait 5-10 minutes for DNS propagation.

## Step 4: Environment Variables

Add these in Vercel Project → Settings → Environment Variables:

\`\`\`env
# Pi Network
NEXT_PUBLIC_PI_APP_ID=your_pi_app_id
PI_API_KEY=your_pi_api_secret

# Deployment
NEXT_PUBLIC_APP_URL=https://wallet.teosegypt.com
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
\`\`\`

## Step 5: Verify Pi Network Domain

1. Ensure `public/validation-key.txt` contains:
   \`\`\`
   843eab15441e880193b821432df6b975d514f2fe7ec1bfbfd51639c3918c871d411a90ff06ca2f06c58a4f497ab6801f3c5b1d93052099deebcd52ec91e00541
   \`\`\`

2. Go to [Pi Developer Portal](https://develop.pi/) → Your App → Settings

3. Add domain: `wallet.teosegypt.com`

4. Pi Network will check: `https://wallet.teosegypt.com/validation-key.txt`

5. Wait for **"Domain Verified"** status (can take 5-30 minutes)

## Step 6: Upload Founder Photo

Add Ayman Seif's profile photo to make the founder card complete:

1. Upload `founder-ayman-seif.jpg` to `public/` folder
2. Recommended size: 400x400px, optimized for web
3. Commit and push:
   \`\`\`bash
   git add public/founder-ayman-seif.jpg
   git commit -m "Add founder profile photo"
   git push origin main
   \`\`\`

4. Vercel will auto-deploy the update

## Step 7: Test the Live App

### 1. Open wallet.teosegypt.com

Check that the site loads with:
- Egyptian pharaoh theme (gold & turquoise)
- "Pay 1 Pi to Unlock Wallet" banner
- Token cards (TEOS, TUT, ERT)
- Footer with correct links

### 2. Test Pi Payment Flow

1. Click **"Become Pioneer - Pay 1 Pi"**
2. Authenticate with Pi Network
3. Complete payment
4. **Profile modal should appear** asking for:
   - Username
   - Patient number (optional)
   - Profile photo (optional)
5. Save profile
6. Wallet should unlock with real Solana address

### 3. Verify Profiles Work

1. Click your profile icon in the header
2. Go to **"Profile"** tab
3. Check that:
   - Your profile photo appears
   - Username and patient number display
   - Civic score shows 0 initially
   - Founder profile card shows Ayman Seif
   - Social links work (Twitter, Telegram, GitHub)

### 4. Check QR Codes

1. Click **"Receive"** on any token
2. Verify QR code generates for wallet address
3. Test **"Copy"** and **"Download"** buttons

### 5. Test Mobile Responsiveness

Open wallet.teosegypt.com on mobile:
- Check that profile photo upload works from camera
- Verify tabs scroll horizontally on small screens
- Test payment modal on mobile Safari/Chrome

## Step 8: Monitor Deployment

### Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click latest deployment
3. Check **"Functions"** tab for errors
4. Monitor **"Analytics"** for traffic

### Set Up Alerts

1. Enable Vercel integrations:
   - Slack notifications for deployments
   - Email alerts for build failures

## Step 9: Promote the Live Wallet

Now that wallet.teosegypt.com is live with profiles:

1. **Update README badges** to show "Live" status
2. **Tweet from @KING_TEOS**: "TEOS Wallet is LIVE at wallet.teosegypt.com! 🔱"
3. **Post in Telegram** (@elmahrosapi): Share wallet link
4. **Update Pioneer Form** (Tally): Mention user profiles feature
5. **Add to Linktree**: wallet.teosegypt.com

## Troubleshooting

### Issue: Pi Payment Fails

**Solution**: Check that Pi App ID is correct in environment variables. Test in Pi Network sandbox first.

### Issue: Profile Photo Not Uploading

**Solution**: localStorage has 5MB limit. For production, integrate Vercel Blob:
\`\`\`bash
npm install @vercel/blob
\`\`\`

Update `lib/profile.ts` to use Blob storage instead of base64.

### Issue: Domain Not Verifying

**Solution**: 
1. Check DNS propagation: `dig wallet.teosegypt.com`
2. Ensure validation-key.txt is accessible at root
3. Clear Cloudflare cache if using CF

### Issue: GitHub Push Rejected

**Solution**:
\`\`\`bash
# Force push (only if you're sure)
git push origin main --force

# Or resolve conflicts
git pull origin main --rebase
git push origin main
\`\`\`

## Post-Deployment Checklist

- [ ] wallet.teosegypt.com loads correctly
- [ ] Pi payment flow works end-to-end
- [ ] User profile creation works with photo upload
- [ ] Founder profile card displays Ayman Seif
- [ ] QR codes generate and download properly
- [ ] Mobile version is responsive
- [ ] All ecosystem links work (Nilex, FPBE, etc.)
- [ ] Terms and Privacy pages accessible
- [ ] Validation key verified by Pi Network
- [ ] Environment variables set in Vercel
- [ ] GitHub repository updated with latest code

## Next Steps

1. Monitor first 100 Pioneer signups
2. Collect user feedback on profile feature
3. Add patient number integration with Salma Unity Care Hospital
4. Enable Vercel Blob for large photo uploads
5. Add profile editing from settings menu
6. Implement civic score calculation based on verification completion

---

**Congratulations!** TEOS Wallet is now live at wallet.teosegypt.com with full profile functionality, founder showcase, and Pi Network integration. 🎉

From Egypt to the World, Powering the Digital Pharaohs! 🔱
\`\`\`

```json file="" isHidden
