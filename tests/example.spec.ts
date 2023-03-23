import { test, expect } from "@playwright/test";

test("homepage has correct title", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle(/SXM Quiz/);
});

test("play button navigates to quiz", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Play" }).click();
  await expect(page).toHaveURL("http://localhost:3000/quiz/general");
});
