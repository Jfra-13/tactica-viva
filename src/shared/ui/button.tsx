import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'
import { buttonVariants, type ButtonVariantProps } from './button-variants'

type ButtonProps = ComponentProps<'button'> & ButtonVariantProps

export function Button({
  className,
  variant,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      type={type}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}
