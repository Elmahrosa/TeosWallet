# Fix wallet.teosegypt.com Domain Configuration

Your app is deployed at **teos-wllet.vercel.app** but the custom domain **wallet.teosegypt.com** is not valid. Here's how to fix it:

## Problem

Vercel shows "Invalid Configuration" for wallet.teosegypt.com because the DNS records are not pointing correctly to Vercel's servers.

## Solution: Configure DNS Records

### Step 1: Access Your DNS Provider

Go to where you manage **teosegypt.com** DNS:
- If using **Namecheap**: Go to Dashboard > Domain List > teosegypt.com > Manage > Advanced DNS
- If using **Cloudflare**: Go to cloudflare.com > teosegypt.com > DNS > Records

### Step 2: Add the Correct CNAME Record

Delete any existing wallet.teosegypt.com records, then add this:

| Type | Name | Target | TTL |
|------|------|--------|-----|
| CNAME | wallet | cname.vercel-dns.com | Automatic |

**Important Notes:**
- **Name** should be just `wallet` (not `wallet.teosegypt.com`)
- **Target** must be `cname.vercel-dns.com` (note the `.` at the end is added automatically)
- If your DNS provider doesn't support CNAME, use A records instead (see Alternative below)

### Step 3: Verify DNS Propagation

Wait 5-15 minutes, then check if DNS is working:

**Option A: Online Tool**
1. Go to https://dnschecker.org
2. Enter: `wallet.teosegypt.com`
3. Type: CNAME
4. Should show: `cname.vercel-dns.com`

**Option B: Command Line**
\`\`\`bash
# Mac/Linux
dig wallet.teosegypt.com

# Windows
nslookup wallet.teosegypt.com
\`\`\`

Look for `cname.vercel-dns.com` in the results.

### Step 4: Refresh Vercel Domain

1. Go to https://vercel.com/dashboard
2. Select your project: **teos-wllet**
3. Go to **Settings** > **Domains**
4. Find **wallet.teosegypt.com**
5. Click the **refresh icon** or **"Refresh"** button
6. Wait for status to change from "Invalid Configuration" to "Valid Configuration"

## Alternative: Use A Records (If CNAME Doesn't Work)

Some DNS providers have issues with CNAME records. Use these A records instead:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | wallet | 76.76.21.21 | Automatic |
| A | wallet | 76.76.19.19 | Automatic |

**Why two A records?**  
This provides redundancy. Vercel recommends both IPs for high availability.

## Cloudflare-Specific Instructions

If you're using Cloudflare for DNS:

1. Go to **DNS** > **Records**
2. Add CNAME record:
   - **Type**: CNAME
   - **Name**: wallet
   - **Target**: cname.vercel-dns.com
   - **Proxy status**: **DNS only (gray cloud)** ← IMPORTANT!
   - **TTL**: Auto
3. Click **Save**
4. The orange cloud (proxy) MUST be OFF for domain verification to work
5. After verification succeeds, you can optionally turn the proxy back on

## Verification Checklist

After DNS is configured, verify these work:

1. **Domain Loads**
   \`\`\`
   https://wallet.teosegypt.com
   \`\`\`
   Should show the TEOS Wallet with Egyptian theme

2. **HTTPS Works**
   - Vercel auto-generates SSL certificate
   - Wait 5-10 minutes after domain verification
   - Check for padlock icon in browser

3. **Pi Validation Key Accessible**
   \`\`\`
   https://wallet.teosegypt.com/validation-key.txt
   \`\`\`
   Should show: `843eab15441e880193b821432df6b975d514f2fe7ec1bfbfd51639c3918c871d411a90ff06ca2f06c58a4f497ab6801f3c5b1d93052099deebcd52ec91e00541`

4. **All Routes Work**
   - https://wallet.teosegypt.com/terms
   - https://wallet.teosegypt.com/privacy
   - https://wallet.teosegypt.com/qr-pack

## Common Issues & Fixes

### Issue 1: "Invalid Configuration" Still Shows

**Causes:**
- DNS not propagated yet (wait longer)
- Wrong target in CNAME (must be `cname.vercel-dns.com`)
- Cloudflare proxy is ON (must be OFF during verification)

**Fix:**
\`\`\`bash
# Check what DNS actually returns
dig wallet.teosegypt.com CNAME

# Should see: wallet.teosegypt.com. 300 IN CNAME cname.vercel-dns.com.
\`\`\`

If it shows your old IP or wrong target, update DNS records.

### Issue 2: "This site can't be reached"

**Cause:** DNS not pointing to Vercel yet

**Fix:**
1. Confirm CNAME record exists: `wallet` → `cname.vercel-dns.com`
2. Wait 1 hour for full DNS propagation
3. Clear browser cache: Ctrl+Shift+Delete

### Issue 3: SSL Certificate Not Working

**Cause:** Vercel hasn't generated SSL yet

**Fix:**
1. Wait 10-15 minutes after domain verification
2. Vercel automatically provisions Let's Encrypt certificate
3. Check Vercel dashboard for SSL status
4. If stuck, remove domain and re-add it

### Issue 4: Cloudflare "DNS_PROBE_FINISHED_NXDOMAIN"

**Cause:** Cloudflare proxy interfering with verification

**Fix:**
1. Click the orange cloud next to the wallet record
2. Turn it gray (DNS only)
3. Save and wait 5 minutes
4. Refresh Vercel domain status

## Quick Commands to Debug

\`\`\`bash
# Check DNS propagation globally
curl https://dns.google/resolve?name=wallet.teosegypt.com&type=CNAME

# Test HTTPS response
curl -I https://wallet.teosegypt.com

# Check SSL certificate
openssl s_client -connect wallet.teosegypt.com:443 -servername wallet.teosegypt.com

# Trace DNS resolution
nslookup wallet.teosegypt.com 8.8.8.8
\`\`\`

## Expected Final State

When everything works correctly:

1. **Vercel Domains Page**
   - wallet.teosegypt.com shows **green checkmark**
   - Status: "Valid Configuration"
   - SSL: "Active"

2. **Browser**
   - https://wallet.teosegypt.com loads TEOS Wallet
   - Padlock icon shows secure connection
   - Certificate issued by Let's Encrypt

3. **DNS Lookup**
   \`\`\`
   wallet.teosegypt.com → cname.vercel-dns.com → Vercel's IPs
   \`\`\`

## After Domain Works

Once wallet.teosegypt.com is live:

1. **Verify Pi Network Domain**
   - Go to https://develop.pi/
   - Add domain: `wallet.teosegypt.com`
   - Pi will verify: `https://wallet.teosegypt.com/validation-key.txt`

2. **Update Environment Variables**
   \`\`\`env
   NEXT_PUBLIC_APP_URL=https://wallet.teosegypt.com
   \`\`\`

3. **Test Pi Payment Flow**
   - Open wallet.teosegypt.com
   - Click "Become Pioneer - Pay 1 Pi"
   - Complete payment in Pi Browser
   - Verify profile modal appears

4. **Announce Launch**
   - Tweet from @KING_TEOS
   - Post in Telegram @elmahrosapi
   - Update README.md with live link

## Need Help?

If the domain still doesn't work after following these steps:

1. **Check Vercel Logs**
   - Dashboard > teos-wllet > Deployments > Latest
   - Look for domain-related errors

2. **Contact Vercel Support**
   - https://vercel.com/help
   - Provide: Project name, domain, DNS records screenshot

3. **Verify DNS Provider Settings**
   - Some providers require special configuration
   - Check if your provider is listed: https://vercel.com/docs/concepts/projects/domains#dns-configuration

---

**Once fixed, wallet.teosegypt.com will be the official TEOS Wallet domain!** 

From Egypt to the World, Powering the Digital Pharaohs! 🔱
\`\`\`

```typescript file="" isHidden
