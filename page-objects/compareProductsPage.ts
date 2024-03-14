import { type Locator, type Page, expect } from "@playwright/test";

export class CompareItemPage {
  readonly page: Page;
  readonly productsToCompare: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsToCompare = page.locator('[id="product-comparison"]');
  }

  async visualComparisonOfScreenshots(): Promise<void> {
    const compareScreenshot = await this.productsToCompare.screenshot({
      path: "screenshots/compare-product.png",
    });
    await this.page.waitForLoadState("load");
    await expect(compareScreenshot).toMatchSnapshot({
      name: "compare-product.png",
    });
  }
}
