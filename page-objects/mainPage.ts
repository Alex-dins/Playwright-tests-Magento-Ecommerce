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
    this.itemPrice = page.locator('[data-price-type="finalPrice"]');
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

  async selectItemByPrice(type: "low" | "high"): Promise<void> {
    const allPricesText = await this.itemPrice.allInnerTexts();
    const prices = allPricesText.map((price) =>
      parseInt(price.replace("$", ""))
    );
    let selectedIdx: number;
    if (type === "low") {
      const lowestPrice = Math.min(...prices);
      selectedIdx = prices.indexOf(lowestPrice);
    } else if (type === "high") {
      const highestPrice = Math.max(...prices);
      selectedIdx = prices.indexOf(highestPrice);
    } else {
      throw new Error('Invalid price type. Use "low" or "high".');
    }

    const selectedItemPrice = this.itemPrice.nth(selectedIdx);
    await selectedItemPrice
      .hover()
      .then(async () => await this.addToWishlistIcon.nth(selectedIdx).click());
  }
}
