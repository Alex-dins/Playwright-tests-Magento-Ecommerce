import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { MyAccountPage } from "../page-objects/myAccountPage";
import { generateFakeUser } from "../helper/fakeUser";
import { handlingConsentModal } from "../helper/utils/functions";
import errorLabels from "../test-data/errorLabels.json";

test.describe("Testing Sign In", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EndpointMaps.LOGIN);
    await handlingConsentModal(page);
  });

  test("Successfully", async ({ page }) => {
    //Logging in
    const loginPage = new LoginPage(page);
    const myAccountPage = new MyAccountPage(page);
    await loginPage.login(process.env.USER_EMAIL!, process.env.PASSWORD!);
    //Check if you are logged in and on your account page
    await expect(page).toHaveURL(EndpointMaps.USER_ACCOUNT);
    await expect(myAccountPage.contactInfoSection).toContainText(
      process.env.USER_EMAIL!
    );
  });

  test("Empty fields", async ({ page }) => {
    //Logging in
    const loginPage = new LoginPage(page);
    await loginPage.login(" ", " ");

    //Check error empty fields
    await expect(loginPage.emailErrorLabel).toContainText(
      errorLabels.ERROR_LABEL_FIELD_REQUIRED
    );
    await expect(loginPage.passwordErrorLable).toContainText(
      errorLabels.ERROR_LABEL_FIELD_REQUIRED
    );
  });

  test("Incorrect email", async ({ page }) => {
    //Logging in
    const loginPage = new LoginPage(page);
    const fakeUser = generateFakeUser();
    await loginPage.login(fakeUser.username, fakeUser.password);
    await loginPage.waitForMessage(1000);
    //Check error labels
    await expect(loginPage.emailErrorLabel).toBeVisible();
    await expect(loginPage.emailErrorLabel).toContainText(
      errorLabels.ERROR_LABEL_INCORRECT_EMAIL
    );
  });
});
