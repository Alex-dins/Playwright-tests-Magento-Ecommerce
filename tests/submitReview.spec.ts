import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { MainPage } from "../page-objects/mainPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { WOMEN_CATEGORIES } from "../helper/categories";

test.describe("Submitting a review", () => {
  test.beforeEach(async ({ page }) => {
    //Login to app
    const loginPage = new LoginPage(page);
    await page.goto(EndpointMaps.LOGIN);
    await loginPage.login(process.env.USER_EMAIL!, process.env.PASSWORD!);
  });

  test("First time submitting review for product", async ({ page }) => {
    const mainPage = new MainPage(page);

    //Navigate to the main page
    await mainPage.isOnMainPage();

    //Choose product from women categiry
    await mainPage.chooseClothesCategory(
      "WOMEN",
      "TOPS",
      WOMEN_CATEGORIES.tops.hoodiesAndSweatshirts
    );

    await expect(mainPage.page).toHaveURL(
      EndpointMaps.WOMEN_HOODIES_AND_SWEATSHIRTS
    );

    //Find product without reviews
    await mainPage.chooseProductToReview("withoutReview");
  });
});
