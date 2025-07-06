// @ts-check
import { test, expect } from '@playwright/test';

test('should sign in a lead in the waiting list', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:3000');
  await page.getByRole('button', {name: /Aperte o play/}).click();
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  // Act
  await page.locator('input[name=name]').fill('Nome Completo')
  await page.locator('input[name=email]').fill('email@exemplo.com')
  await page.getByTestId('modal')
    .getByRole('button', {name: 'Quero entrar na fila!'}).click();

  // Assert
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await expect(await page.locator('.toast')).toHaveText(message);
  await expect(await page.locator('.toast')).toBeHidden({timeout: 5000});
});