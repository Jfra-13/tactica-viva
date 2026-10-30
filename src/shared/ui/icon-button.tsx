import type { ComponentProps } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Button } from './button'
import { Icon } from './icon'

type IconButtonProps = Omit<
  ComponentProps<typeof Button>,
  'children' | 'aria-label'
> & {
  icon: LucideIcon
  // Required: an icon alone has no accessible name.
  label: string
}

export function IconButton({
  icon,
  label,
  variant = 'ghost',
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      aria-label={label}
      title={label}
      className={cn('px-0', className)}
      {...props}
    >
      <Icon icon={icon} />
    </Button>
  )
}
