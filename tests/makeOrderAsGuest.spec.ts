import { test, expect, Page } from "@playwright/test";
import { EndpointMaps } from "../helper/endpointMaps";

test.describe("Make an order as a guest", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(EndpointMaps.MAIN_PAGE);
  });

  test("Place an order", async ({ page }) => {});
});
