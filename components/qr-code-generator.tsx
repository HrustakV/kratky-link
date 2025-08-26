"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, QrCode, AlertCircle } from "lucide-react"

interface QRCodeGeneratorProps {
  url: string
  shortCode: string
}

export function QRCodeGenerator({ url, shortCode }: QRCodeGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [qrSvg, setQrSvg] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    generateQRCode()
  }, [url])

  const generateQRCode = async () => {
    setIsGenerating(true)
    setError(null)
    setQrSvg("")

    try {
      // Dynamic import of QRCode
      const QRCode = (await import("qrcode")).default

      // Generate QR code as SVG string
      const svgString = await QRCode.toString(url, {
        type: "svg",
        width: 280,
        margin: 2,
        color: {
          dark: "#1e40af",
          light: "#ffffff",
        },
        errorCorrectionLevel: "M",
      })

      setQrSvg(svgString)
    } catch (err) {
      setError("Nepodařilo se vygenerovat QR kód")
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQRCode = async () => {
    if (!qrSvg) return

    try {
      // Create canvas for download
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const size = 280
      const padding = 40
      const brandingHeight = 60
      const finalSize = size + padding * 2

      canvas.width = finalSize
      canvas.height = finalSize + brandingHeight

      // White background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Convert SVG to image and draw on canvas
      const img = new Image()
      const svgBlob = new Blob([qrSvg], { type: "image/svg+xml;charset=utf-8" })
      const url = URL.createObjectURL(svgBlob)

      img.onload = () => {
        // Draw QR code
        ctx.drawImage(img, padding, padding, size, size)

        // Add branding text below
        ctx.fillStyle = "#1e40af"
        ctx.font = "bold 18px Arial"
        ctx.textAlign = "center"
        ctx.fillText("krátký.link", finalSize / 2, finalSize + 30)

        ctx.fillStyle = "#6b7280"
        ctx.font = "14px Arial"
        ctx.fillText(`/${shortCode}`, finalSize / 2, finalSize + 50)

        // Download
        const link = document.createElement("a")
        link.download = `kratky-link-${shortCode}.png`
        link.href = canvas.toDataURL("image/png", 1.0)
        link.click()

        // Cleanup
        URL.revokeObjectURL(url)
      }

      img.src = url
    } catch (err) {
      // Silent error handling
    }
  }

  const retryGeneration = () => {
    generateQRCode()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <QrCode className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">QR kód</h3>
      </div>

      <div className="text-center">
        <div className="inline-block p-4 bg-white rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
          {isGenerating ? (
            <div className="w-[280px] h-[280px] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Generuji QR kód...</p>
              </div>
            </div>
          ) : error ? (
            <div className="w-[280px] h-[280px] flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <p className="text-sm text-red-600 mb-4">{error}</p>
                <Button onClick={retryGeneration} variant="outline" size="sm">
                  Zkusit znovu
                </Button>
              </div>
            </div>
          ) : qrSvg ? (
            <div
              className="w-[280px] h-[280px] border border-gray-100 rounded overflow-hidden"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          ) : (
            <div className="w-[280px] h-[280px] flex items-center justify-center text-gray-500">
              <div className="text-center">
                <QrCode className="h-16 w-16 mx-auto mb-2" />
                <p className="text-sm">Připravuji QR kód...</p>
              </div>
            </div>
          )}
        </div>

        <Button
          onClick={downloadQRCode}
          disabled={isGenerating || !qrSvg}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
        >
          <Download className="h-4 w-4 mr-2" />
          {isGenerating ? "Generuji..." : "Stáhnout QR kód"}
        </Button>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          QR kód pro: <span className="font-mono break-all">{url}</span>
        </p>
      </div>
    </div>
  )
}
