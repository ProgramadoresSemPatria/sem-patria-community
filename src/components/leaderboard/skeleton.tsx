import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export const TopThreeSkeleton = () => {
  return (
    <div className="w-full px-4 md:px-2">
      {/* Mobile Carousel Skeleton */}
      <div className="md:hidden space-x-4 relative">
        <div className="flex gap-4 overflow-x-hidden">
          {[0, 1, 2].map(index => (
            <div key={index} className="basis-[85%] flex-shrink-0">
              <LeaderboardCardSkeleton index={index} />
            </div>
          ))}
        </div>
        <Skeleton className="absolute top-1/2 -translate-y-1/2 left-2 h-8 w-8 rounded-full" />
        <Skeleton className="absolute top-1/2 -translate-y-1/2 right-2 h-8 w-8 rounded-full" />
      </div>

      {/* Desktop Layout Skeleton */}
      <div className="hidden md:flex flex-row gap-4 justify-center">
        {[0, 1, 2].map(index => (
          <div key={index} className="w-1/3 max-w-[340px]">
            <LeaderboardCardSkeleton index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

const LeaderboardCardSkeleton = ({ index }: { index: number }) => {
  return (
    <div
      className={cn(
        'relative flex-shrink-0',
        index === 0 && 'md:z-10 md:scale-105'
      )}
    >
      <div
        className={cn(
          'relative w-full rounded-xl p-3',
          'bg-gradient-to-br',
          index === 0
            ? 'from-yellow-400/20 to-amber-600/20 border-yellow-500/30'
            : index === 1
              ? 'from-gray-400/20 to-gray-600/20 border-gray-500/30'
              : 'from-orange-400/20 to-orange-600/20 border-orange-500/30',
          'border-2 backdrop-blur-lg'
        )}
      >
        <div className="relative flex flex-col items-center gap-3">
          <Skeleton className="h-4 w-8" />
          <div className="relative">
            <Skeleton className="w-16 h-16 md:w-24 md:h-24 rounded-full" />
            <Skeleton className="absolute -bottom-0 -right-0 w-6 h-6 rounded-full" />
          </div>
          <div className="mt-2 text-center w-full">
            <Skeleton className="h-6 w-32 mx-auto" />
            <Skeleton className="h-4 w-24 mx-auto mt-2" />
          </div>
          <div className="mt-auto">
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="w-full flex flex-wrap gap-2 justify-center">
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const LeaderboardSkeleton = () => {
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
