import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Link2, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <Link2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Odkaz nenalezen</h2>
          <p className="text-gray-600 mb-8">Omlouváme se, ale tento zkrácený odkaz neexistuje nebo již není aktivní.</p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Zpět na hlavní stránku
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zpět
            </Link>
          </Button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Zkontrolujte, zda jste zadali správný odkaz, nebo zkuste vytvořit nový na naší hlavní
            stránce.
          </p>
        </div>
      </div>
    </div>
  )
}
