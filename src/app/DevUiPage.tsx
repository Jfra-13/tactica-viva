import { useState, type ReactNode } from 'react'
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Check,
  ChevronLeft,
  Ellipsis,
  Hand,
  Pencil,
  Play,
  Plus,
  Redo2,
  Undo2,
  Users,
  X,
} from 'lucide-react'
import { es } from '@/shared/i18n/es'
import { BottomSheet } from '@/shared/ui/bottom-sheet'
import { Button } from '@/shared/ui/button'
import { ConnectionBadge } from '@/shared/ui/connection-badge'
import { EmptyState } from '@/shared/ui/empty-state'
import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'
import { PieceAvatar } from '@/shared/ui/piece-avatar'
import { ScreenLayout } from '@/shared/ui/screen-layout'
import { Skeleton } from '@/shared/ui/skeleton'
import { showToast } from '@/shared/ui/toast-store'

const text = es.devUi

// Sharp joins and caps on purpose: D-014 is validated against these.
const sampleIcons = [
  ChevronLeft,
  Check,
  X,
  Undo2,
  Redo2,
  Play,
  Plus,
  ArrowUp,
  ArrowDown,
  Pencil,
  Hand,
  Users,
  BookOpen,
  Ellipsis,
]

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-6 pb-7 shadow-header">
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </section>
  )
}

// Dev-only gallery (/dev/ui): every base component in each of its states.
export function DevUiPage() {
  const [toolActive, setToolActive] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <ScreenLayout title={text.title}>
      <Section title={text.buttons}>
        <Button>{text.primary}</Button>
        <Button variant="secondary">{text.secondary}</Button>
        <Button variant="ghost">{text.ghost}</Button>
        <Button
          variant="ghost"
          aria-pressed={toolActive}
          onClick={() => {
            setToolActive((active) => !active)
          }}
        >
          {text.tool}
        </Button>
        <Button variant="secondary" disabled>
          {text.disabled}
        </Button>
      </Section>

      <Section title={text.icons}>
        {sampleIcons.map((glyph, index) => (
          // Static list: the index is a stable key.
          <Icon key={index} icon={glyph} />
        ))}
        <p className="w-full text-sm text-muted-foreground">{text.iconsHint}</p>
      </Section>

      <Section title={text.iconButtons}>
        <IconButton icon={Undo2} label={text.undo} />
        <IconButton icon={Pencil} label={text.draw} aria-pressed="true" />
        <IconButton icon={Ellipsis} label={text.more} variant="secondary" />
        <IconButton icon={Redo2} label={text.undo} disabled />
      </Section>

      <Section title={text.pieces}>
        <PieceAvatar side="home" number={7} label={text.pieceHome} />
        <PieceAvatar side="away" number={3} label={text.pieceAway} />
        <PieceAvatar
          side="home"
          number={10}
          emoji="🦅"
          label={text.pieceEmoji}
        />
        <PieceAvatar
          side="home"
          number={9}
          selected
          label={text.pieceSelected}
        />
      </Section>

      <Section title={text.connection}>
        <ConnectionBadge status="online" />
        <ConnectionBadge status="reconnecting" />
        <ConnectionBadge status="offline" />
      </Section>

      <Section title={text.skeleton}>
        <div className="flex w-full flex-col gap-4">
          <Skeleton className="w-2/3" />
          <Skeleton className="w-1/2" />
        </div>
      </Section>

      <Section title={text.emptyState}>
        <EmptyState
          icon={BookOpen}
          title={text.emptyTitle}
          description={text.emptyDescription}
          action={<Button>{text.emptyAction}</Button>}
        />
      </Section>

      <Section title={text.feedback}>
        <Button
          variant="secondary"
          onClick={() => showToast(text.toastMessage)}
        >
          {text.showToast}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setSheetOpen(true)
          }}
        >
          {text.openSheet}
        </Button>
      </Section>

      <BottomSheet
        open={sheetOpen}
        onClose={() => {
          setSheetOpen(false)
        }}
        title={text.sheetTitle}
      >
        <p className="text-muted-foreground">{text.sheetBody}</p>
      </BottomSheet>
    </ScreenLayout>
  )
}
