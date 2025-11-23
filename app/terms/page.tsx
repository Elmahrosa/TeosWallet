// Terms of Service page for civic compliance
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-egyptian">
      <header className="backdrop-blur-glass border-b-2 border-primary/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl gradient-gold flex items-center justify-center">
              <span className="text-2xl">𓀠</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">TEOS Wallet</h1>
              <p className="text-xs text-muted-foreground">Terms of Service</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-card/80 backdrop-blur border border-primary/30 rounded-xl p-6 md:p-8 space-y-6">
          <h1 className="text-3xl font-bold text-primary">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">1. Acceptance of Terms</h2>
            <p className="text-foreground leading-relaxed">
              By accessing and using the TEOS Wallet application, you accept and agree to be bound by the terms and
              provision of this agreement. This includes our integration with the Pi Network and the TEOS ecosystem.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">2. Verification & Payment</h2>
            <p className="text-foreground leading-relaxed">
              To become a Verified TEOS Pioneer and unlock full wallet functionality, users must complete a one-time
              payment of 1 Pi token. This payment grants access to both Solana-based and Pi Network wallet addresses
              within the TEOS ecosystem.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">3. Wallet Security</h2>
            <p className="text-foreground leading-relaxed">
              You are solely responsible for maintaining the security of your wallet addresses and private keys. TEOS
              Network cannot recover lost passwords or private keys. Always backup your wallet information securely.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">4. Contributor Verification</h2>
            <p className="text-foreground leading-relaxed">
              Certain features such as token swapping and mining require contributor-level verification. This additional
              verification ensures community trust and network security within the TEOS ecosystem.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">5. Ecosystem Integration</h2>
            <p className="text-foreground leading-relaxed">
              TEOS Wallet integrates with multiple ecosystem partners including Nilex DEX, FPBE Banking, Healthcare
              services, Smart City applications, NFT marketplaces, and Governance systems. Each integration may have
              additional terms that apply to their specific services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">6. Token Information</h2>
            <p className="text-foreground leading-relaxed">
              TEOS Wallet supports TEOS (Network Token), TUT (Utility Token), and ERT (Egyptian Civic Stablecoin). Token
              values may fluctuate. Past performance is not indicative of future results.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">7. Pi Network Integration</h2>
            <p className="text-foreground leading-relaxed">
              This application integrates with the Pi Network. By using TEOS Wallet, you also agree to comply with Pi
              Network's terms of service and community guidelines.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">8. Limitation of Liability</h2>
            <p className="text-foreground leading-relaxed">
              TEOS Network and its operators shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages resulting from your use of the wallet application.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">9. Governing Law</h2>
            <p className="text-foreground leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of the Arab Republic of Egypt,
              reflecting our commitment to Egyptian digital innovation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">10. Contact Information</h2>
            <p className="text-foreground leading-relaxed">
              For questions about these terms, please contact us through our official channels at teosegypt.com or visit
              our GitHub repositories for technical support.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
