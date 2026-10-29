import { cn } from '@/shared/lib/utils'

interface PieceAvatarProps {
  side: 'home' | 'away'
  number?: number
  emoji?: string
  selected?: boolean
  // Accessible name, e.g. "Juan, 7": the visual is a shape, not text.
  label: string
}

// HTML piece for lists and sheets; the pitch draws its own with Konva.
// Home is a filled circle, away a thick ring: never colour alone.
// ponytail: emoji only; the colour dot waits for player colours in the roster.
export function PieceAvatar({
  side,
  number,
  emoji,
  selected = false,
  label,
}: PieceAvatarProps) {
  return (
    <span
      role="img"
      aria-label={label}
      data-side={side}
      className={cn(
        'relative inline-flex size-(--piece-size) shrink-0 items-center justify-center rounded-pill font-numeric text-sm font-bold',
        'transition-transform duration-(--duration-fast)',
        side === 'home'
          ? 'bg-(--color-home) text-(--color-on-home) [border:var(--piece-border)]'
          : 'text-(--color-away) [border:var(--piece-away-border)]',
        selected &&
          'scale-(--selected-scale) [outline:var(--selection-ring)] outline-offset-(--space-1)',
      )}
    >
      {emoji ? (
        <>
          <span className="text-lg" aria-hidden="true">
            {emoji}
          </span>
          {number !== undefined && (
            <span
              aria-hidden="true"
              className="absolute -right-3 -bottom-3 rounded-pill bg-card px-2 text-xs text-foreground"
            >
              {number}
            </span>
          )}
        </>
      ) : (
        <span aria-hidden="true">{number}</span>
      )}
    </span>
  )
}
