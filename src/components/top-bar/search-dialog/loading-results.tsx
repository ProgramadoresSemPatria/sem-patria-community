import { Skeleton } from '@/components/ui/skeleton'

export const LoadingResults = () => (
  <div className="space-y-4 py-4 px-3 bg-gray-50 dark:bg-gray-700">
    {[...Array(3)].map((_, skeletonIdx) => (
      <div key={skeletonIdx} className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-600" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-[200px] bg-gray-200 dark:bg-gray-600" />
          <Skeleton className="h-4 w-[160px] bg-gray-200 dark:bg-gray-600" />
        </div>
      </div>
    ))}
  </div>
)
