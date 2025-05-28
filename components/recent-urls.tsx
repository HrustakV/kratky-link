"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
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
  const [urls, setUrls] = useState<RecentUrl[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchRecentUrls() {
      try {
        const { data, error } = await supabase
          .from("urls")
          .select("id, original_url, short_code, custom_code, clicks, created_at, title")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(10)

        if (error) throw error
        setUrls(data || [])
      } catch (error) {
        console.error("Error fetching recent URLs:", error)
      } finally {
        setIsLoading(false)
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

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Načítám nejnovější odkazy...</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Nejnovější odkazy</h3>
      <div className="grid gap-4 max-w-4xl mx-auto">
        {urls.map((url) => (
          <Card key={url.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">
                      kratky.link/{url.custom_code || url.short_code}
                    </code>
                    <Badge variant="secondary" className="text-xs">
                      {url.clicks} {url.clicks === 1 ? "klik" : url.clicks < 5 ? "kliky" : "kliků"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm truncate" title={url.original_url}>
                    {truncateUrl(url.original_url)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(url.created_at)}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(url.custom_code || url.short_code)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://kratky.link/${url.custom_code || url.short_code}`, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {urls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Zatím nebyly vytvořeny žádné odkazy.</p>
          </div>
        )}
      </div>
    </div>
  )
}
