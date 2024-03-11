import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { MainPage } from "../page-objects/mainPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { GEARS } from "../helper/categories";
import commons from "../test-data/commons.json";
import alerts from "../test-data/alerts.json";

test.describe("Testing compare items", () => {
  test.beforeEach(async ({ page }) => {
    //Login into app
    const loginPage = new LoginPage(page);
    await page.goto(EndpointMaps.LOGIN);
    await loginPage.login(process.env.USER_EMAIL!, process.env.PASSWORD!);
  });

  test("Add items to campare and delete them", async ({ page }) => {
    const mainPage = new MainPage(page);
    const bagsToCompare = ["Fusion Backpack", "Compete Track Tote"];
    await mainPage.isOnMainPage();
    //Select bags products
    await mainPage.chooseGearCategory(GEARS.bags);
    await expect(mainPage.sideBarMenu.compareProductsBlock).toContainText(
      commons.EMPTY_COMPARE_LIST
    );

    //Show more products on the page
    await mainPage.showMoreProductsOnPage("24");
    await expect(mainPage.productItems).toHaveCount(14);

    //Choose first product
    await mainPage.chooseBagsByName(bagsToCompare[0]);

    await expect(mainPage.successMessage).toContainText(
      alerts.SUCCESSFULLY_ADDED_ITEM_TO_COMPARELIST
    );
    await expect(mainPage.sideBarMenu.itemsInCompareProductBlock).toHaveCount(
      1
    );

    await mainPage.sortOption.selectOption("Product Name");
    await expect(mainPage.itemCard.productItemName.first()).toContainText(
      bagsToCompare[1]
    );
    //Choose second product
    await mainPage.chooseBagsByName(bagsToCompare[1]);

    await expect(mainPage.sideBarMenu.itemsInCompareProductBlock).toHaveCount(
      2
    );
  });
});
