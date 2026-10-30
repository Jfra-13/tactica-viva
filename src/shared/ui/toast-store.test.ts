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
      showToast('Hola', 1000)
    })
    expect(result.current.map((toast) => toast.message)).toEqual(['Hola'])

    act(() => {
      vi.advanceTimersByTime(1000)
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
