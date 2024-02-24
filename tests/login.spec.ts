import { test, expect } from "@playwright/test";

test("Landing page", async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/");
  await expect(page.getByLabel("store logo")).toBeVisible();
});
