import { Link } from 'react-router'
import { es } from '@/shared/i18n/es'
import { buttonVariants } from '@/shared/ui/button-variants'
import { ScreenLayout } from '@/shared/ui/screen-layout'

// ponytail: plain link until T2.5 accepts the invitation token.
export function InvitePage() {
  return (
    <ScreenLayout title={es.invite.title}>
      <p className="text-muted-foreground">{es.shell.underConstruction}</p>
      <Link to="/teams/example" className={buttonVariants()}>
        {es.invite.join}
      </Link>
    </ScreenLayout>
  )
}
