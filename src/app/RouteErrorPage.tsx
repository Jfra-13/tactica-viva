import { es } from '@/shared/i18n/es'
import { Button } from '@/shared/ui/button'
import { ScreenLayout } from '@/shared/ui/screen-layout'

// Catches render errors and failed lazy chunks (e.g. offline or a new deploy).
export function RouteErrorPage() {
  return (
    <ScreenLayout title={es.routeError.title}>
      <p className="text-muted-foreground">{es.routeError.message}</p>
      <Button
        onClick={() => {
          window.location.reload()
        }}
      >
        {es.routeError.reload}
      </Button>
    </ScreenLayout>
  )
}
