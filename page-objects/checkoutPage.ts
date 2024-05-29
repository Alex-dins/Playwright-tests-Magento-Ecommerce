import { expect, type Locator, type Page } from "@playwright/test";
import { numberConverter } from "../helper/utils/functions";

export class CheckoutPage {
  readonly page: Page;
  readonly tableRateRadioButton: Locator;
  readonly fixedRadioButton: Locator;
  readonly nextButton: Locator;
  readonly subtotalPrice: Locator;
  readonly shippingPrice: Locator;
  readonly totalPrice: Locator;
  readonly placeOrderButton: Locator;
  readonly confirmationMessage: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tableRateRadioButton = page.getByLabel("Table Rate");
    this.fixedRadioButton = page.getByLabel("Fixed");
    this.nextButton = page.getByRole("button", { name: "Next" });
    this.subtotalPrice = page.locator(".sub").locator(".price");
    this.shippingPrice = page.locator('[data-th="Shipping"]');
    this.totalPrice = page.locator("[data-th='Order Total']");
    this.placeOrderButton = page.getByRole("button", { name: "Place Order" });
    this.confirmationMessage = page.locator("h1");
    this.continueShoppingButton = page.getByRole("link", {
      name: "Continue Shopping",
    });
  }

  async chooseShippingMethod(shippingMethod: string) {
    if (shippingMethod === "Table Rate") {
      await this.tableRateRadioButton.click();
    } else {
      await this.fixedRadioButton.click();
    }
  }

  async checkTotalPrice(): Promise<void> {
    const subtotal = numberConverter(await this.subtotalPrice.innerText());
    const shipping = numberConverter(await this.shippingPrice.innerText());
    const total = numberConverter(await this.totalPrice.innerText());

    const expectedTotal = subtotal + shipping;
    expect(total).toEqual(expectedTotal);
  }
}
