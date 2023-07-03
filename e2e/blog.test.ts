import { test, expect } from "@playwright/test";

test.describe("blog page", () => {
  test("has blog heading", async ({ page }) => {
    await page.goto("http://localhost:3000/blog");
    await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
  });
});
