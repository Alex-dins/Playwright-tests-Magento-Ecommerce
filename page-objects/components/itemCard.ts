import { type Locator, type Page } from "@playwright/test";

export class ItemCard {
  readonly page: Page;
  readonly itemPrice: Locator;
  readonly addToWishlistIcon: Locator;
  readonly productItemName: Locator;
  readonly removeButton: Locator;
  readonly addToCompareIcon: Locator;
  readonly reviewBlock: Locator;
  readonly itemImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemPrice = page.locator('[data-price-type="finalPrice"]');
    this.addToWishlistIcon = page.getByLabel("Add to Wish List");
    this.productItemName = page
      .locator(".products-grid")
      .locator(".product-item-name");
    this.removeButton = page.getByRole("link", { name: /Remove item/ });
    this.addToCompareIcon = page.getByLabel("Add to Compare");
    this.reviewBlock = page.locator(".product-reviews-summary");
    this.itemImage = page.locator(".product-image-photo");
  }
}
