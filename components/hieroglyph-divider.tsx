// Egyptian Hieroglyphic Section Divider

import { cn } from "@/lib/utils"

interface HieroglyphDividerProps {
  className?: string
  symbol?: string
}

export function HieroglyphDivider({ className, symbol = "𓇌" }: HieroglyphDividerProps) {
  return (
    <div className={cn("flex items-center gap-4 my-8", className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="text-3xl text-primary animate-pulse-pyramid">{symbol}</div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  )
}
