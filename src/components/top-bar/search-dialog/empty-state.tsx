import { Icons } from '@/components/icons'

const SEARCH_ENTITIES = [
  'forum posts',
  'users',
  'courses',
  'interests',
  'events',
  'modules',
  'videos'
]

export const EmptyState = () => (
  <>
    <div className="text-center px-6 py-14 sm:px-14">
      <Icons.fileSearch className="mx-auto w-8 h-8 text-gray-400" />
      <h2 className="mt-2 text-base font-semibold text-gray-900 dark:text-gray-100">
        Search across our platform
      </h2>
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Find {SEARCH_ENTITIES.slice(0, -1).join(', ')} and{' '}
        {SEARCH_ENTITIES.slice(-1)}.
      </div>
    </div>

    <div className="hidden sm:flex flex-wrap items-center border-t bg-gray-50 px-4 py-2.5 text-xs text-gray-800 dark:bg-card dark:text-gray-100">
      <span className="mr-1">Press</span>
      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        esc
      </kbd>
      <span className="ml-1">to close</span>
    </div>
  </>
)
