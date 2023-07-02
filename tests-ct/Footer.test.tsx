import { test, expect } from "@playwright/experimental-ct-react";
import { Footer } from "../src/components/site-footer";

test("should contain correct text", async ({ mount }) => {
  const component = await mount(<Footer />);
  await expect(component).toContainText("Built by AOMDev, 2023");
});
