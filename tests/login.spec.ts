import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { EndpointMaps } from "../helper/endpoitMaps";
import { MyAccountPage } from "../page-objects/myAccountPage";
import { generateFakeUser } from "../helper/fakeUser";
import alerts from "../test-data/alerts.json";

test.describe("Testing Sign In", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EndpointMaps.LOGIN);
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
    await loginPage.login("", "");
    //Check error empty fields
    await expect(loginPage.errorAlert).toBeVisible();
    await expect(loginPage.errorAlert).toContainText(alerts.ERROR_EMPTY_FIELD);
  });
});
