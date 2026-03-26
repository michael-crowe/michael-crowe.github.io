import { chromium } from 'playwright';

async function runScraper() {

    // 1. Launch the browser (headless: false allows to see it happen)
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // 2. Go to the URL
    await page.goto('https://stfc.space/officers/229898163');

    // Extraction Logic

    const data = await page.evaluate(() => {

        // Collecting Data from rows of officers
        //Officer Image
        const officer_img = document.querySelector('.h-24').src;
        
        // Officer URL
        const officer_url = ''

        // Collecting Officer Data and Details

        //main block where offer detail data is stored 
        const article = document.querySelector('article.item-header-info');

        // The next pieces of data are all compoents within the arctile block
        const components = Array.from(article.querySelectorAll('component'));

        return {
            img: officer_img,
            faction: components[0]?.innerText.Trim() || "N/A",
            class: components[1]?.innerText.Trim() || "N/A",
            name: components[2]?.innerText.trim() || "N/A",
            group: components[3]?.innerText.Trim() || "N/A",

        };

    });


    // 3. Close when done
    // await browser.close()
}

runScraper();