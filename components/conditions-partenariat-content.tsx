"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check } from "lucide-react"

const conditions = [
  "Autoriser viviworks.fr à se servir du site comme référence",
  "Agir en prescripteur",
  "Vous impliquer dans la conception de votre site et garantir que les informations soient à jour",
  "Vous engager à utiliser systématiquement le site internet dans les actions de communication",
  "Adhérer à notre programme de parrainage",
]

export function ConditionsPartenariatContent() {
  const [domainName, setDomainName] = useState("")
  const [checkedConditions, setCheckedConditions] = useState<Set<number>>(new Set())

  const toggleCondition = (index: number) => {
    const newChecked = new Set(checkedConditions)
    if (newChecked.has(index)) {
      newChecked.delete(index)
      // Si on décoche une condition, on décoche aussi toutes celles qui suivent
      for (let i = index + 1; i < conditions.length; i++) {
        newChecked.delete(i)
      }
    } else {
      newChecked.add(index)
    }
    setCheckedConditions(newChecked)
  }

  // Déterminer quelles conditions doivent être visibles
  const getVisibleConditions = () => {
    const visible = []
    for (let i = 0; i < conditions.length; i++) {
      if (i === 0 || checkedConditions.has(i - 1)) {
        visible.push(i)
      }
    }
    return visible
  }

  const handleDomainSearch = () => {
    if (domainName.trim()) {
      // Nettoyer le nom de domaine (enlever www. s'il est présent)
      const cleanDomain = domainName.replace(/^www\./, "").trim()
      // Rediriger vers Hostinger avec le nom de domaine
      const hostingerUrl = `https://www.hostinger.fr/domains?domain=${encodeURIComponent(cleanDomain)}`
      window.open(hostingerUrl, "_blank")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleDomainSearch()
    }
  }

  const visibleConditions = getVisibleConditions()

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Nos conditions de partenariat</h1>

        {/* Liste des conditions */}
        <div className="space-y-8 mb-16">
          {visibleConditions.map((index) => (
            <div 
              key={index} 
              className={`flex items-start gap-4 transition-all duration-500 ${
                checkedConditions.has(index - 1) ? 'opacity-100 transform translate-y-0' : 
                index === 0 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
              }`}
            >
              <button
                onClick={() => toggleCondition(index)}
                className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-1 transition-all hover:scale-105 ${
                  checkedConditions.has(index)
                    ? "bg-[#804d3b] hover:bg-[#6a3f2f]"
                    : "border-2 border-gray-300 hover:border-[#4fafc4] bg-white"
                }`}
              >
                {checkedConditions.has(index) && <Check className="w-4 h-4 text-white" />}
              </button>
              <p
                className="text-lg md:text-xl text-gray-800 leading-relaxed cursor-pointer"
                onClick={() => toggleCondition(index)}
              >
                {conditions[index]}
              </p>
            </div>
          ))}
        </div>

        {/* Section disponibilité du nom de domaine */}
        <div className="border-t border-gray-200 pt-12">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <label className="text-lg md:text-xl font-medium text-gray-800 whitespace-nowrap">
              Disponibilité du nom de domaine :
            </label>

            <div className="flex items-center gap-2">
              <span className="text-lg text-gray-600">www.</span>
              <div className="relative">
                <Input
                  type="text"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="votre-domaine"
                  className="border-0 border-b-2 border-gray-300 rounded-none focus:border-[#4fafc4] bg-transparent text-lg px-2 py-2 min-w-[200px] md:min-w-[300px]"
                />
              </div>
            </div>

            <Button
              onClick={handleDomainSearch}
              disabled={!domainName.trim()}
              className="w-12 h-12 bg-[#4fafc4] hover:bg-[#3d8a9c] rounded-full p-0 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
            >
              <Search className="w-5 h-5 text-white" />
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center md:text-left">
            Cliquez sur la loupe pour vérifier la disponibilité sur Hostinger
          </p>
        </div>

        {/* Résumé des conditions cochées */}
        {checkedConditions.size > 0 && (
          <div className="mt-8 p-4 bg-[#f5e6e0] border-l-4 border-[#804d3b] rounded-r-lg">
            <p className="text-[#6a3f2f] font-medium">
              {checkedConditions.size} condition{checkedConditions.size > 1 ? "s" : ""} acceptée
              {checkedConditions.size > 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Indicateur de progression */}
        {checkedConditions.size < conditions.length && (
          <div className="mt-6 p-4 bg-[#e6f3f7] border-l-4 border-[#4fafc4] rounded-r-lg">
            <p className="text-[#3d8a9c] text-sm">
              Cochez la condition actuelle pour débloquer la suivante
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
