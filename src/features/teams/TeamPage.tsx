import { Link } from 'react-router'
import { es } from '@/shared/i18n/es'
import { buttonVariants } from '@/shared/ui/button-variants'
import { ScreenLayout } from '@/shared/ui/screen-layout'

const linkClass = buttonVariants({ variant: 'secondary' })

// ponytail: example links until the team tabs (boards, roster, settings) exist.
export function TeamPage() {
  return (
    <ScreenLayout title={es.team.title} backTo="/">
      <p className="text-muted-foreground">{es.shell.underConstruction}</p>
      <Link to="/boards/example" className={linkClass}>
        {es.team.exampleBoard}
      </Link>
      <Link to="/live/example" className={linkClass}>
        {es.team.exampleLive}
      </Link>
    </ScreenLayout>
  )
}
