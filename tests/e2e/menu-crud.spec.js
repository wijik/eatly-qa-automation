const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');
const MenuPage = require('../../pages/menuPage');

test.describe('Login & CRUD Menu - End-to-End Test', () => {

  test('Admin login dan berhasil CREATE + DELETE menu', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await expect(page).toHaveURL(/dashboard/);

    await menuPage.goto();

    const menuData = {
      gambar: 'tests/fixtures/menu.jpg',
      nama_menu: `Menu Automation ${Date.now()}`,
      deskripsi: 'Menu hasil automation testing Playwright',
      kalori: 500,
      protein: 30,
      lemak: 20,
      id_preferensi_rasa: '1'
    };

    await menuPage.createMenu(menuData);

    const menuRow = page.locator('tr', { hasText: menuData.nama_menu });
    await expect(menuRow).toBeVisible();

    const menuId = await menuRow.getAttribute('data-id');
    expect(menuId).not.toBeNull();

    await menuPage.openEditPage(menuId);

    await menuPage.updateMenu({
      nama_menu: `${menuData.nama_menu} - Edit`,
      kalori: 550
    });

    await expect(page.locator('table')).toContainText('550');

    await expect(page.locator('table')).toContainText('500');
    await expect(page.locator('table')).toContainText('30');
    await expect(page.locator('table')).toContainText('20');

    await menuPage.deleteMenu(menuId);

    await expect(
      page.locator(`tr[data-id="${menuId}"]`)
    ).toHaveCount(0);

  });

});
