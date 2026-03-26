import 'dotenv/config';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = '../../public/apps/stfc-officer-tracker/js/data.js';
const IMAGE_DIR = '../../public/apps/stfc-officer-tracker/assets/officers';
const MYEMAIL = process.env.MY_EMAIL;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function scrape() {
    console.log("--- STFC Scraper: High-Precision Build (Bugfix 1.7) ---");
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: `Mozilla/5.0 (Ubuntu; Linux x86_64) Portfolio-Scraper/1.7 (Contact: ${MYEMAIL})`
    });
    const page = await context.newPage(); 

    try {
        console.log("\nStep 1: Harvesting links from Page 1...");
        await page.goto('https://stfc.space/officers', { waitUntil: 'networkidle' });
        
        let links = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('a[href^="/officers/"]'));
            // Filter out the main directory link and clean the strings
            return anchors
                .map(a => a.href.trim())
                .filter(href => href !== 'https://stfc.space/officers' && href !== 'https://stfc.space/officers/');
        });

        const finalData = [];
        const fullImageDir = path.resolve(__dirname, IMAGE_DIR);
        if (!fs.existsSync(fullImageDir)) fs.mkdirSync(fullImageDir, { recursive: true });

        // --- TEST MODE TOGGLE ---
        // Sanitizing the URL to ensure no trailing colons or whitespace break the request
        const rawUrl = links[0].replace(/:$/, '').trim(); 
        const linksToProcess = [rawUrl]; 
        // ------------------------

        console.log(`Step 2: Processing ${linksToProcess.length} officer(s)...`);

        for (const url of linksToProcess) {
            try {
                console.log(`Navigating to: ${url}`);
                await page.goto(url, { waitUntil: 'networkidle' });
                
                const officer = await page.evaluate(() => {
                    const wrapper = document.querySelector('.item-detail-wrapper');
                    if (!wrapper) return null;

                    const article = wrapper.querySelector('article.item-header-info');
                    const components = Array.from(article?.querySelectorAll('component') || []);
                    const mainImg = wrapper.querySelector('.item-header img')?.src;

                    const parseTable = (titleText) => {
                        const headerDiv = Array.from(document.querySelectorAll('div.font-bold'))
                                               .find(d => d.innerText.includes(titleText));
                        const data = {};
                        if (headerDiv) {
                            const table = headerDiv.parentElement.querySelector('table');
                            table?.querySelectorAll('tbody tr').forEach(row => {
                                const cells = row.querySelectorAll('td');
                                if (cells.length >= 2) {
                                    data[cells[0].innerText.trim()] = cells[1].innerText.trim();
                                }
                            });
                        }
                        return data;
                    };

                    const getAbilityData = (id) => {
                        const anchor = document.getElementById(id);
                        if (!anchor) return { name: "N/A", icon: "", description: "N/A" };
                        const container = anchor.closest('.item-container-row').nextElementSibling;
                        const detailComp = container?.querySelector('component.text-left.text-sm');
                        return {
                            name: detailComp?.querySelector('b')?.innerText.trim() || 
                                  container?.querySelector('h2')?.innerText.trim() || "N/A",
                            icon: container?.querySelector('img')?.src || "",
                            description: detailComp?.innerText.trim() || "N/A"
                        };
                    };

                    return {
                        id: window.location.pathname.split('/').pop(),
                        name: article?.querySelector('h2')?.innerText.trim() || "Unknown",
                        img: mainImg,
                        faction: components[0]?.innerText.trim() || "N/A",
                        class: components[1]?.innerText.trim() || "N/A",
                        group: components[2]?.innerText.trim() || "N/A",
                        rarity: Array.from(wrapper.classList).find(c => c.startsWith('rarity-'))?.replace('rarity-', '') || 'common',
                        captainAbility: {
                            ...getAbilityData('captain-ability'),
                            synergyBonus: parseTable('Synergy Bonus')
                        },
                        officerAbility: {
                            ...getAbilityData('officer-ability'),
                            rankBonus: parseTable('Rank Bonus')
                        }
                    };
                });

                if (officer && officer.img) {
                    const safeFileName = `${officer.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${officer.id}.png`;
                    const imgResponse = await page.request.get(officer.img);
                    const buffer = await imgResponse.body();
                    fs.writeFileSync(path.resolve(fullImageDir, safeFileName), buffer);

                    finalData.push({ ...officer, image: `./assets/officers/${safeFileName}` });
                    console.log(`[✓] Successfully Scraped: ${officer.name}`);
                }
            } catch (err) { 
                console.error(`[!] Error: ${err.message}`); 
            }
            await sleep(1000); 
        }

        const outputContent = `export const officers = ${JSON.stringify(finalData, null, 4)};`;
        fs.writeFileSync(path.resolve(__dirname, OUTPUT_FILE), outputContent);
        console.log(`\nSuccess! Data saved to ${OUTPUT_FILE}`);

    } finally { 
        await browser.close(); 
    }
}

scrape();