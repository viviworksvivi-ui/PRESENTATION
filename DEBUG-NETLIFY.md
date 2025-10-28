# 🔍 Guide de Débogage - Problème Netlify

## Étape 1 : Vérifier la console du navigateur

1. Sur **https://viviworks1.netlify.app**
2. Appuyez sur **F12** (ou clic droit → Inspecter)
3. Allez dans l'onglet **"Console"**
4. Créez un devis et cliquez **💾 Sauvegarder**
5. **Prenez une capture d'écran** de la console (surtout les lignes rouges)

## Étape 2 : Vérifier les requêtes réseau

1. Toujours avec F12 ouvert
2. Allez dans l'onglet **"Network"** ou **"Réseau"**
3. Cliquez **💾 Sauvegarder** à nouveau
4. Cherchez une ligne qui commence par **"devis"**
5. Cliquez dessus
6. Regardez le **"Status"** : 
   - ✅ 200 OK = Bon
   - ❌ 500 Error = Problème serveur
   - ❌ 404 Not Found = API route introuvable

## Étape 3 : Vérifier que l'API existe

Dans votre navigateur, allez sur :
```
https://viviworks1.netlify.app/api/devis
```

**Résultat attendu :**
```json
{"devis":[]}
```

**Si vous voyez :**
- ❌ "Page not found" → L'API n'est pas déployée
- ❌ Erreur 500 → Problème Upstash
- ✅ `{"devis":[]}` → L'API fonctionne

## Étape 4 : Vérifier les logs Netlify

1. Allez sur https://app.netlify.com
2. Ouvrez votre site **viviworks1**
3. Cliquez sur **"Functions"** dans le menu
4. Vérifiez que vous voyez des fonctions listées

## Étape 5 : Vérifier les variables d'environnement

Sur Netlify :
1. Site settings → Environment variables
2. Vérifiez que ces 2 variables existent :
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

## Erreurs communes

### Erreur : "fetch failed"
**Cause :** Les variables Upstash ne sont pas dans Netlify
**Solution :** Ajouter les variables et redéployer

### Erreur : "404 Not Found" sur /api/devis
**Cause :** Les API routes ne sont pas déployées
**Solution :** Vérifier le build et redéployer

### Erreur : "UPSTASH_REDIS_REST_URL is not defined"
**Cause :** Variables manquantes
**Solution :** Ajouter les variables dans Netlify

### Pas d'erreur mais devis n'apparaît pas
**Cause :** Le devis n'est peut-être pas sauvegardé
**Solution :** Vérifier la console et network tab

