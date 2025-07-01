'use client'

import { getCurrentSeason } from '@/actions/leaderboard/get-current-season'
import type {
  CurrentSeasonResponse,
  LeaderboardScore,
  SearchedUserProps
} from '@/actions/leaderboard/types'
import { Icons } from '@/components/icons'
import { InfiniteLeaderboard } from '@/components/leaderboard/infinite-leaderboard'
import { LeaderboardSkeleton } from '@/components/leaderboard/skeleton'
import { TopThree } from '@/components/leaderboard/top-three'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

interface LeaderboardContentProps {
  data: CurrentSeasonResponse
}

export const LeaderboardContent = ({ data }: LeaderboardContentProps) => {
  const { data: refreshedData, isLoading: isLoadingRefresh } = useQuery({
    queryKey: ['getCurrentSeason-leaderboard'],
    queryFn: async () => await getCurrentSeason()
  })

  const seasonData = refreshedData || data

  const convertToSearchedUserProps = useCallback(
    (score: LeaderboardScore): SearchedUserProps => ({
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
    }),
    []
  )

  const initialLeaderboardData = useMemo(
    () => ({
      users: seasonData?.scores?.slice(3).map(convertToSearchedUserProps) || []
    }),
    [seasonData?.scores, convertToSearchedUserProps]
  )

  if (isLoadingRefresh) {
    return <LeaderboardSkeleton />
  }

  if (!seasonData) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Icons.help className="h-10 w-10 text-destructive mb-4" />
        <h3 className="text-base font-medium text-destructive">
          Error loading leaderboard
        </h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Please try again later
        </p>
      </div>
    )
  }

  return (
    <Card className="p-2 sm:p-4 h-full flex flex-col w-full max-w-full">
      <div className="flex items-center justify-between w-full px-1 sm:px-2">
        <div className="flex items-center gap-2">
          <h1 className="text-gray-900 dark:text-muted-foreground text-lg sm:text-xl font-semibold">
            Leaderboard
          </h1>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {isLoadingRefresh ? (
              <Skeleton className="w-8 h-4 rounded-full" />
            ) : (
              <>
                <span className="hidden sm:inline">{seasonData.name}</span>
                <span className="sm:hidden">{seasonData.name}</span>
              </>
            )}
          </span>
        </div>
      </div>
      <Separator className="my-2 sm:my-4" />
      <TopThree scores={seasonData.scores} />
      <Separator className="my-2 sm:my-4" />
      <InfiniteLeaderboard initialData={initialLeaderboardData} />
    </Card>
  )
}
