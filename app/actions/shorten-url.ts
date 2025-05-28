"use server"

import { createServerClient } from "@/lib/supabase"
import { generateShortCode, isValidUrl, formatUrl, isValidCustomCode, isLoopUrl } from "@/lib/utils/url-utils"
import { headers } from "next/headers"

interface ShortenUrlParams {
  originalUrl: string
  customCode?: string
}

interface ShortenUrlResponse {
  success: boolean
  data?: {
    id: number
    shortCode: string
    originalUrl: string
  }
  error?: string
}

export async function shortenUrl({ originalUrl, customCode }: ShortenUrlParams): Promise<ShortenUrlResponse> {
  try {
    const supabase = createServerClient()
    const headersList = headers()
    const forwardedFor = headersList.get("x-forwarded-for")
    const realIp = headersList.get("x-real-ip")
    const clientIp = forwardedFor?.split(",")[0] || realIp || "127.0.0.1"

    // Validate URL
    if (!isValidUrl(originalUrl)) {
      return { success: false, error: "Neplatná URL adresa" }
    }

    const formattedUrl = formatUrl(originalUrl)

    // Check for loop URLs (prevent redirecting to our own domain)
    if (isLoopUrl(formattedUrl)) {
      return {
        success: false,
        error: "Nelze zkrátit odkaz, který již směřuje na krátký.link - to by způsobilo nekonečnou smyčku",
      }
    }

    // Validate custom code if provided
    if (customCode && !isValidCustomCode(customCode)) {
      return {
        success: false,
        error: "Vlastní alias musí obsahovat pouze písmena, čísla, pomlčky a podtržítka (3-50 znaků)",
      }
    }

    let shortCode = customCode
    let attempts = 0
    const maxAttempts = 10

    // Generate unique short code with better collision detection
    while (!shortCode && attempts < maxAttempts) {
      const generatedCode = generateShortCode(6)

      // Check both short_code and custom_code columns for conflicts
      const { data: existing } = await supabase
        .from("urls")
        .select("id")
        .or(`short_code.eq.${generatedCode},custom_code.eq.${generatedCode}`)
        .single()

      if (!existing) {
        shortCode = generatedCode
        break
      }
      attempts++
    }

    if (!shortCode) {
      return { success: false, error: "Nepodařilo se vygenerovat unikátní kód" }
    }

    // Check if custom code already exists (check both columns)
    if (customCode) {
      const { data: existing } = await supabase
        .from("urls")
        .select("id")
        .or(`short_code.eq.${customCode},custom_code.eq.${customCode}`)
        .single()

      if (existing) {
        return { success: false, error: "Tento alias již existuje" }
      }
    }

    // Insert new URL
    const { data, error } = await supabase
      .from("urls")
      .insert({
        original_url: formattedUrl,
        short_code: shortCode,
        custom_code: customCode || null,
        creator_ip: clientIp,
      })
      .select("id, short_code, original_url")
      .single()

    if (error) {
      console.error("Database error:", error)
      return { success: false, error: "Chyba při ukládání do databáze" }
    }

    return {
      success: true,
      data: {
        id: data.id,
        shortCode: data.short_code,
        originalUrl: data.original_url,
      },
    }
  } catch (error) {
    console.error("Shorten URL error:", error)
    return { success: false, error: "Neočekávaná chyba" }
  }
}
