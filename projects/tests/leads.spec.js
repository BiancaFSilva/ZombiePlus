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
  await page.getByRole('button', {name: 'Quero entrar na fila!'}).click();
});