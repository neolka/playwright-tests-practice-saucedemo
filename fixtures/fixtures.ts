import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../utils/testData';

// Define types for our custom fixtures
type LoginFixtures = {
    loggedInPage: Page;
};

// Create a new test object that includes a loggedInPage fixture
export const test = base.extend <LoginFixtures>({
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.standardValid.username, users.standardValid.password);
    await use(page); // tests get a ready-to-use logged-in page
  },
});

export { expect };