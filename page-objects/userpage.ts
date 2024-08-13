import { Locator, Page } from '@playwright/test';

export class UserPage {
  readonly page: Page
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.logoutButton = page.getByRole('button', { name: 'Log out' })
  }

  async clickLogout(){
    await this.logoutButton.click()
  }

}