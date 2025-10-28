# 🚀 Guide d'Installation - Viviworks

Guide complet pour installer et configurer l'application Viviworks.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** 18 ou supérieur ([Télécharger](https://nodejs.org/))
- **pnpm** ([Installation](https://pnpm.io/installation))
- Un éditeur de code (VS Code recommandé)
- Git (pour cloner le projet)

## 📦 Installation

### Étape 1 : Cloner le projet

```bash
git clone <url-du-repo>
cd presentation
```

### Étape 2 : Installer les dépendances

```bash
pnpm install
```

Cette commande va installer tous les packages nécessaires (~45 dépendances).

## ⚙️ Configuration

### Étape 3 : Configurer les variables d'environnement

1. Copiez le fichier d'exemple :

```bash
cp .env.local.example .env.local
```

2. Ouvrez `.env.local` dans votre éditeur

3. Configurez **Upstash Redis** (base de données) :

```env
UPSTASH_REDIS_REST_URL=https://votre-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXxxxxxxxxxxxxxxxxx
```

**Comment obtenir les credentials Upstash ?**
- Créez un compte sur [https://upstash.com](https://upstash.com)
- Créez une base de données Redis (région Europe)
- Dans l'onglet **REST API**, copiez l'URL et le Token

👉 **Guide détaillé** : Voir [README-UPSTASH.md](./README-UPSTASH.md)

### Étape 4 : Démarrer le serveur de développement

```bash
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## ✅ Vérification de l'installation

### Test 1 : Application

1. Ouvrez [http://localhost:3000](http://localhost:3000)
2. Vous devriez voir la page de connexion
3. Connectez-vous avec vos identifiants

### Test 2 : Upstash Redis

1. Dans l'application, allez dans **Devis**
2. Créez un devis de test
3. Cliquez sur **💾 Sauvegarder**
4. Vous devriez voir "Devis sauvegardé dans la base de données cloud"
5. Allez dans **Liste des devis**
6. Votre devis devrait apparaître

**Vérification dans Upstash :**
- Connectez-vous à [https://console.upstash.com](https://console.upstash.com)
- Ouvrez votre base de données
- Cliquez sur **Data Browser**
- Vous devriez voir les clés `devis:index` et `devis:devis-...`

### Test 3 : Stripe

1. Créez un devis avec signature
2. Générez le fichier HTML interactif
3. Ouvrez le fichier, signez
4. Téléchargez le PDF
5. Vous serez redirigé vers Stripe
6. Utilisez la carte de test : `4242 4242 4242 4242`
7. Vous devriez être redirigé vers la page de succès

**Vérification dans Stripe :**
- Connectez-vous à [https://dashboard.stripe.com](https://dashboard.stripe.com)
- Allez dans **Paiements**
- Votre paiement de test devrait apparaître

## 🏗️ Structure du projet

```
presentation/
├── app/                    # Pages Next.js
│   ├── api/               # API Routes
│   │   ├── devis/        # API Upstash pour devis
│   │   └── create-checkout-session/  # API Stripe
│   ├── page.tsx          # Page principale
│   └── layout.tsx        # Layout global
├── components/            # Composants React
│   ├── devis-content.tsx           # Création de devis
│   ├── liste-devis-content.tsx     # Liste des devis
│   ├── app-sidebar.tsx             # Navigation
│   └── ui/                         # Composants UI (shadcn)
├── lib/
│   ├── redis.ts          # Client Upstash
│   └── utils.ts          # Utilitaires
├── public/               # Assets statiques
│   └── logo.png         # Logo Viviworks
└── .env.local           # Variables d'environnement (à créer)
```

## 🚀 Déploiement sur Netlify

### Préparer le déploiement

1. **Build local** (test) :

```bash
pnpm build
pnpm export
```

Les fichiers seront générés dans le dossier `out/`.

2. **Configurer Netlify** :

Le fichier `netlify.toml` est déjà configuré :

```toml
[build]
  command = "npm run build && npm run export"
  publish = "out"
```

3. **Déployer** :

**Option A : Via Git**
- Connectez votre repo GitHub à Netlify
- Netlify déploiera automatiquement à chaque push

**Option B : Drag & Drop**
- Glissez-déposez le dossier `out/` sur Netlify

4. **Configurer les variables d'environnement** :

Dans Netlify :
- Allez dans **Site Settings → Environment Variables**
- Ajoutez **UNE PAR UNE** :
  - `STRIPE_SECRET_KEY`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`

⚠️ **Important** : Utilisez les clés de **production** pour le déploiement !

## 📚 Documentation

- [README.md](./README.md) - Vue d'ensemble
- [README-STRIPE.md](./README-STRIPE.md) - Configuration Stripe
- [README-UPSTASH.md](./README-UPSTASH.md) - Configuration Upstash
- [README-SIGNATURE.md](./README-SIGNATURE.md) - Signature électronique
- [README-PDF.md](./README-PDF.md) - Génération de PDF

## 🆘 Dépannage

### Erreur : "Module not found"

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
pnpm install
```

### Erreur : "UPSTASH_REDIS_REST_URL is not defined"

- Vérifiez que `.env.local` existe à la racine
- Vérifiez l'orthographe des variables
- Redémarrez le serveur : `Ctrl+C` puis `pnpm dev`

### Erreur : "Invalid API Key" (Stripe)

- Vérifiez que les clés Stripe sont correctes
- Utilisez bien les clés de **test** (`sk_test_...`)
- Redémarrez le serveur

### Les devis ne s'affichent pas

- Vérifiez la connexion à Upstash
- Regardez la console du navigateur (F12)
- Vérifiez le Data Browser dans Upstash

### Problème de build

```bash
# Nettoyer le cache Next.js
rm -rf .next
pnpm build
```

## 🔧 Commandes utiles

```bash
# Développement
pnpm dev              # Démarrer en mode dev

# Build
pnpm build           # Build de production
pnpm export          # Export statique

# Nettoyage
rm -rf .next         # Nettoyer le cache
rm -rf node_modules  # Supprimer les dépendances
```

## 📊 Checklist complète

- [ ] Node.js 18+ installé
- [ ] pnpm installé
- [ ] Projet cloné
- [ ] `pnpm install` exécuté
- [ ] `.env.local` créé
- [ ] Compte Stripe créé
- [ ] Clés Stripe ajoutées dans `.env.local`
- [ ] Compte Upstash créé
- [ ] Base de données Redis créée
- [ ] Credentials Upstash ajoutés dans `.env.local`
- [ ] Serveur démarré (`pnpm dev`)
- [ ] Application accessible sur localhost:3000
- [ ] Test de sauvegarde de devis réussi
- [ ] Test de paiement Stripe réussi
- [ ] Build de production testé

## 📞 Support

Pour toute question :

- **Email** : info@viviworks.fr
- **Téléphone** : +33 7 84 78 99 10

---

**🎉 Félicitations ! Votre application Viviworks est maintenant opérationnelle !**

