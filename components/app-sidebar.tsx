"use client"

import React from "react"

import {
  Building2,
  Eye,
  FileText,
  Monitor,
  Network,
  Settings,
  TrendingUp,
  Handshake,
  FileCheck,
  FolderOpen,
  CheckSquare,
  Calendar,
  LogOut,
  User,
  Edit,
  FileSpreadsheet,
} from "lucide-react"
import { ViviworksLogo } from "@/components/viviworks-logo"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  onSectionChange?: (section: string) => void
  onLogout?: () => void
  currentUser?: {
    username: string
    role: string
  } | null
}

const menuItems = [
  {
    title: "viviworks.fr",
    icon: Building2,
    isHeader: true,
  },
  {
    title: "viviworks",
    icon: Building2,
    url: "#",
    key: "viviworks",
  },
  {
    title: "Votre entreprise",
    icon: Building2,
    url: "#",
    key: "entreprise",
  },
  {
    title: "Sensibilisation",
    icon: Eye,
    url: "#",
    key: "sensibilisation",
  },
  {
    title: "Règles incontournables",
    icon: FileText,
    url: "#",
    key: "regles",
  },
  {
    title: "Showroom",
    icon: Monitor,
    url: "#",
    key: "showroom",
  },
  {
    title: "L'arborescence",
    icon: Network,
    url: "#",
    key: "arborescence",
  },
  {
    title: "Caractéristiques",
    icon: Settings,
    url: "#",
    key: "caracteristiques",
  },
  {
    title: "Campagne Ads",
    icon: TrendingUp,
    url: "#",
    key: "campagne",
  },
  {
    title: "Offre de partenariat",
    icon: Handshake,
    url: "#",
    key: "offre",
  },
  {
    title: "Conditions de partenariat",
    icon: FileCheck,
    url: "#",
    key: "conditions",
  },
  {
    title: "Dossier partenaire",
    icon: FolderOpen,
    url: "#",
    key: "dossier",
  },
  {
    title: "Validation",
    icon: CheckSquare,
    url: "#",
    key: "validation",
  },
  {
    title: "Modifications",
    icon: Edit,
    url: "#",
    key: "modifications",
  },
  {
    title: "Devis",
    icon: FileSpreadsheet,
    url: "#",
    key: "devis",
  },
  {
    title: "Liste des devis",
    icon: FileText,
    url: "#",
    key: "liste-devis",
  },
  {
    title: "Prochaines étapes",
    icon: Calendar,
    url: "#",
    key: "etapes",
  },
]

export function AppSidebar({ onSectionChange, onLogout, currentUser }: AppSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar()
  
  const handleItemClick = (key: string) => {
    onSectionChange?.(key)
    // Fermer la sidebar sur mobile après un clic
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const handleLogout = () => {
    onLogout?.()
    // Fermer la sidebar sur mobile
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar className="border-r-0">
      <div className="bg-white h-full flex flex-col overflow-hidden">
        <SidebarHeader className="border-b border-gray-200 p-0 flex-shrink-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="bg-[#804d3b] hover:bg-[#6a3f2f] text-white font-semibold h-12 md:h-14 justify-center text-sm md:text-lg shadow-lg"
              >
                <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">viviworks.fr</span>
                <span className="sm:hidden">VW</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-gray-700 hover:bg-[#4fafc4] hover:text-white py-2 md:py-3 px-2 md:px-4 text-sm md:text-base font-medium transition-all duration-200"
                onClick={() => handleItemClick("viviworks")}
              >
                <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">viviworks</span>
                <span className="sm:hidden">VW</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="bg-white flex-1 overflow-y-auto">
          <SidebarGroup className="pb-2">
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems.slice(2).map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="text-gray-700 hover:bg-[#4fafc4] hover:text-white py-2 md:py-3 px-2 md:px-4 text-sm md:text-base font-medium transition-all duration-200 active:bg-[#4fafc4] active:text-white"
                      onClick={() => item.key && handleItemClick(item.key)}
                    >
                      {React.createElement(item.icon, { className: "w-4 h-4 md:w-5 md:h-5 flex-shrink-0" })}
                      <span className="hidden sm:inline truncate">{item.title}</span>
                      <span className="sm:hidden text-xs truncate">{item.title.split(" ")[0]}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          {/* Informations utilisateur connecté */}
          {currentUser && (
            <SidebarGroup className="border-t border-gray-200 mt-4">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <div className="flex items-center gap-3 py-3 px-4 text-gray-700">
                      <div className="relative">
                        <div className="w-8 h-8 bg-[#804d3b] rounded-full flex items-center justify-center shadow-md">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#4fafc4] rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {currentUser.username}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {currentUser.role}
                        </div>
                      </div>
                    </div>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          
          {/* Bouton de déconnexion */}
          <SidebarGroup className="pb-4">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="text-gray-700 hover:bg-red-100 hover:text-red-900 py-2 md:py-3 px-2 md:px-4 text-sm md:text-base font-medium transition-all duration-200 active:bg-red-100 active:text-red-900"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="hidden sm:inline">Déconnexion</span>
                    <span className="sm:hidden">Déco</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  )
}
