# 🔍 DIAGNOSTIC - Signature ne fonctionne pas

## 📋 Checklist de vérification

### ✅ **1. Ouvrir la console du navigateur**
1. Ouvrez le fichier HTML du devis
2. Appuyez sur **F12** (ou clic droit → "Inspecter")
3. Allez dans l'onglet **"Console"**
4. Rafraîchissez la page (F5)

### ✅ **2. Vérifier les messages de debug**

Vous devriez voir ces messages dans la console :

```
DOM chargé, initialisation du canvas...
Canvas trouvé: <canvas id="signatureCanvas" width="700" height="200">
Contexte 2D: CanvasRenderingContext2D {...}
Variables initialisées: {downloadBtn: button, statusMessage: div}
Canvas initialisé: <canvas id="signatureCanvas" width="700" height="200">
Tous les événements sont attachés
```

### ✅ **3. Tester la signature**

1. **Cliquez** sur la zone de signature (canvas blanc)
2. **Dessinez** avec la souris
3. **Regardez** la console pour ces messages :

```
startDrawing appelé mousedown
Début du dessin
Position calculée: {x: 123, y: 45}
Dessin commencé à: 123 45
Première signature détectée
draw appelé, dessin en cours...
```

## 🚨 **Problèmes possibles**

### ❌ **"Canvas trouvé: null"**
**Cause :** Le canvas n'est pas trouvé
**Solution :** 
- Vérifiez que le fichier HTML est complet
- Rafraîchissez la page
- Vérifiez qu'il n'y a pas d'erreurs JavaScript

### ❌ **"Contexte 2D: null"**
**Cause :** Impossible d'obtenir le contexte 2D
**Solution :**
- Le canvas pourrait être corrompu
- Essayez de rafraîchir la page

### ❌ **Pas de messages "startDrawing appelé"**
**Cause :** Les événements ne sont pas attachés
**Solution :**
- Vérifiez qu'il n'y a pas d'erreurs JavaScript
- Regardez s'il y a des erreurs dans la console

### ❌ **"Position calculée: null"**
**Cause :** Problème avec la fonction getPos
**Solution :**
- Le canvas pourrait être masqué ou mal dimensionné
- Vérifiez les styles CSS

### ❌ **Messages OK mais pas de dessin visible**
**Cause :** Problème de rendu
**Solution :**
- Vérifiez que le canvas est visible
- Vérifiez les styles CSS du canvas

## 🔧 **Solutions rapides**

### **Solution 1 : Rafraîchir la page**
- F5 ou Ctrl+R
- Réessayer de signer

### **Solution 2 : Vérifier le navigateur**
- Utilisez Chrome ou Firefox
- Évitez Internet Explorer

### **Solution 3 : Vérifier les styles**
Le canvas doit avoir ces styles :
```css
border: 4px solid #4fafc4;
border-radius: 10px;
cursor: crosshair;
background: white;
```

### **Solution 4 : Test sur mobile**
- Essayez sur un téléphone/tablette
- Utilisez votre doigt pour dessiner

## 📱 **Test sur mobile**

Si vous testez sur mobile :
1. Ouvrez le fichier HTML sur votre téléphone
2. Utilisez votre **doigt** pour dessiner
3. Les événements tactiles devraient fonctionner

## 🆘 **Si rien ne marche**

### **Copiez-collez ces informations :**

1. **Messages de la console** (copiez tout)
2. **Navigateur utilisé** (Chrome, Firefox, etc.)
3. **Appareil** (PC, Mac, mobile)
4. **Erreurs JavaScript** (s'il y en a)

### **Test alternatif :**

Essayez de créer un canvas simple pour tester :

```html
<canvas id="testCanvas" width="300" height="100" style="border: 1px solid black;"></canvas>
<script>
const canvas = document.getElementById('testCanvas');
const ctx = canvas.getContext('2d');
canvas.addEventListener('mousedown', function(e) {
  console.log('Test canvas fonctionne !');
  ctx.fillRect(10, 10, 50, 50);
});
</script>
```

## 📞 **Support**

Si le problème persiste, envoyez-moi :
1. Les messages de la console
2. Le navigateur utilisé
3. Une capture d'écran du canvas

**Email :** info@viviworks.fr
**Téléphone :** +33 7 84 78 99 10

---

**🎯 L'objectif : Voir les messages de debug dans la console pour identifier le problème exact !**
