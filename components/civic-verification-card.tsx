"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ExternalLink, AlertCircle } from "lucide-react"
import { VerificationManager } from "@/lib/verification"
import { TEOS_CONFIG } from "@/lib/teos-config"

export function CivicVerificationCard() {
  const [status, setStatus] = useState(VerificationManager.getStatus())
  const civic = status.civicVerified

  const handleVerify = (field: "petition" | "telegram" | "facebook" | "twitter", url: string) => {
    window.open(url, "_blank")
    // In production, this would verify through API
    setTimeout(() => {
      VerificationManager.updateCivicVerification(field, true)
      setStatus(VerificationManager.getStatus())
    }, 1000)
  }

  const progress = VerificationManager.getCivicCompletionStatus()
  const allComplete = progress.percentage === 100

  return (
    <Card className="border-primary/30 bg-card/80 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary">Civic Verification</CardTitle>
          <Badge variant={allComplete ? "default" : "outline"} className={allComplete ? "bg-success text-white" : ""}>
            {progress.completed}/{progress.total} Complete
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {!allComplete && (
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 flex items-start gap-2 mb-4">
            <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80">Complete all civic steps to unlock swap and mining features</p>
          </div>
        )}

        <div className="space-y-2">
          <div
            className={`flex items-center justify-between p-3 rounded-lg border ${civic.petition ? "bg-success/10 border-success/30" : "bg-muted/50 border-border"}`}
          >
            <div className="flex items-center gap-2">
              {civic.petition ? (
                <Check className="h-5 w-5 text-success" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
              )}
              <span className="text-sm font-medium">Sign TEOS Petition</span>
            </div>
            {!civic.petition && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs bg-transparent"
                onClick={() => handleVerify("petition", TEOS_CONFIG.civic.petition)}
              >
                Sign <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-lg border ${civic.telegram ? "bg-success/10 border-success/30" : "bg-muted/50 border-border"}`}
          >
            <div className="flex items-center gap-2">
              {civic.telegram ? (
                <Check className="h-5 w-5 text-success" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
              )}
              <span className="text-sm font-medium">Join Telegram</span>
            </div>
            {!civic.telegram && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs bg-transparent"
                onClick={() => handleVerify("telegram", TEOS_CONFIG.civic.telegram)}
              >
                Join <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-lg border ${civic.facebook ? "bg-success/10 border-success/30" : "bg-muted/50 border-border"}`}
          >
            <div className="flex items-center gap-2">
              {civic.facebook ? (
                <Check className="h-5 w-5 text-success" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
              )}
              <span className="text-sm font-medium">Follow Facebook</span>
            </div>
            {!civic.facebook && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs bg-transparent"
                onClick={() => handleVerify("facebook", TEOS_CONFIG.civic.facebook)}
              >
                Follow <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-lg border ${civic.twitter ? "bg-success/10 border-success/30" : "bg-muted/50 border-border"}`}
          >
            <div className="flex items-center gap-2">
              {civic.twitter ? (
                <Check className="h-5 w-5 text-success" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
              )}
              <span className="text-sm font-medium">Follow X (Twitter)</span>
            </div>
            {!civic.twitter && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs bg-transparent"
                onClick={() => handleVerify("twitter", TEOS_CONFIG.civic.twitter)}
              >
                Follow <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {allComplete && (
          <div className="bg-success/10 border border-success/30 rounded-lg p-3 text-center mt-4">
            <Check className="h-6 w-6 text-success mx-auto mb-2" />
            <p className="text-sm font-bold text-success">Civic Verification Complete!</p>
            <p className="text-xs text-muted-foreground mt-1">You can now access all wallet features</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
