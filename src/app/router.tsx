import { createBrowserRouter, type RouteObject } from 'react-router'
import { NotFoundPage } from '@/app/NotFoundPage'
import { RouteErrorPage } from '@/app/RouteErrorPage'
import { LoginPage } from '@/features/auth/LoginPage'
import { InvitePage } from '@/features/teams/InvitePage'
import { TeamPage } from '@/features/teams/TeamPage'
import { TeamsPage } from '@/features/teams/TeamsPage'

// Dev-only pages: the dynamic import is dropped from the production build.
const devRoutes: RouteObject[] = import.meta.env.DEV
  ? [
      {
        path: '/dev/styles',
        lazy: async () => ({
          Component: (await import('@/app/StylesPreview')).StylesPreview,
        }),
      },
    ]
  : []

const routes: RouteObject[] = [
  { path: '/', Component: TeamsPage },
  { path: '/login', Component: LoginPage },
  { path: '/teams/:teamId', Component: TeamPage },
  // The board screens load lazily so Konva never lands in the initial bundle.
  {
    path: '/boards/:boardId',
    lazy: async () => ({
      Component: (await import('@/features/board/EditorPage')).EditorPage,
    }),
  },
  {
    path: '/live/:sessionId',
    lazy: async () => ({
      Component: (await import('@/features/live/LivePage')).LivePage,
    }),
  },
  { path: '/invite/:token', Component: InvitePage },
  ...devRoutes,
  { path: '*', Component: NotFoundPage },
]

// Pathless parent: one error boundary for every screen.
// ponytail: no loading fallback for lazy routes yet; T1.3 brings Skeleton.
export const router = createBrowserRouter([
  { ErrorBoundary: RouteErrorPage, children: routes },
])
