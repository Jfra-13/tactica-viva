import { Link } from 'react-router'
import { es } from '@/shared/i18n/es'
import { buttonVariants } from '@/shared/ui/button-variants'
import { ScreenLayout } from '@/shared/ui/screen-layout'

export function NotFoundPage() {
  return (
    <ScreenLayout title={es.notFound.title}>
      <Link to="/" className={buttonVariants({ variant: 'secondary' })}>
        {es.notFound.goHome}
      </Link>
    </ScreenLayout>
  )
}
