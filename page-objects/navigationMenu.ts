import { type Locator, type Page } from "@playwright/test";
import { CompareItemPage } from "./compareItemsPage";

export class NavigationMenu {
  readonly compareItemPage: CompareItemPage;
  readonly page: Page;
  readonly newItems: Locator;
  readonly womenItems: Locator;
  readonly menItems: Locator;
  readonly gearItems: Locator;
  readonly trainingItems: Locator;
  readonly saleItems: Locator;
  readonly topsCategory: Locator;
  readonly bottomsCategory: Locator;

  constructor(page: Page) {
    this.page = page;
    this.compareItemPage = new CompareItemPage(page);
    this.newItems = page.getByRole("menuitem", { name: /What's New/ });
    this.womenItems = page.getByRole("menuitem", { name: /Women/ });
    this.menItems = page.getByRole("menuitem", { name: /Men/ });
    this.gearItems = page.getByRole("menuitem", { name: /Gear/ });
    this.trainingItems = page.getByRole("menuitem", { name: /Training/ });
    this.saleItems = page.getByRole("menuitem", { name: /Sale/ });
    this.topsCategory = page.getByRole("menuitem", { name: /Tops/ });
    this.bottomsCategory = page.getByRole("menuitem", { name: /Bottoms/ });
  }
}
