import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/SXM Quiz/);
});

test.describe("Start quiz button", () => {
  test("is visible", async ({ page }) => {
    await expect(page.getByRole("button", { name: /Start quiz/gi })).toBeVisible();
  });
  test("navigates to random quiz", async ({ page }) => {
    await page.getByRole("button", { name: /Start quiz/gi }).click();
    await expect(page).toHaveURL(/[quiz]/);
  });
});
