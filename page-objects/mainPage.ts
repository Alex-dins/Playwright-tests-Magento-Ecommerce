import { type Locator, type Page } from "@playwright/test";
import { NavigationMenu } from "./navigationMenu";

export class MainPage extends NavigationMenu {
  readonly mainLogo: Locator;
  readonly wishlistSideBlock: Locator;
  readonly itemsInWishListBlock: Locator;
  readonly itemPrice: Locator;
  readonly addToWishlistIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.mainLogo = page.getByLabel("store logo");
    this.wishlistSideBlock = page.locator(".block-wishlist");
    this.itemPrice = page.locator(".price-box .price-final_price");
    this.addToWishlistIcon = page.getByLabel("Add to Wish List");
    this.itemsInWishListBlock = page
      .locator(".block-wishlist")
      .filter({ has: page.locator("ol li") });
  }

  async isOnMainPage(): Promise<void> {
    await this.mainLogo.click();
  }

  async chooseCategory(category: string): Promise<void> {
    await this.womenItems.hover();
    await this.topsCategory.hover();
    await this.page.locator(category).click();
  }

  async selectItemByLowerPrice(): Promise<void> {
    const allPricesText = await this.itemPrice.allInnerTexts();

    const prices = allPricesText.map((price) => parseInt(price.slice(11)));
    const lowestPrice = Math.min(...prices);
    const lowerPriceIdx = prices.indexOf(lowestPrice);

    const lowestItemPrice = this.itemPrice.nth(lowerPriceIdx);
    await lowestItemPrice
      .hover()
      .then(
        async () => await this.addToWishlistIcon.nth(lowerPriceIdx).click()
      );
  }
}
