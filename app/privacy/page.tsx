// Privacy Policy page for civic compliance
export default function PrivacyPage() {
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
              <p className="text-xs text-muted-foreground">Privacy Policy</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-card/80 backdrop-blur border border-primary/30 rounded-xl p-6 md:p-8 space-y-6">
          <h1 className="text-3xl font-bold text-primary">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">1. Information We Collect</h2>
            <p className="text-foreground leading-relaxed">
              TEOS Wallet collects minimal personal information necessary for wallet operation. This includes your Pi
              Network username (when you verify), wallet addresses (Solana and Pi Network), transaction history, and
              verification status.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">2. How We Use Your Information</h2>
            <p className="text-foreground leading-relaxed">
              Your information is used solely to provide wallet services, verify your TEOS Pioneer status, enable
              transactions, and improve our services. We do not sell or share your personal information with third
              parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">3. Data Storage</h2>
            <p className="text-foreground leading-relaxed">
              Wallet data is primarily stored locally on your device using browser local storage. Blockchain transaction
              data is stored on the respective blockchain networks (Solana and Pi Network) according to their protocols.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">4. Pi Network Integration</h2>
            <p className="text-foreground leading-relaxed">
              When you authenticate with Pi Network, we receive your Pi username and user ID. This information is used
              for verification purposes only. Pi Network has its own privacy policy that also applies to your
              interactions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">5. Transaction Privacy</h2>
            <p className="text-foreground leading-relaxed">
              Blockchain transactions are public by nature. Your transaction history on Solana and Pi Network
              blockchains is visible to anyone with your wallet address. TEOS Wallet does not add additional tracking
              beyond what is inherent to blockchain technology.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">6. Security Measures</h2>
            <p className="text-foreground leading-relaxed">
              We implement industry-standard security measures to protect your wallet data. However, no method of
              electronic storage is 100% secure. You are responsible for maintaining the security of your device and not
              sharing sensitive wallet information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">7. Cookies and Tracking</h2>
            <p className="text-foreground leading-relaxed">
              TEOS Wallet uses browser local storage to maintain your session and preferences. We do not use third-party
              tracking cookies or analytics that identify individual users.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">8. Third-Party Services</h2>
            <p className="text-foreground leading-relaxed">
              TEOS Wallet integrates with ecosystem partners (Nilex DEX, FPBE, Healthcare, Smart City, etc.). When you
              interact with these services, their respective privacy policies apply. We recommend reviewing their
              policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">9. Your Rights</h2>
            <p className="text-foreground leading-relaxed">
              You have the right to access, correct, or delete your personal information stored in TEOS Wallet. Since
              most data is stored locally, you can clear it at any time through your device settings. Blockchain data
              cannot be deleted due to the immutable nature of blockchain technology.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">10. Children's Privacy</h2>
            <p className="text-foreground leading-relaxed">
              TEOS Wallet is not intended for users under 18 years of age. We do not knowingly collect information from
              children. If you believe a child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">11. Changes to Privacy Policy</h2>
            <p className="text-foreground leading-relaxed">
              We may update this privacy policy from time to time. Changes will be posted on this page with an updated
              revision date. Continued use of TEOS Wallet after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">12. Contact Us</h2>
            <p className="text-foreground leading-relaxed">
              For privacy-related questions or concerns, please contact us through our official channels at
              teosegypt.com or visit our GitHub repositories.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
