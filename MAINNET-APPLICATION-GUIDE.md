# TEOS Wallet - Mainnet Application Guide

## Your Application Details

### Form Inputs (Copy these exactly)

**App Name:** TeosWallet

**Network:** Mainnet

**Wallet to use:** 69231cd8bf014cdd0b20dcdc

**Reason for applying (180 characters max):**
\`\`\`
Enable verified TEOS Pioneers to securely transact, stake, and contribute to Egypt's digital economy on Solana and Pi Network with real-time balance tracking.
\`\`\`

**Brief explanation:**
This application enables TeosWallet to launch on Pi Network Mainnet, allowing verified users to access their Solana-based TEOS, TUT, and ERT tokens through a civic-first wallet. The app supports secure transactions, staking mechanisms, ecosystem integrations (Nilex DEX, FPBE Banking, Healthcare, Smart City), and treasury contributions. Users pay 1 Pi for lifetime verification, unlocking full wallet functionality and contributing to Egypt's blockchain infrastructure.

**Privacy Policy URL:** https://teoswallet9618.pinet.com/privacy

**Terms of Service URL:** https://teoswallet9618.pinet.com/terms

---

## Before Submitting - Testnet Requirement

Pi Network requires your paired Testnet app to have completed App-to-User transactions to **10 unique wallets** before Mainnet approval.

### How to Complete Testnet Requirement:

1. Switch your app to **Testnet** in Pi Developer Portal
2. Deploy a Testnet version of your app
3. Have 10 different Pi users:
   - Open your app in Pi Browser
   - Complete the 1 Pi payment (using Testnet Pi)
   - Verify transactions are recorded
4. Once 10 unique wallets have received payments, return to Mainnet application

### Check Your Progress:
- Go to Pi Developer Portal → Your App → Analytics
- View "App-to-User Transactions"
- Confirm 10 unique wallet addresses have received payments

---

## After Approval

Once your Mainnet App Wallet is approved:

1. **Update Environment Variables** (if needed):
   - No changes required - wallet ID remains the same
   - Verify `PI_API_KEY` is set for production

2. **Test Mainnet Payments**:
   - Open app in Pi Browser (Mainnet mode)
   - Complete 1 Pi payment as a test user
   - Verify wallet address generation works
   - Check balance tracking on Solana mainnet

3. **Monitor Transactions**:
   - Use Pi Developer Portal to track payments
   - Monitor Solana blockchain for token transfers
   - Review audit logs for verification status

---

## Troubleshooting

**"Has not set up app wallet" error:**
- Wait for Pi Network approval (usually 1-3 business days)
- Check Developer Portal for application status
- Ensure Testnet requirement is completed

**Payment fails after approval:**
- Verify your Pi API key is correct
- Check app wallet address is active
- Test in Testnet first before going live

**Balance not showing:**
- Wait 10-15 seconds for blockchain sync
- Check Solana RPC connection status
- Verify wallet address is correctly generated

---

## Post-Launch Checklist

- [ ] Testnet: 10 unique wallet transactions completed
- [ ] Mainnet application submitted and approved
- [ ] Privacy Policy accessible at /privacy
- [ ] Terms of Service accessible at /terms
- [ ] First Mainnet payment tested successfully
- [ ] Solana balance tracking verified
- [ ] Founder bypass (@aams1969) working
- [ ] AI chat configured (optional)
- [ ] Ecosystem integrations tested
- [ ] Announcement posted to community

---

## Important Notes

1. **1 Pi Deduction**: When your wallet is created, 1 Pi is deducted from your next mainnet migration to fund the wallet's minimum balance. This is NOT a fee to Pi Core Team.

2. **Wallet Funding**: Your app wallet (69231cd8bf014cdd0b20dcdc) needs sufficient Pi balance to process user payments.

3. **User Experience**: After approval, users pay 1 Pi once to become Verified TEOS Pioneers with lifetime access.

4. **Blockchain Data**: All transactions are recorded on both Pi Network and Solana blockchains for transparency.

---

## Support

- **Pi Network Support**: Use Pi Developer Portal support ticket system
- **TEOS Wallet Issues**: Check GitHub issues or contact through teosegypt.com
- **Technical Questions**: Review Pi SDK documentation

---

**Ready to launch Egypt's gateway to the digital economy!**
