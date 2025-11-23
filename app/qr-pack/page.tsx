import { QRCodePack } from "@/components/qr-code-pack"

export default function QRPackPage() {
  return (
    <div className="min-h-screen bg-gradient-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <QRCodePack />
      </div>
    </div>
  )
}
