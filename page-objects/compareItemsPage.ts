import { type Locator, type Page } from "@playwright/test";

export class CompareItemPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}