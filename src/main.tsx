import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { App } from '@/app/App'
import { es } from '@/shared/i18n/es'
import { showToast } from '@/shared/ui/toast-store'
import '@/shared/ui/globals.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element #root not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// A new deploy waits until the user accepts it, so nothing reloads mid-play.
const updateServiceWorker = registerSW({
  onNeedRefresh() {
    showToast(es.pwa.updateAvailable, {
      action: {
        label: es.pwa.update,
        onClick: () => {
          void updateServiceWorker()
        },
      },
    })
  },
})
