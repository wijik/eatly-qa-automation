class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = '#email';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
  }

  async goto() {
    await this.page.goto('http://localhost:8000/login', {
      waitUntil: 'domcontentloaded'
    });

    if (this.page.url().includes('/dashboard')) {
      return; // sudah login
    }

    await this.page.waitForSelector('input[name="email"]');
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);

    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(this.loginButton)
    ]);
  }
}

module.exports = LoginPage;
