import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function TopThreeSkeleton() {
  return (
    <div className="relative py-6 px-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4">
        {[0, 1, 2].map(index => (
          <div
            key={index}
            className={cn('relative', index === 0 && 'md:z-10 md:scale-110')}
          >
            <div
              className={cn(
                'relative w-64 h-96 rounded-xl p-4',
                'bg-gradient-to-br',
                index === 0
                  ? 'from-yellow-400/20 to-amber-600/20 border-yellow-500/30'
                  : index === 1
                    ? 'from-gray-400/20 to-gray-600/20 border-gray-500/30'
                    : 'from-orange-400/20 to-orange-600/20 border-orange-500/30',
                'border-2 backdrop-blur-lg'
              )}
            >
              <div className="relative flex flex-col items-center gap-4">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="mt-4 text-center w-full">
                  <Skeleton className="h-6 w-32 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto mt-2" />
                </div>
                <div className="mt-auto">
                  <Skeleton className="h-8 w-24" />
                </div>
                <div className="w-full mt-4 space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LeaderboardSkeleton() {
  return (
    <Card className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between w-full px-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <Separator className="my-4" />
      <TopThreeSkeleton />
      <Separator className="my-4" />

      <div className="mb-6 relative">
        <Skeleton className="w-full h-10" />
      </div>

      <CardContent className="px-2 py-0 pb-2 flex flex-col gap-y-4 overflow-y-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 rounded-lg"
          >
            <div className="flex items-center gap-x-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="flex flex-wrap gap-1 justify-end">
                <Skeleton className="h-6 w-16 rounded-md" />
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
