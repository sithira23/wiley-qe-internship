import { test, expect } from "@playwright/test";

test("Search Functionality Test - Wiley Online Library", async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto("https://onlinelibrary.wiley.com/");

  // Step 2: Locate the search bar using XPath and input a search term
  const searchInput = page.locator('xpath=//*[@id="searchField1"]'); // Using XPath for search field
  await searchInput.fill("Data Science"); // Example search term

  // Step 3: Locate the search button using class and click on it
  const searchButton = page.locator(".btn.quick-search__button.icon-search"); // Using class for the search button
  await searchButton.click();

  // Step 4: Wait for the search results to load
  await page.waitForSelector(".search-results"); // Modify selector to match the search results container

  // Step 5: Verify that the results page contains relevant results
  const searchResults = await page.locator(".search-results .result-item");
  const resultsCount = await searchResults.count();
  expect(resultsCount).toBeGreaterThan(0); // Ensure that there is at least one result

  // Step 6: Optionally, verify that the results are relevant to the search term
  const firstResultTitle = await searchResults
    .first()
    .locator(".result-title")
    .textContent();
  expect(firstResultTitle?.toLowerCase()).toContain("data science"); // Ensure the first result is related to the search term
});
