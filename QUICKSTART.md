# TEOS Wallet - Quick Start Guide

Get your TEOS Wallet running in 5 minutes! 🚀

## Prerequisites

- Node.js 18+ installed
- Git installed
- Pi Network account ([Sign up](https://minepi.com/aymanseif))
- 1 Pi token for wallet activation

## Local Development Setup

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/Elmahrosa/TeosWllet.git
cd TeosWllet
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## First-Time User Flow

### Step 1: Pay 1 Pi to Unlock Wallet

1. Click **"Become Pioneer - Pay 1 Pi"**
2. Authenticate with your Pi Network account
3. Approve the 1 Pi payment
4. Wait for payment confirmation

### Step 2: Create Your Profile

After payment, you'll see the profile setup modal:

1. **Upload Photo** (optional)
   - Click the camera icon
   - Select a photo from your device
   - Photo is stored locally in your browser

2. **Enter Username** (required)
   - Choose a unique display name
   - Example: "DigitalPharaoh"

3. **Add Patient Number** (optional)
   - For Salma Unity Care Hospital integration
   - Example: "HC-2025-001234"

4. **Write Bio** (optional)
   - Tell the community about yourself
   - Max 200 characters

5. Click **"Save Profile & Continue"**

### Step 3: Receive Your Wallet Addresses

You now have:
- ✅ Solana wallet address (real, generated with Solana web3.js)
- ✅ Pi Network stellar address (GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F)
- ✅ Verified TEOS Pioneer badge
- ✅ Access to all wallet features

### Step 4: Complete Civic Verification

To unlock swaps and mining:

1. Go to **Settings** → **Civic Verification**
2. Complete all 4 requirements:
   - ✍️ Sign the [Egypt Digital Currency Petition](https://www.change.org/p/join-the-movement-sign-the-petition-to-regulate-digital-currencies-in-egypt)
   - 💬 Join [Telegram Community](https://t.me/elmahrosapi)
   - 👍 Follow [Facebook Page](https://facebook.com/teosegypt)
   - 🐦 Follow [@KING_TEOS on Twitter](https://twitter.com/KING_TEOS)
3. Check each box as you complete them

## Key Features

### Token Management

- **TEOS** - Network governance token
- **TUT** - Utility token for ecosystem services
- **ERT** - Egyptian civic stablecoin (1 ERT = 1 EGP)

### Wallet Actions

**Send Tokens**
1. Click **"Send"** on any token card
2. Enter recipient Solana address
3. Enter amount
4. Add optional message
5. Confirm transaction

**Receive Tokens**
1. Click **"Receive"** on any token card
2. Share your QR code or wallet address
3. Download QR code for events

**Swap Tokens**
1. Click **"Swap"** (requires Bronze+ tier)
2. Select tokens to swap
3. Opens Nilex DEX integration
4. Powered by Egypt's sovereign DEX

### Mining & Staking

**Claim Mining Rewards**
1. Go to **Mining** tab
2. View your mining rate (based on tier)
3. Click **"Claim Rewards"**
4. TEOS added to your balance instantly

**Join a Contribution Tier**

| Tier | Contribution | Reward |
|------|--------------|--------|
| Pioneer | $50 SOL | 10,000 TEOS |
| Bronze | $25 SOL | 5,000 TEOS |
| Silver | $100 SOL | 25,000 TEOS |
| Gold | $250 SOL | 75,000 TEOS |
| Sovereign | $500 SOL | 150,000 TEOS |

Send SOL to campaign wallet: `F1YLmukcxAyZj6zVpi2XaVctmYnuZQB5uHpd3uUpXxr6`

### Profile Management

**View Your Profile**
1. Click your profile icon in the header
2. Or go to **Profile** tab
3. See your stats:
   - Civic score
   - Contributor tier
   - Member since date
   - Bio and patient number

**Edit Profile**
1. Go to **Profile** tab
2. Click **"Edit Profile"**
3. Update photo, bio, or patient number
4. Save changes

**Meet the Founder**
- See Ayman Seif's profile on the Profile tab
- Connect via Twitter, Telegram, GitHub, LinkedIn

## Ecosystem Integration

### Nilex DEX
Visit [nilex.teosegypt.com](https://nilex.teosegypt.com) for:
- Advanced trading pairs
- Liquidity pools
- Yield farming
- Cross-chain swaps (coming soon)

### FPBE Banking
Visit [FPBE GitHub](https://github.com/Aymanseif/FPBE-First-Pimisr-Bank-Elmahrosa) for:
- Fiat on/off ramps (EGP ↔ TEOS)
- Crypto-backed loans
- Savings accounts

### Healthcare
Visit [Salma Unity Care Hospital](https://github.com/Elmahrosa/salma-unity-care-hospital) for:
- Book appointments with TEOS
- Pay bills with TUT
- Access medical records

### Smart City
Visit [ElMahrosa Pi Smart City](https://github.com/Elmahrosa/ElMahrosa-Pi-Smart-City) for:
- Vote on city proposals
- Fund infrastructure projects
- Pay utility bills with ERT

## Troubleshooting

### Pi Payment Fails

**Problem**: Payment doesn't complete  
**Solution**: 
- Check your Pi balance (need at least 1 Pi)
- Try refreshing and authenticating again
- Clear browser cache

### Profile Photo Not Saving

**Problem**: Photo disappears after refresh  
**Solution**:
- localStorage has 5MB limit
- Use smaller photos (< 500KB)
- For production, we'll upgrade to Vercel Blob storage

### Civic Verification Not Working

**Problem**: Checkboxes don't save  
**Solution**:
- Complete each step and manually check the box
- Refresh the page to ensure it persists
- Check browser console for errors

### Wallet Address Not Generating

**Problem**: Shows "Pay 1 Pi to unlock wallet"  
**Solution**:
- Ensure Pi payment completed successfully
- Check verification status in localStorage
- Clear localStorage and try payment again

## Mobile Usage

TEOS Wallet works great on mobile!

**Install as PWA** (coming soon):
1. Open wallet.teosegypt.com in mobile browser
2. Tap "Add to Home Screen"
3. Use like a native app

**Mobile Features**:
- Camera photo upload for profile
- Mobile-optimized tabs
- QR code scanning (coming soon)
- Touch-friendly interface

## Security Best Practices

1. **Backup Your Recovery Phrase**
   - Write down your Solana wallet seed
   - Store in a safe place
   - Never share with anyone

2. **Verify URLs**
   - Only use wallet.teosegypt.com
   - Check for HTTPS lock icon
   - Beware of phishing sites

3. **Start Small**
   - Test with small amounts first
   - Verify recipient addresses carefully
   - Double-check before confirming transactions

4. **Enable 2FA**
   - On your Pi Network account
   - On your email
   - On any connected social media

## Get Help

**Community Support**:
- Telegram: [@elmahrosapi](https://t.me/elmahrosapi)
- Twitter: [@KING_TEOS](https://twitter.com/KING_TEOS)

**Technical Issues**:
- GitHub Issues: [Report a Bug](https://github.com/Elmahrosa/TeosWllet/issues)
- Email: info@elmahrosa-expo.com

**Pioneer Program**:
- Application Form: [tally.so/r/mDL7Yb](https://tally.so/r/mDL7Yb)
- Tracker Sheet: [Google Sheets](https://docs.google.com/spreadsheets/d/1C0l1UdoVN5DzQe0LdouCQ3KdAX2RudyiXYI5EVITpUk/edit)

---

## What's Next?

After setup, explore:
- 📊 **Analytics Tab** - View portfolio performance
- 🏛️ **Ecosystem Tab** - Connect to TEOS services
- ⛏️ **Mining Tab** - Start earning TEOS
- 👤 **Profile Tab** - Showcase your pioneer status

**Ready to become a Digital Pharaoh?** 🔱

Visit [wallet.teosegypt.com](https://wallet.teosegypt.com) and start your journey!

From Egypt to the World 🇪🇬 → 🌍
