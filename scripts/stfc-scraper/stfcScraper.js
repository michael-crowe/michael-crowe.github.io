import { chromium } from 'playwright';
const STFC_ROLES = ['Command', 'Science', 'Engineering'];

async function stfcScraper() {

    console.log('--- Beginning STFC Scrapper ---')
    console.log('--- Opening the browser...')
    // Launch the browser
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage(); 

    console.log('Navigating to STFC Space...');
    //Go the to target page
    await page.goto('https://stfc.space/officers', {
        waitUntil: 'networkidle'
    });

    try{
        console.log('');
        //Wait for the page and items to load (looking for list items)
        await page.waitForSelector('.stfc-table-result__row');

        // Give the images a second to load
        await page.waitForTimeout(1000);
    } catch(e) {
        console.log('Error: Could not find the officer rows...');
        return; //Stop here if the officer rows are not found
    }

    console.log('--- Extracting the data ---')
    //Extract Summary Data
    const officersSummary = await page.evaluate(() => {

        //look for all the rows
        const rows = Array.from(document.querySelectorAll('.stfc-table-result__row'));

        return rows.map(row => {

            //find the link tag inside this specific row
            const linkElement = row.querySelector('a[href^="/officers/"]');
            const relativeUrl = linkElement?.getAttribute('href');

            //find the officers image 

            const imgElement = row.querySelector('img');

            //find the officers rarity from this specific span
            // Grabbing the aria-label span as it's cleaner than just grabbing/looking for 'R'
            const raritySpan = row.querySelector('span[aria-label]');
            const rarity = raritySpan ? raritySpan.getAttribute('aria-label') : 'Unknown'; //look in rarity, if it's there grab the rarity if not set it 'unknown'

            return {
                id: relativeUrl ? relativeUrl.split('/').pop() : null, //grabs the id out of the URL
                url: relativeUrl ? `https://stfc.space${relativeUrl}` : null, //officers unique URL
                imgURL: imgElement?.src, 
                rarity: rarity
            };
        });
    });

    const fullOfficerData = [];

    for( const summary of officersSummary.slice(0, 5) ) {
        console.log(`Entering into: ${summary.id}...`);

        //navigate to the officers details page
        await page.goto(summary.url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `debug_${summary.id}`.png }) //take a screenshot to debug and see what the scraper sees
STFC_ROLES
        // Wait for a unique element on the detail page
        await page.waitForSelector('.item-header-container', { timeout: 5000});

        //Scrape and collect officer data
        const officerData = await page.evaluate((roles) => {

            const container = document.querySelector('.stfc-filter-box-col');

            if(!container) return null;

            //Grab all the 'component' tags inside the container
            const components = Array.from(container.querySelectorAll('component'));

            //Name This is always the H2
            const officer_name = container.querySelector('h2')?.innerText.trim(); //trim off any additional spaces or new lines from scraping

            //Role
            const role_element = components.find(c => roles.includes(c.innerText.trim()));
            const officer_role = role_element ? role_element.innerText.trim() : 'Unknown';

            //Faction
            const officer_faction = components[0]?.innerText.trim() || 'N/A';

            //Group
            const officer_group = components[3]?.innerText.trim() || 'N/A';

            //Captian Ability
            const abilityCOntainer = document.querySelectorAll('.flex.flex-col.max-w-sm')

            //Grab each div for each ability

            const captainData = Array.from(abilityCOntainer[0])
            
            return {
                captianAbility: {
                    name: captianSection?.querySelector('.h2')?.innerText.trim() || 'N/A',
                    icon: captianSection?.querySelector('.img')?.src || 'N/A', 
                    description: captianSection?.querySelector('..text-left.text-sm')?.innerText.trim() || 'N/A'
                }
            }



            //Officer Ability


            
            return{
                faction: officer_faction,
                role: officer_role,
                name: officer_name,
                group: officer_group
            };

        }, STFC_ROLES);

        //Merge the summary data with the officer data
        fullOfficerData.push({ ...summary, ...officerData });

        //Be a respectful scraper and wait a second before doing the next officer
        //so we are not spamming their servers!
        await page.waitForTimeout(2000);
    }

    console.log('--- Surface Data Collected ---');

    console.log('--- Final Officer Results ---');
    console.log(fullOfficerData);

}



stfcScraper();