import { expect, test } from '@playwright/test'
import { es } from '../../src/shared/i18n/es.ts'

test('is installable and opens offline from the service worker cache', async ({
  page,
  context,
}) => {
  await page.goto('/')

  const manifest = await page.request.get('/manifest.webmanifest')
  expect(manifest.ok()).toBe(true)
  await expect(page.locator('link[rel="manifest"]')).toHaveCount(1)

  // Strings run in the browser; the e2e tsconfig has no DOM types.
  await page.evaluate('navigator.serviceWorker.ready')

  await context.setOffline(true)
  await page.reload()
  await expect(
    page.getByRole('heading', { level: 1, name: es.teams.title }),
  ).toBeVisible()

  // Lazy chunks are precached too.
  await page.goto('/boards/example')
  await expect(
    page.getByRole('heading', { level: 1, name: es.editor.title }),
  ).toBeVisible()
})
