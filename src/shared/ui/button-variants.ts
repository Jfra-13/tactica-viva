import { cva, type VariantProps } from 'class-variance-authority'

// Adapted from shadcn/ui (new-york) to tokens.css. Kept apart from button.tsx
// so that file only exports components (react-refresh).
// aria-pressed is the active tool: a solid fill, never a tint (D-012).
export const buttonVariants = cva(
  [
    'inline-flex min-h-touch min-w-touch shrink-0 items-center justify-center gap-4 px-7',
    'rounded-control font-ui text-md font-medium whitespace-nowrap select-none',
    'transition-colors focus-visible:focus-ring',
    'disabled:pointer-events-none disabled:opacity-(--disabled-opacity)',
    'aria-pressed:bg-tool-active aria-pressed:text-tool-active-foreground aria-pressed:shadow-tool-active',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-icon-md",
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground active:bg-foreground active:text-background',
        secondary:
          'bg-control text-foreground shadow-control hover:bg-secondary active:bg-secondary',
        ghost: 'text-foreground hover:bg-secondary active:bg-secondary',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
