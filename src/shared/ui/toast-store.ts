import { useSyncExternalStore } from 'react'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface Toast {
  id: number
  message: string
  action?: ToastAction
}

interface ShowToastOptions {
  durationMs?: number
  // A toast with an action stays until the action is used.
  action?: ToastAction
}

const DEFAULT_DURATION_MS = 3000

// Module-level store: any code (hooks, realtime handlers) can raise a toast
// without a provider. Kept apart from toaster.tsx for react-refresh.
let toasts: readonly Toast[] = []
let nextId = 1
const listeners = new Set<() => void>()

function emit(next: readonly Toast[]) {
  toasts = next
  for (const listener of listeners) listener()
}

export function dismissToast(id: number) {
  emit(toasts.filter((toast) => toast.id !== id))
}

export function showToast(
  message: string,
  { durationMs = DEFAULT_DURATION_MS, action }: ShowToastOptions = {},
) {
  const id = nextId++
  emit([...toasts, { id, message, action }])
  if (!action) {
    setTimeout(() => {
      dismissToast(id)
    }, durationMs)
  }
  return id
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useToasts(): readonly Toast[] {
  return useSyncExternalStore(subscribe, () => toasts)
}
