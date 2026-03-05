class MenuPage {
    constructor(page) {
        this.page = page;

        this.addButton = 'a:has-text("Tambah")';

        this.gambarInput = 'input[name="gambar"]';
        this.namaMenuInput = 'input[name="nama_menu"]';
        this.deskripsiInput = 'textarea[name="deskripsi"]';
        this.kaloriInput = 'input[name="kalori"]';
        this.proteinInput = 'input[name="protein"]';
        this.lemakInput = 'input[name="lemak"]';
        this.rasaSelect = 'select[name="id_preferensi_rasa"]';

        this.submitButton = 'button[type="submit"]';
        this.deleteButton = 'button:has-text("Delete")';
    }

    async goto() {
        await this.page.goto('http://localhost:8000/admin/menus', {
            waitUntil: 'domcontentloaded'
        });

        await this.page.waitForSelector('table');
    }

    async createMenu(data) {
        await this.page.click(this.addButton);

        if (data.gambar) {
            await this.page.setInputFiles('input[name="gambar"]', data.gambar);
        }
        await this.page.fill(this.namaMenuInput, data.nama_menu);
        await this.page.fill(this.deskripsiInput, data.deskripsi);
        if (data.kalori !== '') {
            await this.page.fill('input[name="kalori"]', String(data.kalori));
        }

        if (data.protein !== '') {
            await this.page.fill('input[name="protein"]', String(data.protein));
        }

        if (data.lemak !== '') {
            await this.page.fill('input[name="lemak"]', String(data.lemak));
        }

        if (data.id_preferensi_rasa) {
            await this.page.selectOption('select[name="id_preferensi_rasa"]', data.id_preferensi_rasa);
        }

        await this.page.click(this.submitButton);
    }

    async openEditPage(idMenu) {
        await this.page.goto(`http://localhost:8000/admin/menus/${idMenu}/edit`, {
            waitUntil: 'domcontentloaded'
        });

        await this.page.waitForSelector(this.kaloriInput);
    }

    async updateMenu(data) {
        if (data.gambar !== undefined)
            await this.page.setInputFiles(this.gambarInput, data.gambar);

        if (data.nama_menu !== undefined)
            await this.page.fill(this.namaMenuInput, String(data.nama_menu));

        if (data.kalori !== undefined)
            await this.page.fill(this.kaloriInput, String(data.kalori));

        await this.page.click(this.submitButton);

        await this.page.waitForSelector('table');
    }

    async deleteMenu(idMenu) {
        const currentUrl = this.page.url();
        if (!currentUrl.includes('/admin/menus')) {
            throw new Error(
                `Delete menu hanya boleh dilakukan di halaman /admin/menus. Current URL: ${currentUrl}`
            );
        }

        const row = this.page.locator(`tr[data-id="${idMenu}"]`);
        const deleteButton = row.locator('button:has-text("Delete")');

        await row.waitFor({ state: 'visible', timeout: 10000 });
        await deleteButton.waitFor({ state: 'visible', timeout: 10000 });

        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await deleteButton.click();

    }
}

module.exports = MenuPage;
