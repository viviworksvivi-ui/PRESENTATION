# ⚡ Démarrage Rapide - Upstash

**Temps estimé : 5 minutes**

Guide ultra-rapide pour configurer Upstash et commencer à sauvegarder vos devis dans le cloud.

---

## 📝 Ce qui a été ajouté

✅ **Base de données Upstash Redis** pour stocker les devis  
✅ **API Routes complètes** pour gérer les devis  
✅ **Composant "Liste des devis"** pour voir tous les devis  
✅ **Sauvegarde automatique** dans le cloud  
✅ **Interface moderne** avec statistiques et filtres  

---

## 🚀 Configuration en 5 étapes

### 1️⃣ Créer un compte Upstash (2 min)

1. Allez sur [https://upstash.com](https://upstash.com)
2. Cliquez sur **"Get Started"**
3. Connectez-vous avec GitHub ou Email

### 2️⃣ Créer une base de données (1 min)

1. Cliquez sur **"Create Database"**
2. Remplissez :
   - **Name** : `viviworks-devis`
   - **Type** : `Regional`
   - **Region** : `Europe (eu-west-1) - Ireland`
3. Cliquez sur **"Create"**

### 3️⃣ Récupérer les credentials (30 sec)

1. Cliquez sur l'onglet **"REST API"**
2. Copiez ces deux valeurs :
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### 4️⃣ Configurer `.env.local` (1 min)

Créez ou modifiez le fichier `.env.local` à la racine du projet :

```env
# Stripe (déjà configuré)
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Upstash (NOUVEAU - collez vos valeurs ici)
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXxxxxxxxxxxxxxxxxx
```

### 5️⃣ Redémarrer le serveur (30 sec)

```bash
# Arrêter le serveur (Ctrl+C dans le terminal)
# Puis redémarrer :
pnpm dev
```

---

## ✅ Tester

### Test 1 : Sauvegarder un devis

1. Ouvrez [http://localhost:3000](http://localhost:3000)
2. Allez dans **"Devis"**
3. Créez un devis de test
4. Cliquez sur **💾 Sauvegarder**
5. Vous devriez voir : *"Devis sauvegardé dans la base de données cloud"* ✅

### Test 2 : Voir la liste

1. Allez dans **"Liste des devis"** (nouveau menu)
2. Votre devis devrait apparaître dans le tableau
3. Cliquez sur l'icône 👁️ pour voir les détails
4. Vous pouvez aussi supprimer le devis avec 🗑️

### Test 3 : Vérifier dans Upstash

1. Retournez sur [https://console.upstash.com](https://console.upstash.com)
2. Ouvrez votre base de données
3. Cliquez sur **"Data Browser"**
4. Vous devriez voir :
   - `devis:index` (liste des IDs)
   - `devis:devis-123456-abc` (votre devis)

---

## 🎯 Nouvelles fonctionnalités

### Dans "Devis" (modifié)

- Le bouton **💾 Sauvegarder** enregistre maintenant dans Upstash
- Les devis sont automatiquement sauvegardés avec un ID unique
- Plus besoin de localStorage !

### Dans "Liste des devis" (nouveau)

**Statistiques :**
- 📊 Total de devis
- ✅ Nombre de devis signés
- 💰 Montant total

**Tableau complet :**
- Numéro, client, date, montant, statut
- Recherche par client/email/numéro
- Filtre par statut (brouillon, envoyé, signé, payé)
- Actions : voir détails, supprimer

**Détails du devis :**
- Informations client
- Montant avec remise
- Signature (si signée)
- Statut et dates

---

## 📁 Fichiers créés

```
├── lib/
│   └── redis.ts                      # Client Upstash
├── app/api/
│   └── devis/
│       ├── route.ts                   # GET/POST/DELETE tous les devis
│       └── [id]/route.ts              # GET/PUT/DELETE un devis
├── components/
│   └── liste-devis-content.tsx        # Composant liste des devis
├── .env.local.example                 # Exemple de config
├── README-UPSTASH.md                  # Guide complet
├── GUIDE-INSTALLATION.md              # Guide d'installation
└── DEMARRAGE-RAPIDE-UPSTASH.md        # Ce fichier
```

---

## 🔌 API Endpoints

Voici les routes API disponibles :

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/devis` | Récupérer tous les devis |
| `POST` | `/api/devis` | Créer/Mettre à jour un devis |
| `DELETE` | `/api/devis` | Supprimer tous les devis (dev) |
| `GET` | `/api/devis/[id]` | Récupérer un devis spécifique |
| `PUT` | `/api/devis/[id]` | Mettre à jour un devis |
| `DELETE` | `/api/devis/[id]` | Supprimer un devis |

---

## 💡 Utilisation

### Créer un devis

```typescript
const response = await fetch('/api/devis', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    numero: 'DV-123456',
    clientNom: 'John Doe',
    clientEmail: 'john@example.com',
    lines: [...],
    // ... autres champs
  })
})
```

### Récupérer tous les devis

```typescript
const response = await fetch('/api/devis')
const { devis } = await response.json()
// devis = [{...}, {...}, ...]
```

### Supprimer un devis

```typescript
const response = await fetch(`/api/devis/${devisId}`, {
  method: 'DELETE'
})
```

---

## 🎨 Interface "Liste des devis"

### Fonctionnalités

✅ **Statistiques en temps réel**
- Total des devis
- Nombre de signés
- Nombre de payés
- Montant total

✅ **Recherche intelligente**
- Par numéro de devis
- Par nom de client
- Par email

✅ **Filtres**
- Brouillon
- Envoyé
- Signé
- Payé
- Annulé

✅ **Actions**
- 👁️ Voir les détails
- 🗑️ Supprimer

✅ **Responsive**
- Adapté mobile, tablette, desktop
- Tableau scrollable

---

## 🔒 Sécurité

Les variables d'environnement sont :

- ✅ **Sécurisées** : Jamais exposées côté client
- ✅ **Privées** : `.env.local` est dans `.gitignore`
- ✅ **Isolées** : Uniquement accessibles côté serveur (API routes)

---

## 📊 Plan gratuit Upstash

| Ressource | Limite |
|-----------|--------|
| Commandes/jour | 10,000 |
| Stockage | 256 MB |
| Bande passante | 200 MB/jour |

**Pour Viviworks :**  
C'est largement suffisant ! Vous pouvez créer ~300 devis/jour sans problème.

---

## 🆘 Problèmes courants

### "UPSTASH_REDIS_REST_URL is not defined"

✅ **Solution :**
1. Vérifiez que `.env.local` existe
2. Vérifiez l'orthographe des variables
3. Redémarrez le serveur (`pnpm dev`)

### Les devis n'apparaissent pas

✅ **Solution :**
1. Ouvrez la console (F12)
2. Regardez les erreurs réseau
3. Vérifiez que le serveur est bien redémarré
4. Testez l'API : `http://localhost:3000/api/devis`

### Erreur 500 lors de la sauvegarde

✅ **Solution :**
1. Vérifiez vos credentials Upstash
2. Vérifiez que la base de données est active
3. Regardez les logs du serveur dans le terminal

---

## 📚 Aller plus loin

- 📖 [README-UPSTASH.md](./README-UPSTASH.md) - Documentation complète
- 📖 [GUIDE-INSTALLATION.md](./GUIDE-INSTALLATION.md) - Installation complète
- 🌐 [Documentation Upstash](https://docs.upstash.com/)

---

## 📞 Support

- **Email** : info@viviworks.fr
- **Téléphone** : +33 7 84 78 99 10

---

## ✅ Checklist

- [ ] Compte Upstash créé
- [ ] Base de données créée (region Europe)
- [ ] Credentials copiés
- [ ] `.env.local` configuré
- [ ] Serveur redémarré
- [ ] Test de sauvegarde réussi
- [ ] Liste des devis affichée
- [ ] Vérification dans Upstash Data Browser

---

**🎉 Félicitations ! Vos devis sont maintenant sauvegardés dans le cloud !**

Tous les devis créés seront automatiquement stockés dans Upstash Redis et accessibles depuis n'importe où.

