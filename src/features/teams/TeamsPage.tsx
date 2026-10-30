import { Link } from 'react-router'
import { es } from '@/shared/i18n/es'
import { buttonVariants } from '@/shared/ui/button-variants'
import { ScreenLayout } from '@/shared/ui/screen-layout'

// ponytail: example link until T2.3 lists real teams.
export function TeamsPage() {
  return (
    <ScreenLayout title={es.teams.title}>
      <p className="text-muted-foreground">{es.teams.empty}</p>
      <Link
        to="/teams/example"
        className={buttonVariants({ variant: 'secondary' })}
      >
        {es.teams.exampleTeam}
      </Link>
    </ScreenLayout>
  )
}
