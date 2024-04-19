import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { MainPage } from "../page-objects/mainPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { MyAccountPage } from "../page-objects/myAccountPage";
import { handlingConsentModal } from "../helper/utils/functions";

test.describe("Testing My Account functionalities", () => {
  let page: Page;

  test.beforeAll("Sign in", async ({ browser }) => {
    page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page);
    const myAccountPage = new MyAccountPage(page);

    await page.goto(EndpointMaps.LOGIN);
    await handlingConsentModal(page);
    // await mainPage.handlingConsentModal();
    await loginPage.login(process.env.USER_EMAIL!, process.env.PASSWORD!);

    await expect(page).toHaveURL(EndpointMaps.USER_ACCOUNT);
    await expect(myAccountPage.contactInfoSection).toContainText(
      process.env.USER_EMAIL!
    );
  });

  // test.afterAll("Close browser", async () => {
  //   await page.close();
  // });

  test("Update First Name and Last Name", async () => {});
});
