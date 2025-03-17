import { Icons } from '@/components/icons'
import { type SearchDialogResult } from '@/hooks/search/types'
import { cn } from '@/lib/utils'
import { ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { format } from 'date-fns'
import Image from 'next/image'

interface ResultsListProps {
  searchResults: SearchDialogResult[]
}

interface ResultProps {
  result: SearchDialogResult
}

const ForumResult = ({ result }: ResultProps) => (
  <>
    <div
      id="entity-icon"
      className="flex flex-shrink-0 items-center justify-center rounded-lg mr-2 w-12 h-12 bg-indigo-500"
    >
      <Icons.forum className="w-6 h-6 text-white" aria-hidden="true" />
    </div>
    <div id="title" className="min-w-0 flex-auto overflow-hidden">
      <p className="truncate capitalize font-medium text-gray-900 dark:text-gray-100">
        {result.title}
      </p>
      <div className="mt-0.5 flex items-center gap-x-2 text-xs/5 text-gray-500 dark:text-gray-400">
        <p className="truncate">
          Posted by <strong>@{result.user?.username}</strong> in{' '}
          <strong>{result.category?.name}</strong>
        </p>
        {!result._count?.likes ||
          (result._count?.likes > 0 && (
            <>
              <svg
                viewBox="0 0 2 2"
                className="flex-shrink-0 w-0.5 h-0.5 fill-current"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="flex items-center gap-x-1 text-xs/5 text-gray-500 dark:text-gray-400">
                <Icons.upVote className="w-3.5 h-3.5" />
                {result._count?.likes}
              </div>
            </>
          ))}
      </div>
    </div>
  </>
)

const UserResult = ({ result }: ResultProps) => (
  <>
    <div
      id="entity-icon"
      className="flex flex-shrink-0 items-center justify-center rounded-lg mr-2 w-12 h-12 bg-purple-500"
    >
      {result.imageUrl ? (
        <Image
          alt="User avatar"
          className="rounded-lg"
          width={500}
          height={500}
          src={result.imageUrl}
        />
      ) : (
        <Icons.user className="w-6 h-6 text-white" aria-hidden="true" />
      )}
    </div>
    <div id="title" className="min-w-0 flex-auto overflow-hidden">
      <p className="truncate capitalize font-medium text-gray-900 dark:text-gray-100">
        {result.name}
      </p>
      <div className="mt-0.5 flex items-center gap-x-2 text-xs/5 text-gray-500 dark:text-gray-400">
        <p className="truncate">
          <strong>@{result.username}</strong>
        </p>
        <svg
          viewBox="0 0 2 2"
          className="flex-shrink-0 w-0.5 h-0.5 fill-current"
        >
          <circle r={1} cx={1} cy={1} />
        </svg>
        <p className="truncate text-xs/5 text-gray-500 dark:text-gray-400">
          {result.followers} followers
        </p>
      </div>
    </div>
  </>
)

type ResultComponentMap = {
  [K in SearchDialogResult['entity']]: React.FC<{ result: SearchDialogResult }>
}

const resultComponents: ResultComponentMap = {
  forum: ForumResult,
  user: UserResult
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
          <div className="flex gap-x-4 overflow-hidden">
            <ResultComponent result={sResult} />
          </div>

          <div className="flex shrink-0 items-center gap-x-4">
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
                    sResult.entity === 'forum' &&
                      'fill-indigo-500 dark:fill-indigo-400',
                    sResult.entity === 'user' &&
                      'fill-blue-500 dark:fill-blue-400'
                  )}
                >
                  <circle r={3} cx={3} cy={3} />
                </svg>
                {sResult.entity}
              </span>

              <p className="mt-1 text-xs/5 text-gray-500 dark:text-gray-400">
                {sResult.entity === 'forum' ? 'Posted' : 'Joined'} on{' '}
                {format(new Date(sResult.createdAt), 'MMM dd, yyyy')}
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
