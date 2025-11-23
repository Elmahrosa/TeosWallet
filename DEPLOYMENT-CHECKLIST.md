# Deployment Checklist

Complete this checklist before pushing to GitHub and deploying to production.

---

## Pre-Deployment

### Repository Setup
- [ ] Rename repo from `TeosWllet` to `TeosWallet` on GitHub
- [ ] Update all internal references (package.json, README, docs)
- [ ] Verify `.gitignore` includes `.env.local`, `node_modules`, `.vercel`

### Environment Configuration  
- [ ] `.env.example` created with all variables
- [ ] `.env.production` configured (do NOT commit this file)
- [ ] Token mint addresses verified on Solscan
- [ ] Pi API key obtained from https://develop.pi
- [ ] RPC endpoints tested and responding

### Code Quality
- [ ] Run `npm run lint` - no errors
- [ ] Run `npx tsc --noEmit` - type check passes
- [ ] Run `npm run build` - builds successfully
- [ ] Remove all `console.log("[v0] ...")` debug statements
- [ ] No hardcoded secrets or API keys in code

### Documentation
- [ ] README.md updated with correct repo name and URLs
- [ ] TOKEN-SETUP.md completed
- [ ] DOMAIN-FIX.md completed  
- [ ] ORDER.md added to repo root
- [ ] CHANGELOG.md initialized with v1.0.0 entry

### Testing
- [ ] Test locally at http://localhost:3000
- [ ] Pi payment flow works
- [ ] Token balances display correctly
- [ ] Founder dashboard login works (@aams1969 / teos2025founder)
- [ ] Mobile responsive on iPhone/Android
- [ ] Arabic/English language toggle works

---

## GitHub Push

\`\`\`bash
# Stage all changes
git add .

# Commit with semantic message
git commit -m "v1.0.0: Production ready - repo rename, docs added, config refactor"

# Push to main branch
git push origin main

# Create release tag
git tag v1.0.0
git push origin v1.0.0
\`\`\`

---

## Vercel Deployment

### Connect Repository
- [ ] Login to Vercel: https://vercel.com
- [ ] Import project: Select `Elmahrosa/TeosWallet`
- [ ] Framework: Next.js (auto-detected)
- [ ] Root directory: `./`

### Environment Variables
Add these in Vercel dashboard (Settings → Environment Variables):

**Required:**
- [ ] `NEXT_PUBLIC_PI_API_KEY`
- [ ] `PI_API_KEY`
- [ ] `NEXT_PUBLIC_CANONICAL_URL` = `https://wallet.teosegypt.com`
- [ ] `NEXT_PUBLIC_SOLANA_RPC_URL`
- [ ] `NEXT_PUBLIC_TEOS_MINT`
- [ ] `NEXT_PUBLIC_TUT_MINT`
- [ ] `NEXT_PUBLIC_ERT_MINT`

**Optional:**
- [ ] `ETHEREUM_RPC`
- [ ] `BITCOIN_RPC`
- [ ] `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`

### Deploy
- [ ] Click "Deploy" button
- [ ] Wait for build to complete (~2 minutes)
- [ ] Verify preview URL works
- [ ] Promote to production

---

## Domain Configuration

### DNS Setup
- [ ] Add CNAME record: `wallet` → `cname.vercel-dns.com`
- [ ] Wait for DNS propagation (2-30 minutes)
- [ ] Verify in Vercel: Domain status shows ✅
- [ ] SSL certificate issued automatically

### Update Links
- [ ] Update README.md with `wallet.teosegypt.com`
- [ ] Update social media bios
- [ ] Update Pi app registration at https://develop.pi
- [ ] Update petition links
- [ ] Update Telegram pinned message

---

## Post-Deployment Verification

### Functional Tests
- [ ] Visit https://wallet.teosegypt.com
- [ ] Pay 1 Pi → wallet unlocks
- [ ] Token balances display (if campaign wallet funded)
- [ ] Send token transaction completes
- [ ] Founder dashboard accessible at `/founder`
- [ ] All external links work (Telegram, petition, social media)

### Performance
- [ ] PageSpeed Insights score > 90: https://pagespeed.web.dev/
- [ ] Lighthouse audit passes
- [ ] Mobile performance acceptable
- [ ] No console errors in browser

### SEO
- [ ] `<link rel="canonical">` points to wallet.teosegypt.com
- [ ] Meta tags correct (title, description)
- [ ] OpenGraph tags for social sharing
- [ ] Sitemap generated (if applicable)

---

## Announcement

### Community Notification
- [ ] Post in Telegram: [@elmahrosapi](https://t.me/elmahrosapi)
- [ ] Tweet from [@KING_TEOS](https://twitter.com/KING_TEOS)
- [ ] Facebook post: [@Teosegypt](https://facebook.com/Teosegypt)
- [ ] Update petition with new wallet link
- [ ] Email pioneers (if list available)

### Release Notes Template
\`\`\`markdown
🚀 TEOS Wallet v1.0.0 is LIVE!

✅ Official domain: wallet.teosegypt.com
✅ Pi Network integration complete
✅ Real Solana blockchain balances
✅ NFT, Swap, Staking features ready
✅ Arabic/English bilingual support

👉 Pay 1 Pi to unlock your wallet today!
🏅 First 1,000 pioneers get 10,000 TEOS tokens

Join the Digital Pharaohs: https://wallet.teosegypt.com
\`\`\`

---

## Rollback Plan (If Issues Arise)

### Emergency Rollback
\`\`\`bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback in Vercel dashboard
# Deployments → Select previous version → Promote to Production
\`\`\`

### Common Issues
- **Build fails**: Check environment variables are set
- **Domain not working**: Verify DNS records with `nslookup`
- **Pi payments fail**: Confirm API key is correct
- **Balances show 0**: Check RPC endpoint and token mints

---

## Success Criteria

Production deployment is successful when:

✅ Domain `wallet.teosegypt.com` loads with SSL  
✅ Pi payment flow completes end-to-end  
✅ Token balances display correctly  
✅ No console errors or warnings  
✅ Mobile experience is smooth  
✅ Founder dashboard is secure and functional  
✅ Community notified and onboarding users  

---

**Last Updated**: January 22, 2025  
**Version**: 1.0.0  
**Maintainer**: Ayman Seif (@aams1969)
