import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'

// ponytail: static block, no pulse; the flat direction (D-012) has no animation
// token for it. Add one to tokens.css if loading ever feels frozen.
export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      className={cn('h-(--skeleton-line) rounded-md bg-skeleton', className)}
      {...props}
    />
  )
}
