import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { es } from '@/shared/i18n/es'
import { IconButton } from './icon-button'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

// Native <dialog>: focus trap, Esc and backdrop come from the browser.
// Bottom sheet on mobile, centered panel from tablet up. Closes with Esc,
// the close button or a tap on the backdrop.
// ponytail: no drag-to-dismiss; add it if the editor sheet (T3.4) needs it.
export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        // A click on the dialog itself (not its content) is the backdrop.
        if (event.target === event.currentTarget) onClose()
      }}
      className={[
        'mx-auto mt-auto mb-0 w-full max-w-full rounded-t-lg bg-card text-foreground shadow-sheet backdrop:bg-scrim',
        'tablet:m-auto tablet:w-(--sheet-w) tablet:rounded-lg',
        // Slide in from the bottom; Safari without allow-discrete just closes.
        'translate-y-full open:translate-y-0 starting:open:translate-y-full tablet:translate-y-0',
        'transition-[translate,overlay,display] transition-discrete duration-(--duration-sheet-in) ease-standard',
        'not-open:duration-(--duration-sheet-out) not-open:ease-exit motion-reduce:transition-none',
      ].join(' ')}
    >
      <div className="flex flex-col gap-6 px-7 pt-4 pb-8">
        <span
          aria-hidden="true"
          className="mx-auto h-(--sheet-handle-h) w-(--sheet-handle-w) rounded-pill bg-border tablet:hidden"
        />
        <header className="flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-lg font-medium">
            {title}
          </h2>
          <IconButton icon={X} label={es.common.close} onClick={onClose} />
        </header>
        {children}
      </div>
    </dialog>
  )
}
