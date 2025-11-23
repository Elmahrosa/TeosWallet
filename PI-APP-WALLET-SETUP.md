# Pi Network App Wallet Setup Guide

## The Problem
When users try to pay 1 Pi, they see: **"Error! The developer of this app has not set up the app wallet."**

This means your Pi Network app is not configured to receive payments yet.

---

## Solution: Configure Your Pi App Wallet

### Step 1: Go to Pi Developer Portal
1. Open Pi Browser on your phone
2. Navigate to: **https://develop.pi**
3. Log in with your Pi account (@aams1969)

### Step 2: Find Your App
1. Click on **"My Apps"**
2. Find **"TEOS Wallet"** or **"TeosWallet"** in your apps list
3. Click on your app to open settings

### Step 3: Set Up App Wallet
1. In your app settings, find the **"Payments"** or **"Wallet"** section
2. Click **"Set up app wallet"** or **"Configure wallet"**
3. You will need to provide:
   - **Wallet Address**: Your Pi wallet address to receive payments
   - **Payment Recipient**: Confirm it's your account
   
4. Your current wallet address in the code is:
   \`\`\`
   GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F
   \`\`\`

### Step 4: Enable Payments
1. Toggle **"Enable Payments"** to ON
2. Set payment settings:
   - **Allow payments**: YES
   - **Payment amount**: 1 Pi (already set in your code)
3. Save changes

### Step 5: Submit for Review (if required)
1. If your app is in development mode, submit it for review
2. Wait for Pi Network team approval
3. Once approved, payments will work

---

## Verification

After setting up the app wallet:

1. Open your app in Pi Browser: **https://teos-wllet.vercel.app**
2. Click **"Become Pioneer - Pay 1 Pi"**
3. The Pi payment modal should open successfully
4. Complete a test payment

---

## Current Code Configuration

Your app is already correctly configured with:

\`\`\`typescript
// lib/pi-sdk.ts
export const PI_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_PI_API_KEY || "",
  walletAddress: "GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F",
  paymentAmount: 1,
  paymentMemo: "TEOS Pioneer Wallet Activation",
}
\`\`\`

The payment flow:
1. User clicks "Pay 1 Pi"
2. App calls `piSDK.createPayment()`
3. Pi SDK shows payment modal
4. User approves payment
5. Your app wallet receives 1 Pi
6. User gets wallet access

---

## Founder Bypass

Your username (@aams1969) is configured for instant bypass:

\`\`\`typescript
// lib/founder-auth.ts
export class FounderAuth {
  private static readonly FOUNDER_USERNAME = "aams1969"
  
  static shouldBypassPayment(username: string): boolean {
    return username.toLowerCase() === this.FOUNDER_USERNAME.toLowerCase()
  }
}
\`\`\`

You don't need to pay - just authenticate and you get instant access.

---

## Troubleshooting

### Error: "App wallet not set up"
**Solution**: Complete Steps 1-4 above in Pi Developer Portal

### Error: "Payment failed"
**Possible causes**:
- App not approved by Pi Network yet
- Payment settings not enabled
- User has insufficient Pi balance

### Error: "Pi SDK not loaded"
**Solution**: Make sure you're opening the app in **Pi Browser** (not Chrome/Safari)

---

## Important Notes

1. **Pi Browser Required**: Users must open your app in Pi Browser for payments to work
2. **Mainnet vs Sandbox**: Your app is set to `sandbox: false` (mainnet mode)
3. **One-time Payment**: Users only pay once - verification is permanent
4. **Founder Access**: @aams1969 never needs to pay

---

## Quick Checklist

- [ ] Log into https://develop.pi in Pi Browser
- [ ] Find your TEOS Wallet app
- [ ] Set up app wallet with your Pi address
- [ ] Enable payments (1 Pi minimum)
- [ ] Save configuration
- [ ] Test payment flow
- [ ] Verify users can pay successfully

---

## After Setup

Once your app wallet is configured:
- Regular users pay 1 Pi → get Solana wallet + full access
- @aams1969 → instant bypass, no payment needed
- All payments go to your configured Pi wallet address
- Users receive permanent verification status

---

## Need Help?

If you continue having issues after setup:
1. Check Pi Developer Portal documentation
2. Contact Pi Network support
3. Verify your app is approved for payments
4. Test in Pi Browser (not regular browser)
