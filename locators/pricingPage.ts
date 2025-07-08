
/**
 * File: pricingPage.ts
 * Description: Page Object Model for the Channable Pricing page.
 * Author: Sayali Gulhane
 * Created On: 2025-07-04
 * Last Updated: 2025-07-07

 * Usage:
 *   Import and instantiate this class in test files:
 */

import { Locator, Page } from '@playwright/test';

export class PricingPage {
  readonly page: Page;
  readonly freeTrialButton: Locator;
  readonly signUpButton: Locator;
  readonly pricingButtons: Locator;
  readonly choosePlanButtons: Locator;
  readonly acceptCookiesButton: Locator;
  readonly privacyPolicyLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.freeTrialButton = page.locator('a#btn-sign-up.khsSuO');
    this.signUpButton = page.getByRole('link', { name: 'Sign Up' });
    this.pricingButtons = page.locator('section.pricing__plans button, section.pricing__plans a');
    this.choosePlanButtons = page.locator('text="+ Choose plan"');
    this.acceptCookiesButton = page.locator('#CybotCookiebotDialogBodyLevelButtonAccept');
    this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy policy', exact: true });
  }
}

