import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { MainPage } from "../page-objects/mainPage";
import { ProductDetailsPage } from "../page-objects/productDetailsPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { MEN_CATEGORIES, WOMEN_CATEGORIES } from "../helper/categories";
import { handlingConsentModal } from "../helper/utils/functions";

test.describe("Full user journey, place an order", () => {
  let page: Page;

  test.beforeAll("Sign in", async ({ browser }) => {
    page = await browser.newPage();
    const loginPage = new LoginPage(page);
    await page.goto(EndpointMaps.LOGIN);
    await handlingConsentModal(page);
    await loginPage.login(process.env.USER_EMAIL!, process.env.PASSWORD!);
  });

  //   test.afterAll("Close browser", async () => {
  //     await page.close();
  //   });

  test("Place an order", async () => {
    const mainPage = new MainPage(page);

    //Navigate to the main page
    await mainPage.isOnMainPage();

    //Add to busket first product from women category
    await mainPage.chooseClothesCategory(
      "WOMEN",
      "TOPS",
      WOMEN_CATEGORIES.tops.tanks
    );

    
  });
});
