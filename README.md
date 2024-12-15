# Wiley QE Internship - Test Automation

## Overview

This repository contains test automation scripts for the **Wiley Online Library** website. The tests are implemented using **Playwright** for automating the browser interactions. 

## Created Test Cases

### 1. Login Test
This test case verifies the login functionality for the **Wiley Online Library**. It performs the following steps:
- Navigates to the login page.
- Enters a valid email and password.
- Verifies successful login by checking the profile name.

#### Screenshot:
![Login Test Screenshot](playwright-report/data)

### 2. Logout Test
This test case tests the logout functionality. It performs the following actions:
- Logs into the website.
- Clicks the profile icon and selects the logout option.
- Verifies that the user has been logged out and the login button is visible again.

#### Screenshot:
![Logout Test Screenshot](images/logout-test.png)

### 3. Search Functionality Test
This test case checks the search functionality of the **Wiley Online Library**. It performs the following actions:
- Searches for a specific term using the search bar.
- Verifies that the search results are displayed.

#### Screenshot:
![Search Test Screenshot](images/search-test.png)

## Note on Cloudflare Bot Detection
While running the tests, the **Cloudflare bot identification** page is displayed each time, which blocks the automated tests from proceeding. This issue occurs because Cloudflare detects automated requests and triggers a verification challenge. You might need to solve the challenge manually or implement a workaround to bypass it.

## Author

- **Name:** Sithira Buddhika

## Technologies Used

- **Test Automation Framework:** Playwright
- **Programming Language:** TypeScript

