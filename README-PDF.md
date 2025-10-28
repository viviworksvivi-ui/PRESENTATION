# Correction PDF - Offre de Partenariat Viviworks

## 📋 Problèmes corrigés

Le PDF original présentait plusieurs problèmes d'encodage et de mise en forme :

### ❌ Problèmes identifiés :
- **Caractères spéciaux mal encodés** : `NumÃ©ro` → `Numéro`
- **Symboles euro incorrects** : `0â‚¬` → `0€`
- **Accents manquants** : `TÃ©lÃ©phone` → `Téléphone`
- **Mise en forme basique** sans style professionnel
- **Tableau peu lisible** sans bordures ni couleurs

### ✅ Corrections apportées :
- **Encodage UTF-8** correct pour tous les caractères spéciaux
- **Symboles euro** appropriés (`€`)
- **Accents français** correctement affichés
- **Design professionnel** avec couleurs Viviworks
- **Tableau structuré** avec en-têtes et totaux mis en évidence
- **Mise en page responsive** pour différents formats

## 📁 Fichiers créés

### 1. `offre-partenariat-corrigee.md`
Version Markdown corrigée avec tous les caractères spéciaux appropriés.

### 2. `offre-partenariat.html`
Version HTML complète avec :
- Design professionnel aux couleurs Viviworks
- Mise en page responsive
- Styles CSS optimisés pour l'impression
- Tableau structuré avec totaux
- Zone de signature

### 3. `generate-pdf.js`
Script Node.js pour convertir automatiquement le HTML en PDF.

### 4. `package.json`
Configuration des dépendances pour la génération PDF.

## 🚀 Utilisation

### Option 1 : Génération automatique PDF
```bash
# Installer les dépendances
npm install

# Générer le PDF
npm run generate
```

### Option 2 : Utilisation manuelle
1. Ouvrir `offre-partenariat.html` dans un navigateur
2. Utiliser l'impression du navigateur (Ctrl+P)
3. Sauvegarder en PDF

### Option 3 : Édition du contenu
1. Modifier `offre-partenariat.html` selon vos besoins
2. Régénérer le PDF avec le script

## 🎨 Personnalisation

### Couleurs Viviworks utilisées :
- **Bleu principal** : `#4fafc4`
- **Gris clair** : `#f8f9fa`
- **Texte principal** : `#333`
- **Texte secondaire** : `#666`

### Modifications possibles :
- Changer les informations de contact
- Modifier les prix et services
- Ajouter le logo Viviworks
- Personnaliser les couleurs
- Ajouter des conditions supplémentaires

## 📄 Résultat final

Le PDF généré inclut :
- ✅ Encodage correct des caractères
- ✅ Design professionnel
- ✅ Informations complètes
- ✅ Tableau de prix clair
- ✅ Zone de signature
- ✅ Optimisé pour l'impression

## 🔧 Dépendances techniques

- **Puppeteer** : Génération PDF
- **Node.js** : Environnement d'exécution
- **HTML/CSS** : Mise en forme
- **UTF-8** : Encodage des caractères

---

**Développé pour Viviworks** - Correction et amélioration des documents PDF 