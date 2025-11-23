"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Send,
  ArrowUpRight,
  Users,
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Lock,
  LogOut,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react"
import { FounderAuth } from "@/lib/founder-auth"
import { CommunityStatsManager, type CommunityStats } from "@/lib/community-stats"
import { TEOS_CONFIG } from "@/lib/teos-config"
import Link from "next/link"

export default function FounderDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ piUsername: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(false)

  const [activeTab, setActiveTab] = useState<"overview" | "tokens" | "community" | "audit">("overview")

  // Token send form
  const [sendForm, setSendForm] = useState({
    token: "TEOS",
    recipient: "",
    amount: "",
    memo: "",
  })

  useEffect(() => {
    const checkAuth = () => {
      const isFounder = FounderAuth.isFounder()
      setIsAuthenticated(isFounder)

      if (isFounder) {
        loadCommunityStats()
      }
    }

    checkAuth()
  }, [])

  const loadCommunityStats = async () => {
    setIsLoadingStats(true)
    try {
      const stats = await CommunityStatsManager.getStats()
      setCommunityStats(stats)
    } catch (error) {
    } finally {
      setIsLoadingStats(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    const success = await FounderAuth.authenticate(loginForm.piUsername, loginForm.password)

    if (success) {
      setIsAuthenticated(true)
      loadCommunityStats()
    } else {
      setLoginError("Invalid credentials. Access denied.")
    }
  }

  const handleLogout = () => {
    FounderAuth.logout()
    setIsAuthenticated(false)
    setLoginForm({ piUsername: "", password: "" })
  }

  const handleSendTokens = async () => {
    alert(`Sending ${sendForm.amount} ${sendForm.token} to ${sendForm.recipient}\nMemo: ${sendForm.memo}`)

    // Reset form
    setSendForm({ token: "TEOS", recipient: "", amount: "", memo: "" })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + "M"
    if (num >= 1000) return (num / 1000).toFixed(2) + "K"
    return num.toLocaleString()
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-egyptian flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-primary/30 bg-card/95 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="h-20 w-20 rounded-full gradient-gold flex items-center justify-center">
                <Lock className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-primary text-center text-2xl">Founder Dashboard</CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Restricted access - Founder credentials required
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="piUsername" className="text-primary">
                  Pi Username
                </Label>
                <Input
                  id="piUsername"
                  value={loginForm.piUsername}
                  onChange={(e) => setLoginForm({ ...loginForm, piUsername: e.target.value })}
                  placeholder="@aams1969"
                  className="mt-2 bg-background/50 border-primary/40"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-primary">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Enter founder password"
                    className="bg-background/50 border-primary/40 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {loginError && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {loginError}
                </div>
              )}

              <Button type="submit" className="w-full gradient-gold text-primary-foreground">
                <Lock className="mr-2 h-4 w-4" />
                Access Dashboard
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Only the founder (Ayman Seif) can access this dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-egyptian">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-glass border-b-2 border-primary/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl gradient-gold flex items-center justify-center shadow-lg shadow-primary/50">
                <span className="text-2xl">𓀀</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Founder Dashboard</h1>
                <p className="text-xs text-muted-foreground">TEOS Network Management</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-primary">
                  Back to Wallet
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-20 max-w-7xl">
        {/* Quick Stats */}
        {communityStats && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="border-primary/30 bg-card/80 backdrop-blur">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pioneers</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {communityStats.pioneers.total}/{communityStats.pioneers.maxLimit}
                </div>
                <p className="text-xs text-success mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  {communityStats.pioneers.remaining} spots remaining
                </p>
              </CardContent>
            </Card>

            <Card className="border-chart-3/30 bg-card/80 backdrop-blur">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Contributions</CardTitle>
                  <DollarSign className="h-4 w-4 text-chart-3" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-chart-3">
                  ${formatNumber(communityStats.pioneers.totalContributions * 50)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {communityStats.pioneers.totalContributions} SOL contributed
                </p>
              </CardContent>
            </Card>

            <Card className="border-success/30 bg-card/80 backdrop-blur">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Community</CardTitle>
                  <Users className="h-4 w-4 text-success" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {formatNumber(
                    communityStats.telegram.members +
                      communityStats.whatsapp.subscribers +
                      communityStats.facebook.followers +
                      communityStats.twitter.followers,
                  )}
                </div>
                <p className="text-xs text-success mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />+
                  {communityStats.telegram.growth24h +
                    communityStats.whatsapp.growth24h +
                    communityStats.facebook.growth24h +
                    communityStats.twitter.growth24h}{" "}
                  (24h)
                </p>
              </CardContent>
            </Card>

            <Card className="border-warning/30 bg-card/80 backdrop-blur">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Petition</CardTitle>
                  <Shield className="h-4 w-4 text-warning" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {formatNumber(communityStats.petition.signatures)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((communityStats.petition.signatures / communityStats.petition.goal) * 100).toFixed(1)}% of{" "}
                  {formatNumber(communityStats.petition.goal)} goal
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-muted/50 p-2 rounded-xl backdrop-blur overflow-x-auto">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            className={activeTab === "overview" ? "gradient-gold text-primary-foreground" : "text-foreground"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "tokens" ? "default" : "ghost"}
            className={activeTab === "tokens" ? "gradient-gold text-primary-foreground" : "text-foreground"}
            onClick={() => setActiveTab("tokens")}
          >
            Token Management
          </Button>
          <Button
            variant={activeTab === "community" ? "default" : "ghost"}
            className={activeTab === "community" ? "gradient-gold text-primary-foreground" : "text-foreground"}
            onClick={() => setActiveTab("community")}
          >
            Community Stats
          </Button>
          <Button
            variant={activeTab === "audit" ? "default" : "ghost"}
            className={activeTab === "audit" ? "gradient-gold text-primary-foreground" : "text-foreground"}
            onClick={() => setActiveTab("audit")}
          >
            Audit Status
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Campaign Wallet */}
            <Card className="border-primary/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary">Campaign Wallet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background/50 border border-primary/40 rounded-lg p-3 font-mono text-xs text-primary break-all">
                  {TEOS_CONFIG.wallets.campaign}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                    onClick={() => window.open(`https://solscan.io/account/${TEOS_CONFIG.wallets.campaign}`, "_blank")}
                  >
                    View on Solscan
                    <ArrowUpRight className="ml-2 h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                    onClick={() => navigator.clipboard.writeText(TEOS_CONFIG.wallets.campaign)}
                  >
                    Copy Address
                  </Button>
                </div>

                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Received:</span>
                    <span className="font-bold text-success">
                      {communityStats?.pioneers.totalContributions || 0} SOL
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TEOS Distributed:</span>
                    <span className="font-bold text-primary">
                      {formatNumber((communityStats?.pioneers.total || 0) * 10000)} TEOS
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pi Network Integration */}
            <Card className="border-chart-3/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary">Pi Network</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Stellar Address</Label>
                  <div className="bg-background/50 border border-primary/40 rounded-lg p-3 font-mono text-xs text-primary break-all mt-2">
                    {TEOS_CONFIG.piNetwork.stellarAddress}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-border pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Network</p>
                    <p className="text-sm font-bold text-primary">{TEOS_CONFIG.piNetwork.network}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Unlock Fee</p>
                    <p className="text-sm font-bold text-primary">{TEOS_CONFIG.piNetwork.paymentAmount} Pi</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  onClick={() => window.open("https://minepi.com/aymanseif", "_blank")}
                >
                  View Founder Pi Profile
                  <ArrowUpRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "tokens" && (
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Send Tokens */}
            <Card className="border-primary/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary">Send Tokens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="token" className="text-primary">
                    Token
                  </Label>
                  <select
                    id="token"
                    value={sendForm.token}
                    onChange={(e) => setSendForm({ ...sendForm, token: e.target.value })}
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
                    value={sendForm.recipient}
                    onChange={(e) => setSendForm({ ...sendForm, recipient: e.target.value })}
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
                    value={sendForm.amount}
                    onChange={(e) => setSendForm({ ...sendForm, amount: e.target.value })}
                    placeholder="0.00"
                    className="mt-2 bg-background/50 border-primary/40"
                  />
                </div>

                <div>
                  <Label htmlFor="memo" className="text-primary">
                    Memo (Optional)
                  </Label>
                  <Textarea
                    id="memo"
                    value={sendForm.memo}
                    onChange={(e) => setSendForm({ ...sendForm, memo: e.target.value })}
                    placeholder="Pioneer reward distribution..."
                    rows={3}
                    className="mt-2 bg-background/50 border-primary/40"
                  />
                </div>

                <Button onClick={handleSendTokens} className="w-full gradient-gold text-primary-foreground">
                  <Send className="mr-2 h-4 w-4" />
                  Send {sendForm.token}
                </Button>
              </CardContent>
            </Card>

            {/* Token Allocations */}
            <Card className="border-primary/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary">Token Allocations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Community Rewards", percentage: 35, allocated: 3500000000, color: "bg-primary" },
                  { name: "Liquidity Pool", percentage: 25, allocated: 2500000000, color: "bg-chart-2" },
                  { name: "Development", percentage: 10, allocated: 1000000000, color: "bg-chart-3" },
                  { name: "Marketing", percentage: 10, allocated: 1000000000, color: "bg-warning" },
                  { name: "Founders (4yr vest)", percentage: 20, allocated: 2000000000, color: "bg-success" },
                ].map((allocation, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{allocation.name}</span>
                      <span className="font-bold text-primary">{allocation.percentage}%</span>
                    </div>
                    <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                      <div className={`h-full ${allocation.color}`} style={{ width: `${allocation.percentage}%` }} />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatNumber(allocation.allocated)} TEOS allocated
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent mt-4"
                  onClick={() => window.open(TEOS_CONFIG.tokens.teos.solscan, "_blank")}
                >
                  View Token Contract
                  <ArrowUpRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "community" && communityStats && (
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Telegram */}
            <Card className="border-primary/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-primary">Telegram Community</CardTitle>
                  <Badge className={communityStats.telegram.active ? "bg-success/20 text-success" : "bg-muted"}>
                    {communityStats.telegram.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Members:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatNumber(communityStats.telegram.members)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">24h Growth:</span>
                  <span className="text-success font-bold">
                    <TrendingUp className="inline h-3 w-3 mr-1" />+{communityStats.telegram.growth24h}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  onClick={() => window.open(TEOS_CONFIG.civic.telegram, "_blank")}
                >
                  Open Telegram
                  <ArrowUpRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card className="border-chart-3/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-primary">WhatsApp Community</CardTitle>
                  <Badge className={communityStats.whatsapp.active ? "bg-success/20 text-success" : "bg-muted"}>
                    {communityStats.whatsapp.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subscribers:</span>
                  <span className="text-2xl font-bold text-chart-3">
                    {formatNumber(communityStats.whatsapp.subscribers)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">24h Growth:</span>
                  <span className="text-success font-bold">
                    <TrendingUp className="inline h-3 w-3 mr-1" />+{communityStats.whatsapp.growth24h}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-chart-3 text-chart-3 hover:bg-chart-3 hover:text-white bg-transparent"
                  onClick={() =>
                    window.open(`https://wa.me/${TEOS_CONFIG.contact.whatsapp.replace(/\s/g, "")}`, "_blank")
                  }
                >
                  Open WhatsApp
                  <ArrowUpRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            {/* Facebook */}
            <Card className="border-success/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-primary">Facebook Page</CardTitle>
                  <Badge className={communityStats.facebook.active ? "bg-success/20 text-success" : "bg-muted"}>
                    {communityStats.facebook.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Followers:</span>
                  <span className="text-2xl font-bold text-success">
                    {formatNumber(communityStats.facebook.followers)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">24h Growth:</span>
                  <span className="text-success font-bold">
                    <TrendingUp className="inline h-3 w-3 mr-1" />+{communityStats.facebook.growth24h}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-success text-success hover:bg-success hover:text-white bg-transparent"
                  onClick={() => window.open(TEOS_CONFIG.civic.facebook, "_blank")}
                >
                  Open Facebook
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Twitter/X */}
            <Card className="border-warning/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-primary">Twitter/X Profile</CardTitle>
                  <Badge className={communityStats.twitter.active ? "bg-success/20 text-success" : "bg-muted"}>
                    {communityStats.twitter.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Followers:</span>
                  <span className="text-2xl font-bold text-warning">
                    {formatNumber(communityStats.twitter.followers)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">24h Growth:</span>
                  <span className="text-success font-bold">
                    <TrendingUp className="inline h-3 w-3 mr-1" />+{communityStats.twitter.growth24h}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-warning text-warning hover:bg-warning hover:text-white bg-transparent"
                  onClick={() => window.open(TEOS_CONFIG.civic.twitter, "_blank")}
                >
                  Open Twitter/X
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Petition */}
            <Card className="border-primary/30 bg-card/80 backdrop-blur sm:col-span-2">
              <CardHeader>
                <CardTitle className="text-primary">Egypt Digital Currency Petition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      {formatNumber(communityStats.petition.signatures)}
                    </div>
                    <div className="text-sm text-muted-foreground">signatures</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-muted-foreground">
                      {formatNumber(communityStats.petition.goal)}
                    </div>
                    <div className="text-sm text-muted-foreground">goal</div>
                  </div>
                </div>

                <div className="h-3 bg-background/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-chart-3"
                    style={{
                      width: `${(communityStats.petition.signatures / communityStats.petition.goal) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress:</span>
                  <span className="font-bold text-primary">
                    {((communityStats.petition.signatures / communityStats.petition.goal) * 100).toFixed(2)}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">24h Growth:</span>
                  <span className="text-success font-bold">
                    <TrendingUp className="inline h-3 w-3 mr-1" />+{communityStats.petition.growth24h}
                  </span>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  onClick={() => window.open(TEOS_CONFIG.civic.petition, "_blank")}
                >
                  View Petition
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "audit" && (
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Smart Contract Audit */}
            <Card className="border-primary/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary">Smart Contract Audit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-warning/20 text-warning border-warning/30">
                    <Clock className="mr-1 h-3 w-3" />
                    In Progress
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Code review completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Vulnerability scan complete</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-warning" />
                    <span>Formal verification pending</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-warning" />
                    <span>Final report preparation</span>
                  </div>
                </div>

                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Auditor:</span>
                    <span className="font-bold">TBD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expected Completion:</span>
                    <span className="font-bold">Q2 2025</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  onClick={() => window.open(`https://solscan.io/account/${TEOS_CONFIG.smartContract}`, "_blank")}
                >
                  View Contract
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="border-success/30 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-primary">Security Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <span className="text-sm">Frontend Security</span>
                    <Badge className="bg-success/20 text-success border-success/30">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Complete
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <span className="text-sm">Pi Network Integration</span>
                    <Badge className="bg-success/20 text-success border-success/30">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <span className="text-sm">Solana Web3.js</span>
                    <Badge className="bg-success/20 text-success border-success/30">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Secure
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <span className="text-sm">Penetration Testing</span>
                    <Badge className="bg-warning/20 text-warning border-warning/30">
                      <Clock className="mr-1 h-3 w-3" />
                      Q3 2025
                    </Badge>
                  </div>
                </div>

                <div className="border-t border-border pt-3">
                  <h4 className="text-sm font-semibold text-primary mb-2">Bug Bounty Program</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Critical:</span>
                      <span className="font-bold text-destructive">10,000 TEOS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">High:</span>
                      <span className="font-bold text-warning">5,000 TEOS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medium:</span>
                      <span className="font-bold text-chart-3">1,000 TEOS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Low:</span>
                      <span className="font-bold text-success">250 TEOS</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Refresh Button */}
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={loadCommunityStats}
            disabled={isLoadingStats}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            {isLoadingStats ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Stats
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  )
}
