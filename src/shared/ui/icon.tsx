import type { LucideIcon, LucideProps } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface IconProps extends LucideProps {
  icon: LucideIcon
}

// Every lucide icon goes through here so it gets the D-014 stroke tokens.
// Decorative by default: the control around it carries the accessible name.
export function Icon({ icon: Glyph, className, ...props }: IconProps) {
  return (
    <Glyph
      aria-hidden="true"
      className={cn('size-icon-md shrink-0 icon-stroke', className)}
      {...props}
    />
  )
}
