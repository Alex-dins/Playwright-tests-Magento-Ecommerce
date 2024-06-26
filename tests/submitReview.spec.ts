import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { MainPage } from "../page-objects/mainPage";
import { ProductDetailsPage } from "../page-objects/productDetailsPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { MEN_CATEGORIES, WOMEN_CATEGORIES } from "../helper/categories";
import { handlingConsentModal } from "../helper/utils/functions";
import dataForReview from "../test-data/dataForReview.json";
import alers from "../test-data/alerts.json";
import errorLabels from "../test-data/errorLabels.json";

test.describe("Submitting a review", () => {
  let page: Page;

  test.beforeAll("Sign in", async ({ browser }) => {
    page = await browser.newPage();
    const loginPage = new LoginPage(page);
    await page.goto(EndpointMaps.LOGIN);
    await handlingConsentModal(page);
    await loginPage.login(process.env.USER_EMAIL!, process.env.PASSWORD!);
  });

  test.afterAll("Close browser", async () => {
    await page.close();
  });

  test("First time submitting review for product", async () => {
    const mainPage = new MainPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    //Navigate to the main page
    await mainPage.isOnMainPage();

    //Choose product from women category
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

    //After redirected to the product details page check if name is visible
    await expect(productDetailsPage.productName).toBeVisible();

    await productDetailsPage.page.waitForTimeout(2000);
    await productDetailsPage.addFirstReviewButton.click();

    await productDetailsPage.scrollIntoReviewForm();
    await productDetailsPage.submitReview(
      dataForReview.STARS[5],
      dataForReview.NICKNAME,
      dataForReview.SUMMARY,
      dataForReview.REVIEW
    );

    //Check if messages containt expected text
    await expect(productDetailsPage.successMessage).toContainText(
      alers.SUCCESSFULLY_SUBMITTED_REVIEW
    );
  });

  test("Submitting a review of a product that already has other reviews", async () => {
    const mainPage = new MainPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    //Choose product from men category
    await mainPage.chooseClothesCategory(
      "MEN",
      "TOPS",
      MEN_CATEGORIES.tops.tanks
    );

    await expect(mainPage.page).toHaveURL(EndpointMaps.MENS_TANKS);

    //Find product with reviews
    await mainPage.chooseProductToReview("withReview");

    //After redirected to the product details page check if name is visible
    await expect(productDetailsPage.productName).toBeVisible();

    await productDetailsPage.page.waitForTimeout(2000);
    await productDetailsPage.addYourReviewButton.click();

    await productDetailsPage.page.waitForTimeout(3000);
    const reviewCounts = await productDetailsPage.reviewList.count();
    await expect(reviewCounts).toBeGreaterThan(0);

    await productDetailsPage.scrollIntoReviewForm();

    await productDetailsPage.submitReview(
      dataForReview.STARS[4],
      dataForReview.NICKNAME,
      dataForReview.SUMMARY,
      dataForReview.REVIEW
    );

    //Check if messages containt expected text
    await expect(productDetailsPage.successMessage).toContainText(
      alers.SUCCESSFULLY_SUBMITTED_REVIEW
    );
  });

  test("Validation of review submission form", async () => {
    const mainPage = new MainPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    //Choose product from men category
    await mainPage.chooseClothesCategory(
      "MEN",
      "BOTTOMS",
      MEN_CATEGORIES.bottoms.shorts
    );

    await expect(mainPage.page).toHaveURL(EndpointMaps.MENS_SHORTS);

    //Find product without reviews
    await mainPage.chooseProductToReview("withoutReview");

    //After redirected to the product details page check if name is visible
    await expect(productDetailsPage.productName).toBeVisible();

    await productDetailsPage.page.waitForTimeout(2000);
    await productDetailsPage.addFirstReviewButton.click();
    await productDetailsPage.submitButton.click();

    //Assert error labels
    await expect(productDetailsPage.starsRatingErrorLabel).toHaveText(
      errorLabels.ERROR_LABEL_NO_STARTS_SELECTED
    );
    await expect(productDetailsPage.summaryErrorLabel).toHaveText(
      errorLabels.ERROR_LABEL_FIELD_REQUIRED
    );
    await expect(productDetailsPage.reviewErrorLabel).toHaveText(
      errorLabels.ERROR_LABEL_FIELD_REQUIRED
    );
  });
});
