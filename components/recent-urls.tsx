"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface RecentUrl {
  id: number
  original_url: string
  short_code: string
  custom_code: string | null
  clicks: number
  created_at: string
  title: string | null
}

export function RecentUrls() {
  const [urls, setUrls] = useState<RecentUrl[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchRecentUrls() {
      try {
        const response = await fetch("/api/recent-urls")

        if (!response.ok) {
          throw new Error("Nepodařilo se načíst nejnovější odkazy")
        }

        const data = await response.json()
        setUrls(data)
      } catch (error) {
        console.error("Error fetching recent URLs:", error)
        setError("Nepodařilo se načíst nejnovější odkazy")
      }
    }

    fetchRecentUrls()
  }, [])

  const copyToClipboard = async (shortCode: string) => {
    const shortUrl = `https://kratky.link/${shortCode}`
    try {
      await navigator.clipboard.writeText(shortUrl)
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const truncateUrl = (url: string, maxLength = 50) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url
  }

  // Don't render anything until we have data or error
  if (!urls && !error) {
    return null
  }

  if (error) {
    return (
      <div>
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Nejnovější odkazy</h3>
        <div className="text-center py-12">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Nejnovější odkazy</h3>
      <div className="grid gap-4 max-w-4xl mx-auto">
        {urls &&
          urls.map((url, index) => (
            <Card
              key={url.id}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 hover:scale-102 opacity-0 animate-in fade-in-50 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <code className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-sm font-mono">
                        kratky.link/{url.custom_code || url.short_code}
                      </code>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {url.clicks} {url.clicks === 1 ? "klik" : url.clicks < 5 ? "kliky" : "kliků"}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm truncate" title={url.original_url}>
                      {truncateUrl(url.original_url)}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{formatDate(url.created_at)}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(url.custom_code || url.short_code)}
                      className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://kratky.link/${url.custom_code || url.short_code}`, "_blank")}
                      className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        {urls && urls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Zatím nebyly vytvořeny žádné odkazy.</p>
          </div>
        )}
      </div>
    </div>
  )
}
