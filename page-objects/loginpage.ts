import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorMessage: Locator
  readonly signUpLink: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.getByLabel('Email')
    this.passwordInput = page.getByRole('textbox', { name: 'Password' })
    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.errorMessage = page.getByText('Invalid credentials')
    this.signUpLink = page.getByRole('link', { name: 'Signup' })
  }

  async navigateTo() {
    await this.page.goto('/login')
  }

  async inputUsernameAndPassword(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
  }

  async clickLogin(){
    await this.loginButton.click()
  }

  async clickSignUp() {
    await this.signUpLink.click()
  }
  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible()
  }
}