"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Copy, ExternalLink, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { shortenUrl } from "@/app/actions/shorten-url"
import { QRCodeGenerator } from "@/components/qr-code-generator"

export function UrlShortenerForm() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [customCode, setCustomCode] = useState("")
  const [useCustom, setUseCustom] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ shortUrl: string; shortCode: string } | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!originalUrl.trim()) return

    setIsLoading(true)
    try {
      const response = await shortenUrl({
        originalUrl: originalUrl.trim(),
        customCode: useCustom ? customCode.trim() : undefined,
      })

      if (response.success && response.data) {
        setResult({
          shortUrl: `https://kratky.link/${response.data.shortCode}`,
          shortCode: response.data.shortCode,
        })
        toast({
          title: "Úspěch!",
          description: "Odkaz byl úspěšně zkrácen.",
        })
      } else {
        toast({
          title: "Chyba",
          description: response.error || "Něco se pokazilo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se zkrátit odkaz.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Zkopírováno!",
        description: "Odkaz byl zkopírován do schránky.",
      })
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se zkopírovat odkaz.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-colors duration-300">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="url" className="text-lg font-medium text-gray-900 dark:text-white">
                Vložte URL adresu
              </Label>

              {/* Desktop Input - hidden on mobile */}
              <Input
                id="url-desktop"
                type="url"
                placeholder="https://example.cz/velmi-dlouhy-odkaz"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="mt-2 h-12 text-lg hidden sm:block bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                required
              />

              {/* Mobile Textarea - hidden on desktop */}
              <Textarea
                id="url-mobile"
                placeholder="https://example.cz/velmi-dlouhy-odkaz-ktery-potrebuje-zkraceni"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="mt-2 text-base resize-none block sm:hidden bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                rows={3}
                required
              />

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Vložte dlouhý odkaz, který chcete zkrátit</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="custom" checked={useCustom} onCheckedChange={setUseCustom} />
              <Label htmlFor="custom" className="flex items-center space-x-2 text-gray-900 dark:text-white">
                <Settings className="h-4 w-4" />
                <span>Vlastní alias</span>
              </Label>
            </div>

            {useCustom && (
              <div>
                <Label htmlFor="custom-code" className="text-sm font-medium text-gray-900 dark:text-white">
                  Vlastní alias (volitelné)
                </Label>
                <div className="mt-2 flex flex-col sm:flex-row">
                  <span className="inline-flex items-center px-3 py-2 rounded-t-md sm:rounded-l-md sm:rounded-t-none border border-b-0 sm:border-b sm:border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                    kratky.link/
                  </span>
                  <Input
                    id="custom-code"
                    placeholder="muj-odkaz"
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value)}
                    className="rounded-t-none sm:rounded-l-none sm:rounded-t-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    pattern="[a-zA-Z0-9_-]+"
                    title="Pouze písmena, čísla, pomlčky a podtržítka"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  3-50 znaků, pouze písmena, čísla, pomlčky a podtržítka
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Zkracuji..." : "Zkrátit odkaz"}
            </Button>
          </form>

          {result && (
            <div className="mt-8 space-y-6">
              {/* URL Result */}
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4">
                  Váš zkrácený odkaz je připraven!
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-green-700 dark:text-green-300 mb-2 block">
                      Zkrácený odkaz:
                    </Label>

                    {/* Desktop - single line input */}
                    <div className="hidden sm:flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700">
                      <Input
                        value={result.shortUrl}
                        readOnly
                        className="border-0 bg-transparent text-lg font-mono flex-1 text-gray-900 dark:text-white"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(result.shortUrl)}
                        className="border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(result.shortUrl, "_blank")}
                        className="border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Mobile - textarea with buttons below */}
                    <div className="block sm:hidden space-y-2">
                      <Textarea
                        value={result.shortUrl}
                        readOnly
                        className="bg-white dark:bg-gray-800 border-green-200 dark:border-green-700 text-base font-mono resize-none text-gray-900 dark:text-white"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(result.shortUrl)}
                          className="flex-1 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Kopírovat
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(result.shortUrl, "_blank")}
                          className="flex-1 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Otevřít
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-green-600 dark:text-green-300 bg-green-100 dark:bg-green-900/30 p-3 rounded">
                    <strong>Tip:</strong> Zkrácený odkaz můžete sdílet na sociálních sítích, v e-mailech nebo kdekoli
                    potřebujete kratší URL.
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <QRCodeGenerator url={result.shortUrl} shortCode={result.shortCode} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
