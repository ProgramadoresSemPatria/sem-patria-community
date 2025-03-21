import { Icons } from '@/components/icons'
import { type SearchDialogResult } from '@/hooks/search/types'
import { cn } from '@/lib/utils'
import { ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { formatDateText, getEntityColorClass } from './utils'
import { resultComponents } from './ResultComponents'

interface ResultsListProps {
  searchResults: SearchDialogResult[]
}

export const ResultsList = ({ searchResults }: ResultsListProps) => (
  <ComboboxOptions
    static
    as="ul"
    className="p-3 space-y-1 max-h-96 transform-gpu overflow-y-auto py-3 bg-white dark:bg-card"
  >
    {searchResults.map(sResult => {
      const ResultComponent =
        resultComponents[sResult.entity as keyof typeof resultComponents]

      return (
        <ComboboxOption
          key={sResult.id}
          value={sResult}
          as="li"
          className="flex justify-between rounded-lg cursor-pointer select-none items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-muted transition-colors duration-150"
        >
          <div className="flex gap-x-2 overflow-hidden">
            <ResultComponent result={sResult} />
          </div>

          <div className="flex shrink-0 items-center gap-x-2">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <span
                className={cn(
                  'inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 capitalize text-xs font-medium ',
                  'ring-1 ring-inset ring-gray-200 dark:ring-gray-700 text-gray-900 dark:text-white'
                )}
              >
                <svg
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                  className={cn(
                    'w-1.5 h-1.5 flex-shrink-0',
                    getEntityColorClass(sResult.entity)
                  )}
                >
                  <circle r={3} cx={3} cy={3} />
                </svg>
                {sResult.entity}
              </span>

              <p className="mt-1 text-xs/5 text-gray-500 dark:text-gray-400">
                {formatDateText(sResult.entity, sResult.createdAt)}
              </p>
            </div>

            <div className="relative flex-none text-gray-500">
              <button type="button" className="-m-2.5 block p-2.5">
                <span className="sr-only">Open record</span>
                <Icons.arrowRight aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ComboboxOption>
      )
    })}
  </ComboboxOptions>
)
