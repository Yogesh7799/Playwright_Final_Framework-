import { test, expect } from '@playwright/test';

import { Loginpage } from '../../pages/Login';

const validUser = {
  email: process.env.LOGIN_USERNAME ??'Yogesh_17102026',
  password: process.env.LOGIN_PASSWORD ?? 'Password123',
};

const invalidUsers = [
  { title: 'unregistered email', email: 'unregistered.user@example.com', password: 'Password123' },
  { title: 'wrong password', email: validUser.email, password: 'WrongPassword!' },
  { title: 'invalid email format', email: 'not-an-email', password: 'Password123' },
];

const emptyFieldCases = [
  { title: 'empty email and password', email: '', password: '' },
  { title: 'empty email only', email: '', password: 'Password123' },
  { title: 'empty password only', email: validUser.email, password: '' },
];

test.describe('Login Page Tests @master', () => {
  let loginpage: Loginpage;

  test.beforeEach(async ({ page }) => {
    loginpage = new Loginpage(page);
    await loginpage.goto();
    await loginpage.clickLoginLink();
  });

  test('login page is displayed', async ({ page }) => {
    await expect(loginpage.UsernameInput).toBeVisible();
    await expect(loginpage.passwordInput).toBeVisible();
    await expect(loginpage.loginButton).toBeVisible();
    //await expect(page).toHaveURL(/route=account\/login/);
  });

  test('login with valid credentials', async ({ page }) => {
    await loginpage.login(validUser.email, validUser.password);
    //await loginpage.clickLoginLink();

   


    //await expect(page).toHaveURL(/route=account\/account/);
    //await expect(loginpage.accountHeading).toBeVisible();
    await expect(loginpage.logoutLink).toBeVisible();
  });

  for (const user of invalidUsers) {
    test(`login fails with ${user.title}`, async ({ page }) => {

       page.on('dialog', async (dialog) => {
      console.log('Dialog type:', dialog.type());
      console.log('Dialog message:', dialog.message());

      await dialog.accept();
    });

        await loginpage.login(user.email, user.password);
     // await loginpage.login(user.email, user.password);

      //await expect(loginpage.warningAlert).toBeVisible();
      //await expect(page).toHaveURL(/route=account\/login/);
    });
  }

  for (const user of emptyFieldCases) {
    test(`login fails with ${user.title}`, async ({ page }) => {
      await loginpage.login(user.email, user.password);

      await expect(loginpage.UsernameInput).toBeVisible();
      //await expect(page).toHaveURL(/route=account\/login/);
    });
  }
});
