import { type Locator, type Page } from "@playwright/test";

export class ItemCard {
  readonly page: Page;
  readonly itemContainer: Locator;
  readonly itemPrice: Locator;
  readonly addToWishlistIcon: Locator;
  readonly productItemName: Locator;
  readonly removeButton: Locator;
  readonly addToCompareIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemContainer = page.locator("[data-container='product-grid']");
    this.itemPrice = page.locator('[data-price-type="finalPrice"]');
    this.addToWishlistIcon = page.getByLabel("Add to Wish List");
    this.productItemName = page.locator(
      ".products-grid .product-item-info .product-item-name"
    );
    this.removeButton = page.getByRole("link", { name: /Remove item/ });
    this.addToCompareIcon = page.getByLabel("Add to Compare");
  }
}
