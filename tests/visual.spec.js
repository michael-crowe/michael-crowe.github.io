import { test, expect } from '@playwright/test';

test('Glass card transparency check', async ({ page }) => {
  // 1. Go to your local site (make sure your dev server is running!)
  await page.goto('http://localhost:5173'); 

  // 2. Take a snapshot of the whole page
  // The first time you run this, it will fail and create the "Baseline" images
  await expect(page).toHaveScreenshot('portfolio-home.png', {
    fullPage: true,
  });
});