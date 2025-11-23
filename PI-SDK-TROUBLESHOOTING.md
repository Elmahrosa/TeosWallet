# Pi SDK Initialization Troubleshooting

## Common Issues & Solutions

### Error: "Pi Network SDK was not initialized"

**Cause**: The Pi SDK script hasn't loaded yet when the payment button is clicked.

**Solutions**:

1. **Wait for the button to enable**: The "Pay 1 Pi" button should show "Loading Pi SDK..." until ready
2. **Refresh the page**: Sometimes the SDK script needs a page refresh to load properly
3. **Verify Pi Browser**: This app MUST be opened in Pi Browser, not a regular web browser

### How Pi SDK Loading Works

1. **Script Load** (1-3 seconds): The SDK script loads from `https://sdk.minepi.com/pi-sdk.js`
2. **Initialization** (2-10 seconds): The app polls for the SDK to become available
3. **Ready State**: Once initialized, the payment button becomes clickable

### Testing Payment Flow

**In Pi Browser**:
1. Open the app: `https://teos-wllet.vercel.app/`
2. Wait for "Pay 1 Pi & Unlock Wallet" button to be enabled (no longer gray)
3. Click the button
4. Authenticate with Pi Network
5. Approve the 1 Pi payment
6. Your TEOS wallet will be activated

**Environment Variables Required**:
- `PI_API_KEY`: Your Pi Network API key (set in Vercel)

### Developer Mode

To test without Pi Browser during development:
1. The app will show an error message
2. This is expected - payments only work in Pi Browser
3. Use the founder dashboard to bypass payment for testing

### Deployment Checklist

- [ ] Pi SDK script added to layout.tsx: `<script src="https://sdk.minepi.com/pi-sdk.js" async></script>`
- [ ] `PI_API_KEY` environment variable set in Vercel
- [ ] App registered at https://develop.pi
- [ ] Payment receiver address configured: `GDIW2DXDR3DU4CYTRHDS3WYDGHMUQZG7E5FJWWW6XSADOC5VHMYRYD6F`
- [ ] API routes deployed: `/api/pi/approve` and `/api/pi/complete`

### If Still Not Working

1. Check browser console for detailed error messages
2. Verify you're using Pi Browser (not Chrome/Safari)
3. Ensure your Pi Network account has sufficient Pi balance
4. Check that your app is approved on Pi Network Developer Portal
5. Verify Vercel environment variables are set correctly
