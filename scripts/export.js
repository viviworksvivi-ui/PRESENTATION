const fs = require('fs');
const path = require('path');

// Créer le dossier out
const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Copier le dossier .next
const nextDir = path.join(process.cwd(), '.next');
const outNextDir = path.join(outDir, '.next');
if (fs.existsSync(nextDir)) {
  fs.cpSync(nextDir, outNextDir, { recursive: true });
}

// Copier le dossier public
const publicDir = path.join(process.cwd(), 'public');
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, outDir, { recursive: true });
}

// Créer un fichier index.html simple
const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Viviworks Presentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .container {
            max-width: 600px;
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #fff, #f0f0f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
        }
        .logo {
            width: 80px;
            height: 80px;
            margin-bottom: 20px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">V</div>
        <h1>Viviworks Presentation</h1>
        <p>Application de présentation moderne optimisée pour mobile et desktop</p>
        <a href="/app" class="btn">Accéder à l'application</a>
    </div>
    
    <script>
        // Redirection automatique après 3 secondes
        setTimeout(() => {
            window.location.href = '/app';
        }, 3000);
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml);

// Créer un fichier _redirects pour Netlify
const redirects = `# Redirects for Next.js app
/app/* /app/index.html 200
/* /index.html 200`;

fs.writeFileSync(path.join(outDir, '_redirects'), redirects);

// Créer un fichier _headers pour la sécurité
const headers = `/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable`;

fs.writeFileSync(path.join(outDir, '_headers'), headers);

console.log('✅ Export terminé ! Le dossier "out" est prêt pour le déploiement.'); 