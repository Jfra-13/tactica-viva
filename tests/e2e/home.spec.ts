import { expect, test } from '@playwright/test'
import { es } from '../../src/shared/i18n/es.ts'

test('home page renders and the tool button toggles', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  const tool = page.getByRole('button', { name: es.stylesPreview.tool })
  await expect(tool).toHaveAttribute('aria-pressed', 'false')
  await tool.tap()
  await expect(tool).toHaveAttribute('aria-pressed', 'true')
})
