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
        deskripsi: 'Validation test',
        kalori: 300,
        protein: 20,
        lemak: 10,
        id_preferensi_rasa: '1'
    });

    await expect(page).toHaveURL(/menus\/create/);

});

test('Create menu tanpa gambar harus gagal', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await menuPage.goto();

    await menuPage.createMenu({
        gambar: '',
        nama_menu: `Tanpa Gambar ${Date.now()}`,
        deskripsi: 'Validation test',
        kalori: 300,
        protein: 20,
        lemak: 10,
        id_preferensi_rasa: '1'
    });

    await expect(page).toHaveURL(/menus\/create/);

});

test('Create menu tanpa deskripsi harus gagal', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await menuPage.goto();

    await menuPage.createMenu({
        gambar: 'tests/fixtures/menu.jpg',
        nama_menu: `Tanpa Deskripsi ${Date.now()}`,
        deskripsi: '',
        kalori: 300,
        protein: 20,
        lemak: 10,
        id_preferensi_rasa: '1'
    });

    await expect(page).toHaveURL(/menus\/create/);

});

test('Create menu tanpa kalori harus gagal', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await menuPage.goto();

    await menuPage.createMenu({
        gambar: 'tests/fixtures/menu.jpg',
        nama_menu: `Tanpa Kalori ${Date.now()}`,
        deskripsi: 'Validation test',
        kalori: '',
        protein: 20,
        lemak: 10,
        id_preferensi_rasa: '1'
    });

    await expect(page).toHaveURL(/menus\/create/);

});

test('Create menu tanpa protein harus gagal', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await menuPage.goto();

    await menuPage.createMenu({
        gambar: 'tests/fixtures/menu.jpg',
        nama_menu: `Tanpa Protein ${Date.now()}`,
        deskripsi: 'Validation test',
        kalori: 300,
        protein: '',
        lemak: 10,
        id_preferensi_rasa: '1'
    });

    await expect(page).toHaveURL(/menus\/create/);

});

test('Create menu tanpa lemak harus gagal', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await menuPage.goto();

    await menuPage.createMenu({
        gambar: 'tests/fixtures/menu.jpg',
        nama_menu: `Tanpa Lemak ${Date.now()}`,
        deskripsi: 'Validation test',
        kalori: 300,
        protein: 20,
        lemak: '',
        id_preferensi_rasa: '1'
    });

    await expect(page).toHaveURL(/menus\/create/);

});

test('Create menu tanpa preferensi rasa harus gagal', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await menuPage.goto();

    await page.click('text=Tambah Data Menu');

    await page.setInputFiles('input[name="gambar"]', 'tests/fixtures/menu.jpg');

    await page.fill('input[name="nama_menu"]', `Validation Rasa ${Date.now()}`);
    await page.fill('textarea[name="deskripsi"]', 'Validation test');

    await page.fill('input[name="kalori"]', '300');
    await page.fill('input[name="protein"]', '20');
    await page.fill('input[name="lemak"]', '10');

    await page.evaluate(() => {
        const dropdown = document.querySelector('select[name="id_preferensi_rasa"]');
        dropdown.value = '';
        dropdown.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/menus\/create/);

});

test('Create menu kalori negatif harus gagal', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await menuPage.goto();

    await menuPage.createMenu({
        gambar: 'tests/fixtures/menu.jpg',
        nama_menu: `Kalori Negatif ${Date.now()}`,
        deskripsi: 'Validation test',
        kalori: -100,
        protein: 20,
        lemak: 10,
        id_preferensi_rasa: '1'
    });

    await expect(page).toHaveURL(/menus\/create/);

});

test('Create menu protein negatif harus gagal', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await menuPage.goto();

    await menuPage.createMenu({
        gambar: 'tests/fixtures/menu.jpg',
        nama_menu: `Protein Negatif ${Date.now()}`,
        deskripsi: 'Validation test',
        kalori: 300,
        protein: -10,
        lemak: 10,
        id_preferensi_rasa: '1'
    });

    await expect(page).toHaveURL(/menus\/create/);

});

test('Create menu lemak negatif harus gagal', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('admin@gmail.com', 'admin123');

    await menuPage.goto();

    await menuPage.createMenu({
        gambar: 'tests/fixtures/menu.jpg',
        nama_menu: `Lemak Negatif ${Date.now()}`,
        deskripsi: 'Validation test',
        kalori: 300,
        protein: 20,
        lemak: -5,
        id_preferensi_rasa: '1'
    });

    await expect(page).toHaveURL(/menus\/create/);

});
