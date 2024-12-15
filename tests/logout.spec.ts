import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

// Load the .env file
dotenv.config();

test("Logout Functionality Test - Wiley Online Library", async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto("https://onlinelibrary.wiley.com/");

  // Step 2: Click on the Sign In button to go to the login page
  const signInButton = page.locator(".sign-in-label");
  await signInButton.click();

  // Step 3: Click on the individual login option
  const individualLoginButton = page.locator(
    'xpath=//*[@id="pb-page-content"]/div/div[1]/header/div/div[2]/div/div/div/div[2]/div/div[2]/div/div[2]/div/ul/li[1]/a'
  );
  await individualLoginButton.click();

  // Step 4: Wait for the login page to load
  await page.waitForURL("https://wiley.scienceconnect.io/login");

  // Step 5: Enter the email address from .env file
  const emailInput = page.locator("#email-input");
  await emailInput.fill(process.env.EMAIL || ""); // Use email from .env

  // Step 6: Click the Continue button
  const continueButton = page.locator('//*[@id="sign-in-btn"]');
  await continueButton.click();

  // Step 7: Wait for the password input to appear and fill in the password from .env
  const passwordInput = page.locator("#pass-input");
  await passwordInput.fill(process.env.PASSWORD || ""); // Use password from .env

  // Step 8: Click the Continue button to log in
  const passwordContinueButton = page.locator(
    '//*[@id="password-sign-in-btn"]'
  );
  await passwordContinueButton.click();

  // Step 9: Wait for the home page to load and verify login (you can modify selectors based on your needs)
  await page.waitForSelector(".profile-text");
  const profileName = await page.locator(".profile-text").textContent();
  expect(profileName).toContain("Sithira ");
  // Step 10: Click on the profile navigation dropdown to open logout options
  const profileDropdown = page.locator(".profile-navigation-login-dropdown"); // Adjust this selector if needed
  await profileDropdown.click();

  // Step 11: Click the logout link in the dropdown
  const logoutLink = page.locator(
    'a[href="https://onlinelibrary.wiley.com/action/slo?redirectUri=%2F%3Flogout%3Dtrue"]'
  );
  await logoutLink.click();

  // Step 12: Wait for the page to redirect back to the login page
  await page.waitForURL("https://wiley.scienceconnect.io/login");

  // Step 13: Verify the user is logged out by checking for the presence of the login button
  const loginButton = page.locator(".sign-in-label"); // Ensure login button is visible again
  expect(await loginButton.isVisible()).toBe(true);
});
