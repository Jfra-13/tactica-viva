import { es } from '@/shared/i18n/es'
import { Skeleton } from '@/shared/ui/skeleton'

// Shown while a lazy route loads on first visit: never a blank screen.
export function RouteSkeleton() {
  return (
    <div aria-busy="true" className="flex h-dvh flex-col">
      <span className="sr-only">{es.common.loading}</span>
      <div className="flex min-h-touch items-center px-7 shadow-header">
        <Skeleton className="w-1/3" />
      </div>
      <div className="flex flex-1 flex-col gap-6 p-7">
        <Skeleton className="w-2/3" />
        <Skeleton className="w-1/2" />
        <Skeleton className="flex-1" />
      </div>
    </div>
  )
}
