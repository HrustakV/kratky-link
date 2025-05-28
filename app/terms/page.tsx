import { Link2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Podmínky použití",
  description: "Podmínky použití služby krátký.link - pravidla a omezení pro používání našeho zkracovače URL.",
}

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Podmínky použití</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">Poslední aktualizace: 1. ledna 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Přijetí podmínek</h2>
            <p className="text-gray-700">
              Používáním služby krátký.link souhlasíte s těmito podmínkami použití. Pokud s nimi nesouhlasíte,
              nepoužívejte naši službu.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Povolené použití</h2>
            <p className="text-gray-700 mb-4">Službu můžete používat pro:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Zkracování legitimních URL adres</li>
              <li>Sdílení odkazů na sociálních sítích</li>
              <li>Sledování statistik kliků na vaše odkazy</li>
              <li>Vytváření vlastních aliasů pro lepší zapamatování</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Zakázané použití</h2>
            <p className="text-gray-700 mb-4">Je zakázáno používat službu pro:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Šíření malware, virů nebo škodlivého obsahu</li>
              <li>Phishing nebo podvodné aktivity</li>
              <li>Spam nebo nevyžádanou poštu</li>
              <li>Porušování autorských práv</li>
              <li>Nezákonné aktivity jakéhokoli druhu</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Omezení odpovědnosti</h2>
            <p className="text-gray-700">
              Služba je poskytována "tak jak je" bez jakýchkoli záruk. Neneseme odpovědnost za škody způsobené
              používáním služby.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kontakt</h2>
            <p className="text-gray-700">
              Pro otázky ohledně podmínek použití nás kontaktujte na{" "}
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
