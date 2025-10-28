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
    if (!pdfRef.current) return

    setIsSubmitting(true)
    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save("fiche-entreprise.pdf")
      toast.success("PDF généré avec succès !")
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error)
      toast.error("Erreur lors de la génération du PDF")
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
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="dateNaissance"
                      type="date"
                      value={formData.dateNaissance}
                      onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
                      className="pl-10 border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                    />
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
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="dateCreation"
                      type="date"
                      value={formData.dateCreation}
                      onChange={(e) => handleInputChange("dateCreation", e.target.value)}
                      className="pl-10 border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 bg-transparent text-sm md:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton de génération PDF */}
            <div className="mt-8 md:mt-12 text-center">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#804d3b] hover:bg-[#6a3f2f] text-white px-8 py-3 text-lg font-semibold"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Génération en cours...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    <span>Générer PDF</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aperçu PDF (caché) */}
      <div ref={pdfRef} className="hidden">
        <div className="bg-white p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">FICHE ENTREPRISE</h1>
            <p className="text-gray-600">Générée le {new Date().toLocaleDateString('fr-FR')}</p>
          </div>

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

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              CONTACT PRINCIPAL
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Prénom:</span>
                  <p className="text-gray-900">{formData.prenom}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Nom:</span>
                  <p className="text-gray-900">{formData.nom}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Date de naissance:</span>
                  <p className="text-gray-900">{formData.dateNaissance}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Email:</span>
                  <p className="text-gray-900">{formData.email}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Téléphone:</span>
                  <p className="text-gray-900">{formData.telephone}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Date de création:</span>
                  <p className="text-gray-900">{formData.dateCreation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
