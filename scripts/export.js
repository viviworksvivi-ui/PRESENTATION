const fs = require('fs');
const path = require('path');

console.log('🚀 Début de l\'export...');

// Le dossier out est déjà créé par Next.js avec l'export statique
const outDir = path.join(process.cwd(), 'out');

if (!fs.existsSync(outDir)) {
  console.error('❌ Le dossier out n\'existe pas. Exécutez d\'abord "next build"');
  process.exit(1);
        }

console.log('📁 Dossier out trouvé');

// Créer un fichier _redirects pour Netlify
const redirects = `# Redirects for Next.js app
/app /app/index.html 200
/app/* /app/index.html 200
/* /index.html 200`;

fs.writeFileSync(path.join(outDir, '_redirects'), redirects);
console.log('📄 Fichier _redirects créé');

// Créer un fichier _headers pour la sécurité
const headers = `/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable`;

fs.writeFileSync(path.join(outDir, '_headers'), headers);
console.log('📄 Fichier _headers créé');

console.log('✅ Export terminé ! Le dossier "out" est prêt pour le déploiement.'); 
console.log('📁 Contenu du dossier out:');
console.log(fs.readdirSync(outDir).join(', ')); 