import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

test.describe('Login Feature', () => {

  test('User can login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login('admin@gmail.com', 'admin123');

    await expect(page).toHaveURL(/dashboard/);
  });

  test('Login fails with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('user@test.com', 'salahpassword');

    await expect(page).toHaveURL(/login/);
  });

});