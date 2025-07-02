// @ts-check
import { test, expect } from '@playwright/test';

test('should sign in a lead in the waiting list', async ({ page }) => {
  await page.goto('http://localhost:3000');
});