"use client"

import { useEffect, useRef } from "react"

interface LeafletMapProps {
  center?: [number, number]
  zoom?: number
  className?: string
}

declare global {
  interface Window {
    L: any
  }
}

export function LeafletMap({ center = [48.8566, 2.3522], zoom = 10, className = "" }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Charger Leaflet CSS et JS
    const loadLeaflet = async () => {
      // Charger le CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        link.crossOrigin = ""
        document.head.appendChild(link)
      }

      // Charger le JS
      if (!window.L) {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        script.crossOrigin = ""

        script.onload = () => {
          initializeMap()
        }

        document.head.appendChild(script)
      } else {
        initializeMap()
      }
    }

    const initializeMap = () => {
      if (!window.L || !mapRef.current || mapInstanceRef.current) return

      // Créer la carte
      const map = window.L.map(mapRef.current).setView(center, zoom)

      // Ajouter les tuiles OpenStreetMap
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      // Ajouter des marqueurs pour les principales villes
      const cities = [
        { name: "Paris", lat: 48.8566, lng: 2.3522, isMain: true },
        { name: "Saint-Denis", lat: 48.9362, lng: 2.3574, isMain: false },
        { name: "Nanterre", lat: 48.8924, lng: 2.2069, isMain: false },
        { name: "Clichy", lat: 48.9048, lng: 2.3061, isMain: false },
        { name: "Montreuil", lat: 48.8639, lng: 2.4372, isMain: false },
        { name: "Conflans-Sainte-Honorine", lat: 48.9978, lng: 2.0954, isMain: false },
        { name: "Sartrouville", lat: 48.9386, lng: 2.1661, isMain: false },
        { name: "Trappes", lat: 48.7756, lng: 2.0108, isMain: false },
        { name: "Évry-Courcouronnes", lat: 48.6294, lng: 2.4417, isMain: false },
      ]

      cities.forEach((city) => {
        // Créer une icône personnalisée
        const icon = window.L.divIcon({
          className: "custom-marker",
          html: `<div style="
            width: ${city.isMain ? "16px" : "12px"}; 
            height: ${city.isMain ? "16px" : "12px"}; 
            background-color: ${city.isMain ? "#3b82f6" : "#ef4444"}; 
            border: 2px solid white; 
            border-radius: 50%; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [city.isMain ? 16 : 12, city.isMain ? 16 : 12],
          iconAnchor: [city.isMain ? 8 : 6, city.isMain ? 8 : 6],
        })

        const marker = window.L.marker([city.lat, city.lng], { icon }).addTo(map)

        marker.bindPopup(`<div style="font-weight: bold; padding: 5px;">${city.name}</div>`)
      })

      mapInstanceRef.current = map
    }

    loadLeaflet()

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [center, zoom])

  return (
    <div className={`w-full h-full ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: "400px" }} />
    </div>
  )
}
