import { type Locator, type Page } from "@playwright/test";
import { numberConverter } from "../helper/utils/functions";
import { NavigationMenu } from "./components/navigationMenu";
import { SideBarMenu } from "./components/sideBarMenu";
import { ItemCard } from "./components/itemCard";

export class MainPage {
  readonly page: Page;
  readonly sideBarMenu: SideBarMenu;
  readonly navigationMenu: NavigationMenu;
  readonly itemCard: ItemCard;
  readonly mainLogo: Locator;
  readonly showOption: Locator;
  readonly sortOption: Locator;
  readonly productItems: Locator;
  readonly successMessage: Locator;
  readonly setDescendingOrder: Locator;
  readonly productItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sideBarMenu = new SideBarMenu(page);
    this.navigationMenu = new NavigationMenu(page);
    this.itemCard = new ItemCard(page);
    this.mainLogo = page.getByLabel("store logo");
    this.showOption = page.locator('[data-role="limiter"]').nth(1);
    this.sortOption = page.getByLabel("Sort By");
    this.productItems = page.locator(".products-grid").locator("ol li");
    this.successMessage = page.locator("[data-ui-id=message-success]");
    this.setDescendingOrder = page.locator(".sorter-action").first();
    this.productItem = page.locator(".product-item");
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
      ? await this.navigationMenu.womenItems.hover()
      : await this.navigationMenu.menItems.hover();

    type === "TOPS"
      ? await this.navigationMenu.topsCategory
          .hover()
          .then(async () => await this.page.locator(subcategory).click())
      : await this.navigationMenu.bottomsCategory
          .hover()
          .then(async () => await this.page.locator(subcategory).click());
  }

  async chooseGearCategory(subcategory: string): Promise<void> {
    await this.navigationMenu.gearItems
      .hover()
      .then(async () => await this.page.locator(subcategory).click());
  }

  async selectItemByPrice(type: "low" | "high", addTo: Locator): Promise<void> {
    await this.page.waitForTimeout(1000);
    const allPricesText = await this.itemCard.itemPrice.allInnerTexts();
    const prices = allPricesText.map((price) => numberConverter(price));
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

    const selectedItemPrice = this.itemCard.itemPrice.nth(selectedIdx);
    await selectedItemPrice.hover().then(
      async () => {
        if (addTo === this.itemCard.addToCompareIcon) {
          await this.itemCard.addToCompareIcon.nth(selectedIdx).click();
        } else if (addTo === this.itemCard.addToWishlistIcon) {
          await this.itemCard.addToWishlistIcon.nth(selectedIdx).click();
        } else {
          await this.itemCard.addToCardButton.nth(selectedIdx).click();
        }
      }
      // await this.itemCard.addToWishlistIcon.nth(selectedIdx).click()
    );
  }

  async showMoreProductsOnPage(number: string): Promise<void> {
    await this.showOption.waitFor();
    await this.showOption.scrollIntoViewIfNeeded();
    await this.showOption.selectOption(number);
    await this.page.waitForLoadState("load");
  }

  async chooseBagsByName(name: string, addTo: Locator): Promise<void> {
    const allItems = await this.itemCard.productItemName.allInnerTexts();
    const selectedIdx = allItems.findIndex((el) => el === name);
    await this.itemCard.productItemName.getByText(name).hover();
    if (addTo === this.itemCard.addToCompareIcon) {
      await this.itemCard.addToCompareIcon.nth(selectedIdx).click();
    } else if (addTo === this.itemCard.addToWishlistIcon) {
      await this.itemCard.addToWishlistIcon.nth(selectedIdx).click();
    }
  }

  async chooseProductToReview(
    type: "withReview" | "withoutReview"
  ): Promise<void> {
    const allProducts = await this.productItem.all();

    for (const item of allProducts) {
      const hasReviewBlock =
        (await item.locator(this.itemCard.reviewBlock).count()) > 0;

      if (hasReviewBlock && type === "withReview") {
        await item.locator(this.itemCard.itemImage).click();
        break;
      } else if (!hasReviewBlock && type === "withoutReview") {
        await item.locator(this.itemCard.itemImage).click();
        break;
      }
    }
  }
}
