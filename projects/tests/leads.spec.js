// @ts-check
import { test, expect } from '@playwright/test';

test('should sign in a lead in the waiting list', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click();

  await page.waitForTimeout(10000);
});