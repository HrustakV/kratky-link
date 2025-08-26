import { UrlShortenerForm } from "@/components/url-shortener-form"
import { Stats } from "@/components/stats"
import { ThemeToggle } from "@/components/theme-toggle"
import { TypingAnimation } from "@/components/typing-animation"
import { FadeInSection } from "@/components/fade-in-section"
import { Link2, Zap, Shield, BarChart3, Github, ExternalLink, Eye, Users, Globe, CheckCircle } from "lucide-react"
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
  const typingWords = ["jednoduše", "rychle", "bezpečně", "transparentně", "zdarma"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 group">
              <Link2 className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-500" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">krátký.link</h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-6">
                <a
                  href="#features"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Funkce
                </a>
                <a
                  href="#stats"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Statistiky
                </a>
                <a
                  href="#about"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-105"
                >
                  O nás
                </a>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <TypingAnimation words={typingWords} baseText="Zkraťte své odkazy" className="block" />
            </h2>
          </FadeInSection>

          <FadeInSection delay={600}>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Rychlý, bezpečný a transparentní zkracovač URL s pokročilými funkcemi, přehlednými statistikami a QR kódy.
              Vytvořeno speciálně pro českou komunitu s důrazem na jednoduchost a spolehlivost.
            </p>
          </FadeInSection>

          <FadeInSection delay={900}>
            <UrlShortenerForm />
          </FadeInSection>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
              Proč zvolit krátký.link?
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Náš zkracovač URL nabízí všechny funkce, které potřebujete pro efektivní správu vašich odkazů.
              Transparentní, bezpečný a vždy zdarma.
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeInSection delay={200}>
              <div className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <Zap className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-semibold mb-2 dark:text-white">Rychlé zkracování</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Zkraťte své odkazy během vteřin s možností vlastních aliasů a okamžitým generováním QR kódů.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={300}>
              <div className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <Shield className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-semibold mb-2 dark:text-white">Bezpečnost</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Všechny odkazy jsou kontrolovány a chráněny před škodlivým obsahem. Transparentní přesměrování s
                  náhledem cíle.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={400}>
              <div className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <BarChart3 className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-semibold mb-2 dark:text-white">Detailní statistiky</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Sledujte počet kliků, geografické údaje a využití vašich odkazů v přehledném rozhraní.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={500}>
              <div className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <Eye className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-semibold mb-2 dark:text-white">Transparentnost</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Před přesměrováním vidíte cílovou adresu. Žádné skryté odkazy nebo podvodné praktiky.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <Stats />
          </FadeInSection>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeInSection>
              <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                O službě krátký.link
              </h3>
            </FadeInSection>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeInSection delay={200}>
                <div>
                  <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Český zkracovač URL pro moderní web
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    krátký.link je moderní služba pro zkracování URL adres vytvořená speciálně pro českou komunitu.
                    Naším cílem je poskytovat rychlý, bezpečný a transparentní způsob sdílení odkazů na internetu.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Služba je zcela zdarma a bez reklam. Věříme v transparentní přístup - před každým přesměrováním
                    uživatel vidí, kam bude odkaz směřovat. Tím eliminujeme riziko škodlivých nebo podvodných odkazů.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 slide-in-delayed" style={{ animationDelay: "0.3s" }}>
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-gray-700 dark:text-gray-300">100% zdarma bez skrytých poplatků</span>
                    </div>
                    <div className="flex items-center space-x-3 slide-in-delayed" style={{ animationDelay: "0.5s" }}>
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-gray-700 dark:text-gray-300">Transparentní přesměrování s náhledem</span>
                    </div>
                    <div className="flex items-center space-x-3 slide-in-delayed" style={{ animationDelay: "0.7s" }}>
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-gray-700 dark:text-gray-300">Vlastní aliasy a QR kódy</span>
                    </div>
                    <div className="flex items-center space-x-3 slide-in-delayed" style={{ animationDelay: "0.9s" }}>
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-gray-700 dark:text-gray-300">Detailní statistiky a analytics</span>
                    </div>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection delay={400}>
                <div className="space-y-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform duration-300">
                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                    <h5 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">Pro komunitu</h5>
                    <p className="text-blue-800 dark:text-blue-300 text-sm">
                      Vytvořeno českou komunitou pro českou komunitu. Podporujeme lokální projekty a open-source vývoj.
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800 hover:scale-105 transition-transform duration-300">
                    <Globe className="h-8 w-8 text-green-600 dark:text-green-400 mb-4" />
                    <h5 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">
                      Globální dostupnost
                    </h5>
                    <p className="text-green-800 dark:text-green-300 text-sm">
                      Rychlé servery a CDN zajišťují okamžité přesměrování odkazu kdekoli na světě.
                    </p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800 hover:scale-105 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-4" />
                    <h5 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-2">
                      Ochrana soukromí
                    </h5>
                    <p className="text-purple-800 dark:text-purple-300 text-sm">
                      Respektujeme vaše soukromí. Sbíráme pouze nezbytné údaje pro fungování služby.
                    </p>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Kdy použít krátký.link?
            </h3>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FadeInSection delay={200}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sociální sítě</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Zkraťte dlouhé odkazy pro Twitter, Facebook, Instagram a další platformy. Ušetříte místo a odkazy
                  budou vypadat profesionálně.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Twitter příspěvky</li>
                  <li>• Instagram bio odkazy</li>
                  <li>• Facebook sdílení</li>
                </ul>
              </div>
            </FadeInSection>

            <FadeInSection delay={300}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Marketing a reklama</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Sledujte efektivitu vašich marketingových kampaní pomocí detailních statistik. Vlastní aliasy pro
                  lepší zapamatování značky.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Email kampaně</li>
                  <li>• Tištěné materiály</li>
                  <li>• QR kódy na plakátech</li>
                </ul>
              </div>
            </FadeInSection>

            <FadeInSection delay={400}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Firemní použití</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Profesionální zkracování odkazů pro firemní komunikaci. Transparentní přesměrování buduje důvěru u
                  vašich klientů.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Firemní newslettery</li>
                  <li>• Prezentace a dokumenty</li>
                  <li>• Zákaznická podpora</li>
                </ul>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <FadeInSection>
              <div>
                <div className="flex items-center space-x-2 mb-4 group">
                  <Link2 className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-xl font-bold">krátký.link</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Rychlý, bezpečný a transparentní zkracovač URL pro českou komunitu. Zdarma a bez reklam.
                </p>
                <p className="text-sm text-gray-500">Vytvořeno s ❤️ v České republice</p>
              </div>
            </FadeInSection>

            {/* Features */}
            <FadeInSection delay={100}>
              <div>
                <h3 className="font-semibold mb-4">Funkce</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="hover:text-white transition-colors duration-300 cursor-default">
                    Rychlé zkracování URL
                  </li>
                  <li className="hover:text-white transition-colors duration-300 cursor-default">Vlastní aliasy</li>
                  <li className="hover:text-white transition-colors duration-300 cursor-default">QR kódy</li>
                  <li className="hover:text-white transition-colors duration-300 cursor-default">
                    Detailní statistiky
                  </li>
                  <li className="hover:text-white transition-colors duration-300 cursor-default">
                    Transparentní přesměrování
                  </li>
                </ul>
              </div>
            </FadeInSection>

            {/* Links */}
            <FadeInSection delay={200}>
              <div>
                <h3 className="font-semibold mb-4">Užitečné odkazy</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#features"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Funkce
                    </a>
                  </li>
                  <li>
                    <a
                      href="#stats"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Statistiky
                    </a>
                  </li>
                  <li>
                    <a
                      href="/privacy"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Ochrana soukromí
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      Podmínky použití
                    </a>
                  </li>
                </ul>
              </div>
            </FadeInSection>

            {/* Attribution */}
            <FadeInSection delay={300}>
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
                      className="text-blue-400 hover:text-blue-300 transition-all duration-300 flex items-center space-x-1 hover:scale-105"
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
                      className="text-blue-400 hover:text-blue-300 transition-all duration-300 flex items-center space-x-1 hover:scale-105"
                    >
                      <span>PEARHOST.cz</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>

          <FadeInSection delay={400}>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>© 2025 krátký.link. Všechna práva vyhrazena. Služba je poskytována transparentně a zdarma.</p>
            </div>
          </FadeInSection>
        </div>
      </footer>
    </div>
  )
}
