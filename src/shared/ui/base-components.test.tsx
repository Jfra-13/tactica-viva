import { render, screen } from '@testing-library/react'
import { Undo2 } from 'lucide-react'
import { describe, expect, it } from 'vitest'
import { es } from '@/shared/i18n/es'
import { ConnectionBadge } from './connection-badge'
import { IconButton } from './icon-button'
import { PieceAvatar } from './piece-avatar'

describe('IconButton', () => {
  it('exposes its label as the accessible name', () => {
    render(<IconButton icon={Undo2} label="Deshacer" />)
    expect(screen.getByRole('button', { name: 'Deshacer' })).toBeTruthy()
  })
})

describe('ConnectionBadge', () => {
  it.each(['online', 'reconnecting', 'offline'] as const)(
    'states %s in text, not only colour',
    (status) => {
      render(<ConnectionBadge status={status} />)
      expect(screen.getByRole('status').textContent).toBe(es.connection[status])
    },
  )
})

describe('PieceAvatar', () => {
  it('is an image named by its label with the number inside', () => {
    render(<PieceAvatar side="away" number={3} label="Rival 3" />)
    const piece = screen.getByRole('img', { name: 'Rival 3' })
    expect(piece.dataset.side).toBe('away')
    expect(piece.textContent).toBe('3')
  })

  it('shows the emoji with the number in a corner', () => {
    render(<PieceAvatar side="home" number={10} emoji="🦅" label="Local 10" />)
    expect(screen.getByRole('img', { name: 'Local 10' }).textContent).toBe(
      '🦅10',
    )
  })
})
