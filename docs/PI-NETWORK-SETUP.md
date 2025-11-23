# Pi Network Integration Setup Guide

## Overview
TeosWallet integrates with Pi Network to enable 1 Pi payment for wallet activation. This guide explains how to set up and test the integration.

## Your Pi Network Address
\`\`\`
GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F
\`\`\`

This is the Stellar address where all 1 Pi payments will be sent.

## Development Setup

### 1. Pi SDK Script
Add the Pi SDK script to your `app/layout.tsx`:

\`\`\`tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://sdk.minepi.com/pi-sdk.js"></script>
        {/* ... other head elements ... */}
      </head>
      <body>{children}</body>
    </html>
  )
}
\`\`\`

### 2. Test in Pi Browser
The real Pi SDK only works in:
- **Pi Browser** (mobile app)
- **Pi Developer Portal** (https://develop.pi)

#### To test in Pi Browser:
1. Open Pi app on your phone
2. Go to "Develop" section
3. Enter your app URL: `https://teos-wllet.vercel.app`
4. Or use localhost tunnel: `https://your-tunnel.ngrok.io`

### 3. Register App with Pi Network

Go to: https://develop.pi

1. **Create New App**
   - Name: TeosWallet
   - Description: Digital Pharaohs Gateway - TEOS Network Wallet
   - Category: Finance & Blockchain
   - Logo: Upload your Egyptian-themed logo

2. **App Configuration**
   - App Type: Web App
   - App URL: `https://wallet.teosegypt.com` or `https://teos-wllet.vercel.app`
   - Sandbox: Enable for testing
   - Payment Recipient Address: `GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F`

3. **Payment Settings**
   - Default Amount: 1 Pi
   - Payment Type: One-time activation
   - Description: "TEOS Pioneer Wallet Activation"

### 4. Testing Payment Flow

#### In Pi Browser:
\`\`\`javascript
// User clicks "Pay 1 Pi"
1. Pi.authenticate() → Gets user info
2. Pi.createPayment({ amount: 1, memo: "TEOS Pioneer Activation" })
3. User approves payment in Pi app
4. Payment sent to your address
5. Wallet unlocked ✓
\`\`\`

#### Test Mode (Sandbox):
- Payments don't use real Pi
- For development/testing only
- Enable in Pi Developer Portal

#### Production Mode:
- Uses real Pi tokens
- Requires Pi Network KYC
- Must be approved by Pi Core Team

## Verification Steps

### Check if Pi SDK is loaded:
Open browser console:
\`\`\`javascript
console.log(typeof window.Pi) // Should show "object"
\`\`\`

### Test Authentication:
\`\`\`javascript
window.Pi.authenticate(["username", "payments"], (payment) => {
  console.log("Incomplete payment:", payment)
}).then(auth => {
  console.log("Authenticated as:", auth.user.username)
})
\`\`\`

### Test Payment:
\`\`\`javascript
window.Pi.createPayment({
  amount: 1,
  memo: "Test payment",
  metadata: { test: true }
}).then(payment => {
  console.log("Payment created:", payment.identifier)
})
\`\`\`

## Troubleshooting

### "Pi SDK not available"
**Cause**: App not opened in Pi Browser
**Solution**: 
- Open app in Pi Browser mobile app
- Or test in Pi Developer Portal

### "User not authenticated"
**Cause**: Authentication not completed
**Solution**:
- Call `piSDK.authenticate()` before payment
- Handle authentication errors

### "Payment failed"
**Possible causes**:
1. User rejected payment
2. Insufficient Pi balance
3. Network issues
4. Invalid payment data

**Solutions**:
- Add error handling
- Show user-friendly error messages
- Allow retry

### App not showing in Pi Browser
**Solution**:
1. Register app in Pi Developer Portal
2. Wait for approval (can take 1-2 days)
3. Use development URL for testing

## Production Deployment

### Before Going Live:
1. ✅ Register app with Pi Network
2. ✅ Test payment flow in sandbox
3. ✅ Get Pi Core Team approval
4. ✅ Switch to production mode
5. ✅ Update Pi payment recipient address
6. ✅ Test with real Pi (small amount first)

### After Going Live:
1. Monitor payments at your Stellar address
2. Track payment identifiers
3. Verify wallet activations
4. Handle edge cases (failed payments, refunds)

## Support

- **Pi Developer Portal**: https://develop.pi
- **Pi Developer Docs**: https://developers.minepi.com
- **Pi Community**: https://www.reddit.com/r/PiNetwork

## Your Pi Network Configuration

**API Key**: `xmc5kk0qmb1xsitfnlldvokhaocpyrvv4buvmnwkqxmftunrb0ayov3k0u6jhbzg`
**Stellar Address**: `GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F`
**Username**: @aymanseif

## Environment Variables (Optional - Already Configured)

The API key is already embedded in the code, but for production best practices, you can add these to Vercel:

\`\`\`bash
PI_API_KEY=xmc5kk0qmb1xsitfnlldvokhaocpyrvv4buvmnwkqxmftunrb0ayov3k0u6jhbzg
PI_WALLET_ADDRESS=GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F
\`\`\`

## Testing Your Integration

1. **Open in Pi Browser**
   - Open Pi app on your phone
   - Go to "Develop" or "Apps" section
   - Enter: https://teos-wllet.vercel.app

2. **Test Payment Flow**
   - Click "Pay 1 Pi to Unlock Features"
   - Authenticate with Pi Network
   - Approve the 1 Pi payment
   - Payment will be sent to your Stellar address
   - Features unlock automatically

3. **Verify Payment**
   - Check your Pi wallet balance
   - 1 Pi will be received at: GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F
   - Transaction will appear in Pi Network blockchain explorer

## Status: Ready for Testing

✅ Pi SDK integrated
✅ API key configured
✅ Payment approval endpoint created
✅ Payment completion endpoint created
✅ Stellar wallet address set
✅ Ready to accept real Pi payments

**Next Step**: Open app in Pi Browser and test the payment flow!
