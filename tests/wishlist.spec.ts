import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { MainPage } from "../page-objects/mainPage";
import { MyWishlistPage } from "../page-objects/myWishlistPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { MEN_CATEGORIES, WOMEN_CATEGORIES } from "../helper/categories";
import commons from "../test-data/commons.json";
import alerts from "../test-data/alerts.json";

test.describe("Testing My Wish List", () => {
  test.beforeEach(async ({ page }) => {
    //Login into app
    const loginPage = new LoginPage(page);
    await page.goto(EndpointMaps.LOGIN);
    await loginPage.login(process.env.USER_EMAIL!, process.env.PASSWORD!);
  });

  test("Add items to wish list and delete them", async ({ page }) => {
    const mainPage = new MainPage(page);
    const mywishlistPage = new MyWishlistPage(page);
    await mainPage.isOnMainPage();
    //Add item from women category by lower price
    await mainPage.chooseClothesCategory(
      "WOMEN",
      "TOPS",
      WOMEN_CATEGORIES.tops.jackets
    );

    await expect(mainPage.page).toHaveURL(EndpointMaps.WOMEN_JACKETS);
    await expect(mainPage.sideBarMenu.wishlistSideBlock).toContainText(
      commons.EMPTY_WISH_LIST
    );

    await mainPage.selectItemByPrice("low");

    await expect(mywishlistPage.page).toHaveURL(EndpointMaps.WISHLIST);
    const womenProductName =
      await mywishlistPage.itemCard.productItemName.innerText();
    await expect(mywishlistPage.successMessage).toHaveText(
      `${womenProductName} ${alerts.SUCCESSFULLY_ADDED_ITEM_TO_WISHLIST}`
    );
    await expect(mainPage.sideBarMenu.itemsInWishListBlock).toHaveCount(1);

    //Add item from men category by highest price
    await mainPage.chooseClothesCategory(
      "MEN",
      "BOTTOMS",
      MEN_CATEGORIES.bottoms.pants
    );
    await expect(mainPage.page).toHaveURL(EndpointMaps.MEN_PANTS);

    await mainPage.selectItemByPrice("high");

    await expect(mywishlistPage.page).toHaveURL(EndpointMaps.WISHLIST);
    const menProductName = await mywishlistPage.itemCard.productItemName
      .nth(1)
      .innerText();
    await expect(mywishlistPage.successMessage).toHaveText(
      `${menProductName} ${alerts.SUCCESSFULLY_ADDED_ITEM_TO_WISHLIST}`
    );
    await expect(mainPage.sideBarMenu.itemsInWishListBlock).toHaveCount(2);

    //Remove product items from wish list
    await mywishlistPage.removeFromWishlist(womenProductName);

    await expect(mywishlistPage.successMessage).toHaveText(
      `${womenProductName} ${alerts.SUCCESSFULLY_REMOVED_ITEM_FROM_WISHLIST}`
    );

    await mywishlistPage.removeFromWishlist(menProductName);

    await expect(mywishlistPage.successMessage).toHaveText(
      `${menProductName} ${alerts.SUCCESSFULLY_REMOVED_ITEM_FROM_WISHLIST}`
    );

    
    await expect(mywishlistPage.emptyMessage).toHaveText(alerts.EMPTY_WISHLIST);
  });
});
