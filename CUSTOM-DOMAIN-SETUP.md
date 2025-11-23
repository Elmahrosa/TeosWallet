# Custom Domain Setup for wallet.teosegypt.com

## Current Status
- ✅ Domain added to Vercel: wallet.teosegypt.com
- ⚠️ DNS Configuration: **NOT CONFIGURED**
- ✅ Live URL working: https://teos-wllet.vercel.app

## Fix DNS in 3 Steps

### Step 1: Find Your DNS Provider
Where did you register **teosegypt.com**?
- Namecheap
- GoDaddy
- Cloudflare
- Google Domains
- Other registrar

### Step 2: Add CNAME Record

Login to your DNS provider and add this record:

| Type | Host/Name | Value/Target | TTL |
|------|-----------|--------------|-----|
| CNAME | wallet | cname.vercel-dns.com | Automatic |

#### Namecheap Instructions:
1. Login to Namecheap
2. Dashboard → Domain List → teosegypt.com → Manage
3. Advanced DNS tab
4. Add New Record:
   - Type: CNAME Record
   - Host: **wallet**
   - Target: **cname.vercel-dns.com**
   - TTL: Automatic

#### Cloudflare Instructions:
1. Login to Cloudflare
2. Select teosegypt.com
3. DNS → Records → Add record
4. Add CNAME:
   - Type: CNAME
   - Name: **wallet**
   - Target: **cname.vercel-dns.com**
   - Proxy status: **DNS only** (gray cloud icon)
   - TTL: Auto

#### GoDaddy Instructions:
1. Login to GoDaddy
2. My Products → Domain → teosegypt.com → DNS
3. Add record:
   - Type: CNAME
   - Name: **wallet**
   - Value: **cname.vercel-dns.com**
   - TTL: 1 Hour

### Step 3: Wait for Propagation
- DNS changes take **5-30 minutes** to propagate
- Check status: `dig wallet.teosegypt.com`
- Should show: `wallet.teosegypt.com. 300 IN CNAME cname.vercel-dns.com.`

### Step 4: Verify in Vercel
1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Open project: **teos-wllet**
3. Settings → Domains
4. Find **wallet.teosegypt.com**
5. Click refresh button
6. Status should change to: ✅ **Valid Configuration**

## Test Your Domain

After DNS propagation:
\`\`\`bash
# Check DNS
dig wallet.teosegypt.com

# Test HTTPS
curl -I https://wallet.teosegypt.com

# Should return 200 OK
\`\`\`

## Troubleshooting

### "Invalid Configuration" persists
- Wait longer (up to 48 hours max)
- Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
- Try incognito/private browsing

### SSL Certificate Pending
- Normal during first 10-15 minutes
- Vercel auto-provisions Let's Encrypt certificate
- Wait for green padlock in browser

### Domain shows old content
- Clear browser cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Need Help?

Contact your DNS provider support or:
- Vercel Support: https://vercel.com/help
- Email: dev@elmahrosa-expo.com
- Telegram: @elmahrosapi

---

**Once DNS is configured, wallet.teosegypt.com will automatically work!** 🚀
