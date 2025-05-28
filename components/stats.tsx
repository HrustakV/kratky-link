"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link2, MousePointer, CalendarPlus, BarChart3 } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface StatsData {
  totalUrls: number
  totalClicks: number
  todayUrls: number
  todayClicks: number
}

export function Stats() {
  const [stats, setStats] = useState<StatsData>({
    totalUrls: 0,
    totalClicks: 0,
    todayUrls: 0,
    todayClicks: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Get today's date range
        const today = new Date()
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000)

        // Get total URLs count
        const { count: totalUrls } = await supabase.from("urls").select("*", { count: "exact", head: true })

        // Get total clicks by summing all clicks from urls table
        const { data: urlsData } = await supabase.from("urls").select("clicks")
        const totalClicks = urlsData?.reduce((sum, url) => sum + (url.clicks || 0), 0) || 0

        // Get today's URLs count
        const { count: todayUrls } = await supabase
          .from("urls")
          .select("*", { count: "exact", head: true })
          .gte("created_at", todayStart.toISOString())
          .lt("created_at", todayEnd.toISOString())

        // Get today's clicks count
        const { count: todayClicks } = await supabase
          .from("url_analytics")
          .select("*", { count: "exact", head: true })
          .gte("clicked_at", todayStart.toISOString())
          .lt("clicked_at", todayEnd.toISOString())

        setStats({
          totalUrls: totalUrls || 0,
          totalClicks,
          todayUrls: todayUrls || 0,
          todayClicks: todayClicks || 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statItems = [
    {
      title: "Všechny odkazy",
      value: stats.totalUrls.toLocaleString("cs-CZ"),
      icon: Link2,
      color: "text-blue-600",
    },
    {
      title: "Všechny kliky",
      value: stats.totalClicks.toLocaleString("cs-CZ"),
      icon: MousePointer,
      color: "text-green-600",
    },
    {
      title: "Dnešní odkazy",
      value: stats.todayUrls.toLocaleString("cs-CZ"),
      icon: CalendarPlus,
      color: "text-purple-600",
    },
    {
      title: "Dnešní kliky",
      value: stats.todayClicks.toLocaleString("cs-CZ"),
      icon: BarChart3,
      color: "text-orange-600",
    },
  ]

  return (
    <div>
      <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Statistiky platformy</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{item.title}</CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? "..." : item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
