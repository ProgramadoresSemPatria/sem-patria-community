import { Icons } from '@/components/icons'
import { type SearchDialogResult } from '@/hooks/search/types'
import { cn } from '@/lib/utils'
import { ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { format } from 'date-fns'
import Image from 'next/image'

interface ResultsListProps {
  searchResults: SearchDialogResult[]
}

export const ResultsList = ({ searchResults }: ResultsListProps) => (
  <ComboboxOptions
    static
    as="ul"
    className="p-3 space-y-1 max-h-96 transform-gpu overflow-y-auto py-3 bg-white dark:bg-gray-800"
  >
    {searchResults.map(sResult => (
      <ComboboxOption
        key={sResult.id}
        value={sResult}
        as="li"
        className="flex justify-between rounded-lg cursor-pointer select-none items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
      >
        <div className="flex gap-x-4 overflow-hidden">
          <div
            id="entity-icon"
            className={cn(
              'flex flex-shrink-0 items-center justify-center rounded-lg mr-2 w-12 h-12',
              sResult.entity === 'forum' ? 'bg-indigo-500' : 'bg-purple-500'
            )}
          >
            {sResult.entity === 'forum' ? (
              <Icons.forum className="w-6 h-6 text-white" aria-hidden="true" />
            ) : (
              <>
                {sResult.imageUrl ? (
                  <Image
                    alt=""
                    className="rounded-lg"
                    width={500}
                    height={500}
                    src={sResult.imageUrl}
                  />
                ) : (
                  <Icons.user
                    className="w-6 h-6 text-white"
                    aria-hidden="true"
                  />
                )}
              </>
            )}
          </div>

          <div id="title" className="min-w-0 flex-auto overflow-hidden">
            <p className="truncate capitalize font-medium text-gray-900 dark:text-gray-100">
              {sResult.entity === 'forum' ? sResult.title : sResult.name}
            </p>

            <div className="mt-0.5 flex items-center gap-x-2 text-xs/5 text-gray-500 dark:text-gray-400">
              <p className="truncate">
                {sResult.entity === 'forum' ? (
                  <>
                    Posted by <strong>@{sResult.user?.username}</strong> in{' '}
                    <strong>{sResult.category?.name}</strong>
                  </>
                ) : (
                  <>
                    <strong>@{sResult.username}</strong>
                  </>
                )}
              </p>
              <svg
                viewBox="0 0 2 2"
                className="flex-shrink-0 w-0.5 h-0.5 fill-current"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              {sResult.entity === 'forum' ? (
                <div className="flex items-center gap-x-1 text-xs/5 text-gray-500 dark:text-gray-400">
                  <Icons.upVote className="w-3.5 h-3.5" />
                  {sResult._count?.likes}
                </div>
              ) : (
                <div className="text-xs/5 text-gray-500 dark:text-gray-400">
                  {sResult.followers} followers
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <span className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-100 px-1.5 py-0.5 capitalize text-xs font-medium text-indigo-700">
              <svg
                viewBox="0 0 6 6"
                aria-hidden="true"
                className="w-1.5 h-1.5 flex-shrink-0 fill-indigo-500 dark:fill-indigo-400"
              >
                <circle r={3} cx={3} cy={3} />
              </svg>
              {sResult.entity}
            </span>

            <p className="mt-1 text-xs/5 text-gray-500 dark:text-gray-400">
              Joined {format(new Date(sResult.createdAt), 'MMMM d, yyyy')}
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
    ))}
  </ComboboxOptions>
)
