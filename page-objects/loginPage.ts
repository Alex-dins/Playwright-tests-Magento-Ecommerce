import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly emailErrorLabel: Locator;
  readonly passwordErrorLable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", {
      name: "Email",
    });
    this.passwordInput = page.getByRole("textbox", {
      name: "Password",
    });
    this.loginButton = page.getByRole("button", { name: "Sign In" });
    this.emailErrorLabel = page.locator("id=email-error");
    this.passwordErrorLable = page.locator("id=pass-error");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async waitForMessage(timeout: number): Promise<void> {
    await this.page.waitForTimeout(timeout);
    await this.loginButton.click();
  }
}
