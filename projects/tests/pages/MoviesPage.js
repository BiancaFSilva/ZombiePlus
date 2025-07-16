const { expect } = require('@playwright/test');

export class MoviesPage {
    constructor(page) {
        this.page = page;
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/.*admin/);
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/movies');
    }
}