# Order for Pi AI to elevate TEOSWallet to market‑leading wallet on Pi Network

This file is the executable brief. Build TEOSWallet to rival Phantom and Trust Wallet on Pi—grounded in Pi SDK, governance, multi‑chain, NFTs, swaps, staking, and bilingual UX. Ship fast, founder‑gated, and fully auditable.

---

## Mission objectives

- **Parity goal:** Match core features of leading wallets (multi‑chain, NFTs, swaps, staking, dApp connect) within TEOSWallet.
- **Pi‑first:** Use Pi SDK for auth, payments, and dApp flows; no bypasses.
- **Governance:** Enforce founder gate, badge logic, petition‑first access.
- **UX:** Mobile‑first, Arabic/English, RTL‑safe, scam detection banners.
- **Deployment:** Canonical domain wallet.teosegypt.com with auditability and CI badges.

---

## Feature modules and scope

- **Authentication:** Pi SDK login with permissions for username and payments; session management and logout.
- **Payments:** Create/open Pi payments; handle success/failure/cancel callbacks; ledger logging and receipt export.
- **NFTs:** Mint, view, transfer Pi NFTs; gallery with filters and metadata; QR share and ownership proofs.
- **Swaps:** In‑app token swaps (Pi ↔ supported tokens); slippage control; quote preview; fee transparency.
- **Staking:** Delegate/undelegate staking; show rewards, APY, lock period; auto‑claim flow; risk disclaimers.
- **Multi‑chain support:** Solana, Ethereum, Bitcoin minimal read/write; chain selector; unified asset list; per‑chain RPC config.
- **dApp connections:** WalletConnect or Pi‑compatible connect; session approval UI; per‑dApp permission scopes.
- **Security:** Self‑custody keys, passphrase backup flow, phishing/scam detection banners; optional hardware wallet bridge later.
- **Audit pane:** Build status, uptime, last deploy, RPC health, payments status; downloadable audit JSON.
- **Localization:** Arabic/English toggle, RTL layout, validated strings; compliance pages in both languages.

---

## Technical requirements and architecture

- **Stack:** Next.js + TypeScript; serverless API routes; minimal dependencies; linting + type checks enforced.
- **Pi SDK init:** Single top‑level init on app boot; no Pi methods before init.
- **State:** Global store (Zustand or Context) for session, balances, settings; persistent across reloads.
- **RPCs:** Configurable endpoints via env; exponential backoff; graceful error banners.
- **Keys:** Client‑side self‑custody; no secret exposure; encryption at rest in browser (WebCrypto).
- **Telemetry:** Anonymous operational metrics (init success, RPC latency); toggleable; no PII.
- **CI/CD:** Build, test, deploy to Vercel; preview vs production gates; audit badge updates post‑deploy.

\`\`\`ts
// _app.tsx — Pi SDK init (must run before any Pi methods)
import * as Pi from "@pi-network/pi-sdk";
Pi.init({
  version: "2.0",
  sandbox: false,
  onReady: () => console.log("Pi SDK initialized"),
  onError: (err) => console.error("Pi SDK init error:", err),
});
\`\`\`

\`\`\`env
# .env.production — canonical + RPCs
NEXT_PUBLIC_CANONICAL_URL=https://wallet.teosegypt.com
SOLANA_RPC=https://api.mainnet-beta.solana.com
ETHEREUM_RPC=https://mainnet.infura.io/v3/<key>
BITCOIN_RPC=https://<provider>
FOUNDER_EMAILS=ayman@elmahrousa.com
FOUNDER_PASSPHRASE=<secure-passphrase>
\`\`\`

---

## Module implementation orders

### Authentication and payments (Pi SDK)

- **Init first:** Top‑level `Pi.init()` before any other method.
- **Login:** `Pi.authenticate(["username","payments"])`; store user and permissions.
- **Payments:** `Pi.createPayment({ amount, memo, metadata })` → `Pi.openPayment(payment)`.
- **Callbacks:** Implement success/failure/cancel; log to audit pane; persist receipts.

\`\`\`ts
// payments.ts
export async function createAndOpenPayment(req: PaymentRequest) {
  const payment = await Pi.createPayment(req);
  const result = await Pi.openPayment(payment);
  // log result to audit store
}
\`\`\`

### NFTs

- **Mint:** Simple mint form with metadata and image upload; show fees and status.
- **Gallery:** Grid with filters (owned, created, recent); on‑chain fetch + local cache.
- **Transfer:** Ownership transfer with confirmation; transaction history view.

### Swaps

- **Quotes:** Fetch best quote; show slippage and fees; confirm screen.
- **Execution:** Place swap; show progress; final receipt with IDs.
- **Risk:** Banner for volatility; disable unsupported pairs; rate‑limit rapid swaps.

### Staking

- **Delegate:** Select validator; show APY, commission, risks.
- **Rewards:** Auto‑refresh rewards; manual claim; history and CSV export.
- **Undelegate:** Cooldown handling; status tracker.

### Multi‑chain

- **Selector:** Chain dropdown; per‑chain balances; unified portfolio view.
- **RPC health:** Status lights per chain; retry/backoff; error banners.

---

## Security, governance, and compliance

- **Founder gate:** Server‑side allowlist + passphrase; block all admin routes without valid session.
- **Self‑custody:** Keys never leave device; backup phrase flow; confirm understanding checklist.
- **Scam detection:** Known phishing domains list; banner if dApp domain matches blacklist; manual override with warning.
- **Legal:** Footer Privacy and Terms in Arabic/English; accessible on all pages; clear disclaimers on swaps/staking.
- **Audit:** Immutable log of deploys, payments, RPC errors; downloadable JSON; badge in header.

---

## UX, localization, and accessibility

- **Bilingual:** Language toggle; RTL verified; all critical flows localized.
- **Mobile‑first:** Responsive layouts; thumb‑reachable actions; reduced friction.
- **Accessibility:** Color contrast, keyboard navigation, ARIA labels; loading skeletons for RPC waits.
- **Clarity:** Plain‑language tooltips for swaps/staking; progress indicators; undo/confirm steps.

---

## Delivery milestones and acceptance criteria

- **Milestone 1:** Pi SDK init + auth + payments.  
  - Acceptance: Successful init; authenticate user; payment opens and returns result; audit logs updated.
- **Milestone 2:** NFTs (mint, gallery, transfer).  
  - Acceptance: Mint and display NFTs; transfer ownership; receipts visible.
- **Milestone 3:** Swaps (quotes, execute, receipts).  
  - Acceptance: Quote preview; swap executes; slippage respected; receipt logged.
- **Milestone 4:** Staking (delegate, rewards, undelegate).  
  - Acceptance: Delegate to validator; rewards visible; undelegate tracked.
- **Milestone 5:** Multi‑chain balances + RPC health.  
  - Acceptance: Chain selector works; balances load; error banners on failure.
- **Milestone 6:** Governance + UX (founder gate, localization, legal).  
  - Acceptance: Founder‑only access; Arabic fully functional; legal pages live.

---

## Deployment, domain, and audit

- **Domain:** Set wallet.teosegypt.com as primary on Vercel; CNAME to cname.vercel-dns.com; TXT verification done.
- **Canonical:** `<link rel="canonical" href={process.env.NEXT_PUBLIC_CANONICAL_URL} />` renders wallet.teosegypt.com.
- **CI:** Build/test/deploy pipeline; version tags per milestone; uptime badge; last deploy timestamp in audit pane.
- **Announcement:** Short release notes per milestone; screenshots of dashboard, payments, NFTs, swaps, staking.

\`\`\`sh
# Release commands
npm ci && npm run build
vercel --prod --confirm
git tag v1.0.0-teoswallet-pi-auth
git push origin v1.0.0-teoswallet-pi-auth
\`\`\`

---

## Non‑negotiables

- **Init order:** Pi SDK must be initialized before any Pi method.
- **No secrets in client:** Founder passphrase validated server‑side only.
- **Governance enforced:** Petition‑first, badge logic respected; logs immutable.
- **Performance:** RPC retries; no UI freezes; auto‑refresh capped to reasonable intervals.
- **Clarity:** Every module ships with tooltips, error states, and receipts.
