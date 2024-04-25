import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { MyAccountPage } from "../page-objects/myAccountPage";
import { generateFakeUser } from "../helper/fakeUser";
import { handlingConsentModal } from "../helper/utils/functions";
import alerts from "../test-data/alerts.json";

test.describe("Testing My Account functionalities", () => {
  let page: Page;

  test.beforeAll("Sign in", async ({ browser }) => {
    page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const myAccountPage = new MyAccountPage(page);

    await page.goto(EndpointMaps.LOGIN);
    await handlingConsentModal(page);
    await loginPage.login(process.env.USER_EMAIL!, process.env.PASSWORD!);

    await expect(page).toHaveURL(EndpointMaps.USER_ACCOUNT);
    await expect(myAccountPage.contactInfoSection).toContainText(
      process.env.USER_EMAIL!
    );
  });

  //   test.afterAll("Close browser", async () => {
  //     await page.close();
  //   });

  test("Update First Name and Last Name", async () => {
    const myAccountPage = new MyAccountPage(page);
    const fakeUser = generateFakeUser();

    await myAccountPage.editDataButton.click();

    await expect(page).toHaveURL(EndpointMaps.EDIT_USER_ACCOUNT);
    await expect(myAccountPage.changeEmailCheckbox).not.toBeChecked();
    await expect(myAccountPage.changePasswordCheckbox).not.toBeChecked();

    // Change First Name and Last Name
    await myAccountPage.changeFirstAndLastName(
      fakeUser.username,
      fakeUser.lastname
    );

    //Check successful message
    await expect(myAccountPage.successMessage).toContainText(
      alerts.SUCCESSFULLY_UPDATED_ACCOUNT_INFO
    );
  });

  test("Update delivery adress", async () => {

    
  });
});
