"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Palette, 
  Calendar, 
  Users, 
  Video, 
  Camera, 
  Play, 
  Eye, 
  FileImage, 
  GraduationCap, 
  Search,
  Download,
  Check,
  Smartphone,
  Globe,
  Shield,
  BarChart3,
  Wrench,
  Heart,
  UserCheck,
  Facebook,
  Linkedin,
  ShoppingCart,
  FileText,
  Briefcase,
  Store
} from "lucide-react"

const typesSites = [
  { id: "vitrine", label: "SITE VITRINE", icon: Store, color: "#804d3b", visits: "100 VISITES/MOIS" },
  { id: "ecommerce", label: "SITE E-COMMERCE", icon: ShoppingCart, color: "#4fafc4", visits: "150 VISITES/MOIS" },
  { id: "blog", label: "BLOG/ACTUALITÉS", icon: FileText, color: "#6a3f2f", visits: "200 VISITES/MOIS" },
  { id: "portfolio", label: "PORTFOLIO", icon: Briefcase, color: "#3d8a9c", visits: "80 VISITES/MOIS" },
]

const optionsDisponibles = [
  { id: "logo", label: "Création du logo", icon: Palette, description: "Logo personnalisé pour votre marque" },
  { id: "agenda", label: "Agenda en ligne", icon: Calendar, description: "Système de prise de rendez-vous" },
  { id: "crm", label: "CRM", icon: Users, description: "Gestion de la relation client" },
  { id: "rdv", label: "RDV en visioconférence", icon: Video, description: "Rendez-vous en ligne intégrés" },
  { id: "photos10", label: "Reportage 10 photos", icon: Camera, description: "Shooting photo professionnel" },
  { id: "photos10video", label: "Reportage 10 photos + vidéo 60s", icon: Play, description: "Photos + vidéo courte" },
  { id: "photosvisite", label: "Reportage 10 photos + visite virtuelle", icon: Eye, description: "Photos + visite 360°" },
  { id: "photos20", label: "Reportage 20 photos", icon: FileImage, description: "Shooting photo étendu" },
  { id: "formation", label: "Formation supplémentaire 1h", icon: GraduationCap, description: "Formation personnalisée" },
  { id: "sea", label: "Campagne SEA", icon: Search, description: "Publicité Google Ads" },
]

const offrePersonnalisee = [
  { label: "Responsive design", icon: Smartphone, description: "Site adaptatif mobile/desktop" },
  { label: "Référencement naturel", icon: Search, description: "SEO optimisé" },
  { label: "Navigation sécurisée", icon: Shield, description: "HTTPS et sécurité" },
  { label: "Statistiques", icon: BarChart3, description: "Analytics intégrés" },
  { label: "Outil de mise à jour", icon: Wrench, description: "Interface d'administration" },
  { label: "Formation à distance", icon: GraduationCap, description: "Formation en ligne" },
  { label: "Accompagnement", icon: Heart, description: "Support personnalisé" },
  { label: "Espace partenaire", icon: UserCheck, description: "Zone membre privée" },
  { label: "Compte ViviworksDiffusion", icon: Globe, description: "Diffusion multi-canal" },
  { label: "Page FB et GMB", icon: Facebook, description: "Réseaux sociaux" },
  { label: "Garantie de visites", icon: Check, description: "Trafic garanti" },
]

export function CaracteristiquesContent() {
  const [selectedType, setSelectedType] = useState("vitrine")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]))
  }

  const getSelectedTypeData = () => {
    return typesSites.find(type => type.id === selectedType) || typesSites[0]
  }

  const downloadAsPDF = () => {
    const selectedOptionsData = optionsDisponibles.filter(option => selectedOptions.includes(option.id))
    const typeData = getSelectedTypeData()
    
    const content = `
      <html>
        <head>
          <title>Caractéristiques Sélectionnées</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f8fafc; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { color: #804d3b; border-bottom: 3px solid #4fafc4; padding-bottom: 10px; margin-bottom: 30px; }
            h2 { color: #374151; margin-top: 25px; margin-bottom: 15px; }
            .section { margin-bottom: 25px; }
            .type-badge { background: ${typeData.color}; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 15px; }
            .option-card { border: 1px solid #e5e7eb; padding: 15px; margin: 10px 0; border-radius: 8px; background: #f9fafb; }
            .option-title { font-weight: bold; color: #1f2937; margin-bottom: 5px; }
            .option-description { color: #6b7280; font-size: 14px; }
            .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0; }
            .feature-item { background: #e6f3f7; padding: 12px; border-radius: 6px; border-left: 4px solid #4fafc4; }
            .summary { background: #f5e6e0; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .date { text-align: center; color: #6b7280; font-style: italic; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Caractéristiques Sélectionnées</h1>
            
            <div class="type-badge">${typeData.label}</div>
            
            <div class="section">
              <h2>Type de Site</h2>
              <p><strong>${typeData.label}</strong> - ${typeData.visits} en moyenne</p>
            </div>
            
            <div class="section">
              <h2>Options Supplémentaires Sélectionnées</h2>
              ${selectedOptionsData.length > 0 ? 
                selectedOptionsData.map(option => `
                  <div class="option-card">
                    <div class="option-title">${option.label}</div>
                    <div class="option-description">${option.description}</div>
                  </div>
                `).join('') : 
                '<p>Aucune option supplémentaire sélectionnée</p>'
              }
            </div>

            <div class="section">
              <h2>Caractéristiques Incluses</h2>
              <div class="features-grid">
                ${offrePersonnalisee.map(feature => `
                  <div class="feature-item">
                    <strong>${feature.label}</strong><br>
                    <small>${feature.description}</small>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="summary">
              <h3>Résumé de l'offre</h3>
              <p><strong>Type de site :</strong> ${typeData.label}</p>
              <p><strong>Trafic garanti :</strong> ${typeData.visits} en moyenne</p>
              <p><strong>Options sélectionnées :</strong> ${selectedOptionsData.length}</p>
              <p><strong>Caractéristiques incluses :</strong> ${offrePersonnalisee.length}</p>
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
    link.download = `caracteristiques-${selectedType}-${new Date().toISOString().split('T')[0]}.html`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  const typeData = getSelectedTypeData()

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-lg p-3 md:p-6 h-[85vh] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 h-full">
          {/* Colonne gauche - Options disponibles */}
          <div className="space-y-2 md:space-y-3 overflow-y-auto">
            <div className="flex items-center gap-2 mb-2 md:mb-4">
              <div className="w-1 h-4 md:h-5 bg-[#804d3b] rounded-full"></div>
              <h2 className="text-sm md:text-base font-bold text-[#804d3b]">Sélectionner un autre produit</h2>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2 md:mb-3 text-xs md:text-sm">Options disponibles:</h3>
              <div className="grid grid-cols-1 gap-1 md:gap-1.5">
                {optionsDisponibles.map((option) => (
                  <div
                    key={option.id}
                    className={`cursor-pointer transition-all rounded-lg border p-1.5 md:p-2 hover:shadow-sm ${
                      selectedOptions.includes(option.id)
                        ? "border-[#4fafc4] bg-[#e6f3f7]"
                        : "border-gray-200 bg-white hover:border-[#4fafc4] hover:bg-[#f0f9fc]"
                    }`}
                    onClick={() => toggleOption(option.id)}
                  >
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div
                        className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded border flex items-center justify-center ${
                          selectedOptions.includes(option.id) ? "bg-[#4fafc4] border-[#4fafc4]" : "border-gray-300"
                        }`}
                      >
                        {selectedOptions.includes(option.id) && (
                          <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full"></div>
                        )}
                      </div>
                      <option.icon className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#804d3b] flex-shrink-0" />
                      <span className="text-xs font-medium text-gray-900 leading-tight">{option.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne centrale - Types de sites et statistiques */}
          <div className="flex flex-col justify-center items-center space-y-2 md:space-y-4">
            {/* Sélection du type de site */}
            <div className="w-full space-y-2">
              {typesSites.map((type) => (
                <Button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-bold rounded-xl shadow-lg transition-all ${
                    selectedType === type.id
                      ? `text-white`
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                  style={{
                    backgroundColor: selectedType === type.id ? type.color : undefined,
                    borderColor: selectedType === type.id ? type.color : undefined
                  }}
                >
                  {type.label}
                </Button>
              ))}
            </div>

            <div className="text-center">
              <div 
                className="text-white px-3 md:px-4 py-2 md:py-3 rounded-xl inline-block shadow-lg"
                style={{ background: `linear-gradient(to right, ${typeData.color}, ${typeData.color}dd)` }}
              >
                <div className="text-sm md:text-lg font-bold mb-1">{typeData.visits}*</div>
                <div className="text-xs opacity-90">(Moyenne annuelle sur 12 mois)</div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-[#4fafc4] to-[#3d8a9c] text-white rounded-xl p-2 md:p-3 shadow-lg">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs md:text-sm">viviworksAudience</div>
                  <div className="text-xs opacity-90">Garantie de visites</div>
                </div>
              </div>
            </div>

            {/* Bouton de téléchargement PDF */}
            <Button 
              onClick={downloadAsPDF}
              className="bg-[#804d3b] hover:bg-[#6a3f2f] text-white px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-bold rounded-xl shadow-lg flex items-center gap-2"
            >
              <Download className="w-3 h-3 md:w-4 md:h-4" />
              Télécharger PDF
            </Button>
          </div>

          {/* Colonne droite - Mon offre personnalisée */}
          <div className="space-y-2 md:space-y-3 overflow-y-auto">
            <h3 className="font-bold text-gray-900 text-sm md:text-base mb-2 md:mb-4">Mon offre personnalisée:</h3>

            <div className="grid grid-cols-1 gap-1 md:gap-1.5">
              {offrePersonnalisee.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-[#4fafc4] to-[#3d8a9c] hover:from-[#3d8a9c] hover:to-[#2d7a8c] transition-all rounded-lg shadow-sm"
                >
                  <div className="p-1.5 md:p-2">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <item.icon className="w-2.5 h-2.5 md:w-3 md:h-3 text-white flex-shrink-0" />
                      <span className="text-white font-medium text-xs leading-tight">{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-200">
              <div className="flex items-center gap-1.5 md:gap-2 mb-2">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-[#4fafc4] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                <div className="w-4 h-4 md:w-5 md:h-5 bg-[#3d8a9c] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">in</span>
                </div>
                <span className="text-xs text-gray-600 font-medium">Réseaux sociaux intégrés</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
