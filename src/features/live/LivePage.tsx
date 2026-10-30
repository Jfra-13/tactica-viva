import { es } from '@/shared/i18n/es'
import { ScreenLayout } from '@/shared/ui/screen-layout'

// Lazy-loaded route, like the editor: it will render the board too.
export function LivePage() {
  return (
    <ScreenLayout
      title={es.live.title}
      backTo="/"
      bottomBar={<p className="text-muted-foreground">{es.live.actions}</p>}
    >
      <p className="text-muted-foreground">{es.live.pitch}</p>
    </ScreenLayout>
  )
}
