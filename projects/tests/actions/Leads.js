const { expect } = require('@playwright/test');

export class Leads {    
    constructor (page) {
        this.page = page;
    }

    async visitLandingPage () {
        await this.page.goto('http://localhost:3000');
    }

    async openLeadRegisterModal () {
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
}