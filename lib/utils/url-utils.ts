export function generateShortCode(length = 6): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function formatUrl(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`
  }
  return url
}

export function isValidCustomCode(code: string): boolean {
  // Allow only alphanumeric characters, hyphens, and underscores
  const regex = /^[a-zA-Z0-9_-]+$/
  return regex.test(code) && code.length >= 3 && code.length <= 50
}

export function isLoopUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.toLowerCase()

    // Check if the URL points to our own domain
    return (
      hostname === "kratky.link" ||
      hostname === "www.kratky.link" ||
      hostname === "krátký.link" ||
      hostname === "www.krátký.link"
    )
  } catch {
    return false
  }
}
