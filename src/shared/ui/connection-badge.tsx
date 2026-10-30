import { es } from '@/shared/i18n/es'
import { cn } from '@/shared/lib/utils'

export type ConnectionStatus = 'online' | 'reconnecting' | 'offline'

// Never colour alone: the text says the state and the dot changes shape
// (reconnecting is a ring). Offline uses --color-warning, not danger (tokens.css).
const dotClass: Record<ConnectionStatus, string> = {
  online: 'bg-success',
  reconnecting: 'shadow-[inset_0_0_0_var(--space-1)_var(--color-warning)]',
  offline: 'bg-warning',
}

export function ConnectionBadge({ status }: { status: ConnectionStatus }) {
  return (
    <span
      role="status"
      className="inline-flex items-center gap-3 text-sm text-muted-foreground"
    >
      <span
        aria-hidden="true"
        className={cn('size-(--dot-size) rounded-pill', dotClass[status])}
      />
      {es.connection[status]}
    </span>
  )
}
