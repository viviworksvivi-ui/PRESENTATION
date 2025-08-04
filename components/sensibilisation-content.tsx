"use client"

import Image from "next/image"

export function SensibilisationContent() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Image principale des statistiques - responsive */}
      <div className="w-full">
        <Image
          src="/images/sensibilisation.png"
          alt="Statistiques sur les habitudes numériques des français"
          width={1200}
          height={800}
          className="w-full h-auto rounded-2xl shadow-lg"
          priority
        />
      </div>
    </div>
  )
}
