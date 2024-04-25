import { type Locator, type Page } from "@playwright/test";

export class MyAccountPage {
  readonly page: Page;
  readonly contactInfoSection: Locator;
  readonly editDataButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly changeEmailCheckbox: Locator;
  readonly changePasswordCheckbox: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;
  readonly billingAdressButton: Locator;
  readonly companyInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly streetAdressInput: Locator;
  readonly secondStreetAdressInput: Locator;
  readonly thirdStreetAdressInput: Locator;
  readonly cityInput: Locator;
  readonly stateDropdownMenu: Locator;
  readonly postalCodeInput: Locator;
  readonly countryDropdownMenu: Locator;
  readonly saveAdrressButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactInfoSection = page.locator(".box-information");
    this.editDataButton = page.getByRole("link", { name: "Edit", exact: true });
    this.firstNameInput = page.getByLabel("First Name");
    this.lastNameInput = page.getByLabel("Last Name");
    this.changeEmailCheckbox = page.locator("#change-email");
    this.changePasswordCheckbox = page.locator("#change-password");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.successMessage = page.locator("[data-ui-id=message-success]");
    this.billingAdressButton = page.locator(
      "[data-ui-id='default-billing-edit-link']"
    );
    this.companyInput = page.locator("#company");
    this.phoneNumberInput = page.locator("#telephone");
    this.streetAdressInput = page.locator("#street_1");
    this.secondStreetAdressInput = page.locator("#street_2");
    this.thirdStreetAdressInput = page.locator("#street_3");
    this.cityInput = page.locator("#city");
    this.stateDropdownMenu = page.locator("#region_id");
    this.postalCodeInput = page.locator("#zip");
    this.countryDropdownMenu = page.locator("#country");
    this.saveAdrressButton = page.getByRole("button", { name: "Save Address" });
  }

  async changeFirstAndLastName(
    username: string,
    lastname: string
  ): Promise<void> {
    await this.firstNameInput.fill(username);
    await this.lastNameInput.fill(lastname);
    await this.saveButton.click();
  }
}
