"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Maximize2, Minimize2, RefreshCw, AlertCircle, Image as ImageIcon, Play, Monitor, Globe, Smartphone } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WebsitePreview {
  id: string
  name: string
  url: string
  description: string
  category: string
  isExpanded: boolean
  features: string[]
  placeholderColor: string
}

export function ShowroomContent() {
  const [websites, setWebsites] = useState<WebsitePreview[]>([
    {
      id: "electronikauto",
      name: "Electronik Auto",
      url: "https://www.electronikauto.fr/",
      description: "Site web pour un garage automobile spécialisé dans l'électronique",
      category: "Automobile",
      isExpanded: false,
      placeholderColor: "from-blue-500 to-blue-600",
      features: [
        "Design moderne et professionnel",
        "Navigation intuitive",
        "Sections spécialisées (clés, calculateurs, diagnostics)",
        "Intégration vidéos et guides",
        "Formulaire de contact optimisé"
      ]
    },
    {
      id: "ecoclimatic",
      name: "Eco Climatic",
      url: "http://ecoclimatic.fr/",
      description: "Site web pour une entreprise de climatisation écologique",
      category: "Climatisation",
      isExpanded: false,
      placeholderColor: "from-green-500 to-green-600",
      features: [
        "Design écologique et moderne",
        "Présentation des services de climatisation",
        "Mise en avant de l'aspect écologique",
        "Interface responsive et accessible",
        "Optimisation pour le référencement local"
      ]
    },
    {
      id: "wakeupacademy",
      name: "Wake Up Academy",
      url: "https://wakeupacademy.fr/",
      description: "Site web pour une académie de formation et développement personnel",
      category: "Formation",
      isExpanded: false,
      placeholderColor: "from-purple-500 to-purple-600",
      features: [
        "Design inspirant et motivant",
        "Intégration de vidéos YouTube",
        "Présentation des programmes de formation",
        "Témoignages et success stories",
        "Call-to-action optimisés"
      ]
    }
  ])

  const toggleExpanded = (id: string) => {
    setWebsites(prev => 
      prev.map(site => 
        site.id === id 
          ? { ...site, isExpanded: !site.isExpanded }
          : site
      )
    )
  }

  const renderWebsitePreview = (site: WebsitePreview) => {
    return (
      <div className="relative w-full h-full">
        {/* Placeholder coloré */}
        <div className={`w-full h-full bg-gradient-to-br ${site.placeholderColor} flex items-center justify-center relative overflow-hidden`}>
          {/* Motif de fond */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-2 w-12 h-12 sm:top-4 sm:left-4 sm:w-20 sm:h-20 border-2 border-white rounded-lg"></div>
            <div className="absolute top-4 right-4 w-8 h-8 sm:top-8 sm:right-8 sm:w-16 sm:h-16 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 sm:bottom-8 sm:left-8 sm:w-12 sm:h-12 border-2 border-white transform rotate-45"></div>
            <div className="absolute bottom-2 right-2 w-12 h-12 sm:bottom-4 sm:right-4 sm:w-24 sm:h-24 border-2 border-white rounded-lg"></div>
          </div>
          
          {/* Contenu central */}
          <div className="text-center text-white relative z-10 px-4">
            <Globe className="w-8 h-8 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 opacity-80" />
            <h3 className="text-sm sm:text-xl font-bold mb-1 sm:mb-2">{site.name}</h3>
            <p className="text-xs sm:text-sm opacity-90 max-w-xs hidden sm:block">
              {site.description}
            </p>
          </div>
        </div>
        
        {/* Overlay avec bouton de lecture - visible sur mobile */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(site.url, '_blank')}
            className="bg-white/90 hover:bg-white text-gray-900 border-gray-300 hover:border-white transition-all duration-300 opacity-0 hover:opacity-100 sm:opacity-0 sm:hover:opacity-100"
          >
            <Play className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Voir le site complet</span>
            <span className="sm:hidden">Voir</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
          Showroom Viviworks
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl">
          Découvrez nos réalisations web. Chaque site est conçu avec soin pour répondre 
          aux besoins spécifiques de nos clients et optimiser leur présence en ligne.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {websites.map((site) => (
          <Card 
            key={site.id} 
            className="bg-white border border-gray-200 hover:border-[#4fafc4] transition-all duration-300"
          >
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                      {site.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {site.category}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 line-clamp-2">
                    {site.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                    <span className="font-medium hidden sm:inline">URL :</span>
                    <a 
                      href={site.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#4fafc4] hover:text-[#804d3b] transition-colors flex items-center gap-1 truncate"
                    >
                      <span className="hidden sm:inline">{site.url}</span>
                      <span className="sm:hidden">Voir le site</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpanded(site.id)}
                    className="h-8 w-8 p-0 flex-shrink-0"
                    title={site.isExpanded ? "Réduire" : "Agrandir"}
                  >
                    {site.isExpanded ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                {/* Barre d'adresse simulée */}
                <div className="bg-white border-b border-gray-200 px-2 sm:px-4 py-1 sm:py-2 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded px-2 sm:px-3 py-1 text-xs text-gray-600 ml-2 truncate">
                    {site.url}
                  </div>
                </div>
                
                {/* Aperçu du site */}
                <div className={`relative ${site.isExpanded ? 'h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]' : 'h-[200px] sm:h-[300px] md:h-[400px]'}`}>
                  {renderWebsitePreview(site)}
                </div>
              </div>
              
              {/* Caractéristiques du site */}
              {site.isExpanded && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-2 sm:mb-3 text-sm sm:text-base">Caractéristiques principales :</h4>
                  <ul className="space-y-1 sm:space-y-2">
                    {site.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#4fafc4] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                        <span className="line-clamp-2">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Actions supplémentaires */}
              <div className="mt-3 sm:mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-500 hidden sm:block">
                  Cliquez sur l'aperçu pour agrandir et voir les détails
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(site.url, '_blank')}
                  className="text-xs w-full sm:w-auto"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Voir le site complet</span>
                  <span className="sm:hidden">Ouvrir le site</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section d'informations */}
      <div className="mt-8 sm:mt-12 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          Nos réalisations web
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4fafc4] rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-base sm:text-lg">🎨</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Design sur mesure</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Chaque site est conçu selon l'identité visuelle de votre entreprise
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#804d3b] rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-base sm:text-lg">📱</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Responsive design</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Tous nos sites s'adaptent parfaitement aux mobiles et tablettes
            </p>
          </div>
          <div className="text-center sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-base sm:text-lg">⚡</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Performance optimisée</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Sites rapides et optimisés pour le référencement naturel
            </p>
          </div>
        </div>
      </div>

      {/* Note sur les aperçus */}
      <div className="mt-6 sm:mt-8 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
            <span className="text-white text-xs">ℹ</span>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-1 text-sm sm:text-base">
              Aperçus stylisés
            </h3>
            <p className="text-xs sm:text-sm text-blue-700">
              Les aperçus utilisent des designs colorés pour représenter chaque site. 
              Cliquez sur "Voir le site complet" pour accéder aux vrais sites web.
            </p>
          </div>
        </div>
      </div>

      {/* Indicateur mobile */}
      <div className="mt-4 sm:hidden bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-green-600" />
          <span className="text-xs text-green-700">
            Interface optimisée pour mobile - Tous les sites sont responsive
          </span>
        </div>
      </div>
    </div>
  )
} 