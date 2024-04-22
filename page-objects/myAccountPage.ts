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

  constructor(page: Page) {
    this.page = page;
    this.contactInfoSection = page.locator(".box-information");
    this.editDataButton = page.getByRole("link", { name: "Edit", exact: true });
    this.firstNameInput = page.getByLabel("First Name");
    this.lastNameInput = page.getByLabel("Last Name");
    this.changeEmailCheckbox = page.locator("#change-email");
    this.changePasswordCheckbox = page.locator("#change-password");
    this.saveButton = page.getByRole("button", { name: "Save" });
  }
}
