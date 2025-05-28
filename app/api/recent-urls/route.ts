import { createServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: urls, error } = await supabase
      .from("urls")
      .select("id, original_url, short_code, custom_code, clicks, created_at, title")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      throw error
    }

    return NextResponse.json(urls || [])
  } catch (error) {
    console.error("Error fetching recent URLs:", error)
    return NextResponse.json({ error: "Nepodařilo se načíst nejnovější odkazy" }, { status: 500 })
  }
}
