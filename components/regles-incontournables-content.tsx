"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Search, Settings, Play, Folder, Megaphone, Mail, Clipboard, Image, Shield, Mouse, Globe } from "lucide-react"

const regles = [
  {
    id: 1,
    title: "1 - Le nom de domaine",
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
    visual: (
      <div className="flex items-center gap-2">
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
                <div className="w-2 h-2 bg-gray-300 rounded"></div>
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
        <Mouse className="w-4 h-4 text-gray-600" />
      </div>
    ),
  },
  {
    id: 3,
    title: "3 - L'hébergement",
    visual: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
          <Shield className="w-3 h-3 text-white" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
            <div className="flex gap-1">
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
    visual: (
      <div className="w-20 h-14 bg-gray-400 rounded-lg flex items-center justify-center">
        <div className="w-16 h-10 bg-white rounded flex flex-col p-1">
          <div className="grid grid-cols-3 gap-1 mb-1">
            <Folder className="w-3 h-3 text-yellow-500" />
            <Play className="w-3 h-3 text-red-500" />
            <Megaphone className="w-3 h-3 text-pink-500" />
          </div>
          <div className="grid grid-cols-3 gap-1">
            <Mail className="w-3 h-3 text-yellow-500" />
            <Clipboard className="w-3 h-3 text-blue-500" />
            <Image className="w-3 h-3 text-gray-600" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "5 - Le référencement",
    visual: (
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-10 bg-white rounded border flex flex-col p-1">
          <div className="w-full h-1 bg-gray-300 rounded mb-1"></div>
          <div className="space-y-0.5">
            <div className="w-full h-0.5 bg-gray-300 rounded"></div>
            <div className="w-3/4 h-0.5 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-0.5 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-4 bg-blue-400 rounded"></div>
            <div className="w-2 h-6 bg-blue-400 rounded"></div>
            <div className="w-2 h-8 bg-green-400 rounded"></div>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    ),
  },
]

export function ReglesIncontournablesContent() {
  const [visibleCount, setVisibleCount] = useState(0)

  const handleGlobeClick = () => {
    setVisibleCount((prev) => (prev < 5 ? prev + 1 : 0))
  }

  const visibles = regles.filter((r) => r.id <= visibleCount)

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Les 5 règles incontournables pour avoir une présence efficace sur internet
          </h1>
        {/* Boule web cliquable */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleGlobeClick}
            className="group relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl hover:shadow-3xl transition-all duration-300 focus:outline-none"
            aria-label="Afficher la règle suivante"
          >
            <div className="absolute inset-0 rounded-full bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-full h-full rounded-full flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-400 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-300 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-200 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Cliquez la boule pour afficher les règles ({visibleCount}/5)
        </p>
          </div>

      {visibleCount === 0 ? (
        <div className="text-center text-sm text-gray-500 mb-4">
          Aucune règle affichée. Cliquez la boule pour commencer.
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {visibles.map((regle) => (
          <Card key={regle.id} className="shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#4fafc4] text-white flex items-center justify-center text-sm font-bold">
                  {regle.id}
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900">{regle.title}</h3>
          </div>
              <div className="flex items-center justify-center">{regle.visual}</div>
                </CardContent>
              </Card>
        ))}
      </div>
    </div>
  )
}
