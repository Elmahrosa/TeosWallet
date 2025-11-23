"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProfileManager } from "@/lib/profile"
import { FaXTwitter, FaTelegram, FaGithub, FaLinkedin } from "react-icons/fa6"

export function FounderProfileCard() {
  const founder = ProfileManager.getFounderProfile()

  return (
    <Card className="border-primary/30 bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <span className="text-2xl">𓀔</span>
          Meet the Founder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="h-24 w-24 rounded-full gradient-gold flex items-center justify-center text-4xl font-bold shrink-0 overflow-hidden">
            {founder.photoURL ? (
              <img
                src={founder.photoURL || "/placeholder.svg"}
                alt={founder.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>𓀔</span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary">{founder.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{founder.title}</p>
            <Badge className="bg-primary/20 text-primary border-primary/30">Founder</Badge>
          </div>
        </div>

        <p className="text-sm text-foreground leading-relaxed">{founder.bio}</p>

        <div className="grid grid-cols-2 gap-2">
          {founder.social.twitter && (
            <Button
              variant="outline"
              size="sm"
              className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground gap-2 bg-transparent"
              onClick={() => window.open(founder.social.twitter, "_blank")}
            >
              <FaXTwitter className="h-4 w-4" />
              Twitter
            </Button>
          )}
          {founder.social.telegram && (
            <Button
              variant="outline"
              size="sm"
              className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground gap-2 bg-transparent"
              onClick={() => window.open(founder.social.telegram, "_blank")}
            >
              <FaTelegram className="h-4 w-4" />
              Telegram
            </Button>
          )}
          {founder.social.github && (
            <Button
              variant="outline"
              size="sm"
              className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground gap-2 bg-transparent"
              onClick={() => window.open(founder.social.github, "_blank")}
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </Button>
          )}
          {founder.social.linkedin && (
            <Button
              variant="outline"
              size="sm"
              className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground gap-2 bg-transparent"
              onClick={() => window.open(founder.social.linkedin, "_blank")}
            >
              <FaLinkedin className="h-4 w-4" />
              LinkedIn
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
