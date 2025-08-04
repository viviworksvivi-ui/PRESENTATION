"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AccordionSection {
  id: string
  title: string
  content: React.ReactNode
}

export function DossierPartenaireContent() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set())

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections)
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId)
    } else {
      newOpenSections.add(sectionId)
    }
    setOpenSections(newOpenSections)
  }

  const sections: AccordionSection[] = [
    {
      id: "entreprise",
      title: "INFORMATION SUR L'ENTREPRISE",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Informations générales</h4>
              <ul className="space-y-1 text-gray-600">
                <li>
                  <strong>Enseigne :</strong> Viviworks Digital Marketing
                </li>
                <li>
                  <strong>Raison sociale :</strong> Viviworks SARL
                </li>
                <li>
                  <strong>Forme juridique :</strong> SARL
                </li>
                <li>
                  <strong>SIRET :</strong> 12345678901234
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Contact</h4>
              <ul className="space-y-1 text-gray-600">
                <li>
                  <strong>Adresse :</strong> 123 Avenue de l'Innovation
                </li>
                <li>
                  <strong>Ville :</strong> 75001 Paris
                </li>
                <li>
                  <strong>Email :</strong> contact@viviworks.fr
                </li>
                <li>
                  <strong>Téléphone :</strong> +33 1 23 45 67 89
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "arborescence",
      title: "ARBORESCENCE",
      content: (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">Structure du site proposée</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <strong>Accueil</strong> - Page principale avec présentation des services
              </li>
              <li className="flex items-center gap-2 ml-4">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Nos Services - Design & Marketing Digital
              </li>
              <li className="flex items-center gap-2 ml-4">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Portfolio - Réalisations clients
              </li>
              <li className="flex items-center gap-2 ml-4">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>À propos - Histoire et équipe
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <strong>Contact</strong> - Formulaire et coordonnées
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "domaine",
      title: "NOM DE DOMAINE",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Domaine principal</h4>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800 font-mono text-lg">www.viviworks.fr</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Configuration</h4>
              <ul className="space-y-1 text-gray-600">
                <li>✅ Certificat SSL inclus</li>
                <li>✅ Redirection www</li>
                <li>✅ Email professionnel</li>
                <li>✅ Protection WHOIS</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "coordonnees",
      title: "COORDONNEES A AFFICHER SUR LE SITE",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">En-tête gauche</h4>
              <p className="text-gray-600">📧 contact@viviworks.fr</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">En-tête centre</h4>
              <p className="text-gray-600">🏢 Viviworks Digital Marketing</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">En-tête droite</h4>
              <p className="text-gray-600">📞 +33 1 23 45 67 89</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-2">Adresse complète</h4>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-800">123 Avenue de l'Innovation, 75001 Paris, France</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "conception",
      title: "CONCEPTION DU SITE",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Design & UX</h4>
              <ul className="space-y-1 text-gray-600">
                <li>🎨 Design moderne et épuré</li>
                <li>📱 Responsive design</li>
                <li>⚡ Performance optimisée</li>
                <li>♿ Accessibilité web</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Fonctionnalités</h4>
              <ul className="space-y-1 text-gray-600">
                <li>📝 Formulaire de contact</li>
                <li>📊 Intégration Google Analytics</li>
                <li>🔍 Optimisation SEO</li>
                <li>🔒 Sécurité renforcée</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "referencement",
      title: "REFERENCEMENT",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">SEO Technique</h4>
              <ul className="space-y-1 text-gray-600">
                <li>🔍 Optimisation des balises meta</li>
                <li>📄 Structure HTML sémantique</li>
                <li>🚀 Vitesse de chargement</li>
                <li>📱 Mobile-first indexing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Mots-clés ciblés</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">design web</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">marketing digital</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">création site</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">agence web</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "logo",
      title: "LOGO",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Spécifications</h4>
              <ul className="space-y-1 text-gray-600">
                <li>📐 Format vectoriel (SVG, AI)</li>
                <li>🎨 Déclinaisons couleur/noir et blanc</li>
                <li>📏 Versions horizontale et verticale</li>
                <li>💾 Formats web et print</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Utilisation</h4>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">VIVIWORKS</div>
                <div className="text-sm opacity-90">Digital Marketing</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "google-ads",
      title: "CAMPAGNES GOOGLE ADS",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Configuration</h4>
              <ul className="space-y-1 text-gray-600">
                <li>🎯 Ciblage géographique : France</li>
                <li>💰 Budget mensuel : 500€</li>
                <li>📊 Suivi des conversions</li>
                <li>📈 Optimisation continue</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Objectifs</h4>
              <ul className="space-y-1 text-gray-600">
                <li>📞 Génération de leads</li>
                <li>🌐 Augmentation du trafic</li>
                <li>💼 Acquisition de clients</li>
                <li>📊 ROI optimisé</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Dossier partenaire</h1>
          <p className="text-lg text-gray-600">Offre choisie: Viviworks Digital Marketing 48 mois</p>
        </div>

        <div className="space-y-2">
          {sections.map((section) => {
            const isOpen = openSections.has(section.id)
            return (
              <Card key={section.id} className="border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors border-l-4 border-l-blue-500"
                >
                  <h3 className="text-base font-bold text-gray-900 text-left">{section.title}</h3>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {isOpen && (
                  <CardContent className="p-4 border-t border-gray-200 bg-gray-50">{section.content}</CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {/* Résumé du dossier */}
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Résumé du dossier</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-800">Sections ouvertes:</span>
              <span className="ml-2 text-blue-700">
                {openSections.size}/{sections.length}
              </span>
            </div>
            <div>
              <span className="font-medium text-blue-800">Statut:</span>
              <span className="ml-2 text-blue-700">En cours de validation</span>
            </div>
            <div>
              <span className="font-medium text-blue-800">Durée:</span>
              <span className="ml-2 text-blue-700">48 mois</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
