const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDFWithUTF8() {
    console.log('🚀 Génération du PDF avec encodage UTF-8...');
    
    try {
        // Lancer le navigateur avec des options pour l'encodage
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
        
        // Lire le fichier HTML
        const htmlPath = path.join(__dirname, 'offre-partenariat-completement-vide.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Définir le contenu HTML avec encodage explicite
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });
        
        // Configuration du PDF avec support UTF-8
        const pdfOptions = {
            path: 'offre-partenariat-utf8.pdf',
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
            // Options pour l'encodage
            omitBackground: false,
            scale: 1.0
        };
        
        // Générer le PDF
        await page.pdf(pdfOptions);
        
        console.log('✅ PDF généré avec encodage UTF-8 : offre-partenariat-utf8.pdf');
        console.log('📋 Caractères spéciaux corrigés :');
        console.log('   - Accents français (é, è, à, ç)');
        console.log('   - Symboles euro (€)');
        console.log('   - Guillemets français (« »)');
        console.log('   - Encodage UTF-8 explicite');
        
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
        console.log('Puis : node generate-pdf-utf8.js');
        return false;
    }
}

// Exécuter
if (checkDependencies()) {
    generatePDFWithUTF8();
} else {
    console.log('\n📋 Instructions :');
    console.log('1. npm install puppeteer');
    console.log('2. node generate-pdf-utf8.js');
    console.log('3. Ou ouvrir offre-partenariat-completement-vide.html dans le navigateur et imprimer');
} 