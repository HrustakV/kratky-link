import { createServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createServerClient()

    // Get today's date range
    const today = new Date()
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000)

    // Get total URLs count
    const { count: totalUrls } = await supabase
      .from("urls")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)

    // Get total clicks by summing all clicks from urls table
    const { data: urlsData } = await supabase.from("urls").select("clicks").eq("is_active", true)

    const totalClicks = urlsData?.reduce((sum, url) => sum + (url.clicks || 0), 0) || 0

    // Get today's URLs count
    const { count: todayUrls } = await supabase
      .from("urls")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .gte("created_at", todayStart.toISOString())
      .lt("created_at", todayEnd.toISOString())

    // Get today's clicks count from analytics table
    const { count: todayClicks } = await supabase
      .from("url_analytics")
      .select("*", { count: "exact", head: true })
      .gte("clicked_at", todayStart.toISOString())
      .lt("clicked_at", todayEnd.toISOString())

    const stats = {
      totalUrls: totalUrls || 0,
      totalClicks,
      todayUrls: todayUrls || 0,
      todayClicks: todayClicks || 0,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Nepodařilo se načíst statistiky" }, { status: 500 })
  }
}
