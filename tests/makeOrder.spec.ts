import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { MainPage } from "../page-objects/mainPage";
import { ProductDetailsPage } from "../page-objects/productDetailsPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { MEN_CATEGORIES, WOMEN_CATEGORIES } from "../helper/categories";
import { handlingConsentModal } from "../helper/utils/functions";
import alerts from "../test-data/alerts.json";
import sizeList from "../test-data/sizeList.json";

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
    const productDetailsPage = new ProductDetailsPage(page);
    const addToCard = mainPage.itemCard.addToCardButton;

    //Navigate to the main page
    await mainPage.isOnMainPage();

    //Select first product from women category
    await mainPage.chooseClothesCategory(
      "WOMEN",
      "TOPS",
      WOMEN_CATEGORIES.tops.tanks
    );

    await expect(mainPage.page).toHaveURL(EndpointMaps.WOMEN_TANKS);

    //Shows more products on the page
    await mainPage.showMoreProductsOnPage("24");

    await expect(mainPage.productItems).toHaveCount(14);

    //Select item by higher price
    await mainPage.selectItemByPrice("high", addToCard);
    await page.waitForTimeout(2000);

    //Asserts message on the added item page
    await expect
      .soft(productDetailsPage.informMessage)
      .toContainText(alerts.ADD_OPTIONS_FOR_ITEMS);

    //Select size
    await productDetailsPage.selectSize(sizeList.L);
  });
});
