import Link from 'next/link'
import { Icons } from '@/components/icons'
import { appRoutes, platformMigration } from '@/lib/constants'

const MigrationCard = () => {
  const { faqLinkLabel } = platformMigration

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-amber-400 bg-amber-100 p-3 text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/15 dark:text-amber-100">
      <div className="flex items-center gap-2">
        <Icons.alertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="text-xs font-semibold leading-tight">
          Migração da Community
        </p>
      </div>
      <p className="text-xs leading-snug text-amber-900/90 dark:text-amber-100/80">
        A Community será descontinuada em breve. Veja o que você precisa fazer.
      </p>
      <Link
        href={appRoutes.faq}
        className="inline-flex items-center justify-center gap-1.5 rounded-md bg-amber-950 px-3 py-1.5 text-xs font-semibold text-amber-50 transition-colors hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900"
      >
        {faqLinkLabel}
        <Icons.arrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  )
}

export default MigrationCard
