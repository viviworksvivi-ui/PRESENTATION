# 🗄️ Configuration Upstash Redis

Ce guide vous explique comment configurer Upstash Redis pour stocker les devis dans une base de données cloud serverless.

## 📋 Table des matières

1. [Qu'est-ce qu'Upstash ?](#quest-ce-qupstash)
2. [Création du compte](#création-du-compte)
3. [Configuration](#configuration)
4. [Variables d'environnement](#variables-denvironnement)
5. [Fonctionnement](#fonctionnement)
6. [API Routes](#api-routes)

---

## 🤔 Qu'est-ce qu'Upstash ?

**Upstash** est une base de données Redis serverless, parfaite pour :

- ✅ Applications Next.js et Netlify
- ✅ Déploiement serverless (pas de serveur à gérer)
- ✅ Gratuit jusqu'à 10 000 commandes/jour
- ✅ API REST simple et rapide
- ✅ Compatible avec Redis (clé-valeur)

**Avantages pour Viviworks :**
- Sauvegarde automatique des devis dans le cloud
- Accès depuis n'importe où
- Pas de gestion de serveur
- Très rapide (latence < 50ms en Europe)

---

## 🚀 Création du compte

### Étape 1 : Inscription

1. Allez sur [https://upstash.com](https://upstash.com)
2. Cliquez sur **"Get Started"** ou **"Sign Up"**
3. Créez votre compte avec :
   - Email
   - GitHub (recommandé)
   - Google

### Étape 2 : Créer une base de données Redis

1. Une fois connecté, cliquez sur **"Create Database"**
2. Configurez votre base de données :
   ```
   Name: viviworks-devis
   Type: Regional
   Region: Europe (eu-west-1) - Ireland
   TLS: Enabled (par défaut)
   Eviction: No eviction (recommandé)
   ```
3. Cliquez sur **"Create"**

### Étape 3 : Récupérer les credentials

1. Sur la page de votre base de données
2. Allez dans l'onglet **"REST API"**
3. Vous verrez :
   - **UPSTASH_REDIS_REST_URL** : `https://xxx.upstash.io`
   - **UPSTASH_REDIS_REST_TOKEN** : `AXXXxxx...`
4. Copiez ces deux valeurs

---

## ⚙️ Configuration

### Créer le fichier `.env.local`

À la racine du projet, créez ou modifiez `.env.local` :

```env
# Stripe (déjà configuré)
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Upstash Redis (NOUVEAU)
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### ⚠️ Important

- **NE JAMAIS** commiter `.env.local` dans Git
- Les variables commençant par `NEXT_PUBLIC_` sont accessibles côté client
- Les autres variables sont **SECRÈTES** et uniquement côté serveur

### Redémarrer le serveur

```bash
# Arrêter le serveur (Ctrl+C)
# Puis redémarrer
pnpm dev
```

---

## 🔄 Fonctionnement

### Structure des données

Les devis sont stockés dans Redis avec cette structure :

```typescript
interface DevisData {
  id: string                    // Identifiant unique
  numero: string                // Numéro du devis (DV-123456)
  date: string                  // Date de création
  validite: string              // Date de validité
  clientNom: string             // Nom du client
  clientAdresse: string
  clientCodePostal: string
  clientVille: string
  clientTelephone: string
  clientEmail: string
  lines: Array<{                // Lignes du devis
    id: string
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
  notes: string
  signature?: string            // Signature base64
  signatureDate?: string
  discount?: {                  // Remise appliquée
    id: string
    label: string
    value: number
    type: 'percentage' | 'fixed'
  }
  totalHT: number              // Total calculé
  status: string               // draft, sent, signed, paid, cancelled
  createdAt: string            // Date de création
  updatedAt: string            // Dernière modification
}
```

### Clés Redis

Les données sont organisées ainsi dans Redis :

```
devis:index                          → Set de tous les IDs de devis
devis:devis-1234567890-abc123        → Devis complet (JSON)
devis:devis-1234567890-xyz789        → Devis complet (JSON)
...
```

---

## 📡 API Routes

### 1. Sauvegarder un devis

**POST** `/api/devis`

```typescript
// Exemple d'appel
const response = await fetch('/api/devis', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    numero: 'DV-123456',
    clientNom: 'John Doe',
    clientEmail: 'john@example.com',
    lines: [
      {
        id: '1',
        description: 'Site web',
        quantity: 1,
        unitPrice: 2000,
        total: 2000
      }
    ],
    notes: 'Devis valable 30 jours',
    // ... autres champs
  })
})

const data = await response.json()
// { success: true, devis: {...}, message: "Devis sauvegardé avec succès" }
```

### 2. Récupérer tous les devis

**GET** `/api/devis`

```typescript
const response = await fetch('/api/devis')
const data = await response.json()
// { devis: [{...}, {...}, ...] }
```

### 3. Récupérer un devis spécifique

**GET** `/api/devis/[id]`

```typescript
const response = await fetch('/api/devis/devis-1234567890-abc123')
const data = await response.json()
// { devis: {...} }
```

### 4. Mettre à jour un devis

**PUT** `/api/devis/[id]`

```typescript
const response = await fetch('/api/devis/devis-1234567890-abc123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'signed',
    signature: 'data:image/png;base64,...',
    signatureDate: new Date().toISOString()
  })
})

const data = await response.json()
// { success: true, devis: {...}, message: "Devis mis à jour avec succès" }
```

### 5. Supprimer un devis

**DELETE** `/api/devis/[id]`

```typescript
const response = await fetch('/api/devis/devis-1234567890-abc123', {
  method: 'DELETE'
})

const data = await response.json()
// { success: true, message: "Devis supprimé avec succès" }
```

---

## 🧪 Tests

### Tester avec Upstash Console

1. Allez sur le Dashboard Upstash
2. Ouvrez votre base de données
3. Cliquez sur **"Data Browser"**
4. Vous pouvez voir toutes les clés stockées
5. Cliquez sur une clé pour voir son contenu

### Tester l'API avec curl

```bash
# Créer un devis
curl -X POST http://localhost:3000/api/devis \
  -H "Content-Type: application/json" \
  -d '{
    "numero": "DV-TEST-001",
    "clientNom": "Test Client",
    "clientEmail": "test@example.com",
    "lines": [{
      "id": "1",
      "description": "Test",
      "quantity": 1,
      "unitPrice": 100,
      "total": 100
    }],
    "notes": "Test"
  }'

# Récupérer tous les devis
curl http://localhost:3000/api/devis
```

---

## 📊 Limites du plan gratuit

| Ressource | Limite Gratuite | Limite Pro |
|-----------|-----------------|------------|
| Commandes/jour | 10,000 | Illimité |
| Bande passante | 200 MB/jour | Illimité |
| Stockage | 256 MB | Illimité |
| Connexions | 100 | Illimité |

**Pour Viviworks :**
- Le plan gratuit est largement suffisant pour commencer
- ~300 devis/jour = confortable
- Passage en Pro si nécessaire (~10$/mois)

---

## 🔒 Sécurité

### Bonnes pratiques

✅ **À FAIRE :**
- Garder les tokens secrets
- Utiliser HTTPS en production
- Valider les données avant sauvegarde
- Limiter l'accès aux API routes (authentification)

❌ **À NE PAS FAIRE :**
- Exposer les tokens dans le code client
- Commiter `.env.local` dans Git
- Stocker des données sensibles sans chiffrement

### Authentification des API routes

Vous pouvez ajouter une authentification dans vos API routes :

```typescript
// app/api/devis/route.ts
export async function POST(req: NextRequest) {
  // Vérifier l'authentification
  const loginStatus = req.cookies.get('viviworks-login')
  
  if (loginStatus?.value !== 'true') {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 401 }
    )
  }
  
  // ... reste du code
}
```

---

## 🚀 Migration depuis localStorage

### Données existantes

Si vous aviez des devis dans `localStorage`, voici comment les migrer :

```typescript
// Script de migration à exécuter une fois
async function migrateFromLocalStorage() {
  const oldDevis = localStorage.getItem('viviworks-all-devis')
  
  if (oldDevis) {
    const devisList = JSON.parse(oldDevis)
    
    for (const devis of devisList) {
      await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(devis)
      })
    }
    
    console.log(`${devisList.length} devis migrés !`)
    
    // Sauvegarder une copie de sécurité
    localStorage.setItem('viviworks-all-devis-backup', oldDevis)
    
    // Nettoyer localStorage
    localStorage.removeItem('viviworks-all-devis')
    localStorage.removeItem('viviworks-current-devis')
  }
}
```

---

## 🆘 Dépannage

### Erreur "UPSTASH_REDIS_REST_URL is not defined"

✅ **Solution :**
1. Vérifiez que `.env.local` existe à la racine du projet
2. Vérifiez l'orthographe des variables
3. Redémarrez le serveur (`pnpm dev`)

### Erreur "Unauthorized"

✅ **Solution :**
1. Vérifiez que le token Upstash est correct
2. Régénérez un nouveau token si nécessaire
3. Vérifiez que la base de données est active

### Les devis n'apparaissent pas

✅ **Solution :**
1. Vérifiez le Data Browser dans Upstash
2. Testez l'API avec `curl` ou Postman
3. Regardez les logs du serveur Next.js
4. Vérifiez la console du navigateur

---

## 📚 Ressources

- [Documentation Upstash](https://docs.upstash.com/)
- [Upstash Redis SDK](https://github.com/upstash/upstash-redis)
- [Dashboard Upstash](https://console.upstash.com/)
- [Pricing Upstash](https://upstash.com/pricing)

---

## 📞 Support

Pour toute question :

- **Email** : info@viviworks.fr
- **Téléphone** : +33 7 84 78 99 10
- **Support Upstash** : support@upstash.com

---

## ✅ Checklist de configuration

- [ ] Compte Upstash créé
- [ ] Base de données Redis créée
- [ ] Variables ajoutées dans `.env.local`
- [ ] Package `@upstash/redis` installé
- [ ] Serveur redémarré
- [ ] API testée avec un devis
- [ ] Liste des devis affichée
- [ ] Migration des données (si nécessaire)

---

**🎉 Félicitations ! Vos devis sont maintenant sauvegardés dans le cloud !**

