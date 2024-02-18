import { test, expect } from "@playwright/experimental-ct-react";
import { Footer } from "../src/components/site-footer";

test("should contain correct text", async ({ mount }) => {
  const component = await mount(<Footer />);
  const year = new Date().getFullYear();
  await expect(component).toContainText(`Built by AOMDev, ${year}`);
});
