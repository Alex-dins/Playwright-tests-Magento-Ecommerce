import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { MainPage } from "../page-objects/mainPage";
import { CompareProductsPage } from "../page-objects/compareProductsPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { GEARS } from "../helper/categories";
import commons from "../test-data/commons.json";
import alerts from "../test-data/alerts.json";

test.describe("Testing compare items", () => {
  test.beforeEach(async ({ page }) => {
    //Login to app
    const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page);
    await page.goto(EndpointMaps.LOGIN);
    await mainPage.handlingConsentModal();
    await loginPage.login(process.env.USER_EMAIL!, process.env.PASSWORD!);
  });

  test("Add items to campare and delete them", async ({ page }) => {
    const mainPage = new MainPage(page);
    const compareProductsPage = new CompareProductsPage(page);
    const addToCompareButton = mainPage.itemCard.addToCompareIcon;
    const bagsToCompare = [
      "Fusion Backpack",
      "Compete Track Tote",
      "Impulse Duffle",
    ];

    //Navigate to the main page
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
    await mainPage.chooseBagsByName(bagsToCompare[0], addToCompareButton);

    await expect(mainPage.successMessage).toContainText(
      alerts.SUCCESSFULLY_ADDED_ITEM_TO_COMPARELIST
    );
    await expect
      .soft(mainPage.sideBarMenu.itemsInCompareProductBlock)
      .toHaveCount(1);
    //Change sort option on the page
    await mainPage.sortOption.selectOption("Product Name");
    await expect(mainPage.itemCard.productItemName.first()).toContainText(
      bagsToCompare[1]
    );
    //Choose second product
    await mainPage.chooseBagsByName(bagsToCompare[1], addToCompareButton);
    await page.waitForLoadState("load");

    await expect(mainPage.successMessage).toContainText(
      alerts.SUCCESSFULLY_ADDED_ITEM_TO_COMPARELIST
    );
    await expect(mainPage.sideBarMenu.itemsInCompareProductBlock).toHaveCount(
      2
    );

    //Change sort option on the page by price and descending order
    await mainPage.sortOption.selectOption("Price");
    await mainPage.page.waitForTimeout(3000);
    await mainPage.setDescendingOrder.click();

    await expect(mainPage.itemCard.productItemName.first()).toContainText(
      bagsToCompare[2]
    );
    //Choose third product
    await mainPage.chooseBagsByName(bagsToCompare[2], addToCompareButton);

    await expect(mainPage.successMessage).toContainText(
      alerts.SUCCESSFULLY_ADDED_ITEM_TO_COMPARELIST
    );
    await expect(mainPage.sideBarMenu.itemsInCompareProductBlock).toHaveCount(
      3
    );

    //Navigate to the compare page
    await mainPage.sideBarMenu.compareButton.click();
    await expect(compareProductsPage.page).toHaveURL(EndpointMaps.COMPARE);

    //Check if all products are added and verify with a snapshot
    await compareProductsPage.visualComparisonOfScreenshots();

    //Delete all products from compare list
    await compareProductsPage.removeAllProducts();

    //Check if messages containt expected text
    await expect(compareProductsPage.successMessage).toContainText(
      alerts.SUCCESSFULLY_REMOVED_ITEM_FROM_COMPARELIST
    );
    await expect(compareProductsPage.emptyMessage).toContainText(
      commons.EMPTY_COMPARE_LIST
    );
  });
});
