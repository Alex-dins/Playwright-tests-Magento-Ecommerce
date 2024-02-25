import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("id=email");
    this.passwordInput = page.locator("id=pass");
    this.loginButton = page.getByRole("button", { name: "Sign In" });
    // this.errorAlert = page.getByRole("alert").locator("div").first();
    this.errorAlert = page.locator('[data-ui-id="message-error"]');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
