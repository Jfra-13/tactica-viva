import { Button } from './button'
import { dismissToast, useToasts } from './toast-store'

// Mounted once in App. The live region stays in the DOM so screen readers
// announce every toast; it sits above the mobile bottom bar and the home indicator.
export function Toaster() {
  const toasts = useToasts()

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--touch-min)+var(--space-7)+env(safe-area-inset-bottom))] flex flex-col items-center gap-4 px-7"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex min-h-touch items-center gap-4 rounded-lg bg-secondary pl-7 text-md shadow-sheet"
        >
          <p className={toast.action ? '' : 'pr-7'}>{toast.message}</p>
          {toast.action && (
            <Button
              variant="ghost"
              className="text-primary"
              onClick={() => {
                dismissToast(toast.id)
                toast.action?.onClick()
              }}
            >
              {toast.action.label}
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
