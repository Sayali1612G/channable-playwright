
/**
 * File: pricingheadless.spec.ts
 * Description: Playwright tests for validating UI elements and functionality on the Channable Pricing page.
 * Author: Sayali Gulhane
 * Created On: 2025-07-04
 * Last Updated: 2025-07-07
 * 
 * Test Coverage:
 * - Page title validation
 * - Free Trial and Sign Up button visibility
 * - Pricing plan button clickability
 * - "+ Choose plan" button count and state
 * 
 * Usage:
 *   Run this file using the Playwright test runner:
 *   `npx playwright test tests/pricing.spec.ts`
 */

import { test, expect } from '@playwright/test';
import { PricingPage } from '../locators/pricingPage';

test.describe('Channable Pricing Page', () => {
  // 1 - Runs before each test: navigates to the pricing page
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing');
  });

  // 2 - Test: Check if the page title includes "Pricing | Channable"
  test('Page title contains "Pricing | Channable"', async ({ page }) => {
    await expect(page).toHaveTitle(/Pricing | Channable/);
  });

  // 3 - Test: Ensure the Free trial button is visible and has correct text
  test('should display the Free trial button on the Pricing page', async ({ page }) => {
    const pricingPage = new PricingPage(page);
    await expect(pricingPage.freeTrialButton).toBeVisible();
    await expect(pricingPage.freeTrialButton).toHaveText('Free trial');
  });
  
  // 4 - Test: Ensure the Sign Up button is visible and correctly labeled
  test('should display the Sign Up button on the Pricing page', async ({ page }) => {
    const pricingPage = new PricingPage(page);
    await expect(pricingPage.signUpButton).toBeVisible();
    await expect(pricingPage.signUpButton).toHaveText('Sign Up');
  });

  // 5 - Test: Validate that all pricing plan buttons are enabled (clickable)
  test('All pricing plan buttons are clickable', async ({ page }) => {
    const pricingPage = new PricingPage(page);
    const count = await pricingPage.pricingButtons.count();
    for (let i = 0; i < count; i++) {
      await expect(pricingPage.pricingButtons.nth(i)).toBeEnabled();
    }
  });

  // 6 - Test: Count and verify the "+ Choose plan" buttons are visible and enabled
  test('Count "+ Choose plan" buttons on the pricing page', async ({ page }) => {
    const pricingPage = new PricingPage(page);
    const buttonCount = await pricingPage.choosePlanButtons.count();
    console.log(`Choose plan button count is ${buttonCount}`);
    expect(buttonCount).toEqual(2); // Change this value if the number changes
    for (let i = 0; i < buttonCount; i++) {
      const isEnabled = await pricingPage.choosePlanButtons.nth(i).isEnabled();
      console.log(`Button ${i + 1} is ${isEnabled ? 'enabled' : 'disabled'}`);
      expect(isEnabled).toBe(true);
    }
    const paragraph = page.locator('p', { hasText: 'Core Plus' });
  });
});

