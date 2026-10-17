# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\Login.spec.ts >> Login Page Tests @master >> login fails with unregistered email
- Location: tests\web\Login.spec.ts:51:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.alert-danger')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.alert-danger') with timeout 5000ms
  - waiting for locator('.alert-danger')

```

```yaml
- dialog "Log in":
  - document:
    - heading "Log in" [level=5]
    - button "Close"
    - text: "Username:"
    - textbox: unregistered.user@example.com
    - text: "Password:"
    - textbox: Password123
    - button "Close"
    - button "Log in"
- navigation:
  - link "PRODUCT STORE":
    - /url: index.html
    - img
    - text: PRODUCT STORE
  - list:
    - listitem:
      - link "Home (current)":
        - /url: index.html
    - listitem:
      - link "Contact":
        - /url: "#"
    - listitem:
      - link "About us":
        - /url: "#"
    - listitem:
      - link "Cart":
        - /url: cart.html
    - listitem:
      - link "Log in":
        - /url: "#"
    - listitem
    - listitem
    - listitem:
      - link "Sign up":
        - /url: "#"
  - list:
    - listitem
    - listitem
    - listitem
  - img "Second slide"
  - button "Previous"
  - button "Next"
- link "CATEGORIES":
  - /url: ""
- link "Phones":
  - /url: "#"
- link "Laptops":
  - /url: "#"
- link "Monitors":
  - /url: "#"
- link:
  - /url: prod.html?idp_=1
- heading "Samsung galaxy s6" [level=4]:
  - link "Samsung galaxy s6":
    - /url: prod.html?idp_=1
- heading "$360" [level=5]
- paragraph: The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage cannot be expanded.
- link:
  - /url: prod.html?idp_=2
- heading "Nokia lumia 1520" [level=4]:
  - link "Nokia lumia 1520":
    - /url: prod.html?idp_=2
- heading "$820" [level=5]
- paragraph: The Nokia Lumia 1520 is powered by 2.2GHz quad-core Qualcomm Snapdragon 800 processor and it comes with 2GB of RAM.
- link:
  - /url: prod.html?idp_=3
- heading "Nexus 6" [level=4]:
  - link "Nexus 6":
    - /url: prod.html?idp_=3
- heading "$650" [level=5]
- paragraph: The Motorola Google Nexus 6 is powered by 2.7GHz quad-core Qualcomm Snapdragon 805 processor and it comes with 3GB of RAM.
- link:
  - /url: prod.html?idp_=4
- heading "Samsung galaxy s7" [level=4]:
  - link "Samsung galaxy s7":
    - /url: prod.html?idp_=4
- heading "$800" [level=5]
- paragraph: The Samsung Galaxy S7 is powered by 1.6GHz octa-core it comes with 4GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 200GB via a microSD card.
- link:
  - /url: prod.html?idp_=5
- heading "Iphone 6 32gb" [level=4]:
  - link "Iphone 6 32gb":
    - /url: prod.html?idp_=5
- heading "$790" [level=5]
- paragraph: It comes with 1GB of RAM. The phone packs 16GB of internal storage cannot be expanded. As far as the cameras are concerned, the Apple iPhone 6 packs a 8-megapixel primary camera on the rear and a 1.2-megapixel front shooter for selfies.
- link:
  - /url: prod.html?idp_=6
- heading "Sony xperia z5" [level=4]:
  - link "Sony xperia z5":
    - /url: prod.html?idp_=6
- heading "$320" [level=5]
- paragraph: Sony Xperia Z5 Dual smartphone was launched in September 2015. The phone comes with a 5.20-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels at a PPI of 424 pixels per inch.
- link:
  - /url: prod.html?idp_=7
- heading "HTC One M9" [level=4]:
  - link "HTC One M9":
    - /url: prod.html?idp_=7
- heading "$700" [level=5]
- paragraph: The HTC One M9 is powered by 1.5GHz octa-core Qualcomm Snapdragon 810 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 128GB via a microSD card.
- link:
  - /url: prod.html?idp_=8
- heading "Sony vaio i5" [level=4]:
  - link "Sony vaio i5":
    - /url: prod.html?idp_=8
- heading "$790" [level=5]
- paragraph: Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight.
- link:
  - /url: prod.html?idp_=9
- heading "Sony vaio i7" [level=4]:
  - link "Sony vaio i7":
    - /url: prod.html?idp_=9
- heading "$790" [level=5]
- paragraph: REVIEW Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight, higher-resolution display, more storage space, and a Blu-ray drive.
- list:
  - listitem:
    - button "Previous"
  - listitem:
    - button "Next"
- heading "About Us" [level=4]
- paragraph: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
- heading "Get in Touch" [level=4]
- paragraph: "Address: 2390 El Camino Real"
- paragraph: "Phone: +440 123456"
- paragraph: "Email: demo@blazemeter.com"
- heading "PRODUCT STORE" [level=4]:
  - img
  - text: PRODUCT STORE
- contentinfo:
  - paragraph: Copyright © Product Store
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | import { Loginpage } from '../../pages/Login';
  4  | 
  5  | const validUser = {
  6  |   email: process.env.LOGIN_USERNAME ??'Yogesh_17102026',
  7  |   password: process.env.LOGIN_PASSWORD ?? 'Password123',
  8  | };
  9  | 
  10 | const invalidUsers = [
  11 |   { title: 'unregistered email', email: 'unregistered.user@example.com', password: 'Password123' },
  12 |   { title: 'wrong password', email: validUser.email, password: 'WrongPassword!' },
  13 |   { title: 'invalid email format', email: 'not-an-email', password: 'Password123' },
  14 | ];
  15 | 
  16 | const emptyFieldCases = [
  17 |   { title: 'empty email and password', email: '', password: '' },
  18 |   { title: 'empty email only', email: '', password: 'Password123' },
  19 |   { title: 'empty password only', email: validUser.email, password: '' },
  20 | ];
  21 | 
  22 | test.describe('Login Page Tests @master', () => {
  23 |   let loginpage: Loginpage;
  24 | 
  25 |   test.beforeEach(async ({ page }) => {
  26 |     loginpage = new Loginpage(page);
  27 |     await loginpage.goto();
  28 |     await loginpage.clickLoginLink();
  29 |   });
  30 | 
  31 |   test('login page is displayed', async ({ page }) => {
  32 |     await expect(loginpage.UsernameInput).toBeVisible();
  33 |     await expect(loginpage.passwordInput).toBeVisible();
  34 |     await expect(loginpage.loginButton).toBeVisible();
  35 |     //await expect(page).toHaveURL(/route=account\/login/);
  36 |   });
  37 | 
  38 |   test('login with valid credentials', async ({ page }) => {
  39 |     await loginpage.login(validUser.email, validUser.password);
  40 |     //await loginpage.clickLoginLink();
  41 | 
  42 |    
  43 | 
  44 | 
  45 |     //await expect(page).toHaveURL(/route=account\/account/);
  46 |     //await expect(loginpage.accountHeading).toBeVisible();
  47 |     await expect(loginpage.logoutLink).toBeVisible();
  48 |   });
  49 | 
  50 |   for (const user of invalidUsers) {
  51 |     test(`login fails with ${user.title}`, async ({ page }) => {
  52 |       await loginpage.login(user.email, user.password);
  53 | 
> 54 |       await expect(loginpage.warningAlert).toBeVisible();
     |                                            ^ Error: expect(locator).toBeVisible() failed
  55 |       //await expect(page).toHaveURL(/route=account\/login/);
  56 |     });
  57 |   }
  58 | 
  59 |   for (const user of emptyFieldCases) {
  60 |     test(`login fails with ${user.title}`, async ({ page }) => {
  61 |       await loginpage.login(user.email, user.password);
  62 | 
  63 |       await expect(loginpage.UsernameInput).toBeVisible();
  64 |       //await expect(page).toHaveURL(/route=account\/login/);
  65 |     });
  66 |   }
  67 | });
  68 | 
```