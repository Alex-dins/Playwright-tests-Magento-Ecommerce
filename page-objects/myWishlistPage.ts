import { type Locator, type Page } from "@playwright/test";
import { NavigationMenu } from "./components/navigationMenu";
import { ItemCard } from "./components/itemCard";

export class MyWishlistPage {
  readonly page: Page;
  readonly itemCard: ItemCard;
  readonly navigationMenu: NavigationMenu;
  readonly successMessage: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemCard = new ItemCard(page);
    this.navigationMenu = new NavigationMenu(page);
    this.successMessage = page.locator("[data-ui-id=message-success]");
    this.emptyMessage = page.locator("#wishlist-view-form").locator(".empty");
  }

  async removeFromWishlist(productName: string): Promise<void> {
    await this.itemCard.productItemName
      .getByText(productName)
      .hover()
      .then(async () => await this.itemCard.removeButton.first().click());
  }
}
