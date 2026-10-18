import { test as base, expect } from '@playwright/test';
import { Loginpage } from '../pages/Login';

type LoginFixtures = {
  loginPage: Loginpage;
};

export const test = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new Loginpage(page);
    await loginPage.goto();
    await loginPage.clickLoginLink();
    await use(loginPage);
  },
});

export { expect };
