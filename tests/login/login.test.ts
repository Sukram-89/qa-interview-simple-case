import { test, expect } from '@playwright/test'
import { existingUsers } from '@testdata/userdata'
import { LoginPage } from '@pageobjects/loginpage'
import { UserPage } from '@pageobjects/userpage'

test.describe.configure({ mode: 'parallel' })

test.describe('Successful login scenarios', () => {
  test('should log in successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const existingUser = existingUsers[0]

    await loginPage.navigateTo()
    await loginPage.inputUsernameAndPassword(existingUser.email, existingUser.password)
    await loginPage.clickLogin()

    await expect(new UserPage(page).logoutButton).toBeVisible()
  })
})

test.describe('Negative login scenarios', () => {
  test('should display an error message for incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const existingUser = existingUsers[0]

    await loginPage.navigateTo()
    await loginPage.inputUsernameAndPassword(existingUser.email, "incorrectpassword")
    await loginPage.clickLogin()

    await expect(loginPage.isErrorMessageVisible()).toBeTruthy()
  })

  test('should disable login button for invalid username format', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.navigateTo()
    await loginPage.inputUsernameAndPassword("invalidemail", "password")

    await expect(loginPage.loginButton).toBeDisabled()
  })
})
