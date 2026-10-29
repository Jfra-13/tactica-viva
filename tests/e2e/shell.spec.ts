import { expect, test, type Page } from '@playwright/test'
import { es } from '../../src/shared/i18n/es.ts'

const screens = [
  { path: '/login', title: es.login.title },
  { path: '/', title: es.teams.title },
  { path: '/teams/example', title: es.team.title },
  { path: '/boards/example', title: es.editor.title },
  { path: '/live/example', title: es.live.title },
  { path: '/invite/example', title: es.invite.title },
  { path: '/nope', title: es.notFound.title },
]

const widths = [375, 768, 1280]

async function expectNoHorizontalScroll(page: Page) {
  // A string runs in the browser; the e2e tsconfig has no DOM types.
  const overflow = await page.evaluate<number>(
    'document.documentElement.scrollWidth - window.innerWidth',
  )
  expect(overflow).toBeLessThanOrEqual(0)
}

for (const width of widths) {
  test(`every screen renders at ${String(width)} px without horizontal scroll`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 812 })
    for (const screen of screens) {
      await page.goto(screen.path)
      await expect(
        page.getByRole('heading', { level: 1, name: screen.title }),
      ).toBeVisible()
      await expectNoHorizontalScroll(page)
    }
  })
}

test('editor shows the bottom bar on mobile and panels on larger screens', async ({
  page,
}) => {
  const tools = page.getByText(es.editor.tools)
  const library = page.getByText(es.editor.library)
  const properties = page.getByText(es.editor.properties)

  await page.goto('/boards/example')
  await expect(tools).toBeVisible()
  await expect(library).toBeHidden()
  await expect(properties).toBeHidden()

  await page.setViewportSize({ width: 768, height: 1024 })
  await expect(tools).toBeHidden()
  await expect(library).toBeVisible()
  await expect(properties).toBeHidden()

  await page.setViewportSize({ width: 1280, height: 800 })
  await expect(library).toBeVisible()
  await expect(properties).toBeVisible()
})

test('live room keeps its bottom bar on tablet (no panel replaces it)', async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto('/live/example')
  await expect(page.getByText(es.live.actions)).toBeVisible()
})

test('a failed lazy chunk shows the error screen', async ({ page }) => {
  await page.goto('/')
  await page.route('**/assets/EditorPage-*.js', (route) => route.abort())
  await page.getByRole('link', { name: es.teams.exampleTeam }).tap()
  await page.getByRole('link', { name: es.team.exampleBoard }).tap()
  await expect(
    page.getByRole('heading', { level: 1, name: es.routeError.title }),
  ).toBeVisible()
})

test('navigates from sign-in to the editor and back', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('link', { name: es.login.enter }).tap()
  await page.getByRole('link', { name: es.teams.exampleTeam }).tap()
  await page.getByRole('link', { name: es.team.exampleBoard }).tap()
  await expect(
    page.getByRole('heading', { level: 1, name: es.editor.title }),
  ).toBeVisible()

  await page.getByRole('link', { name: es.shell.back }).tap()
  await expect(
    page.getByRole('heading', { level: 1, name: es.team.title }),
  ).toBeVisible()
})
