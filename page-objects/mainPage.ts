import { type Locator, type Page } from "@playwright/test";
import { NavigationMenu } from "./navigationMenu";

export class MainPage extends NavigationMenu {
  readonly mainLogo: Locator;
  constructor(page: Page) {
    super(page);
    this.mainLogo = page.getByLabel("store logo");
  }

  async isOnMainPage() {
    await this.mainLogo.click();
  }

  async chooseCategory(category: string) {
    await this.womenItems.hover();
    await this.topCategory.hover();
    await this.page.locator(category).click();
  }
}
