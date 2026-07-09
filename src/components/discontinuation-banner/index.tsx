import Link from 'next/link'
import { Icons } from '@/components/icons'
import { appRoutes, platformMigration } from '@/lib/constants'

const DiscontinuationBanner = () => {
  const {
    discontinuationDate,
    bannerMessage: message,
    faqLinkLabel
  } = platformMigration
  const [beforeDate, afterDate = ''] = message.split('{date}')

  return (
    <div
      role="region"
      aria-label="Aviso de descontinuação da Community"
      className="sticky top-0 z-40 w-full border-b-2 border-amber-600 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 text-amber-950 shadow-md selection:bg-amber-900 selection:text-amber-50"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-950/10 ring-1 ring-amber-700/40"
          >
            <Icons.alertTriangle className="h-7 w-7 text-amber-900" />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold leading-snug sm:text-2xl">
              {beforeDate}
              <span className="underline decoration-amber-700 decoration-2 underline-offset-2">
                {discontinuationDate}
              </span>
              {afterDate}
            </p>
            <p className="text-sm font-medium text-amber-900/90 sm:text-base">
              Migre para a nova plataforma e tire suas dúvidas nas perguntas
              frequentes.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <Link
            href={appRoutes.faq}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-950 px-6 py-2.5 text-sm font-semibold text-amber-50 shadow-sm transition-colors hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900 sm:text-base"
          >
            {faqLinkLabel}
            <Icons.arrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DiscontinuationBanner
