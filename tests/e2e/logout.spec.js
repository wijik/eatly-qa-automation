const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');

test.describe('Logout & Session Test', () => {

  test('user berhasil logout dan session berakhir', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await expect(page).toHaveURL(/dashboard/);

    await page.evaluate(() => {
      document.getElementById('logout-form').submit();
    });

    await page.waitForURL(/login/);
    await expect(page).toHaveURL(/login/);

    await page.goto('http://localhost:8000/admin/dashboard');

    await expect(page).toHaveURL(/login/);
  });

});
