# 🚀 Viviworks Presentation App

Application de présentation moderne pour Viviworks, optimisée pour mobile et desktop.

## ✨ Fonctionnalités

- **Interface responsive** - Optimisée pour mobile et desktop
- **Showroom interactif** - Aperçus de sites web clients
- **Authentification** - Système de connexion sécurisé
- **Navigation fluide** - Sidebar responsive
- **Design moderne** - Interface utilisateur intuitive
- **Système de devis complet** - Création, signature électronique, PDF
- **Base de données cloud** - Upstash Redis pour stockage des devis
- **Liste des devis** - Gestion et suivi de tous les devis

## 🛠️ Technologies

- **Next.js 15** - Framework React moderne
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **Radix UI** - Composants accessibles
- **shadcn/ui** - Composants UI modernes
- **Upstash Redis** - Base de données serverless
- **jsPDF + html2canvas** - Génération de PDF

## 🚀 Déploiement

### Netlify
Le projet est configuré pour un déploiement automatique sur Netlify.

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Upstash Redis - Base de données
UPSTASH_REDIS_REST_URL=https://votre-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXxxxxxxxxxxxxxxxxx
```

📖 **Guides de configuration :**
- [DEMARRAGE-RAPIDE-UPSTASH.md](./DEMARRAGE-RAPIDE-UPSTASH.md) - Configuration en 5 min
- [README-UPSTASH.md](./README-UPSTASH.md) - Documentation Upstash complète

## 📱 Optimisations Mobile

- Sidebar responsive avec toggle
- Grille adaptative pour le showroom
- Typographie responsive
- Boutons et interactions optimisés
- Navigation tactile intuitive

## 🎨 Sections

1. **Viviworks** - Présentation de l'entreprise
2. **Showroom** - Aperçus de sites web clients
3. **Arborescence** - Structure du projet
4. **Campagne ADS** - Stratégies marketing
5. **Devis** - Création de devis avec signature électronique
6. **Liste des devis** - Gestion de tous les devis (Upstash)
7. **Validation** - Processus de validation

## 🔧 Installation

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Build pour production
npm run build

# Démarrer en mode production
npm start
```

## 📦 Structure du projet

```
presentation/
├── app/                    # Pages Next.js
├── components/             # Composants React
│   ├── ui/               # Composants UI
│   └── *.tsx            # Composants métier
├── public/               # Assets statiques
├── styles/               # Styles globaux
└── lib/                  # Utilitaires
```

## 🌐 Sites web dans le showroom

- **Electronik Auto** - Site automobile
- **Ecoclimatic** - Solutions climatiques
- **Wake Up Academy** - Formation

## 📄 Licence

Projet privé - Viviworks © 2024

---

**Développé avec ❤️ pour Viviworks** 