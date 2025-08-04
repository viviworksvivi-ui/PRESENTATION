"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Loader2, Download } from "lucide-react"
import { toast } from "sonner"
import jsPDF from "jspdf"

export function EntrepriseFormSimple() {
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generatePDF = async () => {
    setIsSubmitting(true)
    
    try {
      console.log('Début de la génération PDF...')
      
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      // Titre
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.text('FICHE ENTREPRISE', 105, 20, { align: 'center' })
      
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Document généré le ${new Date().toLocaleDateString('fr-FR')}`, 105, 30, { align: 'center' })
      
      // En-tête
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'bold')
      pdf.text(formData.enseigne, 20, 50)
      
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      pdf.text(formData.raisonSociale, 20, 60)
      pdf.text(`Forme juridique: ${formData.formeSociete}`, 20, 70)
      
      // Informations entreprise
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('INFORMATIONS ENTREPRISE', 20, 90)
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Enseigne: ${formData.enseigne}`, 20, 105)
      pdf.text(`Raison sociale: ${formData.raisonSociale}`, 20, 115)
      pdf.text(`Forme juridique: ${formData.formeSociete}`, 20, 125)
      pdf.text(`Code APE: ${formData.codeAPE}`, 20, 135)
      pdf.text(`SIRET: ${formData.siret}`, 20, 145)
      
      // Adresse
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('ADRESSE', 20, 165)
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Adresse: ${formData.adresse}`, 20, 180)
      pdf.text(`Code postal: ${formData.codePostal}`, 20, 190)
      pdf.text(`Ville: ${formData.ville}`, 20, 200)
      
      // Contact
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('CONTACT', 20, 220)
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Nom complet: ${formData.prenom} ${formData.nom}`, 20, 235)
      pdf.text(`Email: ${formData.email}`, 20, 245)
      pdf.text(`Téléphone: ${formData.telephone}`, 20, 255)
      
      const dateNaissance = formData.dateNaissance ? new Date(formData.dateNaissance).toLocaleDateString('fr-FR') : 'Non renseigné'
      const dateCreation = formData.dateCreation ? new Date(formData.dateCreation).toLocaleDateString('fr-FR') : 'Non renseigné'
      
      pdf.text(`Date de naissance: ${dateNaissance}`, 20, 265)
      pdf.text(`Date de création: ${dateCreation}`, 20, 275)
      
      // Pied de page
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'italic')
      pdf.text('Document généré automatiquement par Viviworks', 105, 280, { align: 'center' })
      pdf.text(`Date de génération: ${new Date().toLocaleString('fr-FR')}`, 105, 285, { align: 'center' })

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
                  className="border-0 border-b-2 border-gray-300 rounded-none focus:border-[#804d3b] bg-transparent text-sm md:text-base"
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

              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="bg-[#804d3b] hover:bg-[#6a3f2f] text-white px-6 md:px-8 shadow-lg hover:shadow-xl transition-all duration-200"
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
    </div>
  )
} 