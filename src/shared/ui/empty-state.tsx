import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from './icon'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  // One action that resolves the empty state (docs/04-ui-ux.md).
  action?: ReactNode
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-6 p-8 text-center">
      <span className="flex size-touch items-center justify-center rounded-control bg-control shadow-control">
        <Icon icon={icon} className="text-muted-foreground" />
      </span>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
