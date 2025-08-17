const { expect } = require('@playwright/test');

export class Toast {
    constructor(page) {
        this.page = page;
    }

    async Message (message) {
        const toast = this.page.locator('.toast');
    
        await expect(toast).toContainText(message);
        await expect(toast).toBeHidden({timeout: 10000});
    }
}

export class Alert {
    constructor(page) {
        this.page = page;
    }   
    async Message (target) {
        const alert = this.page.locator('.alert');  

        await expect(alert).toHaveText(target, {timeout: 10000});
    }
}