const { expect } = require('@playwright/test');

export class Login {    
    constructor (page) {
        this.page = page;
    }

    async doLogin (email, password) {
        await this.visitLoginPage();
        await this.submitLoginForm(email, password);
        await this.isLoggedIn();
    }

    async visitLoginPage () {
        await this.page.goto('http://localhost:3000/admin/login');

        const loginForm = this.page.locator('.login-form');
        await expect(loginForm).toBeVisible();
    }

    async submitLoginForm (email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email);
        await this.page.getByPlaceholder('Senha').fill(password);
        await this.page.getByRole('button', {name: 'Entrar'}).click();
    }

    async alertMessage(target) {
        const alert = this.page.locator('span[class$=alert]');
        await expect(alert).toHaveText(target);
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/.*admin/);
    }
}