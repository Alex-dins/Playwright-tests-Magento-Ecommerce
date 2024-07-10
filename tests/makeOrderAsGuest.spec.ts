import { test, expect, Page } from "@playwright/test";
import { MainPage } from "../page-objects/mainPage";
import { ProductDetailsPage } from "../page-objects/productDetailsPage";
import { CheckoutPage } from "../page-objects/checkoutPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { MEN_CATEGORIES, WOMEN_CATEGORIES } from "../helper/categories";
import alerts from "../test-data/alerts.json";
import sizeList from "../test-data/sizeList.json";
import colorList from "../test-data/colorList.json";


test.describe("Make an order as a guest", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EndpointMaps.MAIN_PAGE);
  });

  test("Place an order", async ({ page }) => {
    const mainPage = new MainPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const addToCard = mainPage.itemCard.addToCardButton;
    const productsToOrder = ["Maxima Drawstring Short"];

    //slect product from women category
    await mainPage.chooseClothesCategory("WOMEN", "BOTTOMS", WOMEN_CATEGORIES.bottoms.shorts);

    await expect(mainPage.page).toHaveURL(EndpointMaps.WOMEN_SHORTS);
    await expect.soft(mainPage.productItems).toHaveCount(12);

    //Select product by name
    await mainPage.chooseProductByName(productsToOrder[0], addToCard);

    await expect.soft(productDetailsPage.informMessage).toContainText(alerts.ADD_OPTIONS_FOR_ITEMS);

    //Select size
    await productDetailsPage.selectSize(sizeList[28]);

    //Select color
    await productDetailsPage.selectColor(colorList.ORANGE);

    //Select quantity
    await productDetailsPage.quantityInput.fill("2");

    //Add to Cart
    await productDetailsPage.addToCardButton.click();

    //Asserts message on the added item page
    await expect(mainPage.cartBadge).toHaveText("2");
  });
});
