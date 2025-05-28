import { Link2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ochrana soukromí",
  description: "Zásady ochrany osobních údajů pro službu krátký.link - jak zpracováváme a chráníme vaše data.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link2 className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">krátký.link</span>
            </div>
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zpět na hlavní stránku
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Ochrana soukromí</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">Poslední aktualizace: 1. ledna 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Jaké údaje sbíráme</h2>
            <p className="text-gray-700 mb-4">Při používání služby krátký.link můžeme sbírat následující informace:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>URL adresy, které zkracujete</li>
              <li>IP adresu pro účely bezpečnosti a statistik</li>
              <li>Informace o prohlížeči a zařízení při kliknutí na zkrácený odkaz</li>
              <li>Datum a čas vytvoření a použití odkazů</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Jak údaje používáme</h2>
            <p className="text-gray-700 mb-4">Sbírané údaje používáme pro:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Poskytování a zlepšování našich služeb</li>
              <li>Generování anonymních statistik</li>
              <li>Ochranu před zneužitím a spam</li>
              <li>Technickou podporu a řešení problémů</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sdílení údajů</h2>
            <p className="text-gray-700">Vaše osobní údaje nesdílíme s třetími stranami, kromě případů kdy:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Je to vyžadováno zákonem</li>
              <li>Je to nutné pro ochranu našich práv nebo bezpečnosti</li>
              <li>Máme váš výslovný souhlas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kontakt</h2>
            <p className="text-gray-700">
              Pokud máte otázky ohledně ochrany soukromí, kontaktujte nás na{" "}
              <a href="https://github.com/HrustakV" className="text-blue-600 hover:underline">
                GitHub
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
