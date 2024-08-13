import { test, expect } from '@playwright/test'
import { SignupPage } from '@pageobjects/signuppage'
import { LoginPage } from '@pageobjects/loginpage'
import { UserPage } from '@pageobjects/userpage'

test.describe.configure({ mode: 'parallel' })

test.describe('Positive signup scenarios', () => {
    test('should sign up and login successfully with valid details', async ({ page }) => {

        const user = {
            firstName: 'Anders',
            lastName: 'Andersson',
            email: 'Anders.andersson@example.com',
            password: 'password123'
        };
        const signupPage = new SignupPage(page);
        const loginPage = new LoginPage(page)
        await signupPage.navigateTo();
        await signupPage.fillForm(user);
        await signupPage.submitForm()

        new UserPage(page).clickLogout()

        await loginPage.inputUsernameAndPassword(user.email, user.password)
        await loginPage.clickLogin()
        await expect(new UserPage(page).logoutButton).toBeVisible()

    })
    test('signup button on login page should go to signup page', async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.navigateTo()
        await loginPage.clickSignUp()

        await expect(page).toHaveURL('/signup');
    })
})

test.describe('Negative signup scenarios', () => {
const test_scenarios = [
    { scenario: 'no first name', user: {firstName: '', lastName: 'Hoff', email: 'test@email.se', password: 'password'}},
    { scenario: 'no last name', user: {firstName: '', lastName: 'Hoff', email: 'test@email.se', password: 'password'}},
    { scenario: 'invalid email', user: {firstName: '', lastName: 'Hoff', email: 'test@email.se', password: 'password'}},
    { scenario: 'no password',  user: {firstName: '', lastName: 'Hoff', email: 'test@email.se', password: 'password'}}
  ]
  test_scenarios.forEach(({ scenario, user }) => {
    test(`should be disabled signup button due to ${scenario}`, async ({ page }) => {
        const signupPage = new SignupPage(page)
        await signupPage.navigateTo()
        await signupPage.fillForm(user)
        
        await expect(signupPage.submitButton).toBeDisabled()
    });
  });
})