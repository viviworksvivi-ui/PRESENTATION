const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
    console.log('🚀 Début de la génération du PDF...');
    
    try {
        // Lancer le navigateur
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Lire le fichier HTML
        const htmlPath = path.join(__dirname, 'offre-partenariat.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Définir le contenu HTML
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });
        
        // Configuration du PDF
        const pdfOptions = {
            path: 'offre-partenariat-viviworks.pdf',
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            },
            displayHeaderFooter: false,
            preferCSSPageSize: true
        };
        
        // Générer le PDF
        await page.pdf(pdfOptions);
        
        console.log('✅ PDF généré avec succès : offre-partenariat-viviworks.pdf');
        
        await browser.close();
        
    } catch (error) {
        console.error('❌ Erreur lors de la génération du PDF:', error);
        process.exit(1);
    }
}

// Fonction pour installer les dépendances si nécessaire
function checkDependencies() {
    const packageJsonPath = path.join(__dirname, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
        console.log('📦 Création du package.json...');
        const packageJson = {
            "name": "viviworks-pdf-generator",
            "version": "1.0.0",
            "description": "Générateur de PDF pour les offres Viviworks",
            "main": "generate-pdf.js",
            "scripts": {
                "generate": "node generate-pdf.js",
                "install-deps": "npm install puppeteer"
            },
            "dependencies": {
                "puppeteer": "^21.0.0"
            }
        };
        
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✅ package.json créé');
    }
    
    const nodeModulesPath = path.join(__dirname, 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
        console.log('📦 Installation des dépendances...');
        console.log('Exécutez : npm install');
        console.log('Puis : npm run generate');
        return false;
    }
    
    return true;
}

// Vérifier et exécuter
if (checkDependencies()) {
    generatePDF();
} else {
    console.log('\n📋 Instructions :');
    console.log('1. npm install');
    console.log('2. npm run generate');
} 