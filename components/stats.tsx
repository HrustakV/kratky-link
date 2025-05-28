"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link2, MousePointer, CalendarPlus, BarChart3 } from "lucide-react"

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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats")

        if (!response.ok) {
          throw new Error("Nepodařilo se načíst statistiky")
        }

        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching stats:", error)
        setError("Nepodařilo se načíst statistiky")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statItems = [
    {
      title: "Celkem odkazů",
      value: stats.totalUrls.toLocaleString("cs-CZ"),
      icon: Link2,
      color: "text-blue-600",
    },
    {
      title: "Celkem kliků",
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

  if (error) {
    return (
      <div>
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Statistiky platformy</h3>
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

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
