const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');
const MenuPage = require('../../pages/menuPage');

test('Create menu tanpa nama harus gagal', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await menuPage.goto();

    await menuPage.createMenu({
        gambar: 'tests/fixtures/menu.jpg',
        nama_menu: '',
        deskripsi: 'Negative test',
        kalori: 300,
        protein: 20,
        lemak: 10,
        id_preferensi_rasa: '1'
    });

    await expect(page).toHaveURL(/menus\/create/);

});

test('Upload file non image harus gagal', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await menuPage.goto();

    await menuPage.createMenu({
        gambar: 'tests/fixtures/not-image.txt',
        nama_menu: `Invalid Upload ${Date.now()}`,
        deskripsi: 'Negative upload',
        kalori: 300,
        protein: 10,
        lemak: 5,
        id_preferensi_rasa: '1'
    });

    await expect(page).toHaveURL(/menus\/create/);

});

