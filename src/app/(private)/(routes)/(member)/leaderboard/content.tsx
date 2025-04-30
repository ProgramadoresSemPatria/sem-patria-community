'use client'

import type {
  CurrentSeasonResponse,
  LeaderboardScore,
  SearchedUserProps
} from '@/actions/leaderboard/types'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useSeason } from '@/hooks/season/use-season'
import { cn } from '@/lib/utils'
import { LeaderboardSkeleton } from './skeleton'
import { TopThree } from './components/top-three'
import { InfiniteLeaderboard } from './components/infinite-leaderboard'

interface LeaderboardContentProps {
  data: CurrentSeasonResponse
}

export const LeaderboardContent = ({ data }: LeaderboardContentProps) => {
  const { useGetCurrentSeason } = useSeason()
  const {
    data: refreshedData,
    isLoading: isLoadingRefresh,
    refetch
  } = useGetCurrentSeason({
    queryKey: ['getCurrentSeason'],
    enabled: false
  })

  const seasonData = refreshedData || data
  const isRefreshLoading = isLoadingRefresh

  const handleRefresh = async () => {
    await refetch()
  }

  const convertToSearchedUserProps = (
    score: LeaderboardScore
  ): SearchedUserProps => ({
    userId: score.userId,
    points: score.points,
    user: {
      id: score.user.id,
      name: score.user.name,
      username: score.user.username,
      level: score.user.level || '',
      position: score.user.position,
      imageUrl: score.user.imageUrl || null
    }
  })

  if (isLoadingRefresh) {
    return <LeaderboardSkeleton />
  }

  return (
    <Card className="p-2 sm:p-4 h-full flex flex-col w-full max-w-full">
      <div className="flex items-center justify-between w-full px-1 sm:px-2">
        <div className="flex items-center gap-2">
          <h1 className="text-gray-900 dark:text-muted-foreground text-lg sm:text-xl font-semibold">
            Leaderboard
          </h1>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {isRefreshLoading ? (
              <Skeleton className="w-8 h-4 rounded-full" />
            ) : (
              <>
                <span className="hidden sm:inline">{seasonData?.name}</span>
                <span className="sm:hidden">{seasonData?.name}</span>
              </>
            )}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isRefreshLoading}
          onClick={handleRefresh}
        >
          <Icons.rotateCcw
            className={cn(
              'w-5 h-5 text-gray-900 dark:text-muted-foreground',
              isRefreshLoading && 'animate-spin'
            )}
          />
        </Button>
      </div>
      <Separator className="my-2 sm:my-4" />
      {seasonData?.scores && <TopThree scores={seasonData.scores} />}
      <Separator className="my-2 sm:my-4" />
      <InfiniteLeaderboard
        initialData={{
          users:
            seasonData?.scores?.slice(3).map(convertToSearchedUserProps) || []
        }}
      />
    </Card>
  )
}
