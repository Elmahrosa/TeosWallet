# TEOS Wallet Screenshot Guide

This guide helps contributors capture high-quality screenshots for documentation.

## Required Screenshots

### 1. Dashboard View (`dashboard.png`)
**Capture**: Main wallet page showing token balances
**Requirements**:
- Show TEOS, TUT, ERT token cards with balances
- Include wallet address visible
- Civic verification card displayed
- Resolution: 1920x1080 minimum

### 2. Pioneer Verification Modal (`verification.png`)
**Capture**: "Become a TEOS Pioneer" modal
**Requirements**:
- Show "Pay 1 Pi & Unlock Wallet" button
- List of benefits visible
- Egyptian-themed gold gradient styling
- Resolution: 800x600 minimum

### 3. Civic Verification Card (`civic-card.png`)
**Capture**: 4-requirement verification checklist
**Requirements**:
- Petition, Telegram, Facebook, Twitter checkboxes
- Badge display for completed items
- "Complete Civic Verification" call-to-action
- Resolution: 600x400 minimum

### 4. Token Swap Interface (`swap.png`)
**Capture**: Swap modal with token selection
**Requirements**:
- From/To token dropdowns visible
- Amount input fields
- "Powered by Nilex DEX" branding
- Resolution: 600x700 minimum

### 5. Mining Dashboard (`mining.png`)
**Capture**: Mining tab with stats and rewards
**Requirements**:
- Mining rate displayed (e.g., "2.5 TEOS/hour")
- Total mined amount
- "Claim Rewards" button
- Resolution: 800x500 minimum

### 6. Ecosystem Hub (`ecosystem.png`)
**Capture**: Ecosystem tab with integration cards
**Requirements**:
- Nilex DEX, FPBE, Healthcare, Smart City cards
- Hieroglyphic icons visible
- "Featured" badge on Nilex DEX
- Resolution: 1200x800 minimum

## Screenshot Tools

### Desktop
- **Windows**: Windows Snipping Tool, ShareX
- **macOS**: Command + Shift + 4
- **Linux**: Flameshot, Spectacle

### Browser Extensions
- **Chrome/Edge**: Full Page Screen Capture
- **Firefox**: Firefox Screenshots (built-in)

## Optimization

After capturing, optimize images:
\`\`\`bash
# Using ImageMagick
convert dashboard.png -resize 1920x1080 -quality 85 dashboard.png

# Using pngquant
pngquant --quality=65-85 dashboard.png
\`\`\`

## File Naming Convention

- Use lowercase with hyphens: `civic-card.png`
- Include variant for mobile: `dashboard-mobile.png`
- Use descriptive names: `swap-interface.png`, not `screenshot1.png`

## Adding to README

Once captured, place images in `docs/screenshots/` and they will automatically display in README.md.

## GIF Recordings (Optional)

For interactive flows (e.g., completing civic verification):

### Tools
- **LICEcap** (Windows/macOS): Free, lightweight
- **Kap** (macOS): Modern, feature-rich
- **Peek** (Linux): Simple and elegant

### Guidelines
- Max 10 seconds per GIF
- 720p resolution (1280x720)
- 15 FPS to keep file size small
- Show cursor movements
- Focus on one feature per GIF

### Example GIFs Needed
1. `onboarding-flow.gif` - From landing to wallet unlock
2. `civic-verification.gif` - Completing all 4 requirements
3. `token-swap.gif` - Swapping TEOS for TUT

## Placeholders

Until real screenshots are added, the README uses placeholder images with query parameters that describe what should be shown.

## Community Contributions

Want to contribute screenshots? 
1. Take screenshots following this guide
2. Place them in `docs/screenshots/`
3. Submit a PR to the GitHub repo
4. Earn 250 TEOS for approved screenshot sets!

---

**Questions?** Contact dev@elmahrosa-expo.com
