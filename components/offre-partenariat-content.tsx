"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ServiceItem {
  id: string
  title: string
  description: string[]
  prixInitial: number
  prixRecurrent: number
  periodicite: string
  details?: string
}

const services: ServiceItem[] = [
  {
    id: "site-vitrine",
    title: "Site vitrine",
    description: ["Conception du site vitrine (graphisme et rédactionnel) responsive design"],
    prixInitial: 2350,
    prixRecurrent: 0,
    periodicite: "Versement unique",
  },
  {
    id: "nom-domaine",
    title: "Nom de domaine",
    description: ["Nom de domaine personnalisé et adresse e-mail associée"],
    prixInitial: 30,
    prixRecurrent: 0,
    periodicite: "Annuel",
  },
  {
    id: "hebergement",
    title: "Hébergement, administration et référencement",
    description: [
      "Optimisation des sites pour les moteurs de recherche (Google, Yahoo,Bing...) : contenus structurés et optimisés, maillage interne.",
      "Hébergement",
      "Certificat SSL permettant une navigation sécurisée (https)",
      "Mises à jour de contenu illimitées",
      "Mise à disposition du gestionnaire de contenu Webtool",
      "Évolutions fonctionnelles de la plateforme Webtool",
      "Accompagnement personnalisé par un expert viviworks.fr",
"Accompagnement par un expert en référencement viviworks.fr",
      "Assistance du lundi au vendredi par téléphone et e-mail",
      "Statistiques de fréquentation de votre site",
      "Campagne Google Ads",
      "Accès à l'espace partenaire viviworks&moi",
      "Accompagnement dans la Création de votre page FB et GMB",
      "Diffusion des coordonnées sur les annuaires et GPS majeurs (Facebook, Google My Business, Google Maps et Waze)",
      "Estimation du marché",
      "Optimisations par du référencement naturel et du référencement payant",
      "Garantie de visites incluse pendant 12 mois (100 visites/mois moyenne annuelle mensualisée sur 12 mois)",
    ],
    prixInitial: 134,
    prixRecurrent: 134,
    periodicite: "Mensuel",
    details: "+ 100€ / Mois pendant 12 mois",
  },
  {
    id: "communication",
    title: "Communication Web",
    description: ["Annuaire viviworks.fr"],
    prixInitial: 432,
    prixRecurrent: 0,
    periodicite: "Versement unique",
  },
  {
    id: "frais-mise-oeuvre",
    title: "Frais de mise en oeuvre",
    description: ["Site jusqu'à 10 pages"],
    prixInitial: 449,
    prixRecurrent: 449,
    periodicite: "Versement unique",
  },
]

export function OffrePartenariatContent() {
  const [selectedDuration, setSelectedDuration] = useState("60")
  const [checkedPrices, setCheckedPrices] = useState<Set<string>>(new Set())
  const [showZeroPrices, setShowZeroPrices] = useState<Set<string>>(new Set())

  const togglePriceCheck = (serviceId: string) => {
    const newChecked = new Set(checkedPrices)
    if (newChecked.has(serviceId)) {
      newChecked.delete(serviceId)
    } else {
      newChecked.add(serviceId)
    }
    setCheckedPrices(newChecked)
  }

  const toggleZeroPrice = (serviceId: string) => {
    const newShowZero = new Set(showZeroPrices)
    if (newShowZero.has(serviceId)) {
      newShowZero.delete(serviceId)
      // Décocher le prix principal quand on cache le 0€
      const newChecked = new Set(checkedPrices)
      newChecked.delete(serviceId)
      setCheckedPrices(newChecked)
    } else {
      newShowZero.add(serviceId)
      // Cocher le prix principal quand on affiche le 0€
      const newChecked = new Set(checkedPrices)
      newChecked.add(serviceId)
      setCheckedPrices(newChecked)
    }
    setShowZeroPrices(newShowZero)
  }

  const downloadAsPDF = () => {
    // Calculer les totaux selon la durée et les services cochés
    const calculateTotals = () => {
      let totalInitial = 0
      let totalRecurrent = 0
      
      services.forEach(service => {
        if (checkedPrices.has(service.id)) {
          totalInitial += service.prixInitial
          // Pour les services récurrents, calculer selon la durée
          if (service.prixRecurrent > 0) {
            totalRecurrent += service.prixRecurrent * parseInt(selectedDuration)
          }
        }
      })
      
      return { totalInitial, totalRecurrent }
    }
    
    const { totalInitial, totalRecurrent } = calculateTotals()
    
    const content = `
      <html>
        <head>
          <title>Offre de Partenariat</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1 { color: #804d3b; text-align: center; border-bottom: 2px solid #804d3b; padding-bottom: 10px; }
            h2 { color: #4fafc4; margin-top: 30px; }
            .header { background: #f5e6e0; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
            .service { border-left: 4px solid #4fafc4; padding: 15px; margin: 15px 0; background: #f9f9f9; }
            .service.selected { background: #e6f3f7; border-left-color: #804d3b; }
            .service-title { color: #4fafc4; font-weight: bold; font-size: 18px; margin-bottom: 10px; }
            .service.selected .service-title { color: #804d3b; }
            .price { font-size: 20px; font-weight: bold; color: #804d3b; }
            .price.checked { text-decoration: line-through; }
            .badge { background: #804d3b; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; display: inline-block; margin-left: 10px; }
            .badge.blue { background: #4fafc4; }
            .badge.zero { background: #6a3f2f; }
            .periodicity { color: #804d3b; font-size: 14px; margin-top: 5px; }
            .description { margin: 10px 0; }
            .description li { margin: 5px 0; }
            .summary { background: linear-gradient(to right, #f5e6e0, #e6f3f7); padding: 20px; border-radius: 8px; border: 2px solid #804d3b; margin-top: 30px; }
            .summary-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; text-align: center; }
            .summary-item { }
            .summary-value { font-size: 24px; font-weight: bold; color: #804d3b; }
            .summary-label { font-size: 14px; color: #6a3f2f; margin-top: 5px; }
            .note { background: #f5e6e0; border-left: 4px solid #804d3b; padding: 15px; margin-top: 20px; border-radius: 0 8px 8px 0; }
            .footer { margin-top: 30px; text-align: center; color: #666; font-style: italic; }
            .status { font-size: 12px; color: #666; margin-top: 5px; }
            .status.selected { color: #4fafc4; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Offre de Partenariat</h1>
          
          <div class="header">
            <h2>Paramètres de l'offre</h2>
            <p><strong>Durée d'engagement :</strong> ${selectedDuration} mois</p>
            <p><strong>Programme :</strong> VIVIWORKSAUDIENCE</p>
            <p><strong>Services sélectionnés :</strong> ${checkedPrices.size} sur ${services.length}</p>
          </div>

          <h2>Tous les services disponibles</h2>
          ${services.map(service => {
            const isSelected = checkedPrices.has(service.id)
            const hasZeroPrice = showZeroPrices.has(service.id)
            const totalRecurrentForDuration = service.prixRecurrent > 0 ? service.prixRecurrent * parseInt(selectedDuration) : 0
            
            return `
              <div class="service ${isSelected ? 'selected' : ''}">
                <div class="service-title">${service.title}</div>
                <div class="price ${isSelected ? 'checked' : ''}">${service.prixInitial}€</div>
                ${service.prixRecurrent !== 0 ? `<span class="badge blue">${service.prixRecurrent}€/mois</span>` : ''}
                ${hasZeroPrice ? '<span class="badge zero">0€</span>' : ''}
                <div class="periodicity">${service.periodicite}</div>
                ${service.prixRecurrent > 0 ? `<div class="status">Total sur ${selectedDuration} mois : ${totalRecurrentForDuration}€</div>` : ''}
                <div class="description">
                  <ul>
                    ${service.description.map(desc => `<li>${desc}</li>`).join('')}
                  </ul>
                </div>
                ${service.details ? `<div style="color: #6a3f2f; font-size: 14px; margin-top: 10px;">${service.details}</div>` : ''}
                <div class="status ${isSelected ? 'selected' : ''}">
                  ${isSelected ? '✓ Service sélectionné' : '○ Service non sélectionné'}
                </div>
              </div>
            `
          }).join('')}

          <div class="summary">
            <h2>Récapitulatif des services sélectionnés</h2>
            <div class="summary-grid">
              <div class="summary-item">
                <div class="summary-value">${totalInitial}€</div>
                <div class="summary-label">Coût initial</div>
              </div>
              <div class="summary-item">
                <div class="summary-value">${totalRecurrent}€</div>
                <div class="summary-label">Coût total récurrent (${selectedDuration} mois)</div>
              </div>
              <div class="summary-item">
                <div class="summary-value">${totalInitial + totalRecurrent}€</div>
                <div class="summary-label">Coût total sur ${selectedDuration} mois</div>
              </div>
            </div>
          </div>

          <div class="note">
            <p><strong>Note :</strong> Les prix sont indiqués hors taxes. La garantie de visites s'applique sur une moyenne annuelle mensualisée sur 12 mois.</p>
            <p><strong>Calcul :</strong> Les coûts récurrents sont calculés sur ${selectedDuration} mois. Les services avec prix à 0€ sont inclus dans la sélection.</p>
          </div>

          <div class="footer">
            <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
            <p>Configuration : ${checkedPrices.size} services sélectionnés sur ${selectedDuration} mois</p>
          </div>
        </body>
      </html>
    `
    
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `offre-partenariat-complete-${new Date().toISOString().split('T')[0]}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#804d3b]">Offre de partenariat</h1>
          <Button
            onClick={downloadAsPDF}
            className="bg-[#804d3b] hover:bg-[#6a3f2f] text-white px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-bold rounded-xl shadow-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Télécharger PDF
          </Button>
        </div>

        {/* En-tête avec sélecteurs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-[#f5e6e0] rounded-lg border border-[#804d3b]">
          <div className="space-y-2">
            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger className="w-full border-b-2 border-[#4fafc4] bg-transparent focus:border-[#3d8a9c]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 MOIS</SelectItem>
                <SelectItem value="24">24 MOIS</SelectItem>
                <SelectItem value="36">36 MOIS</SelectItem>
                <SelectItem value="60">60 MOIS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-center">
            <div className="font-bold text-[#804d3b] text-sm md:text-base">VIVIWORKSAUDIENCE</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-[#804d3b] text-sm md:text-base">Budget HT</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-[#804d3b] text-sm md:text-base">Périodicité</div>
          </div>
        </div>

        {/* Liste des services */}
        <div className="space-y-6">
          {services.map((service, index) => {
            const isPriceChecked = checkedPrices.has(service.id)
            const isZeroPriceShown = showZeroPrices.has(service.id)
            return (
              <Card key={index} className="border-l-4 border-l-[#4fafc4] shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    {/* Titre et description */}
                    <div className="lg:col-span-6 space-y-3">
                      <h3 className="text-lg md:text-xl font-bold text-[#4fafc4]">{service.title}</h3>
                      <ul className="space-y-2">
                        {service.description.map((desc, descIndex) => (
                          <li key={descIndex} className="flex items-start gap-2 text-sm md:text-base text-gray-700">
                            <span className="w-1.5 h-1.5 bg-[#4fafc4] rounded-full mt-2 flex-shrink-0"></span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                      {service.details && <div className="text-sm text-[#6a3f2f] font-medium">{service.details}</div>}
                    </div>

                    {/* Colonnes de prix et périodicité */}
                    <div className="lg:col-span-6 grid grid-cols-3 gap-4 items-center">
                      {/* Colonne vide pour VIVIWORKSAUDIENCE */}
                      <div className="text-center">
                        <div className="text-gray-400">-</div>
                      </div>

                      {/* Budget HT */}
                      <div className="text-center space-y-1">
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className={`text-lg md:text-xl font-bold text-[#804d3b] ${isPriceChecked ? "line-through" : ""} cursor-pointer hover:opacity-80 transition-opacity`}
                            onClick={() => toggleZeroPrice(service.id)}
                          >
                            {service.prixInitial}€
                          </div>

                          {service.prixRecurrent !== 0 && (
                            <Badge className="bg-[#4fafc4] hover:bg-[#3d8a9c] text-white px-3 py-1 text-sm font-bold">
                              {service.prixRecurrent}€
                            </Badge>
                          )}
                          {service.prixRecurrent === 0 && (
                            <Badge
                              className="bg-[#804d3b] hover:bg-[#6a3f2f] text-white px-3 py-1 text-sm font-bold cursor-pointer transition-all hover:scale-105 min-w-[40px] flex items-center justify-center"
                              onClick={() => toggleZeroPrice(service.id)}
                            >
                              {isZeroPriceShown ? "0€" : ""}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Périodicité */}
                      <div className="text-center">
                        <div className="text-sm md:text-base text-[#804d3b] font-medium">
                          {service.periodicite.split(" ").map((word, wordIndex) => (
                            <div key={wordIndex}>{word}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Résumé total */}
        <Card className="mt-8 bg-gradient-to-r from-[#f5e6e0] to-[#e6f3f7] border-[#804d3b]">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-[#804d3b]">3404€</div>
                <div className="text-sm text-[#6a3f2f]">Coût initial</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#4fafc4]">583€</div>
                <div className="text-sm text-[#3d8a9c]">Coût mensuel récurrent</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#804d3b]">{selectedDuration} mois</div>
                <div className="text-sm text-[#6a3f2f]">Durée d'engagement</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Note importante */}
        <div className="mt-6 p-4 bg-[#f5e6e0] border-l-4 border-[#804d3b] rounded-r-lg">
          <p className="text-sm text-[#6a3f2f]">
            <span className="font-semibold">Note :</span> Les prix sont indiqués hors taxes. Cliquez sur les badges "0€"
            pour cocher/décocher les prix correspondants. La garantie de visites s'applique sur une moyenne annuelle
            mensualisée sur 12 mois.
          </p>
        </div>
      </div>
    </div>
  )
}
