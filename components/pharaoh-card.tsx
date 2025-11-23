// Premium Glassmorphism Card Component with Golden Egyptian Border

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PharaohCardProps {
  children: ReactNode
  className?: string
  glowColor?: "gold" | "nile" | "teal"
  animated?: boolean
}

export function PharaohCard({ children, className, glowColor = "gold", animated = false }: PharaohCardProps) {
  const glowClasses = {
    gold: "border-primary/30 shadow-primary/10 hover:shadow-primary/20",
    nile: "border-secondary/30 shadow-secondary/10 hover:shadow-secondary/20",
    teal: "border-success/30 shadow-success/10 hover:shadow-success/20",
  }

  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-300",
        "hover:scale-[1.02] hover:border-opacity-60",
        glowClasses[glowColor],
        animated && "animate-glow-gold",
        className,
      )}
    >
      {children}
    </div>
  )
}
