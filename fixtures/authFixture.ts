import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Define types for our custom fixtures
type AuthFixtures = {
    loggedInPage: Page;
};

// Create a new test object that includes a loggedInPage fixture
export const test = base.extend <AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login();
    await use(page); // tests get a ready-to-use logged-in page
  },
});

export { expect };