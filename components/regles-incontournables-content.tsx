"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Monitor, Globe, Smartphone, Server, RefreshCw, Search, Settings, Play, Folder, Megaphone, Mail, Clipboard, Image } from "lucide-react"

const regles = [
  {
    id: 1,
    title: "1 - Le nom de domaine",
    position: "top-left",
    visual: (
      <div className="w-20 h-14 bg-gray-400 rounded-lg flex items-center justify-center relative">
        <div className="w-16 h-10 bg-blue-500 rounded flex flex-col p-1">
          <div className="flex items-center gap-1 mb-1">
            <Search className="w-2 h-2 text-white" />
            <div className="w-8 h-1 bg-white rounded"></div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-white rounded"></div>
              <span className="text-white text-xs">.com</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <span className="text-white text-xs">.fr</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-white rounded"></div>
              <span className="text-white text-xs">.org</span>
            </div>
          </div>
        </div>
        <Settings className="w-3 h-3 text-gray-600 absolute -left-1 -top-1" />
      </div>
    ),
  },
  {
    id: 2,
    title: "2 - Le site internet",
    position: "top-center",
    visual: (
      <div className="w-20 h-14 bg-gray-400 rounded-lg flex items-center justify-center">
        <div className="w-16 h-10 bg-white rounded flex">
          <div className="w-4 h-full bg-gray-200 flex flex-col gap-1 p-1">
            <div className="w-full h-0.5 bg-gray-400 rounded"></div>
            <div className="w-full h-0.5 bg-gray-400 rounded"></div>
            <div className="w-full h-0.5 bg-gray-400 rounded"></div>
            <div className="w-full h-0.5 bg-gray-400 rounded"></div>
          </div>
          <div className="flex-1 p-1">
            <div className="grid grid-cols-2 gap-1 mb-1">
              <div className="w-2 h-2 bg-gray-300 rounded"></div>
              <div className="w-2 h-2 bg-gray-300 rounded"></div>
              <div className="w-2 h-2 bg-gray-300 rounded flex items-center justify-center">
                <Play className="w-1 h-1 text-gray-600" />
              </div>
              <div className="w-2 h-2 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-0.5">
              <div className="w-full h-0.5 bg-gray-300 rounded"></div>
              <div className="w-3/4 h-0.5 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-0.5 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "3 - L'hébergement",
    position: "bottom-left",
    visual: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-sm"></div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-8 h-6 bg-gray-400 rounded flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="w-8 h-6 bg-gray-400 rounded flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="w-8 h-6 bg-gray-400 rounded flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "4 - La mise à jour",
    position: "bottom-center",
    visual: (
      <div className="w-20 h-14 bg-gray-400 rounded-lg flex items-center justify-center">
        <div className="w-16 h-10 bg-blue-500 rounded flex flex-wrap items-center justify-center gap-1 p-1">
          <Folder className="w-3 h-3 text-white" />
          <Play className="w-3 h-3 text-white" />
          <Megaphone className="w-3 h-3 text-white" />
          <Mail className="w-3 h-3 text-white" />
          <Clipboard className="w-3 h-3 text-white" />
          <Image className="w-3 h-3 text-white" />
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "5 - Le référencement",
    position: "top-right",
    visual: (
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-12 bg-black rounded-lg flex items-center justify-center">
          <div className="w-6 h-8 bg-white rounded flex flex-col p-1">
            <div className="flex items-center gap-1 mb-1">
              <Search className="w-2 h-2 text-gray-600" />
              <div className="w-3 h-0.5 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-0.5">
              <div className="w-full h-0.5 bg-green-500 rounded"></div>
              <div className="w-full h-0.5 bg-gray-300 rounded"></div>
              <div className="w-full h-0.5 bg-green-500 rounded"></div>
              <div className="w-full h-0.5 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <div className="w-2 h-1 bg-blue-500 rounded"></div>
            <div className="w-3 h-1 bg-blue-500 rounded"></div>
            <div className="w-4 h-1 bg-blue-500 rounded"></div>
            <div className="w-2 h-1 bg-blue-500 rounded"></div>
          </div>
          <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    ),
  },
]

export function ReglesIncontournablesContent() {
  const [currentStep, setCurrentStep] = useState(1) // Commence à 1 pour afficher la première étape
  const [animatedLines, setAnimatedLines] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const handleGlobeClick = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    if (currentStep < 5) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      
      // Animer la ligne après un délai
      setTimeout(() => {
        setAnimatedLines(prev => [...prev, nextStep])
        setIsAnimating(false)
      }, 500)
    } else {
      // Retour au début
      setCurrentStep(1)
      setAnimatedLines([1])
      setIsAnimating(false)
    }
  }

  const handleBlockClick = (stepId: number) => {
    if (isAnimating || stepId !== currentStep) return
    
    setIsAnimating(true)
    // Animer la ligne vers le globe
    setTimeout(() => {
      setAnimatedLines(prev => [...prev, stepId])
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col items-center space-y-8">
        {/* Titre principal */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Les 5 règles incontournables pour avoir une présence efficace sur internet
          </h1>
          <p className="text-gray-600">
            {currentStep === 1 
              ? "Cliquez sur l'étape 1 pour commencer, puis sur le globe pour continuer"
              : "Cliquez sur le globe pour révéler l'étape suivante"
            }
          </p>
        </div>

        {/* Container principal avec disposition en grille et flèches */}
        <div className="relative w-full max-w-6xl h-96 md:h-[500px]">
          {/* Globe central */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handleGlobeClick}
              disabled={isAnimating}
              className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-400 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-300 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-200 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Flèches SVG avec animations */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            {/* Flèche 1 vers globe (haut gauche vers centre) */}
            {animatedLines.includes(1) && (
              <path
                d="M 25% 20% Q 35% 35% 50% 50%"
                stroke="#ff6b35"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowhead)"
                style={{
                  strokeDasharray: "1000",
                  strokeDashoffset: "0",
                  animation: "drawLine 1s ease-in-out"
                }}
              />
            )}
            
            {/* Flèche 2 vers globe (haut centre vers centre) */}
            {animatedLines.includes(2) && (
              <path
                d="M 50% 25% Q 50% 35% 50% 50%"
                stroke="#ff6b35"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowhead)"
                style={{
                  strokeDasharray: "1000",
                  strokeDashoffset: "0",
                  animation: "drawLine 1s ease-in-out"
                }}
              />
            )}
            
            {/* Flèche 3 vers globe (bas gauche vers centre) */}
            {animatedLines.includes(3) && (
              <path
                d="M 25% 75% Q 35% 65% 50% 50%"
                stroke="#ff6b35"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowhead)"
                style={{
                  strokeDasharray: "1000",
                  strokeDashoffset: "0",
                  animation: "drawLine 1s ease-in-out"
                }}
              />
            )}
            
            {/* Flèche 4 vers globe (bas centre vers centre) */}
            {animatedLines.includes(4) && (
              <path
                d="M 50% 75% Q 50% 65% 50% 50%"
                stroke="#ff6b35"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowhead)"
                style={{
                  strokeDasharray: "1000",
                  strokeDashoffset: "0",
                  animation: "drawLine 1s ease-in-out"
                }}
              />
            )}
            
            {/* Flèche 5 vers globe (haut droite vers centre) */}
            {animatedLines.includes(5) && (
              <path
                d="M 75% 25% Q 65% 35% 50% 50%"
                stroke="#ff6b35"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowhead)"
                style={{
                  strokeDasharray: "1000",
                  strokeDashoffset: "0",
                  animation: "drawLine 1s ease-in-out"
                }}
              />
            )}
            
            {/* Définition de la flèche */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#ff6b35" />
              </marker>
            </defs>
          </svg>

          {/* Position 1 - Top Left */}
          <div className={`absolute top-4 left-4 md:top-8 md:left-8 transition-all duration-500 ${
            currentStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <Card 
              className={`w-48 md:w-56 lg:w-64 shadow-lg hover:shadow-xl transition-all bg-white cursor-pointer ${
                currentStep === 1 ? 'ring-2 ring-orange-500 ring-opacity-50' : ''
              }`}
              onClick={() => handleBlockClick(1)}
            >
              <CardContent className="p-4 md:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-pink-500 rounded-full"></div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900">{regles[0].title}</h3>
                </div>
                <div className="flex items-center justify-center mb-3">{regles[0].visual}</div>
              </CardContent>
            </Card>
          </div>

          {/* Position 2 - Top Center */}
          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
            currentStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <Card className="w-48 md:w-56 lg:w-64 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-4 md:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-pink-500 rounded-full"></div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900">{regles[1].title}</h3>
                </div>
                <div className="flex items-center justify-center mb-3">{regles[1].visual}</div>
              </CardContent>
            </Card>
          </div>

          {/* Position 3 - Bottom Left */}
          <div className={`absolute bottom-4 left-4 md:bottom-8 md:left-8 transition-all duration-500 ${
            currentStep >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <Card className="w-48 md:w-56 lg:w-64 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-4 md:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-pink-500 rounded-full"></div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900">{regles[2].title}</h3>
                </div>
                <div className="flex items-center justify-center mb-3">{regles[2].visual}</div>
              </CardContent>
            </Card>
          </div>

          {/* Position 4 - Bottom Center */}
          <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
            currentStep >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <Card className="w-48 md:w-56 lg:w-64 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-4 md:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-pink-500 rounded-full"></div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900">{regles[3].title}</h3>
                </div>
                <div className="flex items-center justify-center mb-3">{regles[3].visual}</div>
              </CardContent>
            </Card>
          </div>

          {/* Position 5 - Top Right */}
          <div className={`absolute top-4 right-4 md:top-8 md:right-8 transition-all duration-500 ${
            currentStep >= 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <Card className="w-48 md:w-56 lg:w-64 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-4 md:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-pink-500 rounded-full"></div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900">{regles[4].title}</h3>
                </div>
                <div className="flex items-center justify-center mb-3">{regles[4].visual}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Indicateur d'étape */}
        <div className="mt-8">
          <div className="bg-white rounded-full px-4 py-2 shadow-lg border">
            <span className="text-sm md:text-base font-semibold text-gray-700">
              Étape {currentStep} / 5
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes drawLine {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  )
}
