"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Download, MapPin, Loader2 } from "lucide-react"
import { LeafletMap } from "./leaflet-map"

export function CampagneAdsContent() {
  const [selectedDuration, setSelectedDuration] = useState("3")
  const [localite, setLocalite] = useState("")
  const [motCles, setMotCles] = useState<string[]>([])
  const [currentMotCle, setCurrentMotCle] = useState("")
  const [budget, setBudget] = useState("")
  const [showMap, setShowMap] = useState(false)
  const [mapCoordinates, setMapCoordinates] = useState<[number, number]>([48.8566, 2.3522])
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const handleMotCleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentMotCle.trim()) {
      e.preventDefault()
      if (!motCles.includes(currentMotCle.trim())) {
        setMotCles([...motCles, currentMotCle.trim()])
      }
      setCurrentMotCle("")
    }
  }

  const removeMotCle = (motCle: string) => {
    setMotCles(motCles.filter((m) => m !== motCle))
  }

  const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
    try {
      // Utiliser l'API de géocodage gratuite Nominatim (OpenStreetMap)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=fr`
      )
      
      if (!response.ok) {
        throw new Error('Erreur de géocodage')
      }
      
      const data = await response.json()
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0]
        return [parseFloat(lat), parseFloat(lon)]
      }
      
      return null
    } catch (error) {
      console.error('Erreur lors du géocodage:', error)
      return null
    }
  }

  const handleLocaliteClick = async () => {
    if (localite.trim()) {
      setIsLoadingLocation(true)
      setShowMap(true)
      
      try {
        // Géocoder l'adresse
        const coordinates = await geocodeAddress(localite)
        
        if (coordinates) {
          setMapCoordinates(coordinates)
        } else {
          // Si la géolocalisation échoue, utiliser des coordonnées par défaut (Paris)
          setMapCoordinates([48.8566, 2.3522])
          console.warn('Localisation non trouvée, utilisation des coordonnées par défaut')
        }
      } catch (error) {
        console.error('Erreur lors de la recherche de localisation:', error)
        // En cas d'erreur, utiliser des coordonnées par défaut
        setMapCoordinates([48.8566, 2.3522])
      } finally {
        setIsLoadingLocation(false)
      }
    }
  }

  const downloadAsPDF = () => {
    const content = `
      <html>
        <head>
          <title>Simulation Campagne ADS</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f8fafc; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { color: #804d3b; border-bottom: 3px solid #4fafc4; padding-bottom: 10px; margin-bottom: 30px; }
            h2 { color: #374151; margin-top: 25px; margin-bottom: 15px; }
            .section { margin-bottom: 25px; }
            .param-card { border: 1px solid #e5e7eb; padding: 15px; margin: 10px 0; border-radius: 8px; background: #f9fafb; }
            .param-title { font-weight: bold; color: #1f2937; margin-bottom: 5px; }
            .param-value { color: #6b7280; font-size: 14px; }
            .keywords { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; }
            .keyword { background: #e6f3f7; color: #4fafc4; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
            .summary { background: #f5e6e0; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .date { text-align: center; color: #6b7280; font-style: italic; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Simulation de Campagne ADS</h1>
            
            <div class="section">
              <h2>Paramètres de la Campagne</h2>
              <div class="param-card">
                <div class="param-title">Durée</div>
                <div class="param-value">${selectedDuration} mois</div>
              </div>
              ${localite ? `
                <div class="param-card">
                  <div class="param-title">Localité</div>
                  <div class="param-value">${localite}</div>
                </div>
              ` : ''}
              ${motCles.length > 0 ? `
                <div class="param-card">
                  <div class="param-title">Mots-clés (${motCles.length})</div>
                  <div class="keywords">
                    ${motCles.map(keyword => `<span class="keyword">${keyword}</span>`).join('')}
                  </div>
                </div>
              ` : ''}
              ${budget ? `
                <div class="param-card">
                  <div class="param-title">Budget mensuel</div>
                  <div class="param-value">${budget}€</div>
                </div>
              ` : ''}
            </div>

            <div class="summary">
              <h3>Résumé de la Campagne</h3>
              <p><strong>Durée totale :</strong> ${selectedDuration} mois</p>
              <p><strong>Budget total :</strong> ${budget ? (parseInt(budget) * parseInt(selectedDuration)) + '€' : 'Non défini'}</p>
              <p><strong>Mots-clés :</strong> ${motCles.length} sélectionné(s)</p>
              ${localite ? `<p><strong>Zone géographique :</strong> ${localite}</p>` : ''}
            </div>

            <div class="date">
              Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
            </div>
          </div>
        </body>
      </html>
    `

    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `campagne-ads-${new Date().toISOString().split('T')[0]}.html`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Simulation de campagne ADS</h1>
          
          {/* Bouton de téléchargement PDF */}
          <Button 
            onClick={downloadAsPDF}
            className="bg-[#804d3b] hover:bg-[#6a3f2f] text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Download className="w-5 h-5" />
            Télécharger PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne gauche - Paramètres */}
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Paramètres de la campagne</h2>

              {/* Durée */}
              <div className="mb-6">
                <Label className="text-base font-medium text-gray-700 mb-4 block">Durée</Label>
                <div className="flex gap-6">
                  {[
                    { value: "3", label: "3 mois" },
                    { value: "6", label: "6 mois" },
                    { value: "12", label: "12 mois" },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="duration"
                        value={option.value}
                        checked={selectedDuration === option.value}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="w-4 h-4 text-[#4fafc4] border-gray-300 focus:ring-[#4fafc4]"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Localité */}
              <div className="mb-6">
                <Label htmlFor="localite" className="text-base font-medium text-gray-700 mb-2 block">
                  Localité*
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="localite"
                    value={localite}
                    onChange={(e) => setLocalite(e.target.value)}
                    placeholder="Entrez une localité (ex: Paris, Lyon, Marseille...)"
                    className="flex-1 border-gray-300 focus:border-[#4fafc4] focus:ring-[#4fafc4]"
                  />
                  <Button
                    onClick={handleLocaliteClick}
                    disabled={!localite.trim() || isLoadingLocation}
                    className="bg-[#4fafc4] hover:bg-[#3d8a9c] text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingLocation ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                    {isLoadingLocation ? "Recherche..." : "Carte"}
                  </Button>
                </div>
                {localite && (
                  <p className="text-sm text-gray-500 mt-1">
                    Exemples : Paris, Lyon, Marseille, Toulouse, Nice, Nantes, Strasbourg, Montpellier...
                  </p>
                )}
              </div>

              {/* Mots clés */}
              <div className="mb-6">
                <Label htmlFor="motcles" className="text-base font-medium text-gray-700 mb-2 block">
                  Mot clés
                </Label>
                <Input
                  id="motcles"
                  value={currentMotCle}
                  onChange={(e) => setCurrentMotCle(e.target.value)}
                  onKeyPress={handleMotCleKeyPress}
                  placeholder="Ajouter un mot clé. Valider chaque expression avec la touche Entrer."
                  className="w-full border-gray-300 focus:border-[#4fafc4] focus:ring-[#4fafc4]"
                />
                {motCles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {motCles.map((motCle, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-[#e6f3f7] text-[#4fafc4] hover:bg-[#d0e7f0] px-3 py-1"
                      >
                        {motCle}
                        <button onClick={() => removeMotCle(motCle)} className="ml-2 hover:text-[#3d8a9c]">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Définition du budget */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Définition du budget</h2>
              <div>
                <Label htmlFor="budget" className="text-base font-medium text-gray-700 mb-2 block">
                  Budget mensuel (€)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="0"
                  className="w-full border-gray-300 focus:border-[#4fafc4] focus:ring-[#4fafc4]"
                />
              </div>
            </div>
          </div>

          {/* Colonne droite - Carte */}
          <div className="space-y-4">
            {showMap ? (
              <Card className="h-96 md:h-[500px]">
                <CardContent className="p-0 h-full">
                  <LeafletMap center={mapCoordinates} zoom={12} className="rounded-lg" />
                </CardContent>
              </Card>
            ) : (
              <Card className="h-96 md:h-[500px] bg-gray-50 border-dashed border-gray-300">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Cliquez sur "Carte" pour afficher la localisation</p>
                    <p className="text-sm">Entrez d'abord une localité dans le champ correspondant</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Résumé de la campagne */}
        {(selectedDuration || localite || motCles.length > 0 || budget) && (
          <Card className="mt-8 bg-[#f5e6e0] border-[#804d3b]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[#804d3b] mb-4">Résumé de votre campagne</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                {selectedDuration && (
                  <div>
                    <span className="font-medium text-[#6a3f2f]">Durée:</span>
                    <span className="ml-2 text-[#804d3b]">{selectedDuration} mois</span>
                  </div>
                )}
                {localite && (
                  <div>
                    <span className="font-medium text-[#6a3f2f]">Localité:</span>
                    <span className="ml-2 text-[#804d3b]">{localite}</span>
                  </div>
                )}
                {motCles.length > 0 && (
                  <div>
                    <span className="font-medium text-[#6a3f2f]">Mots-clés:</span>
                    <span className="ml-2 text-[#804d3b]">{motCles.length} mot(s)</span>
                  </div>
                )}
                {budget && (
                  <div>
                    <span className="font-medium text-[#6a3f2f]">Budget:</span>
                    <span className="ml-2 text-[#804d3b]">{budget}€/mois</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
