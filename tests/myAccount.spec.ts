import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { MyAccountPage } from "../page-objects/myAccountPage";
import { generateFakeUser } from "../helper/fakeUser";
import { handlingConsentModal } from "../helper/utils/functions";
import alerts from "../test-data/alerts.json";
import deliveryData from "../test-data/deliveryData.json";

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

  test.afterAll("Close browser", async () => {
    await page.close();
  });

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
    const myAccountPage = new MyAccountPage(page);

    // Go to edit adress page
    await myAccountPage.billingAdressButton.click();

    //Fill adress detail
    await myAccountPage.fillAdressForm(deliveryData);
    await myAccountPage.saveAdrressButton.click();

    //Check successful message
    await expect(myAccountPage.successMessage).toContainText(
      alerts.SUCCESSFULLY_SAVED_ADDRESS
    );
  });

  test("Add new Adress", async () => {
    const myAccountPage = new MyAccountPage(page);

    await page.waitForTimeout(2000);
    await myAccountPage.addNewAddress.click();

    await myAccountPage.fillAdressForm(deliveryData);

    //Make sure the new address is not set as the default for billing or shipping
    await expect(myAccountPage.billingAddressCheckbox).not.toBeChecked();
    await expect(myAccountPage.shippingAddressCheckbox).not.toBeChecked();

    await myAccountPage.saveButton.click();

    //Check successful message
    await expect(myAccountPage.successMessage).toContainText(
      alerts.SUCCESSFULLY_SAVED_ADDRESS
    );
  });

  test("Delete existing address", async () => {
    const myAccountPage = new MyAccountPage(page);

    //Delete Address
    await myAccountPage.deleteAdressButton.first().click();
    await myAccountPage.confirmPopupButton.click();

    //Check successful message
    await expect(myAccountPage.successMessage).toContainText(
      alerts.SUCCESSFULLY_DELETED_ADDRESS
    );
  });
});
