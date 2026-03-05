const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');
const MenuPage = require('../../pages/menuPage');

test.describe.configure({ mode: 'serial' });

test.describe('Menu Boundary Testing', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('admin@gmail.com', 'admin123');
    });

    test('Create menu dengan nama 1 karakter', async ({ page }) => {

        const menuPage = new MenuPage(page);
        await menuPage.goto();

        const namaMenu = `A-${Date.now()}`;

        await menuPage.createMenu({
            gambar: 'tests/fixtures/menu.jpg',
            nama_menu: namaMenu,
            deskripsi: 'Boundary nama 1 karakter',
            kalori: 300,
            protein: 20,
            lemak: 10,
            id_preferensi_rasa: '1'
        });

        await expect(page).toHaveURL(/menus/);

        await page.pause();

        await expect(page.locator('body')).toContainText('Menu berhasil ditambahkan', { timeout: 10000 });

    });

    test('Create menu dengan nama 255 karakter', async ({ page }) => {

        const longName = 'A'.repeat(255);

        const menuPage = new MenuPage(page);
        await menuPage.goto();

        await menuPage.createMenu({
            gambar: 'tests/fixtures/menu.jpg',
            nama_menu: longName,
            deskripsi: 'Boundary nama panjang',
            kalori: 300,
            protein: 20,
            lemak: 10,
            id_preferensi_rasa: '1'
        });

        await expect(page).toHaveURL(/menus/);

        await expect(page.locator('body')).toContainText('Menu berhasil ditambahkan');

    });

    test('Create menu dengan kalori 0', async ({ page }) => {

        const menuPage = new MenuPage(page);
        await menuPage.goto();

        const namaMenu = `Boundary Kalori 0 ${Date.now()}`;

        await menuPage.createMenu({
            gambar: 'tests/fixtures/menu.jpg',
            nama_menu: namaMenu,
            deskripsi: 'Kalori nol',
            kalori: 0,
            protein: 20,
            lemak: 10,
            id_preferensi_rasa: '1'
        });

        await expect(page).toHaveURL(/menus/);

        await expect(page.locator('body')).toContainText('Menu berhasil ditambahkan');

    });


    test('Create menu dengan kalori sangat besar', async ({ page }) => {

        const menuPage = new MenuPage(page);
        await menuPage.goto();

        const namaMenu = `Boundary Kalori Max ${Date.now()}`;

        await menuPage.createMenu({
            gambar: 'tests/fixtures/menu.jpg',
            nama_menu: namaMenu,
            deskripsi: 'Kalori besar',
            kalori: 999999,
            protein: 20,
            lemak: 10,
            id_preferensi_rasa: '1'
        });

        await expect(page).toHaveURL(/menus/);

        await page.pause();

        await expect(page.locator('body')).toContainText('Menu berhasil ditambahkan', { timeout: 10000 });

    });

    test('Create menu dengan protein 0', async ({ page }) => {

        const menuPage = new MenuPage(page);
        await menuPage.goto();

        const namaMenu = `Boundary Protein 0 ${Date.now()}`;

        await menuPage.createMenu({
            gambar: 'tests/fixtures/menu.jpg',
            nama_menu: namaMenu,
            deskripsi: 'Protein nol',
            kalori: 300,
            protein: 0,
            lemak: 10,
            id_preferensi_rasa: '1'
        });

        await expect(page).toHaveURL(/menus/);

        await expect(page.locator('body')).toContainText('Menu berhasil ditambahkan');

    });

    test('Create menu dengan lemak 0', async ({ page }) => {

        const menuPage = new MenuPage(page);
        await menuPage.goto();

        const namaMenu = `Boundary Lemak 0 ${Date.now()}`;

        await menuPage.createMenu({
            gambar: 'tests/fixtures/menu.jpg',
            nama_menu: namaMenu,
            deskripsi: 'Lemak nol',
            kalori: 300,
            protein: 20,
            lemak: 0,
            id_preferensi_rasa: '1'
        });

        await expect(page).toHaveURL(/menus/);

        await expect(page.locator('body')).toContainText('Menu berhasil ditambahkan');

    });

    test('Create menu dengan deskripsi sangat panjang', async ({ page }) => {

        const longDesc = 'D'.repeat(500);

        const menuPage = new MenuPage(page);
        await menuPage.goto();

        const namaMenu = `Boundary Deskripsi ${Date.now()}`;

        await menuPage.createMenu({
            gambar: 'tests/fixtures/menu.jpg',
            nama_menu: namaMenu,
            deskripsi: longDesc,
            kalori: 300,
            protein: 20,
            lemak: 10,
            id_preferensi_rasa: '1'
        });

        await expect(page).toHaveURL(/menus/);

        await page.pause();

        await expect(page.locator('body')).toContainText('Menu berhasil ditambahkan', { timeout: 10000 });

    });

});
