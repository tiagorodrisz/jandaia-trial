import {test, expect} from '@playwright/test';

test('Lista Licenças da API', async ({page}) => {
  await page.goto('/licencas');
  await expect(page.getByRole('heading', {name: 'Licenças'})).toBeVisible();
  await expect(page.locator('li').first()).toBeVisible();
});