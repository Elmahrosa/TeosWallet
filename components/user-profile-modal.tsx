"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ProfileManager, type UserProfile } from "@/lib/profile"
import { Camera, User, Save, X } from "lucide-react"

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (profile: UserProfile) => void
  initialData?: {
    piUsername: string
    solanaAddress: string
    piAddress: string
  }
}

export function UserProfileModal({ isOpen, onClose, onSave, initialData }: UserProfileModalProps) {
  const [username, setUsername] = useState("")
  const [patientNumber, setPatientNumber] = useState("")
  const [bio, setBio] = useState("")
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onload = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!username.trim()) {
      alert("Username is required")
      return
    }

    if (!initialData) {
      alert("Wallet addresses not found")
      return
    }

    setIsSaving(true)

    try {
      const profile = await ProfileManager.createProfile({
        username: username.trim(),
        patientNumber: patientNumber.trim() || undefined,
        photo: photoFile || undefined,
        piUsername: initialData.piUsername,
        solanaAddress: initialData.solanaAddress,
        piAddress: initialData.piAddress,
      })

      if (bio.trim()) {
        await ProfileManager.updateProfile({ bio: bio.trim() })
      }

      onSave(profile)
      onClose()
    } catch (error) {
      console.error("[v0] Profile creation error:", error)
      alert("Failed to create profile")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/30 bg-card/95 backdrop-blur max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-primary flex items-center gap-2">
            <User className="h-5 w-5" />
            Complete Your Profile
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="h-32 w-32 rounded-full gradient-gold flex items-center justify-center cursor-pointer overflow-hidden border-4 border-primary/30 hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {photoPreview ? (
                <img src={photoPreview || "/placeholder.svg"} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <Camera className="h-12 w-12 text-primary-foreground" />
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Camera className="mr-2 h-4 w-4" />
              {photoPreview ? "Change Photo" : "Upload Photo"}
            </Button>
          </div>

          {/* Username */}
          <div>
            <Label htmlFor="username" className="text-primary">
              Username *
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 bg-background/50 border-primary/40"
            />
          </div>

          {/* Patient Number (Optional) */}
          <div>
            <Label htmlFor="patientNumber" className="text-primary flex items-center gap-2">
              Patient Number
              <Badge variant="outline" className="text-xs">
                Optional
              </Badge>
            </Label>
            <Input
              id="patientNumber"
              placeholder="For healthcare services"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
              className="mt-2 bg-background/50 border-primary/40"
            />
            <p className="text-xs text-muted-foreground mt-1">Required for Salma Unity Care Hospital integration</p>
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio" className="text-primary flex items-center gap-2">
              Bio
              <Badge variant="outline" className="text-xs">
                Optional
              </Badge>
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="mt-2 bg-background/50 border-primary/40"
            />
          </div>

          {/* Wallet Addresses Preview */}
          {initialData && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 space-y-2">
              <div className="text-xs text-muted-foreground">Your wallet addresses:</div>
              <div className="text-xs font-mono text-primary truncate">Solana: {initialData.solanaAddress}</div>
              <div className="text-xs font-mono text-primary truncate">Pi: {initialData.piAddress}</div>
            </div>
          )}

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={isSaving || !username.trim()}
            className="w-full gradient-gold text-primary-foreground h-12"
          >
            {isSaving ? (
              <>
                <Save className="mr-2 h-4 w-4 animate-spin" />
                Saving Profile...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Profile & Continue
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
