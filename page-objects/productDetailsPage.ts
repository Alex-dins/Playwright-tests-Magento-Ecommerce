import { type Locator, type Page } from "@playwright/test";

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly addFirstReviewButton: Locator;
  readonly addYourReviewButton: Locator;
  readonly nicknameInput: Locator;
  readonly summaryInput: Locator;
  readonly reviewInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly reviewList: Locator;
  readonly reviewForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator("h1");
    this.addFirstReviewButton = page.getByRole("link", {
      name: "Be the first to review this product",
    });
    this.addYourReviewButton = page.getByRole("link", {
      name: "Add Your Review",
    });
    this.nicknameInput = page.locator("#nickname_field");
    this.summaryInput = page.locator("#summary_field");
    this.reviewInput = page.locator("#review_field");
    this.submitButton = page.getByText("Submit Review");
    this.successMessage = page.locator("[data-ui-id=message-success]");
    this.reviewList = page.locator("#product-review-container li");
    this.reviewForm = page.locator("#review-form");
  }

  async scrollIntoReviewForm(): Promise<void> {
    await this.reviewForm.scrollIntoViewIfNeeded();
  }

  async submitReview(
    // stars: string,
    nickname: string,
    summary: string,
    review: string
  ): Promise<void> {
    const ratings = this.page.getByLabel("5 stars");

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
