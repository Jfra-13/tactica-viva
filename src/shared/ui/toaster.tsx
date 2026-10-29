import { useToasts } from './toast-store'

// Mounted once in App. The live region stays in the DOM so screen readers
// announce every toast; it sits above the mobile bottom bar.
export function Toaster() {
  const toasts = useToasts()

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--touch-min)+var(--space-7))] flex flex-col items-center gap-4 px-7"
    >
      {toasts.map((toast) => (
        <p
          key={toast.id}
          className="flex min-h-touch items-center rounded-lg bg-secondary px-7 text-md shadow-sheet"
        >
          {toast.message}
        </p>
      ))}
    </div>
  )
}
