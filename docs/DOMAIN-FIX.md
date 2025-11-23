# Domain Setup Guide

Fix the "Invalid Configuration" error for **wallet.teosegypt.com** and get your custom domain working.

---

## Problem

Your custom domain `wallet.teosegypt.com` is added to Vercel but showing:

\`\`\`
❌ Invalid Configuration
DNS records not pointing to Vercel
\`\`\`

**Current working URL**: https://teos-wllet.vercel.app  
**Target URL**: https://wallet.teosegypt.com

---

## Solution: Configure DNS Records

### Step 1: Find Your DNS Provider

Where did you purchase `teosegypt.com`?

Common providers:
- **Namecheap**: https://www.namecheap.com
- **GoDaddy**: https://www.godaddy.com
- **Cloudflare**: https://dash.cloudflare.com
- **Google Domains**: https://domains.google

Log into your DNS provider's dashboard.

---

### Step 2: Add CNAME Record

#### For Subdomain (wallet.teosegypt.com)

Add this CNAME record:

| Type  | Name/Host | Value/Target         | TTL  |
|-------|-----------|----------------------|------|
| CNAME | wallet    | cname.vercel-dns.com | Auto |

**Namecheap Example:**
1. Go to: Domain List → `teosegypt.com` → Manage → Advanced DNS
2. Click "Add New Record"
3. Type: `CNAME Record`
4. Host: `wallet`
5. Value: `cname.vercel-dns.com`
6. TTL: Automatic
7. Save

**Cloudflare Example:**
1. Go to: DNS → Records
2. Click "Add record"
3. Type: `CNAME`
4. Name: `wallet`
5. Target: `cname.vercel-dns.com`
6. Proxy status: DNS only (gray cloud)
7. Save

---

### Step 3: Verify Domain in Vercel

1. Go to: https://vercel.com/your-project/settings/domains
2. Find `wallet.teosegypt.com` in the list
3. Click "Refresh" button
4. Wait 2-5 minutes for DNS propagation
5. Status should change from ❌ to ✅

---

### Step 4: Update Canonical URL

Once DNS is verified, update your code:

#### app/layout.tsx
\`\`\`typescript
export const metadata: Metadata = {
  title: "TEOS Wallet - Digital Pharaohs Gateway",
  description: "Become a Verified TEOS Pioneer - Official TEOS Network Wallet",
  metadataBase: new URL("https://wallet.teosegypt.com"),
}
\`\`\`

#### .env.production
\`\`\`env
NEXT_PUBLIC_CANONICAL_URL=https://wallet.teosegypt.com
\`\`\`

Redeploy:
\`\`\`bash
vercel --prod
\`\`\`

---

## DNS Propagation Time

| Provider   | Typical Time |
|------------|--------------|
| Cloudflare | 2-5 minutes  |
| Namecheap  | 30 minutes   |
| GoDaddy    | 1 hour       |
| Others     | 24-48 hours  |

Check propagation status: https://www.whatsmydns.net/#CNAME/wallet.teosegypt.com

---

## Troubleshooting

### "CNAME already exists" Error

**Cause:** Subdomain already has a record.

**Solution:**
1. Delete existing `wallet` record (A or CNAME)
2. Add new CNAME pointing to `cname.vercel-dns.com`

### Domain Still Not Working After 24 Hours

**Possible causes:**
1. CNAME value incorrect (should be `cname.vercel-dns.com`)
2. Cloudflare proxy enabled (turn off "orange cloud")
3. Old DNS cached by ISP

**Solution:**
\`\`\`bash
# Clear DNS cache (Windows)
ipconfig /flushdns

# Clear DNS cache (Mac)
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Check DNS directly
nslookup wallet.teosegypt.com 8.8.8.8
\`\`\`

### SSL Certificate Not Issued

**Cause:** Vercel waiting for DNS propagation.

**Solution:**
- Wait 15-30 minutes after DNS verification
- Vercel auto-issues Let's Encrypt SSL
- Check certificate status in Vercel dashboard

---

## Alternative: Use Apex Domain (Optional)

If you want `teosegypt.com` (without `wallet.` subdomain):

### Add A Records

| Type | Name | Value           | TTL  |
|------|------|-----------------|------|
| A    | @    | 76.76.21.21     | Auto |
| A    | @    | 76.223.126.88   | Auto |

**Note:** Apex domains require A records instead of CNAME.

---

## Production Checklist

After DNS is configured:

- [ ] `wallet.teosegypt.com` resolves correctly
- [ ] SSL certificate issued (https:// works)
- [ ] All links in app point to `wallet.teosegypt.com`
- [ ] Social media links updated to new domain
- [ ] README.md updated with new domain
- [ ] Google Analytics / tracking updated (if applicable)

---

## Support

Need help with DNS setup?
- **Telegram**: [@elmahrosapi](https://t.me/elmahrosapi)
- **Email**: ayman@elmahrousa.com
- **Vercel Docs**: https://vercel.com/docs/concepts/projects/domains
