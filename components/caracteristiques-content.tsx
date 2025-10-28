"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Check,
  Plus,
  Minus,
  CheckCircle
} from "lucide-react"

// Services à la carte
const servicesCarte = [
  { id: "audit-digital", label: "Audit digital complet", price: 890, type: "one-time" },
  { id: "logo-identite", label: "Création logo + identité", price: 1200, type: "one-time" },
  { id: "formation-sur-mesure", label: "Formations sur mesure", price: 150, type: "per-hour" },
  { id: "crisis-reputation", label: "Gestion crisis e-réputation", price: 500, type: "per-intervention" },
  { id: "hosting-android", label: "Hébergement Android", price: 25, type: "lifetime" },
  { id: "hosting-ios", label: "Hébergement iOS", price: 99, type: "yearly" },
  { id: "geoloc-tracking", label: "Option géolocalisation tracking en continu (hors abonnement API)", price: 2500, type: "one-time" },
]

// Modules additionnels mensuels
const modulesAdditionnels = [
  { id: "ecommerce-avance", label: "E-commerce avancé", price: 400, type: "monthly" },
  { id: "reseaux-supplementaires", label: "Réseaux sociaux supplémentaires (upsell)", price: 200, type: "monthly" },
  { id: "redaction-web", label: "Rédaction web (articles supplémentaires)", price: 150, type: "per-article" },
  { id: "campagnes-saisonnieres", label: "Campagnes saisonnières", price: 300, type: "per-campaign" },
  { id: "maintenance", label: "Maintenance (3 mois gratuits puis 300€/mois)", price: 300, type: "monthly" },
]

// Options chatbot (niveaux)
const chatbotOptions = [
  { id: "chatbot-basic", label: "Chat et chatbot : Niveau basique (FAQ statique multilingue, sans IA)", price: 1990, type: "one-time" },
  { id: "chatbot-mid", label: "Chatbot niveau intermédiaire (NLP, multi-langues via API GPT/Dialogflow/Rasa)", price: 5590, type: "one-time" },
  { id: "chatbot-advanced", label: "Chatbot niveau avancé (IA multilingue, traduction temps réel, connexion CRM/DB, WhatsApp/Telegram/Email)", price: 14990, type: "one-time" },
]

// Reconnaissance faciale
const facialRecognitionOptions = [
  { id: "facial-basic", label: "Reconnaissance faciale - Basique (FaceID/TouchID natif)", price: 990, type: "one-time" },
  { id: "facial-mid", label: "Reconnaissance faciale - Intermédiaire (SDK/API tierce : Face++, AWS, Azure)", price: 4990, type: "one-time" },
  { id: "facial-advanced", label: "Reconnaissance faciale - Avancé (biométrie complète + liveness + intégration CRM/DB)", price: 16990, type: "one-time" },
]

// Scanner codes-barres / QR
const scannerOptions = [
  { id: "scanner-basic", label: "Scanner code-barres/QR - Basique (scanner simple via caméra)", price: 590, type: "one-time" },
  { id: "scanner-mid", label: "Scanner - Intermédiaire (multi-formats + stockage local)", price: 1290, type: "one-time" },
  { id: "scanner-advanced", label: "Scanner - Avancé (intégration DB/ERP/CRM + génération de QR + inventaire)", price: 4990, type: "one-time" },
]

// Authentification biométrique
const biometricAuthOptions = [
  { id: "bio-basic", label: "Authentification biométrique - Basique (FaceID/TouchID natif)", price: 890, type: "one-time" },
  { id: "bio-mid", label: "Authentification biométrique - Intermédiaire (SDK/API tierce)", price: 4990, type: "one-time" },
  { id: "bio-advanced", label: "Authentification biométrique - Avancé (liveness, intégration CRM/ERP, conformité)", price: 12990, type: "one-time" },
]

// Paiement NFC / Wallet
const nfcPaymentOptions = [
  { id: "nfc-basic", label: "Paiement NFC/Wallet - Basique (Apple Pay / Google Pay)", price: 3990, type: "one-time" },
  { id: "nfc-mid", label: "Paiement NFC - Intermédiaire (NFC + fidélité/coupons + Stripe/Adyen/PayPal)", price: 9990, type: "one-time" },
  { id: "nfc-advanced", label: "Paiement NFC - Avancé (NFC + in-app purchase + multi-devises + PCI DSS + intégrations)", price: 25000, type: "one-time" },
]

// Apps mobiles IA
const mobileAppOptions = [
  { id: "app-mobile-ia-starter", label: "APP MOBILE IA - STARTER", price: 4999, type: "project-based" },
  { id: "app-mobile-ia-professionnel", label: "APP MOBILE IA - PROFESSIONNEL", price: 7999, type: "project-based" },
]

export function CaracteristiquesContent() {
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [selectedModules, setSelectedModules] = useState<any[]>([])
  const [selectedChatbot, setSelectedChatbot] = useState<string | null>(null)
  const [selectedMobileApp, setSelectedMobileApp] = useState<string | null>(null)
  const [selectedFacial, setSelectedFacial] = useState<string | null>(null)
  const [selectedScanner, setSelectedScanner] = useState<string | null>(null)
  const [selectedBiometricAuth, setSelectedBiometricAuth] = useState<string | null>(null)
  const [selectedNfcPayment, setSelectedNfcPayment] = useState<string | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleServiceToggle = (serviceId: string) => {
    const service = servicesCarte.find(s => s.id === serviceId)
    if (!service) return

    const existingIndex = selectedServices.findIndex(s => s.id === serviceId)
    
    if (existingIndex >= 0) {
      // Supprimer le service
      setSelectedServices(prev => prev.filter(s => s.id !== serviceId))
    } else {
      // Ajouter le service avec quantité par défaut
      const quantity = service.type === 'per-hour' || service.type === 'per-intervention' ? 1 : 1
      setSelectedServices(prev => [...prev, { ...service, quantity }])
    }
  }

  const handleModuleToggle = (moduleId: string) => {
    const module = modulesAdditionnels.find(m => m.id === moduleId)
    if (!module) return

    const existingIndex = selectedModules.findIndex(m => m.id === moduleId)
    
    if (existingIndex >= 0) {
      // Supprimer le module
      setSelectedModules(prev => prev.filter(m => m.id !== moduleId))
    } else {
      // Ajouter le module avec quantité par défaut
      const quantity = module.type === 'per-article' || module.type === 'per-campaign' ? 1 : 1
      setSelectedModules(prev => [...prev, { ...module, quantity }])
    }
  }

  const handleChatbotSelect = (chatbotId: string) => {
    setSelectedChatbot(selectedChatbot === chatbotId ? null : chatbotId)
  }

  const handleFacialSelect = (id: string) => {
    setSelectedFacial(selectedFacial === id ? null : id)
  }

  const handleScannerSelect = (id: string) => {
    setSelectedScanner(selectedScanner === id ? null : id)
  }

  const handleBiometricAuthSelect = (id: string) => {
    setSelectedBiometricAuth(selectedBiometricAuth === id ? null : id)
  }

  const handleNfcPaymentSelect = (id: string) => {
    setSelectedNfcPayment(selectedNfcPayment === id ? null : id)
  }

  const handleMobileAppSelect = (appId: string) => {
    setSelectedMobileApp(selectedMobileApp === appId ? null : appId)
  }

  const updateQuantity = (type: 'service' | 'module', id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    if (type === 'service') {
      setSelectedServices(prev => 
        prev.map(s => s.id === id ? { ...s, quantity: newQuantity } : s)
      )
    } else {
      setSelectedModules(prev => 
        prev.map(m => m.id === id ? { ...m, quantity: newQuantity } : m)
      )
    }
  }

  const handleConfirm = () => {
    const selections = {
      selectedServices,
      selectedModules,
      selectedChatbot,
      selectedMobileApp,
      selectedFacial,
      selectedScanner,
      selectedBiometricAuth,
      selectedNfcPayment,
    }
    
    localStorage.setItem('caracteristiques-selections', JSON.stringify(selections))
    
    // Afficher le message de succès
    setShowSuccessMessage(true)
    
    // Masquer le message après 3 secondes
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some(s => s.id === serviceId)
  }

  const isModuleSelected = (moduleId: string) => {
    return selectedModules.some(m => m.id === moduleId)
  }

  const getServiceQuantity = (serviceId: string) => {
    const service = selectedServices.find(s => s.id === serviceId)
    return service ? service.quantity : 0
  }

  const getModuleQuantity = (moduleId: string) => {
    const module = selectedModules.find(m => m.id === moduleId)
    return module ? module.quantity : 0
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#804d3b] mb-8 text-center">
          Options complémentaires
        </h1>

        {/* Message de succès */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">Sélections enregistrées !</h3>
              <p className="text-sm text-green-700">Vos options seront incluses dans votre offre de partenariat.</p>
            </div>
          </div>
        )}

        {/* Services à la carte */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#804d3b] flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#804d3b]"></div>
              Services à la Carte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {servicesCarte.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleServiceToggle(service.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isServiceSelected(service.id)
                        ? 'bg-[#804d3b] border-[#804d3b] text-white'
                        : 'border-gray-300 hover:border-[#804d3b]'
                        }`}
                      >
                    {isServiceSelected(service.id) && <Check className="w-4 h-4" />}
                  </button>
                  <div>
                    <div className="font-medium text-gray-900">{service.label}</div>
                    <div className="text-sm text-gray-600">
                      {service.type === 'per-hour' ? `${service.price}€/heure` :
                       service.type === 'per-intervention' ? `${service.price}€/intervention` :
                       service.type === 'yearly' ? `${service.price}€/an` :
                       service.type === 'lifetime' ? `${service.price}€ à vie` :
                       service.type === 'project-based' ? `Prix selon projet (${service.price}€)` :
                       `${service.price}€`}
                    </div>
            </div>
          </div>

                {isServiceSelected(service.id) && (service.type === 'per-hour' || service.type === 'per-intervention') && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity('service', service.id, getServiceQuantity(service.id) - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{getServiceQuantity(service.id)}</span>
                    <button
                      onClick={() => updateQuantity('service', service.id, getServiceQuantity(service.id) + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
            </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Modules additionnels mensuels */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#804d3b] flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#804d3b]"></div>
              Modules Additionnels Mensuels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {modulesAdditionnels.map((module) => (
              <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleModuleToggle(module.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isModuleSelected(module.id)
                        ? 'bg-[#804d3b] border-[#804d3b] text-white'
                        : 'border-gray-300 hover:border-[#804d3b]'
                    }`}
                  >
                    {isModuleSelected(module.id) && <Check className="w-4 h-4" />}
                  </button>
                <div>
                    <div className="font-medium text-gray-900">{module.label}</div>
                    <div className="text-sm text-gray-600">
                      {module.type === 'per-article' ? `${module.price}€/article` : 
                       module.type === 'per-campaign' ? `${module.price}€/campagne` : 
                       `${module.price}€/mois`}
                </div>
              </div>
            </div>

                {isModuleSelected(module.id) && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity('module', module.id, getModuleQuantity(module.id) - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{getModuleQuantity(module.id)}</span>
                    <button
                      onClick={() => updateQuantity('module', module.id, getModuleQuantity(module.id) + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
          </div>
            ))}
          </CardContent>
        </Card>

        {/* Chatbot */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#804d3b] flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#804d3b]"></div>
              Chatbot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {chatbotOptions.map((chatbot) => (
              <div key={chatbot.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleChatbotSelect(chatbot.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedChatbot === chatbot.id
                        ? 'bg-[#804d3b] border-[#804d3b] text-white'
                        : 'border-gray-300 hover:border-[#804d3b]'
                    }`}
                  >
                    {selectedChatbot === chatbot.id && <Check className="w-4 h-4" />}
                  </button>
                  <div>
                    <div className="font-medium text-gray-900">{chatbot.label}</div>
                    <div className="text-sm text-gray-600">{chatbot.price}€</div>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Reconnaissance faciale */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#804d3b] flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#804d3b]"></div>
              Reconnaissance faciale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {facialRecognitionOptions.map((opt) => (
              <div key={opt.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleFacialSelect(opt.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedFacial === opt.id
                        ? 'bg-[#804d3b] border-[#804d3b] text-white'
                        : 'border-gray-300 hover:border-[#804d3b]'
                    }`}
                  >
                    {selectedFacial === opt.id && <Check className="w-4 h-4" />}
                  </button>
                  <div>
                    <div className="font-medium text-gray-900">{opt.label}</div>
                    <div className="text-sm text-gray-600">{opt.price}€</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Scanner codes-barres / QR */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#804d3b] flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#804d3b]"></div>
              Scanner codes-barres / QR
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scannerOptions.map((opt) => (
              <div key={opt.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleScannerSelect(opt.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedScanner === opt.id
                        ? 'bg-[#804d3b] border-[#804d3b] text-white'
                        : 'border-gray-300 hover:border-[#804d3b]'
                    }`}
                  >
                    {selectedScanner === opt.id && <Check className="w-4 h-4" />}
                  </button>
                  <div>
                    <div className="font-medium text-gray-900">{opt.label}</div>
                    <div className="text-sm text-gray-600">{opt.price}€</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Authentification biométrique */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#804d3b] flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#804d3b]"></div>
              Authentification biométrique
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {biometricAuthOptions.map((opt) => (
              <div key={opt.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleBiometricAuthSelect(opt.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedBiometricAuth === opt.id
                        ? 'bg-[#804d3b] border-[#804d3b] text-white'
                        : 'border-gray-300 hover:border-[#804d3b]'
                    }`}
                  >
                    {selectedBiometricAuth === opt.id && <Check className="w-4 h-4" />}
                  </button>
                  <div>
                    <div className="font-medium text-gray-900">{opt.label}</div>
                    <div className="text-sm text-gray-600">{opt.price}€</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Paiement NFC / Wallet */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#804d3b] flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#804d3b]"></div>
              Paiement NFC / Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nfcPaymentOptions.map((opt) => (
              <div key={opt.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleNfcPaymentSelect(opt.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedNfcPayment === opt.id
                        ? 'bg-[#804d3b] border-[#804d3b] text-white'
                        : 'border-gray-300 hover:border-[#804d3b]'
                    }`}
                  >
                    {selectedNfcPayment === opt.id && <Check className="w-4 h-4" />}
                  </button>
                  <div>
                    <div className="font-medium text-gray-900">{opt.label}</div>
                    <div className="text-sm text-gray-600">{opt.price}€</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Apps Mobiles IA */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#804d3b] flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#804d3b]"></div>
              Apps Mobiles IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mobileAppOptions.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleMobileAppSelect(app.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedMobileApp === app.id
                        ? 'bg-[#804d3b] border-[#804d3b] text-white'
                        : 'border-gray-300 hover:border-[#804d3b]'
                    }`}
                  >
                    {selectedMobileApp === app.id && <Check className="w-4 h-4" />}
                  </button>
                  <div>
                    <div className="font-medium text-gray-900">{app.label}</div>
                    <div className="text-sm text-gray-600">Prix selon projet ({app.price}€)</div>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Bouton de confirmation */}
        <div className="text-center">
          <Button 
            onClick={handleConfirm}
            className="bg-[#804d3b] hover:bg-[#6a3f2f] text-white px-8 py-3 text-lg font-bold rounded-xl shadow-lg flex items-center gap-2 mx-auto"
          >
            <CheckCircle className="w-5 h-5" />
            Confirmer les sélections
          </Button>
            </div>

        {/* Récapitulatif des sélections */}
        {(selectedServices.length > 0 || selectedModules.length > 0 || selectedChatbot || selectedMobileApp) && (
          <div className="mt-8 p-6 bg-[#f5e6e0] border-l-4 border-[#804d3b] rounded-r-lg">
            <h3 className="text-lg font-bold text-[#804d3b] mb-4">Récapitulatif de vos sélections</h3>
            
            {selectedServices.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-[#6a3f2f] mb-2">Services à la carte :</h4>
                <ul className="space-y-1">
                  {selectedServices.map((service) => (
                    <li key={service.id} className="text-sm text-[#6a3f2f]">
                      • {service.label} : {service.type === 'per-hour' || service.type === 'per-intervention'
                        ? `${service.price}€ × ${service.quantity} = ${service.price * service.quantity}€`
                        : service.type === 'yearly'
                          ? `${service.price}€/an`
                          : service.type === 'lifetime'
                            ? `${service.price}€ à vie`
                            : service.type === 'project-based'
                              ? `Prix selon projet (${service.price}€)`
                              : `${service.price}€`}
                    </li>
                  ))}
                </ul>
                </div>
            )}

            {selectedModules.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-[#6a3f2f] mb-2">Modules additionnels :</h4>
                <ul className="space-y-1">
                  {selectedModules.map((module) => (
                    <li key={module.id} className="text-sm text-[#6a3f2f]">
                      • {module.label} : {module.type === 'per-article' || module.type === 'per-campaign'
                        ? `${module.price}€ × ${module.quantity} = ${module.price * module.quantity}€`
                        : `${module.price}€/mois × ${module.quantity} = ${module.price * module.quantity}€/mois`}
                    </li>
                  ))}
                </ul>
                </div>
            )}

            {selectedChatbot && (
              <div className="mb-4">
                <h4 className="font-semibold text-[#6a3f2f] mb-2">Chatbot :</h4>
                <ul className="space-y-1">
                  <li className="text-sm text-[#6a3f2f]">
                    • {chatbotOptions.find(c => c.id === selectedChatbot)?.label} : {chatbotOptions.find(c => c.id === selectedChatbot)?.price}€
                  </li>
                </ul>
              </div>
            )}

            {selectedMobileApp && (
              <div className="mb-4">
                <h4 className="font-semibold text-[#6a3f2f] mb-2">App Mobile IA :</h4>
                <ul className="space-y-1">
                  <li className="text-sm text-[#6a3f2f]">
                    • {mobileAppOptions.find(a => a.id === selectedMobileApp)?.label} : Prix selon projet ({mobileAppOptions.find(a => a.id === selectedMobileApp)?.price}€)
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
