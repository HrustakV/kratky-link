"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link2, ExternalLink, ArrowRight, Shield, Clock } from "lucide-react"
import Link from "next/link"

interface RedirectCountdownProps {
  targetUrl: string
  shortCode: string
}

export function RedirectCountdown({ targetUrl, shortCode }: RedirectCountdownProps) {
  const [countdown, setCountdown] = useState(5)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true)
          window.location.href = targetUrl
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetUrl])

  const handleSkipCountdown = () => {
    setIsRedirecting(true)
    window.location.href = targetUrl
  }

  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }

  const truncateUrl = (url: string, maxLength = 60) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url
  }

  // Calculate progress percentage (0 to 100)
  const progress = ((5 - countdown) / 5) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 text-gray-900 dark:text-white hover:opacity-80 transition-all duration-300"
        >
          <Link2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="text-lg font-bold">krátký.link</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="max-w-2xl w-full mx-auto">
        <Card className="shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Countdown Circle */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-gray-700"></div>

              {/* Progress circle - only the border gets filled */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="text-blue-600 dark:text-blue-400 transition-all duration-1000 ease-linear"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 56}`,
                    strokeDashoffset: `${2 * Math.PI * 56 * (1 - progress / 100)}`,
                  }}
                />
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {isRedirecting ? (
                    <>
                      <Clock className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400 mx-auto" />
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Přesměrovávám...</div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{countdown}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">sekund</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Main Message */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isRedirecting ? "Přesměrovávám..." : "Budete přesměrováni"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Odkaz{" "}
                <code className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-sm font-mono">
                  kratky.link/{shortCode}
                </code>{" "}
                vás přesměruje na:
              </p>
            </div>

            {/* Target URL Display */}
            <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Cílová adresa:</span>
              </div>
              <div className="break-all">
                <p className="text-lg font-mono text-gray-900 dark:text-white mb-2">{truncateUrl(targetUrl)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Doména: <span className="font-medium">{getDomainFromUrl(targetUrl)}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleSkipCountdown}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                disabled={isRedirecting}
              >
                <ArrowRight className="h-5 w-5 mr-2" />
                Přejít nyní
              </Button>

              <Button
                variant="outline"
                onClick={() => window.open(targetUrl, "_blank")}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                disabled={isRedirecting}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Otevřít v novém okně
              </Button>
            </div>

            {/* Safety Notice */}
            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  Bezpečnostní upozornění
                </span>
              </div>
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                Vždy zkontrolujte cílovou adresu před pokračováním. Pokud vám připadá podezřelá, okno zavřete.
              </p>
            </div>

            {/* Branding */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Zkráceno pomocí{" "}
                <Link
                  href="/"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors duration-300"
                >
                  krátký.link
                </Link>{" "}
                - Rychlý a bezpečný zkracovač URL
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
