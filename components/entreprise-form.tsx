"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Loader2, Download } from "lucide-react"
import { toast } from "sonner"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export function EntrepriseForm() {
  const [formData, setFormData] = useState({
    enseigne: "",
    raisonSociale: "",
    formeSociete: "",
    codeAPE: "",
    siret: "",
    adresse: "",
    codePostal: "",
    ville: "",
    prenom: "",
    nom: "",
    dateNaissance: "",
    email: "",
    telephone: "",
    dateCreation: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pdfRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generatePDF = async () => {
    if (!pdfRef.current) {
      toast.error('Erreur: Template PDF non trouvé')
      return
    }

    setIsSubmitting(true)
    
    try {
      console.log('Début de la génération PDF...')
      
      // Rendre le template visible temporairement
      const template = pdfRef.current
      template.style.position = 'absolute'
      template.style.left = '0'
      template.style.top = '0'
      template.style.zIndex = '-1'
      
      const canvas = await html2canvas(template, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 800,
        height: template.scrollHeight
      })

      console.log('Canvas généré, création du PDF...')

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      const fileName = `entreprise_${formData.enseigne.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
      
      console.log('PDF généré avec succès:', fileName)
      toast.success('PDF généré avec succès !')
      
      // Réinitialiser le formulaire
      setFormData({
        enseigne: "",
        raisonSociale: "",
        formeSociete: "",
        codeAPE: "",
        siret: "",
        adresse: "",
        codePostal: "",
        ville: "",
        prenom: "",
        nom: "",
        dateNaissance: "",
        email: "",
        telephone: "",
        dateCreation: "",
      })
      
      // Remettre le template en position cachée
      template.style.position = 'fixed'
      template.style.left = '-9999px'
      template.style.top = '0'
      template.style.zIndex = '-1'
      
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error)
      toast.error(`Erreur lors de la génération du PDF: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async () => {
    // Validation des champs obligatoires
    const requiredFields = [
      'enseigne', 'raisonSociale', 'formeSociete', 'codeAPE', 
      'siret', 'adresse', 'codePostal', 'ville', 
      'prenom', 'nom', 'email', 'telephone'
    ]
    
    const missingFields = requiredFields.filter(field => {
      const value = formData[field as keyof typeof formData]
      const isEmpty = !value || value.trim() === ''
      return isEmpty
    })
    
    if (missingFields.length > 0) {
      toast.error(`Veuillez remplir tous les champs obligatoires : ${missingFields.join(', ')}`)
      return
    }

    await generatePDF()
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 px-4">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Votre entreprise</h1>
        <p className="text-sm md:text-base text-gray-600">
          * Informations obligatoires à récupérer si on ne les a pas déjà
        </p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-4 md:p-8">
          <div className="space-y-6 md:space-y-8">
            {/* Informations de l'entreprise */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="enseigne" className="text-gray-600 text-sm md:text-base">
                  Enseigne *
                </Label>
                <Input
                  id="enseigne"
                  placeholder="Ex: MKR FROID"
                  value={formData.enseigne}
                  onChange={(e) => handleInputChange("enseigne", e.target.value)}
                  className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="raisonSociale" className="text-gray-600 text-sm md:text-base">
                  Raison sociale *
                </Label>
                <Input
                  id="raisonSociale"
                  placeholder="Ex: MKR FROID"
                  value={formData.raisonSociale}
                  onChange={(e) => handleInputChange("raisonSociale", e.target.value)}
                  className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="formeSociete" className="text-gray-600 text-sm md:text-base">
                  Forme de la société *
                </Label>
                <Select
                  value={formData.formeSociete}
                  onValueChange={(value) => {
                    console.log('Forme société sélectionnée:', value)
                    handleInputChange("formeSociete", value)
                  }}
                >
                  <SelectTrigger className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base">
                    <SelectValue placeholder="Sélectionnez la forme juridique" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Auto entrepreneur">Auto entrepreneur</SelectItem>
                    <SelectItem value="SARL">SARL</SelectItem>
                    <SelectItem value="SAS">SAS</SelectItem>
                    <SelectItem value="EURL">EURL</SelectItem>
                    <SelectItem value="SA">SA</SelectItem>
                  </SelectContent>
                </Select>
                {formData.formeSociete && (
                  <p className="text-xs text-green-600">Sélectionné: {formData.formeSociete}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="codeAPE" className="text-gray-600 text-sm md:text-base">
                  Code APE *
                </Label>
                <Input
                  id="codeAPE"
                  placeholder="Ex: 4322B - Travaux d'installation d'équipements thermiques"
                  value={formData.codeAPE}
                  onChange={(e) => handleInputChange("codeAPE", e.target.value)}
                  className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siret" className="text-gray-600 text-sm md:text-base">
                  Siret *
                </Label>
                <Input
                  id="siret"
                  placeholder="Ex: 48342923900013"
                  value={formData.siret}
                  onChange={(e) => handleInputChange("siret", e.target.value)}
                  className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                />
              </div>
            </div>

            {/* Adresse */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="adresse" className="text-gray-600 text-sm md:text-base">
                  Adresse *
                </Label>
                <Input
                  id="adresse"
                  placeholder="Ex: 9 rue des cordeliers"
                  value={formData.adresse}
                  onChange={(e) => handleInputChange("adresse", e.target.value)}
                  className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codePostal" className="text-gray-600 text-sm md:text-base">
                  Code postal *
                </Label>
                <Input
                  id="codePostal"
                  placeholder="Ex: 95300"
                  value={formData.codePostal}
                  onChange={(e) => handleInputChange("codePostal", e.target.value)}
                  className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ville" className="text-gray-600 text-sm md:text-base">
                  Ville *
                </Label>
                <Input
                  id="ville"
                  placeholder="Ex: PONTOISE"
                  value={formData.ville}
                  onChange={(e) => handleInputChange("ville", e.target.value)}
                  className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                />
              </div>
            </div>

            {/* Contact de l'entreprise */}
            <div className="mt-8 md:mt-12">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Contact de l'entreprise</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="prenom" className="text-gray-600 text-sm md:text-base">
                    Prénom *
                  </Label>
                  <Input
                    id="prenom"
                    placeholder="Ex: Aiman"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange("prenom", e.target.value)}
                    className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-gray-600 text-sm md:text-base">
                    Nom *
                  </Label>
                  <Input
                    id="nom"
                    placeholder="Ex: BELLARA"
                    value={formData.nom}
                    onChange={(e) => handleInputChange("nom", e.target.value)}
                    className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateNaissance" className="text-gray-600 text-sm md:text-base">
                    Date de naissance
                  </Label>
                  <div className="relative">
                    <Input
                      id="dateNaissance"
                      type="date"
                      value={formData.dateNaissance}
                      onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
                      className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent pr-10 text-sm md:text-base"
                    />
                    <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-600 text-sm md:text-base">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ex: mkrfroid@gmail.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone" className="text-gray-600 text-sm md:text-base">
                    Téléphone *
                  </Label>
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="Ex: +33784789910"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange("telephone", e.target.value)}
                    className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateCreation" className="text-gray-600 text-sm md:text-base">
                    Date de création
                  </Label>
                  <div className="relative">
                    <Input
                      id="dateCreation"
                      type="date"
                      value={formData.dateCreation}
                      onChange={(e) => handleInputChange("dateCreation", e.target.value)}
                      className="border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent pr-10 text-sm md:text-base"
                    />
                    <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section finale */}
            <div className="mt-12 md:mt-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Pour mieux vous connaître</h2>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" size="lg" className="px-6 md:px-8 bg-transparent">
                  Précédent
                </Button>
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 px-6 md:px-8"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Génération PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Générer PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template PDF caché */}
      <div 
        ref={pdfRef} 
        className="fixed -left-[9999px] top-0 w-[800px] bg-white p-8"
        style={{ 
          fontFamily: 'Arial, sans-serif',
          position: 'fixed',
          left: '-9999px',
          top: '0',
          zIndex: '-1',
          backgroundColor: 'white',
          padding: '32px',
          width: '800px'
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FICHE ENTREPRISE</h1>
          <p className="text-gray-600">Document généré le {new Date().toLocaleDateString('fr-FR')}</p>
        </div>

        <div className="space-y-6">
          {/* En-tête avec logo */}
          <div className="border-b-2 border-blue-600 pb-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-600">{formData.enseigne}</h2>
                <p className="text-gray-600">{formData.raisonSociale}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Forme juridique</p>
                <p className="font-semibold">{formData.formeSociete}</p>
              </div>
            </div>
          </div>

          {/* Informations entreprise */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                INFORMATIONS ENTREPRISE
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Enseigne:</span>
                  <p className="text-gray-900">{formData.enseigne}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Raison sociale:</span>
                  <p className="text-gray-900">{formData.raisonSociale}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Forme juridique:</span>
                  <p className="text-gray-900">{formData.formeSociete}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Code APE:</span>
                  <p className="text-gray-900">{formData.codeAPE}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">SIRET:</span>
                  <p className="text-gray-900">{formData.siret}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                ADRESSE
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Adresse:</span>
                  <p className="text-gray-900">{formData.adresse}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Code postal:</span>
                  <p className="text-gray-900">{formData.codePostal}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Ville:</span>
                  <p className="text-gray-900">{formData.ville}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              CONTACT
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Nom complet:</span>
                  <p className="text-gray-900">{formData.prenom} {formData.nom}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Email:</span>
                  <p className="text-gray-900">{formData.email}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Téléphone:</span>
                  <p className="text-gray-900">{formData.telephone}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Date de naissance:</span>
                  <p className="text-gray-900">{formData.dateNaissance ? new Date(formData.dateNaissance).toLocaleDateString('fr-FR') : 'Non renseigné'}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Date de création:</span>
                  <p className="text-gray-900">{formData.dateCreation ? new Date(formData.dateCreation).toLocaleDateString('fr-FR') : 'Non renseigné'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pied de page */}
          <div className="mt-12 pt-6 border-t-2 border-gray-300">
            <div className="text-center text-sm text-gray-500">
              <p>Document généré automatiquement par Viviworks</p>
              <p>Date de génération: {new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
