import { useState } from 'react'
import { es } from '@/shared/i18n/es'
import { Button } from '@/shared/ui/button'

const text = es.stylesPreview

// T0.2 test page: the base button with the tokens. T1.3 replaces it with /dev/ui.
export function StylesPreview() {
  const [toolActive, setToolActive] = useState(false)

  return (
    <main className="flex min-h-dvh flex-col gap-8 p-7 laptop:p-8">
      <header className="flex flex-col gap-2 pb-7 shadow-header">
        <p className="text-sm text-muted-foreground">{es.appName}</p>
        <h1 className="font-display text-2xl font-medium">{text.title}</h1>
        <p className="text-muted-foreground">{text.intro}</p>
      </header>

      <section aria-labelledby="variants" className="flex flex-col gap-6">
        <h2 id="variants" className="text-lg font-medium">
          {text.variantsTitle}
        </h2>
        <div className="flex flex-wrap gap-6">
          <Button>{text.primary}</Button>
          <Button variant="secondary">{text.secondary}</Button>
          <Button variant="ghost">{text.ghost}</Button>
        </div>
      </section>

      <section aria-labelledby="states" className="flex flex-col gap-6">
        <h2 id="states" className="text-lg font-medium">
          {text.statesTitle}
        </h2>
        <div className="flex flex-wrap gap-6">
          <Button
            variant="ghost"
            aria-pressed={toolActive}
            onClick={() => {
              setToolActive((active) => !active)
            }}
          >
            {text.tool}
          </Button>
          <Button variant="secondary" disabled>
            {text.disabled}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{text.toolHint}</p>
        <p className="text-sm text-muted-foreground">{text.focusHint}</p>
      </section>
    </main>
  )
}
