import { UrlShortenerForm } from "@/components/url-shortener-form"
import { Stats } from "@/components/stats"
import { Link2, Zap, Shield, BarChart3, Github, ExternalLink } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "krátký.link - Rychlý a bezpečný zkracovač URL",
  description:
    "Zkraťte své dlouhé odkazy jednoduše a rychle. Bezplatný český zkracovač URL s pokročilými funkcemi, statistikami a vlastními aliasy.",
  openGraph: {
    title: "krátký.link - Rychlý a bezpečný zkracovač URL",
    description: "Zkraťte své dlouhé odkazy jednoduše a rychle. Bezplatný český zkracovač URL s pokročilými funkcemi.",
    url: "https://kratky.link",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "krátký.link - Rychlý a bezpečný zkracovač URL",
    description: "Zkraťte své dlouhé odkazy jednoduše a rychle. Bezplatný český zkracovač URL s pokročilými funkcemi.",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">krátký.link</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Funkce
              </a>
              <a href="#stats" className="text-gray-600 hover:text-gray-900 transition-colors">
                Statistiky
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Zkraťte své odkazy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              jednoduše
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Rychlý, bezpečný a spolehlivý zkracovač URL s pokročilými funkcemi a přehlednými statistikami.
          </p>

          <UrlShortenerForm />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Proč zvolit krátký.link?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Rychlé zkracování</h4>
              <p className="text-gray-600">Zkraťte své odkazy během vteřin s možností vlastních aliasů.</p>
            </div>
            <div className="text-center p-6">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Bezpečnost</h4>
              <p className="text-gray-600">Všechny odkazy jsou kontrolovány a chráněny před škodlivým obsahem.</p>
            </div>
            <div className="text-center p-6">
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Detailní statistiky</h4>
              <p className="text-gray-600">Sledujte počet kliků a využití vašich odkazů v přehledném rozhraní.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20">
        <div className="container mx-auto px-4">
          <Stats />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Link2 className="h-6 w-6" />
                <span className="text-xl font-bold">krátký.link</span>
              </div>
              <p className="text-gray-400 mb-4">Rychlý a bezpečný zkracovač URL pro českou komunitu.</p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-4">Užitečné odkazy</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Funkce
                  </a>
                </li>
                <li>
                  <a href="#stats" className="hover:text-white transition-colors">
                    Statistiky
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Ochrana soukromí
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors">
                    Podmínky použití
                  </a>
                </li>
              </ul>
            </div>

            {/* Attribution */}
            <div>
              <h3 className="font-semibold mb-4">O projektu</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Github className="h-4 w-4" />
                  <span>Vytvořil:</span>
                  <a
                    href="https://github.com/HrustakV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
                  >
                    <span>HrustakV</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Powered by:</span>
                  <a
                    href="https://pearhost.cz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
                  >
                    <span>PEARHOST.cz</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 krátký.link. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
