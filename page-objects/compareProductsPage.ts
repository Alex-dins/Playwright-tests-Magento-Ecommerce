import { type Locator, type Page, expect } from "@playwright/test";

export class CompareProductsPage {
  readonly page: Page;
  readonly productsToCompare: Locator;
  readonly removeProductButton: Locator;
  readonly confirmPopupButton: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsToCompare = page.locator('[id="product-comparison"]');
    this.removeProductButton = page.locator("td").getByTitle("Remove Product");
    this.confirmPopupButton = page.getByRole("button", { name: "OK" });
    this.emptyMessage = page.locator(".empty").locator("div");
  }

  async visualComparisonOfScreenshots(): Promise<void> {
    const addedProducts = await this.productsToCompare;
    await expect(addedProducts).toHaveScreenshot("compare-product.png");
  }

  async removeAllProducts(): Promise<void> {
    while (true) {
      const removeButtons = await this.removeProductButton.all();
      // All products deleted
      if (removeButtons.length === 0) {
        break;
      }
      // Iterate from the end to avoid stale element references
      for (let i = removeButtons.length - 1; i >= 0; i--) {
        const rmBtn = removeButtons[i];
        await rmBtn.click();
        await this.confirmPopupButton.click();
      }
    }
  }
}
