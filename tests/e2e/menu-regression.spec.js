const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');
const MenuPage = require('../../pages/menuPage');

test.describe('Regression Test - Edit Gambar Menu', () => {

    test('Edit gambar tidak merusak fitur CRUD', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const menuPage = new MenuPage(page);

        await loginPage.goto();
        await loginPage.login('admin@gmail.com', 'admin123');

        await expect(page).toHaveURL(/dashboard/);

        await menuPage.goto();

        const menuData = {
            gambar: 'tests/fixtures/menu.jpg',
            nama_menu: `Regression Menu ${Date.now()}`,
            deskripsi: 'Regression test menu',
            kalori: 400,
            protein: 20,
            lemak: 10,
            id_preferensi_rasa: '1'
        };

        await menuPage.createMenu(menuData);

        await expect(page.locator('table')).toContainText(menuData.nama_menu);

        const row = page.locator('tr', { hasText: menuData.nama_menu });
        const menuId = await row.getAttribute('data-id');

        expect(menuId).not.toBeNull();

        await menuPage.openEditPage(menuId);

        await menuPage.updateMenu({
            gambar: 'tests/fixtures/menu2.jpg'
        });

        await menuPage.goto();

        await expect(page.locator('table')).toContainText(menuData.nama_menu);

        await menuPage.deleteMenu(menuId);

        await expect(page.locator('table')).not.toContainText(menuData.nama_menu);

    });

});
