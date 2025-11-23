# Pharaonic Futurism Design System

## Visual Identity

TeosWallet uses **Pharaonic Futurism** - a premium fusion of ancient Egyptian aesthetics and modern digital finance.

---

## Design Principles

1. **Royal Luxury** - Egyptian gold (#D4AF37) as primary brand color
2. **Ancient Mystery** - Deep Nile blues and blacks for backgrounds
3. **Sacred Geometry** - Pyramids, hieroglyphs, and symmetrical layouts
4. **Modern Premium** - Glassmorphism, subtle animations, clean typography
5. **Cultural Pride** - Egyptian symbols represent security, life, and prosperity

---

## Color Palette

### Primary Colors
\`\`\`css
--primary: oklch(0.75 0.18 85);        /* Egyptian Gold */
--secondary: oklch(0.45 0.15 265);     /* Deep Nile Blue */
--background: oklch(0.1 0.02 265);     /* Very Dark Blue */
--card: oklch(0.15 0.02 265);          /* Slightly Lighter Blue */
\`\`\`

### Accent Colors
\`\`\`css
--success: oklch(0.65 0.15 145);       /* Emerald Teal */
--warning: oklch(0.7 0.15 65);         /* Amber Gold */
--chart-1: oklch(0.75 0.18 85);        /* Gold */
--chart-2: oklch(0.6 0.15 265);        /* Deep Blue */
--chart-3: oklch(0.55 0.15 295);       /* Purple */
\`\`\`

---

## Typography

**Headings:** Geist Sans (Modern, Clean)
**Body:** Geist Sans
**Monospace:** Geist Mono (Wallet addresses, transaction IDs)
**Arabic:** Noto Naskh Arabic (RTL support)

---

## Egyptian Icons

### HorusEye
**Meaning:** Protection, security, royal power
**Usage:** Security badges, verification status, locked features
\`\`\`tsx
import { HorusEye } from "@/components/egyptian-icons"
<HorusEye className="w-6 h-6 text-primary" />
\`\`\`

### AnkhIcon
**Meaning:** Life, eternal existence, prosperity
**Usage:** Profile icons, life/health indicators, protection
\`\`\`tsx
import { AnkhIcon } from "@/components/egyptian-icons"
<AnkhIcon className="w-6 h-6 text-success" />
\`\`\`

### PyramidIcon
**Meaning:** Stability, hierarchy, achievement
**Usage:** Background patterns, loading states, level indicators
\`\`\`tsx
import { PyramidIcon } from "@/components/egyptian-icons"
<PyramidIcon className="w-6 h-6 text-primary" />
\`\`\`

### SunDiskIcon
**Meaning:** Power of Ra, verified authority, radiance
**Usage:** Verified badges, founder indicators, premium features
\`\`\`tsx
import { SunDiskIcon } from "@/components/egyptian-icons"
<SunDiskIcon className="w-6 h-6 text-warning" />
\`\`\`

### FalconIcon
**Meaning:** Horus, divine kingship, speed
**Usage:** Fast transactions, premium users, royal features
\`\`\`tsx
import { FalconIcon } from "@/components/egyptian-icons"
<FalconIcon className="w-6 h-6 text-chart-3" />
\`\`\`

### ScarabIcon
**Meaning:** Transformation, rebirth, creation
**Usage:** Token swaps, conversions, new wallet creation
\`\`\`tsx
import { ScarabIcon } from "@/components/egyptian-icons"
<ScarabIcon className="w-6 h-6 text-success" />
\`\`\`

### PapyrusScroll
**Meaning:** Ancient wisdom, records, documentation
**Usage:** Transaction history, documentation, terms & privacy
\`\`\`tsx
import { PapyrusScroll } from "@/components/egyptian-icons"
<PapyrusScroll className="w-6 h-6 text-warning" />
\`\`\`

---

## Glass Cards (Glassmorphism)

### PharaohCard Component
Premium card with golden border and backdrop blur.

\`\`\`tsx
import { PharaohCard } from "@/components/pharaoh-card"

<PharaohCard glowColor="gold" animated>
  <h3 className="text-primary">TEOS Balance</h3>
  <p className="text-2xl font-bold">10,000 TEOS</p>
</PharaohCard>
\`\`\`

**Props:**
- `glowColor`: "gold" | "nile" | "teal"
- `animated`: boolean (enables gold glow animation)

---

## Animations

### Gold Glow
\`\`\`tsx
<div className="animate-glow-gold">
  Glowing element
</div>
\`\`\`

### Shimmer Effect
\`\`\`tsx
<div className="animate-shimmer">
  Shimmering gold accent
</div>
\`\`\`

### Wave Animation
\`\`\`tsx
<div className="animate-wave">
  Floating element
</div>
\`\`\`

### Pyramid Pulse
\`\`\`tsx
<div className="animate-pulse-pyramid">
  Pulsing pyramid
</div>
\`\`\`

---

## Gradients

### Gold Premium
\`\`\`tsx
<div className="gradient-gold-premium">
  Premium golden background
</div>
\`\`\`

### Nile Blue
\`\`\`tsx
<div className="gradient-nile">
  Deep blue gradient
</div>
\`\`\`

### Emerald Teal
\`\`\`tsx
<div className="gradient-teal">
  Teal accent gradient
</div>
\`\`\`

### Pyramid Background
\`\`\`tsx
<div className="bg-pyramid">
  Subtle pyramid pattern overlay
</div>
\`\`\`

---

## Text Styles

### Gold Gradient Text
\`\`\`tsx
<h1 className="text-gradient-gold text-4xl font-bold">
  TEOS Wallet
</h1>
\`\`\`

### Horus Glow
\`\`\`tsx
<div className="horus-glow">
  Text with golden drop shadow
</div>
\`\`\`

---

## Usage Examples

### Token Card with Egyptian Theme
\`\`\`tsx
<Card className="border-primary/30 bg-card/80 backdrop-blur hover:border-primary/50 transition-all hover:scale-[1.02]">
  <CardHeader>
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full gradient-gold-premium flex items-center justify-center">
        <HorusEye className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <CardTitle className="text-primary">TEOS</CardTitle>
        <p className="text-xs text-muted-foreground">Civic Token</p>
      </div>
    </div>
  </CardHeader>
</Card>
\`\`\`

### Verification Badge
\`\`\`tsx
<Badge className="gap-1.5 bg-primary/20 text-primary border-primary/30">
  <SunDiskIcon className="h-3 w-3" />
  Verified Pioneer
</Badge>
\`\`\`

### Premium Button
\`\`\`tsx
<Button className="gradient-gold-premium text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/30">
  <AnkhIcon className="mr-2 h-4 w-4" />
  Unlock Wallet
</Button>
\`\`\`

---

## Screen Design Guidelines

### Landing Page
- Full-screen gradient background (bg-pyramid)
- Large golden TEOS emblem with glow
- Arabic subtitle
- Floating pyramid hologram
- Gold CTA buttons

### Dashboard
- Glassmorphism top card (wallet balance)
- Pyramid silhouette background
- Eye of Horus security indicator
- Token cards with colored glows
- Transaction list on papyrus-style cards

### Send/Receive
- QR code with golden pharaonic border
- Address field on papyrus card
- Low-opacity hieroglyphs in background
- Gold action buttons

### Settings
- Gold thin-line icons
- Faint geometrical hieroglyphs
- RTL/Arabic toggle
- Categories with Egyptian dividers

---

## Accessibility

- All Egyptian icons have semantic meaning
- Text contrast meets WCAG AA standards
- Glow effects are subtle (not distracting)
- RTL support for Arabic readers
- Screen reader compatible

---

## Future Enhancements

- Animated hieroglyphic loading states
- 3D pyramid navigation
- Pharaoh crown for top pioneers
- Scarab transformation animations for swaps
- Papyrus unroll effect for transaction history
