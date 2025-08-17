const { expect } = require('@playwright/test');

export class Movies {
    constructor(page) {
        this.page = page;
    }

    async openMovieRegisterForm() {
        await this.page.locator('a[href$="/register"]').click();
    }

    async submitMovieForm() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    }

    async createMovie (title, overview, company, releaseYear) {
        await this.openMovieRegisterForm();

        await this.page.getByLabel('Titulo do filme').fill(title);
        await this.page.getByLabel('Sinopse').fill(overview);

        await this.page.locator('#select_company_id .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({ hasText: company }).click();

        await this.page.locator('#select_year .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({ hasText: releaseYear }).click();

        await this.submitMovieForm();
    }
}