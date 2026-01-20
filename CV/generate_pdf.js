const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Load the HTML file
    const filePath = 'file://' + path.resolve(__dirname, 'cv_redesign.html');
    await page.goto(filePath, { waitUntil: 'networkidle' });

    // Generate PDF
    await page.pdf({
        path: 'Alfonso_Nuevo.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
            top: '0mm',
            right: '0mm',
            bottom: '0mm',
            left: '0mm'
        }
    });

    await browser.close();
    console.log('PDF generado exitosamente: Alfonso_Nuevo.pdf');
})();
