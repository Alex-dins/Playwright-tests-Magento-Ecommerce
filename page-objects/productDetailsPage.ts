import { type Locator, type Page } from "@playwright/test";

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly addFirstReviewButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator("h1");
    this.addFirstReviewButton = page.getByRole("link", {
      name: "Be the first to review this product",
    });
  }
}
