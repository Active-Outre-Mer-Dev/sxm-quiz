import { test, expect } from "@playwright/test";

test("homepage has correct title", async ({ page }) => {
  await page.goto("https://sxm-quiz.netlify.app/");
  await expect(page).toHaveTitle(/SXM Quiz/);
});

test("play button navigates to quiz", async ({ page }) => {
  await page.goto("https://sxm-quiz.netlify.app/");
  await page.getByRole("link", { name: "Play" }).click();
  await expect(page).toHaveURL("https://sxm-quiz.netlify.app/quiz/general");
});
