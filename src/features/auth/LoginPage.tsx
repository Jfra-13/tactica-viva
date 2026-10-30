import { Link } from 'react-router'
import { es } from '@/shared/i18n/es'
import { buttonVariants } from '@/shared/ui/button-variants'
import { ScreenLayout } from '@/shared/ui/screen-layout'

// ponytail: plain link until T2.2 adds Google and email sign-in.
export function LoginPage() {
  return (
    <ScreenLayout title={es.login.title}>
      <p className="text-muted-foreground">{es.shell.underConstruction}</p>
      <Link to="/" className={buttonVariants()}>
        {es.login.enter}
      </Link>
    </ScreenLayout>
  )
}
