import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/quiz");
});

test("Page has correct title", async ({ page }) => {
  await expect(page).toHaveTitle("SXM Quiz - Quiz");
});

test.describe("Filters work properly", () => {
  test("Subject filters navigate to proper url", async ({ page }) => {
    await page.getByRole("button", { name: "Subjects" }).click();
    await page.getByRole("radio", { name: "History" }).click();
    await expect(page).toHaveURL(/history/gi);
  });
  test("Difficulty filters navigate to proper url", async ({ page }) => {
    await page.getByRole("button", { name: "Difficulty" }).click();
    await page.getByRole("radio", { name: "Tourist" }).click();
    await expect(page).toHaveURL(/easy/gi);
  });
});
