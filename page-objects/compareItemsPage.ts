import { type Locator, type Page } from "@playwright/test";

export class CompareItemPage {
  readonly page: Page;
  readonly itemsInSideblock: Locator;
  constructor(page: Page) {
    this.page = page;
    this.itemsInSideblock = page.locator('[id="compare-items"]');
  }
}
