import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function TopThreeSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
      {[1, 2, 3].map(index => (
        <Card
          key={index}
          className={`p-4 text-center ${
            index === 1
              ? 'bg-yellow-100/50 dark:bg-amber-500/20'
              : index === 2
                ? 'bg-gray-100/50 dark:bg-gray-900/20'
                : 'bg-orange-100/50 dark:bg-orange-900/20'
          }`}
        >
          <div className="relative inline-block mb-1">
            <Skeleton className="h-16 w-16 rounded-full mx-auto" />
            <Skeleton className="h-6 w-6 rounded-full absolute -bottom-1 right-0" />
          </div>

          <Skeleton className="h-6 w-24 mx-auto mb-2" />

          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-5 w-12 rounded-md" />
          </div>

          <Skeleton className="h-8 w-20 mx-auto mt-2" />
          <Skeleton className="h-4 w-6 mx-auto mt-1" />
        </Card>
      ))}
    </div>
  )
}

export function LeaderboardSkeleton() {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between w-full px-2 mb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <div className="h-px bg-border my-4" />

      <TopThreeSkeleton />

      <div className="h-px bg-border my-4" />

      <div className="mb-6 relative">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="overflow-y-auto flex-1">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(index => (
            <div key={index} className="flex items-center justify-between p-2">
              <div className="flex items-center gap-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex flex-col">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-16 mt-1" />
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="flex flex-wrap gap-1 justify-end">
                  <Skeleton className="h-5 w-16 rounded-md" />
                  <Skeleton className="h-5 w-12 rounded-md" />
                </div>
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
