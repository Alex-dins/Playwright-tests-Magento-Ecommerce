import { type Locator, type Page } from "@playwright/test";
import { NavigationMenu } from "./components/navigationMenu";

export class MyWishlistPage extends NavigationMenu {
  readonly successMessage: Locator;
  readonly productItemName: Locator;
  readonly removeButton: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.successMessage = page.locator("[data-ui-id=message-success]");
    this.productItemName = page.locator(
      ".products-grid .product-item-info .product-item-name"
    );
    this.removeButton = page.getByRole("link", { name: /Remove item/ });
    this.emptyMessage = page.locator("#wishlist-view-form").locator(".empty");
  }

  async removeFromWishlist(productName: string): Promise<void> {
    await this.productItemName
      .getByText(productName)
      .hover()
      .then(async () => await this.removeButton.first().click());
  }
}
