import { useScoreHistory } from '@/hooks/score-history/use-score-history'
import { AwardEnum } from '@prisma/client'

type UseScoreActivityProps = {
  userId: string
}

export const useScoreActivity = ({ userId }: UseScoreActivityProps) => {
  const { useGetScoreHistoryByUserId } = useScoreHistory()

  const {
    data: scoreActivity,
    isLoading: isLoadingScoreActivity,
    refetch: refetchScoreActivity,
    isRefetching,
    dataUpdatedAt
  } = useGetScoreHistoryByUserId(userId, {
    refetchOnWindowFocus: true,
    queryKey: ['getScoreHistoryByUserId', userId],
    staleTime: 0
  })

  const formatSourceType = (sourceType: string) => {
    const sourceTypeMap: Record<AwardEnum, string> = {
      [AwardEnum.FORUM_POST_LIKE]: 'Forum Post Like',
      [AwardEnum.FORUM_POST_COMMENT_LIKE]: 'Forum Post Comment Like',
      [AwardEnum.COURSE_RECOMMENDATION]: 'Course Recommendation'
    }

    return sourceTypeMap[sourceType as AwardEnum]
  }

  return {
    scoreActivity,
    isLoadingScoreActivity,
    isRefetching,
    formatSourceType,
    refetchScoreActivity,
    lastUpdated: dataUpdatedAt
  }
}
