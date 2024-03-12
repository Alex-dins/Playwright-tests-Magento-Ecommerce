import { type Locator, type Page } from "@playwright/test";
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
    this.setDescendingOrder = page.getByRole("link", {
      name: /Set Descending Direction/,
    });
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

  async selectItemByPrice(type: "low" | "high"): Promise<void> {
    await this.page.waitForTimeout(1000);
    const allPricesText = await this.itemCard.itemPrice.allInnerTexts();
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

    const selectedItemPrice = this.itemCard.itemPrice.nth(selectedIdx);
    await selectedItemPrice
      .hover()
      .then(
        async () =>
          await this.itemCard.addToWishlistIcon.nth(selectedIdx).click()
      );
  }

  async showMoreProductsOnPage(number: string): Promise<void> {
    await this.showOption.waitFor();
    await this.showOption.scrollIntoViewIfNeeded();
    await this.showOption.selectOption(number);
    await this.page.waitForLoadState("load");
  }

  async chooseBagsByName(name: string): Promise<void> {
    const allItems = await this.itemCard.productItemName.allInnerTexts();
    const selectedIdx = allItems.findIndex((el) => el === name);
    await this.itemCard.productItemName.getByText(name).hover();
    await this.itemCard.addToCompareIcon.nth(selectedIdx).click();
  }
}
