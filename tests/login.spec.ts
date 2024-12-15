import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

test("Login Test - Wiley Online Library", async ({ page }) => {
  const email = process.env.EMAIL || "";
  const password = process.env.PASSWORD || "";

  if (!email || !password) {
    throw new Error("Missing email or password in environment variables");
  }

  // Step 1: Navigate to the Wiley homepage
  await page.goto("https://onlinelibrary.wiley.com/");

  // Step 2: Click on the sign-in label
  await page.locator(".sign-in-label").click();

  // Step 3: Wait for 'Individual Login' option and click
  await page.waitForSelector("text=Individual Login");
  await page.locator("text=Individual Login").click();

  // Step 4: Wait for redirection to the login page
  await page.waitForURL(/.*scienceconnect\.io\/login/, { timeout: 60000 });

  // Step 5: Enter the email address
  await page.fill("#email-input", email);
  await page.click('//*[@id="sign-in-btn"]');

  // Step 6: Pause for CAPTCHA or other manual actions
  await page.pause(); // Solve CAPTCHA manually

  // Step 7: Enter password
  await page.fill("#pass-input", password);
  await page.click("#password-sign-in-btn");

  // Step 8: Verify successful login (check for a user dashboard or profile URL)
  await expect(page).toHaveURL(/dashboard|profile/);
  console.log("Login successful!");
});
