export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = 'a[onclick*="logout-form"]';
  }

  async logout() {
    await this.page.click(this.logoutButton);
  }
}
