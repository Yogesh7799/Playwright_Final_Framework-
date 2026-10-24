import { test, expect } from '../../fixtures/login.fixture';
import { DialogUtils } from '../../utils/DialogUtils';


const validUser = {
  email: process.env.LOGIN_USERNAME ?? 'Yogesh_17102026',
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
  test('login page is displayed', async ({ loginPage }) => {

    await DialogUtils.acceptDialog(loginPage.page);
    await expect(loginPage.UsernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('login with valid credentials', async ({ loginPage }) => {
    await loginPage.login(validUser.email, validUser.password);
    await expect(loginPage.logoutLink).toBeVisible();
  });

  for (const user of invalidUsers) {
    test(`login fails with ${user.title} @sanity`, async ({ loginPage, page }) => {
      page.on('dialog', async (dialog) => {
        console.log('Dialog type:', dialog.type());
        console.log('Dialog message:', dialog.message());

        await dialog.accept();
      });

      await loginPage.login(user.email, user.password);
    });
  }

  for (const user of emptyFieldCases) {
    test(`login fails with ${user.title} @sanity`, async ({ loginPage }) => {
      await loginPage.login(user.email, user.password);

      await expect(loginPage.UsernameInput).toBeVisible();
    });
  }
});
