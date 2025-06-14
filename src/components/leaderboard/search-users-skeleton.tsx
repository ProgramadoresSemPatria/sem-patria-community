import { Skeleton } from '@/components/ui/skeleton'

export const SearchUsersSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-2 rounded-lg animate-pulse"
        >
          <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0 flex-1">
            <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded-full flex-shrink-0" />
            <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex-shrink-0" />
            <div className="flex flex-col gap-2 min-w-0 flex-1">
              <Skeleton className="h-4 w-24 sm:w-32" />
              <Skeleton className="h-3 w-16 sm:w-20" />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-end">
              <Skeleton className="h-6 w-12 sm:w-16 rounded-md" />
              <Skeleton className="h-6 w-10 sm:w-12 rounded-md" />
            </div>
            <Skeleton className="h-4 w-8 sm:w-12" />
          </div>
        </div>
      ))}
    </div>
  )
}
