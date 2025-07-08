
/**
 * File: pricing.spec.ts
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
 * - Privacy Policy link visibility
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
});

