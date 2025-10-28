const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDFChampsVides() {
    console.log('🚀 Génération du PDF avec champs vides...');
    
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor'
            ]
        });
        
        const page = await browser.newPage();
        
        // Définir l'encodage UTF-8
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        });
        
        // Lire le fichier HTML avec champs vides
        const htmlPath = path.join(__dirname, 'offre-partenariat-champs-vides.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Définir le contenu HTML avec encodage explicite
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });
        
        // Configuration du PDF
        const pdfOptions = {
            path: 'offre-partenariat-champs-vides.pdf',
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            },
            displayHeaderFooter: false,
            preferCSSPageSize: true,
            omitBackground: false,
            scale: 1.0
        };
        
        // Générer le PDF
        await page.pdf(pdfOptions);
        
        console.log('✅ PDF généré avec champs vides : offre-partenariat-champs-vides.pdf');
        console.log('📋 Caractéristiques :');
        console.log('   - Tous les champs de contact VIVIWORKS vides');
        console.log('   - Tous les champs de contact CLIENT vides');
        console.log('   - Lignes pour écrire à la main');
        console.log('   - Pas de "À compléter"');
        console.log('   - Encodage UTF-8 correct');
        
        await browser.close();
        
    } catch (error) {
        console.error('❌ Erreur lors de la génération :', error);
        process.exit(1);
    }
}

// Vérifier si Puppeteer est installé
function checkDependencies() {
    try {
        require('puppeteer');
        return true;
    } catch (error) {
        console.log('📦 Puppeteer non installé. Installation...');
        console.log('Exécutez : npm install puppeteer');
        console.log('Puis : node generate-pdf-champs-vides.js');
        return false;
    }
}

// Exécuter
if (checkDependencies()) {
    generatePDFChampsVides();
} else {
    console.log('\n📋 Instructions :');
    console.log('1. npm install puppeteer');
    console.log('2. node generate-pdf-champs-vides.js');
    console.log('3. Ou ouvrir offre-partenariat-champs-vides.html dans le navigateur et imprimer');
} 