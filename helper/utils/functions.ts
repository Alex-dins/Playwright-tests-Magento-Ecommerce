import { Page } from "@playwright/test";

export const numberConverter = function (price: string) {
  return parseInt(price.replace("$", ""));
};

export const handlingConsentModal = async function (page: Page): Promise<void> {
  const locator = page.getByLabel("Consent", { exact: true });
  if (await locator.isVisible()) {
    await locator.click();
  }
};
