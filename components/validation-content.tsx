"use client"

import { useState } from "react"
import { Check, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

interface ContractData {
  // Informations de l'entreprise
  entreprise: string
  siret: string
  adresse: string
  telephone: string
  email: string
  contact: string
  
  // Informations du projet
  nomDomaine: string
  typeSite: string
  description: string
  
  // Conditions acceptées
  conditionsAcceptees: boolean[]
  
  // Options
  urlOption: "souhaitee" | "existante"
  rdvOption: "positionne" | "pas_contact"
  
  // Date et signature
  date: string
  signature: string
  
  // Représentant Viviworks
  representantViviworks: string
}

const conditions = [
  "Autoriser viviworks.fr à se servir du site comme référence",
  "Agir en prescripteur",
  "Vous impliquer dans la conception de votre site et garantir que les informations soient à jour",
  "Vous engager à utiliser systématiquement le site internet dans les actions de communication",
  "Adhérer à notre programme de parrainage",
]

const typesSites = [
  "Site vitrine",
  "Site e-commerce", 
  "Blog/Actualités",
  "Portfolio",
  "Site institutionnel",
  "Autre"
]

export function ValidationContent() {
  const [contractData, setContractData] = useState<ContractData>({
    entreprise: "",
    siret: "",
    adresse: "",
    telephone: "",
    email: "",
    contact: "",
    nomDomaine: "",
    typeSite: "",
    description: "",
    conditionsAcceptees: new Array(conditions.length).fill(false),
    urlOption: "souhaitee",
    rdvOption: "positionne",
    date: new Date().toISOString().split('T')[0],
    signature: "",
    representantViviworks: ""
  })

  const updateField = (field: keyof ContractData, value: any) => {
    setContractData(prev => ({ ...prev, [field]: value }))
  }

  const toggleCondition = (index: number) => {
    const newConditions = [...contractData.conditionsAcceptees]
    newConditions[index] = !newConditions[index]
    updateField('conditionsAcceptees', newConditions)
  }

  const downloadAsPDF = async () => {
    try {
      // Convertir le logo en base64
      const response = await fetch('/logo.png')
      const blob = await response.blob()
      const reader = new FileReader()
      
      reader.onload = () => {
        const base64Logo = reader.result as string
        
        const content = `
          <html>
            <head>
              <meta charset="UTF-8">
              <title>Contrat de Partenariat Viviworks</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
                .header { text-align: center; margin-bottom: 30px; }
                .logo { max-width: 200px; height: auto; margin-bottom: 20px; }
                h1 { color: #804d3b; text-align: center; border-bottom: 3px solid #804d3b; padding-bottom: 15px; margin-bottom: 30px; }
                h2 { color: #4fafc4; margin-top: 30px; border-bottom: 2px solid #4fafc4; padding-bottom: 5px; }
                .section { margin: 25px 0; }
                .paragraph { margin: 15px 0; text-align: justify; }
                .highlight { background: #f5e6e0; padding: 10px; border-left: 4px solid #804d3b; margin: 15px 0; }
                .conditions { margin: 20px 0; }
                .condition { margin: 10px 0; padding: 10px; background: #f9f9f9; border-radius: 5px; }
                .condition.accepted { background: #e6f3f7; border-left: 4px solid #4fafc4; }
                .signature-section { margin-top: 40px; border-top: 2px solid #804d3b; padding-top: 20px; }
                .signature-line { border-bottom: 1px solid #333; margin-top: 30px; width: 200px; }
                .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
                .checkbox { display: inline-block; width: 20px; height: 20px; border: 2px solid #804d3b; margin-right: 10px; text-align: center; line-height: 16px; }
                .checkbox.checked { background: #804d3b; color: white; }
                .company-info { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
                .project-info { background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
              </style>
            </head>
            <body>
              <div class="header">
                <img src="${base64Logo}" alt="Viviworks Logo" class="logo">
              </div>
              
              <h1>CONTRAT DE PARTENARIAT VIVIWORKS</h1>
              
              <div class="section">
                <h2>PRÉAMBULE</h2>
                <div class="paragraph">
                  Le présent contrat de partenariat est conclu entre la société <strong>VIVIWORKS</strong>, 
                  spécialisée dans la création de sites internet et le référencement web, 
                  et l'entreprise <strong>${contractData.entreprise || '[NOM DE L\'ENTREPRISE]'}</strong>, 
                  représentée par <strong>${contractData.contact || '[NOM DU CONTACT]'}</strong>.
                </div>
                <div class="paragraph">
                  Les parties conviennent de collaborer dans le cadre de la création et de la gestion 
                  d'un site internet professionnel, conformément aux conditions définies ci-après.
                </div>
              </div>

              <div class="section">
                <h2>ARTICLE 1 - INFORMATIONS DES PARTIES</h2>
                
                <div class="company-info">
                  <h3>1.1 Informations de l'entreprise cliente</h3>
                  <div class="paragraph">
                    <strong>Raison sociale :</strong> ${contractData.entreprise || '[À compléter]'}<br>
                    <strong>Numéro SIRET :</strong> ${contractData.siret || '[À compléter]'}<br>
                    <strong>Adresse :</strong> ${contractData.adresse || '[À compléter]'}<br>
                    <strong>Téléphone :</strong> ${contractData.telephone || '[À compléter]'}<br>
                    <strong>Email :</strong> ${contractData.email || '[À compléter]'}<br>
                    <strong>Contact principal :</strong> ${contractData.contact || '[À compléter]'}
                  </div>
                </div>

                <div class="company-info">
                  <h3>1.2 Informations de VIVIWORKS</h3>
                  <div class="paragraph">
                    <strong>Raison sociale :</strong> VIVIWORKS<br>
                    <strong>Spécialité :</strong> Création de sites internet et référencement web<br>
                    <strong>Site web :</strong> www.viviworks.fr<br>
                    <strong>Email :</strong> contact@viviworks.fr
                  </div>
                </div>
              </div>

              <div class="section">
                <h2>ARTICLE 2 - OBJET DU CONTRAT</h2>
                
                <div class="project-info">
                  <h3>2.1 Description du projet</h3>
                  <div class="paragraph">
                    Le présent contrat a pour objet la création et la gestion d'un site internet 
                    de type <strong>${contractData.typeSite || '[TYPE DE SITE]'}</strong> 
                    pour le compte de l'entreprise cliente.
                  </div>
                  <div class="paragraph">
                    <strong>Nom de domaine souhaité :</strong> ${contractData.nomDomaine || '[À compléter]'}
                  </div>
                  <div class="paragraph">
                    <strong>Description du projet :</strong><br>
                    ${contractData.description || '[Description du projet à compléter]'}
                  </div>
                </div>

                <div class="paragraph">
                  <strong>2.2 Modalités techniques</strong><br>
                  Le site sera développé selon les standards web actuels, optimisé pour les moteurs de recherche 
                  et responsive pour tous les appareils. L'hébergement et la maintenance seront assurés par VIVIWORKS 
                  dans le cadre du programme de partenariat.
                </div>
              </div>

              <div class="section">
                <h2>ARTICLE 3 - CONDITIONS DE PARTENARIAT</h2>
                
                <div class="paragraph">
                  L'entreprise cliente s'engage à respecter les conditions de partenariat suivantes, 
                  essentielles au bon fonctionnement de la collaboration :
                </div>

                <div class="conditions">
                  ${conditions.map((condition, index) => `
                    <div class="condition ${contractData.conditionsAcceptees[index] ? 'accepted' : ''}">
                      <span class="checkbox ${contractData.conditionsAcceptees[index] ? 'checked' : ''}">${contractData.conditionsAcceptees[index] ? '✓' : ''}</span>
                      <strong>${index + 1}.</strong> ${condition}
                    </div>
                  `).join('')}
                </div>

                <div class="highlight">
                  <strong>Engagement mutuel :</strong> L'acceptation de ces conditions par l'entreprise cliente 
                  constitue un engagement réciproque de collaboration active et de respect des obligations 
                  définies dans le présent contrat.
                </div>
              </div>

              <div class="section">
                <h2>ARTICLE 4 - MODALITÉS D'EXÉCUTION</h2>
                
                <div class="paragraph">
                  <strong>4.1 Gestion du nom de domaine</strong><br>
                  ${contractData.urlOption === 'souhaitee' 
                    ? 'L\'entreprise cliente souhaite l\'acquisition d\'un nouveau nom de domaine. VIVIWORKS s\'engage à procéder à la recherche de disponibilité et à l\'enregistrement du domaine choisi.' 
                    : 'L\'entreprise cliente dispose d\'un nom de domaine existant qui sera transféré vers les services de VIVIWORKS. Le transfert sera effectué selon les procédures techniques appropriées.'}
                </div>

                <div class="paragraph">
                  <strong>4.2 Suivi du projet</strong><br>
                  ${contractData.rdvOption === 'positionne' 
                    ? 'Un rendez-vous de brief production sera organisé avec le Chargé de Projet Web de VIVIWORKS pour affiner les spécifications du projet et établir le planning de réalisation.' 
                    : 'L\'entreprise cliente ne souhaite pas être contactée par le Chargé de Projet Web pour un complément de brief. Le projet sera réalisé selon les informations fournies dans le présent contrat.'}
                </div>

                <div class="paragraph">
                  <strong>4.3 Communication et collaboration</strong><br>
                  Les parties s'engagent à maintenir une communication régulière et constructive 
                  tout au long de la réalisation du projet. VIVIWORKS fournira des comptes-rendus 
                  d'avancement et l'entreprise cliente s'engage à répondre dans les délais appropriés.
                </div>
              </div>

              <div class="section">
                <h2>ARTICLE 5 - DURÉE ET RÉSILIATION</h2>
                
                <div class="paragraph">
                  Le présent contrat de partenariat est conclu pour une durée indéterminée à compter de sa signature. 
                  Chaque partie peut y mettre fin à tout moment en respectant un préavis de 30 jours 
                  par lettre recommandée avec accusé de réception.
                </div>

                <div class="paragraph">
                  En cas de non-respect des conditions de partenariat définies à l'article 3, 
                  VIVIWORKS se réserve le droit de suspendre ou résilier le contrat immédiatement, 
                  sans préavis ni indemnité.
                </div>
              </div>

              <div class="section">
                <h2>ARTICLE 6 - DROIT APPLICABLE ET JURIDICTION</h2>
                
                <div class="paragraph">
                  Le présent contrat est soumis au droit français. En cas de litige, 
                  les tribunaux français seront seuls compétents.
                </div>
              </div>

              <div class="signature-section">
                <h2>VALIDATION ET SIGNATURE</h2>
                
                <div class="paragraph">
                  Le présent contrat de partenariat, établi en deux exemplaires originaux, 
                  a été lu et approuvé par les parties qui le signent en connaissance de cause.
                </div>

                <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                  <div style="text-align: center;">
                    <div style="margin-bottom: 10px;"><strong>Pour l'entreprise cliente</strong></div>
                    <div style="margin-bottom: 5px;">${contractData.entreprise || '[Nom de l\'entreprise]'}</div>
                    <div style="margin-bottom: 5px;">Représentée par : ${contractData.contact || '[Nom du signataire]'}</div>
                    <div style="margin-bottom: 5px;">Date : ${contractData.date}</div>
                    <div class="signature-line"></div>
                    <div style="margin-top: 5px; font-size: 12px;">Signature</div>
                  </div>
                  
                  <div style="text-align: center;">
                    <div style="margin-bottom: 10px;"><strong>Pour VIVIWORKS</strong></div>
                    <div style="margin-bottom: 5px;">VIVIWORKS</div>
                    <div style="margin-bottom: 5px;">Représentée par : ${contractData.representantViviworks || '[Nom du représentant]'}</div>
                    <div style="margin-bottom: 5px;">Date : ${contractData.date}</div>
                    <div class="signature-line"></div>
                    <div style="margin-top: 5px; font-size: 12px;">Signature</div>
                  </div>
                </div>
              </div>

              <div class="footer">
                <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
                <p>Viviworks.fr - Contrat de partenariat - Page 1/1</p>
              </div>
            </body>
          </html>
        `
        
        const blob = new Blob([content], { type: 'text/html; charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `contrat-partenariat-${contractData.entreprise || 'viviworks'}-${new Date().toISOString().split('T')[0]}.html`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
      
      reader.readAsDataURL(blob)
    } catch (error) {
      console.error('Erreur lors du chargement du logo:', error)
      // Fallback sans logo si erreur
      const content = `
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Contrat de Partenariat Viviworks</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
              .header { text-align: center; margin-bottom: 30px; }
              .company-title { font-size: 28px; font-weight: bold; color: #804d3b; margin-bottom: 10px; }
              .company-subtitle { font-size: 16px; color: #4fafc4; margin-bottom: 20px; }
              h1 { color: #804d3b; text-align: center; border-bottom: 3px solid #804d3b; padding-bottom: 15px; margin-bottom: 30px; }
              h2 { color: #4fafc4; margin-top: 30px; border-bottom: 2px solid #4fafc4; padding-bottom: 5px; }
              .section { margin: 25px 0; }
              .paragraph { margin: 15px 0; text-align: justify; }
              .highlight { background: #f5e6e0; padding: 10px; border-left: 4px solid #804d3b; margin: 15px 0; }
              .conditions { margin: 20px 0; }
              .condition { margin: 10px 0; padding: 10px; background: #f9f9f9; border-radius: 5px; }
              .condition.accepted { background: #e6f3f7; border-left: 4px solid #4fafc4; }
              .signature-section { margin-top: 40px; border-top: 2px solid #804d3b; padding-top: 20px; }
              .signature-line { border-bottom: 1px solid #333; margin-top: 30px; width: 200px; }
              .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
              .checkbox { display: inline-block; width: 20px; height: 20px; border: 2px solid #804d3b; margin-right: 10px; text-align: center; line-height: 16px; }
              .checkbox.checked { background: #804d3b; color: white; }
              .company-info { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; }
              .project-info { background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="company-title">VIVIWORKS</div>
              <div class="company-subtitle">Création de sites internet et référencement web</div>
              <div style="font-size: 14px; color: #666;">www.viviworks.fr</div>
            </div>
            
            <h1>CONTRAT DE PARTENARIAT VIVIWORKS</h1>
            
            <!-- Reste du contenu identique -->
            <div class="section">
              <h2>PRÉAMBULE</h2>
              <div class="paragraph">
                Le présent contrat de partenariat est conclu entre la société <strong>VIVIWORKS</strong>, 
                spécialisée dans la création de sites internet et le référencement web, 
                et l'entreprise <strong>${contractData.entreprise || '[NOM DE L\'ENTREPRISE]'}</strong>, 
                représentée par <strong>${contractData.contact || '[NOM DU CONTACT]'}</strong>.
              </div>
              <div class="paragraph">
                Les parties conviennent de collaborer dans le cadre de la création et de la gestion 
                d'un site internet professionnel, conformément aux conditions définies ci-après.
              </div>
            </div>

            <div class="section">
              <h2>ARTICLE 1 - INFORMATIONS DES PARTIES</h2>
              
              <div class="company-info">
                <h3>1.1 Informations de l'entreprise cliente</h3>
                <div class="paragraph">
                  <strong>Raison sociale :</strong> ${contractData.entreprise || '[À compléter]'}<br>
                  <strong>Numéro SIRET :</strong> ${contractData.siret || '[À compléter]'}<br>
                  <strong>Adresse :</strong> ${contractData.adresse || '[À compléter]'}<br>
                  <strong>Téléphone :</strong> ${contractData.telephone || '[À compléter]'}<br>
                  <strong>Email :</strong> ${contractData.email || '[À compléter]'}<br>
                  <strong>Contact principal :</strong> ${contractData.contact || '[À compléter]'}
                </div>
              </div>

              <div class="company-info">
                <h3>1.2 Informations de VIVIWORKS</h3>
                <div class="paragraph">
                  <strong>Raison sociale :</strong> VIVIWORKS<br>
                  <strong>Spécialité :</strong> Création de sites internet et référencement web<br>
                  <strong>Site web :</strong> www.viviworks.fr<br>
                  <strong>Email :</strong> contact@viviworks.fr
                </div>
              </div>
            </div>

            <div class="section">
              <h2>ARTICLE 2 - OBJET DU CONTRAT</h2>
              
              <div class="project-info">
                <h3>2.1 Description du projet</h3>
                <div class="paragraph">
                  Le présent contrat a pour objet la création et la gestion d'un site internet 
                  de type <strong>${contractData.typeSite || '[TYPE DE SITE]'}</strong> 
                  pour le compte de l'entreprise cliente.
                </div>
                <div class="paragraph">
                  <strong>Nom de domaine souhaité :</strong> ${contractData.nomDomaine || '[À compléter]'}
                </div>
                <div class="paragraph">
                  <strong>Description du projet :</strong><br>
                  ${contractData.description || '[Description du projet à compléter]'}
                </div>
              </div>

              <div class="paragraph">
                <strong>2.2 Modalités techniques</strong><br>
                Le site sera développé selon les standards web actuels, optimisé pour les moteurs de recherche 
                et responsive pour tous les appareils. L'hébergement et la maintenance seront assurés par VIVIWORKS 
                dans le cadre du programme de partenariat.
              </div>
            </div>

            <div class="section">
              <h2>ARTICLE 3 - CONDITIONS DE PARTENARIAT</h2>
              
              <div class="paragraph">
                L'entreprise cliente s'engage à respecter les conditions de partenariat suivantes, 
                essentielles au bon fonctionnement de la collaboration :
              </div>

              <div class="conditions">
                ${conditions.map((condition, index) => `
                  <div class="condition ${contractData.conditionsAcceptees[index] ? 'accepted' : ''}">
                    <span class="checkbox ${contractData.conditionsAcceptees[index] ? 'checked' : ''}">${contractData.conditionsAcceptees[index] ? '✓' : ''}</span>
                    <strong>${index + 1}.</strong> ${condition}
                  </div>
                `).join('')}
              </div>

              <div class="highlight">
                <strong>Engagement mutuel :</strong> L'acceptation de ces conditions par l'entreprise cliente 
                constitue un engagement réciproque de collaboration active et de respect des obligations 
                définies dans le présent contrat.
              </div>
            </div>

            <div class="section">
              <h2>ARTICLE 4 - MODALITÉS D'EXÉCUTION</h2>
              
              <div class="paragraph">
                <strong>4.1 Gestion du nom de domaine</strong><br>
                ${contractData.urlOption === 'souhaitee' 
                  ? 'L\'entreprise cliente souhaite l\'acquisition d\'un nouveau nom de domaine. VIVIWORKS s\'engage à procéder à la recherche de disponibilité et à l\'enregistrement du domaine choisi.' 
                  : 'L\'entreprise cliente dispose d\'un nom de domaine existant qui sera transféré vers les services de VIVIWORKS. Le transfert sera effectué selon les procédures techniques appropriées.'}
              </div>

              <div class="paragraph">
                <strong>4.2 Suivi du projet</strong><br>
                ${contractData.rdvOption === 'positionne' 
                  ? 'Un rendez-vous de brief production sera organisé avec le Chargé de Projet Web de VIVIWORKS pour affiner les spécifications du projet et établir le planning de réalisation.' 
                  : 'L\'entreprise cliente ne souhaite pas être contactée par le Chargé de Projet Web pour un complément de brief. Le projet sera réalisé selon les informations fournies dans le présent contrat.'}
              </div>

              <div class="paragraph">
                <strong>4.3 Communication et collaboration</strong><br>
                Les parties s'engagent à maintenir une communication régulière et constructive 
                tout au long de la réalisation du projet. VIVIWORKS fournira des comptes-rendus 
                d'avancement et l'entreprise cliente s'engage à répondre dans les délais appropriés.
              </div>
            </div>

            <div class="section">
              <h2>ARTICLE 5 - DURÉE ET RÉSILIATION</h2>
              
              <div class="paragraph">
                Le présent contrat de partenariat est conclu pour une durée indéterminée à compter de sa signature. 
                Chaque partie peut y mettre fin à tout moment en respectant un préavis de 30 jours 
                par lettre recommandée avec accusé de réception.
              </div>

              <div class="paragraph">
                En cas de non-respect des conditions de partenariat définies à l'article 3, 
                VIVIWORKS se réserve le droit de suspendre ou résilier le contrat immédiatement, 
                sans préavis ni indemnité.
              </div>
            </div>

            <div class="section">
              <h2>ARTICLE 6 - DROIT APPLICABLE ET JURIDICTION</h2>
              
              <div class="paragraph">
                Le présent contrat est soumis au droit français. En cas de litige, 
                les tribunaux français seront seuls compétents.
              </div>
            </div>

            <div class="signature-section">
              <h2>VALIDATION ET SIGNATURE</h2>
              
              <div class="paragraph">
                Le présent contrat de partenariat, établi en deux exemplaires originaux, 
                a été lu et approuvé par les parties qui le signent en connaissance de cause.
              </div>

              <div style="display: flex; justify-content: space-between; margin-top: 40px;">
                <div style="text-align: center;">
                  <div style="margin-bottom: 10px;"><strong>Pour l'entreprise cliente</strong></div>
                  <div style="margin-bottom: 5px;">${contractData.entreprise || '[Nom de l\'entreprise]'}</div>
                  <div style="margin-bottom: 5px;">Représentée par : ${contractData.contact || '[Nom du signataire]'}</div>
                  <div style="margin-bottom: 5px;">Date : ${contractData.date}</div>
                  <div class="signature-line"></div>
                  <div style="margin-top: 5px; font-size: 12px;">Signature</div>
                </div>
                
                <div style="text-align: center;">
                  <div style="margin-bottom: 10px;"><strong>Pour VIVIWORKS</strong></div>
                  <div style="margin-bottom: 5px;">VIVIWORKS</div>
                  <div style="margin-bottom: 5px;">Représentée par : ${contractData.representantViviworks || '[Nom du représentant]'}</div>
                  <div style="margin-bottom: 5px;">Date : ${contractData.date}</div>
                  <div class="signature-line"></div>
                  <div style="margin-top: 5px; font-size: 12px;">Signature</div>
                </div>
              </div>
            </div>

            <div class="footer">
              <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
              <p>Viviworks.fr - Contrat de partenariat - Page 1/1</p>
            </div>
          </body>
        </html>
      `
      
      const blob = new Blob([content], { type: 'text/html; charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `contrat-partenariat-${contractData.entreprise || 'viviworks'}-${new Date().toISOString().split('T')[0]}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#804d3b]">Contrat de Partenariat</h1>
          <Button
            onClick={downloadAsPDF}
            className="bg-[#804d3b] hover:bg-[#6a3f2f] text-white px-4 md:px-6 py-2 text-sm font-bold rounded-xl shadow-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Télécharger Contrat
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations de l'entreprise */}
          <Card className="border-l-4 border-l-[#4fafc4]">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#4fafc4] mb-4">1. Informations de l'entreprise</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#804d3b] mb-2">Nom de l'entreprise *</label>
                  <Input
                    value={contractData.entreprise}
                    onChange={(e) => updateField('entreprise', e.target.value)}
                    placeholder="Nom de votre entreprise"
                    className="border-[#4fafc4] focus:border-[#3d8a9c]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#804d3b] mb-2">Numéro SIRET</label>
                  <Input
                    value={contractData.siret}
                    onChange={(e) => updateField('siret', e.target.value)}
                    placeholder="12345678901234"
                    className="border-[#4fafc4] focus:border-[#3d8a9c]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#804d3b] mb-2">Adresse</label>
                  <Textarea
                    value={contractData.adresse}
                    onChange={(e) => updateField('adresse', e.target.value)}
                    placeholder="Adresse complète de l'entreprise"
                    className="border-[#4fafc4] focus:border-[#3d8a9c]"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#804d3b] mb-2">Téléphone</label>
                    <Input
                      value={contractData.telephone}
                      onChange={(e) => updateField('telephone', e.target.value)}
                      placeholder="01 23 45 67 89"
                      className="border-[#4fafc4] focus:border-[#3d8a9c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#804d3b] mb-2">Email *</label>
                    <Input
                      value={contractData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="contact@entreprise.fr"
                      type="email"
                      className="border-[#4fafc4] focus:border-[#3d8a9c]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#804d3b] mb-2">Contact principal</label>
                  <Input
                    value={contractData.contact}
                    onChange={(e) => updateField('contact', e.target.value)}
                    placeholder="Nom et prénom du contact"
                    className="border-[#4fafc4] focus:border-[#3d8a9c]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations du projet */}
          <Card className="border-l-4 border-l-[#804d3b]">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#804d3b] mb-4">2. Informations du projet</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#804d3b] mb-2">Nom de domaine souhaité</label>
                  <Input
                    value={contractData.nomDomaine}
                    onChange={(e) => updateField('nomDomaine', e.target.value)}
                    placeholder="mon-site.fr"
                    className="border-[#4fafc4] focus:border-[#3d8a9c]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#804d3b] mb-2">Type de site</label>
                  <select
                    value={contractData.typeSite}
                    onChange={(e) => updateField('typeSite', e.target.value)}
                    className="w-full p-2 border border-[#4fafc4] rounded-md focus:border-[#3d8a9c] focus:outline-none"
                  >
                    <option value="">Sélectionnez un type</option>
                    {typesSites.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#804d3b] mb-2">Description du projet</label>
                  <Textarea
                    value={contractData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Décrivez votre projet web..."
                    className="border-[#4fafc4] focus:border-[#3d8a9c]"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conditions de partenariat */}
        <Card className="mt-8 border-l-4 border-l-[#4fafc4]">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[#4fafc4] mb-4">3. Conditions de partenariat</h2>
            <div className="space-y-3">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-start gap-3">
                  <button
                    onClick={() => toggleCondition(index)}
                    className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-1 transition-all hover:scale-105 ${
                      contractData.conditionsAcceptees[index]
                        ? "bg-[#804d3b] hover:bg-[#6a3f2f]"
                        : "border-2 border-gray-300 hover:border-[#4fafc4] bg-white"
                    }`}
                  >
                    {contractData.conditionsAcceptees[index] && <Check className="w-4 h-4 text-white" />}
                  </button>
                  <span className="text-gray-800 cursor-pointer" onClick={() => toggleCondition(index)}>
                    {condition}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Options */}
        <Card className="mt-8 border-l-4 border-l-[#804d3b]">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[#804d3b] mb-4">4. Options</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#804d3b] mb-3">URL :</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="url"
                      value="souhaitee"
                      checked={contractData.urlOption === "souhaitee"}
                      onChange={(e) => updateField('urlOption', e.target.value)}
                      className="w-4 h-4 text-[#4fafc4] border-gray-300 focus:ring-[#4fafc4]"
                    />
                    <span className="text-gray-800">Souhaitée</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="url"
                      value="existante"
                      checked={contractData.urlOption === "existante"}
                      onChange={(e) => updateField('urlOption', e.target.value)}
                      className="w-4 h-4 text-[#4fafc4] border-gray-300 focus:ring-[#4fafc4]"
                    />
                    <span className="text-gray-800">Existante (à transférer)</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#804d3b] mb-3">Rendez-vous de brief production :</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="rdv"
                      value="positionne"
                      checked={contractData.rdvOption === "positionne"}
                      onChange={(e) => updateField('rdvOption', e.target.value)}
                      className="w-4 h-4 text-[#4fafc4] border-gray-300 focus:ring-[#4fafc4]"
                    />
                    <span className="text-gray-800">Rendez-vous positionné</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="rdv"
                      value="pas_contact"
                      checked={contractData.rdvOption === "pas_contact"}
                      onChange={(e) => updateField('rdvOption', e.target.value)}
                      className="w-4 h-4 text-[#4fafc4] border-gray-300 focus:ring-[#4fafc4]"
                    />
                    <span className="text-gray-800">Je ne souhaite pas être contacté</span>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signature */}
        <Card className="mt-8 border-l-4 border-l-[#4fafc4]">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-[#4fafc4] mb-4">5. Validation et signature</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#804d3b] mb-2">Date</label>
                <Input
                  value={contractData.date}
                  onChange={(e) => updateField('date', e.target.value)}
                  type="date"
                  className="border-[#4fafc4] focus:border-[#3d8a9c]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#804d3b] mb-2">Signature</label>
                <Input
                  value={contractData.signature}
                  onChange={(e) => updateField('signature', e.target.value)}
                  placeholder="Nom et prénom du signataire"
                  className="border-[#4fafc4] focus:border-[#3d8a9c]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#804d3b] mb-2">Représentant Viviworks</label>
                <Input
                  value={contractData.representantViviworks}
                  onChange={(e) => updateField('representantViviworks', e.target.value)}
                  placeholder="Nom et prénom du représentant Viviworks"
                  className="border-[#4fafc4] focus:border-[#3d8a9c]"
                />
                <p className="text-xs text-gray-500 mt-1">Nom du représentant de Viviworks qui signera le contrat</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Résumé */}
        <div className="mt-8 p-6 bg-[#f5e6e0] border-l-4 border-[#804d3b] rounded-r-lg">
          <h3 className="text-lg font-semibold text-[#6a3f2f] mb-2">Résumé du contrat</h3>
          <div className="space-y-2 text-[#6a3f2f]">
            <p>Entreprise : <span className="font-medium">{contractData.entreprise || 'Non renseigné'}</span></p>
            <p>Email : <span className="font-medium">{contractData.email || 'Non renseigné'}</span></p>
            <p>Domaine : <span className="font-medium">{contractData.nomDomaine || 'Non renseigné'}</span></p>
            <p>Conditions acceptées : <span className="font-medium">{contractData.conditionsAcceptees.filter(Boolean).length}/{conditions.length}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
