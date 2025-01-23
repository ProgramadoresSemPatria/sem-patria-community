import { Icons } from '@/components/icons'

export const EmptyState = () => (
  <>
    <div className="text-center px-6 py-14 sm:px-14">
      <Icons.fileSearch className="mx-auto w-8 h-8 text-gray-400" />
      <h2 className="mt-2 text-base font-semibold text-gray-900 dark:text-gray-100">
        Search for
      </h2>
      <h6 className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        posts and users.
      </h6>
    </div>
    <div className="flex flex-wrap items-center border-t bg-gray-50 px-4 py-2.5 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-100">
      <span className="mr-1">Press</span>
      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        esc
      </kbd>
      <span className="ml-1">to close</span>
    </div>
  </>
)
