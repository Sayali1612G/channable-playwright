/**
 * File: pricingbrowser.spec.ts
 * Description: Scripted automation using Playwright to test the end to end signup flow from the Channable Pricing page.
 * Author: Sayali Gulhane
 * Created On: 2025-07-08
 * Last Updated: 2025-07-08
 *
 * Script Coverage:
 * - Navigates to the Channable Pricing page
 * - Accepts cookie consent (main page or inside iframe)
 * - Clicks the "Free trial" button and verifies redirect to /signup
 * - Fills out the signup form with randomized email and valid data
 * - Handles optional company input field
 * - Accepts Terms of Service
 * - Submits the signup form and checks for possible validation errors
 *
 * Usage:
 *   This is a standalone script, not a test file. Run using ts-node:
 *   `npx ts-node tests/pricingbrowser.spec.ts`
 *
 * Requirements:
 * - Node.js with `ts-node` installed
 * - Playwright installed via `npm i -D playwright`
 */

import { chromium } from 'playwright';
import type { Page } from 'playwright';

// Handles cookie consent on the main page
async function acceptCookieConsentRobust(page: Page) {
  const cookieBtn = page.locator('button:has-text("Allow all")');
  if (await cookieBtn.count() > 0) {
    try {
      await cookieBtn.first().click({ force: true });
      console.log('Cookie consent forcibly accepted on main page');
      return;
    } catch (e) {
      console.warn('Failed clicking cookie consent on main page:', e);
    }
  }
  for (const frame of page.frames()) {
    const btn = frame.locator('button:has-text("Allow all")');
    if (await btn.count() > 0) {
      try {
        await btn.first().click({ force: true });
        console.log('Cookie consent accepted inside iframe');
        return;
      } catch (e) {
        console.warn('Failed clicking cookie consent in iframe:', e);
      }
    }
  }
  console.log('Cookie consent button not found anywhere, proceeding...');
}

(async () => {
  // Launch browser in headed mode for visual testing
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Go to Channable pricing page
  console.log('Navigating to pricing page...');
  await page.goto('https://www.channable.com/pricing', { waitUntil: 'load' });

  // Accept cookie popup if present
  await acceptCookieConsentRobust(page);

  const freeTrialBtn = page.getByRole('link', { name: /Free trial/i });
  if (await freeTrialBtn.isVisible()) {
    await freeTrialBtn.click();
    console.log('Clicked on Free trial');
  } else {
    throw new Error('Free trial button not found');
  }
  // Wait for navigation to the signup page
  await page.waitForURL(/\/signup/, { timeout: 15000 });
  console.log(`Signup page loaded: ${page.url()}`);

  // Fill email field with a random value
  const randomNum = Math.floor(Math.random() * 10000000000);
  await page.fill('#signup > div > div:nth-child(1) > div > input', `john${randomNum}@example.com`);
  console.log('Filled email');

  // Fill first name
  await page.fill('#signup > div > div:nth-child(2) > div > input', 'John');
  console.log('Filled first name');

  // Fill last name
  await page.fill('#signup > div > div:nth-child(3) > div > input', 'Doe');
  console.log('Filled last name');

  // Fill optional company name (if visible)
  const companyInputSelector = '#signup > div > div:nth-child(5) > div > input';
  const companyInput = page.locator(companyInputSelector);
  if (await companyInput.isVisible()) {
    await companyInput.fill('My Company Inc');
    console.log('Filled company name');
  } else {
    console.warn('Company name input not found or not visible, skipping');
  }

  // Fill telephone number
  await page.fill('#signup > div > div:nth-child(7) > div > input', '+1234567890');
  console.log('Filled telephone');

  // Fill password
  const strongPassword = 'Channable!2025$Secure';
  await page.fill('input[type="password"]', strongPassword);
  console.log('Password filled with strong secure password');

  // Agree to terms and privacy policy
  const termsLabel = page.locator('text=I agree to the Terms of Service and the Privacy Policy');
  if (await termsLabel.isVisible()) {
    await termsLabel.click();
    console.log('Clicked terms label to agree');
  } else {
    console.error('Terms label not found or not visible');
  }

  // Click the "Sign up" button
  const submitBtn = page.locator('button', { hasText: /sign up/i });
  await submitBtn.waitFor({ state: 'visible', timeout: 10000 });
  await submitBtn.click();
  console.log('Clicked dynamic Sign up button and submitted the form');

  //Verify if company name input still exists (likely indicating validation error)
  try {
    await page.waitForSelector(companyInputSelector, { timeout: 5000, state: 'visible' });
    console.log('Company name field is still visible after submit — possibly validation failed');
  } catch {
    console.log('Company name field not visible after submit — possibly form succeeded or moved on');
  }
  // Short delay before closing
  await page.waitForTimeout(2000);
  await browser.close();
})();