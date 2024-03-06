import { type Locator, type Page } from "@playwright/test";

export class SideBarMenu {
  readonly page: Page;
  readonly wishlistSideBlock: Locator;
  readonly itemsInWishListBlock: Locator;
  readonly compareProductsBlock: Locator;
  readonly itemsInCompareProductBlock: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wishlistSideBlock = page.locator(".block-wishlist");
    this.itemsInWishListBlock = this.wishlistSideBlock.locator("ol li");
    this.compareProductsBlock = page.locator(".block block-compare");
    this.itemsInCompareProductBlock =
      this.compareProductsBlock.locator("ol li");
  }
}
