import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "krátký.link - Rychlý a bezpečný zkracovač URL",
    template: "%s | krátký.link",
  },
  description:
    "Zkraťte své dlouhé odkazy jednoduše a rychle. Bezplatný český zkracovač URL s pokročilými funkcemi, statistikami a vlastními aliasy. Vytvořeno pro českou komunitu.",
  keywords: [
    "zkracovač url",
    "krátký odkaz",
    "url shortener",
    "český zkracovač",
    "zkrátit odkaz",
    "krátký.link",
    "kratky.link",
    "bezplatný zkracovač",
    "statistiky kliků",
    "vlastní alias",
  ],
  authors: [
    {
      name: "HrustakV",
      url: "https://github.com/HrustakV",
    },
  ],
  creator: "HrustakV",
  publisher: "PEARHOST.cz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kratky.link"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://kratky.link",
    title: "krátký.link - Rychlý a bezpečný zkracovač URL",
    description:
      "Zkraťte své dlouhé odkazy jednoduše a rychle. Bezplatný český zkracovač URL s pokročilými funkcemi a statistikami.",
    siteName: "krátký.link",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "krátký.link - Český zkracovač URL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "krátký.link - Rychlý a bezpečný zkracovač URL",
    description: "Zkraťte své dlouhé odkazy jednoduše a rychle. Bezplatný český zkracovač URL s pokročilými funkcemi.",
    images: ["/og-image.png"],
    creator: "@HrustakV",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="krátký.link" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "krátký.link",
              description: "Rychlý a bezpečný zkracovač URL pro českou komunitu",
              url: "https://kratky.link",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "CZK",
              },
              creator: {
                "@type": "Person",
                name: "HrustakV",
                url: "https://github.com/HrustakV",
              },
              provider: {
                "@type": "Organization",
                name: "PEARHOST.cz",
                url: "https://pearhost.cz",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
