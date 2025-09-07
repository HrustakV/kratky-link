"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link2, MousePointer, CalendarPlus, BarChart3 } from "lucide-react"
import { AnimatedCounter } from "@/components/animated-counter"

interface StatsData {
  totalUrls: number
  totalClicks: number
  todayUrls: number
  todayClicks: number
}

export function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null)
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
      }
    }

    fetchStats()
  }, [])

  // Don't render anything until we have data or error
  if (!stats && !error) {
    return null
  }

  const statItems = [
    {
      title: "Celkem odkazů",
      value: stats?.totalUrls || 0,
      icon: Link2,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      title: "Celkem kliků",
      value: stats?.totalClicks || 0,
      icon: MousePointer,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      title: "Dnešní odkazy",
      value: stats?.todayUrls || 0,
      icon: CalendarPlus,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      title: "Dnešní kliky",
      value: stats?.todayClicks || 0,
      icon: BarChart3,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
  ]

  if (error) {
    return (
      <div>
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Statistiky platformy</h3>
        <div className="text-center py-12">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Statistiky platformy</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <Card
            key={index}
            className={`border-0 shadow-lg ${item.bgColor} ${item.borderColor} border transition-all duration-300 hover:shadow-xl hover:scale-105 group`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.title}</CardTitle>
              <item.icon className={`h-4 w-4 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${item.color}`}>
                <AnimatedCounter end={item.value} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
