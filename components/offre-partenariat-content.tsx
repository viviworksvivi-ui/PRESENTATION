"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Check, Star } from "lucide-react"

interface Package {
  id: string
  name: string
  price: number
  engagement?: string
  popular?: boolean
  features: string[]
  type: "web" | "mobile" | "ai" | "mobile-ai"
}

const defaultWebPackages: Package[] = [
  {
    id: "demarrage",
    name: "DÉMARRAGE DIGITAL",
    price: 890,
    engagement: "engagement 6 mois",
    type: "web",
    features: [
      "Site web vitrine responsive (valeur 2500€)",
      "Référencement local (SEO) optimisé",
      "Fiche Google My Business optimisée",
      "Visuels créés sur mesure",
      "Newsletter mensuelle (jusqu'à 500 contacts)",
      "Reporting mensuel simplifié",
      "Formation initiale (2h) aux outils digitaux"
    ]
  },
  {
    id: "acceleration",
    name: "ACCÉLÉRATION BUSINESS",
    price: 1690,
    engagement: "engagement 12 mois",
    popular: true,
    type: "web",
    features: [
      "Tout du package Démarrage +",
      "Site web avancé avec blog intégré",
      "Stratégie de contenu (4 articles/mois)",
      "Intégration WhatsApp Business",
      "Campagnes Google Ads (budget pub non inclus)",
      "Gestion et optimisation",
      "Email automation (séquences de bienvenue, relance)",
      "Analyse concurrentielle trimestrielle",
      "Rendez-vous stratégique mensuel (1h)"
    ]
  },
  {
    id: "domination",
    name: "DOMINATION MARCHÉ",
    price: 2990,
    engagement: "engagement 12 mois",
    type: "web",
    features: [
      "Tout du package Accélération +",
      "Stratégie digitale complète (audit initial + roadmap)",
      "E-commerce ou fonctionnalités avancées",
      "Marketing automation complet",
      "Intégration chatbot multilingue",
      "Influenceur marketing (1 collaboration/trimestre)",
      "Formation équipe (4h/trimestre)",
      "Consultant dédié (rendez-vous bi-mensuel)",
      "Reporting avancé avec KPIs business"
    ]
  }
]

const defaultMobilePackages: Package[] = [
  {
    id: "mobile",
    name: "APPLICATION MOBILE",
    price: 5000,
    popular: true,
    type: "mobile",
    features: [
      "Application mobile native (iOS et Android)",
      "Développement Flutter/Dart",
      "Interface utilisateur moderne et intuitive",
      "Fonctionnalités personnalisées selon vos besoins",
      "Intégration API et base de données",
      "Tests et débogage complets",
      "Maintenance et mises à jour (6 mois inclus)",
      "Support technique dédié",
      "Formation à l'utilisation de l'application",
      "Documentation technique complète",
      "Hébergement non inclus (gestion par le client)"
    ]
  },
  {
    id: "mobile-gestion",
    name: "GESTION D'APPLICATION",
    price: 300,
    engagement: "engagement 12 mois",
    type: "mobile",
    features: [
      "Maintenance continue de l'application",
      "Mises à jour de sécurité régulières",
      "Support technique prioritaire",
      "Monitoring des performances",
      "Gestion des bugs et corrections",
      "Optimisation des performances",
      "Mises à jour des dépendances",
      "Support utilisateur",
      "Rapports de performance mensuels",
      "Hébergement non inclus (gestion par le client)"
    ]
  }
]

const defaultAiPackages: Package[] = [
  {
    id: "ai-starter",
    name: "SITE WEB IA - STARTER",
    price: 3990,
    popular: true,
    type: "ai",
    features: [
      "Site web sur mesure avec intégration IA",
      "Chatbot intelligent personnalisé (ChatGPT/Claude)",
      "Génération automatique de contenu",
      "Assistant virtuel pour les visiteurs",
      "Automatisation SEO avec Semrush",
      "Analyse concurrentielle automatisée",
      "Interface responsive et moderne",
      "Gestion administrative",
      "Formation à l'utilisation de l'IA",
      "Support technique dédié",
      "Mises à jour mensuelles de l'IA",
      "Reporting des interactions IA"
    ]
  },
  {
    id: "ai-pro",
    name: "SITE WEB IA - PROFESSIONNEL",
    price: 5490,
    type: "ai",
    features: [
      "Tout du package Starter +",
      "Site web sur mesure avec IA avancée",
      "Automatisation complète avec n8n",
      "Scraping automatisé de données",
      "Intégration Semrush + Ahrefs",
      "Automatisation des processus métier",
      "Analyse prédictive des ventes",
      "Optimisation automatique du contenu",
      "Multi-langues avec traduction IA",
      "Intégration WhatsApp Business",
      "Gestion administrative",
      "API IA personnalisée",
      "Consultant IA dédié (2h/mois)",
      "Formation équipe aux outils IA"
    ]
  },
  {
    id: "ai-enterprise",
    name: "SITE WEB IA - ENTERPRISE",
    price: 8490,
    type: "ai",
    features: [
      "Tout du package Professionnel +",
      "Site web sur mesure avec IA développée spécifiquement",
      "Automatisation complète des workflows avec n8n",
      "Scraping avancé et traitement de données",
      "Intégration complète Semrush + Ahrefs + outils SEO",
      "IA multi-modale sur mesure",
      "Automatisation complète des processus",
      "Intégration avec tous vos outils existants",
      "Intégration bouton WhatsApp",
      "Chatbot multilingue",
      "Gestion administrative",
      "IA auto-apprenante et évolutive",
      "Sécurité et conformité RGPD",
      "Consultant IA senior (4h/mois)",
      "Formation complète de l'équipe",
      "Support 24/7 prioritaire",
      "SLA garantie 99.9%"
    ]
  }
]

const defaultMobileAiPackages: Package[] = [
  {
    id: "mobile-ai-starter",
    name: "APP MOBILE IA - STARTER",
    price: 9990,
    popular: true,
    type: "mobile-ai",
    features: [
      "Application mobile native avec IA intégrée",
      "Reconnaissance vocale et traitement du langage",
      "Recommandations personnalisées basées sur l'IA",
      "Interface adaptative selon l'utilisateur",
      "Génération automatique de contenu",
      "Analyse comportementale des utilisateurs",
      "Notifications intelligentes",
      "Support technique dédié",
      "Mises à jour mensuelles de l'IA",
      "Reporting des interactions IA"
    ]
  },
  {
    id: "mobile-ai-pro",
    name: "APP MOBILE IA - PROFESSIONNEL",
    price: 11990,
    type: "mobile-ai",
    features: [
      "Tout du package Starter +",
      "Chatbot intelligent dans l'app (ChatGPT/Claude)",
      "IA avancée avec machine learning",
      "Vision par ordinateur intégrée",
      "Reconnaissance d'images et objets",
      "Automatisation des processus métier",
      "Intégration CRM avec IA",
      "Analyse prédictive des ventes",
      "Optimisation automatique de l'expérience",
      "Multi-langues avec traduction IA",
      "API IA personnalisée",
      "Consultant IA dédié (2h/mois)",
      "Formation équipe aux outils IA"
    ]
  },
  {
    id: "mobile-ai-enterprise",
    name: "APP MOBILE IA - ENTERPRISE",
    price: 14990,
    type: "mobile-ai",
    features: [
      "Tout du package Professionnel +",
      "Chatbot intelligent dans l'app (ChatGPT/Claude)",
      "Intégration WhatsApp Business",
      "IA sur mesure développée spécifiquement",
      "Intelligence artificielle multi-modale",
      "Traitement du langage naturel avancé",
      "Vision par ordinateur et AR/VR",
      "Automatisation complète des workflows",
      "Décisions automatisées basées sur l'IA",
      "Intégration CRM avec IA",
      "Intégration avec tous vos outils existants",
      "IA auto-apprenante et évolutive",
      "Sécurité et conformité RGPD",
      "Consultant IA senior (4h/mois)",
      "Formation complète de l'équipe",
      "Support 24/7 prioritaire",
      "SLA garantie 99.9%"
    ]
  }
]

export function OffrePartenariatContent() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showPackages, setShowPackages] = useState(false)
  const [projectType, setProjectType] = useState<"web" | "mobile" | "ai" | "mobile-ai" | null>(null)
  const [entrepriseInfo, setEntrepriseInfo] = useState<{
    adresse: string
    codePostal: string
    ville: string
    telephone: string
    email: string
  } | null>(null)

  // États pour les packages avec prix modifiables
  const [webPackages, setWebPackages] = useState<Package[]>(defaultWebPackages)
  const [mobilePackages, setMobilePackages] = useState<Package[]>(defaultMobilePackages)
  const [aiPackages, setAiPackages] = useState<Package[]>(defaultAiPackages)
  const [mobileAiPackages, setMobileAiPackages] = useState<Package[]>(defaultMobileAiPackages)

  // Récupérer les informations de l'entreprise depuis localStorage
  useEffect(() => {
    const savedInfo = localStorage.getItem('entreprise-info')
    if (savedInfo) {
      try {
        setEntrepriseInfo(JSON.parse(savedInfo))
      } catch (error) {
        console.error('Erreur lors de la lecture des informations entreprise:', error)
      }
    }
  }, [])

  // Charger les prix modifiés depuis localStorage
  useEffect(() => {
    const savedPrices = localStorage.getItem('viviworks-package-prices')
    if (savedPrices) {
      try {
        const prices = JSON.parse(savedPrices)
        
        // Merger les prix sauvegardés avec les packages par défaut pour garder les features
        if (prices.web) {
          const mergedWeb = defaultWebPackages.map(pkg => {
            const savedPkg = prices.web.find((p: Package) => p.id === pkg.id)
            return savedPkg ? { ...pkg, price: savedPkg.price } : pkg
          })
          setWebPackages(mergedWeb)
        }
        
        if (prices.mobile) {
          const mergedMobile = defaultMobilePackages.map(pkg => {
            const savedPkg = prices.mobile.find((p: Package) => p.id === pkg.id)
            return savedPkg ? { ...pkg, price: savedPkg.price } : pkg
          })
          setMobilePackages(mergedMobile)
        }
        
        if (prices.ai) {
          const mergedAi = defaultAiPackages.map(pkg => {
            const savedPkg = prices.ai.find((p: Package) => p.id === pkg.id)
            return savedPkg ? { ...pkg, price: savedPkg.price } : pkg
          })
          setAiPackages(mergedAi)
        }
        
        if (prices.mobileAi) {
          const mergedMobileAi = defaultMobileAiPackages.map(pkg => {
            const savedPkg = prices.mobileAi.find((p: Package) => p.id === pkg.id)
            return savedPkg ? { ...pkg, price: savedPkg.price } : pkg
          })
          setMobileAiPackages(mergedMobileAi)
        }
      } catch (error) {
        console.error('Erreur lors de la lecture des prix:', error)
      }
    }
  }, [])

  // Ajouter les fonctions pour récupérer les données des options
  const getServiceData = (id: string) => {
    const servicesCarte = [
      { id: "audit-digital", label: "Audit digital complet", price: 890, type: "one-time" },
      { id: "logo-identite", label: "Création logo + identité", price: 1200, type: "one-time" },
      { id: "formation-sur-mesure", label: "Formations sur mesure", price: 150, type: "per-hour" },
      { id: "crisis-reputation", label: "Gestion crisis e-réputation", price: 500, type: "per-intervention" },
    ]
    return servicesCarte.find(s => s.id === id)
  }

  const getModuleData = (id: string) => {
    const modulesAdditionnels = [
      { id: "ecommerce-avance", label: "E-commerce avancé", price: 400, type: "monthly" },
      { id: "reseaux-supplementaires", label: "Réseaux sociaux supplémentaires (upsell)", price: 200, type: "monthly" },
      { id: "redaction-web", label: "Rédaction web (articles supplémentaires)", price: 150, type: "per-article" },
      { id: "campagnes-saisonnieres", label: "Campagnes saisonnières", price: 300, type: "per-campaign" },
      { id: "maintenance", label: "Maintenance (3 mois gratuits puis 300€/mois)", price: 300, type: "monthly" },
    ]
    return modulesAdditionnels.find(m => m.id === id)
  }

  const getChatbotData = (id: string) => {
    const chatbotOptions = [
      { id: "chatbot-basic", label: "Chat et chatbot : Niveau basique (FAQ statique multilingue, sans IA)", price: 1990, type: "one-time" },
      { id: "chatbot-mid", label: "Chatbot niveau intermédiaire (NLP, multi-langues via API GPT/Dialogflow/Rasa)", price: 5590, type: "one-time" },
      { id: "chatbot-advanced", label: "Chatbot niveau avancé (IA multilingue, traduction temps réel, connexion CRM/DB, WhatsApp/Telegram/Email)", price: 14990, type: "one-time" },
    ]
    return chatbotOptions.find(c => c.id === id)
  }

  const getFacialData = (id: string) => {
    const options = [
      { id: "facial-basic", label: "Reconnaissance faciale - Basique (FaceID/TouchID natif)", price: 990, type: "one-time" },
      { id: "facial-mid", label: "Reconnaissance faciale - Intermédiaire (SDK/API tierce : Face++, AWS, Azure)", price: 4990, type: "one-time" },
      { id: "facial-advanced", label: "Reconnaissance faciale - Avancé (biométrie complète + liveness + intégration CRM/DB)", price: 16990, type: "one-time" },
    ]
    return options.find(o => o.id === id)
  }

  const getScannerData = (id: string) => {
    const options = [
      { id: "scanner-basic", label: "Scanner code-barres/QR - Basique (scanner simple via caméra)", price: 590, type: "one-time" },
      { id: "scanner-mid", label: "Scanner - Intermédiaire (multi-formats + stockage local)", price: 1290, type: "one-time" },
      { id: "scanner-advanced", label: "Scanner - Avancé (intégration DB/ERP/CRM + génération de QR + inventaire)", price: 4990, type: "one-time" },
    ]
    return options.find(o => o.id === id)
  }

  const getBiometricAuthData = (id: string) => {
    const options = [
      { id: "bio-basic", label: "Authentification biométrique - Basique (FaceID/TouchID natif)", price: 890, type: "one-time" },
      { id: "bio-mid", label: "Authentification biométrique - Intermédiaire (SDK/API tierce)", price: 4990, type: "one-time" },
      { id: "bio-advanced", label: "Authentification biométrique - Avancé (liveness, intégration CRM/ERP, conformité)", price: 12990, type: "one-time" },
    ]
    return options.find(o => o.id === id)
  }

  const getNfcPaymentData = (id: string) => {
    const options = [
      { id: "nfc-basic", label: "Paiement NFC/Wallet - Basique (Apple Pay / Google Pay)", price: 3990, type: "one-time" },
      { id: "nfc-mid", label: "Paiement NFC - Intermédiaire (NFC + fidélité/coupons + Stripe/Adyen/PayPal)", price: 9990, type: "one-time" },
      { id: "nfc-advanced", label: "Paiement NFC - Avancé (NFC + in-app purchase + multi-devises + PCI DSS + intégrations)", price: 25000, type: "one-time" },
    ]
    return options.find(o => o.id === id)
  }

  const handleProjectTypeClick = (type: "web" | "mobile" | "ai" | "mobile-ai") => {
    setProjectType(type)
    setShowPackages(true)
    setSelectedPackage(null)
  }

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
  }

  const getCurrentPackages = (): Package[] => {
    if (projectType === "mobile") return mobilePackages
    if (projectType === "ai") return aiPackages
    if (projectType === "mobile-ai") return mobileAiPackages
    return webPackages
  }

  const downloadAsPDF = async () => {
    if (!selectedPackage) return

    const currentPackages = getCurrentPackages()
    const selectedPkg = currentPackages.find(pkg => pkg.id === selectedPackage)
    if (!selectedPkg) return

    // Récupérer les options complémentaires depuis localStorage
    const caracteristiquesSelections = localStorage.getItem('caracteristiques-selections')
    let selectedServices: any[] = []
    let selectedModules: any[] = []
    let selectedChatbot: string | null = null
    let selectedFacial: string | null = null
    let selectedScanner: string | null = null
    let selectedBiometricAuth: string | null = null
    let selectedNfcPayment: string | null = null
    let totalOptions = 0

    if (caracteristiquesSelections) {
      try {
        const data = JSON.parse(caracteristiquesSelections)
        selectedServices = data.selectedServices || []
        selectedModules = data.selectedModules || []
        selectedChatbot = data.selectedChatbot || null
        selectedFacial = data.selectedFacial || null
        selectedScanner = data.selectedScanner || null
        selectedBiometricAuth = data.selectedBiometricAuth || null
        selectedNfcPayment = data.selectedNfcPayment || null
        
        // Calculer le total des options
        selectedServices.forEach((service: any) => {
          const serviceData = getServiceData(service.id)
          if (serviceData) {
            if (serviceData.type === 'per-hour' || serviceData.type === 'per-intervention') {
              totalOptions += serviceData.price * (service.quantity || 1)
            } else {
              totalOptions += serviceData.price
            }
          }
        })

        selectedModules.forEach((module: any) => {
          const moduleData = getModuleData(module.id)
          if (moduleData) {
            if (moduleData.type === 'per-article' || moduleData.type === 'per-campaign') {
              totalOptions += moduleData.price * (module.quantity || 1)
            } else {
              totalOptions += moduleData.price * (module.quantity || 1)
            }
          }
        })

        if (selectedChatbot) {
          const chatbotData = getChatbotData(selectedChatbot)
          if (chatbotData) {
            totalOptions += chatbotData.price
          }
        }

        if (selectedFacial) {
          const opt = getFacialData(selectedFacial)
          if (opt) totalOptions += opt.price
        }
        if (selectedScanner) {
          const opt = getScannerData(selectedScanner)
          if (opt) totalOptions += opt.price
        }
        if (selectedBiometricAuth) {
          const opt = getBiometricAuthData(selectedBiometricAuth)
          if (opt) totalOptions += opt.price
        }
        if (selectedNfcPayment) {
          const opt = getNfcPaymentData(selectedNfcPayment)
          if (opt) totalOptions += opt.price
        }
      } catch (error) {
        console.error('Erreur lors de la lecture des sélections caractéristiques:', error)
      }
    }

    // Convertir le logo en base64
    const convertLogoToBase64 = async () => {
      try {
        const response = await fetch('/logo.png')
        const blob = await response.blob()
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(blob)
        })
      } catch (error) {
        console.error('Erreur lors du chargement du logo:', error)
        return null
      }
    }
    
    const logoBase64 = await convertLogoToBase64()
    
    const totalHT = selectedPkg.price + totalOptions
    const totalTVA = totalHT * 0.20 // 20% de TVA
    const totalTTC = totalHT + totalTVA
    
    // Générer le contenu des options complémentaires
    const generateOptionsContent = () => {
      let optionsHtml = ''
      
      if (selectedServices.length > 0 || selectedModules.length > 0 || selectedChatbot) {
        optionsHtml += `
          <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <h3 style="color: #4fafc4; margin-bottom: 20px;">OPTIONS COMPLÉMENTAIRES SÉLECTIONNÉES</h3>
        `
        
        // Services à la carte
        if (selectedServices.length > 0) {
          optionsHtml += `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #804d3b; margin-bottom: 10px;">Services à la Carte :</h4>
              <ul style="margin: 0; padding-left: 20px;">
          `
          selectedServices.forEach((service: any) => {
            const serviceData = getServiceData(service.id)
            if (serviceData) {
              const price = serviceData.type === 'per-hour' || serviceData.type === 'per-intervention' 
                ? `${serviceData.price}€ × ${service.quantity || 1} = ${serviceData.price * (service.quantity || 1)}€`
                : `${serviceData.price}€`
              optionsHtml += `<li>${serviceData.label} : ${price}</li>`
            }
          })
          optionsHtml += `</ul></div>`
        }
        
        // Modules additionnels
        if (selectedModules.length > 0) {
          optionsHtml += `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #804d3b; margin-bottom: 10px;">Modules Additionnels :</h4>
              <ul style="margin: 0; padding-left: 20px;">
          `
          selectedModules.forEach((module: any) => {
            const moduleData = getModuleData(module.id)
            if (moduleData) {
              const price = moduleData.type === 'per-article' || moduleData.type === 'per-campaign'
                ? `${moduleData.price}€ × ${module.quantity || 1} = ${moduleData.price * (module.quantity || 1)}€`
                : `${moduleData.price}€/mois × ${module.quantity || 1} = ${moduleData.price * (module.quantity || 1)}€/mois`
              optionsHtml += `<li>${moduleData.label} : ${price}</li>`
            }
          })
          optionsHtml += `</ul></div>`
        }
        
        // Chatbot
        if (selectedChatbot) {
          const chatbotData = getChatbotData(selectedChatbot)
          if (chatbotData) {
            optionsHtml += `
              <div style="margin-bottom: 20px;">
                <h4 style="color: #804d3b; margin-bottom: 10px;">Chatbot :</h4>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>${chatbotData.label} : ${chatbotData.price}€</li>
                </ul>
              </div>
            `
          }
        }

        // Reconnaissance faciale
        if (selectedFacial) {
          const opt = getFacialData(selectedFacial)
          if (opt) {
            optionsHtml += `
              <div style="margin-bottom: 20px;">
                <h4 style="color: #804d3b; margin-bottom: 10px;">Reconnaissance faciale :</h4>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>${opt.label} : ${opt.price}€</li>
                </ul>
              </div>
            `
          }
        }

        // Scanner codes-barres / QR
        if (selectedScanner) {
          const opt = getScannerData(selectedScanner)
          if (opt) {
            optionsHtml += `
              <div style="margin-bottom: 20px;">
                <h4 style="color: #804d3b; margin-bottom: 10px;">Scanner codes-barres / QR :</h4>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>${opt.label} : ${opt.price}€</li>
                </ul>
              </div>
            `
          }
        }

        // Authentification biométrique
        if (selectedBiometricAuth) {
          const opt = getBiometricAuthData(selectedBiometricAuth)
          if (opt) {
            optionsHtml += `
              <div style="margin-bottom: 20px;">
                <h4 style="color: #804d3b; margin-bottom: 10px;">Authentification biométrique :</h4>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>${opt.label} : ${opt.price}€</li>
                </ul>
              </div>
            `
          }
        }

        // Paiement NFC / Wallet
        if (selectedNfcPayment) {
          const opt = getNfcPaymentData(selectedNfcPayment)
          if (opt) {
            optionsHtml += `
              <div style="margin-bottom: 20px;">
                <h4 style="color: #804d3b; margin-bottom: 10px;">Paiement NFC / Wallet :</h4>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>${opt.label} : ${opt.price}€</li>
                </ul>
              </div>
            `
          }
        }
        
        optionsHtml += `</div>`
      }
      
      return optionsHtml
    }
    
    const content = `
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Offre de Partenariat - ${selectedPkg.name} - Viviworks</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 40px; line-height: 1.6; background: white; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
            .logo { max-width: 200px; height: auto; }
            .contact-section { display: flex; justify-content: space-between; margin-bottom: 40px; }
            .contact-block { width: 48%; }
            .contact-block:first-child { width: 40%; }
            .contact-block:last-child { width: 50%; text-align: right; }
            .contact-title { font-weight: bold; font-size: 18px; margin-bottom: 15px; color: #4fafc4; }
            .contact-field { margin-bottom: 3px; }
            .contact-label { font-weight: bold; color: #666; }
            .contact-value { padding: 2px 0; min-height: 20px; }
            .package-title { text-align: center; font-size: 28px; font-weight: bold; margin: 30px 0; color: #4fafc4; }
            .package-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .features-list { margin: 20px 0; }
            .feature-item { margin: 5px 0; padding-left: 20px; position: relative; }
            .feature-item:before { content: "✓"; position: absolute; left: 0; color: #4fafc4; font-weight: bold; }
            .price-section { background: #4fafc4; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .price { font-size: 26px; font-weight: bold; }
            .engagement { font-size: 12px; margin-top: 10px; }
            .footer { margin-top: 40px; display: flex; justify-content: space-between; }
            .signature { width: 48%; text-align: center; }
            .signature-line { border-top: 1px solid #4fafc4; margin-top: 40px; padding-top: 10px; }
            .mobile-note { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <img src="${logoBase64}" alt="Viviworks Logo" class="logo">
            </div>
            <div style="text-align: right;">
              <div style="font-size: 32px; font-weight: bold; margin-bottom: 15px; color: #333;">OFFRE DE PARTENARIAT</div>
              <div style="font-size: 14px; line-height: 1.8; color: #333;">
                <div>Numéro : VW-${Date.now().toString().slice(-6)}</div>
                <div>Date : ${new Date().toLocaleDateString('fr-FR')}</div>
                <div>Validité : 30 jours</div>
              </div>
            </div>
          </div>

          <div class="contact-section">
            <div class="contact-block">
              <div class="contact-title">VIVIWORKS</div>
              <div class="contact-field">
                <div class="contact-value">24-26 Arcadia Avenue, Fin0000, Londres, Royaume-Uni, N3 2JU</div>
              </div>
              <div class="contact-field">
                <div class="contact-value">+33784789910</div>
              </div>
              <div class="contact-field">
                <div class="contact-value">info@viviworks.fr</div>
              </div>
            </div>
            <div class="contact-block">
              <div class="contact-title">CLIENT</div>
              <div class="contact-field">
                <div class="contact-value">${entrepriseInfo ? entrepriseInfo.adresse : ''}</div>
              </div>
              <div class="contact-field">
                <div class="contact-value">${entrepriseInfo ? entrepriseInfo.codePostal + ' ' + entrepriseInfo.ville : ''}</div>
              </div>
              <div class="contact-field">
                <div class="contact-value">${entrepriseInfo ? entrepriseInfo.telephone : ''}</div>
              </div>
              <div class="contact-field">
                <div class="contact-value">${entrepriseInfo ? entrepriseInfo.email : ''}</div>
              </div>
            </div>
          </div>

          <div class="package-title">Package ${selectedPkg.name}</div>
          
          <div class="price-section">
            <div class="price">${selectedPkg.id === "mobile-gestion" ? `${selectedPkg.price}€/mois` : 
              (selectedPkg.type === "ai" || selectedPkg.type === "mobile-ai") && selectedPkg.price === 0 ? "Prix selon projet" :
              `À partir de ${selectedPkg.price}€`}</div>
            ${selectedPkg.type !== 'web' && selectedPkg.engagement ? `<div class="engagement">${selectedPkg.engagement}</div>` : ''}
          </div>

          <div class="package-details">
            <h3 style="color: #4fafc4; margin-bottom: 20px;">Inclus dans ce package :</h3>
            <div class="features-list">
              ${selectedPkg.features.map((feature: string) => `<div class="feature-item">${feature}</div>`).join('')}
            </div>
          </div>

          ${generateOptionsContent()}

          ${selectedPkg.type === "mobile" ? `
          <div class="mobile-note">
            <h4 style="color: #856404; margin-bottom: 10px;">⚠️ Note importante pour les applications mobiles :</h4>
            <p style="color: #856404; margin: 0;">
              L'hébergement et les services cloud ne sont pas inclus dans ce package. 
              Le client devra gérer l'hébergement de ses propres serveurs et bases de données.
            </p>
          </div>
          ` : ''}

          <div style="margin-top: 40px; padding: 20px; border: 2px solid #4fafc4; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <strong style="font-size: 18px; color: #4fafc4;">RÉCAPITULATIF FINANCIER</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 10px 0;">
              <span>Prix ${selectedPkg.id === "mobile-gestion" ? "mensuel" : selectedPkg.type === "mobile" ? "de base" : (selectedPkg.type === "ai" || selectedPkg.type === "mobile-ai") ? "selon projet" : "de base"} H.T. :</span>
              <span><strong>${(selectedPkg.type === "ai" || selectedPkg.type === "mobile-ai") && selectedPkg.price === 0 ? "À définir selon projet" : `${selectedPkg.price}€`}</strong></span>
            </div>
            ${totalOptions > 0 ? `
            <div style="display: flex; justify-content: space-between; margin: 10px 0;">
              <span>Options complémentaires H.T. :</span>
              <span><strong>${totalOptions}€</strong></span>
            </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; margin: 10px 0; padding-top: 10px; border-top: 1px solid #ccc;">
              <span><strong>Total H.T. :</strong></span>
              <span><strong>${totalHT}€</strong></span>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 10px 0; padding-top: 10px; border-top: 1px solid #ccc;">
              <span style="font-size: 18px;"><strong>Total ${selectedPkg.id === "mobile-gestion" ? "mensuel" : selectedPkg.type === "mobile" ? "de base" : (selectedPkg.type === "ai" || selectedPkg.type === "mobile-ai") ? "selon projet" : "de base"} :</strong></span>
              <span style="font-size: 18px; color: #4fafc4;"><strong>${(selectedPkg.type === "ai" || selectedPkg.type === "mobile-ai") && selectedPkg.price === 0 ? "À définir selon projet" : `${totalTTC.toFixed(2)}€`}</strong></span>
            </div>
          </div>

          <div class="footer">
            <div style="width: 48%;">
              <div style="font-weight: bold; margin-bottom: 10px;">Conditions :</div>
              <div style="font-size: 14px;">
                ${selectedPkg.engagement ? `<div>• ${selectedPkg.engagement}</div>` : ''}
                <div>• ${selectedPkg.id === "mobile-gestion" ? "Facturation mensuelle" : selectedPkg.type === "mobile" ? "Facturation en une fois ou échelonnée" : (selectedPkg.type === "ai" || selectedPkg.type === "mobile-ai") ? "Facturation selon devis personnalisé" : "Facturation mensuelle"}</div>
                <div>• Résiliation possible avec préavis de 30 jours</div>
                ${selectedPkg.type === "mobile" ? '<div>• Hébergement et services cloud non inclus</div>' : ''}
              </div>
            </div>
            <div class="signature">
              <div>Signature du client</div>
              <div style="font-size: 12px; color: #666;">(précédé de la mention « Bon pour accord »)</div>
              <div class="signature-line"></div>
            </div>
          </div>
        </body>
      </html>
    `
    
    const blob = new Blob([content], { type: 'text/html; charset=UTF-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `offre-partenariat-${selectedPkg.id}-${new Date().toISOString().split('T')[0]}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (!showPackages) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#804d3b] mb-8">Offre de partenariat</h1>
          
          {/* Informations de l'entreprise confirmées */}
          {entrepriseInfo && (
            <div className="mb-6 p-4 bg-[#e8f4f8] border border-[#4fafc4] rounded-lg">
              <h3 className="text-lg font-semibold text-[#4fafc4] mb-3 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Informations de l'entreprise confirmées
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Adresse</div>
                  <div className="text-sm font-medium text-gray-900">{entrepriseInfo.adresse}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Code postal & Ville</div>
                  <div className="text-sm font-medium text-gray-900">{entrepriseInfo.codePostal} {entrepriseInfo.ville}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Téléphone</div>
                  <div className="text-sm font-medium text-gray-900">{entrepriseInfo.telephone}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Email</div>
                  <div className="text-sm font-medium text-gray-900">{entrepriseInfo.email}</div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-[#804d3b] mb-6">Choisissez votre type de projet</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-[#4fafc4]" onClick={() => handleProjectTypeClick("web")}>
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🌐</div>
                  <h3 className="text-xl font-bold text-[#4fafc4] mb-2">Site Web</h3>
                  <p className="text-gray-600">Packages digitaux complets</p>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-[#4fafc4]" onClick={() => handleProjectTypeClick("ai")}>
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-bold text-[#4fafc4] mb-2">Site Web IA</h3>
                  <p className="text-gray-600">Solutions intelligentes avec IA</p>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-[#4fafc4]" onClick={() => handleProjectTypeClick("mobile")}>
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">📱</div>
                  <h3 className="text-xl font-bold text-[#4fafc4] mb-2">Application Mobile</h3>
                  <p className="text-gray-600">Solutions mobiles sur mesure</p>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-[#4fafc4]" onClick={() => handleProjectTypeClick("mobile-ai")}>
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">📱🤖</div>
                  <h3 className="text-xl font-bold text-[#4fafc4] mb-2">Application Mobile IA</h3>
                  <p className="text-gray-600">Apps mobiles intelligentes</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentPackages = getCurrentPackages()

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button 
              onClick={() => setShowPackages(false)}
              variant="outline"
              className="mb-4 text-[#4fafc4] border-[#4fafc4] hover:bg-[#4fafc4] hover:text-white"
            >
              ← Retour
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-[#804d3b]">
              Packages {projectType === "mobile" ? "Application Mobile" : projectType === "ai" ? "Site Web IA" : projectType === "mobile-ai" ? "Application Mobile IA" : "Site Web"}
            </h1>
          </div>
          
          {selectedPackage && (
            <Button 
              onClick={downloadAsPDF}
              className="bg-[#804d3b] hover:bg-[#6a3f2f] text-white px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-bold rounded-xl shadow-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Télécharger PDF
            </Button>
          )}
        </div>

        {/* Informations de l'entreprise confirmées */}
        {entrepriseInfo && (
          <div className="mb-8 p-4 bg-[#e8f4f8] border border-[#4fafc4] rounded-lg">
            <h3 className="text-lg font-semibold text-[#4fafc4] mb-3 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              Informations de l'entreprise confirmées
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Adresse</div>
                <div className="text-sm font-medium text-gray-900">{entrepriseInfo.adresse}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Code postal & Ville</div>
                <div className="text-sm font-medium text-gray-900">{entrepriseInfo.codePostal} {entrepriseInfo.ville}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Téléphone</div>
                <div className="text-sm font-medium text-gray-900">{entrepriseInfo.telephone}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Email</div>
                <div className="text-sm font-medium text-gray-900">{entrepriseInfo.email}</div>
              </div>
            </div>
          </div>
        )}

        {/* Note spéciale pour les applications mobiles */}
        {projectType === "mobile" && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              Note importante
            </h3>
            <p className="text-yellow-700 text-sm">
              L'hébergement et les services cloud ne sont pas inclus dans ce package. 
              Le client devra gérer l'hébergement de ses propres serveurs et bases de données.
            </p>
          </div>
        )}

        <div className={`grid items-stretch gap-8 ${projectType === "mobile" ? "grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto" : "grid-cols-1 lg:grid-cols-3"}`}>
          {currentPackages.map((pkg: Package) => (
            <Card 
              key={pkg.id} 
              className={`relative h-full flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl ${
                selectedPackage === pkg.id 
                  ? 'border-2 border-[#4fafc4] shadow-lg transform scale-105' 
                  : 'border border-gray-200 hover:border-[#4fafc4]'
              } ${pkg.popular ? 'ring-2 ring-[#4fafc4] ring-opacity-50' : ''}`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#4fafc4] text-white px-4 py-1 text-sm font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    POPULAIRE
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-[#804d3b] mb-2">{pkg.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-[#4fafc4]">
                    {pkg.id === "mobile-gestion" ? `${pkg.price}€/mois` : 
                     (pkg.type === "ai" || pkg.type === "mobile-ai") && pkg.price === 0 ? "Prix selon projet" :
                     `À partir de ${pkg.price}€`}
                    {pkg.id === "mobile-gestion" && <span className="text-lg font-normal">/mois</span>}
                  </div>
                  {pkg.engagement && pkg.type !== "web" && (
                    <div className="text-sm text-gray-600">({pkg.engagement})</div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col flex-1 space-y-4">
                <div className="space-y-3 flex-1">
                  {pkg.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#4fafc4] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 mt-auto">
                  <Button 
                    className={`w-full ${
                      selectedPackage === pkg.id
                        ? 'bg-[#4fafc4] hover:bg-[#3d8a9c] text-white'
                        : 'bg-white border-2 border-[#4fafc4] text-[#4fafc4] hover:bg-[#4fafc4] hover:text-white'
                    }`}
                  >
                    {selectedPackage === pkg.id ? 'Package sélectionné' : 'Sélectionner ce package'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPackage && (
          <div className="mt-8 p-6 bg-[#f5e6e0] border-l-4 border-[#804d3b] rounded-r-lg">
            <h3 className="text-lg font-bold text-[#804d3b] mb-3">Package sélectionné</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#6a3f2f]">
                  {currentPackages.find((p: Package) => p.id === selectedPackage)?.name} - 
                  {currentPackages.find((p: Package) => p.id === selectedPackage)?.id === "mobile-gestion" 
                    ? `${currentPackages.find((p: Package) => p.id === selectedPackage)?.price}€/mois`
                    : (currentPackages.find((p: Package) => p.id === selectedPackage)?.type === "ai" || currentPackages.find((p: Package) => p.id === selectedPackage)?.type === "mobile-ai") && currentPackages.find((p: Package) => p.id === selectedPackage)?.price === 0
                    ? "Prix selon projet"
                    : `À partir de ${currentPackages.find((p: Package) => p.id === selectedPackage)?.price}€${projectType === "web" || ((projectType === "ai" || projectType === "mobile-ai") && currentPackages.find((p: Package) => p.id === selectedPackage)?.price > 0) ? "/mois" : ""}`
                  }
                </p>
                {currentPackages.find((p: Package) => p.id === selectedPackage)?.engagement && (
                  <p className="text-sm text-[#6a3f2f]">
                    {currentPackages.find((p: Package) => p.id === selectedPackage)?.engagement}
                  </p>
                )}
              </div>
              <Button 
                onClick={downloadAsPDF}
                className="bg-[#804d3b] hover:bg-[#6a3f2f] text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger l'offre
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-[#f5e6e0] border-l-4 border-[#804d3b] rounded-r-lg">
          <p className="text-sm text-[#6a3f2f]">
            <span className="font-semibold">Note :</span> 
            {projectType === "mobile" 
              ? " Les prix sont indiqués hors taxes et hors hébergement. Tous nos packages incluent un accompagnement personnalisé et un support technique dédié."
              : projectType === "ai"
              ? " Les packages IA sont des sites sur mesure avec prix variables selon la complexité du projet. Incluent automatisation SEO (Semrush, Ahrefs), workflows (n8n) et scraping automatisé."
              : projectType === "mobile-ai"
              ? " Les packages Application Mobile IA sont des apps sur mesure avec prix variables selon la complexité du projet. Incluent IA intégrée, reconnaissance vocale, vision par ordinateur et automatisation avancée."
              : " Les prix sont indiqués hors taxes. Tous nos packages incluent un accompagnement personnalisé et un support technique dédié."
            }
          </p>
        </div>
      </div>
    </div>
  )
}

