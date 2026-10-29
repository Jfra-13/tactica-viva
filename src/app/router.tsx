import { createBrowserRouter, type RouteObject } from 'react-router'
import { NotFoundPage } from '@/app/NotFoundPage'
import { RouteErrorPage } from '@/app/RouteErrorPage'
import { RouteSkeleton } from '@/app/RouteSkeleton'
import { LoginPage } from '@/features/auth/LoginPage'
import { InvitePage } from '@/features/teams/InvitePage'
import { TeamPage } from '@/features/teams/TeamPage'
import { TeamsPage } from '@/features/teams/TeamsPage'

// Dev-only pages: the dynamic import is dropped from the production build.
const devRoutes: RouteObject[] = import.meta.env.DEV
  ? [
      {
        path: '/dev/ui',
        lazy: async () => ({
          Component: (await import('@/app/DevUiPage')).DevUiPage,
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

// Pathless parent: one error boundary and one loading fallback for every
// screen. HydrateFallback only shows on first load; in-app navigation keeps
// the current screen until the next one is ready.
export const router = createBrowserRouter([
  {
    ErrorBoundary: RouteErrorPage,
    HydrateFallback: RouteSkeleton,
    children: routes,
  },
])
