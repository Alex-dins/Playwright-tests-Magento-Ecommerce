import { type Locator, type Page } from "@playwright/test";

export class ItemCard {
  readonly page: Page;
  readonly itemPrice: Locator;
  readonly addToWishlistIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemPrice = page.locator('[data-price-type="finalPrice"]');
    this.addToWishlistIcon = page.getByLabel("Add to Wish List");
  }
}
