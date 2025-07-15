const { expect } = require('@playwright/test');

export class LandingPage {
    
    constructor (page) {
        this.page = page;
    }

    async visit () {
        await this.page.goto('http://localhost:3000');
    }

    async openLeadModal () {
        await this.page.getByRole('button', {name: /Aperte o play/}).click();
        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera');
    }

    async submitLeadForm (leadName, leadEmail) {
        await this.page.locator('input[name=name]').fill(leadName)
        await this.page.locator('input[name=email]').fill(leadEmail)
        await this.page.getByTestId('modal')
            .getByRole('button', {name: 'Quero entrar na fila!'}).click();
    }

    async toastMessage (message) {
        const toast = this.page.locator('.toast');

        await expect(toast).toHaveText(message);
        await expect(toast).toBeHidden({timeout: 8000});
    }

    async alertMessage (target) {
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
}