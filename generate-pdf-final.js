const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
    console.log('🚀 Génération du PDF corrigé...');
    
    try {
        // Lancer le navigateur
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Lire le fichier HTML
        const htmlPath = path.join(__dirname, 'offre-partenariat-finale.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Définir le contenu HTML
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });
        
        // Configuration du PDF
        const pdfOptions = {
            path: 'offre-partenariat-viviworks-corrigee.pdf',
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
        
        console.log('✅ PDF corrigé généré : offre-partenariat-viviworks-corrigee.pdf');
        console.log('📋 Corrections appliquées :');
        console.log('   - Caractères spéciaux corrigés (UTF-8)');
        console.log('   - Champs de contact vides pour écrire au stylo');
        console.log('   - Design professionnel Viviworks');
        console.log('   - Prix à 0€');
        console.log('   - Lignes de soulignement pour faciliter l\'écriture');
        
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
        console.log('Puis : node generate-pdf-final.js');
        return false;
    }
}

// Exécuter
if (checkDependencies()) {
    generatePDF();
} else {
    console.log('\n📋 Instructions :');
    console.log('1. npm install puppeteer');
    console.log('2. node generate-pdf-final.js');
    console.log('3. Ou ouvrir offre-partenariat-finale.html dans le navigateur et imprimer');
} 