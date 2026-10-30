import { RouterProvider } from 'react-router/dom'
import { router } from '@/app/router'
import { Toaster } from '@/shared/ui/toaster'

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}
