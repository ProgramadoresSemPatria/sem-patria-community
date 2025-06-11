'use client'

import {
  type GetScoreHistoryBySeasonApiProps,
  type ScoreHistoryItem
} from '@/hooks/score-history/types'
import { useScoreHistory } from '@/hooks/score-history/use-score-history'
import type { InfiniteData } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const useScoreTimeline = (
  seasonId: string,
  initialData: ScoreHistoryItem[] = [],
  initialDataCount: number = 0
) => {
  const { useGetScoreHistoryBySeason } = useScoreHistory()
  const { ref, inView } = useInView()

  // Fetch more data if we have more than 20 items
  const shouldFetchMore = initialDataCount >= 20

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useGetScoreHistoryBySeason(
    { seasonId, limit: 20 },
    {
      enabled: shouldFetchMore, // Only enable the query if we need to fetch more
      initialData: shouldFetchMore
        ? undefined
        : {
            pages: [{ data: initialData, nextCursor: null }],
            pageParams: [null]
          }
    }
  )

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && shouldFetchMore) {
      void fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, shouldFetchMore])

  const formatSourceType = (type: string) => {
    const types: Record<string, string> = {
      FORUM_POST_LIKE: 'like in a forum post',
      FORUM_POST_COMMENT_LIKE: 'like in a forum comment',
      COURSE_RECOMMENDATION: 'recommend a course'
    }

    return types[type] || type
  }

  const formatTimeAgo = (date: string | Date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: enUS
    })
  }

  // If we don't need to fetch more, just use the initial data
  const allActivities = shouldFetchMore
    ? [
        ...initialData,
        ...((
          data as unknown as InfiniteData<GetScoreHistoryBySeasonApiProps>
        )?.pages.flatMap(page => page.data) || [])
      ]
    : initialData

  return {
    data: allActivities,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage: shouldFetchMore ? hasNextPage : false,
    ref,
    formatSourceType,
    formatTimeAgo
  }
}

export default useScoreTimeline
