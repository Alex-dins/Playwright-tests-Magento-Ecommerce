import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { MainPage } from "../page-objects/mainPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { WOMEN_CATEGORIES } from "../helper/categories";

test.describe("Testing My Wish List", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(EndpointMaps.LOGIN);
    await loginPage.login(process.env.USER_EMAIL!, process.env.PASSWORD!);
  });

  test("Add items to wish list", async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.isOnMainPage();
    await mainPage.chooseCategory(WOMEN_CATEGORIES.tops.jackets);

    await expect(page).toHaveURL(EndpointMaps.WOMEN_JACKETS);
    await expect(mainPage.wishlistSideBlock).toContainText(
      "You have no items in your wish list."
    );

    await mainPage.selectItemByLowerPrice();

    await expect(page).toHaveURL(EndpointMaps.WISHLIST);
    await expect(mainPage.itemsInWishListBlock).toHaveCount(1);
  });
});
