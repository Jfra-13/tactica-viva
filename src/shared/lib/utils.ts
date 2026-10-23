import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Theme keys from src/shared/ui/globals.css that tailwind-merge cannot guess.
// Without them, `rounded-control rounded-pill` keeps both classes, and
// `font-regular` is read as a font family and drops `font-ui`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: ['touch', 'icon-sm', 'icon-md'],
      radius: ['pill', 'control'],
      shadow: ['control', 'sheet', 'header', 'bar', 'tool-active'],
      'font-weight': ['regular'],
      ease: ['standard', 'exit', 'move'],
    },
  },
})

// shadcn/ui helper: joins conditional classes and lets the last conflicting one win.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
