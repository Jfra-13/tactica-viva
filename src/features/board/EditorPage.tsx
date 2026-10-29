import { es } from '@/shared/i18n/es'
import { ScreenLayout } from '@/shared/ui/screen-layout'

const text = es.editor

// Lazy-loaded route: the board and Konva stay out of the initial bundle.
export function EditorPage() {
  return (
    <ScreenLayout
      title={text.title}
      backTo="/teams/example"
      leftPanel={<p className="text-muted-foreground">{text.library}</p>}
      rightPanel={<p className="text-muted-foreground">{text.properties}</p>}
      bottomBar={<p className="text-muted-foreground">{text.tools}</p>}
    >
      <p className="text-muted-foreground">{text.pitch}</p>
    </ScreenLayout>
  )
}
