import { Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';

export class Loginpage {
  private readonly page: Page;

  readonly loginlink:Locator;
  readonly UsernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly warningAlert: Locator;
  readonly forgotPasswordLink: Locator;
  readonly continueButton: Locator;
  //readonly accountHeading: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginlink = page.locator("#login2");
    this.UsernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.warningAlert = page.locator('.alert-danger');
    this.forgotPasswordLink = page.getByRole('link', { name: /forgotten password/i });
    this.continueButton = page.locator('#content').getByRole('link', { name: 'Continue' });
    //this.accountHeading = page.locator('#content').getByRole('heading', { name: 'My Account' });
    this.logoutLink = page.locator('#logout2');
  }

  async goto() {


     await  this.page.goto("https://www.demoblaze.com/index.html");
  }

  async clickLoginLink() {
    await this.loginlink.click();
  }
  async username(username: string) {
    await this.UsernameInput.fill(username);
  }

  async password(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    //await this.clickLoginLink();
    await this.username(username);
    await this.password(password);
    await this.clickLoginButton();
  }

  async getWarningMessage() {
    return (await this.warningAlert.textContent())?.trim() ?? '';
  }

  async getTitle() {
    return this.page.title();
  }
}
