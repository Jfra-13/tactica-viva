import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { es } from '@/shared/i18n/es'
import { cn } from '@/shared/lib/utils'

interface ScreenLayoutProps {
  title: string
  backTo?: string
  leftPanel?: ReactNode
  rightPanel?: ReactNode
  bottomBar?: ReactNode
  children: ReactNode
}

// Screen shell (docs/04-ui-ux.md): bottom bar on mobile; left panel from tablet,
// right panel from laptop. Plain CSS breakpoints, so resizing never re-renders.
export function ScreenLayout({
  title,
  backTo,
  leftPanel,
  rightPanel,
  bottomBar,
  children,
}: ScreenLayoutProps) {
  return (
    <div className="flex h-dvh flex-col">
      <header className="flex min-h-touch shrink-0 items-center gap-4 px-4 shadow-header">
        {backTo && (
          <Link
            to={backTo}
            aria-label={es.shell.back}
            className="flex size-touch items-center justify-center rounded-control focus-visible:focus-ring"
          >
            <span aria-hidden="true">←</span>
          </Link>
        )}
        <h1 className="truncate px-4 font-display text-lg font-medium">
          {title}
        </h1>
      </header>

      <div className="flex min-h-0 flex-1">
        {leftPanel && (
          <aside className="hidden w-(--panel-w) shrink-0 flex-col gap-6 overflow-y-auto border-r p-7 tablet:flex">
            {leftPanel}
          </aside>
        )}
        <main className="flex min-w-0 flex-1 flex-col gap-7 overflow-y-auto p-7">
          {children}
        </main>
        {rightPanel && (
          <aside className="hidden w-(--panel-w) shrink-0 flex-col gap-6 overflow-y-auto border-l p-7 laptop:flex">
            {rightPanel}
          </aside>
        )}
      </div>

      {bottomBar && (
        <div
          className={cn(
            // The safe area keeps it clear of the iPhone home indicator.
            'flex min-h-touch shrink-0 items-center justify-around gap-4 px-4 pb-[env(safe-area-inset-bottom)] shadow-bar',
            // The left panel takes over the bar's tools from tablet up.
            leftPanel && 'tablet:hidden',
          )}
        >
          {bottomBar}
        </div>
      )}
    </div>
  )
}
