import { type Locator, type Page } from "@playwright/test";

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly addFirstReviewButton: Locator;
  readonly nicknameInput: Locator;
  readonly summaryInput: Locator;
  readonly reviewInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator("h1");
    this.addFirstReviewButton = page.getByRole("link", {
      name: "Be the first to review this product",
    });
    this.nicknameInput = page.locator("#nickname_field");
    this.summaryInput = page.locator("#summary_field");
    this.reviewInput = page.locator("#review_field");
    this.submitButton = page.getByRole("button", { name: "Submit Review" });
  }

  async submitReview(
    stars: string,
    nickname: string,
    summary: string,
    review: string
  ): Promise<void> {
    // await this.page
    //   .locator(".review-control-vote")
    //   .locator("#Rating_5_label")
    //   .click({ force: true, position: { x: 56, y: 269 } });
    // console.log(
    //   await this.page
    //     .getByLabel(stars)
    //     // .locator(".review-control-vote")
    //     // .locator("#Rating_5_label")
    //     .boundingBox()
    // );
    const ratings = this.page.getByLabel(stars);
    // .locator("#Rating_5_label")
    const box = await ratings.boundingBox();
    const x = box!.x + box!.width / 2;
    const y = box!.y + box!.height / 2;

    await this.page.mouse.move(x + 185, y + 17);
    await this.page.mouse.click(x + 185, y + 17);

    await this.nicknameInput.fill(nickname);
    await this.summaryInput.fill(summary);
    await this.reviewInput.fill(review);
  }
}
