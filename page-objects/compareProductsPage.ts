import { type Locator, type Page, expect } from "@playwright/test";

export class CompareItemPage {
  readonly page: Page;
  readonly productsToCompare: Locator;
  readonly removeProductButton: Locator;
  readonly confirmPopupButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsToCompare = page.locator('[id="product-comparison"]');
    this.removeProductButton = page.getByRole("link", {
      name: /Remove Product/,
    });
    this.confirmPopupButton = page.getByRole("button", { name: "OK" });
  }

  async visualComparisonOfScreenshots(): Promise<void> {
    const compareScreenshot = await this.productsToCompare.screenshot({
      path: "screenshots/compare-product.png",
    });
    await this.page.waitForLoadState("load");
    await expect(compareScreenshot).toMatchSnapshot();
  }

  async removeAllProducts(): Promise<void> {
    const removeButton = this.removeProductButton.all();
    for (const rmBtn of await removeButton) {
      await rmBtn.waitFor();
      await rmBtn.first().click();
      await this.confirmPopupButton.click();
    }
  }
}
