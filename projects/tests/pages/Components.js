const { expect } = require('@playwright/test');

export class Toast {
    constructor(page) {
        this.page = page;
    }

    async Message (message) {
        const toast = this.page.locator('.toast');
    
        await expect(toast).toHaveText(message);
        await expect(toast).toBeHidden({timeout: 8000});
    }
}