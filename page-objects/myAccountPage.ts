import { type Locator, type Page } from "@playwright/test";

export class MyAccountPage {
  readonly page: Page;
  readonly contactInfoSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactInfoSection = page.locator(".box-information");
  }
}
