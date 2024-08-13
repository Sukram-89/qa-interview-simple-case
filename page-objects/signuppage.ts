import { Locator, Page } from '@playwright/test';

export class SignupPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByRole('textbox', { name: 'Password' })
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async navigateTo() 
  {
    await this.page.goto('/signup');
  }

  async fillForm({firstName: firstName, lastName: lastName, email: email, password: password}: 
    { firstName: string; lastName: string; email: string; password: string }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitForm(){
    await this.submitButton.click();
  }
}
