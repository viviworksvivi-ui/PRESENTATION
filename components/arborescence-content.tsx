"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Info, Trash2, Download } from "lucide-react"

interface PageCard {
  id: string
  title: string
  description: string
  subPages: number
  isFixed: boolean
}

export function ArborescenceContent() {
  const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set())
  const [bannerInfo, setBannerInfo] = useState({
    left: "",
    center: "",
    right: "",
  })
  const [selectedSuggestion, setSelectedSuggestion] = useState("none")
  const [pages, setPages] = useState<PageCard[]>([
    { id: "accueil", title: "Accueil", description: "", subPages: 0, isFixed: true },
    { id: "page1", title: "", description: "", subPages: 0, isFixed: false },
    { id: "page2", title: "", description: "", subPages: 0, isFixed: false },
    { id: "contact", title: "Contact", description: "", subPages: 0, isFixed: true },
  ])

  const languages = [
    { code: "de", flag: "🇩🇪", name: "Allemand" },
    { code: "en", flag: "🇬🇧", name: "Anglais" },
    { code: "it", flag: "🇮🇹", name: "Italien" },
  ]

  const toggleLanguage = (code: string) => {
    const newSelected = new Set(selectedLanguages)
    if (newSelected.has(code)) {
      newSelected.delete(code)
    } else {
      newSelected.add(code)
    }
    setSelectedLanguages(newSelected)
  }

  const updateBannerInfo = (position: "left" | "center" | "right", value: string) => {
    if (value.length <= 255) {
      setBannerInfo((prev) => ({ ...prev, [position]: value }))
    }
  }

  const updatePage = (id: string, field: "title" | "description" | "subPages", value: string | number) => {
    setPages((prev) => prev.map((page) => (page.id === id ? { ...page, [field]: value } : page)))
  }

  const addPage = () => {
    const newPage: PageCard = {
      id: `page${Date.now()}`,
      title: "",
      description: "",
      subPages: 0,
      isFixed: false,
    }
    setPages((prev) => [...prev, newPage])
  }

  const removePage = (id: string) => {
    setPages((prev) => prev.filter((page) => page.id !== id))
  }

  const getTotalCharacters = () => {
    return bannerInfo.left.length + bannerInfo.center.length + bannerInfo.right.length
  }

  const downloadAsPDF = () => {
    // Créer le contenu HTML pour le PDF
    const content = `
      <html>
        <head>
          <title>Arborescence du Site</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
            h2 { color: #374151; margin-top: 20px; }
            .section { margin-bottom: 20px; }
            .banner-info { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 10px 0; }
            .page-card { border: 1px solid #d1d5db; padding: 15px; margin: 10px 0; border-radius: 8px; }
            .languages { margin: 10px 0; }
            .language { display: inline-block; margin-right: 15px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; }
            th { background: #f9fafb; }
          </style>
        </head>
        <body>
          <h1>Arborescence du Site Web</h1>
          
          <div class="section">
            <h2>Versions linguistiques souhaitées</h2>
            <div class="languages">
              ${Array.from(selectedLanguages).map(code => {
                const lang = languages.find(l => l.code === code)
                return lang ? `<span class="language">${lang.flag} ${lang.name}</span>` : ''
              }).join('')}
              ${selectedLanguages.size === 0 ? 'Aucune version étrangère sélectionnée' : ''}
            </div>
          </div>

          <div class="section">
            <h2>Informations du bandeau</h2>
            <div class="banner-info">
              <strong>À gauche:</strong> ${bannerInfo.left || 'Non renseigné'}<br>
              <strong>Au centre:</strong> ${bannerInfo.center || 'Non renseigné'}<br>
              <strong>À droite:</strong> ${bannerInfo.right || 'Non renseigné'}<br>
              <em>Caractères utilisés: ${getTotalCharacters()}/255</em>
            </div>
          </div>

          <div class="section">
            <h2>Suggestion d'arborescence</h2>
            <p>${selectedSuggestion === 'none' ? 'Aucune suggestion sélectionnée' : 
              selectedSuggestion === 'vitrine' ? 'Site vitrine classique' :
              selectedSuggestion === 'ecommerce' ? 'Site e-commerce' :
              selectedSuggestion === 'blog' ? 'Blog/Actualités' :
              selectedSuggestion === 'portfolio' ? 'Portfolio' : 'Autre'}</p>
          </div>

          <div class="section">
            <h2>Pages du site</h2>
            <table>
              <thead>
                <tr>
                  <th>Titre de la page</th>
                  <th>Description</th>
                  <th>Sous-pages</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                ${pages.map(page => `
                  <tr>
                    <td>${page.title || 'Non renseigné'}</td>
                    <td>${page.description || 'Aucune description'}</td>
                    <td>${page.subPages}</td>
                    <td>${page.isFixed ? 'Page fixe' : 'Page personnalisée'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <p><em>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</em></p>
          </div>
        </body>
      </html>
    `

    // Créer un blob avec le contenu HTML
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    
    // Créer un lien de téléchargement
    const link = document.createElement('a')
    link.href = url
    link.download = `arborescence-site-${new Date().toISOString().split('T')[0]}.html`
    
    // Déclencher le téléchargement
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Nettoyer l'URL
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Créez votre arborescence</h1>
          
          {/* Bouton de téléchargement PDF */}
          <Button 
            onClick={downloadAsPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Download className="w-5 h-5" />
            Télécharger en PDF
          </Button>
        </div>

        {/* Version étrangère souhaitée */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Version étrangère souhaitée</h2>
          <div className="flex gap-6">
            {languages.map((lang) => (
              <label key={lang.code} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedLanguages.has(lang.code)}
                  onChange={() => toggleLanguage(lang.code)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-2xl">{lang.flag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Informations du bandeau */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Label className="text-lg font-medium text-gray-700">
              Quelles informations souhaitez-vous indiquer dans le bandeau de votre site ?
            </Label>
            <span className="text-pink-500 font-medium">(Champ limité à 255 caractères)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-300 rounded-lg p-4">
            <div>
              <Label className="text-sm text-gray-500 mb-2 block">À gauche</Label>
              <Textarea
                value={bannerInfo.left}
                onChange={(e) => updateBannerInfo("left", e.target.value)}
                className="min-h-[100px] resize-none bg-gray-100"
                placeholder="Informations à gauche..."
              />
            </div>
            <div>
              <Label className="text-sm text-gray-500 mb-2 block">Au centre</Label>
              <Textarea
                value={bannerInfo.center}
                onChange={(e) => updateBannerInfo("center", e.target.value)}
                className="min-h-[100px] resize-none bg-gray-100"
                placeholder="Informations au centre..."
              />
            </div>
            <div>
              <Label className="text-sm text-gray-500 mb-2 block">À droite</Label>
              <Textarea
                value={bannerInfo.right}
                onChange={(e) => updateBannerInfo("right", e.target.value)}
                className="min-h-[100px] resize-none bg-gray-100"
                placeholder="Informations à droite..."
              />
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-500">Caractères utilisés: {getTotalCharacters()}/255</div>
        </div>

        {/* Instructions avec icône info */}
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="mb-2">
                Si certaines pages comportent des sous-pages, veuillez les indiquer dans le descriptif avec une étoile
                (*) et spécifier leur nombre dans le champ dédié.
              </p>
              <p className="mb-2">
                Pour un <strong>ViviworksShop et un ViviworksBoutique</strong>, nous vous conseillons d'indiquer l'arborescence
                suivante :
                <span className="text-pink-600 font-medium"> Page 1 Accueil, Page 2 Boutique, Page 3 Contact</span>.
              </p>
              <p>
                On pourra ensuite ajouter en sous-page de la partie boutique l'ensemble des produits triés par
                catégorie.
              </p>
            </div>
          </div>
        </div>

        {/* Sélection de suggestion */}
        <div className="mb-8">
          <Label className="text-lg font-medium text-gray-700 mb-4 block">
            Sélectionnez une suggestion d'arborescence :
          </Label>
          <Select value={selectedSuggestion} onValueChange={setSelectedSuggestion}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Pas de suggestion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Pas de suggestion</SelectItem>
              <SelectItem value="vitrine">Site vitrine classique</SelectItem>
              <SelectItem value="ecommerce">Site e-commerce</SelectItem>
              <SelectItem value="blog">Blog/Actualités</SelectItem>
              <SelectItem value="portfolio">Portfolio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grille des pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {pages.map((page) => (
            <Card key={page.id} className="relative">
              <CardContent className="p-4">
                {!page.isFixed && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePage(page.id)}
                    className="absolute top-2 right-2 w-6 h-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}

                <div className="mb-3">
                  {page.isFixed ? (
                    <div className="bg-gray-200 text-gray-700 px-3 py-2 rounded font-medium">{page.title}</div>
                  ) : (
                    <Input
                      value={page.title}
                      onChange={(e) => updatePage(page.id, "title", e.target.value)}
                      placeholder="Saisir un titre de page"
                      className="font-medium"
                    />
                  )}
                </div>

                <Textarea
                  value={page.description}
                  onChange={(e) => updatePage(page.id, "description", e.target.value)}
                  placeholder="Décrire le contenu de la page."
                  className="min-h-[120px] resize-none text-sm bg-gray-100 mb-3"
                />

                <div className="flex items-center gap-2">
                  <Label className="text-sm text-gray-600">Nombre de sous-pages :</Label>
                  <Input
                    type="number"
                    min="0"
                    value={page.subPages}
                    onChange={(e) => updatePage(page.id, "subPages", Number.parseInt(e.target.value) || 0)}
                    className="w-16 h-8 text-center"
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Bouton ajouter une page */}
          <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
            <CardContent className="p-4 h-full flex items-center justify-center">
              <Button
                variant="ghost"
                onClick={addPage}
                className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-blue-600"
              >
                <div className="w-12 h-12 bg-gray-600 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm">Ajouter une page</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Icônes d'information en bas */}
        <div className="flex justify-end gap-2 mt-6">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            <Info className="w-4 h-4 text-white" />
          </div>
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            <Info className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
