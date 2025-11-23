# TEOS Wallet Design System

## Pharaonic Futurism Design Language

The TEOS Wallet embodies "Pharaonic Futurism" - a unique design language that bridges ancient Egyptian majesty with cutting-edge blockchain technology.

---

## Color Palette

### Primary Colors

**Royal Gold** - King Teos Signature
- `--primary: oklch(0.78 0.2 75)` - Brilliant golden hue
- Usage: Primary actions, highlights, brand identity
- Represents: Wealth, power, Egyptian royalty

**Deep Nile Blue**
- `--secondary: oklch(0.42 0.18 265)` - Mystical blue-purple
- Usage: Secondary actions, accents
- Represents: Nile River, ancient wisdom

**Emerald Teal**
- `--accent: oklch(0.65 0.16 180)` - Precious gem tone
- Usage: Success states, special features
- Represents: Egyptian emeralds, prosperity

### Neutrals

- `--background: oklch(0.08 0.03 265)` - Deep mystical night
- `--card: oklch(0.12 0.03 270)` - Glass cards with depth
- `--foreground: oklch(0.98 0 0)` - Pure white text

### Semantic Colors

- `--success: oklch(0.68 0.17 145)` - Growth, completion
- `--warning: oklch(0.72 0.17 65)` - Caution, attention
- `--destructive: oklch(0.577 0.245 27.325)` - Errors, danger

---

## Typography

### Font Stack

\`\`\`css
--font-sans: 'Geist', 'Geist Fallback'
--font-mono: 'Geist Mono', 'Geist Mono Fallback'
\`\`\`

### Scale

- **Display**: 3xl-5xl - Hero sections, major headings
- **Heading**: xl-2xl - Section titles
- **Body**: sm-base - Primary content
- **Caption**: xs - Metadata, labels

### Guidelines

- Use `text-balance` for headings
- Line height: 1.5-1.6 for readability
- Maximum 2 font families per project

---

## Layout System

### Grid & Spacing

- Container: max-width 6xl (1280px)
- Gutters: px-4 (mobile), px-6 (tablet), px-8 (desktop)
- Gap scale: 2, 4, 6, 8, 12 (0.5rem increments)

### Responsive Breakpoints

\`\`\`css
sm: 640px   /* Mobile landscape, tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
\`\`\`

### Layout Priority

1. **Flexbox** - Most layouts, navigation, cards
2. **Grid** - Complex 2D layouts, galleries
3. **Absolute** - Decorative elements only

---

## Components

### Cards

**Glass Card**
\`\`\`css
.glass-card {
  backdrop-filter: blur(20px) saturate(180%);
  background: oklch(0.15 0.02 265 / 0.7);
  border: 1px solid oklch(0.75 0.18 85 / 0.3);
}
\`\`\`

**King Teos Card**
\`\`\`css
.king-teos-card {
  background: linear-gradient(135deg, ...);
  backdrop-filter: blur(24px);
  border: 2px solid oklch(0.78 0.2 75 / 0.4);
}
\`\`\`

### Buttons

**Royal Button**
\`\`\`css
.btn-royal {
  background: linear-gradient(135deg, ...gold gradient...);
  box-shadow: 0 4px 16px oklch(0.78 0.2 75 / 0.4);
  border: 1px solid oklch(0.85 0.2 75);
}

.btn-royal:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px oklch(0.78 0.2 75 / 0.5);
}
\`\`\`

---

## Animations

### Core Animations

**Crown Glow** - Signature royal effect
\`\`\`css
.animate-crown-glow {
  animation: crown-glow 3s ease-in-out infinite alternate;
}
\`\`\`

**Gold Shimmer** - Premium feel
\`\`\`css
.animate-shimmer {
  background: linear-gradient(90deg, transparent, gold, transparent);
  animation: shimmer 3s infinite;
}
\`\`\`

**Nile Flow** - Water-like movement
\`\`\`css
.nile-flow {
  animation: flow 6s linear infinite;
}
\`\`\`

**Pyramid Pulse** - Sacred geometry
\`\`\`css
.animate-pulse-pyramid {
  animation: pulse-pyramid 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
\`\`\`

### Usage Guidelines

- Use animations sparingly for premium feel
- Duration: 2-4s for ambient, <0.3s for interactive
- Always provide reduced-motion alternatives

---

## Iconography

### Egyptian Hieroglyphs

- 𓀠 (King) - Primary brand icon
- 𓋹 (Crown) - Premium features
- 𓏏 (TUT token)
- 𓊹 (Sacred)

### Modern Icons

- Lucide React library for UI elements
- Size: 16px, 20px, 24px standard
- Consistent stroke width: 2px

---

## Accessibility

### Color Contrast

- Text on background: 7:1 minimum
- Interactive elements: 4.5:1 minimum
- Gold text always on dark backgrounds

### Keyboard Navigation

- All interactive elements focusable
- Focus rings: `outline-ring/50` with gold glow
- Skip links for main content

### Screen Readers

- Semantic HTML (main, header, nav, article)
- ARIA labels on icon buttons
- Status announcements for async actions

---

## Mobile Responsiveness

### Approach

- Mobile-first development
- Touch targets: minimum 44x44px
- Responsive text scaling
- Collapsible navigation

### Optimizations

- Lazy load background images
- Progressive image loading
- Reduced motion on mobile
- Simplified animations

---

## Design Tokens

All values centralized in `app/globals.css`:

\`\`\`css
:root {
  --background: ...
  --primary: ...
  --radius: 0.875rem
  /* All theme values */
}
\`\`\`

### Benefits

- Single source of truth
- Easy theme switching
- Consistent values across app
- Dark mode ready (future)

---

## Best Practices

1. **Performance**: Minimize animation complexity, use transform/opacity
2. **Consistency**: Follow token system, don't use arbitrary values
3. **Hierarchy**: Clear visual weight (gold > teal > neutrals)
4. **Whitespace**: Generous spacing for premium feel
5. **Glass Effects**: Use backdrop-blur sparingly for performance

---

## Examples

### Hero Section
\`\`\`tsx
<div className="king-teos-card p-8">
  <h1 className="text-4xl font-bold text-gradient-gold">
    Welcome to TEOS
  </h1>
  <p className="text-muted-foreground">
    Digital Gateway to Egypt's Blockchain
  </p>
</div>
\`\`\`

### Action Button
\`\`\`tsx
<Button className="btn-royal animate-crown-glow">
  <span className="text-xl mr-2">𓋹</span>
  Become Pioneer
</Button>
\`\`\`

### Token Card
\`\`\`tsx
<Card className="glass-card hover:border-primary/50 transition-all">
  <CardHeader>
    <div className="gradient-gold h-12 w-12 rounded-full" />
    <CardTitle className="text-primary">TEOS</CardTitle>
  </CardHeader>
</Card>
\`\`\`

---

## Future Enhancements

- Dark/Light mode toggle
- Color customization per user
- Animation speed controls
- High contrast theme
- RTL language support (Arabic)
