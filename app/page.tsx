"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Send,
  ArrowDownToLine,
  ArrowLeftRight,
  Copy,
  Check,
  ExternalLink,
  Zap,
  Building2,
  PieChart,
  History,
  Pickaxe,
  Globe,
  Hospital,
  LandPlot,
  ImageIcon,
  Vote,
  X,
  ShieldCheck,
  AlertCircle,
  Download,
  Loader2,
  User,
  Settings,
  RefreshCw,
  Bot,
  DollarSign,
} from "lucide-react"
import { VerificationManager, type VerificationStatus } from "@/lib/verification"
import { generateQRCodeDataURL, downloadQRCode } from "@/lib/qrcode"
import Link from "next/link"
import { TEOS_CONFIG } from "@/lib/teos-config"
import { CivicVerificationCard } from "@/components/civic-verification-card"
import { piSDK } from "@/lib/pi-sdk"
import { ProfileManager, type UserProfile } from "@/lib/profile"
import { UserProfileModal } from "@/components/user-profile-modal"
import { FounderProfileCard } from "@/components/founder-profile-card"
import { SolanaBalanceManager, type TokenBalance } from "@/lib/solana-balance"
import { KingTeosBackground } from "@/components/king-teos-background"
import { AIChatModal } from "@/components/ai-chat-modal"
import { FiatSwapModal } from "@/components/fiat-swap-modal"
import { FounderAuth } from "@/lib/founder-auth"

// Helper functions from updates
const isFounder = (username: string) => FounderAuth.shouldBypassPayment(username)
const generateWalletAddress = (username: string) => `0x${username.slice(0, 20)}` // Placeholder, actual logic might differ

export default function TeosWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [currentTab, setCurrentTab] = useState<"transactions" | "mining" | "ecosystem" | "analytics" | "profile">(
    "transactions",
  )
  const [copied, setCopied] = useState(false)
  const [activeModal, setActiveModal] = useState<"send" | "receive" | "swap" | "verify" | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)

  const [balances, setBalances] = useState<TokenBalance>({
    teos: 0,
    tut: 0,
    ert: 0,
    sol: 0,
  })
  const [isLoadingBalances, setIsLoadingBalances] = useState(false)

  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(VerificationManager.getStatus())
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [qrCodeURL, setQrCodeURL] = useState<string>("")
  const [isPiSDKReady, setIsPiSDKReady] = useState(false)
  const [sdkError, setSdkError] = useState<string>("")

  // Floating buttons state
  const [showAIChat, setShowAIChat] = useState(false)
  const [showFiatSwap, setShowFiatSwap] = useState(false)

  const loadRealBalances = async (address: string) => {
    if (!address) return

    setIsLoadingBalances(true)
    try {
      const realBalances = await SolanaBalanceManager.getBalances(address)
      setBalances(realBalances)
    } catch (error) {
    } finally {
      setIsLoadingBalances(false)
    }
  }

  useEffect(() => {
    const initApp = async () => {
      try {
        setSdkError("")
        await piSDK.waitForSDK()
        setIsPiSDKReady(true)
      } catch (error: any) {
        const errorMsg = error.message || "Please open this app in Pi Browser to access payment features."
        setSdkError(errorMsg)
        setPaymentError(errorMsg)
        setIsPiSDKReady(false)
      }

      const status = VerificationManager.getStatus()
      setVerificationStatus(status)

      const profile = ProfileManager.getUserProfile()
      setUserProfile(profile)

      if (status.hasWalletAccess && status.solanaAddress) {
        setWalletAddress(status.solanaAddress)
        setIsConnected(true)

        await loadRealBalances(status.solanaAddress)
      } else {
        setActiveModal("verify")
      }
    }

    initApp()
  }, [])

  useEffect(() => {
    if (!walletAddress) return

    const cleanup = SolanaBalanceManager.watchBalances(
      walletAddress,
      (newBalances) => {
        setBalances(newBalances)
      },
      10000, // Poll every 10 seconds
    )

    return cleanup
  }, [walletAddress])

  useEffect(() => {
    if (walletAddress && typeof window !== "undefined") {
      const qr = generateQRCodeDataURL(walletAddress, 256)
      setQrCodeURL(qr)
    }
  }, [walletAddress])

  const handlePiPayment = async () => {
    if (!isPiSDKReady) {
      setPaymentError("Pi SDK not ready. Please wait...")
      return
    }

    setIsProcessingPayment(true)
    setPaymentError(null)

    try {
      if (!piSDK.isReady()) {
        await piSDK.init()
      }

      const piUser = await piSDK.authenticate()

      if (isFounder(piUser.username)) {
        const directAddress = generateWalletAddress(piUser.username)
        await VerificationManager.verifyWithPiPayment(piUser.username, directAddress, "founder-bypass")

        const newStatus = VerificationManager.getStatus()
        setVerificationStatus(newStatus)
        setWalletAddress(newStatus.solanaAddress!)
        setIsConnected(true)
        setActiveModal(null)
        await loadRealBalances(newStatus.solanaAddress!)
        return
      }

      const payment = await piSDK.createPayment({
        amount: 1,
        memo: "TEOS Wallet Activation - Digital Pharaohs Pioneer",
        metadata: { purpose: "wallet_activation" },
      })

      const result = await piSDK.processPayment(payment.paymentId)

      const newStatus = await VerificationManager.verifyWithPi(piUser.username, payment.paymentId)
      setVerificationStatus(newStatus)
      setWalletAddress(newStatus.solanaAddress || "")
      setIsConnected(true)

      setActiveModal(null)

      if (newStatus.solanaAddress) {
        await loadRealBalances(newStatus.solanaAddress)
      }

      setShowProfileModal(true)
    } catch (error: any) {
      setPaymentError(error.message || "Failed to process Pi payment. Please try again.")
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const checkFeatureAccess = (feature: "swap" | "mining" | "send" | "receive"): boolean => {
    const access = VerificationManager.canAccessFeature(feature)
    if (!access.allowed) {
      alert(access.reason || "Access denied")
      return false
    }
    return true
  }

  const handleSendClick = () => {
    if (checkFeatureAccess("send")) {
      setActiveModal("send")
    }
  }

  const handleReceiveClick = () => {
    if (checkFeatureAccess("receive")) {
      setActiveModal("receive")
    }
  }

  const handleSwapClick = () => {
    if (checkFeatureAccess("swap")) {
      setActiveModal("swap")
    }
  }

  const handleMiningClaim = () => {
    if (checkFeatureAccess("mining")) {
      alert("Mining rewards claimed! 15.75 TEOS added to your balance.")
    }
  }

  const copyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + "M"
    if (num >= 1000) return (num / 1000).toFixed(2) + "K"
    return num.toFixed(2)
  }

  const handleProfileSave = (profile: UserProfile) => {
    setUserProfile(profile)
    setShowProfileModal(false)
  }

  const totalValue = balances.teos * 0.85 + balances.tut * 0.42 + balances.ert * 1.0

  return (
    <div className="min-h-screen relative overflow-hidden">
      <KingTeosBackground />

      <header className="sticky top-0 z-50 backdrop-blur-xl border-b-2 border-primary/30 king-teos-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-xl btn-royal flex items-center justify-center animate-crown-glow shadow-lg shadow-primary/50">
                <span className="text-3xl">𓀠</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient-gold">TEOS Wallet</h1>
                <p className="text-xs text-muted-foreground">Digital Gateway to Egypt's Blockchain</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Add Founder Dashboard Link */}
              <Link href="/founder">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-foreground hover:bg-primary"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Founder
                </Button>
              </Link>
              {isConnected && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => loadRealBalances(walletAddress)}
                  disabled={isLoadingBalances}
                  className="h-10 w-10"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoadingBalances ? "animate-spin" : ""}`} />
                </Button>
              )}
              {userProfile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentTab("profile")}
                  className="h-10 w-10 rounded-full overflow-hidden p-0"
                >
                  {userProfile.photoURL ? (
                    <img
                      src={userProfile.photoURL || "/placeholder.svg"}
                      alt={userProfile.username}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              )}
              {verificationStatus.isTeosPioneer && (
                <Badge className="gap-1.5 bg-primary/20 text-primary border-primary/30">
                  <ShieldCheck className="h-3 w-3" />
                  Pioneer
                </Badge>
              )}
              {isConnected && (
                <Badge className="gap-1.5 bg-success/20 text-success border-success/30 hover:bg-success/30">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Connected
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-20 max-w-6xl">
        {!verificationStatus.hasWalletAccess && (
          <Card className="mb-6 border-warning/50 bg-warning/10 backdrop-blur">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-warning mb-1">Become a Verified TEOS Pioneer</h3>
                <p className="text-sm text-foreground/80 mb-3">
                  Pay 1 Pi to unlock your TEOS Wallet and receive both Solana and Pi Network addresses. Join the Digital
                  Pharaohs revolution!
                </p>
                <Button
                  onClick={() => setActiveModal("verify")}
                  className="gradient-gold text-primary-foreground"
                  size="sm"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Become Pioneer - Pay 1 Pi
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {verificationStatus.hasWalletAccess && (
          <div className="mb-6">
            <CivicVerificationCard />
          </div>
        )}

        {/* Wallet Address Card */}
        <Card className="mb-6 border-primary/30 bg-card/80 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      Solana Mainnet
                    </Badge>
                    {verificationStatus.piUsername && (
                      <Badge variant="outline" className="text-xs">
                        Pi: @{verificationStatus.piUsername}
                      </Badge>
                    )}
                    {isLoadingBalances && (
                      <Badge variant="outline" className="text-xs">
                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                        Syncing...
                      </Badge>
                    )}
                  </div>
                  <div className="bg-background/50 border border-primary/40 rounded-lg px-4 py-3 font-mono text-sm text-primary break-all">
                    {verificationStatus.hasWalletAccess ? walletAddress : "Pay 1 Pi to unlock wallet"}
                  </div>
                </div>
              </div>
              <Button
                onClick={copyAddress}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2 shrink-0 bg-transparent"
                disabled={!verificationStatus.hasWalletAccess}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Token Portfolio */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {/* TEOS Token */}
          <Card className="border-primary/30 bg-card/80 backdrop-blur hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full gradient-gold flex items-center justify-center text-lg font-bold">
                    𓀠
                  </div>
                  <div>
                    <CardTitle className="text-base">TEOS</CardTitle>
                    <p className="text-xs text-muted-foreground">TEOS Network</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">{formatNumber(balances.teos)}</div>
                  <div className="text-xs text-muted-foreground">${formatNumber(balances.teos * 0.85)}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground h-8 text-xs bg-transparent"
                  onClick={handleSendClick}
                >
                  <Send className="h-3 w-3 mr-1" />
                  Send
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground h-8 text-xs bg-transparent"
                  onClick={handleReceiveClick}
                >
                  <ArrowDownToLine className="h-3 w-3 mr-1" />
                  Receive
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground h-8 text-xs bg-transparent"
                  onClick={handleSwapClick}
                >
                  <ArrowLeftRight className="h-3 w-3 mr-1" />
                  Swap
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* TUT Token */}
          <Card className="border-chart-3/30 bg-card/80 backdrop-blur hover:border-chart-3/50 transition-all hover:scale-[1.02] cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-chart-3 to-purple-600 flex items-center justify-center text-lg font-bold text-white">
                    𓏏
                  </div>
                  <div>
                    <CardTitle className="text-base">TUT</CardTitle>
                    <p className="text-xs text-muted-foreground">Utility Token</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-chart-3">{formatNumber(balances.tut)}</div>
                  <div className="text-xs text-muted-foreground">${formatNumber(balances.tut * 0.42)}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-chart-3/40 text-chart-3 hover:bg-chart-3 hover:text-white h-8 text-xs bg-transparent"
                  onClick={handleSendClick}
                >
                  <Send className="h-3 w-3 mr-1" />
                  Send
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-chart-3/40 text-chart-3 hover:bg-chart-3 hover:text-white h-8 text-xs bg-transparent"
                  onClick={handleReceiveClick}
                >
                  <ArrowDownToLine className="h-3 w-3 mr-1" />
                  Receive
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-chart-3/40 text-chart-3 hover:bg-chart-3 hover:text-white h-8 text-xs bg-transparent"
                  onClick={handleSwapClick}
                >
                  <ArrowLeftRight className="h-3 w-3 mr-1" />
                  Swap
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* ERT Token */}
          <Card className="border-success/30 bg-card/80 backdrop-blur hover:border-success/50 transition-all hover:scale-[1.02] cursor-pointer sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center text-lg font-bold text-white">
                    𓊨
                  </div>
                  <div>
                    <CardTitle className="text-base">ERT</CardTitle>
                    <p className="text-xs text-muted-foreground">Civic Stablecoin</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-success">{formatNumber(balances.ert)}</div>
                  <div className="text-xs text-muted-foreground">${formatNumber(balances.ert * 1.0)}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-success/40 text-success hover:bg-success hover:text-white h-8 text-xs bg-transparent"
                  onClick={handleSendClick}
                >
                  <Send className="h-3 w-3 mr-1" />
                  Send
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-success/40 text-success hover:bg-success hover:text-white h-8 text-xs bg-transparent"
                  onClick={handleReceiveClick}
                >
                  <ArrowDownToLine className="h-3 w-3 mr-1" />
                  Receive
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-success/40 text-success hover:bg-success hover:text-white h-8 text-xs bg-transparent"
                  onClick={handleSwapClick}
                >
                  <ArrowLeftRight className="h-3 w-3 mr-1" />
                  Swap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Tabs */}
        <div className="flex gap-2 mb-6 bg-muted/50 p-2 rounded-xl backdrop-blur overflow-x-auto">
          <Button
            variant={currentTab === "transactions" ? "default" : "ghost"}
            className={currentTab === "transactions" ? "gradient-gold text-primary-foreground" : "text-foreground"}
            onClick={() => setCurrentTab("transactions")}
          >
            <History className="h-4 w-4 mr-2" />
            Transactions
          </Button>
          <Button
            variant={currentTab === "mining" ? "default" : "ghost"}
            className={currentTab === "mining" ? "gradient-gold text-primary-foreground" : "text-foreground"}
            onClick={() => setCurrentTab("mining")}
          >
            <Pickaxe className="h-4 w-4 mr-2" />
            Mining
          </Button>
          <Button
            variant={currentTab === "ecosystem" ? "default" : "ghost"}
            className={currentTab === "ecosystem" ? "gradient-gold text-primary-foreground" : "text-foreground"}
            onClick={() => setCurrentTab("ecosystem")}
          >
            <Globe className="h-4 w-4 mr-2" />
            Ecosystem
          </Button>
          <Button
            variant={currentTab === "analytics" ? "default" : "ghost"}
            className={currentTab === "analytics" ? "gradient-gold text-primary-foreground" : "text-foreground"}
            onClick={() => setCurrentTab("analytics")}
          >
            <PieChart className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button
            variant={currentTab === "profile" ? "default" : "ghost"}
            className={currentTab === "profile" ? "gradient-gold text-primary-foreground" : "text-foreground"}
            onClick={() => setCurrentTab("profile")}
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
        </div>

        {/* Tab Content */}
        {currentTab === "transactions" && (
          <Card className="border-primary/30 bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-primary">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  type: "receive",
                  token: "TEOS",
                  amount: "+1,250.50",
                  from: "7x...9KLm",
                  time: "2 hours ago",
                  icon: ArrowDownToLine,
                  color: "text-success",
                },
                {
                  type: "swap",
                  token: "TUT → ERT",
                  amount: "500 → 500",
                  from: "Nilex DEX",
                  time: "5 hours ago",
                  icon: ArrowLeftRight,
                  color: "text-chart-3",
                },
                {
                  type: "send",
                  token: "TEOS",
                  amount: "-750.00",
                  from: "9x...2PqR",
                  time: "1 day ago",
                  icon: Send,
                  color: "text-destructive",
                },
              ].map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div
                    className={`h-10 w-10 rounded-full ${tx.type === "receive" ? "bg-success/20" : tx.type === "swap" ? "bg-chart-3/20" : "bg-destructive/20"} flex items-center justify-center shrink-0`}
                  >
                    <tx.icon className={`h-5 w-5 ${tx.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">
                      {tx.type === "receive" ? "Received" : tx.type === "swap" ? "Swapped on" : "Sent"} {tx.token}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {tx.type === "swap" ? tx.from : `${tx.type === "receive" ? "From" : "To"}: ${tx.from}`} •{" "}
                      {tx.time}
                    </div>
                  </div>
                  <div className={`text-right font-bold ${tx.color}`}>{tx.amount}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {currentTab === "mining" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-primary/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary">Mining Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mining Rate:</span>
                  <span className="text-primary font-bold">2.5 TEOS/hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Mined:</span>
                  <span className="text-success font-bold">15,420 TEOS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Claim:</span>
                  <span>2 hours ago</span>
                </div>
                <Button
                  className="w-full gradient-gold text-primary-foreground hover:opacity-90"
                  onClick={handleMiningClaim}
                  disabled={!verificationStatus.hasWalletAccess}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Claim Rewards
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary">Pi Network Migration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Migrate your Pi tokens to TEOS and join the Egyptian blockchain revolution.
                </p>
                <div>
                  <Label htmlFor="piAmount" className="text-primary">
                    Pi Balance:
                  </Label>
                  <Input
                    id="piAmount"
                    type="number"
                    placeholder="Enter Pi amount"
                    className="mt-2 bg-background/50 border-primary/40"
                    disabled={!verificationStatus.hasWalletAccess}
                  />
                </div>
                <Button
                  className="w-full gradient-gold text-primary-foreground hover:opacity-90"
                  disabled={!verificationStatus.hasWalletAccess}
                >
                  Migrate to TEOS
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentTab === "ecosystem" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Nilex DEX",
                icon: Zap,
                desc: "Egypt's sovereign DEX - All swaps powered by Nilex",
                url: TEOS_CONFIG.ecosystem.nilex,
                featured: true,
              },
              {
                name: "FPBE Banking",
                icon: Building2,
                desc: "First Pimisr Bank Elmahrosa - Civic banking",
                url: TEOS_CONFIG.ecosystem.fpbe,
              },
              {
                name: "Healthcare",
                icon: Hospital,
                desc: "Salma Unity Care Hospital integration",
                url: TEOS_CONFIG.ecosystem.healthcare,
              },
              {
                name: "Smart City",
                icon: LandPlot,
                desc: "ElMahrosa Smart City development",
                url: TEOS_CONFIG.ecosystem.smartCity,
              },
              {
                name: "NFT Generator",
                icon: ImageIcon,
                desc: "AI-powered Egyptian NFT creation",
                url: TEOS_CONFIG.ecosystem.nftGenerator,
              },
              {
                name: "Whitepaper",
                icon: Vote,
                desc: "Read the complete TEOS whitepaper",
                url: TEOS_CONFIG.ecosystem.whitepaper,
              },
            ].map((app, i) => (
              <Card
                key={i}
                className={`border-primary/30 bg-card/80 backdrop-blur hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer text-center ${app.featured ? "ring-2 ring-primary/50" : ""}`}
                onClick={() => window.open(app.url, "_blank")}
              >
                <CardHeader>
                  <div
                    className={`h-14 w-14 rounded-full ${app.featured ? "gradient-gold animate-glow" : "gradient-gold"} flex items-center justify-center mx-auto mb-2`}
                  >
                    <app.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-primary text-base">{app.name}</CardTitle>
                  {app.featured && <Badge className="mx-auto bg-primary/20 text-primary">Featured</Badge>}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{app.desc}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-primary hover:text-primary-foreground hover:bg-primary"
                  >
                    Open <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentTab === "analytics" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-primary/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary">Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-2">${formatNumber(totalValue)}</div>
                <div className="text-success text-sm mb-4">+12.5% (24h)</div>
                <div className="h-40 bg-background/50 rounded-lg border border-border flex items-center justify-center text-muted-foreground text-sm">
                  Portfolio chart
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary">Token Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "TEOS", percentage: 65, color: "bg-primary" },
                  { name: "TUT", percentage: 25, color: "bg-chart-3" },
                  { name: "ERT", percentage: 10, color: "bg-success" },
                ].map((token, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>{token.name}</span>
                      <span className="font-bold">{token.percentage}%</span>
                    </div>
                    <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                      <div className={`h-full ${token.color}`} style={{ width: `${token.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {currentTab === "profile" && (
          <div className="grid gap-4 lg:grid-cols-2">
            {/* User Profile */}
            {userProfile && (
              <Card className="border-primary/30 bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-primary">My Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 rounded-full gradient-gold flex items-center justify-center shrink-0 overflow-hidden">
                      {userProfile.photoURL ? (
                        <img
                          src={userProfile.photoURL || "/placeholder.svg"}
                          alt={userProfile.username}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-10 w-10 text-primary-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary">{userProfile.username}</h3>
                      {userProfile.patientNumber && (
                        <p className="text-sm text-muted-foreground">Patient #{userProfile.patientNumber}</p>
                      )}
                      {userProfile.contributorTier && userProfile.contributorTier !== "none" && (
                        <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
                          {userProfile.contributorTier.charAt(0).toUpperCase() + userProfile.contributorTier.slice(1)}{" "}
                          Tier
                        </Badge>
                      )}
                    </div>
                  </div>

                  {userProfile.bio && (
                    <p className="text-sm text-foreground leading-relaxed border-t border-border pt-3">
                      {userProfile.bio}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-3 border-t border-border pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Civic Score</p>
                      <p className="text-lg font-bold text-primary">{userProfile.civicScore}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Member Since</p>
                      <p className="text-sm text-foreground">{new Date(userProfile.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                    onClick={() => setShowProfileModal(true)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Founder Profile */}
            <FounderProfileCard />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 backdrop-blur-glass py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">© 2025 TEOS Network - Elmahrosa International E.S.T.</p>
          <p className="text-xs text-muted-foreground mb-2">From Egypt to the World, Powering the Digital Pharaohs</p>
          <div className="flex justify-center gap-4 text-xs">
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating Buttons for AI Assistant and Fiat Swap */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg gradient-gold"
          onClick={() => setShowFiatSwap(true)}
        >
          <DollarSign className="h-6 w-6" />
        </Button>
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          onClick={() => setShowAIChat(true)}
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>

      <AIChatModal
        open={showAIChat}
        onOpenChange={setShowAIChat}
        context={{
          balances,
          userAddress: walletAddress,
        }}
      />

      <FiatSwapModal open={showFiatSwap} onOpenChange={setShowFiatSwap} walletAddress={walletAddress} />

      {activeModal === "verify" && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => !isProcessingPayment && setActiveModal(null)}
        >
          <Card
            className="w-full max-w-md sm:max-w-lg king-teos-card relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pyramid decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50 10 L90 90 L10 90 Z" fill="oklch(0.78 0.2 75)" />
              </svg>
            </div>

            <CardHeader className="text-center space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full btn-royal flex items-center justify-center animate-crown-glow shadow-2xl shadow-primary/50">
                  <span className="text-4xl sm:text-5xl">𓋹</span>
                </div>
              </div>
              <CardTitle className="text-gradient-gold text-2xl sm:text-3xl font-bold">Become a TEOS Pioneer</CardTitle>
              <p className="text-center text-xs sm:text-sm text-accent">Join the Digital Pharaohs Revolution</p>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6">
              <div className="king-teos-card p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">Payment Required:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-gradient-gold">1 π Pi</span>
                  </div>
                </div>
                <div className="text-xs text-accent">One-time activation to unlock your TEOS Wallet</div>
                <div className="nile-flow h-1 rounded-full" />
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-semibold text-gradient-gold flex items-center gap-2 text-base sm:text-lg">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                  What You Unlock:
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start gap-2 sm:gap-3 king-teos-card p-2.5 sm:p-3 rounded-lg">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">
                      <strong className="text-primary">Solana Wallet:</strong> Manage TEOS, TUT, ERT & SOL tokens
                    </span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 king-teos-card p-2.5 sm:p-3 rounded-lg">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">
                      <strong className="text-primary">Pi Network Address:</strong> Secure Pi integration
                    </span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 king-teos-card p-2.5 sm:p-3 rounded-lg">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">
                      <strong className="text-primary">Pioneer Badge:</strong> Verified TEOS ecosystem member
                    </span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 king-teos-card p-2.5 sm:p-3 rounded-lg">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">
                      <strong className="text-primary">Advanced Features:</strong> Token swaps, mining & governance
                    </span>
                  </li>
                </ul>
              </div>

              {!isPiSDKReady && (
                <div className="king-teos-card p-3 sm:p-4 text-xs sm:text-sm text-accent flex items-center gap-3">
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  <span>Loading Pi Network SDK...</span>
                </div>
              )}

              {paymentError && (
                <div className="bg-destructive/10 border-2 border-destructive/50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-destructive">
                  {paymentError}
                </div>
              )}

              <Button
                onClick={handlePiPayment}
                disabled={isProcessingPayment || !isPiSDKReady}
                className="w-full btn-royal text-primary-foreground py-5 sm:py-6 text-base sm:text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin mr-2" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <span className="text-xl sm:text-2xl mr-2">𓋹</span>
                    Pay 1 Pi & Unlock Wallet
                  </>
                )}
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                By continuing, you agree to our <button className="text-primary hover:underline">Terms</button> and{" "}
                <button className="text-primary hover:underline">Privacy Policy</button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Other Modals */}
      {activeModal && activeModal !== "verify" && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <Card
            className="w-full max-w-md border-primary/30 bg-card/95 backdrop-blur max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-primary">
                {activeModal === "send" && "Send Tokens"}
                {activeModal === "receive" && "Receive Tokens"}
                {activeModal === "swap" && "Swap Tokens"}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setActiveModal(null)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeModal === "send" && (
                <>
                  <div>
                    <Label htmlFor="sendToken" className="text-primary">
                      Token
                    </Label>
                    <select
                      id="sendToken"
                      className="w-full mt-2 bg-background border border-primary/40 rounded-lg px-3 py-2 text-foreground"
                    >
                      <option>TEOS</option>
                      <option>TUT</option>
                      <option>ERT</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="recipient" className="text-primary">
                      Recipient Address
                    </Label>
                    <Input
                      id="recipient"
                      placeholder="Enter Solana address..."
                      className="mt-2 bg-background/50 border-primary/40"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount" className="text-primary">
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="mt-2 bg-background/50 border-primary/40"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-primary">
                      Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Add a message..."
                      rows={3}
                      className="mt-2 bg-background/50 border-primary/40"
                    />
                  </div>
                  <Button className="w-full gradient-gold text-primary-foreground">Send Tokens</Button>
                </>
              )}

              {activeModal === "receive" && (
                <div className="text-center space-y-4">
                  <div className="bg-white p-6 rounded-lg mx-auto w-fit">
                    {qrCodeURL ? (
                      <img
                        src={qrCodeURL || "/placeholder.svg"}
                        alt="Wallet QR Code"
                        className="h-48 w-48 rounded-lg"
                      />
                    ) : (
                      <div className="h-48 w-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                        QR Code
                      </div>
                    )}
                  </div>
                  <div className="bg-background/50 border border-primary/40 rounded-lg p-3 font-mono text-sm text-primary break-all">
                    {walletAddress}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={copyAddress} className="gradient-gold text-primary-foreground gap-2">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <Button
                      onClick={() =>
                        qrCodeURL && downloadQRCode(qrCodeURL, `teos-wallet-${walletAddress.substring(0, 8)}.png`)
                      }
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              )}

              {activeModal === "swap" && (
                <>
                  <div>
                    <Label className="text-primary">From</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <select className="bg-background border border-primary/40 rounded-lg px-3 py-2 text-foreground">
                        <option>TEOS</option>
                        <option>TUT</option>
                        <option>ERT</option>
                      </select>
                      <Input type="number" placeholder="0.00" className="bg-background/50 border-primary/40" />
                    </div>
                  </div>
                  <div className="text-center">
                    <Button variant="ghost" size="icon" className="text-primary">
                      <ArrowLeftRight className="h-5 w-5" />
                    </Button>
                  </div>
                  <div>
                    <Label className="text-primary">To</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <select className="bg-background border border-primary/40 rounded-lg px-3 py-2 text-foreground">
                        <option>TUT</option>
                        <option>TEOS</option>
                        <option>ERT</option>
                      </select>
                      <Input type="number" placeholder="0.00" readOnly className="bg-background/50 border-primary/40" />
                    </div>
                  </div>
                  <div className="bg-primary/10 border border-primary/40 rounded-lg p-3 text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Powered by:</span>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-primary font-bold">Nilex DEX</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Exchange Rate:</span>
                      <span className="text-foreground">1 TEOS = 1 TUT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network Fee:</span>
                      <span className="text-foreground">0.001 SOL</span>
                    </div>
                  </div>
                  <Button
                    className="w-full gradient-gold text-primary-foreground"
                    onClick={() => window.open(TEOS_CONFIG.ecosystem.nilex, "_blank")}
                  >
                    <ArrowLeftRight className="mr-2 h-4 w-4" />
                    Swap on Nilex DEX
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onSave={handleProfileSave}
        initialData={
          verificationStatus.solanaAddress
            ? {
                piUsername: verificationStatus.piUsername || "",
                solanaAddress: verificationStatus.solanaAddress,
                piAddress: verificationStatus.piAddress || "",
              }
            : undefined
        }
      />
    </div>
  )
}
