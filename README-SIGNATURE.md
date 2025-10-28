# 📝 Guide du Système de Signature Électronique

## 🎯 Vue d'Ensemble

Le système de signature électronique de Viviworks permet aux clients de **signer numériquement les devis** directement depuis un fichier HTML, avec génération automatique d'un **PDF final avec signature et logo**.

---

## 🔄 Processus Complet

### **Étape 1 : Créer le Devis** (Côté Viviworks)

1. Allez dans la section **"Devis"** de l'application
2. Remplissez toutes les informations :
   - Informations du devis (numéro, date, validité)
   - Informations client (nom, adresse, téléphone, email)
   - Prestations/Produits avec quantités et prix
   - Notes et conditions
3. **Optionnel** : Signez vous-même dans le canvas pour validation interne

### **Étape 2 : Générer le Fichier de Signature**

Cliquez sur le bouton : **"📧 Générer fichier à signer"**

Cela va télécharger un fichier HTML : `devis-a-signer-DV-XXXXXX.html`

### **Étape 3 : Envoyer au Client**

Envoyez ce fichier HTML au client par email avec ces instructions :

```
Bonjour,

Veuillez trouver ci-joint votre devis à signer électroniquement.

Instructions :
1. Téléchargez le fichier HTML joint
2. Ouvrez-le dans votre navigateur (double-clic)
3. Signez dans la zone prévue avec votre souris ou doigt
4. Cliquez sur "Télécharger le PDF signé"
5. Renvoyez-nous le PDF généré par email

Cordialement,
L'équipe Viviworks
```

---

## ✍️ Guide Client : Comment Signer

### **1. Ouvrir le fichier**
- Double-cliquez sur le fichier `devis-a-signer-DV-XXXXXX.html`
- Il s'ouvrira dans votre navigateur par défaut

### **2. Vérifier les informations**
- Consultez toutes les informations du devis
- Vérifiez les prestations et le montant total

### **3. Signer le document**

#### Sur **Ordinateur** (souris) :
1. Cliquez dans la **zone blanche** de signature
2. **Maintenez le bouton enfoncé** et dessinez votre signature
3. Relâchez le bouton pour terminer
4. Signature en **couleur marron** (#804d3b - couleur Viviworks)

#### Sur **Mobile/Tablette** (doigt) :
1. Touchez la **zone blanche** de signature
2. **Maintenez votre doigt appuyé** et dessinez votre signature
3. Levez votre doigt pour terminer
4. Signature en **couleur marron** (#804d3b - couleur Viviworks)

### **4. Corriger si nécessaire**
- Cliquez sur **"🗑️ Effacer la signature"** pour recommencer

### **5. Télécharger le PDF signé**
- Cliquez sur **"📥 Télécharger le PDF signé"**
- Le PDF se génère automatiquement avec :
  - ✅ Votre signature en marron
  - ✅ Le logo Viviworks en haut
  - ✅ La date et l'heure de signature
  - ✅ Toutes les informations du devis

### **6. Trouver le fichier**
- Le PDF est dans votre dossier **Téléchargements**
- Nom du fichier : `devis-signe-DV-XXXXXX-[client]-[date].pdf`

### **7. Renvoyer à Viviworks**
- Envoyez le PDF par email à : **info@viviworks.fr**

---

## 🎨 Caractéristiques de la Signature

### **Couleur**
- **Marron Viviworks** : `#804d3b`
- Identité visuelle cohérente avec la charte graphique

### **Épaisseur**
- Trait de **2.5px** pour une lisibilité optimale
- Lignes lissées pour un rendu professionnel

### **Format**
- Signature capturée en **PNG** haute qualité
- Intégrée directement dans le PDF final

---

## 📄 Le PDF Final Contient

### **Header avec couleur marron**
```
┌─────────────────────────────────────────┐
│  [Logo]  VIVIWORKS         DEVIS        │  ← Fond MARRON #804d3b
│  Création de sites...      N° : DV-XXX  │
└─────────────────────────────────────────┘
```

### **Informations**
- Émetteur (Viviworks)
- Client (nom, adresse, contact)
- Tableau des prestations avec prix
- Total HT

### **Signature du Client**
```
┌─────────────────────────────────────────┐
│  ✅ DEVIS ACCEPTÉ ET SIGNÉ              │
│                                          │
│  Signature du client                    │
│  (Bon pour accord)                      │
│                                          │
│  [Image de la signature en MARRON]      │
│                                          │
│  📅 Signé le 25/10/2025 à 14:30         │
└─────────────────────────────────────────┘
```

---

## 🔧 Fonctionnalités Techniques

### **Compatibilité**
- ✅ Ordinateurs (Windows, Mac, Linux)
- ✅ Tablettes (iPad, Android)
- ✅ Smartphones (iOS, Android)
- ✅ Tous navigateurs modernes (Chrome, Firefox, Safari, Edge)

### **Technologies Utilisées**
- **HTML5 Canvas** : Zone de signature interactive
- **jsPDF** : Génération du PDF
- **html2canvas** : Capture du document
- **JavaScript vanilla** : Gestion des événements tactiles et souris

### **Sécurité**
- Signature horodatée automatiquement
- Format PNG non modifiable
- Capture exacte du moment de signature

---

## 🚨 Dépannage

### **Problème : La signature ne s'affiche pas**
- ✅ Vérifiez que vous maintenez le bouton/doigt enfoncé en dessinant
- ✅ Essayez de dessiner plus lentement
- ✅ Cliquez sur "Effacer" et recommencez

### **Problème : Le PDF ne se télécharge pas**
- ✅ Vérifiez que vous avez bien signé (message de confirmation)
- ✅ Autorisez les téléchargements dans votre navigateur
- ✅ Désactivez les bloqueurs de pop-up

### **Problème : Le fichier HTML ne s'ouvre pas**
- ✅ Faites un clic droit → "Ouvrir avec" → Choisir le navigateur
- ✅ Glissez-déposez le fichier dans une fenêtre de navigateur

### **Problème : La signature est trop petite**
- ✅ Utilisez toute la zone blanche pour signer
- ✅ Faites une signature plus grande
- ✅ La taille sera ajustée automatiquement dans le PDF

---

## 📊 Avantages du Système

### **Pour Viviworks**
- ✅ Gain de temps (pas d'impression/scan)
- ✅ Suivi automatique avec horodatage
- ✅ Archivage numérique simplifié
- ✅ Traçabilité complète

### **Pour le Client**
- ✅ Signature depuis n'importe où
- ✅ Pas besoin d'imprimante/scanner
- ✅ Process en 2 minutes
- ✅ PDF professionnel instantané

---

## 📧 Support

Pour toute question ou problème :
- **Email** : info@viviworks.fr
- **Téléphone** : +33 7 84 78 99 10
- **Adresse** : 24-26 Arcadia Avenue, Fin0000, Londres, Royaume-Uni, N3 2JU

---

## 🎯 Checklist Rapide

### **Côté Viviworks :**
- [ ] Créer le devis dans l'application
- [ ] Cliquer sur "📧 Générer fichier à signer"
- [ ] Envoyer le fichier HTML par email au client
- [ ] Attendre le PDF signé en retour

### **Côté Client :**
- [ ] Recevoir l'email avec le fichier HTML
- [ ] Ouvrir le fichier dans le navigateur
- [ ] Vérifier les informations du devis
- [ ] Dessiner la signature en **MARRON** dans la zone
- [ ] Cliquer sur "📥 Télécharger le PDF signé"
- [ ] Renvoyer le PDF par email à Viviworks

---

**Système de signature développé pour Viviworks** 🚀

*Signature en couleur marron (#804d3b) - Identité visuelle Viviworks*


