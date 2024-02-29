import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { MainPage } from "../page-objects/mainPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { WOMEN_CATEGORIES } from "../helper/categories";
import commons from "../test-data/commons.json";

test.describe("Testing My Wish List", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(EndpointMaps.LOGIN);
    await loginPage.login(process.env.USER_EMAIL!, process.env.PASSWORD!);
  });

  test("Add items to wish list", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.isOnMainPage();
    //Add item from women category
    await mainPage.chooseCategory(WOMEN_CATEGORIES.tops.jackets);

    await expect(page).toHaveURL(EndpointMaps.WOMEN_JACKETS);
    await expect(mainPage.wishlistSideBlock).toContainText(
      commons.EMPTY_WISH_LIST
    );

    await mainPage.selectItemByPrice("low");

    await expect(page).toHaveURL(EndpointMaps.WISHLIST);
    await expect(mainPage.itemsInWishListBlock).toHaveCount(1);

    //Add item from men category
    
  });
});
