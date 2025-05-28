"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Copy, ExternalLink, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { shortenUrl } from "@/app/actions/shorten-url"

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
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="url" className="text-lg font-medium">
                Vložte URL adresu
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/velmi-dlouhy-odkaz"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="mt-2 h-12 text-lg"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="custom" checked={useCustom} onCheckedChange={setUseCustom} />
              <Label htmlFor="custom" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Vlastní alias</span>
              </Label>
            </div>

            {useCustom && (
              <div>
                <Label htmlFor="custom-code" className="text-sm font-medium">
                  Vlastní alias (volitelné)
                </Label>
                <div className="mt-2 flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    kratky.link/
                  </span>
                  <Input
                    id="custom-code"
                    placeholder="muj-odkaz"
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value)}
                    className="rounded-l-none"
                    pattern="[a-zA-Z0-9_-]+"
                    title="Pouze písmena, čísla, pomlčky a podtržítka"
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Zkracuji..." : "Zkrátit odkaz"}
            </Button>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Váš zkrácený odkaz je připraven!</h3>
              <div className="flex items-center space-x-2 p-3 bg-white rounded border">
                <Input value={result.shortUrl} readOnly className="border-0 bg-transparent text-lg font-mono" />
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.shortUrl)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.open(result.shortUrl, "_blank")}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
