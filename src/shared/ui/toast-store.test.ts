import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { dismissToast, showToast, useToasts } from './toast-store'

describe('toast store', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runAllTimers()
    vi.useRealTimers()
  })

  it('shows a toast and removes it after its duration', () => {
    const { result } = renderHook(() => useToasts())

    act(() => {
      showToast('Hola', { durationMs: 1000 })
    })
    expect(result.current.map((toast) => toast.message)).toEqual(['Hola'])

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current).toEqual([])
  })

  it('keeps a toast with an action until it is dismissed', () => {
    const { result } = renderHook(() => useToasts())

    let id = 0
    act(() => {
      id = showToast('Nueva versión', {
        action: { label: 'Actualizar', onClick: () => undefined },
      })
      vi.advanceTimersByTime(60_000)
    })
    expect(result.current.map((toast) => toast.message)).toEqual([
      'Nueva versión',
    ])

    act(() => {
      dismissToast(id)
    })
    expect(result.current).toEqual([])
  })

  it('dismisses only the given toast', () => {
    const { result } = renderHook(() => useToasts())

    act(() => {
      const first = showToast('Uno')
      showToast('Dos')
      dismissToast(first)
    })
    expect(result.current.map((toast) => toast.message)).toEqual(['Dos'])
  })
})
