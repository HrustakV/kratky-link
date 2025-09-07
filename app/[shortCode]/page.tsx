import { createServerClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { headers } from "next/headers"
import { RedirectCountdown } from "@/components/redirect-countdown"
import type { Metadata } from "next"

interface PageProps {
  params: {
    shortCode: string
  }
}

async function trackClick(urlId: number, userAgent: string, referer: string, ipAddress: string) {
  const supabase = createServerClient()

  try {
    // Parse user agent for device info (simplified)
    const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent)
    const deviceType = isMobile ? "mobile" : "desktop"

    // Extract browser info (simplified)
    let browser = "unknown"
    if (userAgent.includes("Chrome")) browser = "Chrome"
    else if (userAgent.includes("Firefox")) browser = "Firefox"
    else if (userAgent.includes("Safari")) browser = "Safari"
    else if (userAgent.includes("Edge")) browser = "Edge"

    // Extract OS info (simplified)
    let os = "unknown"
    if (userAgent.includes("Windows")) os = "Windows"
    else if (userAgent.includes("Mac")) os = "macOS"
    else if (userAgent.includes("Linux")) os = "Linux"
    else if (userAgent.includes("Android")) os = "Android"
    else if (userAgent.includes("iOS")) os = "iOS"

    // Insert analytics record
    const { error: analyticsError } = await supabase.from("url_analytics").insert({
      url_id: urlId,
      ip_address: ipAddress,
      user_agent: userAgent,
      referer: referer || null,
      device_type: deviceType,
      browser: browser,
      os: os,
    })

    if (analyticsError) {
      console.error("Error inserting analytics:", analyticsError)
    }

    // Update click count using SQL increment
    const { error: updateError } = await supabase.rpc("increment_clicks", {
      url_id: urlId,
    })

    if (updateError) {
      console.error("Error incrementing clicks:", updateError)
      // Fallback to manual increment
      const { data: currentUrl } = await supabase.from("urls").select("clicks").eq("id", urlId).single()

      if (currentUrl) {
        await supabase
          .from("urls")
          .update({
            clicks: (currentUrl.clicks || 0) + 1,
            updated_at: new Date().toISOString(),
          })
          .eq("id", urlId)
      }
    }
  } catch (error) {
    console.error("Error tracking click:", error)
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { shortCode } = params

  return {
    title: `Přesměrování - ${shortCode}`,
    description: "Budete přesměrováni na cílovou stránku",
    robots: "noindex, nofollow",
  }
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortCode } = params
  const supabase = createServerClient()
  const headersList = headers()

  const userAgent = headersList.get("user-agent") || ""
  const referer = headersList.get("referer") || ""
  const forwardedFor = headersList.get("x-forwarded-for")
  const realIp = headersList.get("x-real-ip")
  const clientIp = forwardedFor?.split(",")[0] || realIp || "127.0.0.1"

  // Find URL by short code or custom code - but prioritize exact matches
  const { data: urlData, error } = await supabase
    .from("urls")
    .select("id, original_url, is_active, expires_at, short_code, custom_code")
    .or(`short_code.eq.${shortCode},custom_code.eq.${shortCode}`)
    .eq("is_active", true)
    .single()

  // Additional validation to ensure we have the right record
  if (urlData) {
    // If we're looking for a custom code, make sure it matches exactly
    const isCustomCode = urlData.custom_code === shortCode
    const isShortCode = urlData.short_code === shortCode

    if (!isCustomCode && !isShortCode) {
      notFound()
    }
  }

  if (error || !urlData) {
    notFound()
  }

  // Check if URL has expired
  if (urlData.expires_at && new Date(urlData.expires_at) < new Date()) {
    notFound()
  }

  // Track the click asynchronously
  trackClick(urlData.id, userAgent, referer, clientIp).catch(console.error)

  return <RedirectCountdown targetUrl={urlData.original_url} shortCode={shortCode} />
}
