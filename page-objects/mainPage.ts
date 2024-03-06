import { type Locator, type Page } from "@playwright/test";
import { NavigationMenu } from "./navigationMenu";

export class MainPage extends NavigationMenu {
  readonly mainLogo: Locator;
  readonly wishlistSideBlock: Locator;
  readonly compareProductsSideBlock: Locator;
  readonly itemsInWishListBlock: Locator;
  readonly itemPrice: Locator;
  readonly addToWishlistIcon: Locator;
  readonly numberItemsOnPage: Locator;

  constructor(page: Page) {
    super(page);
    this.mainLogo = page.getByLabel("store logo");
    this.wishlistSideBlock = page.locator(".block-wishlist");
    this.itemPrice = page.locator('[data-price-type="finalPrice"]');
    this.addToWishlistIcon = page.getByLabel("Add to Wish List");
    this.itemsInWishListBlock = page.locator(".block-wishlist ol li");
    this.numberItemsOnPage = page.locator("#limiter").nth(1);
  }

  async isOnMainPage(): Promise<void> {
    await this.mainLogo.click();
  }

  async chooseClothesCategory(
    category: "MEN" | "WOMEN",
    type: "TOPS" | "BOTTOMS",
    subcategory: string
  ): Promise<void> {
    category === "WOMEN"
      ? await this.womenItems.hover()
      : await this.menItems.hover();

    type === "TOPS"
      ? await this.topsCategory
          .hover()
          .then(async () => await this.page.locator(subcategory).click())
      : await this.bottomsCategory
          .hover()
          .then(async () => await this.page.locator(subcategory).click());
  }

  async chooseGearCategory(subcategory: string): Promise<void> {
    await this.gearItems
      .hover()
      .then(async () => await this.page.locator(subcategory).click());
  }

  async selectItemByPrice(type: "low" | "high"): Promise<void> {
    await this.page.waitForTimeout(1000);
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
